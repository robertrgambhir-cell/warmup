  /* ---------- the door, drawn exactly as the warm-up lesson draws it (figure and homeScene copied from the warm-up app), with this section's own voters ---------- */
  var svgSeq = 0;
  var MOUTH = {
    neutral: "M152 165 Q160 167.5 168 165", smile: "M150 162 Q160 172.5 170 162",
    open: "M151.5 162.5 Q160 176 168.5 162.5 Q160 165.5 151.5 162.5 Z", mid: "M153.5 163.5 Q160 170.5 166.5 163.5 Q160 165.5 153.5 163.5 Z"
  };
  var FILLED = { open: true, mid: true };
  /* five voters who never appear in the warm-up lessons, one per issue lesson */
  var LOOKS2 = {
    tasha:  { skin: "#6B4230", shade: "#53311F", style: "long",  hair: "#15100E", shirt: "#C2703E", shirtShade: "#A35A2E", badge: true },
    hector: { skin: "#B9825A", shade: "#9A6844", style: "short", hair: "#5E5550", shirt: "#6E7F3C", shirtShade: "#5A6831", beard: true },
    barb:   { skin: "#F0CFB4", shade: "#D4AE92", style: "bob",   hair: "#DAD5CE", shirt: "#9A5B7D", shirtShade: "#7D4862", glasses: true },
    dale:   { skin: "#E6B994", shade: "#C8987A", style: "short", hair: "#8A5634", shirt: "#8A3F2F", shirtShade: "#6E3125", beard: true, flannel: true },
    samira: { skin: "#C99A72", shade: "#AB7E58", style: "wrap",  hair: "#5B6F8F", shirt: "#2F5F8F", shirtShade: "#264D74" }
  };
  var HOME2 = {
    tasha:  { kind: "house", wall: "#EADCC8", texture: "boards", line: "#DCCBB3", door: "#7A3E5C", frame: "#FFFDF6", window: true, num: "411", extra: "plant" },
    hector: { kind: "house", wall: "#EBD6B4", door: "#5B3A24", frame: "#F8EEDC", glass: true, window: true, num: "2930", extra: "plant" },
    barb:   { kind: "house", wall: "#D3DEE6", texture: "boards", line: "#C2CFD9", door: "#B04A3A", frame: "#F8FAFA", glass: true, window: true, num: "86", extra: "plant" },
    dale:   { kind: "house", wall: "#D8C7AA", texture: "boards", line: "#C7B493", door: "#2F4F3F", frame: "#F5EEE0", window: true, num: "1207", extra: "wood" },
    samira: { kind: "apt", wall: "#E4DFEE", floor: "#CBC2DB", door: "#3F5E7A", frame: "#6C6580", num: "4C", extra: "plant" }
  };
  function figure(p) {
    var back = {
      bob: '<path d="M128 152 C124 114 142 104 160 104 C178 104 196 114 192 152 C193 166 195 177 197 185 C187 188 182 178 182 166 L138 166 C138 178 133 188 123 185 C125 177 127 166 128 152 Z" fill="' + p.hair + '"/>',
      long: '<path d="M126 150 C122 110 142 100 160 100 C178 100 198 110 194 150 L199 216 C189 217 184 198 182 172 L138 172 C136 198 131 217 121 216 Z" fill="' + p.hair + '"/>',
      wrap: '<path d="M124 150 C120 108 142 98 160 98 C178 98 200 108 196 150 C198 172 204 190 212 204 C190 214 130 214 108 204 C116 190 122 172 124 150 Z" fill="' + p.hair + '"/>'
    }[p.style] || "";
    var capBob = '<path d="M133.5 135 C134 115 147 108 160 108 C174 108 187 116 186.5 136 C181 125 171 120 160 120 C150 120 140 125 133.5 135 Z" fill="' + p.hair + '"/>';
    var front = {
      bob: capBob, long: capBob,
      short: '<path d="M134 134 C134 114 147 108 160 108 C173 108 186 114 186 134 C181 123 171 118.5 160 118.5 C149 118.5 139 123 134 134 Z" fill="' + p.hair + '"/>',
      wrap: '<path fill-rule="evenodd" d="M128 141 A32 36 0 1 1 192 141 A32 36 0 1 1 128 141 Z M137 145 A23 27 0 1 0 183 145 A23 27 0 1 0 137 145 Z" fill="' + p.hair + '"/><path d="M134 163 C140 182 151 190 160 190 C169 190 180 182 186 163 C194 182 203 194 210 206 C186 216 134 216 110 206 C117 194 126 182 134 163 Z" fill="' + p.hair + '"/>'
    }[p.style] || "";
    var beard = p.beard ? '<path d="M136.5 148 C137.5 167 148 177.5 160 177.5 C172 177.5 182.5 167 183.5 148 C178.5 158 170.5 162.5 160 162.5 C149.5 162.5 141.5 158 136.5 148 Z" fill="' + p.hair + '"/>' : "";
    var ears = p.style === "wrap" ? "" : '<ellipse cx="134" cy="143" rx="4.6" ry="7" fill="' + p.shade + '"/><ellipse cx="186" cy="143" rx="4.6" ry="7" fill="' + p.shade + '"/>';
    return '<g class="fig">' + back +
      '<path d="M108 248 C110 209 128 191 160 191 C192 191 210 209 212 248 Z" fill="' + p.shirt + '"/>' +
      (p.flannel ? '<path d="M120 214 H200 M114 232 H206 M142 196 V248 M178 196 V248" stroke="' + p.shirtShade + '" stroke-width="3" opacity=".7"/>' : "") +
      (p.badge ? '<rect x="178" y="207" width="12" height="16" rx="2" fill="#FCF8F2" stroke="' + p.shirtShade + '" stroke-width="1.5"/>' : "") +
      '<rect x="151" y="164" width="18" height="32" rx="7" fill="' + p.shade + '"/>' + ears +
      '<ellipse cx="160" cy="140" rx="26" ry="30" fill="' + p.skin + '"/>' + beard + front +
      '<g stroke="' + (p.hair === "#DAD5CE" ? "#8E877F" : "#241A16") + '" stroke-width="2.6" stroke-linecap="round"><path class="brow brow-l" d="M143 131 L155 129.5"/><path class="brow brow-r" d="M165 129.5 L177 131"/></g>' +
      '<g class="look"><g class="eyes"><ellipse cx="150" cy="142" rx="2.7" ry="3.3" fill="#1C1A24"/><ellipse cx="170" cy="142" rx="2.7" ry="3.3" fill="#1C1A24"/></g></g>' +
      (p.glasses ? '<g fill="none" stroke="#3A302A" stroke-width="1.8"><circle cx="150" cy="142" r="7"/><circle cx="170" cy="142" r="7"/><path d="M157 141.5 Q160 139.5 163 141.5 M143 141 L135 139 M177 141 L185 139"/></g>' : "") +
      '<path d="M160 146 Q157 154 161.5 156.5" fill="none" stroke="' + p.shade + '" stroke-width="2" stroke-linecap="round"/>' +
      '<path class="mouth" d="' + MOUTH.neutral + '" fill="none" stroke="#45261F" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g>';
  }
  function doorScene(key, o) {
    o = o || {};
    var h = HOME2[key], id = "sc" + (svgSeq += 1), fig = figure(LOOKS2[key]), apt = h.kind === "apt";
    var cls = ["voter", "main", o.shut ? "shut" : ""].join(" ").trim(), D = "M106 244 V62 H214 V244 Z", tex = "";
    if (h.texture === "boards") tex = '<g stroke="' + h.line + '" stroke-width="1.5">' + [24, 48, 72, 96, 120, 144, 168, 192, 216].map(function (y) { return '<path d="M0 ' + y + ' H320"/>'; }).join("") + '</g>';
    var base = apt ? '<rect y="196" width="320" height="44" fill="' + h.floor + '"/><path d="M0 196 H320" stroke="#00000014" stroke-width="3"/><circle cx="51" cy="81" r="24" fill="#F6C76B" fill-opacity="0.2"/><rect x="36" y="70" width="30" height="22" rx="4" fill="#F3EBDD" stroke="#CFC5B5" stroke-width="2"/>'
      : '<circle cx="64" cy="90" r="24" fill="#F6C76B" fill-opacity="0.22"/><rect x="58" y="78" width="12" height="18" rx="3" fill="#3B3631"/><circle cx="64" cy="90" r="5" fill="#F6C76B"/>';
    var win = h.window ? '<rect x="238" y="74" width="56" height="62" rx="3" fill="#EEF2F2" stroke="' + h.frame + '" stroke-width="5"/><path d="M266 74 V136 M238 105 H294" stroke="' + h.frame + '" stroke-width="3"/>' : "";
    var extra = { plant: '<path d="M30 240 L36 206 H64 L70 240 Z" fill="#B8704F"/><circle cx="42" cy="198" r="12" fill="#5E8A5A"/><circle cx="58" cy="194" r="13" fill="#6B9A63"/><circle cx="50" cy="184" r="11" fill="#7AA86F"/>',
      wood: '<g fill="#9C6B43" stroke="#7A5232" stroke-width="2"><circle cx="252" cy="226" r="9"/><circle cx="272" cy="226" r="9"/><circle cx="292" cy="226" r="9"/><circle cx="262" cy="209" r="9"/><circle cx="282" cy="209" r="9"/><circle cx="272" cy="192" r="9"/></g><g fill="#C9A27A"><circle cx="252" cy="226" r="4"/><circle cx="272" cy="226" r="4"/><circle cx="292" cy="226" r="4"/><circle cx="262" cy="209" r="4"/><circle cx="282" cy="209" r="4"/><circle cx="272" cy="192" r="4"/></g>' }[h.extra] || "";
    var panel = apt ? '<rect x="122" y="80" width="76" height="66" rx="3" fill="none" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="3"/><rect x="122" y="160" width="76" height="70" rx="3" fill="none" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="3"/><circle cx="160" cy="100" r="3" fill="#2A2622"/><circle cx="198" cy="156" r="4.5" fill="#D9D2C4"/>'
      : (h.glass ? '<rect x="128" y="78" width="64" height="40" rx="3" fill="#F3E3C4" fill-opacity="0.55"/><path d="M160 78 V118 M128 98 H192" stroke="' + h.door + '" stroke-width="3"/>' : '<rect x="124" y="78" width="72" height="56" rx="3" fill="none" stroke="#FFFFFF" stroke-opacity="0.16" stroke-width="3"/>') + '<rect x="124" y="140" width="72" height="84" rx="3" fill="none" stroke="#FFFFFF" stroke-opacity="0.16" stroke-width="3"/><circle cx="198" cy="160" r="4.5" fill="#F6C76B"/>';
    var num = apt ? '<rect x="238" y="92" width="34" height="24" rx="4" fill="#3B3631"/><text x="255" y="109" text-anchor="middle" font-family="Figtree, sans-serif" font-weight="700" font-size="13" fill="#F3EBDD">' + h.num + '</text>'
      : '<text x="64" y="134" text-anchor="middle" font-family="Newsreader, Georgia, serif" font-size="15" fill="#3B3631">' + h.num + '</text>';
    return '<svg class="' + cls + '" viewBox="0 0 320 240" role="img" aria-label="' + esc(o.label || "A voter at the front door") + '"><defs><clipPath id="' + id + '"><path d="' + D + '"/></clipPath></defs>' +
      '<rect width="320" height="240" fill="' + h.wall + '"/>' + tex + base + win + extra + '<path d="' + D + '" fill="#F7E7C8"/>' +
      '<g clip-path="url(#' + id + ')"><g class="fig-wrap">' + fig + '</g></g><g class="door-panel"><path d="' + D + '" fill="' + h.door + '"/>' + panel + '</g>' +
      '<path d="M102 244 V58 H218 V244" fill="none" stroke="' + h.frame + '" stroke-width="' + (apt ? 5 : 6) + '"/>' + num +
      '<rect x="' + (apt ? 96 : 86) + '" y="' + (apt ? 232 : 234) + '" width="' + (apt ? 128 : 148) + '" height="' + (apt ? 8 : 6) + '" rx="2" fill="' + (apt ? "#8C6B52" : "#B9AE9C") + '"/></svg>';
  }
  /* the voter's mouth moves while their line plays, as in the warm-up */
  var mouthTimer = 0;
  function setMouth(el, k) { el.setAttribute("d", MOUTH[k]); el.setAttribute("fill", FILLED[k] ? "#45261F" : "none"); }
  function mouthTalk(on) {
    clearInterval(mouthTimer); mouthTimer = 0;
    var m = document.querySelector("#story .voter.main .mouth"); if (!m) return;
    if (!on) { setMouth(m, "smile"); return; }
    var seq = ["open", "mid", "open", "neutral", "mid", "open", "mid", "neutral"], i = 0;
    mouthTimer = setInterval(function () { var mm = document.querySelector("#story .voter.main .mouth"); if (!mm) { clearInterval(mouthTimer); return; } setMouth(mm, seq[i % seq.length]); i++; }, 115);
  }
  function voterSay(text, cb) { var x = X(); mouthTalk(true); say(text, x.voter.kv, function () { mouthTalk(false); if (cb) cb(); }); recTimers.push(setTimeout(function () { if (!document.querySelector("#story .voter.main")) clearInterval(mouthTimer); }, 30000)); }
  var CK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5 L6.6 11.5 L12.5 5" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var MK_OK = '<svg width="11" height="11" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 5.5l2.4 2.4L8.6 2.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var MK_NO = '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var PP = { pause: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="3" y="2" width="3" height="10" rx="1" fill="currentColor"/><rect x="8" y="2" width="3" height="10" rx="1" fill="currentColor"/></svg>', play: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2.5 L11.5 7 L4 11.5 Z" fill="currentColor"/></svg>' };
  function stage(o) { var x = X(); return '<div class="frame stage-frame' + (o.cls ? " " + o.cls : "") + '" style="background:' + HOME2[x.voter.key].wall + '">' + doorScene(x.voter.key, { shut: o.shut, label: x.voter.name + " at the door" }) + (o.pp || "") + '</div>'; }

  /* ---------- 1st try and 2nd try ---------- */
  function lastVoter() { var t = S.d.turns.filter(function (q) { return !q.me; }); return t.length ? t[t.length - 1].text : ""; }
  function mine() { return S.d.turns.filter(function (q) { return q.me; }).map(function (q) { return q.text; }); }
  function renderDoor() {
    var x = X(), v = x.voter, d = S.d, second = S.ph === 4, body = "", btns = "";
    if (d.stage === "intro") {
      if (!second) {
        body = '<div class="ip"><span class="st-kick">Learn ✓ · now take it to a door</span><h2>' + esc(v.name) + ' opens the door with a question about ' + esc(x.issue.toLowerCase()) + '.</h2><ol>' +
          [["Your 1st try", "Answer " + v.name + " your way. No grades."], ["Hear it done", "Monica, a canvasser, shows how."], ["Catch the mistake", "Spot what Monica gets wrong."], ["Your 2nd try", "Answer again, with feedback."]].map(function (r, k) { return '<li><i>' + (k + 1) + '</i><div><b>' + r[0] + '</b><span>' + r[1] + '</span></div></li>'; }).join("") + '</ol></div>';
        shell({ bg: BLUE_BG, dark: true, fit: true, body: body, btns: NEXTB("Knock on " + v.name + "’s door", "knock", "green") }); fitCard();
      } else {
        body = '<div class="ip"><span class="st-kick">Your 2nd try</span><h2>Same door. This time, make Maya’s three moves.</h2><ol>' + x.moves.map(function (m, k) { return '<li><i>' + (k + 1) + '</i><div><b>' + m[0] + '</b><span>' + m[1] + '</span></div></li>'; }).join("") + '</ol></div>';
        shell({ bg: BLUE_BG, dark: true, fit: true, body: body, btns: NEXTB("Knock on " + v.name + "’s door again", "knock", "green") }); fitCard();
      }
      return;
    }
    if (d.stage === "result") { renderResult(); return; }
    if (d.stage === "end" && !second) {
      body = '<h2 class="h2 tight">Your 1st try</h2><div class="fb try"><p class="you-said">You said: “' + esc(mine().join(" … ")) + '”</p><h3>A strong answer makes three moves.</h3><ul class="four-list">' + x.moves.map(function (m) { return '<li class="n"><small>Listen for</small>' + esc(m[0]) + '</li>'; }).join("") + '</ul><p class="try-lead had">Now hear Monica, a canvasser, answer ' + esc(v.name) + '.</p></div>';
      shell({ bg: "#FCF8F2", cls: "door", bcls: "stage center", fit: true, body: body, btns: '<button class="btn" type="button" id="tohear">Next: hear it done</button>' }); fitCard(); return;
    }
    var title = d.stage === "end" ? "Checking your three moves…" : d.n === 0 ? "The door opens. How would you answer?" : esc(v.name) + " has a follow-up.";
    body = '<h2 class="h2 tight">' + title + '</h2><div class="rep-card stage">' + stage({ shut: !!d.swing }) +
      '<p class="rep-quote' + (d.swing ? " late" : "") + '" id="rq"><b>' + esc(v.name) + ':</b> “' + esc(lastVoter()) + '”</p></div>';
    var r = d.r;
    if (d.stage === "end") { btns = '<div class="fb pending"><span class="ld"><i></i><i></i><i></i></span> Reading your answer…</div>'; }
    else if (!CAN_LISTEN) {
      body += '<div class="typed"><textarea id="said" rows="2" placeholder="Answer ' + esc(v.name) + '">' + esc(r.text || "") + '</textarea></div>';
      btns = '<button class="btn" type="button" id="typed">Send</button><p class="mic-note">' + (IN_CLAUDE ? "Inside claude.ai a page can’t open the microphone. Tap your keyboard’s mic to talk, or type." : "This browser can’t listen. Tap your keyboard’s mic to talk, or type.") + '</p>';
    } else {
      if (r.error) body += '<p class="warnline">' + esc(r.error) + (EMB ? ' <a href="' + esc(location.href) + '" target="_top">Open the lesson full screen</a>' : '') + '</p>';
      if (r.listening || r.text) body += '<div class="talk-live' + (r.listening ? " live" : "") + '" id="talk-live"><button class="tl-mic" type="button" id="again" aria-label="Start over"><span class="tl-pulse"></span><span class="tl-pulse p2"></span>' + MIC + '</button><div><span class="tl-wave" aria-hidden="true">' + "<i></i>".repeat(14) + '</span><p class="tl-said" id="tl-said" aria-live="polite">' + esc(r.text || "") + '</p><p class="tl-note" id="tl-note">' + (!r.listening && r.text ? "Got it. Tap Send it, or tap the mic to say it again." : "") + '</p></div></div>';
      btns = '<button class="mic-btn' + (r.listening ? " on" : "") + '" type="button" id="talk"><span class="mic-dot" aria-hidden="true">' + MIC + '</span><span>' + (r.listening ? "I’m done" : r.text ? "Send it" : "Tap to talk") + '</span></button>';
    }
    shell({ bg: "#FCF8F2", cls: "door", bcls: "stage", body: body, btns: btns });
    if (d.swing) { d.swing = false; var svg = document.querySelector("#story .voter.main"); if (svg) { svg.classList.add("knock"); recTimers.push(setTimeout(function () { svg.classList.remove("knock"); svg.classList.remove("shut"); }, FAST ? 20 : 600)); } }
  }
  function knock() {
    var v = X().voter; S.d.stage = "talk"; S.d.turns = [{ me: false, text: v.open }]; S.d.r = {}; S.d.swing = true; render();
    recTimers.push(setTimeout(function () { voterSay(v.open); }, FAST ? 40 : 1500));
  }
  function said(text) {
    var d = S.d, v = X().voter; d.turns.push({ me: true, text: text }); d.n++; d.r = {};
    stopAll();
    if (d.n >= 2) { d.turns.push({ me: false, text: v.bye }); d.stage = "end"; render(); voterSay(v.bye, S.ph === 4 ? gradeDoor : null); return; }
    d.turns.push({ me: false, text: v.follow }); render(); voterSay(v.follow);
  }
  async function gradeDoor() {
    var x = X(), at = S.lesson, m = mine(), all = norm(m.join(" . "));
    var hits = x.grade.map(function (re) { return re.test(all); }), wrong = x.wrong.test(all);
    if (sample) {
      try {
        var p = "A canvasser in training answered a voter out loud (speech-to-text, so ignore spelling). Decide which of three moves the canvasser clearly made, in any wording. Count a move only if it's stated correctly.\n\nANSWER KEY (in this practice the real candidate is called Maya and the opponent 'her opponent'): " + x.key + "\n\nMOVES:\n" + x.moves.map(function (mv, i) { return i + ": " + mv[0] + ": " + mv[1]; }).join("\n") + "\n\nWHAT THE CANVASSER SAID:\n" + m.join("\n") + "\n\nReply with only JSON: {\"hits\":[true,false,true],\"wrong\":false}. wrong is true if anything said contradicts the key.";
        var a = await sample.json(p, { modelTier: "quick", cache: false });
        if (a && Array.isArray(a.hits) && a.hits.length === 3) { hits = a.hits.map(Boolean); wrong = !!a.wrong; }
      } catch (e) {}
    }
    if (S.lesson !== at || S.ph !== 4) return;
    S.res = { hits: hits, wrong: wrong, mine: m }; S.d.stage = "result"; render();
  }
  function renderResult() {
    var x = X(), R = S.res, n = R.hits.filter(Boolean).length, all = n === 3 && !R.wrong;
    var h = n === 3 ? "You made all three moves." : n === 2 ? "Two of three. Add the one marked Not yet." : n === 1 ? "One of three. Here’s what to add." : "Here are the three moves to add.";
    var body = '<h2 class="h2 tight">Your 2nd try</h2><div class="fb try' + (all ? "" : " partial") + '"><p class="you-said">You said: “' + esc(R.mine.join(" … ")) + '”</p><h3>' + h + '</h3><ul class="four-list">' +
      x.moves.map(function (m, k) { return '<li class="' + (R.hits[k] ? "y" : "n") + '"><small>' + (R.hits[k] ? "You did" : "Not yet") + '</small>' + esc(m[0]) + '<span>' + esc(m[1]) + '</span></li>'; }).join("") + '</ul>' +
      (R.wrong ? '<p class="warnline">Careful: something you said doesn’t match the lesson.</p>' : "") +
      '<div class="model"><b>How Monica said it</b>' + esc(x.model) + '</div></div>';
    shell({ bg: "#FCF8F2", cls: "door", bcls: "stage center", fit: true, body: body, btns: '<button class="btn" type="button" id="finish">Finish the lesson</button><button class="link" type="button" id="redo">Try your 2nd try again</button>' }); fitCard();
  }

  /* ---------- Hear it done and Catch the mistake: Monica at the same door, seen from where she stands ---------- */
  function renderPlay() {
    var x = X(), v = x.voter, hear = S.ph === 2, lines = hear ? x.hearLines : x.missLines, P = S.play, cur = P.i >= 0 ? lines[P.i] : null;
    var lit = -1; if (hear) lines.forEach(function (ln, k) { if (ln.tick != null && k <= P.i) lit = Math.max(lit, ln.tick); });
    var playing = !P.finished, pp = playing ? '<button class="w-pp" type="button" id="pp" aria-label="' + (P.paused ? "Play" : "Pause") + '">' + (P.paused ? PP.play : PP.pause) + '</button>' : "";
    var cap = '<div class="wcap' + (cur && cur.who === "m" ? " you" : "") + '" id="cap" aria-live="polite">' + (cur ? '<span class="cap-who">' + (cur.who === "m" ? "Monica" : esc(v.name)) + '</span><p>' + esc(cur.text) + '</p>' : '<span class="cap-who">' + (hear ? "Hear it done" : "Another day") + '</span><p>' + (hear ? "Listen for Maya’s three moves." : "Monica gets one thing wrong. Listen for it.") + '</p>') + '</div>';
    var body = "", btns = "";
    if (hear) {
      var row = function (m, k) { return '<li class="lit"><span class="mark">' + CK + '</span><span><b>' + esc(m[0]) + '</b><small>' + esc(m[1]) + '</small></span></li>'; };
      body = '<h2 class="h2 tight">Monica at ' + esc(v.name) + '’s door</h2>' + stage({ cls: "wv2", pp: pp }) + cap +
        '<div class="wlive-wrap"><ol class="moves wrecap wlive" id="l-moves">' + x.moves.map(function (m, k) { return k <= lit ? row(m, k) : ""; }).join("") + '</ol><ol class="moves wrecap wghost" aria-hidden="true">' + x.moves.map(row).join("") + '</ol></div>';
      btns = P.finished ? '<button class="btn" type="button" id="tomiss">Next: catch the mistake</button><button class="link" type="button" id="replayall">Hear it again</button>' : '<button class="link w-skip" type="button" id="skipplay">Skip</button>';
      shell({ bg: "#FCF8F2", cls: "door", bcls: "stage", body: body, btns: btns }); return;
    }
    var M = x.miss, sp = S.spot, done = sp.pick != null, right = sp.pick === M.wrong;
    body = '<h2 class="h2 tight">Which part did Monica get wrong?</h2>' + stage({ cls: "spot-stage" + (done ? " spot-done" : ""), pp: pp });
    if (!P.finished) { body += cap; btns = '<button class="link w-skip" type="button" id="skipplay">Skip</button>'; }
    else if (!done) {
      body += '<ol class="spot-tiles">' + M.tiles.map(function (t, k) { return '<li><button class="tile" type="button" data-spot="' + k + '"><small>' + esc(x.moves[k][0]) + '</small><span class="tile-t">' + esc(t) + '</span></button></li>'; }).join("") + '</ol><button class="link" type="button" id="replayall">Hear it again</button>';
    } else {
      body += '<div class="fb spot-ans ' + (right ? "strong" : "ok") + '"><h3>' + (right ? "Nailed it!" : "Not quite.") + '</h3><p class="ans-miss">' + esc(M.fix) + '</p></div>' +
        '<ol class="spot-tiles done">' + M.tiles.map(function (t, k) { var miss = k === M.wrong, wrong = k === sp.pick && !right; return '<li><div class="tile' + (miss ? " missing" : "") + (wrong ? " mine wrong" : "") + '">' + (miss || wrong ? '<span class="sp-mk">' + (miss ? MK_OK : MK_NO) + '</span>' : "") + '<span class="sp-tx">' + (miss ? '<small>' + (right ? "Your pick" : "The mistake") + '</small>' : wrong ? '<small>Your pick</small>' : "") + '<span>' + esc(t) + '</span></span></div></li>'; }).join("") + '</ol>';
      btns = '<button class="btn" type="button" id="tosecond">Next: your 2nd try</button><button class="link" type="button" id="replayall">Hear it again</button>';
    }
    shell({ bg: "#FCF8F2", cls: "door", bcls: "stage", body: body, btns: btns });
  }
  function playScript(from) {
    var x = X(), hear = S.ph === 2, lines = hear ? x.hearLines : x.missLines, P = S.play, tok = ++playTok;
    P.paused = false;
    function step(i) {
      if (tok !== playTok) return;
      if (i >= lines.length) { P.finished = true; render(); return; }
      P.i = i; var ln = lines[i], cap = $("cap");
      if (cap) { cap.classList.toggle("you", ln.who === "m"); cap.innerHTML = '<span class="cap-who">' + (ln.who === "m" ? "Monica" : esc(x.voter.name)) + '</span><p>' + esc(ln.text) + '</p>'; }
      if (hear && ln.tick != null) { var ol = $("l-moves"); if (ol && ol.children.length <= ln.tick) { var g = document.querySelectorAll(".wghost li")[ln.tick]; if (g) { var li = g.cloneNode(true); ol.appendChild(li); } } }
      var segI = document.querySelector(".sb2 button.cur .seg i"); if (segI) segI.style.width = Math.max(8, (i + 1) / lines.length * 60) + "%";
      var next = function () { recTimers.push(setTimeout(function () { step(i + 1); }, FAST ? 10 : 350)); };
      if (ln.who === "v") { mouthTalk(true); say(ln.text, x.voter.kv, function () { mouthTalk(false); next(); }); }
      else say(ln.text, "af_heart", next);
    }
    step(from || 0);
  }
