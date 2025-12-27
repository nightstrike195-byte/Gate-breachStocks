/* ===========================
   FILE NAME MUST BE: vault_access.js
   Multiplayer Sync + Login + Admin Invest Lock (NO app.js edits)
   Uses Firestore as the shared server.
   =========================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore, doc, getDoc, runTransaction, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

/*****************************************************************
 * 0) FIREBASE CONFIG (YOURS)
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
const db = getFirestore(app);

/*****************************************************************
 * 1) IMPORTANT: this must match your app.js storage key
 * From your PDF: KEY_STATE = "gbx_state_html_v1"
 *****************************************************************/
const KEY_STATE = "gbx_state_html_v1";

/*****************************************************************
 * 2) SHARED SERVER DOC (everyone reads/writes the same doc)
 *****************************************************************/
const SHARED_DOC = doc(db, "gatebreach", "shared_state");

/*****************************************************************
 * 3) ADMIN INVEST PASSWORD (EASY TO CHANGE)
 *****************************************************************/
const ADMIN_INVEST_PASSWORD = "CHANGE_ME"; // <-- admins change this anytime

const ADMIN_KEY = "gb_admin_invest_authed_v1";
const LOGIN_KEY = "gb_portfolio_login_v1";

/*****************************************************************
 * 4) USERS (your 5 accounts)
 *****************************************************************/
const USERS = Object.freeze({
  joyous: { vault: "J", password: "NoMoney?", displayName: "Joyous" },
  profit: { vault: "J", password: "NoMoney?", displayName: "Joyous" }, // alias
  bowen: { vault: "B", password: "WhiteRanger", displayName: "Bowen" },
  raijin: { vault: "R", password: "Bumass", displayName: "Raijin" },
  kaien: { vault: "K", password: "Goat", displayName: "Kaien" },
  marcus: { vault: "M", password: "Sardine", displayName: "Marcus" },
});

const VAULTS = ["J", "B", "R", "K", "M"];

/*****************************************************************
 * 5) HELPERS
 *****************************************************************/
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const norm = (s) => String(s || "").trim().toLowerCase();

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
 * 6) UI: Rename KPI Cash -> Points (text only)
 *****************************************************************/
function relabelPoints() {
  const labels = $$(".kpiLabel");
  for (const el of labels) {
    if (norm(el.textContent) === "cash") el.textContent = "Points";
  }
}

/*****************************************************************
 * 7) UI: Add Login button top-right (NO HTML edit)
 *****************************************************************/
function ensureLoginButton() {
  const topRight = $(".topRight");
  if (!topRight) return;

  if (!$("#loginBtn")) {
    const btn = document.createElement("button");
    btn.id = "loginBtn";
    btn.type = "button";
    btn.className = "btn ghost";
    btn.textContent = "Login";
    btn.style.marginLeft = "10px";
    btn.style.alignSelf = "center";
    topRight.appendChild(btn);
  }

  if (!$("#loginStatusChip")) {
    const chip = document.createElement("div");
    chip.id = "loginStatusChip";
    chip.style.cssText =
      "margin-left:10px; font-size:12px; opacity:.85; align-self:center; white-space:nowrap;";
    chip.textContent = "Not logged in";
    topRight.appendChild(chip);
  }
}

function updateStatusChip() {
  const chip = $("#loginStatusChip");
  const btn = $("#loginBtn");
  if (!chip || !btn) return;

  const sess = getLogin();
  if (!sess) {
    chip.textContent = "Not logged in";
    btn.textContent = "Login";
  } else {
    chip.textContent = `${sess.name} (${sess.vault})`;
    btn.textContent = "Account";
  }
}

/*****************************************************************
 * 8) LOGIN MODAL + Admin Unlock
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

  function hideErr() {
    const el = $("#gbLoginErr");
    if (!el) return;
    el.textContent = "";
    el.style.display = "none";
  }
  function showErr(msg) {
    const el = $("#gbLoginErr");
    if (!el) return;
    el.textContent = msg;
    el.style.display = "block";
  }

  function openModal() {
    modal.style.display = "flex";
    hideErr();
    const sess = getLogin();
    $("#gbLoginUser").value = sess?.name ? sess.name : "";
    $("#gbLoginPass").value = "";
    $("#gbLoginUser").focus();
  }
  function closeModal() {
    modal.style.display = "none";
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  $("#gbDoLogin").addEventListener("click", () => {
    hideErr();
    const u = norm($("#gbLoginUser").value);
    const p = String($("#gbLoginPass").value || "");

    const rec = USERS[u];
    if (!rec) return showErr("Unknown username.");
    if (p !== rec.password) return showErr("Wrong password.");

    setLogin({ name: rec.displayName, vault: rec.vault, at: Date.now() });
    updateStatusChip();
    closeModal();
  });

  $("#gbLogoutBtn").addEventListener("click", () => {
    clearLogin();
    updateStatusChip();
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
 * 9) INVEST LOCK (blocks app.js buy/sell handlers before they run)
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
      if (window.GBLoginUI) window.GBLoginUI.open();
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

    // allowed -> app.js handles it
  }, true);
}

/*****************************************************************
 * 10) MULTIPLAYER SYNC (no schema knowledge needed)
 * We sync the raw localStorage JSON string KEY_STATE <-> Firestore.
 *****************************************************************/
let applyingRemote = false;
let lastSeenRev = 0;
let uploadTimer = null;

function getLocalStateString() {
  try { return localStorage.getItem(KEY_STATE) || ""; } catch { return ""; }
}

function setLocalStateString(s) {
  try { localStorage.setItem(KEY_STATE, s); } catch {}
}

async function ensureServerHasState() {
  const snap = await getDoc(SHARED_DOC);
  if (snap.exists()) return;

  // Create server state from whatever current browser has (or empty)
  const json = getLocalStateString();
  await runTransaction(db, async (tx) => {
    tx.set(SHARED_DOC, {
      json,
      rev: 1,
      updatedAt: serverTimestamp(),
    });
  });
}

function patchLocalStorageSetItemForUploads() {
  const original = Storage.prototype.setItem;

  Storage.prototype.setItem = function(k, v) {
    original.call(this, k, v);

    if (k !== KEY_STATE) return;
    if (applyingRemote) return;

    // Debounce uploads (avoid spamming Firestore)
    clearTimeout(uploadTimer);
    uploadTimer = setTimeout(() => {
      uploadStateToServer(String(v ?? ""));
    }, 250);
  };
}

async function uploadStateToServer(jsonString) {
  // Write as a transaction with rev++
  try {
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(SHARED_DOC);
      const cur = snap.exists() ? snap.data() : null;
      const nextRev = (cur?.rev || 0) + 1;

      tx.set(SHARED_DOC, {
        json: jsonString,
        rev: nextRev,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    });
  } catch (e) {
    // silent fail to avoid annoying users; console helps debugging
    console.warn("Upload failed:", e);
  }
}

function subscribeToServerState() {
  onSnapshot(SHARED_DOC, (snap) => {
    if (!snap.exists()) return;

    const data = snap.data() || {};
    const rev = Number(data.rev || 0);
    const json = String(data.json || "");

    if (!rev || rev <= lastSeenRev) return;

    // Apply remote -> local and force reload so app.js uses it
    lastSeenRev = rev;
    applyingRemote = true;
    try {
      setLocalStateString(json);
    } finally {
      applyingRemote = false;
    }

    // Reload so app.js picks up shared state (no app.js edits)
    // This is what makes it feel "multiplayer".
    location.reload();
  });
}

/*****************************************************************
 * 11) Wire login button
 *****************************************************************/
function wireLoginButton() {
  const btn = $("#loginBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (window.GBLoginUI) window.GBLoginUI.open();
  });
}

/*****************************************************************
 * 12) INIT
 *****************************************************************/
async function init() {
  relabelPoints();
  ensureLoginButton();
  ensureLoginModal();
  updateStatusChip();
  wireLoginButton();
  installInvestLock();

  // Multiplayer setup
  await ensureServerHasState();
  patchLocalStorageSetItemForUploads();
  subscribeToServerState();

  // If local has no state yet but server does, pull it once without reload loop:
  try {
    const snap = await getDoc(SHARED_DOC);
    if (snap.exists()) {
      const d = snap.data() || {};
      lastSeenRev = Number(d.rev || 0);
      const serverJson = String(d.json || "");
      if (serverJson && !getLocalStateString()) {
        applyingRemote = true;
        try { setLocalStateString(serverJson); } finally { applyingRemote = false; }
        location.reload();
      }
    }
  } catch {}
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => init());
} else {
  init();
}
