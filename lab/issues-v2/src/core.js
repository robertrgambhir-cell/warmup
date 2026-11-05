/* Warmup issue lessons v2: the engine.
   A lesson is data (src/lessons/*.js). Each scene names a type; WU.scene[type] draws it and wires its interaction.
   The engine owns the shell: the story bar, the bottom row, the sources sheet, scale-to-fit, the screen tag and
   gating (a scene that asks the learner to do something keeps its button locked, with the instruction as its label,
   until it's done). No framework, no build step at runtime, so it can be pasted into the single-file app. */
(function () {
  "use strict";
  var WU = (window.WU = window.WU || {});
  WU.scene = WU.scene || {};
  WU.lessons = WU.lessons || {};
  var Q = new URLSearchParams(location.search);
  WU.fast = Q.has("fast");

  WU.esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  /* a numbered source mark; numbers are per lesson, so the sheet and the end screen agree */
  WU.sup = function () { return '<span class="sup">' + Array.prototype.slice.call(arguments).join(",") + "</span>"; };
  WU.money = function (n) { return "$" + Math.round(n).toLocaleString("en-US"); };
  WU.icon = {
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5C6.5 4 9.5 4 12 6c2.5-2 5.5-2 8-.5V19c-2.5-1.5-5.5-1.5-8 .5-2.5-2-5.5-2-8-.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 6v13.5" stroke="currentColor" stroke-width="2"/></svg>',
    door: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 21V4h12v17M3.5 21h17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="15" cy="13" r="1.3" fill="currentColor"/></svg>',
    doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M10 12h5M10 16h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    hand: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11V5.5a1.5 1.5 0 013 0V10m0 0V4.5a1.5 1.5 0 013 0V10m0 0V6.5a1.5 1.5 0 013 0V14c0 4-2.5 7-6.5 7S6 19 4.5 15.5L3 12c-.6-1.4 1.3-2.4 2.2-1.2L7 13V8.5a1.5 1.5 0 013 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    dash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 12h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    bang: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="18.5" r="1.8" fill="currentColor"/></svg>',
    mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M6 11a6 6 0 0012 0M12 17v4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
    capitol: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16M6 20v-7M10 20v-7M14 20v-7M18 20v-7M4.5 13h15M12 4v2M7 13a5 5 0 0110 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ---------- state ---------- */
  var app = (WU.app = { lesson: null, part: "learn", i: 0, st: {} });
  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem("wu2:" + k) || "null"); localStorage.setItem("wu2:" + k, JSON.stringify(v)); } catch (e) { return null; } }
  WU.store = store;

  /* ---------- shell ---------- */
  var root, scr, body, nextBtn, srcBtn, seg, tagEl, sheet;
  function shell() {
    root = document.getElementById("wu");
    root.innerHTML = '<div class="stage"><div class="phone" id="phone"><div class="scr" id="scr">' +
      '<div class="top"><button class="x" id="close" aria-label="Close and go to the lesson list">' + WU.icon.x + '</button><div class="seg" id="seg" role="navigation" aria-label="Lesson progress"></div></div>' +
      '<main class="body" id="body" aria-live="polite"></main>' +
      '<div class="foot" id="foot"><button class="src" id="srcb" type="button">' + WU.icon.doc + 'Sources</button><button class="next" id="next" type="button"></button></div>' +
      '<div class="tag" id="tag"></div>' +
      '<div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-h"><div class="card"></div></div>' +
      "</div></div></div>";
    scr = document.getElementById("scr"); body = document.getElementById("body"); nextBtn = document.getElementById("next");
    srcBtn = document.getElementById("srcb"); seg = document.getElementById("seg"); tagEl = document.getElementById("tag"); sheet = document.getElementById("sheet");
    document.getElementById("close").onclick = function () { WU.speak.stop(); WU.go("home"); };
    nextBtn.onclick = function () { if (nextBtn.getAttribute("aria-disabled") === "true") { nudge(); return; } if (app.onNext) app.onNext(); };
    srcBtn.onclick = openSources;
    sheet.onclick = function (e) { if (e.target === sheet) closeSheet(); };
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && sheet.classList.contains("on")) closeSheet(); });
    window.addEventListener("resize", fit);
  }
  function nudge() { /* a locked button points at what to do */ var d = body.querySelector(".do:not(.done)"); if (d) { d.animate && d.animate([{ transform: "translateX(0)" }, { transform: "translateX(5px)" }, { transform: "translateX(-4px)" }, { transform: "translateX(0)" }], { duration: 280 }); } }

  /* ---------- scale to fit: one variable sets every size, the largest that fits with no scrolling ---------- */
  function fit() {
    if (!body) return;
    var k = 1.12, min = 0.82; /* below 0.82 text gets too small to read; scroll instead */
    if (body.dataset.fallback) { body.classList.remove("scroll"); delete body.dataset.fallback; }
    if (body.classList.contains("scroll")) { scr.style.setProperty("--k", 1); app.k = 1; return; }
    scr.style.setProperty("--k", k);
    var guard = 0;
    while (body.scrollHeight > body.clientHeight + 1 && k > min && guard++ < 40) { k = Math.round((k - 0.02) * 100) / 100; scr.style.setProperty("--k", k); }
    app.k = k;
    /* last resort on very short screens: scroll rather than clip (the walk test reports every screen that does this) */
    if (body.scrollHeight > body.clientHeight + 1) { body.classList.add("scroll"); body.dataset.fallback = "1"; }
  }
  WU.fit = function () { requestAnimationFrame(function () { fit(); /* on a screen too short to fit, bring new feedback into view */ if (body.dataset.fallback && Date.now() - (app.shownAt || 0) > 400 && body.scrollTo) body.scrollTo({ top: body.scrollHeight, behavior: "smooth" }); }); };

  /* ---------- sources sheet: numbered for this lesson; links on the last screen ---------- */
  function openSources() {
    var L = app.lesson, ids = app.srcIds || [];
    if (!L || !ids.length) return;
    var items = ids.map(function (n) { var s = L.sources[n - 1]; return "<li value=\"" + n + "\">" + WU.esc(s.t) + "</li>"; }).join("");
    sheet.querySelector(".card").innerHTML = '<h3 id="sheet-h">Sources</h3><p class="note">Every number on this screen has a mark. Links are on the last screen.</p><ol>' + items + '</ol><button class="ghost close" type="button">Close</button>';
    sheet.querySelector(".close").onclick = closeSheet;
    sheet.classList.add("on"); sheet.querySelector(".close").focus();
  }
  function closeSheet() { sheet.classList.remove("on"); srcBtn.focus(); }

  /* ---------- routing ---------- */
  WU.go = function (where) {
    WU.speak.stop();
    if (where === "home") { app.lesson = null; renderHome(); try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} return; }
    var L = WU.lessons[where]; if (!L) return renderHome();
    app.lesson = L; app.part = "learn"; app.i = 0; app.st = { lesson: where }; app.reached = {}; app.passed = {};
    try { history.replaceState(null, "", "#" + where); } catch (e) {}
    show();
  };
  WU.next = function () {
    var L = app.lesson, list = app.part === "learn" ? L.learn : L.door;
    app.passed = app.passed || {}; app.passed[app.part] = Math.max(app.passed[app.part] == null ? -1 : app.passed[app.part], app.i);
    if (app.i < list.length - 1) { app.i++; show(); return; }
    if (app.part === "learn") { app.part = "door"; app.i = 0; show(); return; }
    WU.go("home");
  };
  WU.jump = function (part, i) { app.part = part; app.i = i; show(); };

  /* the story bar: one segment per screen, full or empty; tap any screen you've reached to go back to it */
  function bar() {
    var L = app.lesson, part = app.part, n = part === "learn" ? L.learn.length : L.door.length, out = "";
    var reached = (app.reached = app.reached || {}), key = part;
    reached[key] = Math.max(reached[key] || 0, app.i);
    if (part === "door") out = '<button type="button" class="chip-done" id="tolearn" aria-label="Go back to Learn">' + WU.icon.check.replace("<svg", '<svg width="11" height="11"') + "Learn</button>";
    for (var a = 0; a < n; a++) {
      var full = a <= app.i, can = a <= reached[key] && a !== app.i;
      out += '<button type="button" class="sg' + (full ? " full" : "") + '" data-i="' + a + '"' + (can ? ' aria-label="Go to screen ' + (a + 1) + '"' : ' disabled aria-hidden="true" tabindex="-1"') + "><i></i></button>";
    }
    seg.className = "seg" + (part === "door" ? " door" : "");
    seg.innerHTML = out;
    seg.removeAttribute("aria-hidden");
    seg.querySelectorAll("button.sg:not([disabled])").forEach(function (b) { b.onclick = function () { WU.jump(part, +b.getAttribute("data-i")); }; });
    var tl = document.getElementById("tolearn"); if (tl) tl.onclick = function () { WU.jump("learn", L.learn.length - 1); };
  }

  /* the scene's own controller calls ctx.ready(label) when its interaction is done, or ctx.lock(instruction) */
  function show() {
    var L = app.lesson, list = app.part === "learn" ? L.learn : L.door, sc = list[app.i];
    var draw = WU.scene[sc.type];
    if (!draw) throw new Error("No scene type " + sc.type);
    WU.speak.stop();
    bar();
    app.srcIds = sc.src || [];
    srcBtn.hidden = !app.srcIds.length;
    tagEl.textContent = L.tag + " " + (app.part === "learn" ? (app.i === 0 ? "Cover" : app.i) : "D" + (app.i + 1));
    nextBtn.className = "next" + (app.part === "door" ? " blue" : "");
    var ctx = {
      L: L, sc: sc, st: app.st, body: body,
      ready: function (label, more) { /* more: a step inside the screen, not the end of it */ if (!more) { app.passed = app.passed || {}; app.passed[app.part] = Math.max(app.passed[app.part] == null ? -1 : app.passed[app.part], app.i); } nextBtn.removeAttribute("aria-disabled"); if (label) nextBtn.textContent = label; else nextBtn.textContent = sc.btn || "Continue"; WU.fit(); },
      revisit: app.passed && app.i <= (app.passed[app.part] == null ? -1 : app.passed[app.part]),
      lock: function (instr) { if (app.passed && app.i <= (app.passed[app.part] == null ? -1 : app.passed[app.part])) return; /* a screen you already finished never locks again */ nextBtn.setAttribute("aria-disabled", "true"); nextBtn.textContent = instr; },
      label: function (t) { nextBtn.textContent = t; },
      onNext: function (fn) { app.onNext = fn; },
      next: WU.next
    };
    app.onNext = WU.next;
    body.classList.toggle("scroll", !!sc.scroll);
    body.scrollTop = 0;
    body.innerHTML = draw.html ? draw.html(sc, ctx) : "";
    nextBtn.removeAttribute("aria-disabled");
    nextBtn.textContent = sc.btn || "Continue";
    if (draw.mount) draw.mount(sc, ctx);
    app.shownAt = Date.now();
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    var h = body.querySelector("h1,h2"); if (h) { h.setAttribute("tabindex", "-1"); if (!WU.firstPaint) h.focus({ preventScroll: true }); }
    WU.firstPaint = false;
  }
  WU.refit = fit;

  /* ---------- home: the two rebuilt lessons, and the three still on the old design ---------- */
  function renderHome() {
    bodyHome();
  }
  function bodyHome() {
    body.classList.remove("scroll");
    seg.innerHTML = ""; seg.className = "seg"; tagEl.textContent = "Home"; srcBtn.hidden = true;
    var rows = (WU.home || []).map(function (h) {
      var on = !!WU.lessons[h.id];
      return '<button class="lrow' + (on ? "" : " off") + '" ' + (on ? 'data-go="' + h.id + '"' : 'disabled aria-disabled="true"') + ' type="button"><span class="ic" style="background:' + h.color + '">' + h.icon + '</span><span><b>' + WU.esc(h.name) + '</b><span class="qq">“' + WU.esc(h.quote) + '”</span><span class="fm">' + WU.esc(h.format) + "</span></span></button>";
    }).join("");
    body.innerHTML = '<p class="kick">Warmup issue lessons · prototype</p><h1 class="home-h">Learn the issue, then explain it at the door</h1>' +
      '<p class="small">Two lessons rebuilt on the new system. Each takes about five minutes. The other three are still on the old design.</p>' +
      '<div style="display:flex;flex-direction:column;gap:10px">' + rows + "</div>" +
      '<p class="fine">A review prototype, separate from the live Warmup app. Built by Warmup from public sources. Not affiliated with or approved by any campaign.</p>';
    body.querySelectorAll("[data-go]").forEach(function (b) { b.onclick = function () { WU.go(b.getAttribute("data-go")); }; });
    nextBtn.className = "next";
    nextBtn.removeAttribute("aria-disabled");
    nextBtn.textContent = "Start: health insurance";
    app.onNext = function () { WU.go("health"); };
    fit();
  }

  /* ---------- boot ---------- */
  WU.firstPaint = true;
  WU.boot = function () {
    shell();
    route();
    window.addEventListener("hashchange", route);
  };
  function route() {
    var h = (location.hash || "").replace("#", "");
    var m = /^(\w+?)(?:-(learn|door)(\d+))?$/.exec(h);
    if (Q.get("lesson")) m = [null, Q.get("lesson"), Q.get("part") || "learn", Q.get("i") || "0"];
    if (m && WU.lessons[m[1]]) { WU.go(m[1]); if (m[2]) WU.jump(m[2], +m[3] || 0); }
    else renderHome();
  }
})();
