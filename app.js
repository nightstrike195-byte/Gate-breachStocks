/* ===========================
   FILE NAME MUST BE: app.js
   =========================== */

(() => {
  "use strict";

  /*****************************************************************
   * 0) EDIT + ADMIN PANEL PASSWORD LOCK (CHANGE THIS PASSWORD)
   *****************************************************************/
  const EDIT_PANEL_PASSWORD = "Raijin is a bitch"; // <- change this to whatever you want
  const EDIT_AUTH_KEY = "gb_edit_authed_v1";

  function isEditAuthed() {
    try { return sessionStorage.getItem(EDIT_AUTH_KEY) === "1"; } catch { return false; }
  }
  function setEditAuthed(v) {
    try { sessionStorage.setItem(EDIT_AUTH_KEY, v ? "1" : "0"); } catch {}
  }

  // We inject lock/unlock buttons into the edit panel so you can always unlock again
  function ensureEditLockUI() {
    const panel = document.querySelector("#editPanel");
    if (!panel) return;

    if (panel.querySelector("#editUnlockBtn")) return; // already injected

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

    // Put it at the top of the edit panel
    panel.prepend(bar);

    const status = panel.querySelector("#editLockStatus");
    const unlockBtn = panel.querySelector("#editUnlockBtn");
    const lockBtn = panel.querySelector("#editLockBtn");

    const refreshStatus = () => {
      if (!status) return;
      status.textContent = `Status: ${isEditAuthed() ? "UNLOCKED" : "LOCKED"}`;
      status.style.color = isEditAuthed() ? "var(--good)" : "var(--bad)";
    };

    if (unlockBtn) {
      unlockBtn.addEventListener("click", () => {
        requireEditAuth(true);
        refreshStatus();
      });
    }
    if (lockBtn) {
      lockBtn.addEventListener("click", () => {
        setEditAuthed(false);
        setEditPanelEnabled(false);
        refreshStatus();
      });
    }

    refreshStatus();
  }

  function setEditPanelEnabled(enabled) {
    const panel = document.querySelector("#editPanel");
    if (!panel) return;

    // IMPORTANT: do NOT disable our unlock/lock controls
    const allowIds = new Set(["editUnlockBtn", "editLockBtn", "closeModalBtn"]);

    const nodes = panel.querySelectorAll("input, textarea, select, button");
    nodes.forEach(n => {
      if (!n) return;
      if (n.id && allowIds.has(n.id)) return;
      n.disabled = !enabled;
    });

    // Keep panel visible but "locked" feel
    panel.style.pointerEvents = enabled ? "" : "auto"; // allow clicking Unlock button
    panel.style.filter = enabled ? "" : "grayscale(1)";
    panel.style.opacity = enabled ? "" : "0.85";
  }

  function requireEditAuth(fromButton = false) {
    if (isEditAuthed()) {
      setEditPanelEnabled(true);
      return true;
    }

    // Ensure lock UI exists before we prompt (so you never "lose" admin again)
    ensureEditLockUI();
    setEditPanelEnabled(false);

    // Prompt must happen from a user action (click) to avoid browser blocking
    const entered = prompt("Enter password to unlock the Edit/Admin panel:");
    if (entered === null) return false;

    if (String(entered) === String(EDIT_PANEL_PASSWORD)) {
      setEditAuthed(true);
      setEditPanelEnabled(true);

      // Update status text if present
      const st = document.querySelector("#editLockStatus");
      if (st) {
        st.textContent = "Status: UNLOCKED";
        st.style.color = "var(--good)";
      }
      return true;
    }

    alert("Wrong password.");
    setEditAuthed(false);
    setEditPanelEnabled(false);

    const st = document.querySelector("#editLockStatus");
    if (st) {
      st.textContent = "Status: LOCKED";
      st.style.color = "var(--bad)";
    }
    return false;
  }

  /*****************************************************************
   * 1) PASTE YOUR entityMedia HERE (TOP LEVEL, NOT INSIDE ANYTHING)
   *****************************************************************/
  // ✅ PASTE YOUR entityMedia OBJECT HERE (keep the name `entityMedia`)
  // Example:
  // const entityMedia = { "some_id": { image:"https://...", link:"https://..." } };
  const entityMedia = {}; // <- leave as {} if you don't want images/links yet

  /***********************
   * SAFETY NET HELPERS
   ***********************/
  const $ = (sel) => document.querySelector(sel);
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const num = (v, fallback = 0) => {
    const x = Number(v);
    return Number.isFinite(x) ? x : fallback;
  };

  function safeText(el, txt){ if(el) el.textContent = String(txt); }
  function safeHref(el, href){
    if(!el) return;
    el.href = href || "#";
    el.style.opacity = (href && href !== "#") ? "1" : "0.6";
  }
  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, (m) => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[m]));
  }
  function placeholderImg(name){
    const n = encodeURIComponent((name || "GB").slice(0, 18));
    return `https://dummyimage.com/256x256/0b1a33/f3d27b.png&text=${n}`;
  }

  /***********************
   * ERROR BANNER
   ***********************/
  function showFatal(msg){
    let b = $("#bootBanner");
    let m = $("#bootMsg");
    if(!b){
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
    if(m) m.textContent = msg;
    b.style.display = "block";
  }

  if(entityMedia && typeof entityMedia !== "object"){
    showFatal("entityMedia must be an object: { id: {image, link} }");
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
   * mk() + BASE LIST
   * mk(id, name, type, arcs, debutOrder, popularity, potential, basePrice)
   ***********************/
  function mk(id, name, type, arcs, debutOrder, popularity, potential, basePrice){
    return {
      id, name, type,
      arcs: Array.isArray(arcs) ? arcs : [],
      debutOrder: num(debutOrder, 9999),
      popularity: clamp(num(popularity, 500), 1, 1000),
      potential: clamp(num(potential, 500), 1, 1000),

      points: clamp(num(basePrice, 300), 1, 1000),

      // ADMIN/CONTROL FIELDS (persisted)
      cap: 1000,
      frozen: false,     // “stagnate”
      volMult: 1,        // per-character volatility multiplier

      lastDelta: 0,
      ticker: "GBX",
      history: [],
      ticks: []
    };
  }

  const BASE_CHARACTERS = [
    mk("kaien_dazhen", "Kaien Dazhen", "human", [0,1,2,3,4,5], 100, 380, 520, 180),
    mk("raijin_kurozawa", "Raijin Kurozawa", "human", [0,1,2,3,4,5], 101, 820, 900, 420),

    mk("lara_kurozawa", "Lara Kurozawa", "human", [5], 102, 520, 720, 260),
    mk("yankovich_dazhen", "Yankovich Dazhen", "human", [5], 50, 680, 780, 320),

    mk("kopa", "Kopa", "human", [4], 12, 360, 520, 160),
    mk("old_man", "The Old Man", "npc", [0,1], 1, 420, 500, 140),

    mk("leo", "Leo", "zodiac", [2], 70, 880, 960, 520),
    mk("virgo", "Virgo", "zodiac", [2,3], 71, 820, 920, 480),
    mk("pisces", "Pisces", "zodiac", [1,2,4], 72, 760, 890, 440),
    mk("capricorn", "Capricorn", "zodiac", [5], 73, 740, 880, 430),
    mk("scorpio", "Scorpio", "zodiac", [5], 74, 730, 870, 420),

    mk("white_ranger", "White Ranger", "neo", [0,2,4], 10, 650, 740, 320),
    mk("pink_neo_ranger", "Pink Neo-Ranger", "neo", [3], 210, 720, 820, 360),
    mk("gold_neo_ranger", "Gold Neo-Ranger", "neo", [2], 211, 700, 820, 360),
    mk("kyro_okabe", "Kyro Okabe (Red Neo-Ranger)", "neo", [3], 200, 800, 860, 410),
    mk("vt_082", "V.T-082 (Blue Neo-Ranger?)", "neo", [4], 205, 600, 720, 300),

    mk("kravon", "Kravon", "human", [4], 16, 520, 720, 250),
    mk("broke_little_girl", "Broke Little Girl", "npc", [4], 17, 250, 500, 80),

    mk("paws", "Paws", "ranger", [5], 300, 420, 600, 220),
    mk("kory", "Kory", "ranger", [5], 301, 420, 600, 220),
    mk("mon", "Mon", "ranger", [5], 302, 420, 600, 220),

    mk("sora_k", "Sora, K", "ranger", [5], 310, 520, 680, 260),
    mk("fross", "Fross", "ranger", [5], 311, 480, 640, 240),
    mk("jessie", "Jessie", "ranger", [5], 312, 560, 720, 280),

    mk("nora", "Nora", "human", [5], 313, 560, 710, 270),
    mk("gaia_kurozawa", "Gaia Kurozawa", "human", [4], 314, 460, 680, 220),

    mk("uriel", "Uriel", "ranger", [4], 315, 510, 690, 260),

    mk("rico_e", "E", "human", [5], 316, 440, 640, 230),
    mk("riko_dazhen", "Riko Dazhen", "human", [5], 317, 470, 700, 250),
    mk("rico_d", "Rico D", "human", [5], 318, 470, 700, 250),

    mk("milo", "Milo", "npc", [5], 400, 340, 560, 140),
    mk("clover", "Clover", "npc", [5], 401, 260, 520, 110),
    mk("krahs", "Krahs", "npc", [5], 402, 260, 520, 110),
    mk("krog", "Krog", "npc", [5], 403, 260, 520, 110),
    mk("rulin", "Rulin", "npc", [5], 404, 260, 520, 110),
    mk("ulti", "Ulti", "npc", [5], 405, 260, 520, 110),
    mk("monty", "Monty", "npc", [5], 410, 260, 520, 110),
    mk("vlair", "Vlair", "npc", [5], 411, 320, 600, 160),

    mk("lora", "Lora", "npc", [5], 420, 280, 540, 120),
    mk("hiroshi", "Hiroshi", "npc", [5], 421, 310, 560, 140),
    mk("takeru", "Takeru", "npc", [5], 422, 380, 660, 180),

    mk("purple_majiranger", "Purple MajiRanger", "ranger", [5], 500, 520, 720, 260),
    mk("teal_majiranger", "Teal MajiRanger", "ranger", [3,5], 501, 520, 720, 260),
    mk("crimson_majiranger", "Crimson MajiRanger", "ranger", [3,5], 502, 520, 720, 260),

    mk("hope_maji", "Hope Maji", "maji", [4], 600, 840, 950, 520),
    mk("despair_maji", "Despair Maji", "maji", [5], 601, 760, 900, 440),
    mk("convergence_maji", "Convergence Maji", "maji", [5], 602, 620, 820, 360),
    mk("bacteria_maji", "Bacteria Maji", "maji", [5], 603, 640, 830, 380),
    mk("mycelium_maji", "Mycelium Maji", "maji", [5], 604, 700, 860, 410),
    mk("thorn_maji", "Thorn Maji", "maji", [0], 605, 520, 720, 260),
    mk("drool_maji", "Drool Maji", "maji", [1], 606, 560, 740, 280),

    mk("goat_maji_hybrid", "Goat Maji Hybrid", "hybrid", [2], 607, 540, 760, 300),
    mk("bananasaurous_maji", "Bananasaurous Maji", "maji", [2], 608, 580, 780, 320),
    mk("shark_maji", "Shark Maji", "maji", [3], 609, 560, 740, 280),
    mk("mental_lobster_maji", "Mental Lobster Maji", "maji", [4], 610, 620, 800, 360),
    mk("pencil_maji", "Pencil Maji", "maji", [3], 611, 520, 700, 240),
    mk("lettuce_maji", "Lettuce Maji", "maji", [4], 612, 520, 740, 280),
    mk("capture_maji", "Capture Maji", "maji", [4], 613, 620, 820, 360),
    mk("frog_maji_hybrid", "Frog Maji (Hybrid)", "hybrid", [4], 614, 540, 740, 300),
    mk("immortality_maji", "Immortality Maji", "maji", [4], 617, 740, 940, 480),
    mk("sphinx_maji", "Sphinx Maji", "maji", [2,4], 618, 720, 880, 420),

    mk("azriel_polaris", "Azriel Polaris", "human", [5], 700, 740, 860, 420),
    mk("mother_spica", "Mother Spica", "human", [5], 701, 700, 820, 400),
    mk("artoria", "Artoria", "human", [5], 702, 680, 820, 380),
    mk("manager", "Manager", "npc", [5], 703, 360, 540, 160),

    mk("ashen_star", "Ashen Star", "npc", [3,5], 710, 520, 780, 300),
    mk("greed_maji", "Greed Maji", "maji", [4], 720, 720, 920, 460),
    mk("donna", "Donna", "human", [3], 721, 420, 640, 210),
    mk("bowens_mom", "Bowen's Mom", "human", [3], 722, 240, 520, 120),

    mk("soul_bread_baker", "Soul Bread Baker", "npc", [2], 800, 360, 680, 180),
    mk("walking_tree_maji", "Walking Tree Maji", "maji", [4], 902, 420, 720, 220),
  ];

  /***********************
   * STORAGE KEYS
   ***********************/
  const LS = {
    MARKET: "gb_market_ui_v10",
    // NOTE: PORT now stores a multi-folder state (J/M/B/K/R)
    PORT: "gb_portfolio_ui_v11",
    UI: "gb_ui_state_v10",
    WANTED: "gb_wanted_v10",
    EDIT_MEDIA: "gb_entity_media_v10",
    ADMIN: "gb_admin_state_v10",
    PICKS: "gb_bulk_picks_v10",
    ADMIN_CFG: "gb_admin_cfg_v11",
  };

  const MAX_HISTORY = 90;

  /***********************
   * ADMIN CFG (global controls: max cap, global freeze)
   ***********************/
  let adminCfg = loadJSON(LS.ADMIN_CFG, null);
  if(!adminCfg || typeof adminCfg !== "object"){
    adminCfg = { maxCap: 1000, globalFreeze: false };
    saveJSON(LS.ADMIN_CFG, adminCfg);
  }
  adminCfg.maxCap = clamp(num(adminCfg.maxCap, 1000), 1, 999999999);
  adminCfg.globalFreeze = Boolean(adminCfg.globalFreeze);

  /***********************
   * LOAD + APPLY MEDIA OVERRIDES (Edit panel)
   ***********************/
  let mediaOverrides = loadJSON(LS.EDIT_MEDIA, {});
  if(!mediaOverrides || typeof mediaOverrides !== "object") mediaOverrides = {};

  /***********************
   * LOAD STATE
   ***********************/
  let market = loadJSON(LS.MARKET, null);

  // Multi-folder portfolios: J/M/B/K/R
  let portState = loadJSON(LS.PORT, null);

  const ui = loadJSON(LS.UI, {
    arc: "all",
    type: "all",
    sort: "pop_desc",
    search: "",
    speedMs: 500
  }) || { arc:"all", type:"all", sort:"pop_desc", search:"", speedMs:500 };

  market = validateOrInitMarket(market);
  portState = validateOrInitPortState(portState);

  // Active portfolio reference (points/shares live here)
  let portfolio = getActivePortfolio();

  // ADMIN STATE: per-id overrides (cap/frozen/volMult)
  let adminState = loadJSON(LS.ADMIN, {});
  if(!adminState || typeof adminState !== "object") adminState = {};
  applyAdminStateToMarket();

  let wantedId = loadJSON(LS.WANTED, null);
  if(!wantedId || !market.byId[wantedId]){
    wantedId = market.list[0]?.id || null;
    saveJSON(LS.WANTED, wantedId);
  }

  let selectedId = null;
  let simTimer = null;

  // Bulk picks (multi buy)
  let picks = loadJSON(LS.PICKS, []);
  if(!Array.isArray(picks)) picks = [];
  const picksSet = new Set(picks.filter(id => typeof id === "string"));

  /***********************
   * DOM HOOKS
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

  // Wanted
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

  // Modal
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

  // Nav pills + panels
  const navBtns = Array.from(document.querySelectorAll("[data-nav]"));
  const marketPanel = $("#marketPanel");
  const projectsPanel = $("#projectsPanel");
  const editPanel = $("#editPanel");

  // Edit panel (media)
  const editCharSelect = $("#editCharSelect");
  const editImg = $("#editImg");
  const editLink = $("#editLink");
  const saveEditBtn = $("#saveEditBtn");
  const resetEditBtn = $("#resetEditBtn");
  const bulkJson = $("#bulkJson");
  const applyBulkBtn = $("#applyBulkBtn");

  // Admin panel (existing HTML fields if present)
  const adminSetPrice = $("#adminSetPrice");
  const adminSetCap = $("#adminSetCap");
  const adminFreeze = $("#adminFreeze");
  const adminVolMult = $("#adminVolMult");
  const adminApplyBtn = $("#adminApplyBtn");
  const adminNukeHistoryBtn = $("#adminNukeHistoryBtn");

  const newId = $("#newId");
  const newName = $("#newName");
  const newType = $("#newType");
  const newArcs = $("#newArcs");
  const newPop = $("#newPop");
  const newPot = $("#newPot");
  const newImpact = $("#newImpact");
  const addCharBtn = $("#addCharBtn");
  const removeCharBtn = $("#removeCharBtn");

  // Make sure lock UI exists and the edit/admin panel starts locked unless already authed
  ensureEditLockUI();
  setEditPanelEnabled(isEditAuthed());

  /***********************
   * FOLDER BAR (J/M/B/K/R)
   ***********************/
  const FOLDERS = ["J","M","B","K","R"];
  injectFolderBar();

  function injectFolderBar(){
    if(!marketPanel) return;
    if($("#folderBar")) return;

    const bar = document.createElement("div");
    bar.id = "folderBar";
    bar.style.display = "flex";
    bar.style.flexWrap = "wrap";
    bar.style.gap = "8px";
    bar.style.alignItems = "center";
    bar.style.justifyContent = "space-between";
    bar.style.margin = "0 0 12px 0";
    bar.style.padding = "10px 12px";
    bar.style.border = "1px solid rgba(255,255,255,.10)";
    bar.style.borderRadius = "12px";
    bar.style.background = "rgba(0,0,0,.18)";
    bar.style.backdropFilter = "blur(10px)";

    bar.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:2px">
        <div style="font-weight:800">Folders</div>
        <div style="font-size:12px;opacity:.75">Each has its own balance + shares</div>
      </div>
      <div id="folderBtns" style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end"></div>
    `;

    // Insert at top of market panel
    marketPanel.prepend(bar);

    const btnWrap = $("#folderBtns");
    if(!btnWrap) return;

    const rebuild = () => {
      btnWrap.innerHTML = "";
      for(const f of FOLDERS){
        const p = portState.folders[f];
        const b = document.createElement("button");
        b.type = "button";
        b.className = "btn ghost";
        b.style.minWidth = "64px";
        b.style.borderRadius = "999px";
        b.style.fontWeight = "800";
        b.textContent = `${f}: ${Math.floor(num(p?.balance, 0))}`;
        b.style.opacity = (portState.active === f) ? "1" : "0.75";
        b.style.outline = (portState.active === f) ? "2px solid rgba(243,210,123,.35)" : "";
        b.addEventListener("click", () => {
          setActiveFolder(f);
          rebuild();
        });
        btnWrap.appendChild(b);
      }
    };

    rebuild();
    portState._rebuildFolderBar = rebuild;
  }

  function setActiveFolder(letter){
    if(!FOLDERS.includes(letter)) return;
    portState.active = letter;
    saveJSON(LS.PORT, portState);
    portfolio = getActivePortfolio(); // refresh pointer
    renderAll();
    if(selectedId) openDetailModal(selectedId);
  }

  /***********************
   * INIT SELECTS
   ***********************/
  if(arcSelect){
    arcSelect.innerHTML =
      `<option value="all">All SAGA-1 Arcs</option>` +
      ARCS.map(a => `<option value="${a.id}">${escapeHtml(a.name)}</option>`).join("");
    arcSelect.value = ui.arc ?? "all";
  }
  if(typeSelect) typeSelect.value = ui.type ?? "all";
  if(sortSelect) sortSelect.value = ui.sort ?? "pop_desc";
  if(searchInput) searchInput.value = ui.search ?? "";
  if(speedSelect) speedSelect.value = String(ui.speedMs ?? 500);

  if(globalVol){
    const stored = loadJSON("gb_global_vol_v10", 1);
    globalVol.value = String(clamp(num(stored, 1), 0.1, 10));
  }

  /***********************
   * BULK BAR (multi-buy) - injected (no HTML edits needed)
   ***********************/
  let bulkQtyInput, bulkBuyBtn, bulkSellBtn, bulkClearBtn, bulkCountEl, bulkSelectAllBtn, bulkSelectNoneBtn;
  injectBulkBar();

  function injectBulkBar(){
    if(!marketPanel) return;
    if($("#bulkBar")) return;

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

    bulkQtyInput = $("#qtyInput");
    bulkBuyBtn = $("#bulkBuy");
    bulkSellBtn = $("#bulkSell");
    bulkClearBtn = $("#bulkNone");
    bulkCountEl = $("#bulkCount");
    bulkSelectAllBtn = $("#bulkAll");
    bulkSelectNoneBtn = $("#bulkNone");

    const updateCount = () => {
      if(bulkCountEl) bulkCountEl.textContent = String(picksSet.size);
      saveJSON(LS.PICKS, Array.from(picksSet));
    };

    if(bulkBuyBtn){
      bulkBuyBtn.addEventListener("click", () => {
        const qty = getQty();
        buyMany(Array.from(picksSet), qty);
        updateCount();
      });
    }
    if(bulkSellBtn){
      bulkSellBtn.addEventListener("click", () => {
        const qty = getQty();
        sellMany(Array.from(picksSet), qty);
        updateCount();
      });
    }
    if(bulkSelectAllBtn){
      bulkSelectAllBtn.addEventListener("click", () => {
        for(const c of getFilteredSorted()){
          picksSet.add(c.id);
        }
        updateCount();
        renderProjects();
      });
    }
    if(bulkSelectNoneBtn){
      bulkSelectNoneBtn.addEventListener("click", () => {
        picksSet.clear();
        updateCount();
        renderProjects();
      });
    }

    updateCount();
  }

  /***********************
   * NAV (FIXED: edit/admin always prompts + admin panel stays)
   ***********************/
  function setActivePanel(which){
    // Support either data-nav="edit" OR data-nav="admin"
    const isEditLike = (which === "edit" || which === "admin");

    if(isEditLike){
      // show edit panel first so prompt + unlock UI always exists
      if(editPanel) editPanel.style.display = "";
      if(projectsPanel) projectsPanel.style.display = "none";
      if(marketPanel) marketPanel.style.display = "none";

      ensureEditLockUI();
      setEditPanelEnabled(isEditAuthed());

      // PASSWORD GATE
      const ok = requireEditAuth(false);
      if(!ok){
        // If they cancel / wrong password, stay on market
        if(editPanel) editPanel.style.display = "none";
        if(projectsPanel) projectsPanel.style.display = "";
        if(marketPanel) marketPanel.style.display = "";
        navBtns.forEach(b => b.classList.toggle("active", b.dataset.nav === "market"));
        return;
      }

      // unlocked
      setEditPanelEnabled(true);

      // Ensure our injected admin tools exist after unlock
      injectAdminTools();
      refreshInjectedAdminUI();
    } else {
      if(editPanel) editPanel.style.display = "none";
      if(projectsPanel) projectsPanel.style.display = "";
      if(marketPanel) marketPanel.style.display = "";
    }

    navBtns.forEach(b => b.classList.toggle("active", b.dataset.nav === which));
  }

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => setActivePanel(btn.dataset.nav));
  });

  // default
  setActivePanel("market");

  /***********************
   * LISTENERS: Filters
   ***********************/
  if(searchInput){
    searchInput.addEventListener("input", () => {
      ui.search = searchInput.value;
      persistUI();
      renderAll();
    });
  }
  if(arcSelect){
    arcSelect.addEventListener("change", () => {
      ui.arc = arcSelect.value;
      persistUI();
      renderAll();
    });
  }
  if(typeSelect){
    typeSelect.addEventListener("change", () => {
      ui.type = typeSelect.value;
      persistUI();
      renderAll();
    });
  }
  if(sortSelect){
    sortSelect.addEventListener("change", () => {
      ui.sort = sortSelect.value;
      persistUI();
      renderAll();
    });
  }

  if(playBtn) playBtn.addEventListener("click", startSim);
  if(pauseBtn) pauseBtn.addEventListener("click", stopSim);
  if(step1Btn) step1Btn.addEventListener("click", () => tickN(1));
  if(step10Btn) step10Btn.addEventListener("click", () => tickN(10));

  if(speedSelect){
    speedSelect.addEventListener("change", () => {
      ui.speedMs = num(speedSelect.value, 500);
      persistUI();
      if(simTimer){ stopSim(); startSim(); }
    });
  }

  if(globalVol){
    globalVol.addEventListener("change", () => {
      const v = clamp(num(globalVol.value, 1), 0.1, 10);
      globalVol.value = String(v);
      saveJSON("gb_global_vol_v10", v);
    });
  }

  if(closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if(modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeModal(); });

  if(wantedBuyBtn) wantedBuyBtn.addEventListener("click", () => wantedId && buy(wantedId, getQty()));
  if(wantedSellBtn) wantedSellBtn.addEventListener("click", () => wantedId && sell(wantedId, getQty()));

  /***********************
   * EDIT PANEL: image/link overrides
   ***********************/
  initEditPanel();

  function initEditPanel(){
    if(!editCharSelect) return;

    const refreshSelect = () => {
      editCharSelect.innerHTML = market.list
        .slice()
        .sort((a,b)=> a.name.localeCompare(b.name))
        .map(c => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)} (${escapeHtml(c.id)})</option>`)
        .join("");
    };

    refreshSelect();

    const loadSelected = () => {
      const id = editCharSelect.value;
      const o = mediaOverrides[id] || {};
      if(editImg) editImg.value = o.image || "";
      if(editLink) editLink.value = o.link || "";
      syncAdminFormTo(id);
      refreshInjectedAdminUI();
    };

    editCharSelect.addEventListener("change", loadSelected);
    loadSelected();

    if(saveEditBtn){
      saveEditBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        const id = editCharSelect.value;
        if(!id) return;
        const img = String(editImg?.value || "").trim();
        const link = String(editLink?.value || "").trim();

        mediaOverrides[id] = { image: img, link };
        saveJSON(LS.EDIT_MEDIA, mediaOverrides);
        renderAll();
      });
    }

    if(resetEditBtn){
      resetEditBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        const id = editCharSelect.value;
        if(!id) return;
        delete mediaOverrides[id];
        saveJSON(LS.EDIT_MEDIA, mediaOverrides);
        if(editImg) editImg.value = "";
        if(editLink) editLink.value = "";
        renderAll();
      });
    }

    if(applyBulkBtn){
      applyBulkBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        try{
          const raw = String(bulkJson?.value || "").trim();
          if(!raw) return;
          const obj = JSON.parse(raw);
          if(!obj || typeof obj !== "object") return;

          for(const [id, v] of Object.entries(obj)){
            if(!v || typeof v !== "object") continue;
            mediaOverrides[id] = {
              image: typeof v.image === "string" ? v.image.trim() : (mediaOverrides[id]?.image || ""),
              link: typeof v.link === "string" ? v.link.trim() : (mediaOverrides[id]?.link || ""),
            };
          }
          saveJSON(LS.EDIT_MEDIA, mediaOverrides);
          renderAll();
        }catch(e){
          showFatal("Bulk JSON invalid: " + (e?.message || e));
        }
      });
    }

    market._refreshEditSelect = refreshSelect;
  }

  /***********************
   * ADMIN PANEL (existing fields)
   ***********************/
  function syncAdminFormTo(id){
    const c = market.byId[id];
    if(!c) return;

    if(adminSetPrice) adminSetPrice.value = String(Math.floor(c.points));

    // Allow admin cap to exceed 1000 via adminCfg.maxCap
    if(adminSetCap){
      adminSetCap.max = String(adminCfg.maxCap);
      adminSetCap.value = String(Math.floor(c.cap ?? 1000));
    }

    if(adminFreeze) adminFreeze.value = String(Boolean(c.frozen));
    if(adminVolMult) adminVolMult.value = String(num(c.volMult, 1));
  }

  if(editCharSelect){
    syncAdminFormTo(editCharSelect.value);
  }

  if(adminApplyBtn){
    adminApplyBtn.addEventListener("click", () => {
      if(!isEditAuthed()) return;
      const id = editCharSelect?.value;
      if(!id) return;
      const c = market.byId[id];
      if(!c) return;

      const maxCap = clamp(num(adminCfg.maxCap, 1000), 1, 999999999);

      const capV = clamp(num(adminSetCap?.value, c.cap ?? 1000), 1, maxCap);
      const priceV = clamp(num(adminSetPrice?.value, c.points), 1, capV);
      const frozenV = String(adminFreeze?.value) === "true";
      const volV = clamp(num(adminVolMult?.value, c.volMult ?? 1), 0.1, 10);

      c.cap = capV;
      c.points = clamp(priceV, 1, c.cap);
      c.frozen = frozenV;
      c.volMult = volV;

      c.history = Array.isArray(c.history) ? c.history.slice(-MAX_HISTORY) : [];
      if(!c.history.length) c.history = seedHistory(c.points);
      c.history.push(c.points);
      if(c.history.length > MAX_HISTORY) c.history.shift();

      adminState[id] = { cap: c.cap, frozen: c.frozen, volMult: c.volMult };
      saveJSON(LS.ADMIN, adminState);

      saveJSON(LS.MARKET, market);
      renderAll();
      refreshInjectedAdminUI();
      if(selectedId === id) openDetailModal(id);
    });
  }

  if(adminNukeHistoryBtn){
    adminNukeHistoryBtn.addEventListener("click", () => {
      if(!isEditAuthed()) return;
      const id = editCharSelect?.value;
      if(!id) return;
      const c = market.byId[id];
      if(!c) return;

      c.history = seedHistory(c.points);
      c.ticks = [];
      c.lastDelta = 0;

      saveJSON(LS.MARKET, market);
      renderAll();
      if(selectedId === id) openDetailModal(id);
    });
  }

  // Add/remove characters (already requested)
  if(addCharBtn){
    addCharBtn.addEventListener("click", () => {
      if(!isEditAuthed()) return;
      const id = sanitizeId(String(newId?.value || ""));
      const name = String(newName?.value || "").trim();
      if(!id || !name) return;
      if(market.byId[id]) return;

      const type = String(newType?.value || "npc");
      const arcs = parseArcs(String(newArcs?.value || ""));
      const pop = clamp(num(newPop?.value, 500), 1, 1000);
      const pot = clamp(num(newPot?.value, 500), 1, 1000);
      const impact = clamp(num(newImpact?.value, 300), 1, 1000);

      const debut = (market.list.reduce((m,c)=> Math.max(m, num(c.debutOrder, 0)), 0) + 1);
      const basePrice = clamp(Math.round((pop*0.35 + pot*0.45 + impact*0.20) / 2), 1, clamp(num(adminCfg.maxCap, 1000), 1, 999999999));

      const c = mk(id, name, type, arcs, debut, pop, pot, basePrice);
      c.ticker = tickerFrom(c);
      c.cap = clamp(1000, 1, clamp(num(adminCfg.maxCap, 1000), 1, 999999999));
      c.frozen = false;
      c.volMult = 1;
      c.history = seedHistory(c.points);
      c.ticks = [];
      c.lastDelta = 0;

      market.list.push(c);
      market.byId[c.id] = c;

      updateIndex();
      saveJSON(LS.MARKET, market);

      market._refreshEditSelect && market._refreshEditSelect();
      if(editCharSelect){
        editCharSelect.value = id;
        if(editCharSelect.dispatchEvent) editCharSelect.dispatchEvent(new Event("change"));
      }

      renderAll();
      refreshInjectedAdminUI();
    });
  }

  if(removeCharBtn){
    removeCharBtn.addEventListener("click", () => {
      if(!isEditAuthed()) return;
      const id = editCharSelect?.value;
      if(!id) return;
      const exists = market.byId[id];
      if(!exists) return;

      market.list = market.list.filter(x => x.id !== id);
      delete market.byId[id];

      // remove shares from ALL folders
      for(const f of FOLDERS){
        delete portState.folders[f]?.positions?.[id];
      }

      picksSet.delete(id);
      delete mediaOverrides[id];
      delete adminState[id];

      saveJSON(LS.PICKS, Array.from(picksSet));
      saveJSON(LS.EDIT_MEDIA, mediaOverrides);
      saveJSON(LS.ADMIN, adminState);

      if(wantedId === id){
        wantedId = market.list[0]?.id || null;
        saveJSON(LS.WANTED, wantedId);
      }

      updateIndex();
      saveJSON(LS.MARKET, market);
      saveJSON(LS.PORT, portState);

      market._refreshEditSelect && market._refreshEditSelect();

      renderAll();
      refreshInjectedAdminUI();
      closeModal();
    });
  }

  function sanitizeId(s){
    return String(s || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }
  function parseArcs(s){
    if(!s.trim()) return [];
    return s.split(",")
      .map(x => clamp(num(x.trim(), -999), -999, 999))
      .filter(x => Number.isFinite(x) && x >= 0);
  }

  /***********************
   * INJECTED ADMIN TOOLS (no HTML edits)
   * - Give yourself any balance (per folder)
   * - Give/remove shares for selected character (free)
   * - Global market freeze (stagnate everything)
   * - Global max cap
   ***********************/
  let inj = {
    root: null,
    folderLabel: null,
    balInput: null,
    balSetBtn: null,
    balAddInput: null,
    balAddBtn: null,

    shareQty: null,
    grantBtn: null,
    takeBtn: null,

    maxCapInput: null,
    maxCapBtn: null,
    globalFreezeToggle: null,
    globalFreezeBtn: null,
  };

  function injectAdminTools(){
    if(!editPanel) return;
    if($("#gbInjectedAdminTools")) return;

    const box = document.createElement("div");
    box.id = "gbInjectedAdminTools";
    box.style.marginTop = "14px";
    box.style.padding = "12px";
    box.style.border = "1px solid rgba(255,255,255,.10)";
    box.style.borderRadius = "12px";
    box.style.background = "rgba(0,0,0,.18)";
    box.style.backdropFilter = "blur(10px)";

    box.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:10px;flex-wrap:wrap;">
        <div>
          <div style="font-weight:900;font-size:14px;">Admin Tools</div>
          <div style="font-size:12px;opacity:.75">Folder: <span id="injFolderLabel">—</span></div>
        </div>
        <div style="font-size:12px;opacity:.75">Selected: <span id="injSelectedLabel">—</span></div>
      </div>

      <div style="height:10px"></div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div style="padding:10px;border:1px solid rgba(255,255,255,.08);border-radius:12px;">
          <div style="font-weight:800;margin-bottom:6px;">Folder Balance (cheat)</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <input id="injBalInput" class="input" type="number" step="1" min="0" placeholder="Set balance" style="flex:1;min-width:160px;">
            <button id="injBalSetBtn" class="btn" type="button">Set</button>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:8px;">
            <input id="injBalAddInput" class="input" type="number" step="1" value="5000" style="flex:1;min-width:160px;">
            <button id="injBalAddBtn" class="btn ghost" type="button">Add</button>
          </div>
        </div>

        <div style="padding:10px;border:1px solid rgba(255,255,255,.08);border-radius:12px;">
          <div style="font-weight:800;margin-bottom:6px;">Give Yourself Shares (free)</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <input id="injShareQty" class="input" type="number" min="1" step="1" value="1" style="width:110px;">
            <button id="injGrantBtn" class="btn buy" type="button">Grant</button>
            <button id="injTakeBtn" class="btn sell" type="button">Remove</button>
          </div>
          <div style="font-size:12px;opacity:.75;margin-top:8px;">
            These ignore balance/cost. (You asked for “as many stocks as they want”.)
          </div>
        </div>

        <div style="padding:10px;border:1px solid rgba(255,255,255,.08);border-radius:12px;">
          <div style="font-weight:800;margin-bottom:6px;">Global Max Cap (price ceiling)</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <input id="injMaxCapInput" class="input" type="number" min="1" step="1" style="flex:1;min-width:160px;">
            <button id="injMaxCapBtn" class="btn" type="button">Apply</button>
          </div>
          <div style="font-size:12px;opacity:.75;margin-top:8px;">
            Character caps can’t exceed this. (Controls “cap out the maximum of the stock”.)
          </div>
        </div>

        <div style="padding:10px;border:1px solid rgba(255,255,255,.08);border-radius:12px;">
          <div style="font-weight:800;margin-bottom:6px;">Global Stagnate (freeze ALL)</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <select id="injGlobalFreezeToggle" class="input" style="min-width:160px;">
              <option value="false">OFF (Live)</option>
              <option value="true">ON (Frozen)</option>
            </select>
            <button id="injGlobalFreezeBtn" class="btn ghost" type="button">Apply</button>
          </div>
          <div style="font-size:12px;opacity:.75;margin-top:8px;">
            Overrides tick movement; prices still respect per-character caps.
          </div>
        </div>
      </div>
    `;

    editPanel.appendChild(box);

    inj.root = box;
    inj.folderLabel = $("#injFolderLabel");
    inj.selectedLabel = $("#injSelectedLabel");
    inj.balInput = $("#injBalInput");
    inj.balSetBtn = $("#injBalSetBtn");
    inj.balAddInput = $("#injBalAddInput");
    inj.balAddBtn = $("#injBalAddBtn");
    inj.shareQty = $("#injShareQty");
    inj.grantBtn = $("#injGrantBtn");
    inj.takeBtn = $("#injTakeBtn");
    inj.maxCapInput = $("#injMaxCapInput");
    inj.maxCapBtn = $("#injMaxCapBtn");
    inj.globalFreezeToggle = $("#injGlobalFreezeToggle");
    inj.globalFreezeBtn = $("#injGlobalFreezeBtn");

    if(inj.balSetBtn){
      inj.balSetBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        const v = clamp(num(inj.balInput?.value, portfolio.balance), 0, 9e12);
        portfolio.balance = v;
        // also keep net worth history sane
        if(!Array.isArray(portfolio.netWorthHistory)) portfolio.netWorthHistory = [];
        portfolio.netWorthHistory.push(calcNetWorth());
        portfolio.netWorthHistory = portfolio.netWorthHistory.slice(-MAX_HISTORY);
        saveJSON(LS.PORT, portState);
        renderAll();
        refreshInjectedAdminUI();
      });
    }

    if(inj.balAddBtn){
      inj.balAddBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        const add = num(inj.balAddInput?.value, 0);
        portfolio.balance = clamp(num(portfolio.balance, 0) + add, 0, 9e12);
        if(!Array.isArray(portfolio.netWorthHistory)) portfolio.netWorthHistory = [];
        portfolio.netWorthHistory.push(calcNetWorth());
        portfolio.netWorthHistory = portfolio.netWorthHistory.slice(-MAX_HISTORY);
        saveJSON(LS.PORT, portState);
        renderAll();
        refreshInjectedAdminUI();
      });
    }

    const getSelectedCharId = () => String(editCharSelect?.value || wantedId || "");

    if(inj.grantBtn){
      inj.grantBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        const id = getSelectedCharId();
        if(!id || !market.byId[id]) return;
        const qty = clamp(num(inj.shareQty?.value, 1), 1, 9e9);
        grantSharesFree(id, qty);
        saveJSON(LS.PORT, portState);
        renderAll();
        if(selectedId === id) openDetailModal(id);
      });
    }

    if(inj.takeBtn){
      inj.takeBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        const id = getSelectedCharId();
        if(!id || !market.byId[id]) return;
        const qty = clamp(num(inj.shareQty?.value, 1), 1, 9e9);
        removeSharesFree(id, qty);
        saveJSON(LS.PORT, portState);
        renderAll();
        if(selectedId === id) openDetailModal(id);
      });
    }

    if(inj.maxCapBtn){
      inj.maxCapBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        adminCfg.maxCap = clamp(num(inj.maxCapInput?.value, adminCfg.maxCap), 1, 999999999);
        saveJSON(LS.ADMIN_CFG, adminCfg);

        // enforce immediately
        for(const c of market.list){
          c.cap = clamp(num(c.cap, 1000), 1, adminCfg.maxCap);
          c.points = clamp(num(c.points, 300), 1, c.cap);
        }
        saveJSON(LS.MARKET, market);
        renderAll();
        refreshInjectedAdminUI();
      });
    }

    if(inj.globalFreezeBtn){
      inj.globalFreezeBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        adminCfg.globalFreeze = (String(inj.globalFreezeToggle?.value) === "true");
        saveJSON(LS.ADMIN_CFG, adminCfg);
        renderAll();
        refreshInjectedAdminUI();
      });
    }
  }

  function refreshInjectedAdminUI(){
    if(!inj.root) return;
    if(inj.folderLabel) inj.folderLabel.textContent = portState.active || "—";

    const selId = String(editCharSelect?.value || "");
    const selName = selId && market.byId[selId] ? market.byId[selId].name : "—";
    if(inj.selectedLabel) inj.selectedLabel.textContent = selId ? `${selName} (${selId})` : "—";

    if(inj.balInput) inj.balInput.value = String(Math.floor(num(portfolio.balance, 0)));

    if(inj.maxCapInput) inj.maxCapInput.value = String(Math.floor(num(adminCfg.maxCap, 1000)));

    if(inj.globalFreezeToggle) inj.globalFreezeToggle.value = String(Boolean(adminCfg.globalFreeze));
  }

  function grantSharesFree(id, qty){
    const c = market.byId[id];
    if(!c) return;
    qty = clamp(num(qty, 1), 1, 9e9);

    const pos = portfolio.positions[id] || { shares: 0, avgCost: 0 };
    // avgCost doesn't matter for free grant; keep existing
    pos.shares = clamp(num(pos.shares, 0) + qty, 0, 9e12);
    portfolio.positions[id] = pos;

    // optional: small bump for “demand”
    bumpPrice(id, +Math.max(0, Math.round(Math.min(qty, 999) * 1)));
    updateIndex();
    updateNetWorthHistory();
  }

  function removeSharesFree(id, qty){
    qty = clamp(num(qty, 1), 1, 9e9);
    const pos = portfolio.positions[id];
    if(!pos) return;

    pos.shares = clamp(num(pos.shares, 0) - qty, 0, 9e12);
    if(pos.shares <= 0) delete portfolio.positions[id];

    // optional: small bump down for “supply”
    bumpPrice(id, -Math.max(0, Math.round(Math.min(qty, 999) * 1)));
    updateIndex();
    updateNetWorthHistory();
  }

  /***********************
   * BUY MULTIPLE QoL
   ***********************/
  function getQty(){
    const el = $("#qtyInput");
    if(!el) return 1;
    return clamp(num(el.value, 1), 1, 999);
  }

  function buyMany(ids, qtyEach){
    if(!ids.length) return;
    qtyEach = clamp(num(qtyEach, 1), 1, 999);

    for(const id of ids){
      const c = market.byId[id];
      if(!c) continue;
      const cost = c.points * qtyEach;
      if(portfolio.balance < cost) continue;
      buy(id, qtyEach);
    }
  }

  function sellMany(ids, qtyEach){
    if(!ids.length) return;
    qtyEach = clamp(num(qtyEach, 1), 1, 999);
    for(const id of ids){
      const pos = portfolio.positions?.[id];
      if(!pos || pos.shares <= 0) continue;
      sell(id, Math.min(qtyEach, pos.shares));
    }
  }

  /***********************
   * FIRST RENDER
   ***********************/
  renderAll();

  /***********************
   * RENDER CORE
   ***********************/
  function renderAll(){
    renderHeader();
    renderIndex();
    renderMovers();
    renderProjects();
    renderPortfolio();
    renderWanted();

    saveJSON(LS.MARKET, market);
    saveJSON(LS.PORT, portState);

    const bulkCount = $("#bulkCount");
    if(bulkCount) bulkCount.textContent = String(picksSet.size);

    // refresh folder bar numbers
    portState._rebuildFolderBar && portState._rebuildFolderBar();

    refreshInjectedAdminUI();
  }

  function renderHeader(){
    safeText(dayEl, market.day);
    safeText(balanceEl, Math.floor(portfolio.balance));
    safeText(netWorthEl, Math.floor(calcNetWorth()));
  }

  /***********************
   * FILTER + SORT
   ***********************/
  function getFilteredSorted(){
    const q = (ui.search || "").trim().toLowerCase();
    const arc = ui.arc ?? "all";
    const type = ui.type ?? "all";

    let list = market.list.slice();

    if(arc !== "all"){
      const arcNum = num(arc, -999);
      list = list.filter(c => c.arcs.includes(arcNum));
    }
    if(type !== "all"){
      list = list.filter(c => c.type === type);
    }
    if(q){
      list = list.filter(c => {
        const hay = `${c.name} ${c.ticker} ${c.type}`.toLowerCase();
        return hay.includes(q);
      });
    }

    switch(ui.sort){
      case "pop_desc": list.sort((a,b)=> b.popularity - a.popularity); break;
      case "pop_asc": list.sort((a,b)=> a.popularity - b.popularity); break;
      case "oldest": list.sort((a,b)=> a.debutOrder - a.debutOrder); break;
      case "newest": list.sort((a,b)=> b.debutOrder - a.debutOrder); break;
      case "potential_desc": list.sort((a,b)=> b.potential - a.potential); break;
      case "potential_asc": list.sort((a,b)=> a.potential - a.potential); break;
      case "price_desc": list.sort((a,b)=> b.points - a.points); break;
      case "price_asc": list.sort((a,b)=> a.points - a.points); break;
    }

    return list;
  }

  /***********************
   * PROJECT CARDS + MULTI SELECT CHECKBOX
   ***********************/
  function renderProjects(){
    const list = getFilteredSorted();
    if(resultCount) safeText(resultCount, `${list.length} results`);
    if(!projectsGrid) return;

    projectsGrid.innerHTML = "";
    for(const c of list){
      const card = buildCard(c);
      projectsGrid.appendChild(card);

      const sparkCanvas = card.querySelector("canvas.cardSpark");
      drawLine(sparkCanvas, c.history, { grid:false, padding:10 });
    }
  }

  function buildCard(c){
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
            <div class="delta ${delta>0?'good':delta<0?'bad':''}">Δ ${fmtDelta(delta)}</div>
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
    if(cb){
      cb.addEventListener("click", (e) => {
        e.stopPropagation();
        if(cb.checked) picksSet.add(c.id);
        else picksSet.delete(c.id);
        saveJSON(LS.PICKS, Array.from(picksSet));
        el.classList.toggle("selected", cb.checked);

        const bulkCount = $("#bulkCount");
        if(bulkCount) bulkCount.textContent = String(picksSet.size);
      });
    }

    const buyBtn = el.querySelector(".btn.buy");
    const sellBtn = el.querySelector(".btn.sell");
    if(buyBtn){
      buyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        buy(c.id, getQty());
      });
    }
    if(sellBtn){
      sellBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sell(c.id, getQty());
      });
    }

    el.addEventListener("click", () => {
      wantedId = c.id;
      saveJSON(LS.WANTED, wantedId);
      renderWanted();

      if(editCharSelect){
        editCharSelect.value = c.id;
        editCharSelect.dispatchEvent(new Event("change"));
      }
    });

    el.addEventListener("dblclick", () => openDetailModal(c.id));

    return el;
  }

  /***********************
   * WANTED PANEL
   ***********************/
  function renderWanted(){
    const c = wantedId ? market.byId[wantedId] : null;
    if(!c){
      if(wantedImg) wantedImg.src = placeholderImg("WANTED");
      safeText(wantedName, "—");
      safeText(wantedRole, "—");
      safeText(wantedPrice, "0");
      safeText(wantedOwned, "0");
      safeText(wantedPop, "0");
      safeText(wantedPot, "0");
      safeText(wantedCap, "1000");
      safeText(wantedFrozen, "LIVE");
      safeHref(wantedLinkBtn, "#");
      return;
    }

    if(wantedImg){
      wantedImg.src = getImage(c);
      wantedImg.alt = c.name;
    }

    safeText(wantedName, c.name);
    safeText(wantedRole, String(c.type || "npc").toUpperCase());
    safeText(wantedPrice, Math.floor(c.points));
    safeText(wantedOwned, portfolio.positions[c.id]?.shares || 0);
    safeText(wantedPop, c.popularity);
    safeText(wantedPot, c.potential);
    safeText(wantedCap, Math.floor(c.cap ?? 1000));
    safeText(wantedFrozen, (adminCfg.globalFreeze || c.frozen) ? "FROZEN" : "LIVE");

    safeHref(wantedLinkBtn, getLink(c));
  }

  /***********************
   * PORTFOLIO
   ***********************/
  function renderPortfolio(){
    const positions = Object.entries(portfolio.positions || {})
      .filter(([,p]) => p && p.shares > 0)
      .map(([id,p]) => ({ id, ...p, c: market.byId[id] }))
      .filter(x => x.c);

    safeText(positionsCount, positions.length);

    const h = portfolio.netWorthHistory || [];
    const last = num(h[h.length - 1], calcNetWorth());
    const prev = h.length > 1 ? num(h[h.length - 2], last) : last;
    const d = Math.floor(last - prev);

    if(nwDeltaEl){
      nwDeltaEl.textContent = d >= 0 ? `+${d}` : `${d}`;
      nwDeltaEl.style.color = d >= 0 ? "var(--good)" : "var(--bad)";
    }

    drawLine(netWorthChart, h.length ? h : [portfolio.balance], { grid:true, padding:14 });

    if(!portfolioList) return;
    portfolioList.innerHTML = positions.length
      ? ""
      : `<div style="color:var(--muted);font-size:12px;">No positions yet.</div>`;

    for(const p of positions){
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

  function calcNetWorth(){
    const pos = portfolio.positions || {};
    let sum = num(portfolio.balance, 0);
    for(const [id, p] of Object.entries(pos)){
      if(!p || p.shares <= 0) continue;
      const c = market.byId[id];
      if(!c) continue;
      sum += p.shares * c.points;
    }
    return sum;
  }

  /***********************
   * INDEX + MOVERS
   ***********************/
  function renderIndex(){
    const idx = Math.floor(num(market.indexHistory?.[market.indexHistory.length - 1], 0));
    const prev = market.indexHistory && market.indexHistory.length > 1
      ? Math.floor(num(market.indexHistory[market.indexHistory.length - 2], idx))
      : idx;
    const d = idx - prev;

    safeText(indexEl, idx);
    if(indexDeltaEl){
      indexDeltaEl.textContent = d >= 0 ? `+${d}` : `${d}`;
      indexDeltaEl.style.color = d >= 0 ? "var(--good)" : "var(--bad)";
    }

    drawLine(indexChart, market.indexHistory || [idx], { grid:true, padding:16 });
  }

  function renderMovers(){
    const list = market.list.slice();
    list.sort((a,b) => (b.lastDelta || 0) - (a.lastDelta || 0));

    const gainers = list.slice(0, 6);
    const losers = list.slice(-6).reverse();

    if(gainersList) gainersList.innerHTML = "";
    if(losersList) losersList.innerHTML = "";

    for(const c of gainers) gainersList && gainersList.appendChild(buildMoverRow(c));
    for(const c of losers) losersList && losersList.appendChild(buildMoverRow(c));
  }

  function buildMoverRow(c){
    const row = document.createElement("div");
    row.className = "watchRow";

    const delta = c.lastDelta || 0;
    row.innerHTML = `
      <div class="watchName">${escapeHtml(shortName(c.name))}</div>
      <div class="watchDelta ${delta>0?'good':delta<0?'bad':''}">
        ${fmtDelta(delta)}
      </div>
    `;

    row.addEventListener("click", () => {
      wantedId = c.id;
      saveJSON(LS.WANTED, wantedId);
      renderWanted();

      if(editCharSelect){
        editCharSelect.value = c.id;
        editCharSelect.dispatchEvent(new Event("change"));
      }
    });

    row.addEventListener("dblclick", () => openDetailModal(c.id));
    return row;
  }

  function shortName(s){
    const str = String(s || "");
    return str.length <= 16 ? str : (str.slice(0, 15) + "…");
  }

  function fmtDelta(n){
    const v = Math.round(num(n, 0));
    return v > 0 ? `+${v}` : `${v}`;
  }

  /***********************
   * SIMULATION
   ***********************/
  function startSim(){
    if(simTimer) return;
    const speed = clamp(num(ui.speedMs, 500), 60, 5000);
    simTimer = setInterval(() => tickN(1), speed);
  }

  function stopSim(){
    if(!simTimer) return;
    clearInterval(simTimer);
    simTimer = null;
  }

  function tickN(n){
    n = clamp(num(n, 1), 1, 999);
    for(let i=0;i<n;i++){
      marketTick();
      updateIndex();
      updateNetWorthHistory();
    }
    saveJSON(LS.MARKET, market);
    saveJSON(LS.PORT, portState);
    renderAll();
    if(selectedId) openDetailModal(selectedId);
  }

  function marketTick(){
    market.day = num(market.day, 0) + 1;

    const r = Math.random();
    let eventType = null;
    if(r < 0.10) eventType = "zodiac";
    else if(r < 0.18) eventType = "neo";
    else if(r < 0.26) eventType = "maji";

    const gVol = clamp(num(loadJSON("gb_global_vol_v10", 1), 1), 0.1, 10);

    for(const c of market.list){
      const cap = clamp(num(c.cap, 1000), 1, clamp(num(adminCfg.maxCap, 1000), 1, 999999999));

      // GLOBAL stagnate OR per-character freeze
      const frozenNow = Boolean(adminCfg.globalFreeze) || Boolean(c.frozen);

      if(frozenNow){
        c.lastDelta = 0;
        c.points = clamp(num(c.points, 300), 1, cap);
        c.history.push(c.points);
        if(c.history.length > MAX_HISTORY) c.history.shift();
        c.ticks.push({ label: adminCfg.globalFreeze ? "Global Frozen" : "Frozen", delta: 0 });
        if(c.ticks.length > MAX_HISTORY) c.ticks.shift();
        continue;
      }

      const volMult = clamp(num(c.volMult, 1), 0.1, 10);

      const vol = (1.25 + (1000 - c.popularity) / 220) * gVol * volMult;
      const bias = (c.potential - 500) / 180;

      const noise = randFloat(-14, 14) * vol;
      let eventPush = 0;
      if(eventType && c.type === eventType) eventPush = randFloat(6, 18) * volMult;

      const delta = clamp(Math.round(noise + bias + eventPush), -42, 42);

      const old = c.points;
      c.points = clamp(num(c.points, 300) + delta, 1, cap);
      c.lastDelta = c.points - old;

      c.history.push(c.points);
      if(c.history.length > MAX_HISTORY) c.history.shift();

      c.ticks.push({ label: eventType ? `Tick (${eventType} surge)` : "Tick", delta: c.lastDelta });
      if(c.ticks.length > MAX_HISTORY) c.ticks.shift();
    }
  }

  function updateIndex(){
    const avg = market.list.reduce((s,c)=> s + c.points, 0) / Math.max(1, market.list.length);
    market.indexHistory = market.indexHistory || [];
    market.indexHistory.push(avg);
    if(market.indexHistory.length > MAX_HISTORY) market.indexHistory.shift();
  }

  function updateNetWorthHistory(){
    portfolio.netWorthHistory = portfolio.netWorthHistory || [];
    portfolio.netWorthHistory.push(calcNetWorth());
    if(portfolio.netWorthHistory.length > MAX_HISTORY) portfolio.netWorthHistory.shift();
  }

  function randFloat(a,b){ return Math.random()*(b-a)+a; }

  /***********************
   * TRADING
   ***********************/
  function buy(id, shares){
    const c = market.byId[id];
    if(!c) return;

    shares = clamp(num(shares, 1), 1, 999);
    const cost = c.points * shares;
    if(portfolio.balance < cost) return;

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

  function sell(id, shares){
    const c = market.byId[id];
    if(!c) return;

    shares = clamp(num(shares, 1), 1, 999);
    const pos = portfolio.positions[id];
    if(!pos || pos.shares < shares) return;

    const revenue = c.points * shares;
    portfolio.balance += revenue;

    pos.shares -= shares;
    if(pos.shares <= 0) delete portfolio.positions[id];

    bumpPrice(id, -Math.max(1, Math.round(shares * 3)));
    updateIndex();
    updateNetWorthHistory();
  }

  function bumpPrice(id, amount){
    const c = market.byId[id];
    if(!c) return;

    const cap = clamp(num(c.cap, 1000), 1, clamp(num(adminCfg.maxCap, 1000), 1, 999999999));

    const frozenNow = Boolean(adminCfg.globalFreeze) || Boolean(c.frozen);
    if(frozenNow){
      c.lastDelta = 0;
      c.points = clamp(num(c.points, 300), 1, cap);
      c.history.push(c.points);
      if(c.history.length > MAX_HISTORY) c.history.shift();
      c.ticks.push({ label: "Frozen trade", delta: 0 });
      if(c.ticks.length > MAX_HISTORY) c.ticks.shift();
      return;
    }

    const old = c.points;
    c.points = clamp(num(c.points, 300) + num(amount, 0), 1, cap);
    c.lastDelta = c.points - old;

    c.history.push(c.points);
    if(c.history.length > MAX_HISTORY) c.history.shift();

    c.ticks.push({ label: amount >= 0 ? "Trade demand" : "Trade supply", delta: c.lastDelta });
    if(c.ticks.length > MAX_HISTORY) c.ticks.shift();
  }

  /***********************
   * MODAL
   ***********************/
  function openDetailModal(id){
    const c = market.byId[id];
    if(!c) return;
    selectedId = id;

    safeText(modalName, c.name);
    safeText(modalMeta, `${String(c.type).toUpperCase()} • Arcs: ${c.arcs.join(", ")} • $${c.ticker}`);

    if(modalImg){
      modalImg.src = getImage(c);
      modalImg.alt = c.name;
    }
    safeHref(modalLinkBtn, getLink(c));

    safeText(modalPrice, Math.floor(c.points));
    safeText(modalOwned, portfolio.positions[id]?.shares || 0);
    safeText(modalPotential, c.potential);
    safeText(modalPop, c.popularity);
    safeText(modalCap, Math.floor(c.cap ?? 1000));
    safeText(modalFrozen, (adminCfg.globalFreeze || c.frozen) ? "FROZEN" : "LIVE");

    if(modalBuyBtn) modalBuyBtn.onclick = () => buy(id, getQty());
    if(modalSellBtn) modalSellBtn.onclick = () => sell(id, getQty());

    drawLine(spark, c.history, { grid:true, padding:16 });
    renderHistoryList(c);

    if(modalBackdrop) modalBackdrop.classList.remove("hidden");
    if(detailModal) detailModal.classList.remove("hidden");

    if(editCharSelect){
      editCharSelect.value = id;
      editCharSelect.dispatchEvent(new Event("change"));
    }
  }

  function closeModal(){
    selectedId = null;
    if(modalBackdrop) modalBackdrop.classList.add("hidden");
    if(detailModal) detailModal.classList.add("hidden");
  }

  function renderHistoryList(c){
    if(!historyList) return;
    const recent = (c.ticks || []).slice(-14).reverse();

    historyList.innerHTML = recent.length
      ? ""
      : `<div style="color:var(--muted);font-size:12px;">No ticks yet.</div>`;

    for(const t of recent){
      const d = num(t.delta, 0);
      const row = document.createElement("div");
      row.className = "hRow";
      row.innerHTML = `
        <div>${escapeHtml(t.label || "Tick")}</div>
        <div class="watchDelta ${d>0?'good':d<0?'bad':''}">${fmtDelta(d)} PTS</div>
      `;
      historyList.appendChild(row);
    }
  }

  /***********************
   * MEDIA LOOKUP
   ***********************/
  function getImage(c){
    try{
      const o = mediaOverrides?.[c.id];
      if(o && typeof o.image === "string" && o.image.trim()) return o.image.trim();

      const m = entityMedia?.[c.id];
      if(m && typeof m.image === "string" && m.image.trim()) return m.image.trim();
    }catch(e){
      showFatal("media error in getImage(): " + (e?.message || e));
    }
    return placeholderImg(c.name);
  }

  function getLink(c){
    try{
      const o = mediaOverrides?.[c.id];
      if(o && typeof o.link === "string" && o.link.trim()) return o.link.trim();

      const m = entityMedia?.[c.id];
      if(m && typeof m.link === "string" && m.link.trim()) return m.link.trim();
    }catch(e){
      showFatal("media error in getLink(): " + (e?.message || e));
    }
    return "#";
  }

  /***********************
   * STORAGE UTIL
   ***********************/
  function loadJSON(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      if(!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    }catch{
      return fallback;
    }
  }
  function saveJSON(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); }catch{}
  }
  function persistUI(){
    saveJSON(LS.UI, {
      arc: ui.arc ?? "all",
      type: ui.type ?? "all",
      sort: ui.sort ?? "pop_desc",
      search: ui.search ?? "",
      speedMs: clamp(num(ui.speedMs, 500), 60, 5000)
    });
  }

  /***********************
   * MARKET INIT / VALIDATION
   ***********************/
  function tickerFrom(c){
    const base = (c.id || c.name || "GBX").replace(/[^a-z0-9]/gi, "").toUpperCase();
    return (base.slice(0, 3) || "GBX");
  }

  function seedHistory(start){
    const maxCap = clamp(num(adminCfg?.maxCap, 1000), 1, 999999999);
    const arr = [start];
    for(let i=0;i<24;i++){
      const prev = arr[arr.length - 1];
      arr.push(clamp(prev + Math.round(randFloat(-18, 18)), 1, maxCap));
    }
    return arr;
  }

  function avgPoints(list){
    return list.reduce((s,c)=> s + num(c.points, 0), 0) / Math.max(1, list.length);
  }

  function initMarket(){
    const maxCap = clamp(num(adminCfg?.maxCap, 1000), 1, 999999999);

    const list = BASE_CHARACTERS.map((c) => {
      const seed = clamp(num(c.points, 300), 1, maxCap);
      return {
        ...c,
        points: clamp(seed, 1, clamp(num(c.cap, 1000), 1, maxCap)),
        lastDelta: 0,
        ticker: tickerFrom(c),
        cap: clamp(num(c.cap, 1000), 1, maxCap),
        frozen: Boolean(c.frozen),
        volMult: clamp(num(c.volMult, 1), 0.1, 10),
        history: seedHistory(seed),
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

  function validateOrInitMarket(m){
    if(!m || !Array.isArray(m.list)) return initMarket();

    if(!m.byId || typeof m.byId !== "object"){
      m.byId = Object.fromEntries(m.list.map(c => [c.id, c]));
    }

    const maxCap = clamp(num(adminCfg?.maxCap, 1000), 1, 999999999);

    const seen = new Set(m.list.map(c => c.id));
    for(const base of BASE_CHARACTERS){
      if(!seen.has(base.id)){
        const seed = clamp(num(base.points, 300), 1, maxCap);
        const fresh = {
          ...base,
          points: seed,
          lastDelta: 0,
          ticker: tickerFrom(base),
          cap: clamp(num(base.cap, 1000), 1, maxCap),
          frozen: Boolean(base.frozen),
          volMult: clamp(num(base.volMult, 1), 0.1, 10),
          history: seedHistory(seed),
          ticks: []
        };
        m.list.push(fresh);
        m.byId[fresh.id] = fresh;
      }
    }

    m.day = clamp(num(m.day, 0), 0, 9e9);
    m.indexHistory = Array.isArray(m.indexHistory) ? m.indexHistory.slice(-MAX_HISTORY) : [avgPoints(m.list)];

    for(const c of m.list){
      c.cap = clamp(num(c.cap, 1000), 1, maxCap);
      c.points = clamp(num(c.points, 300), 1, c.cap);
      c.popularity = clamp(num(c.popularity, 500), 1, 1000);
      c.potential = clamp(num(c.potential, 500), 1, 1000);
      c.ticker = c.ticker || tickerFrom(c);
      c.history = Array.isArray(c.history) ? c.history.slice(-MAX_HISTORY) : seedHistory(c.points);
      c.ticks = Array.isArray(c.ticks) ? c.ticks.slice(-MAX_HISTORY) : [];
      c.lastDelta = num(c.lastDelta, 0);
      c.frozen = Boolean(c.frozen);
      c.volMult = clamp(num(c.volMult, 1), 0.1, 10);
      if(!Array.isArray(c.arcs)) c.arcs = [];
      if(typeof c.name !== "string") c.name = String(c.name || c.id);
      if(typeof c.type !== "string") c.type = "npc";
      if(!Number.isFinite(c.debutOrder)) c.debutOrder = 9999;
      m.byId[c.id] = c;
    }

    return m;
  }

  /***********************
   * PORTFOLIO STATE (folders J/M/B/K/R)
   ***********************/
  function validateOrInitPortState(ps){
    // Back-compat: if old single-portfolio exists, migrate into folder J
    if(ps && typeof ps === "object" && ps.balance != null && ps.positions){
      const migrated = {
        active: "J",
        folders: {
          J: validateOrInitSinglePortfolio(ps),
          M: validateOrInitSinglePortfolio(null),
          B: validateOrInitSinglePortfolio(null),
          K: validateOrInitSinglePortfolio(null),
          R: validateOrInitSinglePortfolio(null),
        }
      };
      return migrated;
    }

    if(!ps || typeof ps !== "object"){
      return {
        active: "J",
        folders: {
          J: validateOrInitSinglePortfolio(null),
          M: validateOrInitSinglePortfolio(null),
          B: validateOrInitSinglePortfolio(null),
          K: validateOrInitSinglePortfolio(null),
          R: validateOrInitSinglePortfolio(null),
        }
      };
    }

    ps.active = FOLDERS.includes(ps.active) ? ps.active : "J";
    ps.folders = (ps.folders && typeof ps.folders === "object") ? ps.folders : {};

    for(const f of FOLDERS){
      ps.folders[f] = validateOrInitSinglePortfolio(ps.folders[f]);
    }

    return ps;
  }

  function validateOrInitSinglePortfolio(p){
    if(!p || typeof p !== "object"){
      return { balance: 5000, positions: {}, netWorthHistory: [5000] };
    }
    p.balance = clamp(num(p.balance, 5000), 0, 9e12);
    p.positions = (p.positions && typeof p.positions === "object") ? p.positions : {};
    p.netWorthHistory = Array.isArray(p.netWorthHistory) ? p.netWorthHistory.slice(-MAX_HISTORY) : [p.balance];

    for(const [id, pos] of Object.entries(p.positions)){
      if(!pos || typeof pos !== "object"){ delete p.positions[id]; continue; }
      pos.shares = clamp(num(pos.shares, 0), 0, 9e12);
      pos.avgCost = clamp(num(pos.avgCost, 0), 0, 999999999);
      if(pos.shares <= 0) delete p.positions[id];
    }
    return p;
  }

  function getActivePortfolio(){
    const f = portState?.active;
    if(!FOLDERS.includes(f)) return portState.folders.J;
    return portState.folders[f];
  }

  function applyAdminStateToMarket(){
    if(!adminState || typeof adminState !== "object") return;
    const maxCap = clamp(num(adminCfg?.maxCap, 1000), 1, 999999999);

    for(const [id, st] of Object.entries(adminState)){
      const c = market.byId[id];
      if(!c || !st || typeof st !== "object") continue;
      if(st.cap != null) c.cap = clamp(num(st.cap, c.cap ?? 1000), 1, maxCap);
      if(st.frozen != null) c.frozen = Boolean(st.frozen);
      if(st.volMult != null) c.volMult = clamp(num(st.volMult, c.volMult ?? 1), 0.1, 10);
      c.points = clamp(num(c.points, 300), 1, c.cap);
    }
  }

  /***********************
   * CANVAS LINE CHART
   ***********************/
  function tryGet2D(canvas){
    if(!canvas) return null;
    try{ return canvas.getContext("2d"); }catch{ return null; }
  }

  function drawLine(canvas, series, opts = {}){
    if(!canvas) return;
    const ctx = tryGet2D(canvas);
    if(!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const padding = num(opts.padding, 16);
    const showGrid = opts.grid !== false;

    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = "rgba(0,0,0,.08)";
    ctx.fillRect(0,0,w,h);

    if(!Array.isArray(series) || series.length < 2) return;

    const values = series.map(v => num(v, 0));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = Math.max(1e-6, max - min);

    if(showGrid){
      ctx.strokeStyle = "rgba(255,255,255,.06)";
      ctx.lineWidth = 1;
      for(let i=1;i<=4;i++){
        const y = (h/5)*i;
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
        ctx.stroke();
      }
    }

    ctx.strokeStyle = "rgba(236,245,255,.92)";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for(let i=0;i<values.length;i++){
      const x = padding + (i*(w - padding*2))/(values.length - 1);
      const y = (h - padding) - ((values[i]-min)/span)*(h - padding*2);
      if(i===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
})();
