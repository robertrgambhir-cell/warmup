# Michigan's v12 Learn (lesson 5, tariffs), built to match Georgia's (build_learn.py) with Robert's approved words.
# The Practice voter is Samira (door11.js LOOKS2.samira): a UAW member who stamps car parts in Warren, in a head wrap.
from build_learn import sup, woman, PERSON, GREEN, RED, SKIN, SHIRT as _SHIRTS
# two people of Michigan's own (not Georgia's Ana or Dee): the shopper on MI 1 and a coworker at the table on MI 7
SKIN.update({"mi_shop": "#e3b48c", "mi_co": "#5e3b28"}); _SHIRTS.update({"mi_shop": "#b5485d", "mi_co": "#c46a4a"})

# Samira's door colors (door11.js LOOKS2.samira)
SK, WRAP, SHIRT, PANTS = "#C99A72", "#5B6F8F", "#2F5F8F", "#2f2a33"
STEEL, STEEL_D = "#9aa5b1", "#6f7b88"
GRAY = "#8a94a3"
MI_CSS = ('<style>'
          '.g12 .mi-split{display:flex;flex-direction:column;gap:calc(6px * var(--k));margin-top:calc(10px * var(--k))}'
          '.g12 .mi-split .bar{display:flex;height:calc(22px * var(--k));border-radius:12px;overflow:hidden}'
          '.g12 .mi-split .bar i{display:block;height:100%}'
          '.g12 .mi-split .lab{display:flex;justify-content:space-between;gap:10px;font:600 calc(14px * var(--k))/1.25 var(--sans);color:var(--muted)}'
          '.g12 .mi-split .lab b{color:var(--red);font-weight:800}'
          '.g12 .mi-cnt{display:flex;flex-direction:column;gap:calc(14px * var(--k))}'
          '.g12 .mi-cnt .lab{display:flex;align-items:center;gap:8px}'
          '.g12 .mi-cnt .lab svg{width:calc(40px * var(--k));height:calc(66px * var(--k));flex:none}'
          '.g12 .mi-cnt .lab b{display:block;font:800 calc(20px * var(--k))/1.1 var(--sans);color:var(--red)}'
          '.g12 .mi-cnt .lab div>span{display:block;font:500 calc(14.5px * var(--k))/1.25 var(--sans);color:var(--muted)}'
          '.g12 .mi-cnt .ppl{display:grid;grid-template-columns:repeat(14,minmax(0,1fr));gap:calc(12px * var(--k)) 5px;width:min(100%,calc(330px * var(--k)))}'
          '.g12 .mi-cnt .ppl svg{width:100%;height:auto;display:block}'
          '.g12 .mi-cnt .yrs{display:flex;justify-content:space-between;gap:10px;font:600 calc(13.5px * var(--k))/1.25 var(--sans);color:var(--muted)}'
          '.g12 .mi-cnt .yrs b{color:var(--ink);font-weight:800}'
          '.g12 .mi-cnt small{font:500 calc(13px * var(--k))/1.2 var(--sans);color:var(--muted)}'
          '.g12 .cond .caps.mi-r span:first-child{color:var(--red)}'
          '.g12 .cond .caps.mi-n span:last-child{color:var(--muted)}'
          '.g12 .cond .caps.mi-g span:first-child{color:var(--green-deep)}'
          '.g12 .cond .caps.mi-g span:last-child{color:var(--red)}'
          '.g12 .news + .cond{margin-top:calc(14px * var(--k))}'
          '</style>')

def ssup(n):  # a superscript inside SVG text
    return f'<tspan font-size="0.62em" font-weight="700" baseline-shift="super">{n}</tspan>'

def _arm(sx, ex, ey, t, s):
    return (f'<path d="M{sx} 111 L{ex} {ey}" stroke="{t}" stroke-width="7.5" stroke-linecap="round"/>'
            f'<path d="M{sx} 111 L{ex} {ey}" stroke="rgba(0,0,0,.18)" stroke-width="7.5" stroke-linecap="round"/><circle cx="{ex}" cy="{ey+1}" r="3.6" fill="{s}"/>')

def part(x, y, sc=1):  # a stamped steel bracket
    return (f'<g transform="translate({x} {y}) scale({sc})"><path d="M0 0 H24 Q27 0 27 3 V9 H9 V24 Q9 27 6 27 H3 Q0 27 0 24 Z" fill="{STEEL}" stroke="{STEEL_D}" stroke-width="1.5" stroke-linejoin="round"/>'
            f'<circle cx="19" cy="4.6" r="2.2" fill="#eef1f5"/><circle cx="4.6" cy="19" r="2.2" fill="#eef1f5"/></g>')

def samira(cx, pose="down"):
    """Samira in Georgia's flat figure style: head wrap, blue work shirt. pose: down, part (holds a bracket in her right hand), sit (no legs, for behind a table)."""
    g = []
    if pose != "sit":
        g.append(f'<rect x="{cx-9}" y="148" width="7.5" height="30" rx="3.5" fill="{PANTS}"/><rect x="{cx+1.5}" y="148" width="7.5" height="30" rx="3.5" fill="{PANTS}"/>')
    g.append(f'<path d="M{cx-15} 110 Q{cx} 99 {cx+15} 110 L{cx+20} 152 L{cx-20} 152 Z" fill="{SHIRT}"/>')
    # the wrap: a hood around the face that drapes over the shoulders
    g.append(f'<circle cx="{cx}" cy="85" r="14.5" fill="{WRAP}"/>'
             f'<path d="M{cx-14.2} 86 Q{cx-16} 103 {cx-19} 113 Q{cx} 104 {cx+19} 113 Q{cx+16} 103 {cx+14.2} 86 Z" fill="{WRAP}"/>')
    g.append(f'<ellipse cx="{cx}" cy="88.5" rx="9.4" ry="10.6" fill="{SK}"/>')
    g.append(f'<path d="M{cx-10.2} 87 Q{cx-9} 74.5 {cx} 75 Q{cx+9} 74.5 {cx+10.2} 87 Q{cx+6} 80 {cx} 80 Q{cx-6} 80 {cx-10.2} 87 Z" fill="{WRAP}"/>')
    if pose == "part":
        g.append(_arm(cx-12, cx-17, 141, SHIRT, SK) + _arm(cx+12, cx+21, 124, SHIRT, SK) + part(cx+17, 112, .8))
    elif pose == "sit":
        g.append(_arm(cx-12, cx-14, 140, SHIRT, SK) + _arm(cx+12, cx+14, 140, SHIRT, SK))
    else:
        g.append(_arm(cx-12, cx-17, 141, SHIRT, SK) + _arm(cx+12, cx+17, 141, SHIRT, SK))
    return "".join(g)

def man(cx, shirt="#7f8a99", skin="#e2b896", hair="#6b5a4e", hand=0):
    """A man in the same flat style as woman(): short hair, darker trousers. hand=1 points his right arm out."""
    g = [f'<rect x="{cx-9.5}" y="148" width="8" height="30" rx="3.5" fill="#3b3f4a"/><rect x="{cx+1.5}" y="148" width="8" height="30" rx="3.5" fill="#3b3f4a"/>',
         f'<path d="M{cx-17} 110 Q{cx} 98 {cx+17} 110 L{cx+19} 152 L{cx-19} 152 Z" fill="{shirt}"/>',
         f'<rect x="{cx-4}" y="93" width="8" height="11" fill="{skin}"/>',
         f'<circle cx="{cx}" cy="86" r="11.8" fill="{skin}"/>',
         f'<path d="M{cx-12} 85 Q{cx-12} 72 {cx} 72 Q{cx+12} 72 {cx+12} 85 Q{cx+8} 78 {cx} 78.5 Q{cx-8} 78 {cx-12} 85 Z" fill="{hair}"/>']
    if hand:
        g.append(_arm(cx-13, cx-18, 141, shirt, skin) + _arm(cx+13, cx+30, 104, shirt, skin))
    else:
        g.append(_arm(cx-13, cx-18, 141, shirt, skin) + _arm(cx+13, cx+18, 141, shirt, skin))
    return "".join(g)

LEAF = "M12 1.5 L13.6 5.8 L16.2 4.6 L15.4 9.6 L19.4 7.4 L18.6 11 L22.4 11.6 L18.4 15.2 L19.2 17 L13.2 16.2 L12.7 21.5 L11.3 21.5 L10.8 16.2 L4.8 17 L5.6 15.2 L1.6 11.6 L5.4 11 L4.6 7.4 L8.6 9.6 L7.8 4.6 L10.4 5.8 Z"

def tag(x, y, kind="pct", fill=RED, rot=0, label=None, w=34, h=24, op=1):
    """A tariff tag: kind pct (a white % sign), leaf (a maple leaf, a tariff on Canada) or text (label)."""
    inner = ""
    if kind == "pct":
        inner = f'<text x="{w/2+3}" y="{h/2+6}" text-anchor="middle" font-family="Figtree, sans-serif" font-weight="800" font-size="16" fill="#fff">%</text>'
    elif kind == "leaf":
        sc = (h-6)/23
        inner = f'<path d="{LEAF}" fill="#fff" transform="translate({w/2+3-12*sc:.1f} {3:.1f}) scale({sc:.3f})"/>'
    elif kind == "text":
        inner = f'<text x="{w/2+3}" y="{h/2+5.5}" text-anchor="middle" font-family="Figtree, sans-serif" font-weight="800" font-size="14" fill="#fff">{label}</text>'
    return (f'<g transform="translate({x} {y}) rotate({rot})" opacity="{op}"><path d="M6 0 H{w} Q{w+4} 0 {w+4} 4 V{h-4} Q{w+4} {h} {w} {h} H6 L0 {h/2} Z" fill="{fill}"/>'
            f'<circle cx="6" cy="{h/2}" r="2.4" fill="#fff"/>{inner}</g>')

def crate(x, y, w=56, h=46):
    return (f'<g transform="translate({x} {y})"><rect width="{w}" height="{h}" rx="5" fill="#c58a4a"/>'
            f'<path d="M0 {h/3:.0f} H{w} M0 {2*h/3:.0f} H{w} M{w/3:.0f} 0 V{h} M{2*w/3:.0f} 0 V{h}" stroke="#a46f35" stroke-width="3"/></g>')

def border(x, y0, y1):
    return f'<path d="M{x} {y0} V{y1}" stroke="#9aa3ad" stroke-width="3" stroke-dasharray="7 7" stroke-linecap="round"/>'

def check(cx, cy, r=11):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{GREEN}"/><path d="M{cx-r*.45} {cy} l{r*.32} {r*.34} l{r*.6} -{r*.66}" stroke="#fff" stroke-width="{r*.28:.1f}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'

def cross(cx, cy, r=11):
    d = r * .4
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{RED}"/><path d="M{cx-d} {cy-d} L{cx+d} {cy+d} M{cx+d} {cy-d} L{cx-d} {cy+d}" stroke="#fff" stroke-width="{r*.28:.1f}" stroke-linecap="round"/>'

def target(cx, cy, r):
    rings = "".join(f'<circle cx="{cx}" cy="{cy}" r="{r*f:.1f}" fill="{c}"/>' for f, c in ((1, GREEN), (.74, "#fff"), (.5, GREEN), (.24, "#fff")))
    arrow = (f'<path d="M{cx+r*1.05:.1f} {cy-r*1.05:.1f} L{cx+2} {cy-2}" stroke="#4a4148" stroke-width="{r*.09:.1f}" stroke-linecap="round"/>'
             f'<path d="M{cx+r*1.05:.1f} {cy-r*1.05:.1f} l{r*.08:.1f} -{r*.3:.1f} M{cx+r*1.05:.1f} {cy-r*1.05:.1f} l{r*.3:.1f} -{r*.08:.1f}" stroke="#4a4148" stroke-width="{r*.09:.1f}" stroke-linecap="round"/>')
    return rings + arrow

def car(x, y, col="#4a7fd1"):
    return (f'<g transform="translate({x} {y})"><path d="M2 22 Q2 14 10 13 L16 4 Q18 1 23 1 H40 Q45 1 48 5 L54 13 Q62 14 62 22 V27 H2 Z" fill="{col}"/>'
            f'<path d="M19 6 H30 V13 H15 Z M33 6 H40 Q43 6 45 9 L48 13 H33 Z" fill="#dbe7f7"/>'
            f'<circle cx="16" cy="27" r="6.5" fill="#2f2a33"/><circle cx="16" cy="27" r="2.6" fill="#c9ced6"/><circle cx="48" cy="27" r="6.5" fill="#2f2a33"/><circle cx="48" cy="27" r="2.6" fill="#c9ced6"/></g>')

# ---------- sources ----------
NYFED = ["New York Fed, Feb 2026: who paid the 2025 tariffs (about 90% fell on US businesses and shoppers)", "https://libertystreeteconomics.newyorkfed.org/2026/02/who-is-paying-for-the-2025-u-s-tariffs/"]
WH = ["White House fact sheet, July 2026: the Canada tariffs (up to 50%)", "https://www.whitehouse.gov/fact-sheets/2026/07/fact-sheet-president-donald-j-trump-imposes-additional-tariffs-on-canada/"]
CA_BACK = ["Michigan Public (NPR), Aug 22, 2026: Canada strikes back with its own tariffs", "https://www.michiganpublic.org/2026-08-22/hours-after-u-s-imposes-tariffs-canada-says-itll-strike-back-starting-sept-8"]
BRIDGE = ["Bridge Michigan, July 2025: Canada is Michigan’s biggest trade partner", "https://bridgemi.com/michigan-government/trump-plans-35-tariffs-canada-michigans-biggest-trade-partner/"]
NBC = ["NBC News: one auto part crosses the border four times on its way to a car", "https://www.nbcnewyork.com/news/national-international/one-auto-part-crosses-border-four-times/6245493/"]
MEDC = ["Michigan auto jobs dashboard, Q2 2026: 113,600 parts jobs in June 2025, 109,600 in June 2026", "https://www.michiganbusiness.org/globalassets/documents/car-medc-michigan-dashboard-q2-2026.pdf"]
NW = ["Newsweek: her opponent’s September statement backing the tariffs", "https://www.newsweek.com/mike-rogers-turns-on-trumps-tariffs-what-michigan-republican-said-before-12538135"]
GV = ["Reuters via GV Wire, Oct 7, 2026: her opponent’s ad calling to end the Canada tariff fight", "https://gvwire.com/2026/10/07/michigan-republican-rogers-calls-for-end-to-canada-tariff-fight-breaking-with-trump-again/"]
COD = ["ClickOnDetroit, Oct 21, 2026: where Maya and her opponent stand on tariffs", "https://www.clickondetroit.com/news/local/2026/10/21/heres-where-michigan-us-senate-candidates-el-sayed-rogers-stand-on-tariffs/"]
UAW = ["UAW statement, Aug 25, 2026: tariffs aimed at low-wage countries, no escalation on Canada", "https://uaw.org/uaw-president-shawn-fain-on-u-s-trade-escalation-with-canada/"]
UAW_END = ["Michigan Public, June 5, 2026: the UAW endorses Maya", "https://www.michiganpublic.org/politics-government/2026-06-05/uaw-backs-el-sayed-over-other-democrats-running-for-us-senate"]
DN = ["The Detroit News, Aug 25, 2026 (the clipping)", "https://www.detroitnews.com/story/business/autos/2026/08/25/uaw-president-shawn-fain-reacts-to-donald-trump-tariff-threat-on-canadian-autos/91455881007/"]
AD = ["Maya’s ad on trade deals, Sept 2026", "https://abdulforsenate.com/2026/09/new-ad-nafta/"]

# ---------- the pictures ----------
def pic_mi1():
    # A crate crosses from Canada into the US with a red tax tag; a bar shows who ends up paying.
    shop = ('<g transform="translate(176 92)"><rect x="0" y="22" width="78" height="64" rx="3" fill="#f4efe6"/>'
            '<path d="M-4 22 H82 L76 6 H2 Z" fill="#d9483b"/><path d="M8 6 L4 22 M22 6 L20 22 M36 6 V22 M50 6 L52 22 M64 6 L68 22" stroke="#fff" stroke-width="3"/>'
            '<rect x="10" y="36" width="30" height="24" rx="2" fill="#cfe0f2"/><rect x="50" y="40" width="20" height="46" rx="2" fill="#7a5a3c"/><circle cx="66" cy="64" r="1.8" fill="#f2c14e"/></g>')
    svg = ('<svg class="wide" style="max-height:calc(190px * var(--k))" viewBox="0 0 330 184" role="img" aria-label="A crate crosses the border from Canada into the US with a red tax tag on it, headed for a US store and the shopper outside it.">'
           + border(106, 22, 178) + '<text x="52" y="16" text-anchor="middle" class="t">Canada</text><text x="160" y="16" text-anchor="middle" class="t">US</text>'
           '<path d="M14 120 H40 M20 134 H44 M26 106 H44" stroke="#c9ced6" stroke-width="4" stroke-linecap="round"/>'
           + crate(62, 96, 76, 62) + tag(108, 58, "text", RED, 14, "+ tax", 50, 26) +
           '<path d="M146 130 H164" stroke="#8a94a3" stroke-width="4" stroke-linecap="round"/><path d="M157 121 L167 130 L157 139" stroke="#8a94a3" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
           + shop + '<rect x="160" y="177" width="168" height="3" rx="1.5" fill="#d9cfbf"/>' + woman(296, "mi_shop", 0) + '</svg>')
    split = ('<div class="mi-split" role="img" aria-label="A bar: about 90% of the tax was paid by US businesses and shoppers, the rest by sellers abroad.">'
             f'<div class="bar"><i style="flex:90;background:{RED}"></i><i style="flex:10;background:#c9cdd3;border-left:3px solid #fff"></i></div>'
             f'<div class="lab"><span><b>About 90%{sup(1)}</b> paid by US businesses and shoppers</span><span>The rest: sellers abroad</span></div></div>')
    return MI_CSS + svg + split

def pic_mi2():
    # Before 2025: a crate crosses with a green 0% tag. Now: a crate crosses with a red 50% tag, and one goes back with Canada's own tag.
    left = ('<g>' + border(80, 4, 150) + '<text x="40" y="16" text-anchor="middle" class="t">Canada</text><text x="120" y="16" text-anchor="middle" class="t">US</text>'
            + crate(52, 62, 52, 42) + tag(78, 36, "text", GREEN, 10, f'0%{ssup(1)}', 40, 24) +
            '<path d="M110 84 H140" stroke="#8a94a3" stroke-width="3.5" stroke-linecap="round"/><path d="M133 77 L141 84 L133 91" stroke="#8a94a3" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>')
    right = ('<g transform="translate(170 0)">' + border(80, 4, 150) + '<text x="40" y="16" text-anchor="middle" class="t">Canada</text><text x="120" y="16" text-anchor="middle" class="t">US</text>'
             + crate(52, 42, 46, 36) + tag(76, 20, "text", RED, 10, f'50%{ssup(1)}', 44, 22) +
             '<path d="M104 60 H140" stroke="#8a94a3" stroke-width="3.5" stroke-linecap="round"/><path d="M133 53 L141 60 L133 67" stroke="#8a94a3" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
             + crate(62, 106, 46, 36) + tag(36, 96, "leaf", RED, -10, None, 34, 24) +
             '<path d="M56 124 H20" stroke="#8a94a3" stroke-width="3.5" stroke-linecap="round"/><path d="M27 117 L19 124 L27 131" stroke="#8a94a3" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>')
    return ('<div class="cond" role="img" aria-label="Before 2025, a crate from Canada crosses into the US with a green 0% tag. Now a crate from Canada carries a red 50% tag, and a US crate going into Canada carries Canada\'s own red tag.">'
            f'<svg viewBox="0 0 330 152" preserveAspectRatio="xMidYMax meet">{left}{right}</svg>'
            f'<div class="caps mi-n"><span style="color:var(--green-deep)">Before 2025: no tax on most goods{sup(1)}</span><span style="color:var(--red)">Now: up to 50%, and Canada taxes US goods back{sup(1, 2)}</span></div></div>')

def pic_mi3():
    # Samira holds a part she stamped; its path weaves across the border four times before it reaches a finished car.
    path = "M74 126 C92 126 96 56 114 56 C132 56 136 132 156 132 C176 132 180 56 200 56 C220 56 224 136 246 140 L262 142"
    dots = "".join(f'<circle cx="{x}" cy="95" r="5" fill="#fff" stroke="{GRAY}" stroke-width="2.5"/>' for x in (104, 136, 176, 214))
    svg = ('<svg class="wide" style="max-height:calc(150px * var(--k))" viewBox="0 0 330 186" role="img" aria-label="Samira holds a steel car part. A line traces the part\'s trip across the US and Canada border four times before it ends up in a finished car.">'
           '<path d="M88 95 H326" stroke="#9aa3ad" stroke-width="3" stroke-dasharray="7 7" stroke-linecap="round"/>'
           '<text x="326" y="80" text-anchor="end" class="t">Canada</text><text x="326" y="118" text-anchor="end" class="t">US</text>'
           f'<path d="{path}" stroke="{GRAY}" stroke-width="3.5" fill="none" stroke-linecap="round"/>'
           '<path d="M254 135 L263 142 L253 148" stroke="#8a94a3" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
           + dots + part(102, 34, .7) + part(188, 34, .7) + part(146, 140, .7) +
           car(262, 128) + '<g transform="translate(0 4)">' + samira(42, "part") + '</g></svg>')
    return svg

SAM_MINI = '<svg viewBox="0 0 110 184" aria-hidden="true">' + samira(55) + '</svg>'
def pic_mi4():
    figs = PERSON("#a7a29a") * 27 + PERSON(RED)
    return (MI_CSS + '<div class="mi-cnt" role="img" aria-label="28 figures, each about 4,000 Michigan auto parts jobs, about the 113,600 jobs of June 2025. The last one is red: the jobs lost by June 2026.">'
            f'<div class="lab">{SAM_MINI}<div><b>About 4,000 fewer{sup(1)}</b><span>Michigan auto parts jobs, like Samira’s</span></div></div>'
            f'<div class="ppl">{figs}</div>'
            f'<div class="yrs"><span>June 2025: <b>113,600</b>{sup(1)}</span><span>June 2026: <b>109,600</b>{sup(1)}</span></div>'
            f'<small>Each figure is about 4,000 jobs{sup(1)}, so all 28 are about June 2025’s total. The red one is gone by June 2026.</small></div>')

def rail(x, y, kinds, gone=False):
    # tags hanging from a rail; kinds: list of "leaf"/"pct". gone=True: the Canada tag falls off, gray, with a red X
    out = f'<path d="M{x} {y} H{x+92}" stroke="#4a4148" stroke-width="3" stroke-linecap="round"/>'
    for k, kind in enumerate(kinds):
        tx = x + 6 + k * 44 if k < 2 else x + 6 + (k - 2) * 44
        ty = y + 10 if k < 2 else y + 46
        if kind == "leaf" and gone:
            out += tag(tx + 6, ty + 66, "leaf", "#c9cdd3", 24, None, 32, 24) + cross(tx + 40, ty + 70, 9)
        else:
            out += f'<path d="M{tx+6} {y} V{ty+12}" stroke="#b9b1a6" stroke-width="1.6"/>' + tag(tx, ty, kind, RED, 90 if False else 0, None, 32, 24)
    return out

def pic_mi5():
    # Two panels: September, her opponent next to every tariff tag including Canada's; October, the Canada tag has fallen off with a red X, the others still hang.
    left = man(30) + rail(58, 72, ["leaf", "pct", "pct", "pct"])
    right = '<g transform="translate(186 0)">' + man(30) + rail(58, 72, ["leaf", "pct", "pct", "pct"], gone=True) + '</g>'
    arrow = '<path d="M158 110 H178" stroke="#8a94a3" stroke-width="4" stroke-linecap="round"/><path d="M170 101 L180 110 L170 119" stroke="#8a94a3" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    return ('<div class="cond" role="img" aria-label="Maya\'s opponent stands by four red tariff tags, one marked with a maple leaf for Canada. Then the Canada tag has fallen off, grayed out with a red X, while the other three tags still hang.">'
            f'<svg viewBox="0 0 330 184" preserveAspectRatio="xMidYMax meet">{left}{arrow}{right}</svg>'
            f'<div class="caps mi-r"><span>September: backed the tariffs{sup(1)}</span><span style="color:var(--ink)">October: end the Canada fight, keep the others{sup(2, 3)}</span></div></div>')

def pic_mi6():
    clip = ('<a class="news"><span class="nw-o">The Detroit News</span>'
            '<span class="nw-h">UAW, Shawn Fain respond to Trump’s 50% tariff threat on Canadian autos</span>'
            '<span class="nw-d">Aug 25, 2026' + sup(3) + '</span></a>')
    svg = ('<svg viewBox="0 38 330 112" preserveAspectRatio="xMidYMax meet">'
           + tag(30, 64, "pct", "#8a94a3", 0, None, 50, 34) + check(96, 64, 13) +
           '<g transform="translate(110 -30)">' + samira(55) + '</g>'
           + tag(232, 64, "leaf", RED, 0, None, 50, 34) + cross(298, 64, 13) + '</svg>')
    return (MI_CSS + clip + '<div class="cond" role="img" aria-label="Samira, a UAW member, stands between two tariff tags: a green check by a tariff on low-wage countries, a red X by the tariff on Canada.">'
            + svg + f'<div class="caps mi-g"><span>Tariffs on low-wage countries{sup(1)}</span><span>Tariffs on Canada{sup(1)}</span></div></div>')

def pic_mi7():
    # A target hit dead center, and Samira at the table with two others writing the rules.
    table = ('<g transform="translate(150 0)">'
             + samira(40) + woman(86, "mi_co", 0) + man(134, "#3f7f8c", "#9a6644", "#2a1d17") +
             '<rect x="10" y="134" width="156" height="12" rx="5" fill="#a46f35"/><rect x="22" y="146" width="8" height="34" rx="3" fill="#8a5a2f"/><rect x="146" y="146" width="8" height="34" rx="3" fill="#8a5a2f"/>'
             '<rect x="60" y="126" width="34" height="10" rx="2" fill="#fff" stroke="#c9ced6" stroke-width="1.5" transform="rotate(-6 77 131)"/></g>')
    return ('<div class="cond" role="img" aria-label="A green target hit dead center by an arrow, next to Samira and two other workers seated at a table.">'
            f'<svg viewBox="0 0 330 184" preserveAspectRatio="xMidYMax meet">{target(70, 104, 54)}{table}</svg>'
            f'<div class="caps mi-n"><span style="color:var(--green-deep)">Tariffs aimed at protecting Michigan jobs{sup(1)}</span><span style="color:var(--green-deep)">Unions like Samira’s at the table{sup(2)}</span></div></div>')

# ---------- the cover ----------
SAM_DOWN = ('<svg viewBox="0 0 110 184" aria-hidden="true">' + samira(46) +
            f'<path d="M92 70 V128" stroke="{RED}" stroke-width="7" stroke-linecap="round"/><path d="M78 114 L92 130 L106 114" stroke="{RED}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>')
TARGET = f'<svg viewBox="0 0 110 136" aria-hidden="true">{target(52, 74, 44)}</svg>'
TAGS = ('<svg viewBox="0 0 110 136" aria-hidden="true">' + tag(10, 30, "leaf", "#c9cdd3", 0, None, 50, 34) + cross(88, 30, 12)
        + tag(10, 84, "pct", RED, 0, None, 50, 34) + '</svg>')
THREE = ('<div class="three">'
         f'<div class="k">{SAM_DOWN}<p>Michigan lost about 4,000 auto parts jobs in a year, as tariffs on Canada climbed{sup(1)}</p></div>'
         f'<div class="k">{TARGET}<p>Maya wants smart, targeted tariffs, with unions at the table{sup(2)}</p></div>'
         f'<div class="k">{TAGS}<p>Her opponent backed the tariffs and now wants the Canada fight ended, but keeps others{sup(3)}</p></div></div>')
COVER = {"h": "Three foundational things we want you to know about tariffs", "pic": THREE, "plain": True, "p": "",
         "btn": "What a tariff is and who pays it",
         "src": [MEDC, COD, GV]}

SCREENS = [
  {"h": "A tariff is a tax on goods from another country, and most of the cost lands on US businesses and shoppers" + sup(1),
   "pic": pic_mi1(), "p": "The US company bringing the goods in pays the tax, then passes much of it on in higher prices.",
   "btn": "What changed with Canada", "src": [NYFED]},
  {"fit": True, "h": "Goods from Canada went from tariff-free to taxed, and Canada hit back" + sup(1, 2),
   "pic": pic_mi2(), "p": "Canada is Michigan’s biggest trade partner, so its tariffs on US goods land hard here." + sup(3),
   "btn": "Meet Samira, who makes car parts", "src": [WH, CA_BACK, BRIDGE]},
  {"h": "Samira stamps car parts in Warren, and some parts cross the Canadian border four times before a car is done" + sup(1),
   "pic": pic_mi3(), "p": "Imagine Samira, a union autoworker. At her plant, giant presses stamp sheet steel into car parts.",
   "btn": "What the tariffs did to jobs", "src": [NBC]},
  {"fit": True, "h": "Michigan lost about 4,000 auto parts jobs in the year to June 2026, as tariffs on Canada climbed" + sup(1, 2),
   "pic": pic_mi4(), "p": "Auto parts jobs are jobs making the pieces that go into cars, like Samira’s.",
   "btn": "What Maya’s opponent did", "src": [MEDC, WH]},
  {"h": "Maya’s Republican opponent backed the tariffs, and now wants the Canada fight ended but keeps others" + sup(1, 2, 3),
   "pic": pic_mi5(), "p": "In October he said “Canada is not our enemy” but that “there are tariffs that have helped.”" + sup(2, 3),
   "btn": "What autoworkers say", "src": [NW, GV, COD]},
  {"fit": True, "h": "The autoworkers’ union backs some tariffs, not these, and endorsed Maya" + sup(1, 2),
   "pic": pic_mi6(), "p": "The United Auto Workers (UAW) is Samira’s union. It endorsed Maya in June." + sup(2),
   "btn": "Maya’s plan for jobs like Samira’s", "src": [UAW, UAW_END, DN]},
  {"h": "Maya wants smart, targeted tariffs tied to Michigan jobs, with unions at the table" + sup(1, 2),
   "pic": pic_mi7(), "p": "In her words: “I’m not against tariffs per se. I’m just against dumb tariffs.”" + sup(1),
   "btn": "Practice it at a door", "src": [COD, AD]},
]
