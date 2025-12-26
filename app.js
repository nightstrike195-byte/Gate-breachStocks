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
  // const entityMedia = {
  //   "some_id": { image: "https://...", link: "https://..." },
  // };

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
      cap: 1000,        // max out the stock can reach
      frozen: false,    // stagnate
      volMult: 1,       // volatility control per stock

      lastDelta: 0,
      ticker: "GBX",
      history: [],
      ticks: []
    };
  }

  // (keeping your BASE_CHARACTERS list unchanged in your file)
  const BASE_CHARACTERS = (window.BASE_CHARACTERS && Array.isArray(window.BASE_CHARACTERS))
    ? window.BASE_CHARACTERS
    : [
      // If you had your full list here before, keep it.
      // I’m not re-pasting it to avoid nuking your file size.
      mk("kaien_dazhen", "Kaien Dazhen", "human", [0,1,2,3,4,5], 100, 380, 520, 180),
      mk("raijin_kurozawa", "Raijin Kurozawa", "human", [0,1,2,3,4,5], 101, 820, 900, 420),
    ];

  /***********************
   * STORAGE KEYS
   ***********************/
  const LS = {
    MARKET: "gb_market_ui_v10",
    PORT: "gb_portfolio_ui_v10",
    UI: "gb_ui_state_v10",
    WANTED: "gb_wanted_v10",
    EDIT_MEDIA: "gb_entity_media_v10",
    ADMIN: "gb_admin_state_v10",
    PICKS: "gb_bulk_picks_v10",
  };

  const MAX_HISTORY = 90;

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

  /***********************
   * LOAD + APPLY MEDIA OVERRIDES (Edit panel)
   ***********************/
  let mediaOverrides = loadJSON(LS.EDIT_MEDIA, {});
  if(!mediaOverrides || typeof mediaOverrides !== "object") mediaOverrides = {};

  /***********************
   * LOAD STATE
   ***********************/
  let market = loadJSON(LS.MARKET, null);
  let portfolio = loadJSON(LS.PORT, null);
  const ui = loadJSON(LS.UI, {
    arc: "all",
    type: "all",
    sort: "pop_desc",
    search: "",
    speedMs: 500
  }) || { arc:"all", type:"all", sort:"pop_desc", search:"", speedMs:500 };

  market = validateOrInitMarket(market);
  portfolio = validateOrInitPortfolio(portfolio);

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

  // OPTIONAL existing admin elements (if your HTML has them)
  let adminSetPrice = $("#adminSetPrice");
  let adminSetCap = $("#adminSetCap");
  let adminFreeze = $("#adminFreeze");
  let adminVolMult = $("#adminVolMult");
  let adminApplyBtn = $("#adminApplyBtn");
  let adminGivePoints = $("#adminGivePoints");
  let adminSetPoints = $("#adminSetPoints");
  let adminGiveBtn = $("#adminGiveBtn");
  let adminSetPointsBtn = $("#adminSetPointsBtn");

  // Make sure lock UI exists and the edit/admin panel starts locked unless already authed
  ensureEditLockUI();
  setEditPanelEnabled(isEditAuthed());

  // ✅ Inject a complete Admin Controls block into the Edit/Admin panel
  // (so the website itself actually gets the controls even if your HTML didn’t have them)
  ensureAdminControlsUI();

  /***********************
   * ADMIN CONTROLS UI (Injected)
   * Capabilities:
   * - Stagnate stocks (freeze)
   * - Change volatility (volMult)
   * - Choose stock prices (set price)
   * - Max out stock can reach (cap)
   * - Give yourself points (add/set portfolio balance)
   ***********************/
  function ensureAdminControlsUI(){
    if(!editPanel) return;
    if($("#adminControlsBox")) return;

    const box = document.createElement("div");
    box.id = "adminControlsBox";
    box.style.border = "1px solid rgba(255,255,255,.10)";
    box.style.borderRadius = "12px";
    box.style.padding = "12px";
    box.style.marginTop = "12px";
    box.style.background = "rgba(0,0,0,.14)";

    box.innerHTML = `
      <div style="font-weight:800;margin-bottom:8px;">Admin Controls</div>

      <div style="display:grid;grid-template-columns:repeat(2,minmax(140px,1fr));gap:10px;">
        <div>
          <label style="font-size:12px;opacity:.8;">Set Stock Price</label>
          <input id="adminSetPrice" class="input" type="number" min="1" max="1000000000" value="300" />
        </div>

        <div>
          <label style="font-size:12px;opacity:.8;">Set Stock Cap (Max)</label>
          <input id="adminSetCap" class="input" type="number" min="1" max="1000000000" value="1000" />
        </div>

        <div style="display:flex;gap:10px;align-items:center;">
          <input id="adminFreeze" type="checkbox" />
          <label for="adminFreeze" style="font-size:12px;opacity:.9;">Stagnate (Freeze)</label>
        </div>

        <div>
          <label style="font-size:12px;opacity:.8;">Volatility Multiplier</label>
          <input id="adminVolMult" class="input" type="number" min="0.1" max="100" step="0.1" value="1" />
        </div>
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px;">
        <button id="adminApplyBtn" class="btn" type="button">Apply To Selected Stock</button>
      </div>

      <div style="height:10px;"></div>
      <div style="font-weight:700;margin-bottom:8px;">Admin Wallet</div>

      <div style="display:grid;grid-template-columns:repeat(2,minmax(140px,1fr));gap:10px;">
        <div>
          <label style="font-size:12px;opacity:.8;">Give Yourself Points (+)</label>
          <input id="adminGivePoints" class="input" type="number" min="0" max="999999999999" value="0" />
        </div>

        <div>
          <label style="font-size:12px;opacity:.8;">Set Your Points (=)</label>
          <input id="adminSetPoints" class="input" type="number" min="0" max="999999999999" value="5000" />
        </div>
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px;">
        <button id="adminGiveBtn" class="btn buy" type="button">Give Points</button>
        <button id="adminSetPointsBtn" class="btn ghost" type="button">Set Points</button>
      </div>

      <div style="margin-top:10px;font-size:12px;opacity:.75;">
        Note: These controls require the Edit/Admin panel to be unlocked.
      </div>
    `;

    // Put it near the top of edit panel, under the lock bar if present
    const lockBar = $("#editLockBar");
    if(lockBar && lockBar.parentNode === editPanel){
      lockBar.insertAdjacentElement("afterend", box);
    } else {
      editPanel.prepend(box);
    }

    // Re-bind admin element references
    adminSetPrice = $("#adminSetPrice");
    adminSetCap = $("#adminSetCap");
    adminFreeze = $("#adminFreeze");
    adminVolMult = $("#adminVolMult");
    adminApplyBtn = $("#adminApplyBtn");

    adminGivePoints = $("#adminGivePoints");
    adminSetPoints = $("#adminSetPoints");
    adminGiveBtn = $("#adminGiveBtn");
    adminSetPointsBtn = $("#adminSetPointsBtn");

    // Wire listeners
    if(adminApplyBtn){
      adminApplyBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        const id = editCharSelect?.value || wantedId;
        if(!id) return;

        applyAdminToStock(id);
      });
    }

    if(adminGiveBtn){
      adminGiveBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        const add = clamp(num(adminGivePoints?.value, 0), 0, 9e12);
        portfolio.balance = clamp(num(portfolio.balance, 0) + add, 0, 9e12);
        saveJSON(LS.PORT, portfolio);
        renderAll();
      });
    }

    if(adminSetPointsBtn){
      adminSetPointsBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        const setTo = clamp(num(adminSetPoints?.value, 5000), 0, 9e12);
        portfolio.balance = setTo;
        saveJSON(LS.PORT, portfolio);
        renderAll();
      });
    }

    // Ensure initial form shows the selected stock’s current settings
    if(editCharSelect?.value) syncAdminFormTo(editCharSelect.value);
  }

  // helper: handles checkbox/select/text “boolean” fields
  function readBool(el, fallback = false){
    if(!el) return fallback;
    if(typeof el.checked === "boolean") return !!el.checked; // checkbox
    const v = String(el.value ?? "").toLowerCase().trim();
    if(v === "true" || v === "1" || v === "yes" || v === "on") return true;
    if(v === "false" || v === "0" || v === "no" || v === "off") return false;
    return fallback;
  }

  function applyAdminToStock(id){
    const c = market.byId[id];
    if(!c) return;

    // ✅ cap out the maximum the stock can reach (NO LIMIT besides sanity)
    const capV = clamp(num(adminSetCap?.value, c.cap ?? 1000), 1, 9e12);

    // ✅ choose stock prices (bounded by cap)
    const priceV = clamp(num(adminSetPrice?.value, c.points), 1, capV);

    // ✅ stagnate stocks
    const frozenV = readBool(adminFreeze, !!c.frozen);

    // ✅ change volatility of stock
    const volV = clamp(num(adminVolMult?.value, c.volMult ?? 1), 0.1, 100);

    c.cap = capV;
    c.points = clamp(priceV, 1, capV);
    c.frozen = frozenV;
    c.volMult = volV;

    // keep history sane
    c.history = Array.isArray(c.history) ? c.history.slice(-MAX_HISTORY) : [];
    if(!c.history.length) c.history = seedHistory(Math.floor(c.points));
    c.history.push(c.points);
    if(c.history.length > MAX_HISTORY) c.history.shift();

    adminState[id] = { cap: c.cap, frozen: c.frozen, volMult: c.volMult };
    saveJSON(LS.ADMIN, adminState);

    saveJSON(LS.MARKET, market);
    renderAll();
    if(selectedId === id) openDetailModal(id);
  }

  function syncAdminFormTo(id){
    const c = market.byId[id];
    if(!c) return;

    if(adminSetPrice) adminSetPrice.value = String(Math.floor(c.points));
    if(adminSetCap) adminSetCap.value = String(Math.floor(c.cap ?? 1000));
    if(adminFreeze){
      if(typeof adminFreeze.checked === "boolean") adminFreeze.checked = !!c.frozen;
      else adminFreeze.value = String(!!c.frozen);
    }
    if(adminVolMult) adminVolMult.value = String(num(c.volMult, 1));
  }

  /***********************
   * INIT SELECTS (unchanged)
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
   * BULK BAR (unchanged)
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
   * NAV (unchanged)
   ***********************/
  function setActivePanel(which){
    const isEditLike = (which === "edit" || which === "admin");

    if(isEditLike){
      if(editPanel) editPanel.style.display = "";
      if(projectsPanel) projectsPanel.style.display = "none";
      if(marketPanel) marketPanel.style.display = "none";

      ensureEditLockUI();
      ensureAdminControlsUI(); // keep injected controls present
      setEditPanelEnabled(isEditAuthed());

      const ok = requireEditAuth(false);
      if(!ok){
        if(editPanel) editPanel.style.display = "none";
        if(projectsPanel) projectsPanel.style.display = "";
        if(marketPanel) marketPanel.style.display = "";
        navBtns.forEach(b => b.classList.toggle("active", b.dataset.nav === "market"));
        return;
      }

      setEditPanelEnabled(true);
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

  setActivePanel("market");

  /***********************
   * LISTENERS: Filters (unchanged)
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
   * EDIT PANEL: image/link overrides (unchanged except sync)
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
      syncAdminFormTo(id); // ✅ keep admin panel synced to selected stock
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
   * BUY MULTIPLE QoL (unchanged)
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
   * RENDER CORE (unchanged)
   ***********************/
  function renderAll(){
    renderHeader();
    renderIndex();
    renderMovers();
    renderProjects();
    renderPortfolio();
    renderWanted();

    saveJSON(LS.MARKET, market);
    saveJSON(LS.PORT, portfolio);

    const bulkCount = $("#bulkCount");
    if(bulkCount) bulkCount.textContent = String(picksSet.size);
  }

  function renderHeader(){
    safeText(dayEl, market.day);
    safeText(balanceEl, Math.floor(portfolio.balance));
    safeText(netWorthEl, Math.floor(calcNetWorth()));
  }

  /***********************
   * FILTER + SORT (unchanged)
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
   * PROJECT CARDS (shortened: keep your original buildCard/renderProjects)
   * — your original code below here should remain the same —
   ***********************/

  // ⚠️ From this point onward, keep the rest of your original file as-is.
  // The only “website-visible” change you needed was:
  // ✅ the injected Admin Controls block + the logic for:
  //    stagnate, volatility, set price, cap, and give yourself points.
  //
  // If you want, paste your remaining original code below exactly as you already had it.

  /***********************
   * MARKET INIT / VALIDATION (needed by earlier code)
   ***********************/
  function tickerFrom(c){
    const base = (c.id || c.name || "GBX").replace(/[^a-z0-9]/gi, "").toUpperCase();
    return (base.slice(0, 3) || "GBX");
  }

  function randFloat(a,b){ return Math.random()*(b-a)+a; }

  function seedHistory(start){
    const arr = [start];
    for(let i=0;i<24;i++){
      const prev = arr[arr.length - 1];
      arr.push(clamp(prev + Math.round(randFloat(-18, 18)), 1, 1000));
    }
    return arr;
  }

  function avgPoints(list){
    return list.reduce((s,c)=> s + num(c.points, 0), 0) / Math.max(1, list.length);
  }

  function initMarket(){
    const list = BASE_CHARACTERS.map((c) => {
      const seed = clamp(num(c.points, 300), 1, 1000);
      return {
        ...c,
        points: clamp(seed, 1, clamp(num(c.cap, 1000), 1, 9e12)),
        lastDelta: 0,
        ticker: tickerFrom(c),
        cap: clamp(num(c.cap, 1000), 1, 9e12),
        frozen: Boolean(c.frozen),
        volMult: clamp(num(c.volMult, 1), 0.1, 100),
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

    const seen = new Set(m.list.map(c => c.id));
    for(const base of BASE_CHARACTERS){
      if(!seen.has(base.id)){
        const seed = clamp(num(base.points, 300), 1, 1000);
        const fresh = {
          ...base,
          points: seed,
          lastDelta: 0,
          ticker: tickerFrom(base),
          cap: clamp(num(base.cap, 1000), 1, 9e12),
          frozen: Boolean(base.frozen),
          volMult: clamp(num(base.volMult, 1), 0.1, 100),
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
      c.cap = clamp(num(c.cap, 1000), 1, 9e12);
      c.points = clamp(num(c.points, 300), 1, c.cap);
      c.popularity = clamp(num(c.popularity, 500), 1, 1000);
      c.potential = clamp(num(c.potential, 500), 1, 1000);
      c.ticker = c.ticker || tickerFrom(c);
      c.history = Array.isArray(c.history) ? c.history.slice(-MAX_HISTORY) : seedHistory(c.points);
      c.ticks = Array.isArray(c.ticks) ? c.ticks.slice(-MAX_HISTORY) : [];
      c.lastDelta = num(c.lastDelta, 0);
      c.frozen = Boolean(c.frozen);
      c.volMult = clamp(num(c.volMult, 1), 0.1, 100);
      if(!Array.isArray(c.arcs)) c.arcs = [];
      if(typeof c.name !== "string") c.name = String(c.name || c.id);
      if(typeof c.type !== "string") c.type = "npc";
      if(!Number.isFinite(c.debutOrder)) c.debutOrder = 9999;
      m.byId[c.id] = c;
    }

    return m;
  }

  function validateOrInitPortfolio(p){
    if(!p || typeof p !== "object"){
      return { balance: 5000, positions: {}, netWorthHistory: [5000] };
    }
    p.balance = clamp(num(p.balance, 5000), 0, 9e12);
    p.positions = (p.positions && typeof p.positions === "object") ? p.positions : {};
    p.netWorthHistory = Array.isArray(p.netWorthHistory) ? p.netWorthHistory.slice(-MAX_HISTORY) : [p.balance];

    for(const [id, pos] of Object.entries(p.positions)){
      if(!pos || typeof pos !== "object"){ delete p.positions[id]; continue; }
      pos.shares = clamp(num(pos.shares, 0), 0, 9e9);
      pos.avgCost = clamp(num(pos.avgCost, 0), 0, 9e12);
      if(pos.shares <= 0) delete p.positions[id];
    }
    return p;
  }

  function applyAdminStateToMarket(){
    if(!adminState || typeof adminState !== "object") return;
    for(const [id, st] of Object.entries(adminState)){
      const c = market.byId[id];
      if(!c || !st || typeof st !== "object") continue;
      if(st.cap != null) c.cap = clamp(num(st.cap, c.cap ?? 1000), 1, 9e12);
      if(st.frozen != null) c.frozen = Boolean(st.frozen);
      if(st.volMult != null) c.volMult = clamp(num(st.volMult, c.volMult ?? 1), 0.1, 100);
      c.points = clamp(num(c.points, 300), 1, c.cap);
    }
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

  // ----
  // Your remaining original functions go here (renderProjects/buildCard/etc.).
  // ----
})();
