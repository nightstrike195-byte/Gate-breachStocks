/* ===========================
   FILE NAME MUST BE: vault_access.js
   Login (J/B/R/K/M) + Admin Invest Lock (NO app.js edits, NO HTML edits)
   =========================== */

(() => {
  "use strict";

  /*****************************************************************
   * 0) ADMIN INVEST PASSWORD (EASY TO CHANGE)
   * - Only admins should know this.
   * - Changing this changes the unlock password immediately.
   *****************************************************************/
  const ADMIN_INVEST_PASSWORD = "CHANGE_ME"; // <-- admins change this

  // admin unlock is session-only (resets when tab/browser closes)
  const ADMIN_KEY = "gb_admin_invest_authed_v1";

  // login persists (so returning later still remembers who you were)
  const LOGIN_KEY = "gb_portfolio_login_v1";

  /*****************************************************************
   * 1) USERS + PASSWORDS
   *****************************************************************/
  const USERS = Object.freeze({
    // username -> { vault, password, displayName }
    joyous: { vault: "J", password: "NoMoney?", displayName: "Joyous" },
    profit: { vault: "J", password: "NoMoney?", displayName: "Joyous" }, // alias
    bowen: { vault: "B", password: "WhiteRanger", displayName: "Bowen" },
    raijin: { vault: "R", password: "Bumass", displayName: "Raijin" },
    kaien: { vault: "K", password: "Goat", displayName: "Kaien" },
    marcus: { vault: "M", password: "Sardine", displayName: "Marcus" },
  });

  // the only valid vault folders
  const VAULTS = ["J", "B", "R", "K", "M"];

  /*****************************************************************
   * 2) HELPERS
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
    const v = String(s?.vault || "").toUpperCase();
    return !!(s && VAULTS.includes(v));
  }

  /*****************************************************************
   * 3) UI: relabel Cash -> Points (text only)
   *****************************************************************/
  function relabelPoints() {
    const labels = $$(".kpiLabel");
    for (const el of labels) {
      if (norm(el.textContent) === "cash") el.textContent = "Points";
    }
  }

  /*****************************************************************
   * 4) UI: Ensure Login button exists TOP RIGHT (no HTML edits)
   *****************************************************************/
  function ensureLoginButton() {
    const topRight = $(".topRight");
    if (!topRight) return;

    let btn = $("#loginBtn");
    if (btn) return;

    btn = document.createElement("button");
    btn.id = "loginBtn";
    btn.type = "button";
    // reuse your existing styles if present; fall back to inline if not
    btn.className = "btn ghost";
    btn.textContent = "Login";
    btn.style.cssText = btn.style.cssText || "margin-left:10px;";

    // put it at far right of the topRight row
    topRight.appendChild(btn);
  }

  function ensureStatusChip() {
    const topRight = $(".topRight");
    if (!topRight) return;

    let chip = $("#loginStatusChip");
    if (chip) return;

    chip = document.createElement("div");
    chip.id = "loginStatusChip";
    chip.style.cssText =
      "margin-left:auto; margin-right:10px; font-size:12px; opacity:.85; align-self:center; white-space:nowrap;";
    chip.textContent = "Not logged in";

    // Insert chip before login button, if button exists
    const loginBtn = $("#loginBtn");
    if (loginBtn && loginBtn.parentElement === topRight) {
      topRight.insertBefore(chip, loginBtn);
    } else {
      topRight.appendChild(chip);
    }
  }

  function updateStatusChip() {
    const chip = $("#loginStatusChip");
    if (!chip) return;
    const sess = getLogin();
    if (!sess) chip.textContent = "Not logged in";
    else chip.textContent = `${sess.name} (${sess.vault})`;
  }

  /*****************************************************************
   * 5) LOGIN MODAL (injected)
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

            <div style="margin-top:10px; font-size:11px; opacity:.75; line-height:1.35;">
              Username <b>profit</b> logs in as <b>Joyous</b> (Folder J).
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

      // persist login
      setLogin({ name: rec.displayName, vault: rec.vault, at: Date.now() });
      updateStatusChip();
      refreshLoginButtonText();

      // select their folder (so portfolio/points/etc match that vault)
      await forceSelectFolder(rec.vault);

      closeModal();
    });

    $("#gbLogoutBtn").addEventListener("click", () => {
      clearLogin();
      updateStatusChip();
      refreshLoginButtonText();
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

    // expose open function
    window.GBLoginUI = { open: openModal };
  }

  /*****************************************************************
   * 6) FORCE SELECT FOLDER (NO app.js edits)
   * Uses Projects cards:
   *   CardName: "Folder X"
   *   Button: "Use Folder"
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
        for (let i = 0; i < 8 && card; i++) {
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

    // go Projects
    await clickNav("projects");

    // wait for cards to appear (render timing)
    const deadline = Date.now() + 2200;
    let card = null;
    while (Date.now() < deadline) {
      card = findFolderCard(L);
      if (card) break;
      await sleep(80);
    }
    if (!card) {
      // if we can't find the folder, don't crash
      await clickNav("market");
      return false;
    }

    // click "Use Folder"
    const useBtn = $$("button", card).find((b) => norm(b.textContent) === "use folder");
    if (useBtn) useBtn.click();

    await sleep(30);
    await clickNav("market");
    return true;
  }

  /*****************************************************************
   * 7) INVEST LOCK (CAPTURE-PHASE CLICK BLOCKER)
   * Blocks ALL buy/sell clicks unless:
   *  - logged in (one of the 5 accounts)
   *  - admin invest unlocked (session only)
   *****************************************************************/
  function isBuySellButton(el) {
    if (!el) return false;
    const btn = el.closest ? el.closest("button") : null;
    if (!btn) return false;

    const cls = btn.classList;
    const text = norm(btn.textContent);

    // .btn.buy / .btn.sell catches wanted + modal buttons if they use those classes
    if (cls && cls.contains("btn") && (cls.contains("buy") || cls.contains("sell"))) return true;

    // catch text-only buttons (bulk, etc.)
    if (text === "buy" || text === "sell" || text === "buy selected" || text === "sell selected") return true;

    return false;
  }

  function installInvestLock() {
    document.addEventListener("click", (e) => {
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
   * 8) LOGIN BUTTON WIRING
   *****************************************************************/
  function refreshLoginButtonText() {
    const btn = $("#loginBtn");
    if (!btn) return;
    const sess = getLogin();
    btn.textContent = sess ? "Account" : "Login";
  }

  function wireLoginButton() {
    const btn = $("#loginBtn");
    if (!btn) return;

    // avoid double-binding
    if (btn.dataset.vaultAccessBound === "1") return;
    btn.dataset.vaultAccessBound = "1";

    btn.addEventListener("click", () => {
      if (window.GBLoginUI) window.GBLoginUI.open();
    });

    refreshLoginButtonText();

    // sync across tabs
    window.addEventListener("storage", (ev) => {
      if (ev.key === LOGIN_KEY) {
        refreshLoginButtonText();
        updateStatusChip();
      }
    });
  }

  /*****************************************************************
   * 9) INIT
   *****************************************************************/
  function init() {
    // make sure button exists (top right) without HTML changes
    ensureLoginButton();
    ensureStatusChip();

    // text tweaks
    relabelPoints();

    // modal + button wiring
    ensureLoginModal();
    wireLoginButton();

    // status
    updateStatusChip();
    refreshLoginButtonText();

    // invest lock
    installInvestLock();

    // if already logged in, try to auto-select their folder once
    const sess = getLogin();
    if (sess?.vault) {
      setTimeout(() => { forceSelectFolder(sess.vault); }, 350);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /*****************************************************************
   * NOTE ABOUT SAVING:
   * - Your login is saved in localStorage, so it remains when you come back later.
   * - Your portfolio/stock holdings persistence depends on app.js storage (localStorage),
   *   which normally WILL still be there a week later unless browser storage is cleared.
   * - Admin invest unlock is sessionStorage (session only), so it will reset later.
   *****************************************************************/
})();
