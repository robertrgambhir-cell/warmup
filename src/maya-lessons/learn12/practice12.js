
  /* ---------- v12 Practice for Georgia (Nov 1): Robert approved the words at 3:26 PM and picked layout A (A/B round 3) at 4:25 PM:
     Bri's door on top, one chat thread under it, the warm-up's mic. Eight screens, GA P1 to GA P8. Since 5:04 PM every lesson's Practice uses it, with its own voter and script. ---------- */
  LOOKS2.bri = { skin: "#8a5a3c", shade: "#6f4630", style: "bob", hair: "#2a1d17", shirt: "#d99a2b", shirtShade: "#b67f1f" };
  HOME2.bri = { kind: "house", wall: "#E3E6EC", texture: "boards", line: "#D3D8E0", door: "#2F6F7F", frame: "#FFFDF6", window: true, num: "52", extra: "plant" };
  var THREE12 = __THREE__;
  (function () {
    var x = L[0];
    x.voter = { key: "bri", name: "Bri", meta: "", kv: "af_sarah", voice: "af_sarah",
      open: "Can I ask you something? My job doesn’t offer health insurance, and I can’t afford to buy it. Is Maya going to do anything about that?",
      follow: "I heard the other guy has a health plan too. What’s the difference?",
      bye: "Okay. That helps. Thanks for coming by." };
    var v = x.voter;
    var H1 = "She is. You’re one of about 200,000 Georgians who earn too much for Medicaid and too little to buy health insurance.";
    var H2 = "Maya will push the legislature to pass full Medicaid expansion so people like you qualify, and the federal government pays 90%.";
    var H3 = "His is a smaller plan that requires work hours, like Georgia Pathways, which covers fewer than 1 in 5 of the people the state expected. The difference is how many people like you qualify.";
    x.hearLines = [{ who: "v", text: v.open }, { who: "m", text: H1, tick: 0 }, { who: "m", text: H2, tick: 1 }, { who: "v", text: v.follow }, { who: "m", text: H3, tick: 2 }, { who: "v", text: v.bye }];
    x.missLines = [{ who: "v", text: v.open }, { who: "m", text: H1 }, { who: "m", text: H2 }, { who: "v", text: v.follow }, { who: "m", text: "He’s against Medicaid." }];
    x.miss = { tiles: ["About 200,000 Georgians are like Bri", "Maya will push for full Medicaid expansion", "Her opponent is against Medicaid"], wrong: 2,
      fix: "He isn’t against Medicaid. He wants a smaller plan that requires work hours, like Georgia Pathways." };
    /* the three things graded are the cover's three, word for word (nothing is graded that Learn didn't set up) */
    x.moves = [["About 200,000 Georgia adults earn too much for Medicaid and too little to buy health insurance", "About 200,000 Georgians are like Bri"],
      ["Maya will push the legislature to let them qualify for Medicaid", "Maya will push for full Medicaid expansion"],
      ["Maya’s Republican opponent wants a smaller plan that requires work hours", "Her opponent wants a smaller plan with work hours"]];
    x.grade = [/(gap|uninsured|no (health )?(insurance|coverage)|without (health )?(insurance|coverage)|can'?t (afford|get)|200,?000|two hundred thousand|left out|too much for medicaid|same (spot|boat)|in your spot|like you|fall through|falls? (in|through))/,
      /(expan|let (them|you|people)[^.]{0,20}qualify|qualify for medicaid|legislature)/,
      /(pathways|smaller (plan|version)|work (requirement|rule|hour)s?|report (their |your )?hours|intelligent|partial)/];
    x.wrong = /((opponent|republican|other guy|\bhe\b)('s| is)? (against|opposed to|anti)[^.]{0,12}medicaid\b(?! expan)|no work (requirement|rule|hour)|free (health|insurance)|(maya|her|she|hers)('s)?[^.]{0,30}(no|doesn'?t (have|need|require|ask)|without|won'?t (have|need|require))[^.]{0,15}work (requirement|rule|hour)|only (his|the republican'?s?|the other)[^.]{0,20}work)/;
    x.key = "About 200,000 Georgia adults earn too much for Medicaid and too little to buy health insurance. Maya will push the legislature to pass full Medicaid expansion so adults like Bri qualify; the federal government pays 90%. Her Republican opponent wants a smaller plan that requires work hours, like Georgia Pathways, which covers fewer than 1 in 5 of the people the state expected. Under a 2025 federal law, adults covered by expansion will also report work hours, so saying Maya's plan has no work rules is wrong. Saying her opponent is against Medicaid is wrong.";
    x.model = H1 + " " + H2 + " " + H3;
  })();

  /* the other four lessons (Nov 1, 5:04 PM sweep): Georgia's Practice design with their existing scripts; the three things said in full and in short */
  L[0].things = L[0].moves; L[0].pr = { who: "she", topic: "health insurance", brief: "health insurance" };
  var THINGS12 = {
    tx: [["Texas sends $1 billion of tax money a year to private schools, mostly for kids already there", "$1 billion goes to private schools"], ["Maya will fight vouchers going nationwide: public money for public schools", "Maya: public money for public schools"], ["Her opponent backs vouchers and wants the Department of Education gone", "Her opponent backs vouchers"]],
    oh: [["Ohio electric bills are up by more than half since 2019, mostly from data center demand", "Bills are up, mostly from data centers"], ["Maya will require data centers to pay their full power costs", "Maya: data centers pay their full costs"], ["Her opponent’s bill leaves it up to each state", "His bill leaves it to each state"]],
    me: [["Half of Maine heats with oil, and it’s about $6 a gallon", "Oil is about $6 a gallon"], ["Maya wants to end the war driving prices and get more heating aid", "Maya: end the war, more heating aid"], ["Her opponent backed early aid and a small release from the oil reserve", "Her opponent: early aid, a small reserve release"]],
    mi: [["Tariffs on Canada are costing Michigan auto jobs", "Tariffs are costing auto jobs"], ["Maya wants smart, targeted tariffs, with unions at the table", "Maya: smart tariffs, unions at the table"], ["Her opponent backed the tariffs and now wants the Canada fight ended, but keeps others", "Her opponent: end the Canada fight, keep others"]]
  };
  var PR12 = { tx: { who: "he", topic: "school vouchers", brief: "school vouchers" }, oh: { who: "she", topic: "her electric bill", brief: "electric bills" },
    me: { who: "he", topic: "heating oil", brief: "heating oil" }, mi: { who: "she", topic: "tariffs", brief: "tariffs and auto jobs" } };
  L.forEach(function (x) { if (THINGS12[x.id]) { x.things = THINGS12[x.id]; x.pr = PR12[x.id]; } });
  var MIC12 = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>';
  var OK12 = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#35b57c"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var NO12 = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#e5e5e5"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#8a8a8a" stroke-width="2.6" stroke-linecap="round"/></svg>';
  var BAD12 = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#b3261e"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>';

  /* which of the eight Practice screens this is (GA P1 to GA P8) */
  function pnum12() {
    var d = S.d || {};
    if (S.ph === 1) return d.stage === "intro" ? 1 : d.stage === "end" ? 3 : 2;
    if (S.ph === 2) return 4; if (S.ph === 3) return 5;
    if (S.ph === 4) return d.stage === "result" ? 7 : 6;
    return 8;
  }
  function bar12() {
    var n = pnum12(), s = '<span class="chip12"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.2 2.2L9.5 3.8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>Learn</span><div class="seg">';
    for (var k = 1; k <= 8; k++) s += '<i class="' + (k <= n ? "full" : "") + '"></i>';
    return s + '</div>';
  }
  function door12(o) {
    o = o || {};
    var svg = doorScene(X().voter.key, { shut: o.shut, label: X().voter.name + " at the front door" }).replace('viewBox="0 0 320 240"', 'viewBox="0 60 320 156" preserveAspectRatio="xMidYMid slice"');
    return '<div class="door12' + (o.cls ? " " + o.cls : "") + '" id="story">' + svg + (o.pp || "") + '</div>';
  }
  function thread12(turns, nowLast) {
    return '<div class="thread12" id="thread12">' + turns.map(function (t, k) {
      var me = t.who === "me", cv = t.who === "m";
      return '<div class="msg ' + (me || cv ? "you" : "bri") + (nowLast && k === turns.length - 1 ? " now" : "") + '"><b>' + (me ? "You" : cv ? "Canvasser" : esc(X().voter.name)) + '</b><p>' + esc(t.text) + '</p></div>';
    }).join("") + '</div>';
  }
  function things12(marks, labels) {
    var x = X();
    return '<ul class="things12">' + x.things.map(function (m, k) {
      var mk = marks ? marks[k] : null;
      return '<li class="' + (mk === true ? "y" : mk === false ? "n" : "") + '">' + (mk === true ? OK12 : mk === false ? NO12 : '<i>' + (k + 1) + '</i>') +
        '<span><b>' + esc(labels ? m[1] : m[0]) + '</b>' + (mk === true ? '<small>Got it</small>' : mk === false ? '<small>Missed it</small>' : '') + '</span></li>';
    }).join("") + '</ul>';
  }
  function draw12(o) {
    $("body").innerHTML = '<div class="g12 pr12' + (o.cls ? " " + o.cls : "") + '" id="g12"><div class="top"><button class="x" type="button" id="home" aria-label="Close lesson">' + X12 + '</button>' + bar12() + '</div>' +
      '<div class="body' + (o.chat ? " chat" : "") + '" id="g12b"><h2>' + o.h + '</h2>' + o.body + '</div><div class="foot' + (o.col ? " col" : "") + '">' + (o.btns || "") + '</div></div>';
    foot("");
    if (!o.chat) refit12();
    var th = $("thread12"); if (th) th.scrollTop = th.scrollHeight;
  }
  function grade1() { var x = X(), all = norm(mine().join(" . ")); return x.grade.map(function (re) { return re.test(all); }); }

  var _renderDoor = renderDoor, _renderPlay = renderPlay, _renderResult = renderResult, _renderDone = renderDone, _playScript = playScript;
  renderDoor = function () {
    if (!X().things) return _renderDoor();
    var x = X(), v = x.voter, d = S.d, second = S.ph === 4;
    if (d.stage === "intro" && second) { knock(); return; }
    if (d.stage === "intro") {
      draw12({ h: "You’re at " + esc(v.name) + "’s door, and " + x.pr.who + " brings up " + x.pr.topic,
        body: door12({ shut: true, cls: "intro" }) + '<p>You’ve already said you’re with Maya’s campaign. Answer out loud. The three things from the start of the lesson are what count.</p>' + (x.id === "ga" ? '<div class="pic plain">' + THREE12 + '</div>' : things12(null)),
        btns: '<button class="next" type="button" id="knock">Answer ' + esc(v.name) + '</button>' });
      return;
    }
    if (d.stage === "result") { renderResult(); return; }
    if (d.stage === "end" && !second) {
      var h = grade1(), n = h.filter(Boolean).length; S.res1 = { hits: h, mine: mine() };
      draw12({ h: n === 3 ? "You got all 3 things" : "You got " + n + " of the 3 things", body: things12(h) + '<p class="said12">You said: “' + esc(mine().join(" … ")) + '”</p>',
        btns: '<button class="next" type="button" id="tohear">Hear a canvasser answer ' + esc(v.name) + '</button>' });
      return;
    }
    var turns = d.turns.map(function (t) { return { who: t.me ? "me" : "v", text: t.text }; }), r = d.r, body = door12({ shut: !!d.swing }) + thread12(turns, true), btns = "";
    if (d.stage === "end") {
      btns = '<div class="pending12"><span class="ld"><i></i><i></i><i></i></span> Checking your answer</div>';
    } else if (!CAN_LISTEN) {
      body += '<div class="typed12"><textarea id="said" rows="2" placeholder="Answer ' + esc(v.name) + '">' + esc(r.text || "") + '</textarea></div>' + '<p class="note12">' + (IN_CLAUDE ? "Inside claude.ai a page can’t open the microphone. Tap your keyboard’s mic to talk, or type." : "This browser can’t listen. Tap your keyboard’s mic to talk, or type.") + '</p>';
      btns = '<button class="next" type="button" id="typed">Send</button>';
    } else {
      if (r.error) body += '<p class="warn12">' + esc(r.error) + (EMB ? ' <a href="' + esc(location.href) + '" target="_top">Open the lesson full screen</a>' : '') + '</p>';
      if (r.listening || r.text) body += '<div class="live12' + (r.listening ? " on" : "") + '" id="talk-live"><button class="mic" type="button" id="again" aria-label="Start over">' + MIC12 + '</button><span class="w"><span class="wave" aria-hidden="true">' + "<i></i>".repeat(14) + '</span><span class="words" id="tl-said" aria-live="polite">' + esc(r.text || "") + '</span><span class="tnote" id="tl-note">' + (!r.listening && r.text ? "Got it. Tap Send it, or tap the mic to start over." : "") + '</span></span></div>';
      btns = '<button class="next" type="button" id="talk">' + MIC12 + (r.listening ? "I’m done" : r.text ? "Send it" : "Tap to talk") + '</button>';
    }
    draw12({ h: second ? "Answer " + esc(v.name) + " again" : "Answer " + esc(v.name) + " out loud", chat: true, body: body, btns: btns });
    if (d.swing) { d.swing = false; var svg = document.querySelector("#story .voter.main"); if (svg) { svg.classList.add("knock"); recTimers.push(setTimeout(function () { svg.classList.remove("knock"); svg.classList.remove("shut"); }, FAST ? 20 : 600)); } }
  };
  renderPlay = function () {
    if (!X().things) return _renderPlay();
    var x = X(), v = x.voter, hear = S.ph === 2, lines = hear ? x.hearLines : x.missLines, P = S.play;
    var shown = lines.slice(0, P.i + 1), lit = [false, false, false];
    if (hear) shown.forEach(function (ln) { if (ln.tick != null) lit[ln.tick] = true; });
    var pp = !P.finished ? '<button class="pp12" type="button" id="pp" aria-label="' + (P.paused ? "Play" : "Pause") + '">' + (P.paused ? PP.play : PP.pause) + '</button>' : "";
    var turns = shown.map(function (ln) { return { who: ln.who, text: ln.text }; }), body, btns;
    if (hear) {
      body = door12({ pp: pp }) + thread12(turns, true) + things12(lit.map(function (b) { return b ? true : null; }), true);
      btns = P.finished ? '<button class="next" type="button" id="tomiss">Find the mistake in the next answer</button><button class="lnk" type="button" id="replayall">Hear it again</button>'
        : '<button class="lnk" type="button" id="skipplay">Skip</button>';
      draw12({ h: "A canvasser answers " + esc(v.name) + " with all three things", chat: true, col: true, cls: "hear12", body: body, btns: btns });
      return;
    }
    var M = x.miss, sp = S.spot, done = sp.pick != null, right = sp.pick === M.wrong;
    if (!P.finished) {
      body = door12({ pp: pp }) + thread12(turns, true);
      btns = '<button class="lnk" type="button" id="skipplay">Skip</button>';
    } else {
      body = (done ? thread12(turns, false).replace('class="thread12"', 'class="thread12 give"') : thread12(turns, false)) + '<ol class="tiles12' + (done ? " done" : "") + '">' + M.tiles.map(function (t, k) {
        var miss = k === M.wrong, mine = k === sp.pick;
        if (!done) return '<li><button class="tile" type="button" data-spot="' + k + '">' + esc(t) + '</button></li>';
        return '<li><div class="tile' + (miss ? " miss" : mine ? " wrong" : "") + '">' + (miss ? BAD12 : mine ? NO12 : "") + '<span>' + esc(t) + (miss ? '<small>The mistake</small>' : mine ? '<small>Your pick</small>' : '') + '</span></div></li>';
      }).join("") + '</ol>' + (done ? '<div class="fix12' + (right ? " ok" : "") + '"><b>' + (right ? "Right, that’s the mistake." : "Not quite. The mistake is marked in red.") + '</b><p>' + esc(M.fix) + '</p></div>' : "");
      btns = done ? '<button class="next" type="button" id="tosecond">Answer ' + esc(v.name) + ' again</button>' : '<button class="lnk" type="button" id="replayall">Hear it again</button>';
    }
    draw12({ h: "This canvasser gets one thing wrong. Tap it", chat: true, col: true, cls: "miss", body: body, btns: btns });
  };
  /* in Georgia's new Practice the conversation grows line by line in the thread, so each line redraws the screen */
  playScript = function (from) {
    if (!X().things) return _playScript(from);
    var x = X(), hear = S.ph === 2, lines = hear ? x.hearLines : x.missLines, P = S.play, tok = ++playTok;
    P.paused = false;
    function step(i) {
      if (tok !== playTok) return;
      if (i >= lines.length) { P.finished = true; render(); return; }
      P.i = i; render(); var ln = lines[i];
      var next = function () { recTimers.push(setTimeout(function () { step(i + 1); }, FAST ? 10 : 350)); };
      if (ln.who === "v") { mouthTalk(true); say(ln.text, x.voter.kv, function () { mouthTalk(false); next(); }); }
      else say(ln.text, "af_heart", next);
    }
    step(from || 0);
  };
  renderResult = function () {
    if (!X().things) return _renderResult();
    var x = X(), R = S.res, n = R.hits.filter(Boolean).length, all = n === 3 && !R.wrong;
    draw12({ h: all ? "You’re briefed on " + x.pr.brief : "You got " + n + " of the 3 things", cls: all ? "won" : "",
      body: (all ? '<div class="badge12">' + OK12 + '</div>' : '') + things12(R.hits) + (R.wrong ? '<p class="warn12">Careful: something you said doesn’t match the lesson.</p>' : ''),
      col: true, btns: '<button class="next" type="button" id="finish">See your whole lesson</button><button class="lnk" type="button" id="redo">Try again</button>' });
  };
  renderDone = function () {
    if (!X().things) return _renderDone();
    var x = X(); S.done[S.lesson] = true;
    var a = (S.res1 && S.res1.hits) || [false, false, false], b = (S.res && S.res.hits) || [false, false, false];
    var na = a.filter(Boolean).length, nb = b.filter(Boolean).length;
    var rows = x.things.map(function (m, k) { return '<tr><th>' + esc(m[1]) + '</th><td>' + (a[k] ? OK12 : NO12) + '</td><td>' + (b[k] ? OK12 : NO12) + '</td></tr>'; }).join("");
    draw12({ h: nb > na ? "You went from " + na + " to " + nb + " of the 3 things" : "You got " + nb + " of the 3 things, twice",
      body: '<table class="grow12"><thead><tr><th></th><th>1st try</th><th>2nd try</th></tr></thead><tbody>' + rows + '</tbody></table>' +
        '<div class="reveal12"><b>Where this lesson came from</b><p>Maya stood in for <strong>' + esc(x.from) + '</strong>, the Democrat in the 2026 ' + esc(x.race) + ' race. Her Republican opponent is <strong>' + esc(x.opp) + '</strong>.</p><button class="lnk" type="button" id="srcs">See all sources</button></div>',
      btns: '<button class="next" type="button" id="home">Back to your briefs</button>' });
    if (S.res && S.res.wrong) { var tb = document.querySelector(".grow12"); if (tb) tb.insertAdjacentHTML("afterend", '<p class="warn12">Careful: something you said on your 2nd try doesn’t match the lesson.</p>'); refit12(); }
  };
  var _screenNum12 = screenNum;
  screenNum = function () { if (S.lesson != null && X().things && S.ph > 0 && !S.sources) return X().id.toUpperCase() + " P" + pnum12(); return _screenNum12(); };
