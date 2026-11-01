# Builds georgia-learn.html: Georgia's seven Learn screens in the look Robert picked in A/B rounds 1 and 2
# (Duolingo's lesson screen, the segmented story bar, no photo row). Words: claude/campaign-demos/georgia-words-list.md.
# Usage: python3 build_learn.py <out.html>
import json, pathlib, sys
here = pathlib.Path(__file__).parent

SKIN = {"ana": "#9a6644", "bri": "#8a5a3c", "dee": "#a8714d", "mom": "#7b4f35", "k1": "#7b4f35", "k2": "#7b4f35"}
SHIRT = {"ana": "#3f7f8c", "bri": "#d99a2b", "dee": "#3a5a9b", "mom": "#8a5fa8", "k1": "#e07b5f", "k2": "#5fa88a"}
HAIR = "#2a1d17"
GREEN, RED = "#35b57c", "#b3261e"

def woman(cx, who, hand):  # hand: +1 umbrella in right hand, -1 left, 0 none
    s, t = SKIN[who], SHIRT[who]
    g = [f'<rect x="{cx-9}" y="148" width="7.5" height="30" rx="3.5" fill="#2f2a33"/><rect x="{cx+1.5}" y="148" width="7.5" height="30" rx="3.5" fill="#2f2a33"/>',
         f'<rect x="{cx-14}" y="80" width="28" height="26" rx="10" fill="{HAIR}"/>',
         f'<path d="M{cx-15} 110 Q{cx} 99 {cx+15} 110 L{cx+20} 152 L{cx-20} 152 Z" fill="{t}"/>',
         f'<rect x="{cx-3.5}" y="93" width="7" height="11" fill="{s}"/>',
         f'<circle cx="{cx}" cy="84" r="13.5" fill="{HAIR}"/><circle cx="{cx}" cy="87" r="11.2" fill="{s}"/>',
         f'<path d="M{cx-11.6} 86 Q{cx-9} 72 {cx+2} 73 Q{cx+11} 74 {cx+11.8} 85 Q{cx+3} 79 {cx-11.6} 86 Z" fill="{HAIR}"/>']
    def arm(sx, ex, ey):
        return (f'<path d="M{sx} 111 L{ex} {ey}" stroke="{t}" stroke-width="7.5" stroke-linecap="round"/>'
                f'<path d="M{sx} 111 L{ex} {ey}" stroke="rgba(0,0,0,.18)" stroke-width="7.5" stroke-linecap="round"/><circle cx="{ex}" cy="{ey+1}" r="3.6" fill="{s}"/>')
    if hand == 0:
        g.append(arm(cx-12, cx-17, 141) + arm(cx+12, cx+17, 141))
    else:
        ux = cx + 19*hand
        g.append(umbrella(ux, 52, 40, 122))
        g.append(arm(cx-12*hand, cx-17*hand, 141) + arm(cx+12*hand, ux, 118))
    return "".join(g)

def umbrella(ux, top, half, handle_to=130):
    return (f'<path d="M{ux} {top-2} L{ux} {handle_to} Q{ux} {handle_to+7} {ux-6} {handle_to+6}" stroke="#4a4148" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
            f'<path d="M{ux-half} {top} Q{ux} {top-46} {ux+half} {top} Q{ux+half*.75} {top-7} {ux+half/2} {top} Q{ux+half/4} {top-7} {ux} {top} Q{ux-half/4} {top-7} {ux-half/2} {top} Q{ux-half*.75} {top-7} {ux-half} {top} Z" fill="{GREEN}"/>'
            f'<path d="M{ux} {top} Q{ux-2} {top-26} {ux} {top-38}" stroke="#2a9465" stroke-width="1.6" fill="none"/>')

def rain(cx, top=18, w=50, drops=None):
    c = f'<g fill="#a9b4bf"><circle cx="{cx-14}" cy="{top+12}" r="12"/><circle cx="{cx+2}" cy="{top+5}" r="15"/><circle cx="{cx+17}" cy="{top+13}" r="11"/><rect x="{cx-24}" y="{top+12}" width="50" height="12" rx="6"/></g>'
    drops = drops or [(-22,54),(-8,52),(8,55),(22,53),(-24,70),(-16,64),(18,66),(25,74),(-26,86),(26,90),(-21,100),(22,104)]
    return c + "".join(f'<path d="M{cx+dx} {y} l-3 9" stroke="#6f9cc6" stroke-width="2.4" stroke-linecap="round"/>' for dx, y in drops)

def kid(cx, who, scale=.6):  # a child: the same figure, scaled, feet on the same ground line (y 178)
    tx, ty = cx - 55*scale, 178 - 178*scale
    return f'<g transform="translate({tx:.1f} {ty:.1f}) scale({scale})">{woman(55, who, 0)}</g>'

def cell(who, name, pay, status, hand, cls=""):
    art = ""
    if cls == "bri": art = '<ellipse cx="55" cy="179" rx="30" ry="5" fill="#9fb2c4" opacity=".55"/>' + rain(55)
    if cls == "bri now": art = '<ellipse cx="55" cy="179" rx="34" ry="6" fill="#bfe8d3"/>'
    art += woman(55, who, hand)
    return (f'<div class="c {cls}"><svg viewBox="0 0 110 184" preserveAspectRatio="xMidYMax meet" aria-hidden="true">{art}</svg>'
            f'<b>{name}</b><span>{pay}</span><em>{status}</em></div>')

def sup(*n): return '<span class="sup">' + ",".join(str(x) for x in n) + '</span>'

# ---------- the pictures ----------
def pic_ga1():
    # A mom of two under a small umbrella on the green sliver of an income bar; rain over the rest.
    x0, x1, w8 = 14, 316, 14 + (316-14)*8/30
    fam = kid(20, "k1") + kid(96, "k2") + woman(54, "mom", 1)
    rest = rain(205, top=34, drops=[(-30,78),(-14,74),(2,80),(18,76),(34,79),(-24,98),(-6,102),(12,96),(28,104),(44,92),(-38,96)])
    return ('<svg class="wide" viewBox="0 0 330 222" role="img" aria-label="An income bar from $0 to $30,000 a year. Only the first sliver, under about $8,000, is green for Medicaid, and a mom with two kids stands under an umbrella there. Rain falls over the rest.">'
            + fam + rest +
            f'<rect x="{x0}" y="186" width="{x1-x0}" height="14" rx="7" fill="#dfe3e8"/>'
            f'<path d="M{x0+7} 186 H{w8} V200 H{x0+7} A7 7 0 0 1 {x0+7} 186 Z" fill="{GREEN}"/>'
            f'<text x="{x0}" y="217" class="t">$0</text><text x="{w8:.0f}" y="217" class="t g" text-anchor="middle">$8,000</text><text x="{x1}" y="217" class="t" text-anchor="end">$30,000 a year</text>'
            f'<text x="205" y="150" class="t m" text-anchor="middle">Earn more:</text><text x="205" y="166" class="t m" text-anchor="middle">no Medicaid</text>'
            '</svg>')

def pic_ga2():
    return ('<div class="sis" role="img" aria-label="Three sisters stand in a row from lowest to highest pay. Ana and Dee each hold a green umbrella. Bri, in the middle, stands in the rain with none.">'
            + cell("ana", "Ana", "$7,000 a year", "Medicaid", -1)
            + cell("bri", "Bri", "$14,000 a year", "No health insurance", 0, "bri")
            + cell("dee", "Dee", "$45,000 a year", "Insurance from work", 1) + '</div>')

PERSON = lambda c: f'<svg viewBox="0 0 16 22" aria-hidden="true"><circle cx="8" cy="5" r="4.2" fill="{c}"/><path d="M1.5 22 V15 Q1.5 10 8 10 Q14.5 10 14.5 15 V22 Z" fill="{c}"/></svg>'
BRI_MINI = ('<svg class="bri-mini" viewBox="0 0 110 184" aria-hidden="true">' + rain(55) + woman(55, "bri", 0) + '</svg>')
def pic_ga3():
    red, gray = PERSON(RED), PERSON("#a7a29a")
    return ('<div class="count" role="img" aria-label="20 red figures for about 200,000 Georgia adults like Bri, next to 15 gray figures for the 148,000 people who live in Savannah.">'
            f'<div class="row"><div class="lab">{BRI_MINI}<b class="r">About 200,000</b><span>Georgia adults like Bri</span></div><div class="ppl">{red*20}</div></div>'
            f'<div class="row"><div class="lab"><b>About 148,000{sup(2)}</b><span>Everyone in Savannah</span></div><div class="ppl">{gray*15}</div></div>'
            '<small>Each figure is 10,000 people</small></div>')

STATES = "AK AZ AR CA CO CT DE DC HI ID IL IN IA KY LA ME MD MA MI MN MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SD UT VT VA WA WV".split()
NOT = "AL FL GA KS MS SC TN TX WI WY".split()
def pic_ga4():
    tiles = "".join(f'<i class="y">{s}</i>' for s in STATES) + "".join(f'<i class="{"ga" if s == "GA" else "n"}">{s}</i>' for s in NOT)
    return ('<div class="states" role="img" aria-label="51 squares: 41 green for the 40 states and DC that accepted Medicaid expansion, 10 gray for the states that haven\'t, with Georgia outlined in red.">'
            f'<div class="tiles">{tiles}</div>'
            f'<div class="key"><span><i class="y"></i>Accepted Medicaid expansion</span><span><i class="n"></i>Haven\'t accepted</span><span><i class="ga"></i>Georgia, where Bri lives</span></div></div>')

def pic_ga5():
    card = ('<rect x="20" y="44" width="104" height="128" rx="12" fill="#fff" stroke="#c9ced6" stroke-width="2.5"/>'
            '<circle cx="72" cy="84" r="22" fill="#eef1f5" stroke="#8a94a3" stroke-width="2.5"/><path d="M72 70 V84 L82 90" stroke="#3c3c3c" stroke-width="3" fill="none" stroke-linecap="round"/>'
            + "".join(f'<rect x="38" y="{y}" width="12" height="12" rx="3" fill="{GREEN}"/><path d="M41 {y+6} l3 3 l5 -6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="56" y="{y+4}" width="50" height="5" rx="2.5" fill="#d7dbe1"/>' for y in (116, 136, 154)))
    arrow = '<path d="M140 110 H178" stroke="#8a94a3" stroke-width="4" stroke-linecap="round"/><path d="M170 100 L182 110 L170 120" stroke="#8a94a3" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    right = '<g transform="translate(190 0)">' + woman(64, "bri", 1) + '</g>'
    return ('<div class="cond" role="img" aria-label="A timecard with a clock and checked boxes, an arrow, then a woman under a green umbrella: health insurance only after reporting work hours.">'
            f'<svg viewBox="0 0 330 184" preserveAspectRatio="xMidYMax meet">{card}{arrow}{right}</svg>'
            '<div class="caps"><span>Report 80 hours a month of work, school or volunteering' + sup(3) + '</span><span>Then get health insurance</span></div></div>')

def pic_ga6():
    return ('<a class="news"><span class="nw-o">KFF Health News</span>'
            '<span class="nw-h">Georgia’s Medicaid work requirements costing taxpayers millions despite low enrollment</span>'
            '<span class="nw-d">March 2024' + sup(1) + '</span></a>'
            '<div class="bars" role="img" aria-label="The state expected about 100,000 people in Georgia Pathways in its first year. After three years, 18,527 are enrolled.">'
            '<div class="b"><span>The state expected in year one</span><div class="t"><i class="exp"></i></div><b>100,000' + sup(2) + '</b></div>'
            '<div class="b"><span>Enrolled after three years</span><div class="t"><i class="got"></i></div><b class="g">18,527' + sup(3) + '</b></div></div>')

def pic_ga7():
    return ('<div class="sis" role="img" aria-label="The same three sisters, now all three under green umbrellas, Bri included.">'
            + cell("ana", "Ana", "$7,000 a year", "Medicaid", -1)
            + cell("bri", "Bri", "$14,000 a year", "Medicaid, under Maya’s plan", 1, "bri now")
            + cell("dee", "Dee", "$45,000 a year", "Insurance from work", 1) + '</div>')

DFCS = ["Georgia DFCS, 2026 family Medicaid limits: $662 a month for a parent in a family of three (about $7,900 a year)", "https://pamms.dhs.ga.gov/dfcs/medicaid/appendix-a2/2026-family-limits/"]
HHS = ["HHS 2026 poverty guidelines: help buying a plan starts at the poverty line, $27,320 a year for a family of three", "https://aspe.hhs.gov/poverty-guidelines"]
SCREENS = [
  {"h": "Georgia’s Medicaid covers a parent of two only if they earn less than about $8,000 a year" + sup(1),
   "pic": pic_ga1(), "p": "Medicaid is health insurance paid by the state and the federal government for people with low incomes. Most Georgians get health insurance through work instead.",
   "btn": "Meet Bri, who earns a bit more", "src": [DFCS]},
  {"h": "Bri earns too much for Medicaid and too little to buy health insurance" + sup(1, 2),
   "pic": pic_ga2(), "p": "Imagine three Georgia sisters, each a mom of two. Bri, in the middle, has a job that doesn’t offer health insurance, and she can’t afford to buy it.",
   "btn": "How many Georgians are like Bri", "src": [DFCS, HHS]},
  {"fit": True, "h": "About 200,000 Georgia adults are in the same spot as Bri" + sup(1),
   "pic": pic_ga3(), "p": "Most of them work, often as cashiers, cooks or home health aides, jobs that rarely come with health insurance." + sup(3),
   "btn": "The fix 40 states already use", "src": [["Georgia Recorder via Cobb County Courier, Sept 2026", "https://cobbcountycourier.com/2026/09/is-jacksons-intelligent-medicaid-expansion-weak-tea-or-a-revolutionary-fix/"], ["US Census, Savannah", "https://www.census.gov/quickfacts/savannahcitygeorgia"], ["Georgetown CCF, Georgia’s low-wage uninsured workers", "https://ccf.georgetown.edu/2021/04/28/a-profile-of-georgias-low-wage-uninsured-workers/"]]},
  {"fit": True, "h": "40 states and DC cover people like Bri by accepting Medicaid expansion, but Georgia hasn’t" + sup(1),
   "pic": pic_ga4(), "p": "Medicaid expansion raises the income limit so adults like Bri qualify. The federal government pays 90% of the cost." + sup(2),
   "btn": "What Maya’s opponent wants instead", "src": [["KFF, which states accepted Medicaid expansion", "https://www.kff.org/status-of-state-medicaid-expansion-decisions/"], ["HealthCare.gov, Medicaid expansion", "https://www.healthcare.gov/medicaid-chip/medicaid-expansion-and-you/"]]},
  {"h": "Maya’s Republican opponent wants a plan like Georgia Pathways, which covers adults only if they report work hours" + sup(1, 2),
   "pic": pic_ga5(), "p": "He calls it “intelligent Medicaid expansion”: health insurance tied to work." + sup(1) + " Georgia Pathways is the state’s program today." + sup(3),
   "btn": "How Georgia Pathways has worked so far", "src": [["Atlanta News First, Sept 8, 2026: his health care plan", "https://www.atlantanewsfirst.com/2026/09/08/work-requirements-or-full-coverage-georgia-governor-hopefuls-roll-out-healthcare-proposals/"], ["GPB News, Oct 1, 2026", "https://www.gpb.org/news/2026/10/01/medicaid-work-requirements-are-here-stay-no-matter-who-wins-georgia-governors-race"], ["2026 Georgia Pathways rules", "https://healthyfuturega.org/wp-content/uploads/2023/08/2026-Pathways-Eligibility-Flier-.pdf"]]},
  {"fit": True, "h": "Georgia Pathways covers fewer than 1 in 5 of the people the state expected" + sup(2, 3),
   "pic": pic_ga6(), "p": "Most of its spending went to running the program, not to health care." + sup(4),
   "btn": "Maya’s plan for people like Bri", "src": [["KFF Health News, March 2024 (also in The Atlanta Journal-Constitution)", "https://kffhealthnews.org/news/article/georgia-medicaid-work-requirements-experiment-high-cost-low-enrollment/"], ["Capitol Beat, June 2023: the state’s first-year estimate", "https://capitol-beat.org/2023/06/limited-georgia-medicaid-expansion-launches-this-weekend/"], ["GBPI, enrollment as of June 30, 2026 (18,527 of the 100,000 expected is fewer than 1 in 5)", "https://gbpi.org/pathways-to-coverage-three-years/"], ["GAO report via WABE, Sept 2025: twice as much on running the program as on health care", "https://www.wabe.org/report-georgia-pathways-spending-twice-as-much-on-admin-costs-compared-to-health-care/"]]},
  {"h": "Maya will push the legislature to pass full Medicaid expansion so people like Bri qualify" + sup(1),
   "pic": pic_ga7(), "p": "The governor can’t pass it alone, so it’s Maya’s top priority with the legislature. Under a 2025 federal law, adults covered this way will still report work hours." + sup(2),
   "btn": "Practice it at a door", "src": [["Maya’s health care plan (the CARE Plan)", "https://www.keishaforgovernor.com/klb-policy-careplan-1.pdf"], ["GPB News, Oct 1, 2026: work rules either way", "https://www.gpb.org/news/2026/10/01/medicaid-work-requirements-are-here-stay-no-matter-who-wins-georgia-governors-race"]]},
]

if __name__ == "__main__":
  src = (here / "learn-src.html").read_text()
  out = src.replace("/*SCREENS*/[]", json.dumps(SCREENS, ensure_ascii=False))
  pathlib.Path(sys.argv[1]).write_text(out)
  print("wrote", sys.argv[1], len(out))
