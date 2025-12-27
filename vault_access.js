/* ===========================
   FILE NAME MUST BE: vault_access.js
   Multiplayer Shared State via Firestore + Login + Admin Invest Lock
   NO app.js edits
   =========================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

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
    measurementId: "G-G070PSBCSC",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  /*****************************************************************
   * 1) SHARED "SERVER" DOCUMENT
   * Everyone reads/writes the SAME doc -> same market/investments.
   *****************************************************************/
  const SHARED_DOC = doc(db, "gb", "global_state_v1");

  /*****************************************************************
   * 2) ADMIN INVEST PASSWORD (EASY TO CHANGE)
   *****************************************************************/
  const ADMIN_INVEST_PASSWORD = "CHANGE_ME"; // <-- admins change this anytime

  const ADMIN_KEY = "gb_admin_invest_authed_v1";

  /*****************************************************************
   * 3) USER LOGIN (your hard-coded accounts)
   *****************************************************************/
  const LOGIN_KEY = "gb_portfolio_login_v1";
  const USERS = Object.freeze({
    joyous: { vault: "J", password: "NoMoney?", displayName: "Joyous" },
    profit: { vault: "J", password: "NoMoney?", displayName: "Joyous" }, // alias
    bowen: { vault: "B", password: "WhiteRanger", displayName: "Bowen" },
    raijin: { vault: "R", password: "Bumass", displayName: "Raijin" },
    kaien: { vault: "K", password: "Goat", displayName: "Kaien" },
    marcus: { vault: "M", password: "Sardine", displayName: "Marcus" },
  });

  const VAULTS = ["J", "M", "B", "K", "R"];

  /*****************************************************************
   * 4) IMPORTANT: app.js storage key (from your PDF)
   * This is where your entire market/portfolio state is saved.
   *****************************************************************/
  const KEY_STATE = "gbx_state_html_v1";

  /*****************************************************************
   * 5) HELPERS
   *****************************************************************/
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const norm = (s) => String(s || "").trim().toLowerCase();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function readJSON(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }
  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }

  function isAdminAuthed() {
    try { return sessionStorage.getItem(ADMIN_KEY) === "1"; } catch { return false; }
  }
  function setAdminAuthed(on) {
    try { sessionStorage.setItem(ADMIN_KEY, on ? "1" : "0"); } catch {}
  }

  function getLogin() {
    return readJSON(LOGIN_KEY, null);
  }
  function setLogin(sessionObj) {
    writeJSON(LOGIN_KEY, sessionObj);
  }
  function clearLogin() {
    try { localStorage.removeItem(LOGIN_KEY); } catch {}
  }
  function isLoggedIn() {
    const s = getLogin();
    return !!(s && VAULTS.includes(String(s.vault || "").toUpperCase()));
  }

  /*****************************************************************
   * 6) UI: Relabel "Cash" KPI -> "Points" (text only)
   *****************************************************************/
  function relabelPoints() {
    for (const el of $$(".kpiLabel")) {
      if (norm(el.textContent) === "cash") el.textContent = "Points";
    }
  }

  /*****************************************************************
   * 7) TOP RIGHT LOGIN BUTTON + STATUS CHIP (NO HTML edits required)
   *****************************************************************/
  function ensureLoginUI() {
    const topRight = $(".topRight");
    if (!topRight) return;

    // status chip
    let chip = $("#loginStatusChip");
    if (!chip) {
      chip = document.createElement("div");
      chip.id = "loginStatusChip";
      chip.style.cssText =
        "margin-left:12px; font-size:12px; opacity:.85; align-self:center; white-space:nowrap;";
      chip.textContent = "Not logged in";
      topRight.appendChild(chip);
    }

    // login button
    let btn = $("#loginBtn");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "loginBtn";
      btn.type = "button";
      btn.className = "btn ghost";
      btn.textContent = "Login";
      btn.style.cssText = "margin-left:10px; align-self:center;";
      topRight.appendChild(btn);
    }

    btn.addEventListener("click", () => window.GBLoginUI?.open?.());
    updateStatusChip();
    refreshLoginBtnText();
  }

  function updateStatusChip() {
    const chip = $("#loginStatusChip");
    if (!chip) return;
    const sess = getLogin();
    chip.textContent = sess ? `${sess.name} (${sess.vault})` : "Not logged in";
  }

  function refreshLoginBtnText() {
    const btn = $("#loginBtn");
    if (!btn) return;
    btn.textContent = getLogin() ? "Account" : "Login";
  }

  /*****************************************************************
   * 8) LOGIN MODAL (includes Admin Unlock)
   *****************************************************************/
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

            <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
              <div style="font-size:12px; opacity:.9;">Admin Invest Lock</div>
              <button id="gbAdminUnlockBtn" type="button" style="
                border:1px solid rgba(255,255,255,.18);
                background:rgba(255,255,255,.06);
                color:#eaf2ff; border-radius:12px; padding:10px 12px; cursor:pointer;
              ">Unlock Investing</button>
            </div>

            <div style="font-size:11px; opacity:.7;">
              Buying/Selling is blocked unless admin unlock is active (session only).
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

    $("#gbLoginUser").addEventListener("keydown", (e) => {
      if (e.key === "Enter") $("#gbLoginPass").focus();
    });
    $("#gbLoginPass").addEventListener("keydown", (e) => {
      if (e.key === "Enter") $("#gbDoLogin").click();
    });

    $("#gbDoLogin").addEventListener("click", async () => {
      hideErr();
      const u = norm($("#gbLoginUser").value);
      const p = String($("#gbLoginPass").value || "");

      const rec = USERS[u];
      if (!rec) return showErr("Unknown username.");
      if (p !== rec.password) return showErr("Wrong password.");

      setLogin({ name: rec.displayName, vault: rec.vault, at: Date.now() });
      updateStatusChip();
      refreshLoginBtnText();

      // Optional: switch folder via Projects if your app supports it (kept from your version)
      setTimeout(() => { forceSelectFolder(rec.vault); }, 100);

      closeModal();
    });

    $("#gbLogoutBtn").addEventListener("click", () => {
      clearLogin();
      updateStatusChip();
      refreshLoginBtnText();
      closeModal();
    });

    $("#gbAdminUnlockBtn").addEventListener("click", () => {
      const pass = prompt("Admin Invest Password:");
      if (pass === null) return;
      if (pass === ADMIN_INVEST_PASSWORD) {
        setAdminAuthed(true);
        alert("Investing unlocked (this session).");
      } else {
        alert("Wrong admin password.");
      }
    });

    window.GBLoginUI = { open: openModal };
  }

  /*****************************************************************
   * 9) FORCE SELECT FOLDER (your existing behavior)
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
    await sleep(80);

    let card = findFolderCard(L);
    if (!card) {
      await sleep(150);
      card = findFolderCard(L);
    }
    if (!card) return false;

    const useBtn = $$("button", card).find(b => norm(b.textContent) === "use folder");
    if (useBtn) useBtn.click();

    await sleep(40);
    await clickNav("market");
    return true;
  }

  /*****************************************************************
   * 10) INVEST LOCK (blocks buy/sell clicks unless logged in + admin)
   *****************************************************************/
  function isBuySellButton(el) {
    const btn = el?.closest?.("button");
    if (!btn) return false;
    const cls = btn.classList;
    const text = norm(btn.textContent);
    if (cls && cls.contains("btn") && (cls.contains("buy") || cls.contains("sell"))) return true;
    if (text === "buy selected" || text === "sell selected") return true;
    if (text === "buy" || text === "sell") return true;
    return false;
  }

  function installInvestLock() {
    document.addEventListener("click", (e) => {
      if (!isBuySellButton(e.target)) return;

      if (!isLoggedIn()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        alert("Login required to invest.");
        window.GBLoginUI?.open?.();
        return;
      }

      if (!isAdminAuthed()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const pass = prompt("Admin Invest Password required:");
        if (pass === null) return;
        if (pass === ADMIN_INVEST_PASSWORD) {
          setAdminAuthed(true);
          alert("Investing unlocked (this session). Click again to buy/sell.");
        } else {
          alert("Wrong admin password.");
        }
        return;
      }
    }, true);
  }

  /*****************************************************************
   * 11) MULTIPLAYER SYNC LAYER
   * - Upload when app.js writes KEY_STATE
   * - Download realtime changes and reload so UI matches
   *****************************************************************/
  let applyingRemote = false;
  let lastRemoteRev = null;
  let lastLocalPushTs = 0;

  function getLocalStateRaw() {
    try { return localStorage.getItem(KEY_STATE); } catch { return null; }
  }
  function setLocalStateRaw(raw) {
    try { localStorage.setItem(KEY_STATE, raw); } catch {}
  }

  async function pushStateToServer(raw) {
    if (!raw) return;
    const now = Date.now();

    // tiny throttle to prevent spam
    if (now - lastLocalPushTs < 250) return;
    lastLocalPushTs = now;

    try {
      await setDoc(SHARED_DOC, {
        stateRaw: raw,
        rev: now, // simple revision marker
      }, { merge: true });
    } catch (e) {
      // ignore (offline, rules blocked, etc.)
    }
  }

  function installLocalStoragePatch() {
    const orig = localStorage.setItem.bind(localStorage);

    localStorage.setItem = function(k, v) {
      // always do original behavior first
      orig(k, v);

      // if app.js saves state, push it to server (unless we are applying remote)
      if (!applyingRemote && k === KEY_STATE) {
        pushStateToServer(String(v ?? ""));
      }

      return undefined;
    };
  }

  async function pullInitialFromServerIfEmpty() {
    const raw = getLocalStateRaw();
    if (raw) return; // already have local state

    try {
      const snap = await getDoc(SHARED_DOC);
      if (!snap.exists()) return;

      const data = snap.data() || {};
      if (!data.stateRaw) return;

      applyingRemote = true;
      setLocalStateRaw(String(data.stateRaw));
      applyingRemote = false;

      // make sure app.js loads the shared state
      location.reload();
    } catch {
      // ignore
    }
  }

  function installRealtimeListener() {
    onSnapshot(SHARED_DOC, (snap) => {
      if (!snap.exists()) return;
      const data = snap.data() || {};
      const rev = data.rev || null;
      const stateRaw = data.stateRaw || null;

      if (!stateRaw || !rev) return;

      // ignore first run if we've already applied same rev
      if (lastRemoteRev === rev) return;
      lastRemoteRev = rev;

      // if local matches, do nothing
      const local = getLocalStateRaw();
      if (local === stateRaw) return;

      // apply remote, then reload so app.js re-renders
      applyingRemote = true;
      setLocalStateRaw(String(stateRaw));
      applyingRemote = false;

      // reload so everyone sees the same live state
      location.reload();
    });
  }

  /*****************************************************************
   * 12) INIT
   *****************************************************************/
  async function init() {
    relabelPoints();
    ensureLoginUI();
    ensureLoginModal();
    installInvestLock();

    // Multiplayer: patch storage + sync
    installLocalStoragePatch();
    await pullInitialFromServerIfEmpty();
    installRealtimeListener();

    // If logged in, try selecting their folder once
    const sess = getLogin();
    if (sess?.vault) setTimeout(() => { forceSelectFolder(sess.vault); }, 350);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { init(); });
  } else {
    init();
  }

})();
