# Builds ab1.html: Georgia's "Bri in the coverage gap" screen in two looks (A/B round 1). Same words, same picture.
import pathlib, sys
here = pathlib.Path(__file__).parent
photo = pathlib.Path(sys.argv[1]).read_text().strip()
SKIN = {"ana": "#9a6644", "bri": "#8a5a3c", "dee": "#a8714d"}
SHIRT = {"ana": "#3f7f8c", "bri": "#d99a2b", "dee": "#3a5a9b"}
HAIR = "#2a1d17"

def woman(cx, who, hand):  # hand: +1 umbrella in right hand, -1 left, 0 none
    s, t = SKIN[who], SHIRT[who]
    g = []
    g.append(f'<rect x="{cx-9}" y="148" width="7.5" height="30" rx="3.5" fill="#2f2a33"/><rect x="{cx+1.5}" y="148" width="7.5" height="30" rx="3.5" fill="#2f2a33"/>')
    g.append(f'<rect x="{cx-14}" y="80" width="28" height="26" rx="10" fill="{HAIR}"/>')
    g.append(f'<path d="M{cx-15} 110 Q{cx} 99 {cx+15} 110 L{cx+20} 152 L{cx-20} 152 Z" fill="{t}"/>')
    g.append(f'<rect x="{cx-3.5}" y="93" width="7" height="11" fill="{s}"/>')
    g.append(f'<circle cx="{cx}" cy="84" r="13.5" fill="{HAIR}"/><circle cx="{cx}" cy="87" r="11.2" fill="{s}"/>')
    g.append(f'<path d="M{cx-11.6} 86 Q{cx-9} 72 {cx+2} 73 Q{cx+11} 74 {cx+11.8} 85 Q{cx+3} 79 {cx-11.6} 86 Z" fill="{HAIR}"/>')
    def arm(sx, ex, ey):
        return f'<path d="M{sx} 111 L{ex} {ey}" stroke="{t}" stroke-width="7.5" stroke-linecap="round"/><path d="M{sx} 111 L{ex} {ey}" stroke="rgba(0,0,0,.18)" stroke-width="7.5" stroke-linecap="round"/><circle cx="{ex}" cy="{ey+1}" r="3.6" fill="{s}"/>'
    if hand == 0:
        g.append(arm(cx-12, cx-17, 141) + arm(cx+12, cx+17, 141))
    else:
        ux = cx + 10*hand
        g.append(f'<path d="M{ux} 50 L{ux} 130 Q{ux} 137 {ux-6*hand} 136" stroke="#4a4148" stroke-width="2.6" fill="none" stroke-linecap="round"/>')
        g.append(f'<path d="M{ux-44} 52 Q{ux} 6 {ux+44} 52 Q{ux+33} 45 {ux+22} 52 Q{ux+11} 45 {ux} 52 Q{ux-11} 45 {ux-22} 52 Q{ux-33} 45 {ux-44} 52 Z" fill="#35b57c"/>')
        g.append(f'<path d="M{ux} 52 Q{ux-2} 26 {ux} 14" stroke="#2a9465" stroke-width="1.6" fill="none"/>')
        g.append(arm(cx-12*hand, cx-17*hand, 141) + arm(cx+12*hand, ux, 124))
    return "".join(g)

def rain(cx):
    c = f'<g fill="#a9b4bf"><circle cx="{cx-14}" cy="30" r="12"/><circle cx="{cx+2}" cy="23" r="15"/><circle cx="{cx+17}" cy="31" r="11"/><rect x="{cx-24}" y="30" width="50" height="12" rx="6"/></g>'
    d = "".join(f'<path d="M{cx+dx} {y} l-3 9" stroke="#6f9cc6" stroke-width="2.4" stroke-linecap="round"/>' for dx, y in [(-22,54),(-8,52),(8,55),(22,53),(-24,70),(-16,64),(18,66),(25,74),(-26,86),(26,90),(-21,100),(22,104)])
    return c + d

def cell(who, name, pay, status, hand, bri=False):
    art = (f'<ellipse cx="55" cy="179" rx="30" ry="5" fill="#9fb2c4" opacity=".55"/>' + rain(55) if bri else '') + woman(55, who, hand)
    return (f'<div class="c{" bri" if bri else ""}"><svg viewBox="0 0 110 184" preserveAspectRatio="xMidYMax meet" aria-hidden="true">{art}</svg>'
            f'<b>{name}</b><span>{pay}</span><em>{status}</em></div>')
pic = ('<div class="sis" role="img" aria-label="Three sisters stand in a row from lowest to highest pay. Ana and Dee each hold a green umbrella. Bri, in the middle, stands in the rain with none.">'
       + cell("ana", "Ana", "$7,000 a year", "Medicaid", 1)
       + cell("bri", "Bri", "$14,000 a year", "No health insurance", 0, True)
       + cell("dee", "Dee", "$45,000 a year", "Insurance from work", -1) + '</div>')
src = (here / (sys.argv[3] if len(sys.argv)>3 else "ab1-src.html")).read_text()
out = src.replace("PICTURE", pic).replace("MAYA_PHOTO", photo)
pathlib.Path(sys.argv[2]).write_text(out)
print("wrote", sys.argv[2], len(out))
