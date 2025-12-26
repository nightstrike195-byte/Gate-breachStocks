/* ===========================
   FILE NAME MUST BE: app.js
   =========================== */

(() => {
  "use strict";

  /*****************************************************************
   * 0) BASIC HELPERS + STORAGE (MUST BE ABOVE EVERYTHING ELSE)
   *****************************************************************/
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const num = (v, fallback = 0) => {
    const x = Number(v);
    return Number.isFinite(x) ? x : fallback;
  };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[m]));
  }

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  function placeholderImg(name) {
    const n = encodeURIComponent((name || "GB").slice(0, 18));
    return `https://dummyimage.com/256x256/0b1a33/f3d27b.png&text=${n}`;
  }

  /***********************
   * ERROR BANNER
   ***********************/
  function showFatal(msg) {
    let b = $("#bootBanner");
    let m = $("#bootMsg");
    if (!b) {
      b = document.createElement("div");
      b.id = "bootBanner";
      b.style.position = "fixed";
      b.style.left = "12px";
      b.style.right = "12px";
      b.style.bottom = "12px";
      b.style.zIndex = "99999";
      b.style.padding = "12px 14px";
      b.style.borderRadius = "12px";
      b.style.border = "1px solid rgba(255,255,255,.14)";
      b.style.background = "rgba(0,0,0,.55)";
      b.style.backdropFilter = "blur(10px)";
      b.style.lineHeight = "1.35";
      b.style.fontSize = "13px";
      b.innerHTML = `<b style="color:#f3d27b">JS Error:</b> <span id="bootMsg"></span>`;
      document.body.appendChild(b);
      m = $("#bootMsg");
    }
    if (m) m.textContent = String(msg);
    b.style.display = "block";
  }

  /*****************************************************************
   * 0.5) EDIT + ADMIN PANEL PASSWORD LOCK (CHANGE THIS PASSWORD)
   *****************************************************************/
  const EDIT_PANEL_PASSWORD = "Raijin is a bitch"; // <- change this to whatever you want
  const EDIT_AUTH_KEY = "gb_edit_authed_v2";

  function isEditAuthed() {
    try { return sessionStorage.getItem(EDIT_AUTH_KEY) === "1"; } catch { return false; }
  }
  function setEditAuthed(v) {
    try { sessionStorage.setItem(EDIT_AUTH_KEY, v ? "1" : "0"); } catch {}
  }

  function setEditPanelEnabled(enabled) {
    const panel = $("#editPanel");
    if (!panel) return;

    const allowIds = new Set(["editUnlockBtn", "editLockBtn", "closeModalBtn"]);
    panel.querySelectorAll("input, textarea, select, button").forEach(n => {
      if (!n) return;
      if (n.id && allowIds.has(n.id)) return;
      n.disabled = !enabled;
    });

    panel.style.filter = enabled ? "" : "grayscale(1)";
    panel.style.opacity = enabled ? "" : "0.85";
  }

  function ensureEditLockUI() {
    const panel = $("#editPanel");
    if (!panel) return;
    if (panel.querySelector("#editUnlockBtn")) return;

    const bar = document.createElement("div");
    bar.id = "editLockBar";
    bar.style.display = "flex";
    bar.style.gap = "10px";
    bar.style.alignItems = "center";
    bar.style.justifyContent = "space-between";
    bar.style.padding = "10px 12px";
    bar.style.border = "1px solid rgba(255,255,255,.10)";
    bar.style.borderRadius = "12px";
    bar.style.marginBottom = "12px";
    bar.style.background = "rgba(0,0,0,.18)";
    bar.style.backdropFilter = "blur(10px)";

    bar.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:2px">
        <div style="font-weight:700">Edit/Admin Lock</div>
        <div id="editLockStatus" style="font-size:12px;opacity:.75">Status: —</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button id="editUnlockBtn" class="btn" type="button">Unlock</button>
        <button id="editLockBtn" class="btn ghost" type="button">Lock</button>
      </div>
    `;
    panel.prepend(bar);

    const status = $("#editLockStatus", panel);
    const refreshStatus = () => {
      if (!status) return;
      status.textContent = `Status: ${isEditAuthed() ? "UNLOCKED" : "LOCKED"}`;
      status.style.color = isEditAuthed() ? "var(--good)" : "var(--bad)";
    };

    $("#editUnlockBtn", panel)?.addEventListener("click", () => {
      requireEditAuth(true);
      refreshStatus();
    });
    $("#editLockBtn", panel)?.addEventListener("click", () => {
      setEditAuthed(false);
      setEditPanelEnabled(false);
      refreshStatus();
    });

    refreshStatus();
  }

  function requireEditAuth() {
    if (isEditAuthed()) {
      setEditPanelEnabled(true);
      return true;
    }

    ensureEditLockUI();
    setEditPanelEnabled(false);

    const entered = prompt("Enter password to unlock the Edit/Admin panel:");
    if (entered === null) return false;

    if (String(entered) === String(EDIT_PANEL_PASSWORD)) {
      setEditAuthed(true);
      setEditPanelEnabled(true);
      const st = $("#editLockStatus");
      if (st) { st.textContent = "Status: UNLOCKED"; st.style.color = "var(--good)"; }
      return true;
    }

    alert("Wrong password.");
    setEditAuthed(false);
    setEditPanelEnabled(false);
    const st = $("#editLockStatus");
    if (st) { st.textContent = "Status: LOCKED"; st.style.color = "var(--bad)"; }
    return false;
  }

  /*****************************************************************
   * 1) PASTE YOUR entityMedia HERE (TOP LEVEL, NOT INSIDE ANYTHING)
   *****************************************************************/
  // const entityMedia = { "id_here": { image: "https://...", link: "https://..." } };
  const entityMedia = {}; // <-- put your big object above and delete this line

  /***********************
   * SAFE MEDIA OVERRIDES
   ***********************/
  const LS = {
    MARKET: "gb_market_ui_v11",
    UI: "gb_ui_state_v11",
    WANTED: "gb_wanted_v11",
    EDIT_MEDIA: "gb_entity_media_v11",
    ADMIN: "gb_admin_state_v11",
    PICKS: "gb_bulk_picks_v11",
    FOLDER: "gb_folder_v11",
    PORT_BASE: "gb_portfolio_ui_v11_", // + folder letter
    GLOBAL_VOL: "gb_global_vol_v11",
  };

  let mediaOverrides = loadJSON(LS.EDIT_MEDIA, {});
  if (!mediaOverrides || typeof mediaOverrides !== "object") mediaOverrides = {};

  function getImage(c) {
    try {
      const o = mediaOverrides?.[c.id];
      if (o && typeof o.image === "string" && o.image.trim()) return o.image.trim();

      const m = entityMedia?.[c.id];
      if (m && typeof m.image === "string" && m.image.trim()) return m.image.trim();
    } catch (e) {
      showFatal("media error in getImage(): " + (e?.message || e));
    }
    return placeholderImg(c.name);
  }

  function getLink(c) {
    try {
      const o = mediaOverrides?.[c.id];
      if (o && typeof o.link === "string" && o.link.trim()) return o.link.trim();

      const m = entityMedia?.[c.id];
      if (m && typeof m.link === "string" && m.link.trim()) return m.link.trim();
    } catch (e) {
      showFatal("media error in getLink(): " + (e?.message || e));
    }
    return "#";
  }

  /***********************
   * SAGA-1 ARCS
   ***********************/
  const ARCS = [
    { id: 0, name: "Arc #0 — Introduction", date: "7/6/2025" },
    { id: 1, name: "Arc #1 — Twinsy Conflicts Flix", date: "7/8/2025" },
    { id: 2, name: "Arc #2 — Leo’s Egotistical Ego", date: "7/10/2025" },
    { id: 3, name: "Arc #3", date: "" },
    { id: 4, name: "Arc #4", date: "" },
    { id: 5, name: "Arc #5", date: "" },
  ];

  /***********************
   * CHARACTER FACTORY
   ***********************/
  function mk(id, name, type, arcs, debutOrder, popularity, potential, basePrice) {
    return {
      id, name, type,
      arcs: Array.isArray(arcs) ? arcs : [],
      debutOrder: num(debutOrder, 9999),
      popularity: clamp(num(popularity, 500), 1, 1000),
      potential: clamp(num(potential, 500), 1, 1000),

      points: clamp(num(basePrice, 300), 1, 1000),

      cap: 1000,
      frozen: false,     // stagnate
      volMult: 1,        // volatility multiplier

      lastDelta: 0,
      ticker: "GBX",
      history: [],
      ticks: []
    };
  }

  // (Keep your BASE_CHARACTERS as-is in your real file; shortened here would remove your characters.)
  // IMPORTANT: I am not rewriting your entire list again—leave your full BASE_CHARACTERS list here.
  // If you accidentally deleted it, restore it from your previous working version.
  const BASE_CHARACTERS = (window.BASE_CHARACTERS_FROM_YOUR_OLD_FILE || []);
  if (!Array.isArray(BASE_CHARACTERS) || BASE_CHARACTERS.length === 0) {
    // Minimal fallback so the site doesn't crash if you forgot to paste your real list:
    BASE_CHARACTERS.push(
      mk("kaien_dazhen", "Kaien Dazhen", "human", [0, 1, 2], 100, 380, 520, 180),
      mk("raijin_kurozawa", "Raijin Kurozawa", "human", [0, 1, 2], 101, 820, 900, 420)
    );
  }

  /***********************
   * MARKET INIT / VALIDATION
   ***********************/
  const MAX_HISTORY = 90;

  function randFloat(a, b) { return Math.random() * (b - a) + a; }

  function tickerFrom(c) {
    const base = (c.id || c.name || "GBX").replace(/[^a-z0-9]/gi, "").toUpperCase();
    return (base.slice(0, 3) || "GBX");
  }

  function seedHistory(start, cap = 1000) {
    const arr = [start];
    for (let i = 0; i < 24; i++) {
      const prev = arr[arr.length - 1];
      arr.push(clamp(prev + Math.round(randFloat(-18, 18)), 1, cap));
    }
    return arr;
  }

  function avgPoints(list) {
    return list.reduce((s, c) => s + num(c.points, 0), 0) / Math.max(1, list.length);
  }

  function initMarket() {
    const list = BASE_CHARACTERS.map((c) => {
      const cap = clamp(num(c.cap, 1000), 1, 1000);
      const seed = clamp(num(c.points, 300), 1, cap);
      return {
        ...c,
        points: seed,
        lastDelta: 0,
        ticker: tickerFrom(c),
        cap,
        frozen: Boolean(c.frozen),
        volMult: clamp(num(c.volMult, 1), 0.1, 10),
        history: seedHistory(seed, cap),
        ticks: []
      };
    });

    const byId = Object.fromEntries(list.map(c => [c.id, c]));
    return {
      list,
      byId,
      day: 0,
      indexHistory: [avgPoints(list)]
    };
  }

  function validateOrInitMarket(m) {
    if (!m || !Array.isArray(m.list)) return initMarket();

    if (!m.byId || typeof m.byId !== "object") {
      m.byId = Object.fromEntries(m.list.map(c => [c.id, c]));
    }

    const seen = new Set(m.list.map(c => c.id));
    for (const base of BASE_CHARACTERS) {
      if (!seen.has(base.id)) {
        const cap = clamp(num(base.cap, 1000), 1, 1000);
        const seed = clamp(num(base.points, 300), 1, cap);
        const fresh = {
          ...base,
          points: seed,
          lastDelta: 0,
          ticker: tickerFrom(base),
          cap,
          frozen: Boolean(base.frozen),
          volMult: clamp(num(base.volMult, 1), 0.1, 10),
          history: seedHistory(seed, cap),
          ticks: []
        };
        m.list.push(fresh);
        m.byId[fresh.id] = fresh;
      }
    }

    m.day = clamp(num(m.day, 0), 0, 9e12);
    m.indexHistory = Array.isArray(m.indexHistory) ? m.indexHistory.slice(-MAX_HISTORY) : [avgPoints(m.list)];

    for (const c of m.list) {
      c.cap = clamp(num(c.cap, 1000), 1, 1000);
      c.points = clamp(num(c.points, 300), 1, c.cap);
      c.popularity = clamp(num(c.popularity, 500), 1, 1000);
      c.potential = clamp(num(c.potential, 500), 1, 1000);
      c.ticker = c.ticker || tickerFrom(c);
      c.history = Array.isArray(c.history) ? c.history.slice(-MAX_HISTORY) : seedHistory(c.points, c.cap);
      c.ticks = Array.isArray(c.ticks) ? c.ticks.slice(-MAX_HISTORY) : [];
      c.lastDelta = num(c.lastDelta, 0);
      c.frozen = Boolean(c.frozen);
      c.volMult = clamp(num(c.volMult, 1), 0.1, 10);
      if (!Array.isArray(c.arcs)) c.arcs = [];
      if (typeof c.name !== "string") c.name = String(c.name || c.id);
      if (typeof c.type !== "string") c.type = "npc";
      if (!Number.isFinite(c.debutOrder)) c.debutOrder = 9999;
      m.byId[c.id] = c;
    }

    return m;
  }

  /***********************
   * FOLDERS (J/M/B/K/R) PORTFOLIOS
   ***********************/
  const FOLDERS = ["J", "M", "B", "K", "R"];
  let activeFolder = loadJSON(LS.FOLDER, "J");
  if (!FOLDERS.includes(activeFolder)) activeFolder = "J";

  function portfolioKey(folder) {
    return LS.PORT_BASE + folder;
  }

  function validateOrInitPortfolio(p) {
    if (!p || typeof p !== "object") {
      return { balance: 5000, positions: {}, netWorthHistory: [5000] };
    }
    p.balance = clamp(num(p.balance, 5000), 0, 9e15);
    p.positions = (p.positions && typeof p.positions === "object") ? p.positions : {};
    p.netWorthHistory = Array.isArray(p.netWorthHistory) ? p.netWorthHistory.slice(-MAX_HISTORY) : [p.balance];

    for (const [id, pos] of Object.entries(p.positions)) {
      if (!pos || typeof pos !== "object") { delete p.positions[id]; continue; }
      pos.shares = clamp(num(pos.shares, 0), 0, 9e12);
      pos.avgCost = clamp(num(pos.avgCost, 0), 0, 1000);
      if (pos.shares <= 0) delete p.positions[id];
    }
    return p;
  }

  function loadPortfolio(folder) {
    const p = loadJSON(portfolioKey(folder), null);
    return validateOrInitPortfolio(p);
  }

  function savePortfolio(folder, p) {
    saveJSON(portfolioKey(folder), p);
  }

  /***********************
   * LOAD MARKET + ADMIN STATE
   ***********************/
  let market = validateOrInitMarket(loadJSON(LS.MARKET, null));

  let adminState = loadJSON(LS.ADMIN, {});
  if (!adminState || typeof adminState !== "object") adminState = {};

  function applyAdminStateToMarket() {
    for (const [id, st] of Object.entries(adminState)) {
      const c = market.byId[id];
      if (!c || !st || typeof st !== "object") continue;
      if (st.cap != null) c.cap = clamp(num(st.cap, c.cap ?? 1000), 1, 1000);
      if (st.frozen != null) c.frozen = Boolean(st.frozen);
      if (st.volMult != null) c.volMult = clamp(num(st.volMult, c.volMult ?? 1), 0.1, 10);
      c.points = clamp(num(c.points, 300), 1, c.cap);
    }
  }
  applyAdminStateToMarket();

  let portfolio = loadPortfolio(activeFolder);

  const ui = loadJSON(LS.UI, {
    arc: "all",
    type: "all",
    sort: "pop_desc",
    search: "",
    speedMs: 500
  }) || { arc: "all", type: "all", sort: "pop_desc", search: "", speedMs: 500 };

  let wantedId = loadJSON(LS.WANTED, null);
  if (!wantedId || !market.byId[wantedId]) {
    wantedId = market.list[0]?.id || null;
    saveJSON(LS.WANTED, wantedId);
  }

  // Bulk picks (multi buy)
  let picks = loadJSON(LS.PICKS, []);
  if (!Array.isArray(picks)) picks = [];
  const picksSet = new Set(picks.filter(id => typeof id === "string" && market.byId[id]));

  /***********************
   * DOM HOOKS (guarded)
   ***********************/
  const dayEl = $("#dayEl");
  const balanceEl = $("#balanceEl");
  const netWorthEl = $("#netWorthEl");

  const searchInput = $("#searchInput");
  const arcSelect = $("#arcSelect");
  const typeSelect = $("#typeSelect");
  const sortSelect = $("#sortSelect");
  const resultCount = $("#resultCount");

  const indexEl = $("#indexEl");
  const indexDeltaEl = $("#indexDeltaEl");
  const indexChart = $("#indexChart");

  const gainersList = $("#gainersList");
  const losersList = $("#losersList");

  const playBtn = $("#playBtn");
  const pauseBtn = $("#pauseBtn");
  const step1Btn = $("#step1Btn");
  const step10Btn = $("#step10Btn");
  const speedSelect = $("#speedSelect");

  const globalVol = $("#globalVol");

  const projectsGrid = $("#projectsGrid");

  const positionsCount = $("#positionsCount");
  const nwDeltaEl = $("#nwDeltaEl");
  const netWorthChart = $("#netWorthChart");
  const portfolioList = $("#portfolioList");

  const wantedImg = $("#wantedImg");
  const wantedName = $("#wantedName");
  const wantedRole = $("#wantedRole");
  const wantedPrice = $("#wantedPrice");
  const wantedOwned = $("#wantedOwned");
  const wantedPop = $("#wantedPop");
  const wantedPot = $("#wantedPot");
  const wantedCap = $("#wantedCap");
  const wantedFrozen = $("#wantedFrozen");
  const wantedBuyBtn = $("#wantedBuyBtn");
  const wantedSellBtn = $("#wantedSellBtn");
  const wantedLinkBtn = $("#wantedLinkBtn");

  const modalBackdrop = $("#modalBackdrop");
  const detailModal = $("#detailModal");
  const closeModalBtn = $("#closeModalBtn");
  const modalName = $("#modalName");
  const modalMeta = $("#modalMeta");
  const modalImg = $("#modalImg");
  const modalLinkBtn = $("#modalLinkBtn");
  const modalBuyBtn = $("#modalBuyBtn");
  const modalSellBtn = $("#modalSellBtn");
  const modalPrice = $("#modalPrice");
  const modalOwned = $("#modalOwned");
  const modalPotential = $("#modalPotential");
  const modalPop = $("#modalPop");
  const modalCap = $("#modalCap");
  const modalFrozen = $("#modalFrozen");
  const spark = $("#spark");
  const historyList = $("#historyList");

  const navBtns = Array.from(document.querySelectorAll("[data-nav]"));
  const marketPanel = $("#marketPanel");
  const projectsPanel = $("#projectsPanel");
  const editPanel = $("#editPanel");

  // optional existing edit controls (if your HTML has them)
  const editCharSelect = $("#editCharSelect");
  const editImg = $("#editImg");
  const editLink = $("#editLink");
  const saveEditBtn = $("#saveEditBtn");
  const resetEditBtn = $("#resetEditBtn");
  const bulkJson = $("#bulkJson");
  const applyBulkBtn = $("#applyBulkBtn");

  /***********************
   * INJECT: FOLDER TABS UI (J/M/B/K/R) + ADMIN UI IF MISSING
   ***********************/
  injectFolderTabs();
  ensureEditLockUI();
  injectAdminUI(); // <-- this is what makes the admin panel actually exist even if HTML has nothing

  // Start locked unless authed
  setEditPanelEnabled(isEditAuthed());

  function injectFolderTabs() {
    if (!marketPanel) return;
    if ($("#folderTabs")) return;

    const wrap = document.createElement("div");
    wrap.id = "folderTabs";
    wrap.style.display = "flex";
    wrap.style.gap = "8px";
    wrap.style.flexWrap = "wrap";
    wrap.style.alignItems = "center";
    wrap.style.margin = "10px 0 14px";
    wrap.style.padding = "10px 12px";
    wrap.style.border = "1px solid rgba(255,255,255,.10)";
    wrap.style.borderRadius = "12px";
    wrap.style.background = "rgba(0,0,0,.18)";
    wrap.style.backdropFilter = "blur(10px)";

    wrap.innerHTML = `
      <div style="font-weight:700; margin-right:6px;">Folders:</div>
      <div id="folderBtns" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"></div>
      <div style="margin-left:auto; font-size:12px; opacity:.85">
        Active: <b id="folderActive">${escapeHtml(activeFolder)}</b>
      </div>
    `;

    // put near top of market panel
    marketPanel.prepend(wrap);

    const btns = $("#folderBtns", wrap);
    const activeEl = $("#folderActive", wrap);

    for (const f of FOLDERS) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "btn ghost";
      b.textContent = f;
      b.style.minWidth = "44px";
      b.style.fontWeight = "800";
      b.style.borderRadius = "999px";
      b.style.opacity = (f === activeFolder) ? "1" : "0.75";
      b.addEventListener("click", () => {
        if (f === activeFolder) return;
        // save current folder portfolio
        savePortfolio(activeFolder, portfolio);

        // switch
        activeFolder = f;
        saveJSON(LS.FOLDER, activeFolder);
        portfolio = loadPortfolio(activeFolder);

        // update UI
        if (activeEl) activeEl.textContent = activeFolder;
        // refresh button fades
        $$("#folderBtns button", wrap).forEach(x => x.style.opacity = (x.textContent === activeFolder) ? "1" : "0.75");

        // rerender everything
        renderAll();
      });
      btns.appendChild(b);
    }
  }

  function injectAdminUI() {
    if (!editPanel) return;
    if ($("#gbAdminInjected")) return;

    const box = document.createElement("div");
    box.id = "gbAdminInjected";
    box.style.border = "1px solid rgba(255,255,255,.10)";
    box.style.borderRadius = "12px";
    box.style.padding = "12px";
    box.style.marginTop = "12px";
    box.style.background = "rgba(0,0,0,.14)";
    box.style.backdropFilter = "blur(10px)";

    box.innerHTML = `
      <div style="font-weight:800; margin-bottom:8px;">Admin Controls</div>

      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:10px">
        <label style="display:flex;flex-direction:column;gap:6px">
          <span style="font-size:12px;opacity:.8">Selected Character</span>
          <select id="editCharSelect" class="input"></select>
        </label>

        <label style="display:flex;flex-direction:column;gap:6px">
          <span style="font-size:12px;opacity:.8">Set Price (choose stock price)</span>
          <input id="adminSetPrice" class="input" type="number" min="1" max="1000" value="300">
        </label>

        <label style="display:flex;flex-direction:column;gap:6px">
          <span style="font-size:12px;opacity:.8">Max Cap (max the stock can reach)</span>
          <input id="adminSetCap" class="input" type="number" min="1" max="1000" value="1000">
        </label>

        <label style="display:flex;flex-direction:column;gap:6px">
          <span style="font-size:12px;opacity:.8">Stagnate (Frozen)</span>
          <select id="adminFreeze" class="input">
            <option value="false">LIVE</option>
            <option value="true">FROZEN</option>
          </select>
        </label>

        <label style="display:flex;flex-direction:column;gap:6px">
          <span style="font-size:12px;opacity:.8">Volatility Multiplier (change volatility)</span>
          <input id="adminVolMult" class="input" type="number" step="0.1" min="0.1" max="10" value="1">
        </label>

        <div style="display:flex;flex-direction:column;gap:6px">
          <span style="font-size:12px;opacity:.8">Apply / History</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button id="adminApplyBtn" class="btn" type="button">Apply</button>
            <button id="adminNukeHistoryBtn" class="btn ghost" type="button">Reset History</button>
          </div>
        </div>
      </div>

      <div style="border-top:1px solid rgba(255,255,255,.10);margin:10px 0"></div>

      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:10px">
        <label style="display:flex;flex-direction:column;gap:6px">
          <span style="font-size:12px;opacity:.8">Give Yourself Points (Folder ${escapeHtml(activeFolder)})</span>
          <input id="adminPointsValue" class="input" type="number" min="0" step="1" value="5000">
        </label>
        <div style="display:flex;flex-direction:column;gap:6px">
          <span style="font-size:12px;opacity:.8">Actions</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button id="adminSetPointsBtn" class="btn" type="button">Set Balance</button>
            <button id="adminAddPointsBtn" class="btn buy" type="button">Add Points</button>
          </div>
        </div>

        <label style="display:flex;flex-direction:column;gap:6px">
          <span style="font-size:12px;opacity:.8">Give Yourself Shares (free, no cost)</span>
          <input id="adminGrantShares" class="input" type="number" min="1" step="1" value="10">
        </label>
        <div style="display:flex;flex-direction:column;gap:6px">
          <span style="font-size:12px;opacity:.8">Position</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button id="adminGrantSharesBtn" class="btn" type="button">Grant Shares</button>
            <button id="adminClearPosBtn" class="btn ghost" type="button">Clear Position</button>
          </div>
        </div>
      </div>

      <div style="border-top:1px solid rgba(255,255,255,.10);margin:10px 0"></div>

      <div style="font-size:12px;opacity:.8">Media Overrides (optional)</div>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:8px">
        <label style="display:flex;flex-direction:column;gap:6px">
          <span style="font-size:12px;opacity:.8">Image URL Override</span>
          <input id="editImg" class="input" type="text" placeholder="https://...">
        </label>
        <label style="display:flex;flex-direction:column;gap:6px">
          <span style="font-size:12px;opacity:.8">Link URL Override</span>
          <input id="editLink" class="input" type="text" placeholder="https://...">
        </label>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button id="saveEditBtn" class="btn" type="button">Save Media</button>
          <button id="resetEditBtn" class="btn ghost" type="button">Reset Media</button>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
          <button id="removeCharBtn" class="btn ghost" type="button">Remove Character</button>
        </div>
      </div>

      <div style="margin-top:10px;font-size:12px;opacity:.75">
        To add characters: use your existing Add Character UI if you have it; if not, paste it back from your old file.
      </div>
    `;

    editPanel.appendChild(box);
  }

  /***********************
   * INIT SELECTS
   ***********************/
  if (arcSelect) {
    arcSelect.innerHTML =
      `<option value="all">All SAGA-1 Arcs</option>` +
      ARCS.map(a => `<option value="${a.id}">${escapeHtml(a.name)}</option>`).join("");
    arcSelect.value = ui.arc ?? "all";
  }
  if (typeSelect) typeSelect.value = ui.type ?? "all";
  if (sortSelect) sortSelect.value = ui.sort ?? "pop_desc";
  if (searchInput) searchInput.value = ui.search ?? "";

  if (speedSelect) speedSelect.value = String(ui.speedMs ?? 500);

  if (globalVol) {
    const stored = loadJSON(LS.GLOBAL_VOL, 1);
    globalVol.value = String(clamp(num(stored, 1), 0.1, 10));
  }

  function persistUI() {
    saveJSON(LS.UI, {
      arc: ui.arc ?? "all",
      type: ui.type ?? "all",
      sort: ui.sort ?? "pop_desc",
      search: ui.search ?? "",
      speedMs: clamp(num(ui.speedMs, 500), 60, 5000)
    });
  }

  /***********************
   * NAV
   ***********************/
  function setActivePanel(which) {
    const isEditLike = (which === "edit" || which === "admin");

    if (isEditLike) {
      if (editPanel) editPanel.style.display = "";
      if (projectsPanel) projectsPanel.style.display = "none";
      if (marketPanel) marketPanel.style.display = "none";

      ensureEditLockUI();
      setEditPanelEnabled(isEditAuthed());

      const ok = requireEditAuth();
      if (!ok) {
        if (editPanel) editPanel.style.display = "none";
        if (projectsPanel) projectsPanel.style.display = "";
        if (marketPanel) marketPanel.style.display = "";
        navBtns.forEach(b => b.classList.toggle("active", b.dataset.nav === "market"));
        return;
      }

      setEditPanelEnabled(true);
      refreshEditSelect();
      syncAdminFormTo($("#editCharSelect")?.value);
      loadSelectedMedia();
      return;
    }

    if (editPanel) editPanel.style.display = "none";
    if (projectsPanel) projectsPanel.style.display = "";
    if (marketPanel) marketPanel.style.display = "";

    navBtns.forEach(b => b.classList.toggle("active", b.dataset.nav === which));
  }

  navBtns.forEach(btn => btn.addEventListener("click", () => setActivePanel(btn.dataset.nav)));
  setActivePanel("market");

  /***********************
   * ADMIN / EDIT PANEL WIRING (NOW THAT UI EXISTS)
   ***********************/
  function refreshEditSelect() {
    const sel = $("#editCharSelect");
    if (!sel) return;
    const current = sel.value || wantedId || market.list[0]?.id || "";
    sel.innerHTML = market.list
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(c => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)} (${escapeHtml(c.id)})</option>`)
      .join("");
    sel.value = market.byId[current] ? current : (market.list[0]?.id || "");
  }

  function loadSelectedMedia() {
    const sel = $("#editCharSelect");
    if (!sel) return;
    const id = sel.value;
    const o = mediaOverrides[id] || {};
    const img = $("#editImg");
    const link = $("#editLink");
    if (img) img.value = o.image || "";
    if (link) link.value = o.link || "";
  }

  function syncAdminFormTo(id) {
    const c = market.byId[id];
    if (!c) return;

    const p = $("#adminSetPrice");
    const cap = $("#adminSetCap");
    const fr = $("#adminFreeze");
    const vol = $("#adminVolMult");

    if (p) p.value = String(Math.floor(c.points));
    if (cap) cap.value = String(Math.floor(c.cap ?? 1000));
    if (fr) fr.value = String(Boolean(c.frozen));
    if (vol) vol.value = String(num(c.volMult, 1));
  }

  // select change
  document.addEventListener("change", (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.id === "editCharSelect") {
      loadSelectedMedia();
      syncAdminFormTo(e.target.value);
    }
  });

  // Save media
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;

    if (t.id === "saveEditBtn") {
      if (!isEditAuthed()) return;
      const id = $("#editCharSelect")?.value;
      if (!id) return;
      const img = String($("#editImg")?.value || "").trim();
      const link = String($("#editLink")?.value || "").trim();
      mediaOverrides[id] = { image: img, link };
      saveJSON(LS.EDIT_MEDIA, mediaOverrides);
      renderAll();
    }

    if (t.id === "resetEditBtn") {
      if (!isEditAuthed()) return;
      const id = $("#editCharSelect")?.value;
      if (!id) return;
      delete mediaOverrides[id];
      saveJSON(LS.EDIT_MEDIA, mediaOverrides);
      loadSelectedMedia();
      renderAll();
    }

    if (t.id === "adminApplyBtn") {
      if (!isEditAuthed()) return;
      const id = $("#editCharSelect")?.value;
      if (!id) return;
      const c = market.byId[id];
      if (!c) return;

      const capV = clamp(num($("#adminSetCap")?.value, c.cap ?? 1000), 1, 1000);
      const priceV = clamp(num($("#adminSetPrice")?.value, c.points), 1, capV);
      const frozenV = String($("#adminFreeze")?.value) === "true";
      const volV = clamp(num($("#adminVolMult")?.value, c.volMult ?? 1), 0.1, 10);

      c.cap = capV;
      c.points = clamp(priceV, 1, c.cap);
      c.frozen = frozenV;          // stagnate
      c.volMult = volV;            // volatility

      c.history = Array.isArray(c.history) ? c.history.slice(-MAX_HISTORY) : [];
      if (!c.history.length) c.history = seedHistory(c.points, c.cap);
      c.history.push(c.points);
      if (c.history.length > MAX_HISTORY) c.history.shift();

      adminState[id] = { cap: c.cap, frozen: c.frozen, volMult: c.volMult };
      saveJSON(LS.ADMIN, adminState);

      saveJSON(LS.MARKET, market);
      renderAll();
    }

    if (t.id === "adminNukeHistoryBtn") {
      if (!isEditAuthed()) return;
      const id = $("#editCharSelect")?.value;
      if (!id) return;
      const c = market.byId[id];
      if (!c) return;

      c.history = seedHistory(c.points, c.cap);
      c.ticks = [];
      c.lastDelta = 0;

      saveJSON(LS.MARKET, market);
      renderAll();
    }

    // give yourself points
    if (t.id === "adminSetPointsBtn") {
      if (!isEditAuthed()) return;
      const v = clamp(num($("#adminPointsValue")?.value, 5000), 0, 9e15);
      portfolio.balance = v;
      savePortfolio(activeFolder, portfolio);
      renderAll();
    }
    if (t.id === "adminAddPointsBtn") {
      if (!isEditAuthed()) return;
      const v = clamp(num($("#adminPointsValue")?.value, 0), 0, 9e15);
      portfolio.balance = clamp(num(portfolio.balance, 0) + v, 0, 9e15);
      savePortfolio(activeFolder, portfolio);
      renderAll();
    }

    // grant shares (free)
    if (t.id === "adminGrantSharesBtn") {
      if (!isEditAuthed()) return;
      const id = $("#editCharSelect")?.value;
      if (!id) return;
      const c = market.byId[id];
      if (!c) return;

      const add = clamp(num($("#adminGrantShares")?.value, 1), 1, 9e12);

      const pos = portfolio.positions[id] || { shares: 0, avgCost: 0 };
      // keep avgCost sensible: blend with current price
      const oldShares = num(pos.shares, 0);
      const newShares = oldShares + add;
      const blendedCost = ((num(pos.avgCost, c.points) * oldShares) + (c.points * add)) / Math.max(1, newShares);
      pos.shares = newShares;
      pos.avgCost = blendedCost;
      portfolio.positions[id] = pos;

      savePortfolio(activeFolder, portfolio);
      renderAll();
    }

    if (t.id === "adminClearPosBtn") {
      if (!isEditAuthed()) return;
      const id = $("#editCharSelect")?.value;
      if (!id) return;
      if (portfolio.positions?.[id]) delete portfolio.positions[id];
      savePortfolio(activeFolder, portfolio);
      renderAll();
    }

    // remove character (safe)
    if (t.id === "removeCharBtn") {
      if (!isEditAuthed()) return;
      const id = $("#editCharSelect")?.value;
      if (!id) return;
      if (!market.byId[id]) return;

      market.list = market.list.filter(x => x.id !== id);
      delete market.byId[id];

      // remove from ALL folders portfolios
      for (const f of FOLDERS) {
        const p = loadPortfolio(f);
        if (p.positions?.[id]) delete p.positions[id];
        savePortfolio(f, p);
      }

      picksSet.delete(id);
      delete mediaOverrides[id];
      delete adminState[id];

      saveJSON(LS.PICKS, Array.from(picksSet));
      saveJSON(LS.EDIT_MEDIA, mediaOverrides);
      saveJSON(LS.ADMIN, adminState);

      if (wantedId === id) {
        wantedId = market.list[0]?.id || null;
        saveJSON(LS.WANTED, wantedId);
      }

      updateIndex();
      saveJSON(LS.MARKET, market);

      refreshEditSelect();
      renderAll();
      closeModal();
    }
  });

  /***********************
   * BULK BAR (multi-buy) - injected
   ***********************/
  let simTimer = null;
  let selectedId = null;

  injectBulkBar();
  function injectBulkBar() {
    if (!marketPanel) return;
    if ($("#bulkBar")) return;

    const wrap = document.createElement("div");
    wrap.id = "bulkBar";
    wrap.className = "bulkBar";
    wrap.innerHTML = `
      <div class="bulkLeft">
        <div class="qtyMini">
          <label for="qtyInput">Qty</label>
          <input id="qtyInput" class="input" type="number" min="1" max="999" value="1" />
        </div>
        <div class="bulkCount">Selected: <span id="bulkCount">0</span></div>
        <button id="bulkAll" class="btn ghost" type="button">Select All</button>
        <button id="bulkNone" class="btn ghost" type="button">Clear</button>
      </div>
      <div class="bulkRight">
        <button id="bulkBuy" class="btn buy" type="button">BUY Selected</button>
        <button id="bulkSell" class="btn sell" type="button">SELL Selected</button>
      </div>
    `;
    marketPanel.appendChild(wrap);

    const updateCount = () => {
      $("#bulkCount") && ($("#bulkCount").textContent = String(picksSet.size));
      saveJSON(LS.PICKS, Array.from(picksSet));
    };

    $("#bulkBuy")?.addEventListener("click", () => {
      const qty = getQty();
      buyMany(Array.from(picksSet), qty);
      updateCount();
    });

    $("#bulkSell")?.addEventListener("click", () => {
      const qty = getQty();
      sellMany(Array.from(picksSet), qty);
      updateCount();
    });

    $("#bulkAll")?.addEventListener("click", () => {
      for (const c of getFilteredSorted()) picksSet.add(c.id);
      updateCount();
      renderProjects();
    });

    $("#bulkNone")?.addEventListener("click", () => {
      picksSet.clear();
      updateCount();
      renderProjects();
    });

    updateCount();
  }

  function getQty() {
    const el = $("#qtyInput");
    if (!el) return 1;
    return clamp(num(el.value, 1), 1, 999);
  }

  function buyMany(ids, qtyEach) {
    if (!ids.length) return;
    qtyEach = clamp(num(qtyEach, 1), 1, 999);
    for (const id of ids) buy(id, qtyEach);
  }

  function sellMany(ids, qtyEach) {
    if (!ids.length) return;
    qtyEach = clamp(num(qtyEach, 1), 1, 999);
    for (const id of ids) {
      const pos = portfolio.positions?.[id];
      if (!pos || pos.shares <= 0) continue;
      sell(id, Math.min(qtyEach, pos.shares));
    }
  }

  /***********************
   * LISTENERS: Filters / SIM controls
   ***********************/
  if (searchInput) searchInput.addEventListener("input", () => {
    ui.search = searchInput.value;
    persistUI();
    renderAll();
  });

  if (arcSelect) arcSelect.addEventListener("change", () => {
    ui.arc = arcSelect.value;
    persistUI();
    renderAll();
  });

  if (typeSelect) typeSelect.addEventListener("change", () => {
    ui.type = typeSelect.value;
    persistUI();
    renderAll();
  });

  if (sortSelect) sortSelect.addEventListener("change", () => {
    ui.sort = sortSelect.value;
    persistUI();
    renderAll();
  });

  if (playBtn) playBtn.addEventListener("click", startSim);
  if (pauseBtn) pauseBtn.addEventListener("click", stopSim);
  if (step1Btn) step1Btn.addEventListener("click", () => tickN(1));
  if (step10Btn) step10Btn.addEventListener("click", () => tickN(10));

  if (speedSelect) speedSelect.addEventListener("change", () => {
    ui.speedMs = num(speedSelect.value, 500);
    persistUI();
    if (simTimer) { stopSim(); startSim(); }
  });

  if (globalVol) globalVol.addEventListener("change", () => {
    const v = clamp(num(globalVol.value, 1), 0.1, 10);
    globalVol.value = String(v);
    saveJSON(LS.GLOBAL_VOL, v);
  });

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  if (wantedBuyBtn) wantedBuyBtn.addEventListener("click", () => wantedId && buy(wantedId, getQty()));
  if (wantedSellBtn) wantedSellBtn.addEventListener("click", () => wantedId && sell(wantedId, getQty()));

  /***********************
   * FILTER + SORT
   ***********************/
  function getFilteredSorted() {
    const q = (ui.search || "").trim().toLowerCase();
    const arc = ui.arc ?? "all";
    const type = ui.type ?? "all";

    let list = market.list.slice();

    if (arc !== "all") {
      const arcNum = num(arc, -999);
      list = list.filter(c => (c.arcs || []).includes(arcNum));
    }
    if (type !== "all") list = list.filter(c => c.type === type);

    if (q) {
      list = list.filter(c => {
        const hay = `${c.name} ${c.ticker} ${c.type}`.toLowerCase();
        return hay.includes(q);
      });
    }

    switch (ui.sort) {
      case "pop_desc": list.sort((a, b) => b.popularity - a.popularity); break;
      case "pop_asc": list.sort((a, b) => a.popularity - b.popularity); break;
      case "oldest": list.sort((a, b) => a.debutOrder - b.debutOrder); break;
      case "newest": list.sort((a, b) => b.debutOrder - a.debutOrder); break;
      case "potential_desc": list.sort((a, b) => b.potential - a.potential); break;
      case "potential_asc": list.sort((a, b) => a.potential - b.potential); break;
      case "price_desc": list.sort((a, b) => b.points - a.points); break;
      case "price_asc": list.sort((a, b) => a.points - b.points); break;
    }

    return list;
  }

  /***********************
   * RENDER
   ***********************/
  renderAll();
  refreshEditSelect();
  loadSelectedMedia();
  syncAdminFormTo($("#editCharSelect")?.value);

  function renderAll() {
    renderHeader();
    renderIndex();
    renderMovers();
    renderProjects();
    renderPortfolio();
    renderWanted();

    saveJSON(LS.MARKET, market);
    savePortfolio(activeFolder, portfolio);

    const bulkCount = $("#bulkCount");
    if (bulkCount) bulkCount.textContent = String(picksSet.size);
  }

  function renderHeader() {
    if (dayEl) dayEl.textContent = String(market.day);
    if (balanceEl) balanceEl.textContent = String(Math.floor(portfolio.balance));
    if (netWorthEl) netWorthEl.textContent = String(Math.floor(calcNetWorth()));
  }

  function renderProjects() {
    const list = getFilteredSorted();
    if (resultCount) resultCount.textContent = `${list.length} results`;
    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";
    for (const c of list) {
      const card = buildCard(c);
      projectsGrid.appendChild(card);

      const sparkCanvas = card.querySelector("canvas.cardSpark");
      drawLine(sparkCanvas, c.history, { grid: false, padding: 10 });
    }
  }

  function fmtDelta(n) {
    const v = Math.round(num(n, 0));
    return v > 0 ? `+${v}` : `${v}`;
  }

  function buildCard(c) {
    const owned = portfolio.positions[c.id]?.shares || 0;
    const delta = c.lastDelta || 0;
    const selected = picksSet.has(c.id);

    const el = document.createElement("div");
    el.className = "card" + (selected ? " selected" : "");
    el.innerHTML = `
      <div class="cardTop">
        <img class="cardImg" src="${getImage(c)}" alt="${escapeHtml(c.name)}">
        <div class="pickBox" title="Select for bulk buy/sell">
          <input type="checkbox" ${selected ? "checked" : ""} />
          <span>Select</span>
        </div>
      </div>

      <div class="cardDivider"></div>

      <div class="cardBody">
        <div class="cardRow">
          <div>
            <div class="cardName">${escapeHtml(c.name)}</div>
            <div class="cardPrice">${Math.floor(c.points)} <span style="font-size:12px;opacity:.7">PTS</span></div>
            <div class="cardOwned">Owned: <b>${owned}</b></div>
          </div>
          <div style="text-align:right">
            <div class="ticker">$${escapeHtml(c.ticker)}</div>
            <div class="delta ${delta > 0 ? "good" : delta < 0 ? "bad" : ""}">Δ ${fmtDelta(delta)}</div>
          </div>
        </div>

        <canvas class="cardSpark" width="240" height="56"></canvas>

        <div class="cardBtns">
          <button class="btn buy" type="button">BUY</button>
          <button class="btn sell" type="button">SELL</button>
        </div>
      </div>
    `;

    const cb = el.querySelector(".pickBox input");
    if (cb) {
      cb.addEventListener("click", (e) => {
        e.stopPropagation();
        if (cb.checked) picksSet.add(c.id);
        else picksSet.delete(c.id);
        saveJSON(LS.PICKS, Array.from(picksSet));
        el.classList.toggle("selected", cb.checked);
        const bulkCount = $("#bulkCount");
        if (bulkCount) bulkCount.textContent = String(picksSet.size);
      });
    }

    el.querySelector(".btn.buy")?.addEventListener("click", (e) => {
      e.stopPropagation();
      buy(c.id, getQty());
    });

    el.querySelector(".btn.sell")?.addEventListener("click", (e) => {
      e.stopPropagation();
      sell(c.id, getQty());
    });

    el.addEventListener("click", () => {
      wantedId = c.id;
      saveJSON(LS.WANTED, wantedId);
      renderWanted();

      const sel = $("#editCharSelect");
      if (sel) {
        sel.value = c.id;
        sel.dispatchEvent(new Event("change"));
      }
    });

    el.addEventListener("dblclick", () => openDetailModal(c.id));
    return el;
  }

  function renderWanted() {
    const c = wantedId ? market.byId[wantedId] : null;
    if (!c) {
      if (wantedImg) wantedImg.src = placeholderImg("WANTED");
      if (wantedName) wantedName.textContent = "—";
      if (wantedRole) wantedRole.textContent = "—";
      if (wantedPrice) wantedPrice.textContent = "0";
      if (wantedOwned) wantedOwned.textContent = "0";
      if (wantedPop) wantedPop.textContent = "0";
      if (wantedPot) wantedPot.textContent = "0";
      if (wantedCap) wantedCap.textContent = "1000";
      if (wantedFrozen) wantedFrozen.textContent = "LIVE";
      if (wantedLinkBtn) wantedLinkBtn.href = "#";
      return;
    }

    if (wantedImg) { wantedImg.src = getImage(c); wantedImg.alt = c.name; }
    if (wantedName) wantedName.textContent = c.name;
    if (wantedRole) wantedRole.textContent = String(c.type || "npc").toUpperCase();
    if (wantedPrice) wantedPrice.textContent = String(Math.floor(c.points));
    if (wantedOwned) wantedOwned.textContent = String(portfolio.positions[c.id]?.shares || 0);
    if (wantedPop) wantedPop.textContent = String(c.popularity);
    if (wantedPot) wantedPot.textContent = String(c.potential);
    if (wantedCap) wantedCap.textContent = String(Math.floor(c.cap ?? 1000));
    if (wantedFrozen) wantedFrozen.textContent = c.frozen ? "FROZEN" : "LIVE";
    if (wantedLinkBtn) wantedLinkBtn.href = getLink(c);
  }

  function renderPortfolio() {
    const positions = Object.entries(portfolio.positions || {})
      .filter(([, p]) => p && p.shares > 0)
      .map(([id, p]) => ({ id, ...p, c: market.byId[id] }))
      .filter(x => x.c);

    if (positionsCount) positionsCount.textContent = String(positions.length);

    const h = portfolio.netWorthHistory || [];
    const last = num(h[h.length - 1], calcNetWorth());
    const prev = h.length > 1 ? num(h[h.length - 2], last) : last;
    const d = Math.floor(last - prev);

    if (nwDeltaEl) {
      nwDeltaEl.textContent = d >= 0 ? `+${d}` : `${d}`;
      nwDeltaEl.style.color = d >= 0 ? "var(--good)" : "var(--bad)";
    }

    drawLine(netWorthChart, h.length ? h : [portfolio.balance], { grid: true, padding: 14 });

    if (!portfolioList) return;
    portfolioList.innerHTML = positions.length
      ? ""
      : `<div style="color:var(--muted);font-size:12px;">No positions yet.</div>`;

    for (const p of positions) {
      const row = document.createElement("div");
      row.className = "posRow";
      row.innerHTML = `
        <div>
          <div class="posName">${escapeHtml(p.c.name)}</div>
          <div class="posMeta">${p.shares} shares • Avg ${Math.floor(p.avgCost)} PTS</div>
        </div>
        <div class="posValue">${Math.floor(p.shares * p.c.points)} PTS</div>
      `;
      portfolioList.appendChild(row);
    }
  }

  function calcNetWorth() {
    const pos = portfolio.positions || {};
    let sum = num(portfolio.balance, 0);
    for (const [id, p] of Object.entries(pos)) {
      if (!p || p.shares <= 0) continue;
      const c = market.byId[id];
      if (!c) continue;
      sum += p.shares * c.points;
    }
    return sum;
  }

  function renderIndex() {
    const idx = Math.floor(num(market.indexHistory?.[market.indexHistory.length - 1], 0));
    const prev = market.indexHistory && market.indexHistory.length > 1
      ? Math.floor(num(market.indexHistory[market.indexHistory.length - 2], idx))
      : idx;
    const d = idx - prev;

    if (indexEl) indexEl.textContent = String(idx);
    if (indexDeltaEl) {
      indexDeltaEl.textContent = d >= 0 ? `+${d}` : `${d}`;
      indexDeltaEl.style.color = d >= 0 ? "var(--good)" : "var(--bad)";
    }

    drawLine(indexChart, market.indexHistory || [idx], { grid: true, padding: 16 });
  }

  function renderMovers() {
    const list = market.list.slice();
    list.sort((a, b) => (b.lastDelta || 0) - (a.lastDelta || 0));

    const gainers = list.slice(0, 6);
    const losers = list.slice(-6).reverse();

    if (gainersList) gainersList.innerHTML = "";
    if (losersList) losersList.innerHTML = "";

    for (const c of gainers) gainersList && gainersList.appendChild(buildMoverRow(c));
    for (const c of losers) losersList && losersList.appendChild(buildMoverRow(c));
  }

  function shortName(s) {
    const str = String(s || "");
    return str.length <= 16 ? str : (str.slice(0, 15) + "…");
  }

  function buildMoverRow(c) {
    const row = document.createElement("div");
    row.className = "watchRow";

    const delta = c.lastDelta || 0;
    row.innerHTML = `
      <div class="watchName">${escapeHtml(shortName(c.name))}</div>
      <div class="watchDelta ${delta > 0 ? "good" : delta < 0 ? "bad" : ""}">
        ${fmtDelta(delta)}
      </div>
    `;

    row.addEventListener("click", () => {
      wantedId = c.id;
      saveJSON(LS.WANTED, wantedId);
      renderWanted();

      const sel = $("#editCharSelect");
      if (sel) {
        sel.value = c.id;
        sel.dispatchEvent(new Event("change"));
      }
    });

    row.addEventListener("dblclick", () => openDetailModal(c.id));
    return row;
  }

  /***********************
   * SIMULATION
   ***********************/
  function startSim() {
    if (simTimer) return;
    const speed = clamp(num(ui.speedMs, 500), 60, 5000);
    simTimer = setInterval(() => tickN(1), speed);
  }

  function stopSim() {
    if (!simTimer) return;
    clearInterval(simTimer);
    simTimer = null;
  }

  function tickN(n) {
    n = clamp(num(n, 1), 1, 999);
    for (let i = 0; i < n; i++) {
      marketTick();
      updateIndex();
      updateNetWorthHistory();
    }
    saveJSON(LS.MARKET, market);
    savePortfolio(activeFolder, portfolio);
    renderAll();
    if (selectedId) openDetailModal(selectedId);
  }

  function marketTick() {
    market.day = num(market.day, 0) + 1;

    const r = Math.random();
    let eventType = null;
    if (r < 0.10) eventType = "zodiac";
    else if (r < 0.18) eventType = "neo";
    else if (r < 0.26) eventType = "maji";

    const gVol = clamp(num(loadJSON(LS.GLOBAL_VOL, 1), 1), 0.1, 10);

    for (const c of market.list) {
      const cap = clamp(num(c.cap, 1000), 1, 1000);

      if (c.frozen) {
        c.lastDelta = 0;
        c.points = clamp(num(c.points, 300), 1, cap);
        c.history.push(c.points);
        if (c.history.length > MAX_HISTORY) c.history.shift();
        c.ticks.push({ label: "Frozen", delta: 0 });
        if (c.ticks.length > MAX_HISTORY) c.ticks.shift();
        continue;
      }

      const volMult = clamp(num(c.volMult, 1), 0.1, 10);
      const vol = (1.25 + (1000 - c.popularity) / 220) * gVol * volMult;
      const bias = (c.potential - 500) / 180;

      const noise = randFloat(-14, 14) * vol;
      let eventPush = 0;
      if (eventType && c.type === eventType) eventPush = randFloat(6, 18) * volMult;

      const delta = clamp(Math.round(noise + bias + eventPush), -42, 42);

      const old = c.points;
      c.points = clamp(num(c.points, 300) + delta, 1, cap);
      c.lastDelta = c.points - old;

      c.history.push(c.points);
      if (c.history.length > MAX_HISTORY) c.history.shift();

      c.ticks.push({ label: eventType ? `Tick (${eventType} surge)` : "Tick", delta: c.lastDelta });
      if (c.ticks.length > MAX_HISTORY) c.ticks.shift();
    }
  }

  function updateIndex() {
    const avg = market.list.reduce((s, c) => s + c.points, 0) / Math.max(1, market.list.length);
    market.indexHistory = market.indexHistory || [];
    market.indexHistory.push(avg);
    if (market.indexHistory.length > MAX_HISTORY) market.indexHistory.shift();
  }

  function updateNetWorthHistory() {
    portfolio.netWorthHistory = portfolio.netWorthHistory || [];
    portfolio.netWorthHistory.push(calcNetWorth());
    if (portfolio.netWorthHistory.length > MAX_HISTORY) portfolio.netWorthHistory.shift();
  }

  /***********************
   * TRADING
   ***********************/
  function buy(id, shares) {
    const c = market.byId[id];
    if (!c) return;

    shares = clamp(num(shares, 1), 1, 999);
    const cost = c.points * shares;
    if (portfolio.balance < cost) return;

    portfolio.balance -= cost;

    const pos = portfolio.positions[id] || { shares: 0, avgCost: 0 };
    const newShares = pos.shares + shares;
    pos.avgCost = ((pos.avgCost * pos.shares) + cost) / newShares;
    pos.shares = newShares;
    portfolio.positions[id] = pos;

    bumpPrice(id, +Math.max(1, Math.round(shares * 3)));
    updateIndex();
    updateNetWorthHistory();
  }

  function sell(id, shares) {
    const c = market.byId[id];
    if (!c) return;

    shares = clamp(num(shares, 1), 1, 999);
    const pos = portfolio.positions[id];
    if (!pos || pos.shares < shares) return;

    const revenue = c.points * shares;
    portfolio.balance += revenue;

    pos.shares -= shares;
    if (pos.shares <= 0) delete portfolio.positions[id];

    bumpPrice(id, -Math.max(1, Math.round(shares * 3)));
    updateIndex();
    updateNetWorthHistory();
  }

  function bumpPrice(id, amount) {
    const c = market.byId[id];
    if (!c) return;

    const cap = clamp(num(c.cap, 1000), 1, 1000);

    if (c.frozen) {
      c.lastDelta = 0;
      c.points = clamp(num(c.points, 300), 1, cap);
      c.history.push(c.points);
      if (c.history.length > MAX_HISTORY) c.history.shift();
      c.ticks.push({ label: "Frozen trade", delta: 0 });
      if (c.ticks.length > MAX_HISTORY) c.ticks.shift();
      return;
    }

    const old = c.points;
    c.points = clamp(num(c.points, 300) + num(amount, 0), 1, cap);
    c.lastDelta = c.points - old;

    c.history.push(c.points);
    if (c.history.length > MAX_HISTORY) c.history.shift();

    c.ticks.push({ label: amount >= 0 ? "Trade demand" : "Trade supply", delta: c.lastDelta });
    if (c.ticks.length > MAX_HISTORY) c.ticks.shift();
  }

  /***********************
   * MODAL
   ***********************/
  function openDetailModal(id) {
    const c = market.byId[id];
    if (!c) return;
    selectedId = id;

    if (modalName) modalName.textContent = c.name;
    if (modalMeta) modalMeta.textContent = `${String(c.type).toUpperCase()} • Arcs: ${(c.arcs || []).join(", ")} • $${c.ticker}`;

    if (modalImg) { modalImg.src = getImage(c); modalImg.alt = c.name; }
    if (modalLinkBtn) modalLinkBtn.href = getLink(c);

    if (modalPrice) modalPrice.textContent = String(Math.floor(c.points));
    if (modalOwned) modalOwned.textContent = String(portfolio.positions[id]?.shares || 0);
    if (modalPotential) modalPotential.textContent = String(c.potential);
    if (modalPop) modalPop.textContent = String(c.popularity);
    if (modalCap) modalCap.textContent = String(Math.floor(c.cap ?? 1000));
    if (modalFrozen) modalFrozen.textContent = c.frozen ? "FROZEN" : "LIVE";

    if (modalBuyBtn) modalBuyBtn.onclick = () => buy(id, getQty());
    if (modalSellBtn) modalSellBtn.onclick = () => sell(id, getQty());

    drawLine(spark, c.history, { grid: true, padding: 16 });
    renderHistoryList(c);

    if (modalBackdrop) modalBackdrop.classList.remove("hidden");
    if (detailModal) detailModal.classList.remove("hidden");

    const sel = $("#editCharSelect");
    if (sel) {
      sel.value = id;
      sel.dispatchEvent(new Event("change"));
    }
  }

  function closeModal() {
    selectedId = null;
    if (modalBackdrop) modalBackdrop.classList.add("hidden");
    if (detailModal) detailModal.classList.add("hidden");
  }

  function renderHistoryList(c) {
    if (!historyList) return;
    const recent = (c.ticks || []).slice(-14).reverse();

    historyList.innerHTML = recent.length
      ? ""
      : `<div style="color:var(--muted);font-size:12px;">No ticks yet.</div>`;

    for (const t of recent) {
      const d = num(t.delta, 0);
      const row = document.createElement("div");
      row.className = "hRow";
      row.innerHTML = `
        <div>${escapeHtml(t.label || "Tick")}</div>
        <div class="watchDelta ${d > 0 ? "good" : d < 0 ? "bad" : ""}">${fmtDelta(d)} PTS</div>
      `;
      historyList.appendChild(row);
    }
  }

  /***********************
   * CANVAS LINE CHART
   ***********************/
  function tryGet2D(canvas) {
    if (!canvas) return null;
    try { return canvas.getContext("2d"); } catch { return null; }
  }

  function drawLine(canvas, series, opts = {}) {
    if (!canvas) return;
    const ctx = tryGet2D(canvas);
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const padding = num(opts.padding, 16);
    const showGrid = opts.grid !== false;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(0,0,0,.08)";
    ctx.fillRect(0, 0, w, h);

    if (!Array.isArray(series) || series.length < 2) return;

    const values = series.map(v => num(v, 0));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = Math.max(1e-6, max - min);

    if (showGrid) {
      ctx.strokeStyle = "rgba(255,255,255,.06)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        const y = (h / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    ctx.strokeStyle = "rgba(236,245,255,.92)";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < values.length; i++) {
      const x = padding + (i * (w - padding * 2)) / (values.length - 1);
      const y = (h - padding) - ((values[i] - min) / span) * (h - padding * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
})();
