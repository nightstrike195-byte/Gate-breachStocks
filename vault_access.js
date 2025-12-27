/* ===========================
   FILE NAME MUST BE: vault_access.js
   Firebase Login + Global Server-Synced State + Admin Invest Lock
   Works WITHOUT editing app.js (syncs via localStorage interception)
   =========================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp, onSnapshot } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";

(() => {
  "use strict";

  /*****************************************************************
   * 0) FIREBASE CONFIG (YOUR PROVIDED CONFIG)
   *****************************************************************/
  const firebaseConfig = {
    apiKey: "AIzaSyB83MC9_KqT5zSyz9OYLtXeeHkx7o_yEig",
    authDomain: "gatebreachstocks.firebaseapp.com",
    projectId: "gatebreachstocks",
    storageBucket: "gatebreachstocks.firebasestorage.app",
    messagingSenderId: "648405105124",
    appId: "1:648405105124:web:7ebdc0d8604e126c26aff1",
    measurementId: "G-G070PSBCSC"
  };

  const app = initializeApp(firebaseConfig);
  try { getAnalytics(app); } catch {}
  const auth = getAuth(app);
  const db = getFirestore(app);

  /*****************************************************************
   * 1) IMPORTANT KEYS (matches app.js)
   *****************************************************************/
  const KEY_STATE = "gbx_state_html_v1";     // app.js saves everything here
  const KEY_LOGIN = "gb_firebase_login_v1";  // our login session cache
  const KEY_ADMIN = "gb_admin_invest_authed_v1"; // sessionStorage only

  // Firestore docs (GLOBAL shared state = everyone sees same investments)
  const STATE_DOC = doc(db, "gatebreach", "global_state_v1");   // stores the whole state blob
  const ADMIN_DOC = doc(db, "gatebreach", "admin_invest_v1");   // stores invest PIN (admins only)

  // Prevent infinite reload loops
  const RELOAD_FLAG = "gb_state_applied_once_v1";

  /*****************************************************************
   * 2) USERNAME -> EMAIL MAPPING
   * Firebase Auth needs email/password.
   * We'll map your usernames to fixed emails you create in Firebase.
   *****************************************************************/
  const USERS = Object.freeze({
    joyous: { email: "joyous@gatebreach.local", displayName: "Joyous", vault: "J" },
    profit: { email: "joyous@gatebreach.local", displayName: "Joyous", vault: "J" }, // alias
    bowen:  { email: "bowen@gatebreach.local",  displayName: "Bowen",  vault: "B" },
    raijin: { email: "raijin@gatebreach.local", displayName: "Raijin", vault: "R" },
    kaien:  { email: "kaien@gatebreach.local",  displayName: "Kaien",  vault: "K" },
    marcus: { email: "marcus@gatebreach.local", displayName: "Marcus", vault: "M" },
  });

  const VAULTS = ["J", "M", "B", "K", "R"];

  /*****************************************************************
   * 3) HELPERS
   *****************************************************************/
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const norm = (s) => String(s || "").trim().toLowerCase();
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  function readJSON(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }
  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }

  function getLogin() { return readJSON(KEY_LOGIN, null); }
  function setLogin(obj) { writeJSON(KEY_LOGIN, obj); }
  function clearLogin() { try { localStorage.removeItem(KEY_LOGIN); } catch {} }

  function isAdminAuthed() {
    try { return sessionStorage.getItem(KEY_ADMIN) === "1"; } catch { return false; }
  }
  function setAdminAuthed(on) {
    try { sessionStorage.setItem(KEY_ADMIN, on ? "1" : "0"); } catch {}
  }

  function isLoggedIn() {
    const s = getLogin();
    return !!(s && VAULTS.includes(String(s.vault || "").toUpperCase()) && s.uid);
  }

  /*****************************************************************
   * 4) GLOBAL STATE SYNC (SERVER <-> localStorage)
   *
   * - Downloads STATE_DOC and writes into localStorage[KEY_STATE]
   * - Uploads whenever app.js persists KEY_STATE (we intercept setItem)
   *****************************************************************/
  let uploadTimer = null;
  let lastUploadedHash = "";
  let lastServerUpdatedAt = 0;
  let suppressLocalWrites = false;

  function stableHash(str) {
    // cheap stable hash (not crypto) to avoid uploading identical data over and over
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16);
  }

  function scheduleUpload(reason = "state-change") {
    if (!isLoggedIn()) return;
    if (suppressLocalWrites) return;

    if (uploadTimer) clearTimeout(uploadTimer);
    uploadTimer = setTimeout(async () => {
      try {
        const raw = localStorage.getItem(KEY_STATE);
        if (!raw) return;

        // Don't upload if nothing changed
        const hash = stableHash(raw);
        if (hash === lastUploadedHash) return;

        // Also: if server updated more recently than our local view, don't clobber it
        // (rare, but can happen with multi-clients)
        // We'll rely on Firestore snapshot to pull server truth.
        await setDoc(STATE_DOC, {
          state: raw,                 // store as JSON string to avoid Firestore object limits
          updatedAt: serverTimestamp(),
          updatedBy: getLogin()?.uid || null,
          updatedReason: reason
        }, { merge: true });

        lastUploadedHash = hash;
      } catch (e) {
        // silent
      }
    }, 550); // debounce
  }

  async function applyServerStateIfNeeded(serverStateStr, serverUpdatedAtMs) {
    if (!serverStateStr) return false;

    const localRaw = localStorage.getItem(KEY_STATE) || "";
    const localHash = stableHash(localRaw);
    const serverHash = stableHash(serverStateStr);

    // If identical, nothing to do
    if (serverHash === localHash) {
      lastUploadedHash = serverHash;
      return false;
    }

    // Apply server truth into localStorage and reload ONCE so app.js rehydrates from it
    suppressLocalWrites = true;
    try { localStorage.setItem(KEY_STATE, serverStateStr); } catch {}
    suppressLocalWrites = false;

    // avoid infinite loop
    const already = sessionStorage.getItem(RELOAD_FLAG) === "1";
    if (!already) {
      sessionStorage.setItem(RELOAD_FLAG, "1");
      location.reload();
      return true;
    }
    return false;
  }

  function installLocalStorageInterceptor() {
    const orig = localStorage.setItem.bind(localStorage);
    localStorage.setItem = (k, v) => {
      orig(k, v);

      if (k === KEY_STATE) {
        // app.js writes here whenever portfolio changes
        scheduleUpload("persist");
      }
    };
  }

  function watchServerState() {
    // Live listen so multiple people/devices stay synced
    onSnapshot(STATE_DOC, async (snap) => {
      try {
        if (!snap.exists()) return;
        const data = snap.data() || {};
        const serverStateStr = data.state || "";
        const updatedAt = data.updatedAt?.toMillis ? data.updatedAt.toMillis() : 0;

        if (updatedAt && updatedAt > lastServerUpdatedAt) {
          lastServerUpdatedAt = updatedAt;
        }

        // Apply server truth
        await applyServerStateIfNeeded(serverStateStr, updatedAt);
      } catch {}
    });
  }

  /*****************************************************************
   * 5) ADMIN INVEST PIN (stored in Firestore; admins only can read/write)
   *****************************************************************/
  let cachedAdminPin = null;

  async function fetchAdminPinIfAllowed() {
    cachedAdminPin = null;
    try {
      const snap = await getDoc(ADMIN_DOC);
      if (!snap.exists()) return null;
      const data = snap.data() || {};
      cachedAdminPin = typeof data.pin === "string" ? data.pin : null;
      return cachedAdminPin;
    } catch {
      // If rules block read, non-admins will land here.
      return null;
    }
  }

  async function adminUnlockFlow() {
    // Try to load PIN (only admins can read it)
    const pin = await fetchAdminPinIfAllowed();
    if (!pin) {
      alert("Admin unlock is not available on this account (not admin).");
      return;
    }

    const pass = prompt("Admin Invest Password:");
    if (pass === null) return;

    if (pass === pin) {
      setAdminAuthed(true);
      alert("Investing unlocked (this session). Click Buy/Sell again.");
    } else {
      alert("Wrong admin password.");
    }
  }

  async function adminChangePinFlow() {
    // Only admins can write (rules). If not admin, it will fail.
    const newPin = prompt("Set NEW Admin Invest Password:");
    if (newPin === null) return;
    if (String(newPin).trim().length < 3) {
      alert("Password too short.");
      return;
    }

    try {
      await setDoc(ADMIN_DOC, { pin: String(newPin), updatedAt: serverTimestamp(), updatedBy: getLogin()?.uid || null }, { merge: true });
      alert("Admin invest password updated.");
    } catch (e) {
      alert("You are not allowed to change the admin password.");
    }
  }

  /*****************************************************************
   * 6) UI: Login button (top right) + modal
   * We DO NOT require HTML changes: we inject button into .topRight.
   *****************************************************************/
  function ensureLoginButton() {
    const topRight = $(".topRight");
    if (!topRight) return;

    if (!$("#loginBtn")) {
      const btn = document.createElement("button");
      btn.id = "loginBtn";
      btn.className = "btn ghost";
      btn.type = "button";
      btn.textContent = "Login";
      btn.style.cssText = "margin-left:10px;";
      topRight.appendChild(btn);
    }

    if (!$("#loginStatusChip")) {
      const chip = document.createElement("div");
      chip.id = "loginStatusChip";
      chip.style.cssText = "margin-left:10px; font-size:12px; opacity:.85; align-self:center; white-space:nowrap;";
      chip.textContent = "Not logged in";
      topRight.appendChild(chip);
    }
  }

  function updateStatusUI() {
    const btn = $("#loginBtn");
    const chip = $("#loginStatusChip");
    const sess = getLogin();

    if (btn) btn.textContent = sess?.uid ? "Account" : "Login";
    if (chip) chip.textContent = sess?.uid ? `${sess.name} (${sess.vault})` : "Not logged in";
  }

  function ensureLoginModal() {
    if ($("#gbLoginModal")) return;

    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div id="gbLoginModal" style="
        position:fixed; inset:0; display:none; align-items:center; justify-content:center;
        background:rgba(0,0,0,.55); z-index:99999; padding:16px;
      ">
        <div style="
          width:min(520px, 100%); background:rgba(10,16,28,.98);
          border:1px solid rgba(255,255,255,.16); border-radius:16px;
          box-shadow:0 20px 70px rgba(0,0,0,.55);
          color:#eaf2ff; padding:16px 16px 14px;
          font-family:system-ui,Segoe UI,Arial;
        ">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
            <div style="font-size:16px; font-weight:700;">Login</div>
            <button id="gbLoginClose" type="button" style="
              border:1px solid rgba(255,255,255,.18);
              background:rgba(255,255,255,.06);
              color:#eaf2ff; border-radius:10px; padding:6px 10px; cursor:pointer;
            ">✕</button>
          </div>

          <div style="margin-top:12px; display:grid; gap:10px;">
            <label style="display:grid; gap:6px;">
              <span style="font-size:12px; opacity:.85;">Username</span>
              <input id="gbLoginUser" type="text" placeholder="Joyous / Bowen / Raijin / Kaien / Marcus (or profit)"
                style="padding:10px 12px; border-radius:12px; border:1px solid rgba(255,255,255,.16);
                  background:rgba(255,255,255,.06); color:#eaf2ff; outline:none;">
            </label>

            <label style="display:grid; gap:6px;">
              <span style="font-size:12px; opacity:.85;">Password</span>
              <input id="gbLoginPass" type="password" placeholder="Enter password"
                style="padding:10px 12px; border-radius:12px; border:1px solid rgba(255,255,255,.16);
                  background:rgba(255,255,255,.06); color:#eaf2ff; outline:none;">
            </label>

            <div id="gbLoginErr" style="display:none; font-size:12px; color:#ffb4b4; opacity:.95;"></div>

            <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:6px;">
              <button id="gbLogoutBtn" type="button" style="
                border:1px solid rgba(255,255,255,.18);
                background:rgba(255,255,255,.04);
                color:#eaf2ff; border-radius:12px; padding:10px 12px; cursor:pointer;
              ">Log out</button>

              <button id="gbDoLogin" type="button" style="
                border:1px solid rgba(255,255,255,.18);
                background:rgba(120,170,255,.18);
                color:#eaf2ff; border-radius:12px; padding:10px 12px; cursor:pointer;
                font-weight:700;
              ">Login</button>
            </div>

            <hr style="border:none; border-top:1px solid rgba(255,255,255,.12); margin:12px 0 6px;" />

            <div style="display:flex; gap:10px; justify-content:space-between; align-items:center;">
              <div style="font-size:12px; opacity:.9;">Admin Invest Lock</div>
              <div style="display:flex; gap:10px;">
                <button id="gbAdminUnlockBtn" type="button" style="
                  border:1px solid rgba(255,255,255,.18);
                  background:rgba(255,255,255,.06);
                  color:#eaf2ff; border-radius:12px; padding:10px 12px; cursor:pointer;
                ">Unlock Investing</button>

                <button id="gbAdminChangeBtn" type="button" style="
                  border:1px solid rgba(255,255,255,.18);
                  background:rgba(255,255,255,.06);
                  color:#eaf2ff; border-radius:12px; padding:10px 12px; cursor:pointer;
                ">Change Admin Password</button>
              </div>
            </div>

            <div style="font-size:11px; opacity:.7;">
              Buy/Sell is blocked unless logged in AND admin unlock is active (session).
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);

    const modal = $("#gbLoginModal");
    const closeBtn = $("#gbLoginClose");

    const hideErr = () => {
      const el = $("#gbLoginErr");
      if (!el) return;
      el.textContent = "";
      el.style.display = "none";
    };
    const showErr = (msg) => {
      const el = $("#gbLoginErr");
      if (!el) return;
      el.textContent = msg;
      el.style.display = "block";
    };

    const openModal = () => {
      modal.style.display = "flex";
      hideErr();
      const sess = getLogin();
      $("#gbLoginUser").value = sess?.name ? sess.name : "";
      $("#gbLoginPass").value = "";
      $("#gbLoginUser").focus();
    };
    const closeModal = () => { modal.style.display = "none"; };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    $("#gbLoginUser").addEventListener("keydown", (e) => { if (e.key === "Enter") $("#gbLoginPass").focus(); });
    $("#gbLoginPass").addEventListener("keydown", (e) => { if (e.key === "Enter") $("#gbDoLogin").click(); });

    $("#gbDoLogin").addEventListener("click", async () => {
      hideErr();
      const u = norm($("#gbLoginUser").value);
      const p = String($("#gbLoginPass").value || "");
      const rec = USERS[u];

      if (!rec) return showErr("Unknown username.");
      try {
        const cred = await signInWithEmailAndPassword(auth, rec.email, p);
        const user = cred.user;

        // store login session info for UI + invest lock
        setLogin({ uid: user.uid, name: rec.displayName, vault: rec.vault, email: rec.email, at: Date.now() });
        setAdminAuthed(false); // reset admin unlock each login
        updateStatusUI();

        // after login: start sync and folder select
        await forceSelectFolder(rec.vault);

        // immediately pull server truth (and apply + reload if needed)
        await pullServerOnce();

        closeModal();
      } catch (e) {
        showErr("Wrong password.");
      }
    });

    $("#gbLogoutBtn").addEventListener("click", async () => {
      try { await signOut(auth); } catch {}
      clearLogin();
      setAdminAuthed(false);
      updateStatusUI();
      closeModal();
    });

    $("#gbAdminUnlockBtn").addEventListener("click", async () => {
      await adminUnlockFlow();
    });

    $("#gbAdminChangeBtn").addEventListener("click", async () => {
      await adminChangePinFlow();
    });

    window.GBLoginUI = { open: openModal };
  }

  function wireLoginButton() {
    const btn = $("#loginBtn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (window.GBLoginUI) window.GBLoginUI.open();
    });
  }

  /*****************************************************************
   * 7) FORCE SELECT FOLDER (your existing Projects -> "Use Folder")
   *****************************************************************/
  async function clickNav(navName) {
    const btn = $(`.navPills .pill[data-nav="${navName}"]`);
    if (btn) btn.click();
    await sleep(0);
  }

  function findFolderCard(letter) {
    const L = String(letter || "").toUpperCase();
    const names = $$(".cardName");
    for (const n of names) {
      const t = String(n.textContent || "");
      if (t.includes(`Folder ${L}`)) {
        let card = n;
        for (let i = 0; i < 6 && card; i++) {
          if (card.classList && card.classList.contains("card")) break;
          card = card.parentElement;
        }
        return card || null;
      }
    }
    return null;
  }

  async function forceSelectFolder(letter) {
    const L = String(letter || "").toUpperCase();
    if (!VAULTS.includes(L)) return false;

    await clickNav("projects");
    await sleep(50);

    let card = findFolderCard(L);
    if (!card) { await sleep(150); card = findFolderCard(L); }
    if (!card) return false;

    const useBtn = $$("button", card).find(b => norm(b.textContent) === "use folder");
    if (useBtn) useBtn.click();

    await sleep(30);
    await clickNav("market");
    return true;
  }

  /*****************************************************************
   * 8) INVEST LOCK (blocks buy/sell unless logged in + admin unlocked)
   *****************************************************************/
  function isBuySellButton(el) {
    if (!el) return false;
    const btn = el.closest ? el.closest("button") : null;
    if (!btn) return false;

    const cls = btn.classList;
    const text = norm(btn.textContent);

    if (cls && cls.contains("btn") && (cls.contains("buy") || cls.contains("sell"))) return true;
    if (text === "buy selected" || text === "sell selected") return true;
    if (text === "buy" || text === "sell") return true;
    return false;
  }

  function installInvestLock() {
    document.addEventListener("click", async (e) => {
      if (!isBuySellButton(e.target)) return;

      // must be logged in
      if (!isLoggedIn()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        alert("Login required to invest.");
        if (window.GBLoginUI) window.GBLoginUI.open();
        return;
      }

      // must be admin unlocked
      if (!isAdminAuthed()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        await adminUnlockFlow();
        return;
      }

      // allowed -> app.js will proceed, then it will persist KEY_STATE which we upload
    }, true);
  }

  /*****************************************************************
   * 9) ONE-TIME PULL (for login or initial load)
   *****************************************************************/
  async function pullServerOnce() {
    try {
      const snap = await getDoc(STATE_DOC);
      if (!snap.exists()) return false;
      const data = snap.data() || {};
      const serverStateStr = data.state || "";
      const updatedAt = data.updatedAt?.toMillis ? data.updatedAt.toMillis() : 0;
      if (updatedAt && updatedAt > lastServerUpdatedAt) lastServerUpdatedAt = updatedAt;

      return await applyServerStateIfNeeded(serverStateStr, updatedAt);
    } catch {
      return false;
    }
  }

  /*****************************************************************
   * 10) INIT
   *****************************************************************/
  function init() {
    ensureLoginButton();
    ensureLoginModal();
    wireLoginButton();
    updateStatusUI();
    installLocalStorageInterceptor();
    installInvestLock();

    // Keep UI synced with auth status
    onAuthStateChanged(auth, async (user) => {
      const sess = getLogin();

      if (user && sess?.uid === user.uid) {
        updateStatusUI();
        watchServerState(); // live sync
        await pullServerOnce();
      } else if (!user) {
        // logged out in Firebase -> clear local session
        clearLogin();
        setAdminAuthed(false);
        updateStatusUI();
      }
    });

    // If already logged in (cached), try to select their folder once
    const sess = getLogin();
    if (sess?.vault) {
      setTimeout(() => { forceSelectFolder(sess.vault); }, 300);
    }

    // If logged in, watch server state
    if (sess?.uid) {
      watchServerState();
      pullServerOnce();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
