/* Warmup issue lessons v2: feedback on a spoken (or typed) answer.
   Two honest modes, always labeled on screen:
   - "AI feedback": Claude reads the answer against the lesson's rubric and approved facts (only where the page can
     reach Claude: the claude.ai artifact's `sample` capability, or a future server endpoint, WU.coach.endpoint).
   - "Quick check": phrase matching, no AI. It looks for key phrases, so it can miss a good answer or be fooled.
   Either way a point is credited only when the learner's own words show it: the result quotes those words, and an
   AI credit whose quote isn't in the answer is dropped. */
(function () {
  "use strict";
  var WU = (window.WU = window.WU || {});
  function norm(s) { return String(s || "").toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim(); }
  function sentences(t) { return String(t || "").replace(/([.!?])\s+/g, "$1\n").split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean); }
  /* the sentence (or, for one long run-on transcript, the 14 words) around a match */
  function around(t, re) {
    var ss = sentences(t);
    for (var i = 0; i < ss.length; i++) if (re.test(ss[i]) && ss[i].split(" ").length <= 20) return ss[i];
    var m = re.exec(t); if (!m) return "";
    var words = t.split(/\s+/), pos = t.slice(0, m.index).split(/\s+/).length - 1, a = Math.max(0, pos - 5), b = Math.min(words.length, pos + 8);
    return (a > 0 ? "\u2026" : "") + words.slice(a, b).join(" ") + (b < words.length ? "\u2026" : "");
  }
  /* the evidence shown is the shortest sentence that matches every pattern, so the quote really shows the point */
  function evidence(text, all) {
    var ss = sentences(text).filter(function (x) { return all.every(function (r) { return r.test(x); }); }).sort(function (a, b) { return a.length - b.length; });
    if (ss.length && ss[0].split(" ").length <= 30) return ss[0];
    return around(text, all[0]);
  }
  function rx(s) { return s instanceof RegExp ? s : new RegExp(s, "i"); }

  function quick(rubric, text) {
    var items = rubric.items.map(function (it) {
      var all = (it.all || []).map(rx), hit = all.every(function (r) { return r.test(text); });
      return { id: it.id, label: it.label, tip: it.tip, met: hit, quote: hit ? evidence(text, all) : "" };
    });
    var flags = (rubric.flags || []).filter(function (f) { return rx(f.re).test(text); }).map(function (f) { return { quote: around(text, rx(f.re)), why: f.why }; });
    return { mode: "quick", items: items, flags: flags };
  }

  function prompt(rubric, text, L) {
    return [
      "You are Warmup's practice coach for canvassers. A canvasser just answered a voter out loud (speech-to-text, so ignore spelling and missing punctuation).",
      "Judge ONLY what the canvasser actually said. Never credit a point they didn't make, even partly. Be strict about facts and generous about wording.",
      "",
      "The voter asked: " + rubric.ask,
      "",
      "Approved facts for this lesson (anything that contradicts these is a misstatement; a claim not covered here is unsupported, not wrong):",
      rubric.facts.map(function (f) { return "- " + f; }).join("\n"),
      "",
      "Rubric points:",
      rubric.items.map(function (it) { return "- id \"" + it.id + "\": " + it.ai; }).join("\n"),
      "",
      "Watch for these misstatements:",
      (rubric.flags || []).map(function (f) { return "- " + f.why; }).join("\n") || "- (none listed)",
      "",
      "The canvasser said:",
      "\"\"\"" + text + "\"\"\"",
      "",
      "Return only JSON with this shape:",
      '{"items":[{"id":"...","met":true|false,"quote":"the canvasser\'s exact words that show it, copied character for character, or empty"}],',
      ' "flags":[{"quote":"exact words","why":"one plain sentence on what is inaccurate or unfair"}],',
      ' "strength":"one sentence naming something specific they did well, quoting a few of their words",',
      ' "next":"one sentence: the single most useful thing to add or fix next time, in words they could say"}',
      "Write like a friendly field organizer: plain words, complete sentences, no em dashes."
    ].join("\n");
  }

  /* resolve the AI channel once: the artifact runtime's sample capability, or a server endpoint */
  var aiP = null;
  function ai() {
    if (aiP) return aiP;
    aiP = new Promise(function (res) {
      if (WU.coach.endpoint) return res({ kind: "endpoint" });
      if (!window.claude || !window.claude.use) return res(null);
      var done = false, t = setTimeout(function () { if (!done) { done = true; res(null); } }, 6000);
      window.claude.use("sample").then(function (s) { if (!done) { done = true; clearTimeout(t); res(s ? { kind: "sample", s: s } : null); } }, function () { if (!done) { done = true; clearTimeout(t); res(null); } });
    });
    return aiP;
  }

  function validate(rubric, text, out) {
    var T = norm(text);
    var items = rubric.items.map(function (it) {
      var got = (out.items || []).filter(function (x) { return x && x.id === it.id; })[0] || {};
      var q = String(got.quote || "").trim(), ok = !!got.met && q.length >= 4 && T.indexOf(norm(q).replace(/[….]+$/, "")) >= 0;
      return { id: it.id, label: it.label, tip: it.tip, met: ok, quote: ok ? q : "", dropped: !!got.met && !ok };
    });
    var flags = (out.flags || []).filter(function (f) { return f && f.quote && T.indexOf(norm(f.quote)) >= 0; }).map(function (f) { return { quote: f.quote, why: String(f.why || "") }; });
    return { mode: "ai", items: items, flags: flags, strength: String(out.strength || ""), next: String(out.next || "") };
  }

  WU.coach = {
    endpoint: null,
    available: function () { return ai().then(function (a) { return !!a; }); },
    grade: function (rubric, text, L) {
      var base = quick(rubric, text);
      return ai().then(function (a) {
        if (!a || !text || text.split(/\s+/).length < 4) return finish(base);
        var p = prompt(rubric, text, L), call;
        if (a.kind === "sample") call = a.s.json(p, { modelTier: "default" });
        else call = fetch(WU.coach.endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ prompt: p }) }).then(function (r) { if (!r.ok) throw new Error("coach " + r.status); return r.json(); });
        var timeout = new Promise(function (_, rej) { setTimeout(function () { rej(new Error("timeout")); }, 25000); });
        return Promise.race([call, timeout]).then(function (out) { return finish(validate(rubric, text, out || {})); }, function (e) { var r = finish(base); r.fellBack = String(e && (e.code || e.message) || e); return r; });
      });
      function finish(r) {
        var met = r.items.filter(function (x) { return x.met; }), miss = r.items.filter(function (x) { return !x.met; });
        if (!r.strength) r.strength = met.length ? "You " + met[0].label.charAt(0).toLowerCase() + met[0].label.slice(1).replace(/\.$/, "") + "." : "";
        if (!r.next) r.next = miss.length ? miss[0].tip : (r.flags.length ? "Fix the line marked \u201CCheck this\u201D and you\u2019ve got it." : "");
        r.score = met.length; r.of = r.items.length; r.text = text;
        return r;
      }
    },
    quick: quick
  };
})();
