/* ===========================
   FILE NAME MUST BE: vault_access.js
   Login (J/B/R/K/M) + Admin Invest Lock + GLOBAL SYNC (Firebase RTDB)
   =========================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

(() => {
  "use strict";

  /*****************************************************************
   * 0) FIREBASE CONFIG
   * IMPORTANT: You MUST add databaseURL (see setup steps)
   *****************************************************************/
  const firebaseConfig = {
    apiKey: "AIzaSyB83MC9_KqT5zSyz9OYLtXeeHkx7o_yEig",
    authDomain: "gatebreachstocks.firebaseapp.com",
    projectId: "gatebreachstocks",
    storageBucket: "gatebreachstocks.firebasestorage.app",
    messagingSenderId: "648405105124",
    appId: "1:648405105124:web:7ebdc0d8604e126c26aff1",
    measurementId: "G-G070PSBCSC",

    // ✅ ADD THIS (Realtime Database URL)
    // Example format:
    // databaseURL: "https://gatebreachstocks-default-rtdb.firebaseio.com"
    databaseURL: "PASTE_YOUR_DATABASE_URL_HERE"
  };

  /*****************************************************************
   * 1) ADMIN INVEST PASSWORD (EASY TO CHANGE)
   *****************************************************************/
  const ADMIN_INVEST_PASSWORD = "CHANGE_ME"; // <-- admins change this anytime

  const ADMIN_KEY = "gb_admin_invest_authed_v1";
  const LOGIN_KEY = "gb_portfolio_login_v1";

  /*****************************************************************
   * 2) USERS + PASSWORDS
   *****************************************************************/
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
   * 3) GLOBAL STATE SYNC SETTINGS
   * This is the localStorage key your app.js uses for the whole game state.
   *****************************************************************/
  const LOCAL_STATE_KEY = "gbx_state_html_v1";

  // Everyone shares the SAME room => everyone sees the same investments.
  // If you ever want separate “servers”, change ROOM_ID.
  const ROOM_ID = "global"; // <-- one shared server
  const REMOTE_PATH = `rooms/${ROOM_ID}/state`;

  // Client id to prevent echo loops
  const CLIENT_ID_KEY = "gb_client_id_v1";
  const clientId = (() => {
    try {
      let id = sessionStorage.getItem(CLIENT_ID_KEY);
      if (!id) {
        id = (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2)) + "_" + Date.now();
        sessionStorage.setItem(CLIENT_ID_KEY, id);
      }
      return id;
    } catch {
      return "client_" + Date.now();
    }
  })();

  /*****************************************************************
   * 4) HELPERS
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
   * 5) UI: TOP RIGHT LOGIN BUTTON + STATUS CHIP (NO HTML REQUIRED)
   * If you already have #loginBtn in HTML, it uses it.
   * If not, it injects a login button into .topRight.
   *****************************************************************/
  function ensureLoginButton() {
    const topRight = $(".topRight");
    if (!topRight) return null;

    let btn = $("#loginBtn");
    if (btn) return btn;

    btn = document.createElement("button");
    btn.id = "loginBtn";
    btn.className = "btn ghost";
    btn.type = "button";
    btn.textContent = "Login";
    btn.style.cssText = "margin-left:10px; align-self:center;";
    topRight.appendChild(btn);
    return btn;
  }

  function ensureStatusChip() {
    const topRight = $(".topRight");
    if (!topRight) return;

    let chip = $("#loginStatusChip");
    if (chip) return;

    chip = document.createElement("div");
    chip.id = "loginStatusChip";
    chip.style.cssText =
      "margin-left:10px; font-size:12px; opacity:.85; align-self:center; white-space:nowrap;";
    chip.textContent = "Not logged in";
    topRight.appendChild(chip);
  }

  function updateStatusChip() {
    const chip = $("#loginStatusChip");
    if (!chip) return;
    const sess = getLogin();
    chip.textContent = sess ? `${sess.name} (${sess.vault})` : "Not logged in";
  }

  /*****************************************************************
   * 6) LOGIN MODAL (NO HTML REQUIRED)
   *****************************************************************/
  function ensureLoginModal() {
    if ($("#gbLoginModal")) return;

    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div id="gbLoginModal" style="
        position:fixed; inset:0; display:none; align-items:center; justify-content:center;
        background:rgba(0,0,0,.55); z-index:99999; padding:16px;">
        <div style="
          width:min(520px, 100%); background:rgba(10,16,28,.98);
          border:1px solid rgba(255,255,255,.16); border-radius:16px;
          box-shadow:0 20px 70px rgba(0,0,0,.55);
          color:#eaf2ff; padding:16px 16px 14px;
          font-family:system-ui,Segoe UI,Arial;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
            <div style="font-size:16px; font-weight:700;">Login</div>
            <button id="gbLoginClose" type="button" style="
              border:1px solid rgba(255,255,255,.18);
              background:rgba(255,255,255,.06);
              color:#eaf2ff; border-radius:10px; padding:6px 10px; cursor:pointer;">✕</button>
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
                color:#eaf2ff; border-radius:12px; padding:10px 12px; cursor:pointer;">Log out</button>

              <button id="gbDoLogin" type="button" style="
                border:1px solid rgba(255,255,255,.18);
                background:rgba(120,170,255,.18);
                color:#eaf2ff; border-radius:12px; padding:10px 12px; cursor:pointer;
                font-weight:700;">Login</button>
            </div>

            <hr style="border:none; border-top:1px solid rgba(255,255,255,.12); margin:12px 0 6px;" />

            <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
              <div style="font-size:12px; opacity:.9;">Admin Invest Lock</div>
              <button id="gbAdminUnlockBtn" type="button" style="
                border:1px solid rgba(255,255,255,.18);
                background:rgba(255,255,255,.06);
                color:#eaf2ff; border-radius:12px; padding:10px 12px; cursor:pointer;">Unlock Investing</button>
            </div>

            <div style="font-size:11px; opacity:.7;">
              Buy/Sell blocked unless: logged in + admin unlock active (session only).
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);

    const modal = $("#gbLoginModal");

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

    $("#gbLoginClose").addEventListener("click", closeModal);
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
   * 7) INVEST LOCK (BLOCK BUY/SELL unless logged in + admin unlocked)
   *****************************************************************/
  function isBuySellButton(el) {
    const btn = el?.closest ? el.closest("button") : null;
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

      // allowed: let app.js handle it
    }, true);
  }

  /*****************************************************************
   * 8) GLOBAL SYNC: Mirror localStorage state <-> Firebase RTDB
   * This is what makes it "multiplayer": everyone shares the same state.
   *****************************************************************/
  let suppressLocalToRemote = false;
  let suppressRemoteToLocal = false;
  let pendingReload = null;

  function scheduleReload(reason) {
    // avoid reload spam
    if (pendingReload) return;
    pendingReload = setTimeout(() => {
      pendingReload = null;
      location.reload();
    }, 250);
  }

  function installLocalStorageMirror(db) {
    const originalSetItem = localStorage.setItem.bind(localStorage);

    localStorage.setItem = (k, v) => {
      originalSetItem(k, v);

      // Only mirror the game state key
      if (k !== LOCAL_STATE_KEY) return;
      if (suppressLocalToRemote) return;

      // Push whole state to server
      try {
        const payload = { data: String(v), by: clientId, ts: Date.now() };
        set(ref(db, REMOTE_PATH), payload);
      } catch {}
    };
  }

  function installRemoteListener(db) {
    const r = ref(db, REMOTE_PATH);

    onValue(r, (snap) => {
      const val = snap.val();

      // If server has nothing yet, bootstrap from local (first visitor becomes source of truth)
      if (!val || typeof val.data !== "string") {
        const local = localStorage.getItem(LOCAL_STATE_KEY);
        if (local && !suppressLocalToRemote) {
          try { set(ref(db, REMOTE_PATH), { data: String(local), by: clientId, ts: Date.now() }); } catch {}
        }
        return;
      }

      // Ignore echoes from ourselves
      if (val.by === clientId) return;

      // Apply remote state to local
      const current = localStorage.getItem(LOCAL_STATE_KEY);
      if (current === val.data) return;

      suppressLocalToRemote = true;
      try {
        localStorage.setItem(LOCAL_STATE_KEY, val.data);
      } finally {
        // release after a tick
        setTimeout(() => { suppressLocalToRemote = false; }, 0);
      }

      // app.js keeps state in memory; easiest safe way is refresh.
      scheduleReload("remote-update");
    });
  }

  /*****************************************************************
   * 9) INIT
   *****************************************************************/
  async function init() {
    // UI
    ensureLoginButton();
    ensureStatusChip();
    updateStatusChip();
    ensureLoginModal();

    const loginBtn = $("#loginBtn");
    if (loginBtn) {
      loginBtn.addEventListener("click", () => window.GBLoginUI?.open?.());
      const refresh = () => { loginBtn.textContent = getLogin() ? "Account" : "Login"; };
      refresh();
      window.addEventListener("storage", (ev) => {
        if (ev.key === LOGIN_KEY) { refresh(); updateStatusChip(); }
      });
    }

    // Locks
    installInvestLock();

    // Firebase
    if (!firebaseConfig.databaseURL || firebaseConfig.databaseURL.includes("PASTE_")) {
      console.warn("Firebase databaseURL missing. Realtime sync will NOT work until set.");
      return;
    }

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    installLocalStorageMirror(db);
    installRemoteListener(db);

    // Optional: initial bootstrap if local exists but remote empty will happen in listener
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
