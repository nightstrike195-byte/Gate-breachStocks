/* ==========================================================
   FILE: vault_access.js
   Cloud-backed per-account portfolios (Supabase)
   Works on GitHub Pages | No app.js edits | No HTML edits
   ========================================================== */

(() => {
  "use strict";

  /***********************************************************
   * 1) SUPABASE CONFIG — PASTE YOUR VALUES HERE
   ***********************************************************/
  const SUPABASE_URL = "https://xxphxfbqqjvsfiraeqng.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4cGh4ZmJxcWp2c2ZpcmFlcW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MTE3MjQsImV4cCI6MjA4MjI4NzcyNH0.cYX2gufIJfTYSwlySIhhaH1_aA2jkTwobNQciFzs1tw";

  /***********************************************************
   * 2) ACCOUNTS (UNCHANGED FROM YOUR DESIGN)
   ***********************************************************/
  const USERS = {
    joyous:  { vault: "J", password: "NoMoney?",    display: "Joyous" },
    profit:  { vault: "J", password: "NoMoney?",    display: "Joyous" },
    bowen:   { vault: "B", password: "WhiteRanger", display: "Bowen" },
    raijin:  { vault: "R", password: "Bumass",      display: "Raijin" },
    kaien:   { vault: "K", password: "Goat",        display: "Kaien" },
    marcus:  { vault: "M", password: "Sardine",     display: "Marcus" },
  };

  const LOGIN_KEY = "gb_logged_in_account";

  /***********************************************************
   * 3) SUPABASE REST HELPERS (NO SDK REQUIRED)
   ***********************************************************/
  async function sbLoad(vault) {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/portfolios?vault=eq.${vault}&select=data`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    const j = await r.json();
    return j[0]?.data ?? null;
  }

  async function sbSave(vault, data) {
    await fetch(`${SUPABASE_URL}/rest/v1/portfolios`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        vault,
        data,
        updated_at: new Date().toISOString(),
      }),
    });
  }

  /***********************************************************
   * 4) LOGIN STATE
   ***********************************************************/
  function getAccount() {
    try { return JSON.parse(localStorage.getItem(LOGIN_KEY)); }
    catch { return null; }
  }

  function setAccount(acc) {
    localStorage.setItem(LOGIN_KEY, JSON.stringify(acc));
  }

  function loginPrompt() {
    const u = prompt("Username:");
    if (!u) return;
    const p = prompt("Password:");
    if (!p) return;

    const rec = USERS[u.toLowerCase()];
    if (!rec || rec.password !== p) {
      alert("Login failed");
      return;
    }

    setAccount(rec);
    alert(`Logged in as ${rec.display}`);
    location.reload();
  }

  /***********************************************************
   * 5) HOOK INTO app.js STORAGE (TRANSPARENT SYNC)
   ***********************************************************/
  const _set = localStorage.setItem.bind(localStorage);
  const _get = localStorage.getItem.bind(localStorage);

  localStorage.setItem = function (k, v) {
    _set(k, v);

    if (k.startsWith("gbx_state")) {
      const acc = getAccount();
      if (acc) {
        try {
          sbSave(acc.vault, JSON.parse(v));
        } catch {}
      }
    }
  };

  localStorage.getItem = function (k) {
    const acc = getAccount();
    if (acc && k.startsWith("gbx_state")) {
      sbLoad(acc.vault).then((cloud) => {
        if (cloud) _set(k, JSON.stringify(cloud));
      });
    }
    return _get(k);
  };

  /***********************************************************
   * 6) FIRST-TIME LOAD / INIT
   ***********************************************************/
  async function init() {
    const acc = getAccount();
    if (!acc) {
      console.log("[Vault] Not logged in");
      return;
    }

    const cloud = await sbLoad(acc.vault);
    if (!cloud) {
      // first login → create default portfolio
      await sbSave(acc.vault, { points: 5000, holdings: [] });
    }
  }

  /***********************************************************
   * 7) LOGIN HOTKEY (NO HTML CHANGES)
   * Ctrl + L = login
   ***********************************************************/
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      loginPrompt();
    }
  });

  init();

  /***********************************************************
   * ✔ RESULT
   * - Each account has its OWN cloud portfolio
   * - Works across devices/browsers
   * - GitHub Pages compatible
   * - Free tier
   ***********************************************************/
})();
