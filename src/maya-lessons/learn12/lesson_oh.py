# Ohio's v12 Learn: electric bills. Words approved by Robert (Nov 1). Same look and helpers as Georgia's (build_learn.py).
# The voter is Barb, drawn in her door colors (door11.js LOOKS2.barb): fair skin, gray bob, glasses, plum shirt.
from build_learn import sup, PERSON, GREEN, RED

SKIN, HAIR, HAIR_LINE, SHIRT, GLASS = "#F0CFB4", "#DAD5CE", "#b4ada3", "#9A5B7D", "#3A302A"
LEGS = "#2f2a33"

def bill(x, y, w, h, top=RED, rot=0, check=False):
    # a paper bill: a lightning mark, the amount line on top, then gray lines
    s = w / 20
    g = (f'<g transform="rotate({rot} {x + w/2} {y + h/2})"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{2.2*s:.1f}" fill="#fff" stroke="#c9ced6" stroke-width="{1.4*s:.1f}"/>'
         f'<path d="M{x+5.6*s:.1f} {y+3.2*s:.1f} L{x+3.4*s:.1f} {y+7.6*s:.1f} H{x+5.4*s:.1f} L{x+4.2*s:.1f} {y+11*s:.1f} L{x+7.8*s:.1f} {y+6*s:.1f} H{x+5.8*s:.1f} L{x+7*s:.1f} {y+3.2*s:.1f} Z" fill="#f2b134"/>'
         f'<rect x="{x+10*s:.1f}" y="{y+5*s:.1f}" width="{7*s:.1f}" height="{3*s:.1f}" rx="{1.2*s:.1f}" fill="{top}"/>')
    yy = y + 14*s
    while yy + 2*s < y + h - 2*s:
        g += f'<rect x="{x+3*s:.1f}" y="{yy:.1f}" width="{14*s:.1f}" height="{1.8*s:.1f}" rx="{.9*s:.1f}" fill="#d7dbe1"/>'
        yy += 4.4*s
    if check:
        g += (f'<circle cx="{x+w-1*s:.1f}" cy="{y+h-1*s:.1f}" r="{5.2*s:.1f}" fill="{GREEN}"/>'
              f'<path d="M{x+w-3.6*s:.1f} {y+h-1*s:.1f} l{2*s:.1f} {2*s:.1f} l{3.6*s:.1f} {-4*s:.1f}" stroke="#fff" stroke-width="{1.4*s:.1f}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
    return g + "</g>"

def barb(cx, holding=False, ground=None, bill_top=RED):
    # Barb in Georgia's flat figure style (woman() in build_learn.py): feet on y 178, head at y 87.
    g = ""
    if ground: g += f'<ellipse cx="{cx}" cy="179" rx="34" ry="6" fill="{ground}"/>'
    g += (f'<rect x="{cx-9}" y="148" width="7.5" height="30" rx="3.5" fill="{LEGS}"/><rect x="{cx+1.5}" y="148" width="7.5" height="30" rx="3.5" fill="{LEGS}"/>'
          f'<path d="M{cx-15.5} 79 Q{cx} 66 {cx+15.5} 79 L{cx+16.5} 101 Q{cx+9} 104 {cx+6} 99 L{cx-6} 99 Q{cx-9} 104 {cx-16.5} 101 Z" fill="{HAIR}" stroke="{HAIR_LINE}" stroke-width="1"/>'
          f'<path d="M{cx-15} 110 Q{cx} 99 {cx+15} 110 L{cx+20} 152 L{cx-20} 152 Z" fill="{SHIRT}"/>'
          f'<rect x="{cx-3.5}" y="93" width="7" height="11" fill="{SKIN}"/>'
          f'<circle cx="{cx}" cy="87" r="11.2" fill="{SKIN}"/>'
          f'<path d="M{cx-12.4} 89 Q{cx-12} 72 {cx+1} 73 Q{cx+12.4} 73.5 {cx+12.4} 89 Q{cx+9} 79 {cx+1} 79.5 Q{cx-8} 80 {cx-12.4} 89 Z" fill="{HAIR}" stroke="{HAIR_LINE}" stroke-width="1"/>'
          f'<g fill="none" stroke="{GLASS}" stroke-width="1.3"><circle cx="{cx-4.6}" cy="88.5" r="3.4"/><circle cx="{cx+4.6}" cy="88.5" r="3.4"/><path d="M{cx-1.2} 88.2 H{cx+1.2}"/></g>')
    def arm(sx, ex, ey):
        return (f'<path d="M{sx} 111 L{ex} {ey}" stroke="{SHIRT}" stroke-width="7.5" stroke-linecap="round"/>'
                f'<path d="M{sx} 111 L{ex} {ey}" stroke="rgba(0,0,0,.18)" stroke-width="7.5" stroke-linecap="round"/>')
    hand = lambda x, y: f'<circle cx="{x}" cy="{y+1}" r="3.6" fill="{SKIN}"/>'
    if holding:  # the right hand holds a bill up in front of her chest
        g += arm(cx-12, cx-17, 141) + hand(cx-17, 141) + arm(cx+12, cx+21, 126) + bill(cx+14, 104, 20, 27, top=bill_top) + hand(cx+21, 126)
    else:
        g += arm(cx-12, cx-17, 141) + arm(cx+12, cx+17, 141) + hand(cx-17, 141) + hand(cx+17, 141)
    return g

def datacenter(x, y, w, h, bolt=True):
    # a flat data center: a dark building, rows of server racks with green lights, cooling fans on the roof
    cols, rows = max(2, int(w // 44)), max(2, int((h - 22) // 17))
    cw = (w - 16 - (cols - 1) * 8) / cols
    g = (f'<rect x="{x+w*.12:.1f}" y="{y-9}" width="{w*.22:.1f}" height="11" rx="2" fill="#4a5872"/><rect x="{x+w*.42:.1f}" y="{y-9}" width="{w*.22:.1f}" height="11" rx="2" fill="#4a5872"/>'
         f'<circle cx="{x+w*.23:.1f}" cy="{y-3.5}" r="3.2" fill="#2b3a55"/><circle cx="{x+w*.53:.1f}" cy="{y-3.5}" r="3.2" fill="#2b3a55"/>'
         f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#1f2a3d"/>')
    for c in range(cols):
        for r in range(rows):
            rx, ry = x + 8 + c * (cw + 8), y + 11 + r * 17
            g += f'<rect x="{rx:.1f}" y="{ry}" width="{cw:.1f}" height="11" rx="2.5" fill="#33435f"/><circle cx="{rx+cw-6:.1f}" cy="{ry+5.5}" r="2.2" fill="#7ee0a8"/><rect x="{rx+5:.1f}" y="{ry+4.5}" width="{cw*.45:.1f}" height="2" rx="1" fill="#4c5f82"/>'
    if bolt:
        bx, by = x + w - 22, y - 26
        g += f'<path d="M{bx+12} {by} L{bx} {by+22} H{bx+10} L{bx+2} {by+42} L{bx+24} {by+14} H{bx+13} L{bx+20} {by} Z" fill="#f2b134" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>'
    return g

def house(x, base, s=1, wall="#D3DEE6", door="#B04A3A"):
    return (f'<g transform="translate({x} {base}) scale({s})"><path d="M-14 0 V-18 L0 -30 L14 -18 V0 Z" fill="{wall}"/><path d="M-17 -17 L0 -32 L17 -17" stroke="#8a94a3" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<rect x="-4" y="-11" width="8" height="11" fill="{door}"/></g>')

def tower(x, base, top):
    # a lattice power tower
    hgt = base - top
    return (f'<g stroke="#8a94a3" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round">'
            f'<path d="M{x-11} {base} L{x-3} {top} M{x+11} {base} L{x+3} {top}"/>'
            f'<path d="M{x-14} {top+12} H{x+14} M{x-10} {top+26} H{x+10}"/>'
            f'<path d="M{x-9} {base} L{x+7} {top+hgt*.55} M{x+9} {base} L{x-7} {top+hgt*.55} M{x-6} {top+hgt*.55} L{x+4} {top+26} M{x+6} {top+hgt*.55} L{x-4} {top+26}"/></g>')

# ---------- the cover's three small pictures ----------
UP = lambda x, y, c=RED: f'<path d="M{x} {y+30} V{y+4}" stroke="{c}" stroke-width="6" stroke-linecap="round"/><path d="M{x-11} {y+14} L{x} {y} L{x+11} {y+14}" stroke="{c}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
BARB_BILL = '<svg viewBox="0 0 110 184" aria-hidden="true">' + barb(48, holding=True) + UP(92, 60) + '</svg>'
DC_PAYS = ('<svg viewBox="0 0 110 136" aria-hidden="true">' + datacenter(6, 44, 98, 84, bolt=False)
           + bill(58, 14, 40, 52, check=True) + '</svg>')
def qtiles(n_cols, n_rows, size, gap, ox=0, oy=0, hi=None):
    g = ""
    for r in range(n_rows):
        for c in range(n_cols):
            x, y = ox + c * (size + gap), oy + r * (size + gap)
            red = hi == (r, c)
            g += (f'<rect x="{x}" y="{y}" width="{size}" height="{size}" rx="{size*.22:.1f}" fill="{"#fff" if red else "#c9cdd3"}"' + (f' stroke="{RED}" stroke-width="3"' if red else '') + '/>'
                  f'<text x="{x+size/2}" y="{y+size*.72:.1f}" text-anchor="middle" font-family="Figtree, sans-serif" font-weight="800" font-size="{size*.62:.1f}" fill="{RED if red else "#4b4b4b"}">?</text>')
    return g
TILES_Q = '<svg viewBox="0 0 110 136" aria-hidden="true">' + qtiles(3, 3, 30, 7, ox=4, oy=18, hi=(1, 1)) + '</svg>'

PF = ["PolitiFact, July 2026, using Public Utilities Commission of Ohio data: $1,070 a year in Oct 2019, $1,734 in Jan 2026", "https://politifact.com/factchecks/2026/jul/20/sherrod-brown/sherrod-brown-blames-hb-6-for-electric-bill-spike-experts-say-the-law-wasnt-the-main-cause/"]
IMM = ["PJM’s independent market monitor, via Utility Dive, Jan 2026: data centers were 45% of $47.2 billion in capacity costs over three auctions", "https://www.utilitydive.com/news/data-centers-pjm-capacity-auction/808951/"]
FOX = ["Maya’s words in her campaign video, via Fox News, Aug 2026", "https://www.foxnews.com/politics/brown-embraced-amazon-data-centers-blaming-higher-utility-costs-high-stakes-senate-race"]
HUS = ["Her opponent’s Senate release, July 20, 2026: his bill would “require states to consider” the standards", "https://www.husted.senate.gov/?p=12816"]
RC = ["Roll Call, Sept 30, 2026: the bill “would not require states to adopt any particular standard”; blocked 57 to 43, with 60 needed", "https://rollcall.com/2026/09/30/voluntary-ratepayer-protection-bill-blocked-in-senate-again/"]
OCC = ["Ohio Consumers’ Counsel, data centers in Ohio", "https://occ.ohio.gov/sites/default/files/2026-03/OCC-Data-Centers-in-Ohio.pdf"]
SIG = ["Signal Ohio, Aug 3, 2026: Ohio July bills 12% higher than 2025, records in Cleveland, Dayton and Akron", "https://signalohio.org/electric-bills-hit-new-highs-across-ohio-state-data-shows/"]
OCJ = ["Ohio Capital Journal, Dec 11, 2025", "https://ohiocapitaljournal.com/?p=35742"]

THREE = ('<div class="three">'
         f'<div class="k">{BARB_BILL}<p>Ohio electric bills are up by more than half since 2019, and data centers are now the biggest driver{sup(1, 2)}</p></div>'
         f'<div class="k">{DC_PAYS}<p>Maya will require data centers to pay their full power costs{sup(3)}</p></div>'
         f'<div class="k">{TILES_Q}<p>Her opponent’s bill leaves it up to each state{sup(4)}</p></div></div>')
COVER = {"h": "Three foundational things we want you to know about electric bills",
         "pic": THREE, "plain": True, "p": "", "btn": "What data centers are", "src": [PF, IMM, FOX, HUS]}

# ---------- the pictures ----------
def pic_oh1():
    # Small homes on a thin wire next to a huge data center fed by thick power lines from a tower.
    homes = house(22, 172, 1) + house(58, 172, 1, wall="#EADCC8", door="#7A3E5C")
    wires = ('<path d="M22 142 Q52 150 96 104" stroke="#8a94a3" stroke-width="1.4" fill="none"/>'
             + "".join(f'<path d="M{96+d} {98+d*.4} Q{150} {120+d} 196 {92+d*.8}" stroke="#4a4148" stroke-width="{w}" fill="none" stroke-linecap="round"/>' for d, w in ((-12, 5), (0, 5), (12, 5))))
    return ('<svg class="wide" viewBox="0 0 330 184" role="img" aria-label="Two small houses on a thin wire next to a huge data center, a dark building full of computer racks, fed by three thick power lines and a lightning bolt.">'
            + '<rect x="0" y="172" width="330" height="4" rx="2" fill="#d9cfbf"/>' + tower(96, 172, 86) + wires + homes
            + datacenter(186, 64, 138, 108) + '</svg>')

def hbars(rows, unit_note, vw=96):
    # horizontal bars with honest lengths (rows: label, value text, share 0..1, color)
    out = '<div class="bars" style="margin-top:0">'
    for lab, val, share, col in rows:
        out += (f'<div class="b"><span>{lab}</span><div class="t" style="height:calc(30px * var(--k))"><i style="width:{share*100:.1f}%;background:{col};border:0"></i></div>'
                f'<b style="color:{col};width:calc({vw}px * var(--k))">{val}</b></div>')
    return out + (f'<small style="font:500 calc(13px * var(--k))/1.2 var(--sans);color:var(--muted)">{unit_note}</small>' if unit_note else '') + '</div>'

def pic_oh2():
    return ('<div role="img" aria-label="Two bars for the average Ohio home’s electric bill: $1,070 a year in 2019, in gray, and a red bar about 60% longer, $1,734 a year in 2026.">'
            '<svg viewBox="0 0 330 70" style="display:block;width:100%;height:auto;max-height:calc(84px * var(--k));margin-bottom:calc(10px * var(--k))" aria-hidden="true">'
            + bill(118, 6, 34, 46, top="#a7a29a") + UP(176, 10) + bill(196, 2, 40, 56) + '</svg>'
            + hbars([("In 2019", "$1,070" + sup(1), 1070/1734, "#8a8f98"), ("In 2026", "$1,734" + sup(1), 1, RED)], "Average Ohio home, per year") + '</div>')

def pic_oh3():
    # Barb holds this year's bill; her bills grow taller each year, climbing a red arrow.
    bills = "".join(bill(x, 172 - h, h*.74, h, rot=0) for x, h in ((122, 62), (176, 82), (245, 104)))
    arrow = '<path d="M122 98 Q200 84 290 40" stroke="' + RED + '" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M276 34 L293 38 L286 54" stroke="' + RED + '" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    return ('<svg class="wide" viewBox="0 0 330 184" role="img" aria-label="Barb, a retired woman with a gray bob and glasses, holds an electric bill. Beside her, three bills grow taller one after another under a red arrow pointing up.">'
            + '<rect x="0" y="176" width="330" height="4" rx="2" fill="#d9cfbf" opacity=".7"/>' + barb(56, holding=True) + arrow + bills + '</svg>')

def pic_oh4():
    # One bar for the grid's capacity costs: the red 45% from data centers, the gray rest.
    dc = '<svg viewBox="0 0 140 92" style="display:block;width:100%;height:auto;max-height:calc(96px * var(--k))" aria-hidden="true">' + datacenter(10, 34, 120, 56) + '</svg>'
    plants = ('<svg viewBox="0 0 170 92" style="display:block;width:100%;height:auto;max-height:calc(96px * var(--k))" aria-hidden="true">'
              + house(34, 90, 1.25) + house(72, 90, 1.05, wall="#EADCC8", door="#7A3E5C")
              + '<rect x="98" y="52" width="46" height="38" rx="3" fill="#c9cdd3"/><rect x="104" y="30" width="9" height="24" fill="#b5bac2"/><rect x="122" y="38" width="9" height="16" fill="#b5bac2"/><rect x="106" y="62" width="10" height="10" rx="1.5" fill="#eef1f5"/><rect x="126" y="62" width="10" height="10" rx="1.5" fill="#eef1f5"/></svg>')
    lab = lambda big, small, col: f'<div style="display:flex;flex-direction:column;gap:2px"><b style="font:800 calc(20px * var(--k))/1.1 var(--sans);color:{col}">{big}</b><span style="font:600 calc(14px * var(--k))/1.25 var(--sans);color:var(--muted)">{small}</span></div>'
    return ('<div role="img" aria-label="A bar for the $47.2 billion the grid charged over three years to keep enough power plants ready. The red 45% share, under a data center, came from data centers. The gray rest, under homes and a factory, came from everything else." style="display:flex;flex-direction:column;gap:calc(8px * var(--k))">'
            '<div style="display:grid;grid-template-columns:45fr 55fr;gap:8px;align-items:end">' + dc + plants + '</div>'
            '<div style="display:flex;height:calc(30px * var(--k));border-radius:15px;overflow:hidden"><i style="flex:45;background:' + RED + '"></i><i style="flex:55;background:#c9cdd3;border-left:3px solid var(--panel)"></i></div>'
            '<div style="display:grid;grid-template-columns:45fr 55fr;gap:8px">' + lab("45%" + sup(1), "Data centers", RED) + lab("55%" + sup(1), "Everything else", "#6b7079") + '</div>'
            '<small style="font:500 calc(13px * var(--k))/1.3 var(--sans);color:var(--muted)">Shares of the $47.2 billion the grid charged over three years to keep enough power plants ready' + sup(1) + '</small></div>')

def pic_oh5():
    cells = ['<i class="n" style="font-size:calc(15px * var(--k))">?</i>'] * 50
    cells[17] = '<i class="ga" style="font-size:calc(11.5px * var(--k))">OH</i>'
    tiles = "".join(cells)
    q = '<i class="n" style="display:grid;place-items:center;width:15px;height:15px;font:800 10px/1 var(--sans);font-style:normal;color:#4b4b4b">?</i>'
    return ('<div class="states" role="img" aria-label="50 gray squares, one per state, each with a question mark: each state decides whether data centers pay. Ohio is outlined in red.">'
            '<div class="tiles" style="grid-template-columns:repeat(10, minmax(0, 1fr))">' + tiles + '</div>'
            '<div class="key"><span>' + q + 'Each state decides whether data centers pay</span><span><i class="ga"></i>Ohio, where Barb lives</span></div></div>')

def pic_oh6():
    return ('<a class="news"><span class="nw-o">Ohio Capital Journal</span>'
            '<span class="nw-h">Energy market watchers see Ohio electric bills rising as data center demand continues</span>'
            '<span class="nw-d">Dec. 11, 2025' + sup(1) + '</span></a>'
            '<div style="margin-top:calc(16px * var(--k))" role="img" aria-label="The average Ohio July electric bill: a gray bar for July 2025 and a red bar 12% longer for July 2026.">'
            + hbars([("July 2025", "", 100/112, "#8a8f98"), ("July 2026", "12% higher" + sup(2), 1, RED)], "Average Ohio home’s July electric bill", vw=128) + '</div>')

def pic_oh7():
    dc = datacenter(14, 70, 136, 102, bolt=False) + bill(104, 30, 46, 62, check=True)
    arrow = '<path d="M168 128 H200" stroke="#8a94a3" stroke-width="4" stroke-linecap="round"/><path d="M192 118 L204 128 L192 138" stroke="#8a94a3" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    return ('<div class="cond" role="img" aria-label="A data center holds its own big electric bill, checked off as paid. Next to it, Barb stands on green ground, relieved, with only her own small bill.">'
            '<svg viewBox="0 0 330 184" preserveAspectRatio="xMidYMax meet">' + '<rect x="0" y="174" width="160" height="4" rx="2" fill="#d9cfbf"/>' + dc
            + '<g transform="translate(206 0)">' + barb(62, holding=True, ground="#bfe8d3", bill_top=GREEN) + '</g></svg>'
            '<div class="caps"><span>Data centers pay for their own power</span><span>Barb stops paying for it</span></div></div>')

SCREENS = [
  {"h": "Data centers are buildings full of computers that run the internet and AI, and they use huge amounts of power" + sup(1),
   "pic": pic_oh1(), "p": "Ohio has about 200 of them, the fifth most of any state." + sup(1),
   "btn": "What’s happened to bills", "src": [OCC]},
  {"fit": True, "h": "The average Ohio home electric bill is up more than half since 2019" + sup(1),
   "pic": pic_oh2(), "p": "That’s about $660 more a year, based on data from the state’s utility regulators." + sup(1),
   "btn": "Meet Barb, who pays one of those bills", "src": [PF]},
  {"h": "Barb, a retired bus driver in Lima, pays more for power every year" + sup(1),
   "pic": pic_oh3(), "p": "Imagine Barb living on her pension. Like the average Ohio home, her July bill was 12% higher than last July’s." + sup(1),
   "btn": "Why bills went up", "src": [SIG]},
  {"fit": True, "h": "Data centers are the single biggest driver of the grid’s rising costs" + sup(1),
   "pic": pic_oh4(), "p": "PJM runs the power grid for Ohio and nearby states. Its watchdog found that 45% of what the grid charged over three years to keep enough power plants ready came from data centers." + sup(1),
   "btn": "What Maya’s opponent wants", "src": [IMM]},
  {"fit": True, "h": "Maya’s Republican opponent wants to leave it up to each state to make data centers pay" + sup(1, 2),
   "pic": pic_oh5(), "p": "His bill asks each state to consider it, but no state has to." + sup(1, 2) + " It got 57 Senate votes, 3 short of the 60 it needed." + sup(2),
   "btn": "What the news found", "src": [HUS, RC]},
  {"fit": True, "h": "Experts expect Ohio bills to keep rising as data centers keep coming" + sup(1),
   "pic": pic_oh6(), "p": "This July, average bills set records in Cleveland, Dayton and Akron." + sup(2),
   "btn": "Maya’s plan for bills like Barb’s", "src": [OCJ, SIG]},
  {"h": "Maya will require data centers to pay their full power costs, so families like Barb’s don’t" + sup(1),
   "pic": pic_oh7(), "p": "In her words: “I’ll require the data centers to pay the full cost of their own electricity, not you.”" + sup(1),
   "btn": "Practice it at a door", "src": [FOX]},
]
