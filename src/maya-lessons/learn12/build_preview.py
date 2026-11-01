# Builds the full Maya lessons app with Georgia's new Learn (v12 preview) in place of the old Georgia cards:
# home -> how each lesson works -> the cover -> GA 1 to GA 7 -> the current practice -> lesson done.
# Other lessons are unchanged. Usage: python3 build_preview.py <clips.json or ""> <out.html>
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
    m = re.match(r"^(\s*)([^@{}][^{]*)\{(.*)$", line)
    if m and not s.startswith(":root") and not re.match(r"^(html|body|\.wrap|\.phone|\.tag)\b", s):
        sels = ", ".join(".g12 " + x.strip() for x in m.group(2).split(","))
        out_lines.append(f"{m.group(1)}{sels} {{{m.group(3)}")
    elif s.startswith("@media (max-width: 500px)") or re.match(r"^(html|body|\.wrap|\.phone|\.tag)\b", s):
        continue
    else:
        out_lines.append(line)
scoped = "\n".join(out_lines).replace(":root {", ".g12 {", 1)
scoped += """
  .g12 { flex: 1; min-height: 0; height: 100%; container-type: size; position: relative; display: flex; flex-direction: column; background: #fff; padding: 14px 18px 22px; text-align: left; font-family: var(--sans); color: var(--ink); }
  .g12 h2 { font-family: var(--sans); }
  .g12 .news { width: auto; max-width: none; align-self: stretch; }
  .g12 .how { display: flex; flex-direction: column; gap: clamp(16px, 3.6cqh, 30px); }
  .g12 .how .bar { display: flex; height: clamp(22px, 4cqh, 32px); border-radius: 16px; overflow: hidden; }
  .g12 .how .bar i { display: block; height: 100%; }
  .g12 .how .bar i.l { flex: 3; background: var(--green); }
  .g12 .how .bar i.p { flex: 2; background: #4a7fd1; border-left: 3px solid #fff; }
  .g12 .how .cols { display: flex; gap: 12px; }
  .g12 .how .col { display: flex; flex-direction: column; gap: 6px; }
  .g12 .how .col.l { flex: 3; } .g12 .how .col.p { flex: 2; }
  .g12 .how .col svg { width: clamp(34px, 7cqh, 56px); height: clamp(34px, 7cqh, 56px); }
  .g12 .how .col b { font: 800 clamp(19px, 3.4cqh, 26px)/1.1 var(--sans); }
  .g12 .how .col.l b { color: var(--green-deep); } .g12 .how .col.p b { color: #2f5fa8; }
  .g12 .how .col em { font: 800 clamp(15px, 2.6cqh, 19px)/1 var(--sans); font-style: normal; color: var(--ink); }
  .g12 .how .col span { font: 500 clamp(14px, 2.3cqh, 16px)/1.3 var(--sans); color: var(--muted); }
  .g12 .tiles i { width: auto; height: auto; min-height: 0; aspect-ratio: 1 / 1; margin: 0; padding: 0; }
  .g12 .how .col svg { width: clamp(40px, 9cqh, 72px) !important; height: clamp(40px, 9cqh, 72px) !important; }
  .g12 .how .col b { font-size: clamp(20px, 4.4cqh, 32px); }
  .g12 .how .col em { font-size: clamp(15px, 3.2cqh, 23px); }
  .g12 .how .col span { font-size: clamp(14px, 2.6cqh, 18px); }
  .g12 .how .bar { height: clamp(24px, 5cqh, 40px); border-radius: 20px; }
  .g12 .how { gap: clamp(16px, 5cqh, 44px); }
  .g12 .three { display: flex; flex-direction: column; gap: clamp(12px, 2.6cqh, 22px); }
  .g12 .three .k { display: flex; gap: 14px; align-items: center; }
  .g12 .three .k svg { width: clamp(52px, 10cqh, 76px); height: clamp(64px, 12.5cqh, 96px); flex: none; }
  .g12 .three .k p { margin: 0; font: 700 clamp(15.5px, 2.4cqh, 17.5px)/1.3 var(--sans); color: var(--ink); }
"""

# ---------- the cover and how each lesson works, in the same look ----------
TIMECARD = ('<svg viewBox="0 0 110 136" aria-hidden="true"><rect x="8" y="6" width="94" height="124" rx="12" fill="#fff" stroke="#c9ced6" stroke-width="4"/>'
            '<circle cx="55" cy="44" r="22" fill="#eef1f5" stroke="#8a94a3" stroke-width="4"/><path d="M55 30 V44 L65 50" stroke="#3c3c3c" stroke-width="5" fill="none" stroke-linecap="round"/>'
            + "".join(f'<rect x="22" y="{y}" width="14" height="14" rx="3" fill="{GREEN}"/><rect x="44" y="{y+4}" width="44" height="6" rx="3" fill="#d7dbe1"/>' for y in (80, 104)) + '</svg>')
BRI_RAIN = '<svg viewBox="0 0 110 184" aria-hidden="true">' + rain(55) + woman(55, "bri", 0) + '</svg>'
BRI_UMB = '<svg viewBox="0 0 110 184" aria-hidden="true">' + woman(55, "bri", 1) + '</svg>'
COVER = {"h": "Three foundational things we want you to know about health insurance",
         "pic": '<div class="three">'
                f'<div class="k">{BRI_RAIN}<p>About 200,000 Georgia adults earn too much for Medicaid and too little to buy health insurance{sup(1)}</p></div>'
                f'<div class="k">{BRI_UMB}<p>Maya will push to pass full Medicaid expansion so they qualify{sup(2)}</p></div>'
                f'<div class="k">{TIMECARD}<p>Maya’s Republican opponent wants a plan like Georgia Pathways, tied to work hours{sup(3)}</p></div></div>',
         "p": "", "btn": "Who Georgia’s Medicaid covers today", "fit": True,
         "src": [["Georgia Recorder via Cobb County Courier, Sept 2026", "https://cobbcountycourier.com/2026/09/is-jacksons-intelligent-medicaid-expansion-weak-tea-or-a-revolutionary-fix/"],
                 ["Maya’s health care plan (the CARE Plan)", "https://www.keishaforgovernor.com/klb-policy-careplan-1.pdf"],
                 ["Atlanta News First, Sept 8, 2026: his health care plan", "https://www.atlantanewsfirst.com/2026/09/08/work-requirements-or-full-coverage-georgia-governor-hopefuls-roll-out-healthcare-proposals/"]]}
BOOK = '<svg viewBox="0 0 24 24" fill="none" stroke="#1b7a4d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z"/></svg>'
DOOR = '<svg viewBox="0 0 24 24" fill="none" stroke="#2f5fa8" stroke-width="2" stroke-linejoin="round"><path d="M6 21V4h12v17"/><path d="M3.5 21h17"/><circle cx="15" cy="12.5" r="1" fill="#2f5fa8"/></svg>'
HOW = {"h": "Each lesson is 5 minutes and has 2 parts: Learn and Practice",
       "pic": '<div class="how" role="img" aria-label="A bar split three to two: Learn takes 3 minutes, Practice takes 2.">'
              '<div class="cols"><div class="col l">' + BOOK + '<b>Learn</b><em>3 min</em><span>Quick screens on the issue</span></div>'
              '<div class="col p">' + DOOR + '<b>Practice</b><em>2 min</em><span>Say it out loud at a voter’s door</span></div></div>'
              '<div class="bar"><i class="l"></i><i class="p"></i></div></div>',
       "p": "", "btn": "Start with Learn", "fit": True, "src": []}

ADDON = r"""
  /* ---------- v12 preview (Nov 1): Georgia's Learn in the look Robert picked, before the current practice ---------- */
  var G12 = __G12__, G12HOW = __HOW__;
  L[0].issue = "Health insurance";
  L[0].story = G12.map(function (s) { return { g12: s, next: s.btn, src: s.src, html: function () { return ""; } }; });
  var X12 = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
  function g12Draw(s, seg, btnId) {
    $("body").innerHTML = '<div class="g12" id="g12"><div class="top"><button class="x" type="button" id="home" aria-label="Close lesson">' + X12 + '</button>' + seg + '</div>' +
      '<div class="body" id="g12b"><h2>' + s.h + '</h2><div class="pic' + (s.fit ? ' fit' : '') + '">' + s.pic + '</div>' + (s.p ? '<p>' + s.p + '</p>' : '') +
      (s.src && s.src.length ? '<button class="src" type="button" id="g12src">Sources</button>' : '') + '</div>' +
      '<button class="next" type="button" id="' + btnId + '">' + s.btn + '</button>' +
      '<div class="sheet" id="g12sheet"><div class="card"><h3>Sources</h3><p class="note">Clickable links come at the end of the lesson</p><ol>' +
      (s.src || []).map(function (r) { return '<li>' + r[0] + '</li>'; }).join("") + '</ol><button class="close" type="button" id="g12close">Back to the lesson</button></div></div></div>';
    foot("");
  }
  var _renderLearn = renderLearn, _screenNum = screenNum;
  renderLearn = function () {
    var c = X().story[S.idx]; if (!c.g12) return _renderLearn();
    var N = X().story.length, seg = '<div class="seg">';
    for (var k = 0; k < N; k++) seg += '<i class="' + (k < S.idx ? "full" : k === S.idx ? "cur" : "") + '"></i>';
    g12Draw(c.g12, seg + '</div>', "stnext");
  };
  renderHow = function () { g12Draw(G12HOW, '<div class="seg"></div>', "howgo"); };
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

if __name__ == "__main__":
    clips, out = sys.argv[1], sys.argv[2]
    base = here.parent
    tmp = here / "_base.html"
    subprocess.run([sys.executable, str(base / "build.py"), clips, str(tmp)], check=True, capture_output=True)
    html = tmp.read_text(); tmp.unlink()
    G = [COVER] + SCREENS
    addon = ADDON.replace("__G12__", json.dumps(G, ensure_ascii=False)).replace("__HOW__", json.dumps(HOW, ensure_ascii=False))
    anchor = "\n  render();\n  if (IN_CLAUDE"
    assert anchor in html and "</style>" in html
    html = html.replace(anchor, addon + anchor, 1).replace("</style>", scoped + "\n</style>", 1)
    pathlib.Path(out).write_text(html)
    print("wrote", out, len(html))
