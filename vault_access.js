/* ===========================
   FILE NAME MUST BE: vault_access.js
   Login (J/B/R/K/M) + Admin Invest Lock (NO app.js edits)
   =========================== */

(() => {
  "use strict";

  /*****************************************************************
   * 0) ADMIN INVEST PASSWORD (EASY TO CHANGE)
   *****************************************************************/
  const ADMIN_INVEST_PASSWORD = "CHANGE_ME"; // <-- admins change this

  const ADMIN_KEY = "gb_admin_invest_authed_v1";
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

  const VAULTS = ["J", "M", "B", "K", "R"];

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

  /*****************************************************************
   * 3) UI: relabel Cash -> Points
   *****************************************************************/
  function relabelPoints() {
    // In your HTML, "Cash" label is a .kpiLabel inside the Portfolio panel
    // We just rename display text.
    const labels = $$(".kpiLabel");
    for (const el of labels) {
      if (norm(el.textContent) === "cash") el.textContent = "Points";
    }
  }

  /*****************************************************************
   * 4) UI: TOP RIGHT LOGIN BUTTON + STATUS CHIP
   *****************************************************************/
  function ensureStatusChip() {
    // Make a small text next to Login showing who is logged in
    const topRight = $(".topRight");
    if (!topRight) return;

    let chip = $("#loginStatusChip");
    if (chip) return;

    chip = document.createElement("div");
    chip.id = "loginStatusChip";
    chip.style.cssText =
      "margin-right:10px; font-size:12px; opacity:.85; align-self:center; white-space:nowrap;";
    chip.textContent = "Not logged in";
    // insert before login button if possible
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
   * 5) LOGIN MODAL
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

      // Save session
      setLogin({ name: rec.displayName, vault: rec.vault, at: Date.now() });
      updateStatusChip();

      // Switch to the correct folder using Projects -> Use Folder
      await forceSelectFolder(rec.vault);

      // close
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

    // expose open function
    window.GBLoginUI = { open: openModal };
  }

  /*****************************************************************
   * 6) FORCE SELECT FOLDER (NO app.js edits)
   * Uses your existing Projects cards:
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
    // The projects view is rendered into a grid; we search for .cardName containing "Folder L"
    const names = $$(".cardName");
    for (const n of names) {
      const t = String(n.textContent || "");
      if (t.includes(`Folder ${L}`)) {
        // climb to card root
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

    // go to Projects
    await clickNav("projects");
    await sleep(50);

    // projects view should now have folder cards
    let card = findFolderCard(L);

    // if not found, give it a moment more (render timing)
    if (!card) {
      await sleep(120);
      card = findFolderCard(L);
    }
    if (!card) {
      // If still not found, just return (won't crash)
      return false;
    }

    // click "Use Folder" button inside this card
    const useBtn = $$("button", card).find(b => norm(b.textContent) === "use folder");
    if (useBtn) useBtn.click();

    // go back to Market
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
  function isLoggedIn() {
    const s = getLogin();
    return !!(s && VAULTS.includes(String(s.vault || "").toUpperCase()));
  }

  function isBuySellButton(el) {
    if (!el) return false;
    const btn = el.closest ? el.closest("button") : null;
    if (!btn) return false;

    // matches your app.js patterns:
    // .btn.buy / .btn.sell, plus bulk "Buy Selected" / "Sell Selected"
    const cls = btn.classList;
    const text = norm(btn.textContent);

    if (cls && cls.contains("btn") && (cls.contains("buy") || cls.contains("sell"))) return true;
    if (text === "buy selected" || text === "sell selected") return true;
    if (text === "buy" || text === "sell" || text === "buy selected" || text === "sell selected") return true;

    // wanted panel has BUY/SELL uppercase
    if (text === "buy" || text === "sell") return true;

    return false;
  }

  function blockInvest(message) {
    alert(message);
  }

  function installInvestLock() {
    // Capture phase so we can stop app.js handlers before they run.
    document.addEventListener("click", (e) => {
      if (!isBuySellButton(e.target)) return;

      // must be logged in
      if (!isLoggedIn()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        blockInvest("Login required to invest.");
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

      // allowed: do nothing and let app.js handle it
    }, true);
  }

  /*****************************************************************
   * 8) WIRE LOGIN BUTTON
   *****************************************************************/
  function wireLoginButton() {
    const btn = $("#loginBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      if (window.GBLoginUI) window.GBLoginUI.open();
    });

    // Optional: change button text when logged in
    const refresh = () => {
      const sess = getLogin();
      btn.textContent = sess ? "Account" : "Login";
    };
    refresh();

    window.addEventListener("storage", (ev) => {
      if (ev.key === LOGIN_KEY) {
        refresh();
        updateStatusChip();
      }
    });
  }

  /*****************************************************************
   * 9) INIT
   *****************************************************************/
  function init() {
    relabelPoints();
    ensureStatusChip();
    updateStatusChip();
    ensureLoginModal();
    wireLoginButton();
    installInvestLock();

    // If already logged in, try to select their folder once at load
    const sess = getLogin();
    if (sess?.vault) {
      // don’t block page load; attempt after a moment
      setTimeout(() => { forceSelectFolder(sess.vault); }, 300);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
