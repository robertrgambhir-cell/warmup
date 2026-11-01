# Builds the full Maya lessons app with Georgia's new Learn (v12 preview) in place of the old Georgia cards:
# home (the briefing) -> the cover (with the lesson's two parts, How option D) -> GA 1 to GA 7 -> the current practice -> lesson done.
# Also writes the How options page (A, B, C and D side by side). Other lessons are unchanged.
# Usage: python3 build_preview.py <clips.json or ""> <out.html> <how-options.html> <maya photo data-uri file>
import json, pathlib, re, subprocess, sys
here = pathlib.Path(__file__).parent
sys.path.insert(0, str(here))
from build_learn import SCREENS, sup, umbrella, rain, woman, GREEN, RED

# ---------- scoped CSS: the Learn page's rules, under .g12 ----------
src = (here / "learn-src.html").read_text()
css = src[src.index("<style>") + 7:src.index("</style>")]
css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
out_lines = []
for line in css.splitlines():
    s = line.strip()
    if not s: continue
    if s.startswith("@media (max-width: 500px)") or re.match(r"^(html|body|\.wrap|\.phone|\.tag|\*)\b", s) or s.startswith("* {"):
        continue
    m = re.match(r"^(\s*)([^@{}][^{]*)\{(.*)$", line)
    if m and not s.startswith(":root"):
        sels = ", ".join(".g12 " + x.strip() for x in m.group(2).split(","))
        out_lines.append(f"{m.group(1)}{sels} {{{m.group(3)}")
    else:
        out_lines.append(line)
scoped = "\n".join(out_lines).replace(":root {", ".g12 {", 1)
scoped += """
  .g12, .g12 * { box-sizing: border-box; }
  .phone { height: clamp(520px, calc(100svh - 100px), 800px); }
  .g12 { flex: 1; min-height: 0; height: 100%; position: relative; display: flex; flex-direction: column; background: #fff; padding: 14px 18px 26px; text-align: left; font-family: var(--sans); color: var(--ink); }
  .g12 h2 { font-family: var(--sans); }
  .g12 .news { width: auto; max-width: none; align-self: stretch; }
  .g12 .tiles i { width: auto; height: auto; min-height: 0; margin: 0; padding: 0; }

  /* the cover: three things, then the lesson's two parts (How option D) */
  .g12 .three { display: flex; flex-direction: column; gap: calc(14px * var(--k)); }
  .g12 .three .k { display: flex; gap: 14px; align-items: center; }
  .g12 .three .k svg { width: calc(58px * var(--k)); height: calc(76px * var(--k)); flex: none; overflow: visible; }
  .g12 .three .k p { margin: 0; font: 700 calc(16.5px * var(--k))/1.3 var(--sans); color: var(--ink); }
  .g12 .parts { display: flex; flex-direction: column; gap: 8px; }
  .g12 .parts .bar { display: flex; height: calc(14px * var(--k)); border-radius: 8px; overflow: hidden; }
  .g12 .parts .bar i { display: block; height: 100%; }
  .g12 .parts .bar i.l { flex: 3; background: var(--green); }
  .g12 .parts .bar i.p { flex: 2; background: #4a7fd1; border-left: 3px solid #fff; }
  .g12 .parts .lab { display: flex; font: 700 calc(14px * var(--k))/1.25 var(--sans); }
  .g12 .parts .lab span { display: flex; align-items: center; gap: 6px; }
  .g12 .parts .lab span:first-child { flex: 3; color: var(--green-deep); }
  .g12 .parts .lab span:last-child { flex: 2; color: #2f5fa8; }
  .g12 .parts .lab svg { width: calc(20px * var(--k)); height: calc(20px * var(--k)); flex: none; }
  .g12 .parts .lab small { font-weight: 500; color: var(--muted); white-space: nowrap; }

  /* How options A and B */
  .g12 .how { display: flex; flex-direction: column; gap: calc(18px * var(--k)); }
  .g12 .how .duo { display: grid; grid-template-columns: 3fr 2fr; gap: 10px; align-items: end; }
  .g12 .how .duo > div { display: flex; flex-direction: column; gap: 6px; }
  .g12 .how .duo svg { display: block; width: 100%; height: auto; max-height: calc(170px * var(--k)); }
  .g12 .how .duo b { font: 800 calc(20px * var(--k))/1.1 var(--sans); }
  .g12 .how .duo .l b { color: var(--green-deep); } .g12 .how .duo .p b { color: #2f5fa8; }
  .g12 .how .duo em { font: 800 calc(15px * var(--k))/1 var(--sans); font-style: normal; color: var(--ink); }
  .g12 .how .duo span { font: 500 calc(14.5px * var(--k))/1.3 var(--sans); color: var(--muted); }
  .g12 .how .bar { display: flex; height: calc(16px * var(--k)); border-radius: 9px; overflow: hidden; }
  .g12 .how .bar i { display: block; height: 100%; }
  .g12 .how .bar i.l { flex: 3; background: var(--green); } .g12 .how .bar i.p { flex: 2; background: #4a7fd1; border-left: 3px solid #fff; }

  /* home: Maya's briefing on five issues voters raise at the door (Robert, Nov 1, 2:11 PM) */
  .g12.hm12 { padding-top: 16px; }
  .g12 .hm-top { flex: none; display: flex; align-items: center; gap: 10px; }
  .g12 .hm-top img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
  .g12 .hm-top div { display: flex; flex-direction: column; gap: 2px; }
  .g12 .hm-top b { font: 800 15px/1.1 var(--sans); }
  .g12 .hm-top span { font: 600 13px/1.1 var(--sans); color: var(--muted); }
  .g12 .hm-top .done { margin-left: auto; font: 800 13px/1 var(--sans); color: var(--green-deep); background: #e6f6ee; border-radius: 99px; padding: 7px 10px; }
  .g12 .hm-top .back { border: 0; background: none; font: 600 26px/1 var(--sans); color: #8a8a8a; padding: 0 4px 0 0; cursor: pointer; }
  .g12 .hm-hero { display: block; width: 100%; height: auto; max-height: calc(160px * var(--k)); padding: 8px 6px 4px; border-radius: 20px; background: linear-gradient(160deg, #24569f, #163a72); box-sizing: border-box; position: static; overflow: visible; }
  .g12 .hm-list { display: flex; flex-direction: column; gap: calc(10px * var(--k)); }
  .g12 .hr { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px; width: 100%; border: 0; background: none; padding: 0; text-align: left; font-family: inherit; color: inherit; cursor: pointer; }
  .g12 .hr:disabled { cursor: default; }
  .g12 .hr-ic { position: relative; width: calc(54px * var(--k)); height: calc(54px * var(--k)); border-radius: 50%; background: var(--c); display: grid; place-items: center; box-shadow: 0 4px 0 rgba(0,0,0,.14); }
  .g12 .hr-ic svg { width: 58%; height: 58%; }
  .g12 .hr-ic i { position: absolute; top: -4px; left: -4px; width: 22px; height: 22px; border-radius: 50%; background: #fff; color: var(--ink); font: 800 12px/22px var(--sans); font-style: normal; text-align: center; box-shadow: 0 0 0 2px var(--c); }
  .g12 .hr.locked .hr-ic { filter: grayscale(.85); opacity: .55; }
  .g12 .hr-tx { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .g12 .hr-tx b { font: 800 calc(16.5px * var(--k))/1.15 var(--sans); }
  .g12 .hr-tx q { position: relative; align-self: flex-start; quotes: "\\201C" "\\201D"; font: 500 calc(13.5px * var(--k))/1.3 var(--sans); color: var(--body); background: #f1f3f5; border-radius: 4px 12px 12px 12px; padding: 5px 9px; }
  .g12 .hr.locked .hr-tx { opacity: .6; }
  .g12 .hr-parts { font: 700 calc(12.5px * var(--k))/1.2 var(--sans); color: var(--green-deep); }
  .g12 .hr-mini { display: flex; height: 6px; border-radius: 3px; overflow: hidden; width: 120px; margin-top: 2px; }
  .g12 .hr-mini i { display: block; } .g12 .hr-mini i.l { flex: 3; background: var(--green); } .g12 .hr-mini i.p { flex: 2; background: #4a7fd1; border-left: 2px solid #fff; }
  .g12 .hr-st { font: 800 13px/1 var(--sans); white-space: nowrap; display: inline-flex; align-items: center; gap: 4px; }
  .g12 .hr-st.go { color: #fff; background: var(--green); border-radius: 12px; padding: 9px 12px; box-shadow: 0 3px 0 var(--green-deep); }
  .g12 .hr-st.chev { color: #9a9a9a; font-size: 26px; font-weight: 600; padding: 0 6px; }
  .g12 .hr-st.ok { color: var(--green-deep); font-size: 18px; }
  .g12 .hr-st.lock { color: #9a9a9a; }
  .g12 .hr-st.lock svg { width: 14px; height: 14px; }
"""

# ---------- shared pictures ----------
ICONS = re.findall(r"\['(<svg.*?</svg>)', \"(#[0-9a-fA-F]{6})\"\]", (here.parent / "lessons11.js").read_text())
assert len(ICONS) == 5, len(ICONS)
ISSUES = ["Health insurance", "School vouchers", "Your electric bill", "Heating oil", "Tariffs and auto jobs"]
QUOTES = ["My job doesn’t offer health insurance.", "Is my kid’s school losing money?", "Why is my power bill so high?", "Can I afford to heat my house this winter?", "Is my plant job safe?"]
BOOK = '<svg viewBox="0 0 24 24" fill="none" stroke="#1b7a4d" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z"/></svg>'
DOOR = '<svg viewBox="0 0 24 24" fill="none" stroke="#2f5fa8" stroke-width="2.2" stroke-linejoin="round"><path d="M6 21V4h12v17"/><path d="M3.5 21h17"/><circle cx="15" cy="12.5" r="1" fill="#2f5fa8"/></svg>'
LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'

PHOTO = ""
def hero():
    # A front door with five speech bubbles, one per issue: what voters raise at the door.
    spots = [(48, 40), (282, 36), (36, 112), (294, 108), (165, 18)]
    bub = ""
    for (x, y), (icon, col) in zip(spots, ICONS):
        tail = (f'M{x-6} {y+20} L{x-12+ (24 if x > 165 else 0)} {y+34} L{x+6} {y+20} Z' if x != 165 else f'M{x-6} {y+20} L{x} {y+32} L{x+6} {y+20} Z')
        ic = icon.replace(' width="34" height="34"', ' width="26" height="26"').replace("var(--c)", col)
        bub += (f'<path d="{tail}" fill="{col}"/><circle cx="{x}" cy="{y}" r="24" fill="{col}"/>'
                f'<g transform="translate({x-13} {y-13})">{ic}</g>')
    door = ('<rect x="120" y="58" width="90" height="98" rx="4" fill="#f4efe6"/><rect x="132" y="66" width="66" height="90" rx="3" fill="#2f5fa8"/>'
            '<rect x="140" y="74" width="50" height="30" rx="2" fill="#3c6fc0"/><rect x="140" y="112" width="50" height="36" rx="2" fill="#3c6fc0"/><circle cx="184" cy="114" r="3.2" fill="#f2c14e"/>'
            '<rect x="108" y="154" width="114" height="6" rx="3" fill="#d9cfbf"/>')
    vs = ('<defs><clipPath id="mclip"><circle cx="88" cy="136" r="20"/></clipPath></defs>'
          '<circle cx="88" cy="136" r="23" fill="#7ee0a8"/>' + (f'<image href="{PHOTO}" x="68" y="116" width="40" height="40" clip-path="url(#mclip)" preserveAspectRatio="xMidYMid slice"/>' if PHOTO else '') +
          '<circle cx="242" cy="136" r="23" fill="#e8b3ab"/><circle cx="242" cy="136" r="20" fill="#9aa3ad"/><circle cx="242" cy="130" r="7" fill="#e9edf1"/><path d="M229 151 Q242 136 255 151 Z" fill="#e9edf1"/>'
          '')
    door = door.replace('<rect x="108" y="154" width="114" height="6" rx="3" fill="#d9cfbf"/>', '<rect x="108" y="154" width="114" height="6" rx="3" fill="#d9cfbf"/>')
    return ('<svg class="hm-hero" viewBox="0 0 330 168" role="img" aria-label="A front door with five speech bubbles around it, one for each issue. Maya stands on one side of the door and her opponent on the other.">'
            + door + bub + vs.replace('y="182"', 'y="141"') + '</svg>')

def home_rows(ALL=True, mini=False):
    rows = ""
    for k, ((icon, col), name, q) in enumerate(zip(ICONS, ISSUES, QUOTES)):
        open_ = ALL or k == 0
        st = '<span class="hr-st go">Start</span>' if k == 0 else ('<span class="hr-st chev">›</span>' if open_ else f'<span class="hr-st lock">{LOCK}Day {k+1}</span>')
        minibar = '<span class="hr-parts">Learn 3 min, then practice 2 min</span>' if mini else ""
        rows += (f'<button type="button" class="hr{"" if open_ else " locked"}" style="--c:{col}"><span class="hr-ic">{icon}<i>{k+1}</i></span>'
                 f'<span class="hr-tx"><b>{name}</b><q>{q}</q>{minibar}</span>{st}</button>')
    return rows

PARTS = ('<div class="parts" role="img" aria-label="This lesson: 3 minutes to learn, then 2 minutes of practice at a door.">'
         '<div class="lab"><span>' + BOOK + 'Learn <small>3 min</small></span><span>' + DOOR + 'Practice <small>2 min</small></span></div></div>')
TIMECARD = ('<svg viewBox="0 0 110 136" aria-hidden="true"><rect x="8" y="6" width="94" height="124" rx="12" fill="#fff" stroke="#c9ced6" stroke-width="4"/>'
            '<circle cx="55" cy="44" r="22" fill="#eef1f5" stroke="#8a94a3" stroke-width="4"/><path d="M55 30 V44 L65 50" stroke="#3c3c3c" stroke-width="5" fill="none" stroke-linecap="round"/>'
            + "".join(f'<rect x="22" y="{y}" width="14" height="14" rx="3" fill="{GREEN}"/><rect x="44" y="{y+4}" width="44" height="6" rx="3" fill="#d7dbe1"/>' for y in (80, 104)) + '</svg>')
BRI_RAIN = '<svg viewBox="0 0 110 184" aria-hidden="true">' + rain(55) + woman(55, "bri", 0) + '</svg>'
BRI_UMB = '<svg viewBox="0 0 110 184" aria-hidden="true">' + woman(55, "bri", 1) + '</svg>'
THREE = ('<div class="three">'
         f'<div class="k">{BRI_RAIN}<p>About 200,000 Georgia adults earn too much for Medicaid and too little to buy health insurance{sup(1)}</p></div>'
         f'<div class="k">{BRI_UMB}<p>Maya will push the legislature to let them qualify for Medicaid{sup(2)}</p></div>'
         f'<div class="k">{TIMECARD}<p>Maya’s Republican opponent wants a smaller plan that requires work hours{sup(3)}</p></div></div>')
COVER_SRC = [["Georgia Recorder via Cobb County Courier, Sept 2026", "https://cobbcountycourier.com/2026/09/is-jacksons-intelligent-medicaid-expansion-weak-tea-or-a-revolutionary-fix/"],
             ["Maya’s health care plan (the CARE Plan)", "https://www.keishaforgovernor.com/klb-policy-careplan-1.pdf"],
             ["Atlanta News First, Sept 8, 2026: her opponent’s health care plan", "https://www.atlantanewsfirst.com/2026/09/08/work-requirements-or-full-coverage-georgia-governor-hopefuls-roll-out-healthcare-proposals/"]]
COVER = {"h": "Three foundational things we want you to know about health insurance",
         "pic": THREE, "plain": True, "after": PARTS, "p": "", "btn": "Who Georgia’s Medicaid covers today", "src": COVER_SRC}

ADDON = r"""
  /* ---------- v12 preview (Nov 1): the briefing home, then Georgia's Learn in the look Robert picked, before the current practice ---------- */
  var G12 = __G12__, HOME_HERO = __HERO__, HOME_Q = __QUOTES__, LOCK12 = __LOCK__;
  L[0].issue = "Health insurance";
  L[0].story = G12.map(function (s) { return { g12: s, next: s.btn, src: s.src, html: function () { return ""; } }; });
  S.seenHow = true; /* How option D: the lesson's two parts live on the cover, so there is no separate How screen */
  var X12 = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
  /* grow or shrink everything (--k) to the largest size that fits, so every screen fills its height with no blank band and no scrolling */
  function fit12() {
    var g = $("g12"), b = $("g12b"); if (!g || !b) return;
    var ok = function (k) { g.style.setProperty("--k", k); return b.lastElementChild.getBoundingClientRect().bottom <= b.getBoundingClientRect().bottom - 2; };
    var lo = 0.6, hi = 1.5; if (ok(hi)) lo = hi; else for (var j = 0; j < 10; j++) { var m = (lo + hi) / 2; if (ok(m)) lo = m; else hi = m; }
    g.style.setProperty("--k", lo.toFixed(3));
  }
  window.addEventListener("resize", fit12);
  function refit12() { fit12(); requestAnimationFrame(fit12); setTimeout(fit12, 120); try { document.fonts.ready.then(fit12); } catch (e) {} }
  function g12Draw(s, seg, btnId) {
    var hasSrc = s.src && s.src.length;
    $("body").innerHTML = '<div class="g12" id="g12"><div class="top"><button class="x" type="button" id="home" aria-label="Close lesson">' + X12 + '</button>' + seg + '</div>' +
      '<div class="body" id="g12b"><h2>' + s.h + '</h2><div class="pic' + (s.plain ? ' plain' : '') + '">' + s.pic + '</div>' + (s.p ? '<p>' + s.p + '</p>' : '') + (s.after || '') + '</div>' +
      '<div class="foot">' + (hasSrc ? '<button class="src" type="button" id="g12src">Sources</button>' : '') + '<button class="next" type="button" id="' + btnId + '">' + s.btn + '</button></div>' +
      '<div class="sheet" id="g12sheet"><div class="card"><h3>Sources</h3><p class="note">Clickable links come at the end of the lesson</p><ol>' +
      (s.src || []).map(function (r) { return '<li>' + r[0] + '</li>'; }).join("") + '</ol><button class="close" type="button" id="g12close">Back to the lesson</button></div></div></div>';
    foot(""); refit12();
  }
  var _renderLearn = renderLearn, _screenNum = screenNum;
  renderLearn = function () {
    var c = X().story[S.idx]; if (!c.g12) return _renderLearn();
    var N = X().story.length, seg = '<div class="seg">';
    for (var k = 0; k < N; k++) seg += '<i class="' + (k <= S.idx ? "full" : "") + '"></i>';
    g12Draw(c.g12, seg + '</div>', "stnext");
  };
  renderHome = function () {
    var ndone = L.filter(function (_, k) { return S.done[k]; }).length;
    var rows = L.map(function (x, k) {
      var open = ALL || k === 0 || S.done[k - 1], done = S.done[k];
      var today = !done && open && L.findIndex(function (_, j) { return !S.done[j]; }) === k;
      var st = done ? '<span class="hr-st ok">✓</span>' : today ? '<span class="hr-st go">Start</span>' : open ? '<span class="hr-st chev">›</span>' : '<span class="hr-st lock">' + LOCK12 + 'Day ' + (k + 1) + '</span>';
      return '<button type="button" class="hr' + (open ? '' : ' locked') + '"' + (open ? ' data-lesson="' + k + '"' : ' disabled') + ' style="--c:' + ICONS[k][1] + '" aria-label="' + esc(x.issue) + '">' +
        '<span class="hr-ic">' + ICONS[k][0] + '<i>' + (k + 1) + '</i></span><span class="hr-tx"><b>' + esc(x.issue) + '</b><q>' + HOME_Q[k] + '</q></span>' + st + '</button>';
    }).join("");
    $("body").innerHTML = '<div class="g12 hm12" id="g12"><div class="hm-top">' + (EMB ? '<button class="back" type="button" id="embback" aria-label="Back to Warmup">‹</button>' : '') +
      '<img src="' + MAYA_PHOTO + '" alt="Maya Kaur"><div><b>Maya Kaur</b><span>Canvasser issue briefs</span></div><span class="done">' + ndone + ' of 5 done</span></div>' +
      '<div class="body" id="g12b">' + HOME_HERO + '<h2>Five issues voters are raising at the door</h2><p>Learn where Maya and her opponent stand on each, then practice your answer. One a day.</p>' +
      '<div class="hm-list">' + rows + '</div></div></div>';
    foot(""); refit12();
  };
  screenNum = function () { if (S.lesson === 0 && S.ph === 0 && !S.sources && !S.how) return S.idx === 0 ? "GA Cover" : "GA " + S.idx; return _screenNum(); };
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (t && t.id === "g12src") { $("g12sheet").classList.add("on"); return; }
    if (t && (t.id === "g12close" || e.target.id === "g12sheet")) { $("g12sheet").classList.remove("on"); return; }
    var b = e.target.closest("#g12b");
    if (b && !t && S.lesson != null && S.ph === 0 && !S.how) { var r = b.getBoundingClientRect(); if (e.clientX - r.left < r.width * 0.25) learnStep(-1); }
  });
  document.addEventListener("keydown", function (e) { if (S.lesson == null || S.ph !== 0 || S.how) return; if (e.key === "ArrowRight") learnStep(1); if (e.key === "ArrowLeft") learnStep(-1); });
"""

def static_screen(tag, top, body, foot, cls=""):
    return (f'<div class="opt"><div class="phone"><div class="g12 {cls}">{top}<div class="body">{body}</div>{foot}</div><span class="tag">{tag}</span></div></div>')

def options_page(photo):
    X = '<button class="x" type="button" aria-label="Close"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg></button>'
    seg = lambda n, cur: '<div class="seg">' + "".join(f'<i class="{"full" if k <= cur else ""}"></i>' for k in range(n)) + '</div>'
    btn = lambda label, src=False: '<div class="foot">' + ('<button class="src" type="button">Sources</button>' if src else '') + f'<button class="next" type="button">{label}</button></div>'
    PHONE = '<svg viewBox="0 0 120 170" aria-hidden="true"><rect x="22" y="6" width="76" height="158" rx="14" fill="#3c3c3c"/><rect x="28" y="18" width="64" height="134" rx="6" fill="#fff"/><rect x="34" y="26" width="52" height="6" rx="3" fill="#35b57c"/><rect x="34" y="42" width="52" height="40" rx="6" fill="#eef1f5"/>' + \
            '<rect x="34" y="90" width="44" height="6" rx="3" fill="#cfd5dd"/><rect x="34" y="102" width="50" height="6" rx="3" fill="#cfd5dd"/><rect x="34" y="132" width="52" height="12" rx="5" fill="#35b57c"/></svg>'
    BIGDOOR = '<svg viewBox="0 0 120 170" aria-hidden="true"><rect x="18" y="20" width="84" height="140" rx="4" fill="#f4efe6"/><rect x="28" y="28" width="64" height="132" rx="3" fill="#2f5fa8"/><rect x="36" y="36" width="48" height="44" rx="2" fill="#3c6fc0"/><rect x="36" y="88" width="48" height="62" rx="2" fill="#3c6fc0"/><circle cx="80" cy="96" r="4" fill="#f2c14e"/><rect x="6" y="158" width="108" height="8" rx="4" fill="#d9cfbf"/></svg>'
    BRIL = '<svg viewBox="0 0 110 184" aria-hidden="true">' + rain(55) + woman(55, "bri", 0) + '</svg>'
    duo = lambda left, right, lt, rt: (f'<div class="how"><div class="duo"><div class="l">{left}<b>Learn</b><em>3 min</em><span>{lt}</span></div>'
                                       f'<div class="p">{right}<b>Practice</b><em>2 min</em><span>{rt}</span></div></div></div>')
    A = static_screen("How A", f'<div class="top">{X}</div>',
                      '<h2>Every lesson takes 5 minutes: learn it, then say it at a door</h2><div class="pic plain">' + duo(PHONE, BIGDOOR, "Quick screens on what Maya and her opponent want", "Answer a voter out loud and get feedback") + '</div>',
                      btn("Got it"))
    B = static_screen("How B", f'<div class="top">{X}</div>',
                      '<h2>In 5 minutes you’ll be able to explain health insurance at any door</h2><div class="pic plain">' + duo(BRIL, BIGDOOR, "Meet a mom with no health insurance and see where Maya and her opponent stand", "Answer a voter at the door, out loud") + '</div>',
                      btn("Start with Learn"))
    C = static_screen("How C", '<div class="hm-top"><img src="' + photo + '" alt=""><div><b>Maya Kaur</b><span>Canvasser issue briefs</span></div><span class="done">0 of 5 done</span></div>',
                      hero() + '<h2>Five issues voters are raising at the door</h2><p>Each lesson: 3 minutes to learn, 2 to practice at a door. One a day.</p><div class="hm-list">' + home_rows(False, True) + '</div>', "", "hm12")
    D = static_screen("How D", f'<div class="top">{X}{seg(8, 0)}</div>',
                      '<h2>' + COVER["h"] + '</h2><div class="pic plain">' + THREE + '</div>' + PARTS, btn(COVER["btn"], True))
    caps = {"A": "Once, the first time someone opens the lessons", "B": "Every lesson, about its own issue", "C": "No extra screen: on home, under each issue", "D": "No extra screen: on each lesson’s first screen (my pick)"}
    cols = "".join(f'<div class="col"><div class="pick">{k}</div><p class="cap">{caps[k]}</p>{v}</div>' for k, v in zip("ABCD", [A, B, C, D]))
    page = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>How each lesson works, four ways</title>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Figtree:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  html, body {{ margin: 0; background: #ece7df; font-family: "Figtree", system-ui, sans-serif; color: #3c3c3c; }}
  .wrap {{ display: flex; gap: 26px; justify-content: center; align-items: flex-start; flex-wrap: wrap; padding: 18px 12px 28px; }}
  .col {{ width: 330px; display: flex; flex-direction: column; align-items: center; gap: 6px; }}
  .pick {{ font: 800 22px/1 "Figtree", sans-serif; }}
  .cap {{ margin: 0 0 4px; font: 600 14px/1.3 "Figtree", sans-serif; color: #5a5a5a; text-align: center; min-height: 36px; }}
  .phone {{ position: relative; width: 330px; height: 640px; background: #fff; border-radius: 28px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 18px 48px -24px rgba(40,30,10,.35); border: 1px solid rgba(0,0,0,.06); }}
  .tag {{ position: absolute; right: 12px; bottom: 5px; font: 600 11px/1 "Figtree", sans-serif; color: rgba(38,35,32,.45); }}
{scoped}
</style></head><body><div class="wrap">{cols}</div>
<script>
  document.querySelectorAll(".g12").forEach(function (g) {{
    var b = g.querySelector(".body"), ok = function (k) {{ g.style.setProperty("--k", k); return b.lastElementChild.getBoundingClientRect().bottom <= b.getBoundingClientRect().bottom - 2; }};
    var lo = 0.6, hi = 1.5; if (ok(hi)) lo = hi; else for (var j = 0; j < 10; j++) {{ var m = (lo + hi) / 2; if (ok(m)) lo = m; else hi = m; }}
    g.style.setProperty("--k", lo.toFixed(3));
  }});
</script></body></html>"""
    return page

if __name__ == "__main__":
    clips, out, opts, photo_file = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
    photo = pathlib.Path(photo_file).read_text().strip()
    globals()["PHOTO"] = photo
    base = here.parent
    tmp = here / "_base.html"
    subprocess.run([sys.executable, str(base / "build.py"), clips, str(tmp)], check=True, capture_output=True)
    html = tmp.read_text(); tmp.unlink()
    G = [COVER] + SCREENS
    addon = (ADDON.replace("__G12__", json.dumps(G, ensure_ascii=False)).replace("__HERO__", json.dumps(hero(), ensure_ascii=False))
             .replace("__QUOTES__", json.dumps(QUOTES, ensure_ascii=False)).replace("__LOCK__", json.dumps(LOCK)))
    anchor = "\n  render();\n  if (IN_CLAUDE"
    assert anchor in html and "</style>" in html
    html = html.replace(anchor, addon + anchor, 1).replace("</style>", scoped + "\n</style>", 1)
    pathlib.Path(out).write_text(html)
    pathlib.Path(opts).write_text(options_page(photo))
    print("wrote", out, len(html), opts)
