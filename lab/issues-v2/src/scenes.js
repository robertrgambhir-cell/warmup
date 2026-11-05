/* Warmup issue lessons v2: the shared scene library (every format uses these).
   cover · ask (a voter's question + a guess) · count · bars (evidence, with a clipping) · apply (new cases) ·
   sort (shown by evidence vs not shown) · compare (both candidates on the same rows, plus what the office can do). */
(function () {
  "use strict";
  var WU = (window.WU = window.WU || {}), S = WU.scene, esc = WU.esc;

  function opt(t, i) { return '<button class="opt" type="button" data-i="' + i + '" aria-pressed="false"><span class="dot" aria-hidden="true"></span><span>' + t + "</span></button>"; }
  function doLine(t) { return '<p class="do">' + WU.icon.hand + "<span>" + t + "</span></p>"; }
  WU.doLine = doLine;
  WU.opt = opt;

  /* ---------- cover: what you'll be able to do, the real race, the two parts ---------- */
  S.cover = {
    html: function (sc) {
      var g = sc.goals.map(function (x) { return '<div class="goal"><span class="ic">' + x.icon + "</span><p>" + x.t + "</p></div>"; }).join("");
      return '<div class="race">' + WU.icon.capitol.replace("<svg", '<svg width="16" height="16"') + "<b>" + esc(sc.race) + "</b><span>" + esc(sc.when) + "</span></div>" +
        "<h1>" + sc.h + '</h1><div class="goals">' + g + "</div>" +
        '<div class="parts"><span class="l">' + WU.icon.book + "Learn <small>about " + sc.times[0] + ' min</small></span><span class="d">' + WU.icon.door + "At the door <small>about " + sc.times[1] + " min</small></span></div>" +
        '<p class="fine">' + sc.fine + "</p>";
    }
  };

  /* ---------- ask: a voter's real question, then the learner commits to a guess (it's answered on a later screen) ---------- */
  S.ask = {
    html: function (sc) {
      return '<div class="doorpic">' + WU.art.door(sc.voter, sc.who) + "</div>" +
        '<div><p class="quote">' + esc(sc.quote) + '</p><p class="who" style="margin-top:6px">' + esc(sc.who) + "</p></div>" +
        "<h2>" + sc.q + '</h2><div class="opts">' + sc.opts.map(opt).join("") + '</div><div id="after"></div>';
    },
    mount: function (sc, ctx) {
      ctx.lock("Make a guess to keep going");
      var prev = ctx.st[sc.key];
      ctx.body.querySelectorAll(".opt").forEach(function (b) {
        b.onclick = function () {
          ctx.body.querySelectorAll(".opt").forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
          b.setAttribute("aria-pressed", "true");
          ctx.st[sc.key] = +b.getAttribute("data-i");
          document.getElementById("after").innerHTML = '<p class="say info">' + sc.after + "</p>";
          ctx.ready();
        };
        if (prev === +b.getAttribute("data-i")) b.click();
      });
    }
  };

  /* ---------- count: one big number, one familiar comparison, drawn to scale ---------- */
  function person(c) { return '<svg viewBox="0 0 20 34" aria-hidden="true"><circle cx="10" cy="7" r="5.5" fill="' + c + '"/><path d="M2.5 33 V20 Q2.5 14 10 14 Q17.5 14 17.5 20 V33 Z" fill="' + c + '"/></svg>'; }
  S.count = {
    html: function (sc) {
      function row(n, c) { var o = ""; for (var i = 0; i < n; i++) o += person(c); return '<div class="ppl">' + o + "</div>"; }
      return "<h2>" + sc.h + '</h2><div class="pic"><div class="count" role="img" aria-label="' + esc(sc.alt) + '">' +
        '<div class="lab"><b class="r">' + sc.a.big + "</b><span>" + sc.a.lab + "</span></div>" + row(sc.a.n, "#b3261e") +
        '<div class="lab"><b>' + sc.b.big + "</b><span>" + sc.b.lab + "</span></div>" + row(sc.b.n, "#a7adb5") +
        '<p class="small" style="margin:0">' + sc.unit + "</p></div></div><p>" + sc.p + "</p>";
    }
  };

  /* ---------- bars: evidence drawn to scale, with an optional newspaper clipping ---------- */
  S.bars = {
    html: function (sc) {
      var max = Math.max.apply(null, sc.bars.map(function (b) { return b.v; }));
      var bars = sc.bars.map(function (b) {
        var w = Math.max(2, (b.v / max) * 100);
        var fill = b.dash ? "border:2px dashed #a7a29a;background:transparent" : "background:" + b.c;
        return '<div class="hb"><span>' + b.lab + '</span><div class="t"><i style="width:' + w + "%;" + fill + '"></i></div><b style="color:' + (b.dash ? "var(--ink)" : b.c) + '">' + b.txt + "</b></div>";
      }).join("");
      var clip = sc.clip ? '<div class="clip" role="img" aria-label="Headline from ' + esc(sc.clip.o) + ": " + esc(sc.clip.h) + '"><span class="o">' + sc.clip.o + '</span><span class="h">' + sc.clip.h + '</span><span class="d">' + sc.clip.d + "</span></div>" : "";
      return "<h2>" + sc.h + "</h2>" + (sc.clipFirst ? clip : "") + '<div class="pic"><div class="hbars" role="img" aria-label="' + esc(sc.alt) + '">' + bars + "</div></div>" + (sc.clipFirst ? "" : clip) + (sc.p ? "<p>" + sc.p + "</p>" : "") + (sc.q ? '<h2 style="font-size:calc(18px * var(--k))">' + sc.q.t + '</h2><div class="opts">' + sc.q.opts.map(function (o, i) { return opt(o.t, i); }).join("") + '</div><div id="qa"></div>' : "");
    },
    mount: function (sc, ctx) { if (sc.q) checkOne(sc.q, ctx, ctx.body); }
  };

  /* one multiple-choice question that must end on the right answer; wrong picks explain and stay open */
  function checkOne(q, ctx, scope, done) {
    if (!done) ctx.lock(q.lock || "Answer to keep going");
    var first = true, out = scope.querySelector("#qa");
    scope.querySelectorAll(".opt").forEach(function (b) {
      b.onclick = function () {
        var o = q.opts[+b.getAttribute("data-i")];
        b.classList.add(o.ok ? "right" : "wrong");
        out.innerHTML = '<p class="say ' + (o.ok ? "good" : "bad") + '"><b>' + (o.ok ? (first ? "Right. " : "That's it. ") : "Not quite. ") + "</b>" + o.why + "</p>";
        if (o.ok) { scope.querySelectorAll(".opt").forEach(function (x) { x.disabled = true; }); if (done) done(first); else ctx.ready(); }
        first = false; WU.fit();
      };
    });
  }
  WU.checkOne = checkOne;

  /* ---------- apply: the same idea on new cases, one at a time ---------- */
  S.apply = {
    html: function (sc) {
      return "<h2>" + sc.h + "</h2>" + (sc.p ? "<p>" + sc.p + "</p>" : "") + '<div id="case"></div>';
    },
    mount: function (sc, ctx) {
      var k = 0, rightFirst = 0, box = document.getElementById("case");
      ctx.lock("Answer all " + sc.cases.length + " to keep going");
      function one() {
        var c = sc.cases[k];
        box.innerHTML = '<p class="kick" style="margin-bottom:6px">' + (k + 1) + " of " + sc.cases.length + "</p>" + (c.pic ? '<div class="pic plain" style="margin-bottom:8px">' + c.pic(ctx) + "</div>" : "") +
          '<h2 style="font-size:calc(18.5px * var(--k));margin-bottom:10px">' + c.q + '</h2><div class="opts">' + c.opts.map(function (o, i) { return opt(o.t, i); }).join("") + '</div><div id="qa" style="margin-top:8px"></div><div id="more" style="margin-top:8px"></div>';
        checkOne(c, ctx, box, function (first) {
          if (first) rightFirst++;
          if (c.after) c.after(box, ctx);
          if (k < sc.cases.length - 1) {
            document.getElementById("more").innerHTML = '<button class="ghost" type="button" id="nx">Next case</button>';
            document.getElementById("nx").onclick = function () { k++; one(); };
          } else { ctx.st[sc.key] = rightFirst; ctx.ready(); }
          WU.fit();
        });
        WU.fit();
      }
      one();
    }
  };

  /* ---------- sort: shown by evidence, or not shown? (calibrating claims, used by every format) ---------- */
  S.sort = {
    html: function (sc) {
      return "<h2>" + sc.h + "</h2>" + (sc.p ? '<p class="small">' + sc.p + "</p>" : "") + '<div class="sort">' + sc.items.map(function (it, i) {
        return '<div class="sitem" data-i="' + i + '"><p>' + it.t + '</p><div class="pick" role="group" aria-label="Is this shown by evidence?"><button type="button" class="k" data-a="k" aria-pressed="false">' + sc.labels[0] + '</button><button type="button" class="n" data-a="n" aria-pressed="false">' + sc.labels[1] + '</button></div><div class="why" hidden></div></div>';
      }).join("") + "</div>";
    },
    mount: function (sc, ctx) {
      var got = {};
      ctx.lock("Sort all " + sc.items.length + " to keep going");
      ctx.body.querySelectorAll(".sitem").forEach(function (el) {
        var it = sc.items[+el.getAttribute("data-i")];
        el.querySelectorAll(".pick button").forEach(function (b) {
          b.onclick = function () {
            var a = b.getAttribute("data-a"), ok = a === it.a;
            el.querySelectorAll(".pick button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
            el.classList.toggle("ok", ok); el.classList.toggle("no", !ok);
            var w = el.querySelector(".why"); w.hidden = false; w.innerHTML = "<b>" + (ok ? "Right. " : "Look again. ") + "</b>" + it.why;
            if (ok) { got[el.getAttribute("data-i")] = true; el.querySelector(".pick").outerHTML = '<span class="chosen ' + a + '">' + WU.icon.check.replace("<svg", '<svg width="13" height="13"') + (a === "k" ? sc.labels[0] : sc.labels[1]) + "</span>"; }
            if (Object.keys(got).length === sc.items.length) ctx.ready();
            WU.fit();
          };
        });
      });
    }
  };

  /* ---------- compare: the same rows for both candidates, then what the office can and can't do ---------- */
  S.compare = {
    html: function (sc) {
      var c = sc.cands;
      var head = c.map(function (x) { return '<div class="hd"><span class="av ' + x.side + '" aria-hidden="true">' + x.ini + "</span><span><b>" + esc(x.name) + "</b><small>" + esc(x.role) + "</small></span></div>"; }).join("");
      var rows = sc.rows.map(function (r) { return '<div class="rl">' + r.l + '</div><div class="cell">' + r.d + '</div><div class="cell">' + r.r + "</div>"; }).join("");
      return "<h2>" + sc.h + '</h2><div class="cmp" role="table" aria-label="Where the two candidates stand, row by row">' + head + rows + "</div>" +
        (sc.office ? '<div class="office">' + WU.icon.capitol + "<span>" + sc.office + "</span></div>" : "") + (sc.p ? '<p class="small">' + sc.p + "</p>" : "");
    }
  };
})();
