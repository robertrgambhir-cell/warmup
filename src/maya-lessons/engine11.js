  /* ---------- version 11 engine: Learn, then the warm-up's four parts, all at one voter's door ---------- */
  var S = { lesson: null, ph: 0, idx: 0, done: {}, sources: false, d: null, play: null, spot: null, res: null };
  var EMB = (function () { try { return window.parent !== window; } catch (er) { return true; } })(); /* opened inside the Warmup app (Learn tab) */
  if (EMB) document.documentElement.classList.add("embedded");
  var ALL = /[?&#]all\b/.test(location.search + location.hash), FAST = /[?&#]fast\b/.test(location.search + location.hash);
  var LOCK = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  var MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
  var rec = null, recTimers = [], recSession = null, playTok = 0;
  function X() { return L[S.lesson]; }
  function foot(h) { $("foot").innerHTML = h; }
  function stopAll() {
    playTok++; clearInterval(mouthTimer); mouthTimer = 0;
    if (recSession) recSession.cancel(); recSession = null;
    try { if (rec) rec.abort(); } catch (e) {} rec = null;
    recTimers.forEach(clearTimeout); recTimers = [];
    try { speechSynthesis.cancel(); } catch (e) {}
    try { if (curAudio) { curAudio.onended = null; curAudio.pause(); curAudio = null; } } catch (e) {}
  }
  function newDoor() { return { stage: "intro", turns: [], r: {}, n: 0 }; }
  function goPart(p) {
    stopAll(); S.ph = p; S.idx = 0; S.sources = false;
    if (p === 1 || p === 4) S.d = newDoor();
    if (p === 2 || p === 3) { S.play = { i: -1, finished: false }; S.spot = { pick: null }; }
    if (p === 4) S.res = null;
    render(); $("body").scrollTop = 0;
    if (p === 2 || p === 3) playScript();
  }
  function goLearn(i) { stopAll(); S.ph = 0; S.idx = i; S.sources = false; render(); }
  function home() { stopAll(); S.lesson = null; S.sources = false; render(); $("body").scrollTop = 0; }
  function learnStep(d) { var n = S.idx + d; if (n < 0) { home(); return; } if (n >= X().story.length) { goPart(1); return; } goLearn(n); }

  /* numbered sources, tied to the superscripts on the card */
  function srcLine(src) { if (!src || !src.length) return ""; return '<p class="st-src">' + src.map(function (s, k) { return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener"><b>' + (k + 1) + '</b>' + esc(s[0]) + ' ↗</a>'; }).join(" · ") + '</p>'; }
  function reveal(x) { return '<div class="reveal"><span class="kick">Where this lesson came from</span><p>Maya stood in for <b>' + esc(x.from) + '</b>, the Democrat in the 2026 ' + esc(x.race) + ' race. Her Republican opponent is <b>' + esc(x.opp) + '</b>.</p><p class="muted">The positions, quotes and facts are theirs, drawn from public sources. We showed them as Maya Kaur’s campaign so you can see how a campaign’s own lesson would look in Warmup.</p><button class="srcbtn" type="button" id="srcs">See all sources</button></div>'; }

  /* the five-part stepper, tappable like Instagram */
  /* the stepper (Robert, Oct 31, 6:18 PM): one bar, each part as wide as the time it takes (2 min, 30 sec, 1 min, 30 sec, 1 min);
     Learn is cut into one notch per card, so every tap fills the next notch; one line above names the part you're in and the time left */
  var PART_W = [2, 0.5, 1, 0.5, 1];
  function partFill(p) {
    var x = X();
    if (S.ph > p) return 1; if (S.ph < p) return 0;
    if (p === 1 || p === 4) return !S.d || S.d.stage === "intro" ? 0.08 : S.d.stage === "end" || S.d.stage === "result" ? 1 : 0.3 + S.d.n * 0.3;
    var n = p === 2 ? x.hearLines.length : x.missLines.length;
    return S.play && S.play.finished ? (p === 3 && !(S.spot && S.spot.pick != null) ? 0.7 : 1) : Math.max(0.08, (S.play ? S.play.i + 1 : 0) / n * 0.6);
  }
  /* the stepper (Robert, Nov 1): during Learn, a story bar with one segment per card; at the switch to practice the Learn bar folds into a
     "Learn ✓" chip and the warm-up's four named practice segments slide in beside it */
  function stepper() {
    var x = X(), N = x.story.length;
    if (S.ph === 0) {
      var s = ""; for (var k = 0; k < N; k++) s += '<button type="button" class="' + (k < S.idx ? "f" : k === S.idx ? "f c" : "") + '" data-card="' + k + '" aria-label="Card ' + (k + 1) + ' of ' + N + '"><i></i></button>';
      return '<div class="sb2 learn" role="navigation" aria-label="Learn, card ' + (S.idx + 1) + ' of ' + N + '">' + s + '</div>';
    }
    var enter = S.ph === 1 && S.d && S.d.stage === "intro" && !S.sbEntered; if (enter) S.sbEntered = true;
    var segs = PARTS.slice(1).map(function (name, j) {
      var p = j + 1, st = S.ph > p ? "done" : S.ph === p ? "cur" : "", w = st === "done" ? 100 : st === "cur" ? Math.round(partFill(p) * 100) : 0;
      return '<button type="button" class="' + st + '" data-part="' + p + '" aria-label="' + name + (st === "done" ? ", done" : st === "cur" ? ", current part" : "") + '"><span class="seg"><i style="width:' + w + '%"></i></span><span class="nm">' + name + '</span></button>';
    }).join("");
    return '<div class="sb2 prac' + (enter ? " enter" : "") + '" role="navigation" aria-label="Lesson parts"><button type="button" class="lchip" data-part="0" aria-label="Learn, done"><span>✓</span>Learn</button><div class="pseg">' + segs + '</div></div>';
  }
  function shell(o) {
    var x = X();
    var top = '<div class="st-top"><img src="' + MAYA_PHOTO + '" alt=""><b>Maya Kaur</b><span>' + esc(x.issue) + '</span><button class="st-x" type="button" id="home" aria-label="Close lesson">✕</button></div>';
    $("body").innerHTML = '<div class="story' + (o.dark ? " dark" : "") + (o.cls ? " " + o.cls : "") + (o.tap ? " tap fit" : o.fit ? " fit" : "") + '" id="story" style="background:' + o.bg + '">' + top + (o.nostep ? "" : stepper()) + '<div class="st-body' + (o.bcls ? " " + o.bcls : "") + '">' + o.body + '</div>' + (o.btns || "") + '</div>';
    foot("");
    var st = $("story"), reduce = false; try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    requestAnimationFrame(function () { requestAnimationFrame(function () { if (st) st.classList.add("go"); }); });
    Array.prototype.forEach.call(st.querySelectorAll("[data-count]"), function (el) {
      var to = +el.dataset.count; if (reduce) return;
      var t0 = null; el.textContent = "0";
      function tick(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1100), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(to * e).toLocaleString("en-US"); if (p < 1 && document.body.contains(el)) requestAnimationFrame(tick); }
      requestAnimationFrame(tick);
    });
  }
  var NEXTB = function (label, id, cls) { return '<button class="st-next' + (cls ? " " + cls : "") + '" type="button" id="' + (id || "stnext") + '">' + esc(label) + ' <span aria-hidden="true">→</span></button>'; };

  function render() {
    $("prog").hidden = true; $("back").hidden = true;
    $("phone").classList.toggle("home-on", S.lesson == null);
    $("phone").classList.toggle("story-on", S.lesson != null);
    if (S.lesson == null) { renderHome(); return; }
    if (S.sources) { renderSources(); return; }
    if (S.how) { renderHow(); return; }
    if (S.ph === 0) renderLearn();
    else if (S.ph === 1 || S.ph === 4) renderDoor();
    else if (S.ph === 2 || S.ph === 3) renderPlay();
    else renderDone();
  }
  function renderLearn() { var c = X().story[S.idx]; shell({ bg: c.bg, dark: c.dark, tap: true, body: c.html() + srcLine(c.src), btns: NEXTB(c.next) }); fitCard(); }
  /* grow or shrink the card's contents (--k) to the largest size that fits, so a card fills the screen without scrolling (Robert, Oct 31, 9:08 PM) */
  function fitCard() {
    var b = document.querySelector("#story.fit .st-body"); if (!b) return;
    var st = b.closest(".story"), had = st.classList.contains("go");
    st.classList.add("go", "measuring"); /* measure at the final size of every growing bar, with transitions off */
    var fits = function (k) { b.style.setProperty("--k", k); return b.scrollHeight <= b.clientHeight; };
    var lo = 0.7, hi = 1.75;
    if (fits(hi)) lo = hi; else for (var i = 0; i < 9; i++) { var m = (lo + hi) / 2; if (fits(m)) lo = m; else hi = m; }
    b.style.setProperty("--k", (lo * 0.98).toFixed(3));
    if (!had) st.classList.remove("go");
    void b.offsetHeight; st.classList.remove("measuring");
  }
  window.addEventListener("resize", function () { if (S.lesson != null && S.ph === 0 && !S.sources) fitCard(); });
  /* before the first lesson: how every lesson works, once (Robert, Oct 31, 11:33 PM) */
  function renderHow() {
    /* Mobbin: Deepstash, Hypelist and Yazio "how it works" timelines. One line of title, a vertical timeline with an icon per part, the four practice parts grouped under one door */
    var x = X(), I = {
      learn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z"/></svg>',
      mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
      ear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 0 1 12 0c0 3-2 4-3 5.5s-1 2.5-1.5 4A2.5 2.5 0 0 1 9 18"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.2-.8 1.8-1.4 2.6"/></svg>',
      find: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>',
      star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/></svg>',
      door: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 21V4h12v17"/><path d="M3.5 21h17"/><circle cx="15" cy="12.5" r="1" fill="currentColor"/></svg>'
    };
    var step = function (ic, t, d, m, k) { return '<li class="hw-s" style="animation-delay:' + (120 + k * 90) + 'ms"><span class="hw-ic">' + I[ic] + '</span><span class="hw-tx"><b>' + t + '</b><small>' + d + '</small></span><em>' + m + '</em></li>'; };
    var body = '<div class="hw"><h2 class="hw-h">How each lesson works</h2><p class="hw-sub">Five quick parts. About 5 minutes.</p>' +
      '<ol class="hw-tl">' + step("learn", "Learn", "Quick cards on the issue", "2 min", 0) + '</ol>' +
      '<div class="hw-door"><p class="hw-dk"><span>' + I.door + '</span>Then, at a voter’s door</p><ol class="hw-tl">' +
      step("mic", "1st try", "Your way, no grades", "30 sec", 1) + step("ear", "Hear it done", "A canvasser shows how", "1 min", 2) + step("find", "Catch the mistake", "Spot her slip", "30 sec", 3) + step("star", "2nd try", "Again, with feedback", "1 min", 4) + '</ol></div></div>';
    shell({ bg: "#FCF8F2", nostep: true, fit: true, cls: "howc", body: body, btns: NEXTB("Start " + x.issue.toLowerCase(), "howgo") }); fitCard();
  }
  function renderSources() { var x = X(); shell({ bg: "#FBF6EE", body: '<span class="st-kick">Sources for this lesson</span><ul class="srclist">' + x.sources.map(function (s) { return '<li><a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + esc(s[0]) + '</a></li>'; }).join("") + '</ul>', btns: NEXTB("Back to the lesson", "srcback") }); }
  function renderDone() {
    var x = X(); S.done[S.lesson] = true;
    shell({ bg: BLUE_BG, dark: true, cls: "donec", body: '<div class="dn-top"><svg viewBox="0 0 48 48" width="74" height="74" aria-hidden="true"><circle cx="24" cy="24" r="20" fill="#7ee0a8"/><path d="M15.5 24.5 L21.5 30.5 L33 18.5" fill="none" stroke="#163a72" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg><h2 class="st-h lg">Lesson done.</h2><p class="st-p dim">You can explain where Maya stands on ' + esc(x.issue.toLowerCase()) + ', and how her opponent differs, at any door.</p></div>' + reveal(x),
      btns: NEXTB("Back to all lessons", "home"), fit: true }); fitCard();
  }

  /* ---------- home ---------- */
  function renderHome() {
    var b = $("body"), ndone = L.filter(function (_, k) { return S.done[k]; }).length, bobbed = false;
    /* the path fits whatever height is left under the hero (Robert, Oct 31, 7:06 PM: no scrolling): stops sit at percentages and size to the space */
    var XS = [30, 68, 32, 66, 38], YS = [14, 32.5, 51, 69.5, 88], path = "";
    L.forEach(function (_, k) { var y = YS[k]; if (k === 0) path += "M" + XS[0] + " " + y; else { var py = YS[k - 1]; path += " C" + XS[k - 1] + " " + (py + 9) + " " + XS[k] + " " + (y - 9) + " " + XS[k] + " " + y; } });
    var nodes = L.map(function (x, k) {
      var open = ALL || k === 0 || S.done[k - 1], done = S.done[k], cur = open && !done, left = XS[k] < 50, bob = cur && !bobbed;
      if (bob) bobbed = true;
      var sub = done ? "Done · tap to redo" : open ? "5 minutes" : "Opens after lesson " + k;
      return '<div class="nd' + (done ? " done" : cur ? " cur" : open ? "" : " locked") + (bob ? " bob" : "") + (left ? " l" : " r") + '" style="left:' + XS[k] + '%;top:' + YS[k] + '%;--c:' + ICONS[k][1] + '">' +
        (bob ? '<span class="nd-go">' + (k === 0 && !ndone ? "Start here" : "Up next") + '</span>' : "") +
        '<button type="button" class="nd-b"' + (open ? ' data-lesson="' + k + '"' : ' disabled aria-disabled="true"') + ' aria-label="' + esc(x.issue) + '">' + ICONS[k][0] + (done ? '<i class="nd-badge ok">✓</i>' : !open ? '<i class="nd-badge">' + LOCK + '</i>' : "") + '</button>' +
        '<div class="nd-t"><b>' + esc(x.issue) + '</b><span>' + sub + '</span></div></div>';
    }).join("");
    b.innerHTML = '<div class="hm"><div class="hm-hero"><div class="hm-top">' + (EMB ? '<button class="emb-back" type="button" id="embback" aria-label="Back to Warmup">‹</button>' : '') + '<span class="camp-mark lite"><b>Maya Kaur</b></span><span class="hm-count"><svg viewBox="0 0 36 36" width="22" height="22"><circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="5"/><circle cx="18" cy="18" r="14" fill="none" stroke="#7ee0a8" stroke-width="5" stroke-linecap="round" stroke-dasharray="' + (88 * ndone / 5).toFixed(1) + ' 88" transform="rotate(-90 18 18)"/></svg>' + ndone + ' of 5 done</span></div>' +
      '<div class="hm-hi"><div class="st-photo sm"><img src="' + MAYA_PHOTO + '" alt="Maya Kaur"></div><div><h2>Hi, I’m Maya.</h2><p>These are the five issues we’re hearing the most about from voters at the door.</p></div></div>' +
      '<i class="hm-blob a"></i><i class="hm-blob b"></i></div>' +
      '<div class="hm-path"><svg class="hm-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="' + path + '" fill="none" stroke="#d9cfbf" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 12" vector-effect="non-scaling-stroke"/></svg>' + nodes + '</div>' +
      '</div>';
    foot("");
  }

  /* ---------- voices: a recorded clip when there is one, the browser voice otherwise; calls back when the line ends ---------- */
  function say(text, kv, cb) {
    var tok = playTok, done = false, clean = cleanSay(text);
    function fin() { if (done) return; done = true; if (tok === playTok && cb) cb(); }
    var guess = Math.max(1600, clean.split(/\s+/).length * 390 + 700);
    if (FAST) { recTimers.push(setTimeout(fin, 40)); return; }
    try { if (curAudio) { curAudio.onended = null; curAudio.pause(); curAudio = null; } } catch (e) {}
    recTimers.push(setTimeout(fin, guess + 4000));
    if (CLIPS[clean]) {
      try { speechSynthesis.cancel(); } catch (e) {}
      try { curAudio = new Audio(CLIPS[clean]); curAudio.onended = function () { recTimers.push(setTimeout(fin, 250)); }; var pr = curAudio.play(); if (pr && pr.catch) pr.catch(function () { recTimers.push(setTimeout(fin, guess)); }); } catch (e) { recTimers.push(setTimeout(fin, guess)); }
      return;
    }
    try {
      if (!("speechSynthesis" in window)) { recTimers.push(setTimeout(fin, guess)); return; }
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(clean), male = /^am_/.test(kv || "");
      var want = male ? ["Fred", "Alex", "Daniel", "Tom", "Aaron"] : ["Samantha", "Ava", "Allison", "Victoria", "Google US English"];
      var en = VOICES.filter(function (v) { return /^en(-|_)US/i.test(v.lang); }), pick = null;
      for (var i = 0; i < want.length && !pick; i++) pick = en.filter(function (v) { return v.name.indexOf(want[i]) >= 0; })[0] || null;
      if (pick) u.voice = pick;
      u.onend = function () { recTimers.push(setTimeout(fin, 250)); };
      speechSynthesis.speak(u);
    } catch (e) { recTimers.push(setTimeout(fin, guess)); }
  }

  /* ---------- listening that survives pauses: Safari ends recognition on silence, so it restarts until the volunteer taps the button again ---------- */
  function fold(parts) {
    if (!parts.length) return "";
    var builds = parts.length > 1 && parts.every(function (p, i) { return i === 0 || p.toLowerCase().indexOf(parts[i - 1].toLowerCase().slice(0, 12)) === 0; });
    var t = (builds ? parts[parts.length - 1] : parts.join(" ")).replace(/\s+/g, " ").trim(), w = t.split(" "), half = w.length / 2;
    if (w.length > 3 && w.length % 2 === 0 && w.slice(0, half).join(" ").toLowerCase() === w.slice(half).join(" ").toLowerCase()) t = w.slice(0, half).join(" ");
    return t;
  }
  var talkTimer = 0;
  function liveWords(text) {
    var s = $("tl-said"), c = $("talk-live");
    if (!s || !c) { render(); return; }
    s.textContent = text; s.scrollTop = s.scrollHeight; c.classList.add("talking");
    clearTimeout(talkTimer); talkTimer = setTimeout(function () { var k = $("talk-live"); if (k) k.classList.remove("talking"); }, 900);
  }
  function listen(r, onDone) {
    stopAll();
    var base = r.text ? r.text + " " : "", userDone = false, cancelled = false, t0 = Date.now(), restarts = 0;
    r.listening = true; r.error = ""; render();
    recSession = { cancel: function () { cancelled = true; }, finish: function () { userDone = true; try { if (rec) rec.stop(); } catch (e) {} recTimers.push(setTimeout(function () { if (!cancelled && r.listening) wrap(); }, 1500)); } };
    function wrap() { if (cancelled) return; cancelled = true; recTimers.forEach(clearTimeout); recTimers = []; rec = null; recSession = null; r.listening = false; if (!r.text) { r.error = "Nothing came through. Tap to talk and try again, a little louder."; render(); return; } onDone(r.text); }
    function open() {
      var R = new SR(), err = "", started = false; rec = R; R.lang = "en-US"; R.interimResults = true; R.continuous = true;
      R.onstart = function () { started = true; };
      R.onresult = function (e) { var parts = []; for (var j = 0; j < e.results.length; j++) parts.push(String(e.results[j][0].transcript || "").trim()); r.text = (base + fold(parts.filter(Boolean))).trim(); liveWords(r.text); };
      R.onerror = function (e) { err = e && e.error; };
      R.onend = function () {
        if (cancelled || rec !== R) return;
        if (err === "not-allowed" || err === "service-not-allowed") { if (restarts && r.text) { pause(); return; } cancelled = true; rec = null; recSession = null; r.listening = false; r.error = "Warmup needs your microphone. Allow it for this site in your browser settings, then tap to talk."; render(); return; }
        if (err === "audio-capture") { cancelled = true; rec = null; recSession = null; r.listening = false; r.error = "We can’t reach your microphone. Another app is probably using it, like FaceTime or a call. Close it, then tap to talk."; render(); return; }
        if (userDone || Date.now() - t0 > 120000) { wrap(); return; }
        base = r.text ? r.text + " " : ""; restarts++;
        try { open(); } catch (e) { pause(); }
      };
      R.start();
      recTimers.push(setTimeout(function () { if (!started && rec === R && !cancelled && !restarts) { try { R.abort(); } catch (e) {} cancelled = true; rec = null; recSession = null; r.listening = false; r.error = "Nothing came through. Tap to talk and try again."; render(); } }, 4000));
    }
    function pause() { cancelled = true; rec = null; recSession = null; r.listening = false; render(); }
    try { open(); } catch (e) { r.listening = false; recSession = null; r.error = "The microphone didn’t start. Tap to talk again."; render(); }
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    if (e.target.closest("a")) return;
    var stEl = e.target.closest("#story.tap");
    if (stEl && !e.target.closest("button")) { var rc = stEl.getBoundingClientRect(); learnStep((e.clientX - rc.left) < rc.width * 0.3 ? -1 : 1); return; }
    var t = e.target.closest("button"); if (!t) return;
    if (t.dataset.card != null) { goLearn(+t.dataset.card); return; }
    if (t.dataset.part != null) { var p = +t.dataset.part; if (p === 0) goLearn(S.ph === 0 ? 0 : X().story.length - 1); else goPart(p); return; }
    if (t.dataset.lesson != null) { S.lesson = +t.dataset.lesson; S.d = null; S.res = null; S.sbEntered = false; if (!S.seenHow) { stopAll(); S.how = true; render(); return; } goLearn(0); return; }
    if (t.dataset.spot != null) { if (S.spot.pick != null) return; S.spot.pick = +t.dataset.spot; render(); return; }
    var r = S.d && S.d.r;
    switch (t.id) {
      case "stnext": learnStep(1); break;
      case "home": S.how = false; home(); break;
      case "howgo": S.how = false; S.seenHow = true; goLearn(0); break;
      case "knock": knock(); break;
      case "pp": if (S.play.paused) { var at = S.play.i; S.play.paused = false; render(); playScript(Math.max(0, at)); } else { stopAll(); S.play.paused = true; render(); } break;
      case "talk":
        if (!r) break;
        if (r.listening) { if (recSession) recSession.finish(); else if (r.text) said(r.text); }
        else if (r.text) said(r.text);
        else listen(r, said);
        break;
      case "again": if (r) { r.text = ""; listen(r, said); } break;
      case "typed": var ta = $("said"), txt = ta ? ta.value.trim() : ""; if (txt) said(txt); break;
      case "tohear": goPart(2); break;
      case "tomiss": goPart(3); break;
      case "tosecond": goPart(4); break;
      case "replayall": stopAll(); S.play = { i: -1, finished: false }; S.spot = { pick: null }; render(); playScript(); break;
      case "skipplay": stopAll(); S.play.finished = true; if (S.ph === 2) S.play.i = X().hearLines.length - 1; render(); break;
      case "finish": goPart(5); break;
      case "redo": goPart(4); break;
      case "srcs": S.sources = true; render(); $("body").scrollTop = 0; break;
      case "srcback": S.sources = false; render(); break;
      case "embback": stopAll(); try { window.parent.postMessage({ warmup: "issues-close" }, "*"); } catch (er) {} break;
    }
  });
