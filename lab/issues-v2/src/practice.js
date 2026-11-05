/* Warmup issue lessons v2: At the door.
   1st try (the voter from Learn) → feedback on what you actually said → hear a strong answer → catch the mistake →
   2nd try at a NEW door with a different situation (transfer, not repetition) → feedback and growth → done.
   Speech uses the browser's own recognition where it's allowed; typing always works. */
(function () {
  "use strict";
  var WU = (window.WU = window.WU || {}), S = WU.scene, esc = WU.esc;

  /* ---------- the voter's voice (the browser's built-in voice; a stand-in until recorded voices) ---------- */
  WU.speak = {
    ok: !!(window.speechSynthesis && window.SpeechSynthesisUtterance),
    stop: function () { try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {} WU.art && WU.art.talk && WU.art.talk(false); },
    say: function (text, who, cb) {
      if (!WU.speak.ok || WU.fast) { if (cb) setTimeout(cb, 10); return; }
      try {
        var u = new SpeechSynthesisUtterance(text), vs = speechSynthesis.getVoices().filter(function (v) { return /^en(-|_)US/i.test(v.lang); });
        var want = who === "m" ? /(Aaron|Fred|Alex|Daniel|Guy|Male|David|Mark)/i : /(Samantha|Ava|Allison|Susan|Female|Zira|Jenny|Aria|Karen)/i;
        var pick = vs.filter(function (v) { return want.test(v.name); })[0] || vs[0]; if (pick) u.voice = pick;
        u.rate = 1.02; u.onstart = function () { WU.art.talk(true); }; u.onend = u.onerror = function () { WU.art.talk(false); if (cb) cb(); };
        speechSynthesis.speak(u);
      } catch (e) { if (cb) cb(); }
    }
  };

  /* ---------- listening ---------- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  WU.listen = { can: !!SR, blocked: false };

  function mineOf(ctx, n) { return (ctx.st["said" + n] || ""); }

  S.door = {
    html: function (sc, ctx) {
      var typed = !WU.listen.can || WU.listen.blocked || ctx.st.typeMode;
      return '<div class="doorpic">' + WU.art.door(sc.voter, sc.who) + "</div>" +
        '<p class="small" style="margin:0">' + sc.intro + "</p>" +
        '<div class="thread grow" id="thread"><div class="bub v"><small>' + esc(sc.name) + "</small>" + esc(sc.ask) + "</div>" +
        '<button class="linkish" type="button" id="replay" style="align-self:flex-start">' + (WU.speak.ok ? "Hear " + esc(sc.name) + " again" : "") + "</button></div>" +
        '<div class="speak" id="speak">' + (typed ? typeBox(sc, ctx) : micBox()) + "</div>" +
        '<div class="row2"><button class="linkish" type="button" id="swap">' + (typed ? (WU.listen.can && !WU.listen.blocked ? "Speak instead" : "") : "Type instead") + '</button><button class="linkish" type="button" id="ex">Use an example answer</button></div>';
    },
    mount: function (sc, ctx) {
      var n = sc.attempt, key = "said" + n, final = "", rec = null, on = false;
      ctx.lock("Answer " + sc.name + " to keep going");
      var replay = document.getElementById("replay");
      if (replay && WU.speak.ok) replay.onclick = function () { WU.speak.say(sc.ask, sc.voice); };
      if (!ctx.st["heard" + n]) { ctx.st["heard" + n] = true; setTimeout(function () { WU.speak.say(sc.ask, sc.voice); }, 350); }
      document.getElementById("swap").onclick = function () { ctx.st.typeMode = !ctx.st.typeMode; stop(); WU.jump("door", WU.app.i); };
      document.getElementById("ex").onclick = function () {
        stop(); ctx.st[key] = sc.example; ctx.st["example" + n] = true;
        addMine(sc.example, true); ctx.ready("See how this answer did");
      };
      function addMine(t, ex) {
        var th = document.getElementById("thread"), old = th.querySelector(".bub.me"); if (old) old.remove();
        var d = document.createElement("div"); d.className = "bub me"; d.innerHTML = "<small>" + (ex ? "Example answer, not yours" : "You") + "</small>" + esc(t);
        th.appendChild(d); th.scrollTop = th.scrollHeight; WU.fit();
      }
      if (ctx.st[key]) { addMine(ctx.st[key], ctx.st["example" + n]); ctx.ready("See how you did"); }
      var box = document.getElementById("speak");
      var ta = box.querySelector("textarea");
      if (ta) {
        ta.oninput = function () { if (ta.value.trim().split(/\s+/).length >= 3) ctx.ready("Submit and see how you did"); else ctx.lock("Type your answer to keep going"); };
        ctx.onNext(function () { var t = ta.value.trim(); if (t) { ctx.st[key] = t; ctx.st["example" + n] = false; } WU.next(); });
        if (ctx.st[key] && !ctx.st["example" + n]) ta.value = ctx.st[key];
        return;
      }
      var mbtn = box.querySelector("button.m"), live = box.querySelector(".live");
      function start() {
        WU.speak.stop();
        try {
          rec = new SR(); rec.lang = "en-US"; rec.continuous = true; rec.interimResults = true;
        } catch (e) { return toType("Speech isn't available in this browser. Type your answer instead."); }
        final = ""; on = true; mbtn.classList.add("on"); mbtn.innerHTML = WU.icon.stop; mbtn.setAttribute("aria-label", "Stop and submit"); live.textContent = "Listening… tap the button when you're done.";
        rec.onresult = function (e) {
          var interim = ""; final = "";
          for (var i = 0; i < e.results.length; i++) { var r = e.results[i]; if (r.isFinal || i < e.results.length - 1) final += r[0].transcript + " "; else interim += r[0].transcript; }
          if (e.results.length && e.results[e.results.length - 1].isFinal) { final = ""; for (var j = 0; j < e.results.length; j++) final += e.results[j][0].transcript + " "; interim = ""; }
          live.textContent = (final + interim).trim() || "Listening…";
        };
        rec.onerror = function (e) {
          if (e.error === "not-allowed" || e.error === "service-not-allowed" || e.error === "audio-capture") { WU.listen.blocked = true; toType("The microphone isn't available here. Type your answer instead; it's graded the same way."); }
          else if (e.error === "no-speech") { live.textContent = "I didn't catch anything. Tap the mic and try again."; reset(); }
        };
        rec.onend = function () { if (on) finish(); };
        try { rec.start(); } catch (e2) { toType("Speech didn't start. Type your answer instead."); }
      }
      function reset() { on = false; mbtn.classList.remove("on"); mbtn.innerHTML = WU.icon.mic; mbtn.setAttribute("aria-label", "Tap to talk"); }
      function stop() { if (rec && on) { on = false; try { rec.stop(); } catch (e) {} } }
      function finish() {
        reset();
        var t = (final || live.textContent || "").replace(/^Listening.*$/, "").trim();
        if (t.split(/\s+/).length < 3) { live.textContent = "That was very short. Tap the mic and answer " + sc.name + " in a few sentences."; return; }
        ctx.st[key] = t; ctx.st["example" + n] = false; live.textContent = "Got it. Tap the mic to redo it.";
        addMine(t); ctx.ready("See how you did");
      }
      function toType(msg) { stop(); ctx.st.typeMode = true; WU.jump("door", WU.app.i); setTimeout(function () { var p = document.getElementById("speak"); if (p) p.insertAdjacentHTML("afterbegin", '<p class="say info">' + msg + "</p>"); WU.fit(); }, 0); }
      mbtn.onclick = function () { if (on) { on = false; try { rec.stop(); } catch (e) {} setTimeout(finish, 350); } else start(); };
    }
  };
  function micBox() { return '<div class="mic"><button class="m" type="button" aria-label="Tap to talk">' + WU.icon.mic + '</button><span class="live">Tap the mic and answer out loud, about 30 seconds.</span></div>'; }
  function typeBox(sc, ctx) { return '<label class="sr" for="ta">Your answer to ' + esc(sc.name) + '</label><textarea class="typebox" id="ta" placeholder="Type what you’d say to ' + esc(sc.name) + '…"></textarea>'; }

  /* ---------- feedback on what was actually said ---------- */
  function resultHTML(r, sc) {
    var mode = r.mode === "ai" ? '<span class="mode ai">AI feedback · Claude</span>' : '<span class="mode qc">Quick check · phrase matching, not AI</span>';
    var items = r.items.map(function (it) {
      return '<div class="ri ' + (it.met ? "ok" : "no") + '"><span class="m">' + (it.met ? WU.icon.check : WU.icon.dash) + "</span><span><b>" + esc(it.label) + "</b>" +
        (it.met ? "<span>You said: <q>" + esc(it.quote) + "</q></span>" : "<span>" + (it.cancelled ? "Not credited: another line in your answer contradicts it." : it.dropped ? "Not credited: the coach\u2019s quote wasn\u2019t in your answer." : "Not heard yet.") + "</span>") + "</span></div>";
    }).join("");
    var flags = r.flags.map(function (f) { return '<div class="ri flag"><span class="m">' + WU.icon.bang + "</span><span><b>Check this</b><span><q>" + esc(f.quote) + "</q> " + esc(f.why) + "</span></span></div>"; }).join("");
    return '<div class="row2">' + mode + '<span class="small" style="font:700 13px var(--sans);color:var(--muted)">' + r.score + " of " + r.of + "</span></div>" +
      '<div class="res">' + items + flags + "</div>" +
      (r.strength ? '<p class="say good"><b>What worked:</b> ' + esc(r.strength) + "</p>" : "") +
      (r.next ? '<p class="say info"><b>Next time:</b> ' + esc(r.next) + "</p>" : '<p class="say info"><b>Keep it:</b> Say it this way at a real door.</p>') +
      (r.mode === "quick" ? '<p class="fine">Quick check looks for key phrases, so it can miss a good answer said another way.' + (r.fellBack ? " The AI coach didn\u2019t answer this time." : "") + "</p>" : "");
  }
  S.result = {
    html: function (sc, ctx) { return "<h2 id=\"rh\">Checking your answer…</h2><div id=\"rbody\"><p class=\"small\">Reading what you said against the lesson's key points.</p></div>"; },
    mount: function (sc, ctx) {
      var n = sc.attempt, text = ctx.st["said" + n] || "", door = ctx.L.door.filter(function (d) { return d.type === "door" && d.attempt === n; })[0];
      ctx.lock("Checking…");
      var cached = ctx.st["grade" + n];
      var p = cached && cached.text === text ? Promise.resolve(cached) : WU.coach.grade(door.rubric, text, ctx.L);
      p.then(function (r) {
        ctx.st["grade" + n] = r;
        var all = r.score === r.of && !r.flags.length;
        document.getElementById("rh").textContent = all ? sc.allH : (r.score ? "You got " + r.score + " of " + r.of + (r.flags.length ? ", with one line to fix" : "") : "Not yet. Here’s what to add");
        document.getElementById("rbody").innerHTML = (ctx.st["example" + n] ? '<p class="say info">This is the example answer, not yours. Go back and answer it yourself for real feedback.</p>' : "") + resultHTML(r, sc) +
          '<button class="linkish" type="button" id="again">Try ' + esc(door.name) + "’s door again</button>";
        document.getElementById("again").onclick = function () { ctx.st["said" + n] = ""; ctx.st["grade" + n] = null; WU.jump("door", WU.app.i - 1); };
        ctx.ready(sc.btn); WU.fit();
      });
    }
  };

  /* ---------- hear a strong answer, with each key point marked ---------- */
  S.hear = {
    html: function (sc) {
      return "<h2>" + sc.h + '</h2><div class="bub v" style="max-width:100%"><small>' + esc(sc.name) + "</small>" + esc(WU.app.lesson.door[0].ask) + '</div><div class="thread grow" id="thread">' + sc.lines.map(function (l) {
        return '<div class="bub ' + (l.who === "v" ? "v" : "c") + '"><small>' + esc(l.who === "v" ? sc.name : "Canvasser") + "</small>" + l.t + "</div>";
      }).join("") + '</div><div class="row2"><button class="ghost" type="button" id="play">' + (WU.speak.ok ? "Play it out loud" : "") + '</button><span class="small" style="font:600 12.5px var(--sans);color:var(--muted)">Green numbers mark the key points.</span></div>';
    },
    mount: function (sc) {
      var b = document.getElementById("play"); if (!WU.speak.ok) { b.hidden = true; return; }
      b.onclick = function () {
        var i = 0, L = sc.lines; WU.speak.stop();
        (function step() { if (i >= L.length) return; var l = L[i++]; WU.speak.say(l.t.replace(/<[^>]+>/g, ""), l.who === "v" ? sc.voice : (sc.voice === "m" ? "f" : "m"), step); })();
      };
    }
  };

  /* ---------- catch the mistake: one clean, flat misstatement ---------- */
  S["catch"] = {
    html: function (sc) {
      return "<h2>" + sc.h + '</h2><div class="bub v" style="max-width:100%"><small>' + esc(sc.name) + "</small>" + esc(sc.ask) + '</div><div class="miss">' + sc.lines.map(function (l, i) { return '<button type="button" data-i="' + i + '">' + esc(l) + "</button>"; }).join("") + '</div><div id="cout"></div>';
    },
    mount: function (sc, ctx) {
      ctx.lock("Tap the wrong sentence to keep going");
      ctx.body.querySelectorAll(".miss button").forEach(function (b) {
        b.onclick = function () {
          var i = +b.getAttribute("data-i"), ok = i === sc.wrong;
          if (ok) { b.classList.add("wrong"); ctx.body.querySelectorAll(".miss button").forEach(function (x) { x.disabled = true; }); }
          else b.classList.add("picked-ok");
          document.getElementById("cout").innerHTML = '<p class="say ' + (ok ? "good" : "bad") + '"><b>' + (ok ? "You caught it. " : "That one's accurate. ") + "</b>" + (ok ? sc.why : sc.notIt) + "</p>";
          if (ok) ctx.ready(); WU.fit();
        };
      });
    }
  };

  /* ---------- done: growth, what you can now do, sources with links, where the content came from ---------- */
  S.done = {
    html: function (sc, ctx) {
      var g1 = ctx.st.grade1, g2 = ctx.st.grade2, L = ctx.L;
      var row = function (lab, g) { return '<span>' + lab + "</span><span>" + (g ? g.score + " of " + g.of : "–") + "</span><span>" + (g ? (g.mode === "ai" ? "AI" : "Quick check") : "") + "</span>"; };
      var demo = sc.can.map(function (c) {
        var test = function (f) { var g = ctx.st["grade" + f[0]]; return !!g && !ctx.st["example" + f[0]] && g.items.some(function (it) { return it.id === f[1] && it.met; }); };
        var shown = c.any ? c.from.some(test) : c.from.every(test);
        return '<div class="ri ' + (shown ? "ok" : "no") + '"><span class="m">' + (shown ? WU.icon.check : WU.icon.dash) + "</span><span><b>" + c.t + "</b><span>" + (shown ? "You showed this at the door." : "Not shown yet at the door. " + c.tip) + "</span></span></div>";
      }).join("");
      var src = L.sources.map(function (s, i) { return '<li value="' + (i + 1) + '"><a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t) + "</a></li>"; }).join("");
      var nShown = sc.can.filter(function (c) { var t = function (f) { var g = ctx.st["grade" + f[0]]; return !!g && !ctx.st["example" + f[0]] && g.items.some(function (it) { return it.id === f[1] && it.met; }); }; return c.any ? c.from.some(t) : c.from.every(t); }).length;
      var all = nShown === sc.can.length;
      return '<div class="big-ok">' + (all ? '<span class="ring">' + WU.icon.check + "</span>" : "") + "<h2>" + (all ? sc.h : "Lesson done. You showed " + nShown + " of " + sc.can.length + " at the door") + "</h2></div>" +
        '<div class="growth"><span class="h">Your two doors</span><span class="h">Key points</span><span class="h">Graded by</span>' + row("1st: " + sc.d1, g1) + row("2nd: " + sc.d2 + " (new situation)", g2) + "</div>" +
        '<div class="res">' + demo + "</div>" +
        '<p class="say info"><b>Tomorrow\u2019s first question:</b> ' + sc.tomorrow + "</p>" +
        '<details><summary style="font:800 14px var(--sans);cursor:pointer">Where this lesson came from</summary><p class="small" style="margin-top:6px">' + sc.origin + '</p><ol class="small" style="padding-left:20px;display:flex;flex-direction:column;gap:6px;margin:8px 0 0">' + src + "</ol></details>";
    },
    mount: function (sc, ctx) { ctx.ready(sc.btn || "Back to lessons"); ctx.onNext(function () { WU.go("home"); }); var d = ctx.body.querySelector("details"); if (d) d.addEventListener("toggle", WU.fit); }
  };
})();
