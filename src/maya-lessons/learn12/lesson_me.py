# Maine's Learn (v12): heating oil, in Georgia's look. Words approved by Robert (Nov 1).
# The voter is Dale (door11.js LOOKS2.dale): a sawmill worker in Millinocket, beard, flannel.
from build_learn import woman, sup, GREEN, RED

SKIN, SHADE, HAIR, SHIRT, SHIRT2 = "#E6B994", "#C8987A", "#8A5634", "#8A3F2F", "#6E3125"
PANTS = "#2f2a33"
OIL = "#e0892f"          # heat and the homes that burn oil
STEEL, STEEL2 = "#6b7480", "#555d68"
WALL, WLINE, DOORC, FRAME = "#D8C7AA", "#C7B493", "#2F4F3F", "#F5EEE0"   # Dale's house (door11.js HOME2.dale)
SNOW = "#ffffff"

def ssup(n, size=9):  # a superscript inside SVG text
    return f'<tspan baseline-shift="super" font-size="{size}" font-weight="700">{n}</tspan>'

# ---------- Dale: the same flat figure as woman(), with short hair, a beard and a flannel shirt ----------
def man(cx, hold=None):
    """hold: None, 'bill' (a paper bill in his right hand)"""
    g = [f'<rect x="{cx-9.5}" y="148" width="8" height="30" rx="3.5" fill="{PANTS}"/><rect x="{cx+1.5}" y="148" width="8" height="30" rx="3.5" fill="{PANTS}"/>',
         f'<path d="M{cx-16} 111 Q{cx} 100 {cx+16} 111 L{cx+18} 152 L{cx-18} 152 Z" fill="{SHIRT}"/>',
         f'<g stroke="{SHIRT2}" stroke-width="2" opacity=".75"><path d="M{cx-16.4} 124 H{cx+16.4} M{cx-17.2} 138 H{cx+17.2}"/><path d="M{cx-6} 104 V152 M{cx+6} 104 V152"/></g>',
         f'<rect x="{cx-3.5}" y="93" width="7" height="11" fill="{SKIN}"/>',
         f'<ellipse cx="{cx-11.2}" cy="88" rx="2.4" ry="3.6" fill="{SHADE}"/><ellipse cx="{cx+11.2}" cy="88" rx="2.4" ry="3.6" fill="{SHADE}"/>',
         f'<circle cx="{cx}" cy="87" r="11.2" fill="{SKIN}"/>',
         f'<path d="M{cx-10.4} 90 Q{cx-9.6} 101.6 {cx} 102 Q{cx+9.6} 101.6 {cx+10.4} 90 Q{cx+6} 96.4 {cx} 96.4 Q{cx-6} 96.4 {cx-10.4} 90 Z" fill="{HAIR}"/>',
         f'<path d="M{cx-11.4} 85 Q{cx-11.6} 73 {cx} 73 Q{cx+11.6} 73 {cx+11.4} 85 Q{cx+8} 78.6 {cx} 78.6 Q{cx-8} 78.6 {cx-11.4} 85 Z" fill="{HAIR}"/>']
    def arm(sx, ex, ey):
        return (f'<path d="M{sx} 112 L{ex} {ey}" stroke="{SHIRT}" stroke-width="7.5" stroke-linecap="round"/>'
                f'<path d="M{sx} 112 L{ex} {ey}" stroke="rgba(0,0,0,.18)" stroke-width="7.5" stroke-linecap="round"/><circle cx="{ex}" cy="{ey+1}" r="3.6" fill="{SKIN}"/>')
    if hold == "bill":
        g.append(arm(cx-13, cx-18, 141) + arm(cx+13, cx+23, 126))
        g.append(f'<g transform="rotate(-8 {cx+28} 118)"><rect x="{cx+21}" y="104" width="17" height="22" rx="2" fill="#fff" stroke="#c9ced6" stroke-width="1.4"/>'
                 f'<rect x="{cx+24}" y="109" width="10" height="2.4" rx="1.2" fill="#c9ced6"/><rect x="{cx+24}" y="114" width="7" height="2.4" rx="1.2" fill="#c9ced6"/><rect x="{cx+24}" y="119" width="10" height="2.6" rx="1.3" fill="{RED}"/></g>')
        g.append(f'<circle cx="{cx+23}" cy="127" r="3.6" fill="{SKIN}"/>')
    else:
        g.append(arm(cx-13, cx-18, 141) + arm(cx+13, cx+18, 141))
    return "".join(g)

# ---------- shapes ----------
def flakes(pts):
    return "".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#c9d6e3"/>' for x, y, r in pts)

def tank(x, y, w, h, fill=None, legs=True):
    """A home oil tank on its side (a capsule). fill: list of (fraction, color) from the left."""
    r = h / 2
    t = ""
    if legs:
        t += f'<rect x="{x+w*.18}" y="{y+h-2}" width="5" height="{h*.32}" rx="1.5" fill="{STEEL2}"/><rect x="{x+w*.82-5}" y="{y+h-2}" width="5" height="{h*.32}" rx="1.5" fill="{STEEL2}"/>'
    cid = f"tk{int(x)}{int(y)}{int(w)}"
    t += f'<defs><clipPath id="{cid}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}"/></clipPath></defs>'
    t += f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{STEEL}"/>'
    if fill:
        cur = x
        parts = ""
        for frac, col in fill:
            parts += f'<rect x="{cur:.1f}" y="{y}" width="{w*frac:.1f}" height="{h}" fill="{col}"/>'
            cur += w * frac
        t += f'<g clip-path="url(#{cid})">{parts}</g>'
    t += f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="none" stroke="{STEEL2}" stroke-width="2.5"/>'
    t += f'<rect x="{x+w*.5-4}" y="{y-6}" width="8" height="7" rx="2" fill="{STEEL2}"/>'
    return t

def house_cut(ox, oy, s=1.0):
    """Dale's house cut open: a warm room upstairs, the oil tank and furnace in the basement. Ground at oy+118 (unscaled)."""
    g = (f'<g transform="translate({ox} {oy}) scale({s})">'
         # basement (below the ground line)
         '<rect x="6" y="118" width="148" height="62" fill="#e9e1d3"/>'
         '<rect x="0" y="116" width="160" height="5" rx="2" fill="#b9a98e"/>'
         + tank(18, 140, 70, 26) +
         '<rect x="110" y="132" width="30" height="40" rx="4" fill="#8a94a3"/><path d="M125 160 q-6 -8 0 -16 q6 8 0 16 Z" fill="' + OIL + '"/>'
         '<path d="M88 150 H110" stroke="#555d68" stroke-width="3"/><path d="M125 132 V112" stroke="#8a94a3" stroke-width="4"/>'
         # the room upstairs
         f'<rect x="10" y="52" width="140" height="64" fill="{WALL}"/>'
         '<rect x="18" y="58" width="124" height="58" fill="#fbf4e8"/>'
         '<g fill="#c4c9d0">' + "".join(f'<rect x="{96+i*8}" y="92" width="6" height="22" rx="2"/>' for i in range(5)) + '</g>'
         + "".join(f'<path d="M{100+i*10} 86 q-4 -5 0 -10 q4 -5 0 -10" stroke="{OIL}" stroke-width="2.4" fill="none" stroke-linecap="round"/>' for i in range(4)) +
         f'<rect x="30" y="68" width="34" height="28" rx="2" fill="{FRAME}"/><rect x="34" y="72" width="26" height="20" fill="#bcd3e6"/>'
         # roof with snow
         f'<path d="M0 54 L80 8 L160 54 Z" fill="#7d5a44"/><path d="M14 46 L80 8 L146 46 Q132 40 118 44 Q104 36 92 42 Q80 34 68 41 Q54 36 42 43 Q28 38 14 46 Z" fill="{SNOW}"/>'
         '</g>')
    return g

def mini_house(x, y, oil):
    """a small house, with an oil tank under it when it heats with oil"""
    wall = OIL if oil else "#c9cdd3"
    roof = "#b5641c" if oil else "#a7adb5"
    g = (f'<path d="M{x} {y+18} L{x+16} {y+4} L{x+32} {y+18} Z" fill="{roof}"/>'
         f'<rect x="{x+3}" y="{y+17}" width="26" height="20" fill="{wall}"/><rect x="{x+12}" y="{y+25}" width="8" height="12" fill="#fff" opacity=".85"/>')
    if oil:
        g += tank(x + 5, y + 42, 22, 9, legs=False)
    return g

# ---------- CSS for Maine's pictures (scoped under .g12, every size scales with --k) ----------
CSS = ('<style>'
       '.g12 .me-svg{display:block;width:100%;height:auto;max-height:calc(250px*var(--k));overflow:visible}'
       '.g12 .me-svg.sm{max-height:calc(200px*var(--k))}'
       '.g12 .me-svg .t{font:600 12.5px var(--sans);fill:var(--muted)}'
       '.g12 .me-svg .tb{font:800 15px var(--sans);fill:var(--ink)}'
       '.g12 .me-svg .tr{font:800 15px var(--sans);fill:var(--red)}'
       '.g12 .me-svg .tg{font:800 15px var(--sans);fill:var(--green-deep)}'
       '.g12 .me-caps{display:grid;grid-template-columns:1fr 1fr;gap:12px;text-align:center;margin-top:calc(8px*var(--k));font:600 calc(14px*var(--k))/1.3 var(--sans);color:var(--muted)}'
       '.g12 .me-caps span.g{color:var(--green-deep)} .g12 .me-caps span.r{color:var(--red)}'
       '.g12 .me-caps b{display:block;font:800 calc(18px*var(--k))/1.15 var(--sans);color:var(--ink)}'
       '.g12 .me-caps .g b{color:var(--green-deep)} .g12 .me-caps .r b{color:var(--red)}'
       '.g12 .me-bars{display:flex;flex-direction:column;gap:calc(10px*var(--k));margin-top:calc(14px*var(--k))}'
       '.g12 .me-bars .b{display:grid;grid-template-columns:1fr auto;row-gap:4px;column-gap:10px;align-items:center}'
       '.g12 .me-bars .b span{grid-column:1/-1;font:600 calc(14px*var(--k))/1.2 var(--sans);color:var(--muted)}'
       '.g12 .me-bars .t{height:calc(20px*var(--k))}'
       '.g12 .me-bars .t i{display:block;height:100%;border-radius:11px;background:#a7a29a}'
       '.g12 .me-bars .t i.mid{background:#d98b84} .g12 .me-bars .t i.r{background:var(--red)}'
       '.g12 .me-bars b{font:800 calc(19px*var(--k))/1 var(--sans);min-width:70px;text-align:right;color:var(--ink)}'
       '.g12 .me-bars b.r{color:var(--red)}'
       '.g12 #g12b:has(.me-svg,.me-bars){justify-content:space-between;padding-bottom:2.5px}'
       '</style>')

# ---------- the pictures ----------
def pic_me1():
    # Dale's kind of house cut open (tank in the basement, heat upstairs), next to ten Maine homes, five with an oil tank.
    snow = flakes([(22, 12, 2.2), (60, 4, 1.8), (150, 10, 2), (176, 30, 1.8), (196, 6, 2.2), (300, 14, 2), (250, 4, 1.8)])
    homes = "".join(mini_house(186 + (k % 5) * 28, 40 + (k // 5) * 66, k < 5) for k in range(10))
    return (CSS + '<svg class="me-svg" viewBox="0 0 330 208" role="img" aria-label="A house cut open: an oil tank and furnace in the basement, heat rising from a radiator upstairs, snow on the roof. Beside it, ten small houses: five orange ones have an oil tank under them.">'
            + snow + house_cut(4, 22, 1.0) + homes +
            '<text x="256" y="200" class="t" text-anchor="middle">Half of Maine homes</text></svg>')

def bills(x, y, n, col, w=36, h=20, gap=6):
    out = ""
    k = 0
    while n > 0:
        f = min(1, n)
        cid = f"bl{int(x)}{int(y)}{k}"
        bill = (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="{col}"/>'
                f'<rect x="{x+3}" y="{y+3}" width="{w-6}" height="{h-6}" rx="2" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.2"/>'
                f'<circle cx="{x+w/2}" cy="{y+h/2}" r="{h*.28}" fill="#fff" fill-opacity=".55"/>')
        if f < 1:
            bill = f'<defs><clipPath id="{cid}"><rect x="{x}" y="{y}" width="{w*f:.1f}" height="{h}"/></clipPath></defs><g clip-path="url(#{cid})">{bill}</g>'
        out += bill
        x += w + gap; n -= 1; k += 1
    return out

def jug(x, y, col):
    return (f'<path d="M{x+4} {y+8} Q{x+4} {y+2} {x+10} {y+2} H{x+22} Q{x+28} {y+2} {x+28} {y+8} V{y+34} Q{x+28} {y+38} {x+24} {y+38} H{x+8} Q{x+4} {y+38} {x+4} {y+34} Z" fill="{col}"/>'
            f'<rect x="{x+10}" y="{y-3}" width="8" height="6" rx="1.5" fill="{col}"/><path d="M{x+20} {y+4} q8 0 8 8" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>')

def bill_stack(cx, bottom, n, col, w=86, h=24, gap=5):
    """dollar bills stacked from the bottom, one per dollar; the top one cut to the fraction left"""
    out, k, y = "", 0, bottom
    while n > 0.02:
        f = min(1, n)
        top = y - h
        bill = (f'<rect x="{cx-w/2}" y="{top}" width="{w}" height="{h}" rx="3" fill="{col}"/>'
                f'<rect x="{cx-w/2+3}" y="{top+3}" width="{w-6}" height="{h-6}" rx="2" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.2"/>'
                f'<circle cx="{cx}" cy="{top+h/2}" r="{h*.34}" fill="#fff" fill-opacity=".6"/>'
                f'<text x="{cx}" y="{top+h/2+4.6}" text-anchor="middle" style="font:800 13px var(--sans);fill:{col}">$</text>')
        if f < 1:
            cid = f"bs{int(cx)}{k}"
            bill = f'<defs><clipPath id="{cid}"><rect x="{cx-w/2}" y="{y-h*f:.1f}" width="{w}" height="{h*f:.1f}"/></clipPath></defs><g clip-path="url(#{cid})">{bill}</g>'
            top = y - h * f
        out += bill
        y = top - gap; n -= 1; k += 1
    return out, y + gap

def pic_me2():
    # One gallon, then and now, paid in stacked dollar bills: about 3.3 bills a year ago, about 6 now (one bill = $1, drawn to scale).
    b = 200
    a, ta = bill_stack(92, b, 3.30, "#a7a29a")
    c, tc = bill_stack(238, b, 6.04, RED)
    return (CSS + '<svg class="me-svg" viewBox="0 0 330 234" role="img" aria-label="Two stacks of dollar bills, one bill per dollar. One gallon of heating oil a year ago: a stack of about three and a third bills. Now: a red stack of six, almost twice as tall.">'
            + a + c +
            f'<text x="92" y="{ta-8:.0f}" class="tb" text-anchor="middle">$3.30{ssup(2)}</text>'
            f'<text x="238" y="{tc-8:.0f}" class="tr" text-anchor="middle">$6.04{ssup(2)}</text>'
            f'<rect x="20" y="{b+3}" width="290" height="3" rx="1.5" fill="#c9ced6"/>'
            +
            f'<text x="99" y="{b+28}" class="t" text-anchor="middle">a gallon, Oct 2025</text>'
            f'<text x="245" y="{b+28}" class="t" text-anchor="middle">a gallon, Oct 2026</text>'
            '</svg>')

def pic_me3():
    # Dale outside his house in the snow, holding the bill; beside him, his tank and what one fill costs.
    snow = flakes([(14, 20, 2), (40, 6, 1.8), (90, 16, 2.2), (150, 8, 2), (200, 22, 1.8), (240, 6, 2), (300, 18, 2.2), (322, 40, 1.8), (120, 40, 1.8)])
    hs = ('<g transform="translate(190 34)">'
          f'<path d="M-6 50 L66 6 L138 50 Z" fill="#7d5a44"/><path d="M6 43 L66 6 L126 43 Q112 37 100 41 Q88 33 76 39 Q64 32 52 38 Q38 33 26 40 Q16 36 6 43 Z" fill="{SNOW}"/>'
          f'<rect x="4" y="48" width="124" height="96" fill="{WALL}"/>' + "".join(f'<path d="M4 {60+i*14} H128" stroke="{WLINE}" stroke-width="2"/>' for i in range(6)) +
          f'<rect x="20" y="78" width="38" height="66" fill="{FRAME}"/><rect x="25" y="83" width="28" height="61" fill="{DOORC}"/><circle cx="48" cy="114" r="2.4" fill="#f2c14e"/>'
          f'<rect x="76" y="70" width="36" height="30" fill="{FRAME}"/><rect x="80" y="74" width="28" height="22" fill="#bcd3e6"/>'
          '<rect x="-4" y="142" width="140" height="6" rx="3" fill="#dfe3e8"/></g>')
    dale = '<g transform="translate(14 0)">' + man(55, "bill") + '</g>'
    tk = tank(98, 136, 74, 28)
    return (CSS + '<svg class="me-svg" viewBox="0 0 330 186" role="img" aria-label="Dale, a bearded man in a red flannel shirt, stands in the snow holding a bill. Next to him is his oil tank, and behind it his house.">'
            + snow + hs + '<rect x="0" y="176" width="330" height="8" rx="4" fill="#edf1f5"/>' + dale + tk +
            f'<text x="141" y="126" class="tr" text-anchor="middle">$1,660{ssup("1,2")}</text>'
            '<text x="141" y="108" class="t" text-anchor="middle">One fill:</text>'
            '</svg>')

def pic_me4():
    # One fill of the tank, drawn to scale: the average heating aid (green) covers about 42% of it; the rest (red) is not covered.
    full, aid = 1660, 700
    f = aid / full
    tk = tank(14, 26, 302, 74, fill=[(f, GREEN), (1 - f, "#efc2bd")])
    lab = (f'<text x="{14 + 302*f/2:.0f}" y="69" class="tb" text-anchor="middle" fill="#fff" style="fill:#fff">$700{ssup(2)}</text>'
           f'<text x="{14 + 302*f + 302*(1-f)/2:.0f}" y="69" class="tr" text-anchor="middle">$960{ssup("1,2")}</text>')
    return (CSS + '<svg class="me-svg sm" viewBox="0 0 330 128" role="img" aria-label="An oil tank drawn as one fill, about $1,660. The green part, about $700, is the average heating aid, less than half the tank. The red part, about $960, is not covered.">'
            f'<text x="165" y="12" class="t" text-anchor="middle">One fill of a 275-gallon tank: about $1,660{ssup(1)}</text>'
            + tk + lab + '</svg>'
            '<div class="me-caps"><span class="g"><b>Covered</b>by the average heating aid</span><span class="r"><b>Not covered</b>the family pays</span></div>')

def calendar(x, y, cell, filled):
    out = f'<rect x="{x-6}" y="{y-20}" width="{7*cell+10}" height="{5*cell+28}" rx="8" fill="#fff" stroke="#c9ced6" stroke-width="2"/><rect x="{x-6}" y="{y-20}" width="{7*cell+10}" height="14" rx="7" fill="#8a94a3"/><rect x="{x-6}" y="{y-12}" width="{7*cell+10}" height="6" fill="#8a94a3"/>'
    for d in range(31):
        cx, cy = x + (d % 7) * cell, y + (d // 7) * cell
        col = OIL if d < filled else "#e3e6ea"
        out += f'<rect x="{cx}" y="{cy}" width="{cell-3}" height="{cell-3}" rx="2.5" fill="{col}"/>'
    return out

def pic_me5():
    # Left: heating aid money arriving early (an envelope with a fast arrow, before the snow). Right: one barrel and a month in which it lasts 2 or 3 days.
    env = ('<g transform="translate(20 46)">'
           '<path d="M0 26 H24 M-6 40 H20 M4 54 H26" stroke="#c9ced6" stroke-width="4" stroke-linecap="round"/>'
           f'<rect x="34" y="14" width="96" height="62" rx="6" fill="#fff" stroke="#8a94a3" stroke-width="2.5"/><path d="M36 17 L82 50 L128 17" stroke="#8a94a3" stroke-width="2.5" fill="none" stroke-linejoin="round"/>'
           f'<circle cx="82" cy="64" r="15" fill="{GREEN}"/><text x="82" y="70" text-anchor="middle" style="font:800 17px var(--sans);fill:#fff">$</text></g>')
    barrel = (f'<g transform="translate(176 54)"><rect x="0" y="0" width="40" height="56" rx="7" fill="{STEEL}"/><rect x="0" y="14" width="40" height="4" fill="{STEEL2}"/><rect x="0" y="38" width="40" height="4" fill="{STEEL2}"/>'
              f'<ellipse cx="20" cy="2" rx="20" ry="4" fill="{STEEL2}"/></g>')
    cal = calendar(232, 52, 13, 3)
    return (CSS + '<svg class="me-svg sm" viewBox="0 0 330 140" role="img" aria-label="Left: an envelope of heating aid money racing in early. Right: a barrel of oil from the reserve next to a calendar month with only three days filled in.">'
            + env + barrel + cal + '</svg>'
            f'<div class="me-caps"><span><b>$36.7 million{sup(3)}</b>in heating aid, sent early</span><span><b>2 or 3 days{sup(4)}</b>of Northeast supply from the reserve{sup(2)}</span></div>')

def pic_me6():
    return (CSS + '<a class="news"><span class="nw-o">Bangor Daily News</span>'
            '<span class="nw-h">Maine posts record-breaking heating oil prices amid Iran War</span>'
            '<span class="nw-d">Sept 28, 2026, by Maine Public' + sup(1) + '</span></a>'
            '<div class="me-bars" role="img" aria-label="Maine heating oil prices: $3.82 a gallon before the war, $4.97 three weeks in, and a record $6.04 in October.">'
            f'<div class="b"><span>Feb 23, before the war</span><div class="t"><i style="width:{3.82/6.04*100:.1f}%"></i></div><b>$3.82{sup(3)}</b></div>'
            f'<div class="b"><span>March 16, three weeks into the war</span><div class="t"><i class="mid" style="width:{4.97/6.04*100:.1f}%"></i></div><b>$4.97{sup(3)}</b></div>'
            f'<div class="b"><span>Oct 19, a record</span><div class="t"><i class="r" style="width:100%"></i></div><b class="r">$6.04{sup(4)}</b></div></div>')

def pic_me7():
    # Left: the oil price coming down once the war ends (a barrel with a green arrow down). Right: Dale beside his tank, filling up green with more heating aid.
    barrel = (f'<g transform="translate(40 66)"><rect x="0" y="0" width="52" height="74" rx="9" fill="{STEEL}"/><rect x="0" y="18" width="52" height="5" fill="{STEEL2}"/><rect x="0" y="50" width="52" height="5" fill="{STEEL2}"/>'
              f'<ellipse cx="26" cy="3" rx="26" ry="5" fill="{STEEL2}"/>'
              f'<path d="M30 28 H58 L66 37 L58 46 H30 Z" fill="#fff" stroke="#8a94a3" stroke-width="2"/><text x="44" y="42.5" text-anchor="middle" style="font:800 13px var(--sans);fill:var(--ink)">$</text></g>'
              f'<path d="M116 52 V128" stroke="{GREEN}" stroke-width="7" stroke-linecap="round"/><path d="M102 114 L116 132 L130 114" stroke="{GREEN}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
    dale = '<g transform="translate(166 0)">' + man(55) + '</g>'
    tk = tank(234, 128, 80, 30, fill=[(0.82, GREEN)])
    arrow = f'<path d="M274 116 V92" stroke="{GREEN}" stroke-width="5" stroke-linecap="round"/><path d="M265 101 L274 90 L283 101" stroke="{GREEN}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    return (CSS + '<svg class="me-svg sm" viewBox="0 0 330 186" role="img" aria-label="Left: a barrel of oil with a green arrow pointing down, for lower prices. Right: Dale beside his oil tank, now filling with green heating aid.">'
            + barrel + dale + '<rect x="160" y="176" width="170" height="8" rx="4" fill="#bfe8d3"/>' + tk + arrow + '</svg>'
            '<div class="me-caps"><span class="g">End the war driving oil prices</span><span class="g">More heating aid for Maine</span></div>')

# ---------- the cover's three things ----------
HOUSE_MINI = ('<svg viewBox="0 0 160 184" aria-hidden="true">' + house_cut(0, 2, 1.0) + '</svg>')
DALE_WARM = ('<svg viewBox="0 0 150 184" aria-hidden="true"><ellipse cx="75" cy="179" rx="72" ry="6" fill="#bfe8d3"/>' + man(40) +
             tank(68, 146, 72, 26, fill=[(0.85, GREEN)]) + '</svg>')
BARREL_MINI = (f'<svg viewBox="0 0 110 160" aria-hidden="true"><g transform="translate(22 30)"><rect x="0" y="0" width="66" height="96" rx="11" fill="{STEEL}"/><rect x="0" y="24" width="66" height="6" fill="{STEEL2}"/><rect x="0" y="66" width="66" height="6" fill="{STEEL2}"/>'
               f'<ellipse cx="33" cy="4" rx="33" ry="6" fill="{STEEL2}"/></g></svg>')

GUIDE = ["Maine Department of Energy Resources, Winter Heating Guide 2026-2027: about half of Maine households heat mainly with oil, the most of any state", "https://www.maine.gov/energy/sites/maine.gov.energy/files/inline-files/Winter%20Heating%20Guide%202026-2027.pdf"]
GOV50 = ["Maine’s governor’s office, Sept 30, 2025: 50% of Maine households relied on heating oil in 2024", "https://www.maine.gov/governor/mills/index.php/news/governor-mills-announces-reduction-heating-oil-reliance-maine-2025-09-30"]
DOER = ["Maine Department of Energy Resources, weekly heating fuel prices: $6.05 a gallon on Oct 26, 2026", "https://www.maine.gov/energy/fuel_prices/index.shtml"]
PENBAY = ["Penbay Pilot, Oct 22, 2026, from the state’s weekly survey: $6.04 a gallon on Oct 19, a record and up 83% from October 2025 (about $3.30 then)", "https://www.penbaypilot.com/article/heating-oil-maine-reaches-statewide-average-604-gallon/275713"]
MILLS = ["Maine’s governor’s letter to Congress, Oct 2, 2026: a standard 275-gallon tank costs about $740 more to fill than a year ago", "https://www.maine.gov/governor/mills/sites/maine.gov.governor.mills/files/2026-10/JTM%20to%20Delegation%20-%20LIHEAP%2010-02-2026.pdf"]
FILL = ["Our calculation: 275 gallons at $6.04 a gallon (the Oct 19 price, Penbay Pilot, Oct 22, 2026) is about $1,660 for one fill", "https://www.penbaypilot.com/article/heating-oil-maine-reaches-statewide-average-604-gallon/275713"]
PH = ["Portland Press Herald, Oct 8, 2026: MaineHousing set this winter’s average heating aid award at about $700", "https://www.pressherald.com/2026/10/08/maine-heating-fund-using-leftover-money-wont-go-as-far-this-winter/"]
HEAP = ["MaineHousing, the Home Energy Assistance Program (HEAP)", "https://www.mainehousing.org/heap"]
BDN9 = ["Bangor Daily News, Oct 9, 2026: about $36.7 million in heating aid released after her opponent urged the administration to speed it up", "https://www.bangordailynews.com/2026/10/09/politics/maine-heating-assistance-liheap-release/"]
DOE = ["US Department of Energy, Oct 2026: up to 315,000 barrels from the Northeast Home Heating Oil Reserve", "https://www.energy.gov/node/4860871"]
COL2 = ["Her opponent’s office: the release from the reserve", "https://www.collins.senate.gov/newsroom/administration-responds-to-senators-collins-and-king-by-releasing-home-heating-oil-from-northeast-reserve"]
MPOCT = ["Maine Public, Oct 21, 2026: Maine’s two senators took credit for urging the release", "https://www.vermontpublic.org/2026-10-21/feds-to-release-315-000-barrels-from-heating-oil-reserve"]
TT10 = ["NBC 10 WJAR, Oct 22, 2026: “two or three days’ worth of supply for the Northeast,” and not a big factor in lowering prices", "https://turnto10.com/news/local/story/experts-question-impact-of-federal-oil-release-on-soaring-home-heating-costs-homeowners-bills-conflict-customers-northeast-october-22-2026"]
BDNOIL = ["Bangor Daily News, Sept 28, 2026, by Maine Public", "https://www.bangordailynews.com/2026/09/28/business/business-energy/maine-heating-oil-prices-record-high-iran-war/"]
MPSEP = ["Maine Public, Sept 29, 2026: a record $6.02 a gallon amid market turmoil from the US war with Iran", "https://www.vermontpublic.org/2026-09-29/as-heating-oil-prices-hit-record-highs-mainers-are-eyeing-winter-with-growing-trepidation"]
MBIZ = ["Mainebiz, March 2026, from the state’s weekly survey: $3.82 on Feb 23, before the war began Feb 28, and $4.97 on March 16, up about 30%", "https://mainebiz.biz/article/maine-heating-oil-prices-up-30-since-iran-conflict/"]
JK = ["Maya’s plan (her campaign)", "https://www.jacksonformaine.com/news/jackson-hits-the-airwaves-directing-mainers-to-heating-assistance-as-energy-costs-skyrocket"]
DAFS = ["Maine DAFS, 2023: $450 winter energy relief checks", "https://maine.gov/dafs/news/mills-administration-announces-all-450-winter-energy-relief-checks-have-been-mailed"]

THREE = ('<div class="three">'
         f'<div class="k">{HOUSE_MINI}<p>Half of Maine heats with oil, and it’s about $6 a gallon{sup(1, 2)}</p></div>'
         f'<div class="k">{DALE_WARM}<p>Maya wants to end the war driving prices and get more heating aid{sup(3)}</p></div>'
         f'<div class="k">{BARREL_MINI}<p>Her opponent backed early aid and a small release from the oil reserve{sup(4, 5)}</p></div></div>')

COVER = {"h": "Three foundational things we want you to know about heating oil",
         "pic": THREE, "plain": True, "p": "", "btn": "How Maine heats its homes",
         "src": [GUIDE, DOER, JK, BDN9, MPOCT]}

SCREENS = [
  {"h": "Half of Maine heats with oil, burned from a tank in the basement all winter" + sup(1, 2),
   "pic": pic_me1(), "p": "Heating oil is a fuel a truck delivers to a tank at home, where a furnace burns it for heat. No state relies on it more than Maine.",
   "btn": "What a gallon costs now", "src": [GUIDE, GOV50]},
  {"h": "Heating oil is about $6 a gallon, up about 80% in a year" + sup(1, 2),
   "pic": pic_me2(), "p": "Filling a standard 275-gallon tank now costs about $740 more than a year ago." + sup(3),
   "btn": "Meet Dale, who heats with oil", "src": [DOER, PENBAY, MILLS]},
  {"h": "Dale, a sawmill worker in Millinocket, is worried about what this winter will cost",
   "pic": pic_me3(), "p": "Imagine Dale, a Maine voter who heats his home with oil. One fill of his 275-gallon tank now costs about $1,660, and winter has barely started." + sup(1, 2),
   "btn": "What help exists", "src": [MILLS, FILL]},
  {"h": "Heating aid covers less than half of one tank" + sup(1, 2),
   "pic": pic_me4(), "p": "Heating aid is federal money that helps families with low incomes pay for heat. Maine’s program is called HEAP." + sup(3),
   "btn": "What Maya’s opponent did", "src": [FILL, PH, HEAP]},
  {"h": "Maya’s Republican opponent backed early heating aid and a small release from the oil reserve" + sup(1, 3),
   "pic": pic_me5(), "p": "The reserve is heating oil the federal government stores for emergencies. Experts say this release won’t do much to lower prices." + sup(4),
   "btn": "What the news found", "src": [COL2, DOE, BDN9, TT10]},
  {"fit": True, "h": "Maine’s heating oil hit a record price this fall, pushed up by the war with Iran" + sup(1, 2),
   "pic": pic_me6(), "p": "Prices jumped about 30% in the first three weeks of the war, which began in February." + sup(3),
   "btn": "Maya’s plan for families like Dale’s", "src": [BDNOIL, MPSEP, MBIZ, PENBAY]},
  {"h": "Maya wants to end the war driving oil prices and get Maine more heating aid" + sup(1),
   "pic": pic_me7(), "p": "In 2023, as head of Maine’s state Senate, she helped pass $450 winter energy relief checks for Mainers." + sup(2),
   "btn": "Practice it at a door", "src": [JK, DAFS]},
]
