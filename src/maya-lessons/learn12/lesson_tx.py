# Texas (school vouchers): the v12 Learn, in Georgia's look. Words approved by Robert (Nov 1).
# Practice voter: Héctor, a rancher and school board member in west Texas, drawn in his door colors (door11.js LOOKS2.hector).
from build_learn import sup, PERSON, GREEN, RED

HEC = {"skin": "#B9825A", "hair": "#5E5550", "shirt": "#6E7F3C", "shade": "#5A6831"}
GRAY = "#a7a29a"
INK = "#3c3c3c"

# ---------- sources ----------
TEFA = ["Texas Education Freedom Accounts, the state’s voucher program", "https://educationfreedom.texas.gov/"]
LBB = ["Texas Legislative Budget Board, SB 2 fiscal note: $1 billion for the first year", "https://capitol.texas.gov/tlodocs/89R/fiscalnotes/html/SB00002H.htm"]
KPRC = ["KPRC, Aug 18, 2026: state data on who got vouchers", "https://www.click2houston.com/news/local/2026/08/18/70-of-texas-voucher-awardees-previously-attended-private-school-or-were-homeschooled-state-data-shows/"]
TRIB = ["The Texas Tribune, Sept 3, 2026", "https://www.texastribune.org/2026/09/03/texas-school-voucher-program-2-billion-expansion-budget-comptroller/"]
AG = ["Her opponent’s release as attorney general: “I promise to vigorously defend this law”", "https://www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-celebrates-school-choice-texans-and-vows-defend-new-law"]
IVG = ["Her opponent’s candidate questionnaire: “I support eliminating the U.S. Department of Education”", "https://ivoterguide.com/candidate/2902/race/28707/election/1433"]
SITE = ["Maya’s plan for public schools (campaign site)", "https://jamestalarico.com/issue/public-education/"]
IRS = ["IRS, the new federal tax credit for private school scholarships", "https://www.irs.gov/charities-non-profits/federal-scholarship-tax-credit-fstc"]

# ---------- people ----------
def arm(sx, ex, ey, shirt, skin):
    return (f'<path d="M{sx} 111 L{ex} {ey}" stroke="{shirt}" stroke-width="7.5" stroke-linecap="round"/>'
            f'<path d="M{sx} 111 L{ex} {ey}" stroke="rgba(0,0,0,.18)" stroke-width="7.5" stroke-linecap="round"/><circle cx="{ex}" cy="{ey+1}" r="3.6" fill="{skin}"/>')

def man(cx, look=HEC, hold=None):
    """Héctor in Georgia's flat figure style: short gray hair, a beard, an olive work shirt, jeans and boots.
    hold: None (arms down) or "bag" (a money bag in his right hand)."""
    s, t, h = look["skin"], look["shirt"], look["hair"]
    g = [f'<rect x="{cx-9.5}" y="146" width="8" height="28" rx="3" fill="#3f4f6b"/><rect x="{cx+1.5}" y="146" width="8" height="28" rx="3" fill="#3f4f6b"/>',
         f'<path d="M{cx-11} 172 h10.5 v6 h-13 Q{cx-13.5} 172 {cx-11} 172 Z" fill="#5b3a24"/><path d="M{cx+1} 172 h10.5 Q{cx+13.5} 172 {cx+13.5} 178 h-13 Z" fill="#5b3a24"/>',
         f'<path d="M{cx-16} 110 Q{cx} 100 {cx+16} 110 L{cx+18} 150 L{cx-18} 150 Z" fill="{t}"/>',
         f'<path d="M{cx-5} 104 L{cx} 112 L{cx+5} 104 Z" fill="{look["shade"]}"/>',
         f'<rect x="{cx-18}" y="145" width="36" height="5" fill="#4a3426"/><rect x="{cx-3.5}" y="144.5" width="7" height="6" rx="1.5" fill="#d9b44a"/>',
         f'<rect x="{cx-3.5}" y="93" width="7" height="11" fill="{s}"/>',
         f'<circle cx="{cx}" cy="87" r="11.6" fill="{s}"/>',
         f'<path d="M{cx-11.7} 87 Q{cx-12.8} 72 {cx} 72 Q{cx+12.8} 72 {cx+11.7} 87 Q{cx+10} 78.5 {cx} 79 Q{cx-10} 78.5 {cx-11.7} 87 Z" fill="{h}"/>',
         f'<path d="M{cx-11.4} 88 Q{cx-10.5} 101 {cx} 101 Q{cx+10.5} 101 {cx+11.4} 88 Q{cx+6} 94.5 {cx} 94.5 Q{cx-6} 94.5 {cx-11.4} 88 Z" fill="{h}"/>']
    if hold == "bag":
        g.append(arm(cx-12, cx-17, 141, t, s) + arm(cx+12, cx+24, 128, t, s))
        g.append(bag(cx+30, 150, GREEN, "#1b7a4d", .8))
    else:
        g.append(arm(cx-12, cx-17, 141, t, s) + arm(cx+12, cx+17, 141, t, s))
    return "".join(g)

def person(cx, skin, shirt, hair, scale=1.0, left=None, right=None):
    """Georgia's woman() figure with any colors (a parent, or a kid when scaled), feet on y 178.
    left / right: None for an arm hanging down, or the (x, y) where that hand reaches."""
    tx, ty = cx - cx*scale, 178 - 178*scale
    lx, ly = left or (cx-17, 141); rx, ry = right or (cx+17, 141)
    g = (f'<rect x="{cx-9}" y="148" width="7.5" height="30" rx="3.5" fill="#2f2a33"/><rect x="{cx+1.5}" y="148" width="7.5" height="30" rx="3.5" fill="#2f2a33"/>'
         f'<rect x="{cx-14}" y="80" width="28" height="26" rx="10" fill="{hair}"/>'
         f'<path d="M{cx-15} 110 Q{cx} 99 {cx+15} 110 L{cx+20} 152 L{cx-20} 152 Z" fill="{shirt}"/>'
         f'<rect x="{cx-3.5}" y="93" width="7" height="11" fill="{skin}"/>'
         f'<circle cx="{cx}" cy="84" r="13.5" fill="{hair}"/><circle cx="{cx}" cy="87" r="11.2" fill="{skin}"/>'
         f'<path d="M{cx-11.6} 86 Q{cx-9} 72 {cx+2} 73 Q{cx+11} 74 {cx+11.8} 85 Q{cx+3} 79 {cx-11.6} 86 Z" fill="{hair}"/>'
         + arm(cx-12, lx, ly, shirt, skin) + arm(cx+12, rx, ry, shirt, skin))
    return f'<g transform="translate({tx:.1f} {ty:.1f}) scale({scale})">{g}</g>'

# ---------- things ----------
def bag(cx, bottom, fill, ink, scale=1.0):
    """A money sack with a dollar sign, its bottom at (cx, bottom)."""
    return (f'<g transform="translate({cx} {bottom}) scale({scale})">'
            '<path d="M-7 -40 L7 -40 L4 -33 Q20 -26 20 -12 Q20 0 0 0 Q-20 0 -20 -12 Q-20 -26 -4 -33 Z" fill="' + fill + '"/>'
            '<path d="M-8 -34 H8" stroke="' + ink + '" stroke-width="3" stroke-linecap="round"/>'
            '<text x="0" y="-8" text-anchor="middle" style="font:800 19px Figtree,sans-serif" fill="#fff">$</text></g>')

def bill(x, y, w=34, h=19):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="{GREEN}"/><rect x="{x+3}" y="{y+3}" width="{w-6}" height="{h-6}" rx="2" fill="none" stroke="#bfe8d3" stroke-width="1.4"/>'
            f'<text x="{x+w/2}" y="{y+h/2+5}" text-anchor="middle" style="font:800 14px Figtree,sans-serif" fill="#fff">$</text>')

def arrow(x1, y1, x2, y2, col, w=4):
    import math
    a = math.atan2(y2-y1, x2-x1); hl = 6 + w*1.6
    p1 = (x2 - hl*math.cos(a-0.5), y2 - hl*math.sin(a-0.5)); p2 = (x2 - hl*math.cos(a+0.5), y2 - hl*math.sin(a+0.5))
    return (f'<path d="M{x1} {y1} L{x2-w*.8*math.cos(a):.1f} {y2-w*.8*math.sin(a):.1f}" stroke="{col}" stroke-width="{w}" stroke-linecap="round"/>'
            f'<path d="M{p1[0]:.1f} {p1[1]:.1f} L{x2} {y2} L{p2[0]:.1f} {p2[1]:.1f}" stroke="{col}" stroke-width="{w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')

def star(cx, cy, r, fill):
    import math
    pts = []
    for k in range(10):
        rr = r if k % 2 == 0 else r*.42; a = -math.pi/2 + k*math.pi/5
        pts.append(f"{cx+rr*math.cos(a):.1f},{cy+rr*math.sin(a):.1f}")
    return f'<polygon points="{" ".join(pts)}" fill="{fill}"/>'

def public_school(x, y, s=1.0, flag=True):
    """Red brick, a US flag, a front door: a small-town public school. (x, y) is its bottom left; about 100 wide, 84 tall."""
    win = "".join(f'<rect x="{wx}" y="{wy}" width="11" height="12" rx="1.5" fill="#f6e7b8"/>' for wy in (-48, -28) for wx in (6, 20, 55, 69))
    f = ('<path d="M95 0 V-84" stroke="#8a94a3" stroke-width="2.4"/>'
         '<rect x="96" y="-84" width="22" height="14" fill="#fff"/>' + "".join(f'<rect x="96" y="{-84+k*4}" width="22" height="2" fill="#c8402f"/>' for k in range(4)) +
         '<rect x="96" y="-84" width="9" height="7" fill="#2f5fa8"/>') if flag else ""
    return (f'<g transform="translate({x} {y}) scale({s})">' + f +
            '<rect x="0" y="-58" width="88" height="58" fill="#c96a4f"/><rect x="-3" y="-62" width="94" height="6" rx="2" fill="#8f4a37"/>'
            '<path d="M29 -62 L44 -78 L59 -62 Z" fill="#b55c43"/><circle cx="44" cy="-67" r="4" fill="#f6e7b8"/>'
            + win + '<rect x="37" y="-30" width="14" height="30" rx="1.5" fill="#5b3a24"/><rect x="-5" y="-2" width="98" height="4" rx="2" fill="#d9cfbf"/></g>')

def private_school(x, y, s=1.0, fence=True):
    """Pale stone, columns, a crest and an iron fence: a private school. (x, y) is its bottom left; about 100 wide, 86 tall."""
    cols = "".join(f'<rect x="{cx}" y="-50" width="8" height="42" fill="#faf7f0"/>' for cx in (14, 32, 60, 78))
    fen = ('<path d="M-4 -14 H104 M-4 -3 H104" stroke="#3c3c3c" stroke-width="2"/>' +
           "".join(f'<path d="M{fx} 0 V-19" stroke="#3c3c3c" stroke-width="2"/><circle cx="{fx}" cy="-20" r="1.8" fill="#3c3c3c"/>' for fx in range(-2, 106, 9))) if fence else ""
    return (f'<g transform="translate({x} {y}) scale({s})">'
            '<rect x="6" y="-56" width="88" height="56" fill="#ddd3c1"/><path d="M0 -55 L50 -84 L100 -55 Z" fill="#cbbfa8"/>'
            '<path d="M44 -74 H56 V-66 Q56 -60 50 -58 Q44 -60 44 -66 Z" fill="#2f3e63"/><path d="M47 -70 H53" stroke="#d9b44a" stroke-width="2"/>'
            + cols + '<rect x="44" y="-38" width="12" height="30" rx="5" fill="#2f3e63"/><rect x="2" y="-8" width="96" height="8" fill="#c2b59c"/>' + fen + '</g>')

def tx_capitol(x, y, s=1.0):
    """The Texas Capitol: pink granite, a dome, the lone star on top. (x, y) is its bottom left; about 100 wide, 104 tall."""
    win = "".join(f'<rect x="{wx}" y="-28" width="7" height="12" rx="1.5" fill="#b98f78"/>' for wx in (8, 20, 32, 61, 73, 85))
    return (f'<g transform="translate({x} {y}) scale({s})">'
            '<rect x="0" y="-38" width="100" height="38" fill="#e3c2ae"/><rect x="-2" y="-42" width="104" height="5" fill="#c99f88"/>'
            '<rect x="33" y="-62" width="34" height="22" fill="#e3c2ae"/>' + "".join(f'<rect x="{cx}" y="-60" width="3" height="18" fill="#c99f88"/>' for cx in (37, 45, 53, 61)) +
            '<path d="M30 -62 Q50 -98 70 -62 Z" fill="#e8cbb8"/><rect x="47" y="-96" width="6" height="8" fill="#c99f88"/>' + star(50, -101, 7, "#f2c14e") +
            win + '<rect x="44" y="-24" width="12" height="24" rx="1.5" fill="#8f5f4a"/></g>')

def us_capitol(x, y, s=1.0):
    """The US Capitol: white dome and wings. (x, y) is its bottom left; about 110 wide, 100 tall."""
    cols = "".join(f'<rect x="{cx}" y="-34" width="3" height="28" fill="#c9d0da"/>' for cx in range(6, 106, 9) if not 44 < cx < 64)
    return (f'<g transform="translate({x} {y}) scale({s})">'
            '<rect x="0" y="-38" width="110" height="38" fill="#eef1f5"/><rect x="-2" y="-42" width="114" height="5" fill="#c9d0da"/>' + cols +
            '<path d="M42 -38 L55 -50 L68 -38 Z" fill="#dfe4ea"/><rect x="38" y="-64" width="34" height="22" fill="#eef1f5"/>' + "".join(f'<rect x="{cx}" y="-62" width="3" height="18" fill="#c9d0da"/>' for cx in (42, 50, 58, 66)) +
            '<path d="M35 -64 Q55 -100 75 -64 Z" fill="#f6f8fa" stroke="#c9d0da" stroke-width="2"/><rect x="52" y="-98" width="6" height="7" fill="#c9d0da"/><circle cx="55" cy="-101" r="3" fill="#c9d0da"/>'
            '<rect x="48" y="-26" width="14" height="26" rx="1.5" fill="#8a94a3"/><rect x="-4" y="-3" width="118" height="4" rx="2" fill="#d9cfbf"/></g>')

def ed_dept(x, y, s=1.0, crossed=True):
    """A federal office building (the US Department of Education), crossed out in red. About 100 wide, 80 tall."""
    cols = "".join(f'<rect x="{cx}" y="-46" width="7" height="38" fill="#f6f8fa"/>' for cx in (12, 28, 44, 60, 76))
    x_ = (f'<path d="M-2 -84 L102 4 M102 -84 L-2 4" stroke="{RED}" stroke-width="9" stroke-linecap="round"/>') if crossed else ""
    return (f'<g transform="translate({x} {y}) scale({s})">'
            '<path d="M50 -76 V-100" stroke="#8a94a3" stroke-width="2"/><rect x="51" y="-100" width="18" height="11" fill="#fff"/>' + "".join(f'<rect x="51" y="{-100+k*3.2:.1f}" width="18" height="1.6" fill="#c8402f"/>' for k in range(4)) + '<rect x="51" y="-100" width="7.5" height="5.5" fill="#2f5fa8"/>'
            '<rect x="4" y="-52" width="92" height="52" fill="#d9dee5"/><path d="M0 -50 L50 -78 L100 -50 Z" fill="#c4cbd5"/>'
            '<circle cx="50" cy="-61" r="7" fill="#2f5fa8"/>' + star(50, -61, 4.5, "#fff") + cols +
            '<rect x="0" y="-8" width="100" height="8" fill="#b8c0cc"/>' + x_ + '</g>')

def mesa(x0, x1, y, h=26):
    return (f'<path d="M{x0} {y} L{x0+18} {y-h} L{x1-24} {y-h} L{x1} {y} Z" fill="#efe1c8"/>')

def windmill(x, y):
    blades = "".join(f'<path d="M{x} {y-74} l{dx} {dy}" stroke="#8a94a3" stroke-width="3" stroke-linecap="round"/>' for dx, dy in ((0, -15), (14, -5), (9, 12), (-9, 12), (-14, -5)))
    return (f'<path d="M{x-10} {y} L{x} {y-72} L{x+10} {y} M{x-7} {y-24} H{x+7} M{x-4} {y-48} H{x+4}" stroke="#a9b2bd" stroke-width="2.4" fill="none"/>'
            + blades + f'<circle cx="{x}" cy="{y-74}" r="3" fill="#8a94a3"/><path d="M{x+3} {y-74} L{x+20} {y-74} L{x+20} {y-67} Z" fill="#a9b2bd"/>')

def caps(*items):
    """Captions under a picture, one column each: (text, color)."""
    cols = " ".join("1fr" for _ in items)
    return (f'<div class="caps" style="grid-template-columns:{cols}">' +
            "".join(f'<span style="color:{c}">{t}</span>' for t, c in items) + '</div>')

# ---------- the pictures ----------
def grow(cx, k, inner):
    """Scale a figure or building group about its feet on the ground line (y 178)."""
    return f'<g transform="translate({cx} 178) scale({k}) translate({-cx} -178)">{inner}</g>'

def pic_tx1():
    # The parent takes tax money from the Texas Capitol; the child hands it to a private school.
    # Hands: the parent's left hand at about (103, 90), the child's right hand at about (217, 126), after grow().
    fam = grow(160, 1.5, person(152, "#c68c62", "#8a5fa8", "#2a1d17", left=(122, 119)) + person(180, "#c68c62", "#e0a13a", "#2a1d17", .6, right=(210, 120)))
    return ('<svg class="wide" viewBox="0 12 330 174" role="img" aria-label="A parent takes tax money from the Texas Capitol, and her child hands it to a private school behind an iron fence.">'
            + tx_capitol(0, 178, .9) + arrow(66, 92, 82, 92, "#8a94a3", 3)
            + fam + bill(88, 80, 28, 16) + bill(205, 116, 26, 15)
            + private_school(231, 178, .98) + '<rect x="0" y="176" width="330" height="4" rx="2" fill="#e3d6bf"/></svg>')

def pic_tx2():
    # Ten voucher kids: 7 red who were already in private school or homeschool, 3 gray who left a public school.
    kid = lambda x, c: f'<g transform="translate({x} 64) scale(1.75)"><circle cx="8" cy="5" r="4.2" fill="{c}"/><path d="M1.5 22 V15 Q1.5 10 8 10 Q14.5 10 14.5 15 V22 Z" fill="{c}"/></g>'
    kids = "".join(kid(6 + k*32.5 + (8 if k >= 7 else 0), RED if k < 7 else GRAY) for k in range(10))
    house = ('<g transform="translate(150 54)"><path d="M0 -26 L22 -44 L44 -26 Z" fill="#b5541b"/><rect x="5" y="-27" width="34" height="27" fill="#f1e2c6"/>'
             '<rect x="17" y="-15" width="10" height="15" fill="#8f5f4a"/><rect x="8" y="-22" width="7" height="7" fill="#9cc7e8"/><rect x="29" y="-22" width="7" height="7" fill="#9cc7e8"/></g>')
    brace = lambda x0, x1, c: f'<path d="M{x0} 112 V118 H{x1} V112" stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    return ('<div class="cond" role="img" aria-label="Ten children who got vouchers. Seven, in red, were already in private school or homeschool. Three are gray.">'
            '<svg viewBox="0 0 330 122" preserveAspectRatio="xMidYMax meet">'
            + private_school(40, 54, .6, fence=False) + house
            + kids + brace(6, 229, RED) + brace(244, 324, GRAY) + '</svg>'
            '<div class="caps" style="grid-template-columns:7fr 3fr;text-align:left">'
            f'<span style="color:{RED}"><b>7 in 10{sup(1)}</b> weren’t in public school: they were in private school or homeschool</span>'
            f'<span style="color:#7a756d">The other 3 in 10{sup(1)}</span></div></div>')

def pic_tx3():
    # One Texas money bag pays for both: a wide green arrow to public schools, a red arrow to private school vouchers.
    tag = '<path d="M193 34 l14 -5" stroke="#a07a45" stroke-width="2"/>' + star(214, 28, 10, "#f2c14e")
    return ('<div class="cond" role="img" aria-label="One Texas money bag pays for both: a green arrow to a public school and a red arrow to a private school, $1 billion this year.">'
            '<svg viewBox="0 0 330 184" preserveAspectRatio="xMidYMax meet">'
            + bag(165, 76, "#d9b98a", "#a07a45", 1.8) + tag
            + arrow(128, 66, 88, 100, GREEN, 6) + arrow(202, 66, 242, 100, RED, 6)
            + public_school(8, 180, .95) + private_school(226, 180, .98) + '</svg>'
            + caps(("Public schools", "var(--green-deep)"), ("Vouchers: $1 billion this year" + sup(1), RED)) + '</div>')

def pic_tx4():
    # Héctor beside his small-town school in west Texas, holding on to its money.
    sun = '<circle cx="128" cy="52" r="15" fill="#f6d77a"/>'
    return ('<svg class="wide" viewBox="0 18 330 168" role="img" aria-label="Héctor, a bearded man in an olive work shirt, stands beside a small brick public school in west Texas, holding a green money bag.">'
            + sun + mesa(150, 330, 150, 40) + mesa(0, 120, 150, 22) + windmill(308, 178)
            + '<rect x="0" y="176" width="330" height="4" rx="2" fill="#e3d6bf"/>'
            + public_school(8, 178, 1.3) + grow(222, 1.45, man(222, hold="bag")) + '</svg>')

def pic_tx5():
    # Her opponent's two positions: money from a public school to a private school, and the Department of Education crossed out.
    return ('<div class="cond" style="gap:calc(16px * var(--k))" role="img" aria-label="Left: a red arrow carries money from a public school to a private school. Right: the US Department of Education building, crossed out in red.">'
            '<svg viewBox="0 2 330 152" preserveAspectRatio="xMidYMax meet">'
            + public_school(0, 150, .76, flag=False) + bill(72, 76, 28, 16) + arrow(70, 104, 102, 104, RED, 3.5) + private_school(104, 150, .76)
            + ed_dept(183, 150, 1.44) + '</svg>'
            + caps(("Backs vouchers", RED), ("Wants to get rid of the US Department of Education", RED)) + '</div>')

def pic_tx6():
    return ('<a class="news"><span class="nw-o">The Texas Tribune</span>'
            '<span class="nw-h">Comptroller requests doubling Texas school voucher program to $2 billion</span>'
            '<span class="nw-d">Sept 3, 2026' + sup(1) + '</span></a>'
            '<div class="bars" style="margin-top:calc(22px * var(--k))" role="img" aria-label="Texas’s voucher budget now: $1 billion. What the comptroller asked for: $2 billion, twice as long a bar.">'
            '<div class="b"><span>The voucher budget now</span><div class="t"><i style="width:50%;background:#e2a29d"></i></div><b style="color:#8a2a22">$1 billion' + sup(1) + '</b></div>'
            '<div class="b"><span>What the comptroller asked for</span><div class="t"><i style="width:100%;background:' + RED + '"></i></div><b style="color:' + RED + '">$2 billion' + sup(1) + '</b></div></div>')

TILES = [["WA",0,0],["MT",0,2],["ND",0,3],["MN",0,4],["VT",0,10],["ME",0,11],["OR",1,0],["ID",1,1],["WY",1,2],["SD",1,3],["IA",1,4],["WI",1,5],["MI",1,6],["NY",1,9],["MA",1,10],["NH",1,11],["NV",2,0],["UT",2,1],["CO",2,2],["NE",2,3],["MO",2,4],["IL",2,5],["IN",2,6],["OH",2,7],["PA",2,8],["NJ",2,9],["CT",2,10],["RI",2,11],["CA",3,0],["AZ",3,1],["NM",3,2],["KS",3,3],["AR",3,4],["KY",3,6],["WV",3,7],["MD",3,8],["DE",3,9],["OK",4,3],["LA",4,4],["MS",4,5],["TN",4,6],["VA",4,7],["DC",4,8],["AK",5,0],["TX",5,3],["AL",5,5],["GA",5,6],["NC",5,7],["HI",6,1],["FL",6,6],["SC",6,7]]

def stop_sign(cx, cy, r):
    import math
    pts = " ".join(f"{cx+r*math.cos(math.pi/8+k*math.pi/4):.1f},{cy+r*math.sin(math.pi/8+k*math.pi/4):.1f}" for k in range(8))
    return (f'<polygon points="{pts}" fill="{RED}" stroke="#fff" stroke-width="2"/>'
            f'<text x="{cx}" y="{cy+r*.3:.1f}" text-anchor="middle" style="font:800 {r*.62:.1f}px Figtree,sans-serif" fill="#fff">STOP</text>')

def pic_tx7():
    # Top: the states, Texas red for its vouchers, and a stop sign where they'd spread. Below: the US Capitol sends money to Héctor's public school.
    x0, y0, st, tw = 4, 4, 14, 12.5
    tiles = "".join(f'<rect x="{x0+c*st:.1f}" y="{y0+r*st:.1f}" width="{tw}" height="{tw}" rx="2.5" fill="{RED if n == "TX" else "#c9cdd3"}"/>' for n, r, c in TILES)
    tx_c = (x0 + 3*st + tw/2, y0 + 5*st + tw/2)
    spread = arrow(tx_c[0]+5, tx_c[1]-5, 182, 44, RED, 4) + stop_sign(208, 38, 24)
    return ('<svg class="wide" viewBox="0 0 330 214" role="img" aria-label="A map of the states with Texas in red, and a big stop sign blocking vouchers from spreading to other states. Below, green money goes from the US Capitol to Héctor’s public school, and Héctor stands beside it.">'
            + tiles + spread
            + '<g transform="translate(0 28)">' + us_capitol(4, 178, .74) + bill(92, 120, 30, 17) + arrow(92, 150, 128, 150, GREEN, 4.5)
            + public_school(128, 178, 1.25) + grow(304, 1.25, man(304)) + '<rect x="0" y="176" width="330" height="4" rx="2" fill="#e3d6bf"/></g></svg>')

# ---------- the cover ----------
def mini(inner):
    return f'<svg viewBox="0 0 110 136" aria-hidden="true">{inner}</svg>'
MINI_VOUCH = mini(bill(36, 4, 38, 22) + arrow(55, 32, 55, 52, RED, 4) + private_school(4, 132, 1.02))
MINI_PUBLIC = mini(bill(36, 4, 38, 22) + arrow(55, 32, 55, 52, GREEN, 4) + public_school(6, 132, .9, flag=False))
MINI_ED = mini(ed_dept(8, 120, .94))
THREE = ('<div class="three" style="gap:calc(20px * var(--k))">'
         f'<div class="k">{MINI_VOUCH}<p>Texas is spending $1 billion this year on private school vouchers, mostly for kids who weren’t in public school{sup(1, 2)}</p></div>'
         f'<div class="k">{MINI_PUBLIC}<p>Maya will fight vouchers going nationwide: public money for public schools{sup(3)}</p></div>'
         f'<div class="k">{MINI_ED}<p>Her opponent backs vouchers and wants the Department of Education gone{sup(4, 5)}</p></div></div>')
COVER = {"h": "Three foundational things we want you to know about school vouchers",
         "pic": THREE, "plain": True, "p": "", "btn": "What Texas started this school year", "src": [LBB, KPRC, SITE, AG, IVG]}

SCREENS = [
  {"h": "Texas now gives families tax money to pay for private school, called a voucher" + sup(1),
   "pic": pic_tx1(), "p": "A voucher pays $10,474 a year for most students, more for kids with disabilities." + sup(1) + " Texas started them this school year.",
   "btn": "Who got the vouchers", "src": [TEFA]},
  {"fit": True, "h": "7 in 10 Texas vouchers went to kids who weren’t in public school to begin with" + sup(1),
   "pic": pic_tx2(), "p": "Most were already in private school or homeschooled, taught by their parents at home.",
   "btn": "Where the money comes from", "src": [KPRC]},
  {"h": "Vouchers cost Texas $1 billion this year, from the same budget that pays for public schools" + sup(1),
   "pic": pic_tx3(), "p": "Money spent on vouchers can’t go to public schools.",
   "btn": "Meet Héctor, who sits on a school board", "src": [LBB]},
  {"h": "Héctor, a school board member in west Texas, wants that money kept in his public schools",
   "pic": pic_tx4(), "p": "A school board is the elected group that runs a town’s public schools. Héctor is the voter you’ll talk to at the door.",
   "btn": "What Maya’s opponent wants", "src": []},
  {"h": "Maya’s Republican opponent backs vouchers and wants to get rid of the US Department of Education" + sup(1, 2),
   "pic": pic_tx5(), "p": "The US Department of Education sends federal money to public schools, including for kids with disabilities. As attorney general, he promised to defend the Texas voucher law." + sup(1),
   "btn": "What happened next in Texas", "src": [AG, IVG]},
  {"fit": True, "h": "Texas’s comptroller asked to double vouchers to $2 billion" + sup(1),
   "pic": pic_tx6(), "p": "The comptroller is the state official who runs Texas’s voucher program. The legislature decides how much it gets.",
   "btn": "Maya’s plan for schools like Héctor’s", "src": [TRIB]},
  {"h": "Maya will fight vouchers going nationwide in the US Senate and keep public money in public schools" + sup(1),
   "pic": pic_tx7(), "p": "A senator can’t cancel the Texas law. Maya would vote against federal tax money for private schools and to keep the US Department of Education." + sup(1, 2),
   "btn": "Practice it at a door", "src": [SITE, IRS]},
]
