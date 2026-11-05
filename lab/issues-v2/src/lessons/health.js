/* Lesson: Health insurance in Georgia. Format: WHO QUALIFIES? (the Rule format).
   Real race: Georgia governor, 2026 (Keisha Lance Bottoms, D; Rick Jackson, R). Facts come from the approved
   Georgia lesson (fact-checked Nov 1) plus three added and checked Nov 5: the 2026 poverty line for one and three
   (HHS), Pathways' rules (ages 19 to 64, up to the poverty line, 80 hours a month) and the Georgia law that makes
   expansion the legislature's call. Bri, Ana, Dee, Tasha and Rosa are made-up examples. */
(function () {
  "use strict";
  var WU = window.WU, s = WU.sup;
  var GAP = /(too much|too little|gap|7,?900|8,?000|seven thousand|eight thousand|poverty line|27,?3|help (buying|paying for|with) (a )?(plan|insurance)|in between|in the middle|(200,?000|two hundred thousand) (georgians|adults|people)|fall(s)? through|left out)/i;
  var REP = /(pathways|work(ing)? (hours|requirement|rules?)|report(ing)? (\w+ )?(work|hours)|80 hours|eighty hours|intelligent|tied to work)/i;
  var LISTEN = /(sorry|that'?s (hard|tough|rough|frustrating|a lot)|tough spot|hard spot|not alone|i hear you|i understand|makes sense|does that help|any questions|what do you think)/i;
  var AGAINST = { re: /(jackson|republican|he)[^.]{0,25}(is against|opposes|hates|wants to (cut|end|get rid of))[^.]{0,8}medicaid/i, why: "Jackson isn’t against Medicaid. He wants coverage tied to reporting work, like Georgia Pathways.", cancels: ["rep"] };
  var SCORN = { re: /(pathways|jackson|his plan)[^.]{0,30}(scam|joke|fraud|garbage)|hates? (pathways|medicaid)/i, why: "Describe his plan in his terms. Leave the judgment to the voter.", cancels: ["rep"] };
  var DEMOPP = { re: /(bottoms|democrat|keisha)[^.]{0,30}(oppos|against|reject)\w*[^.]{0,15}expan/i, why: "Bottoms supports full Medicaid expansion.", cancels: ["dem"] };
  var FACTS = [
    "Georgia's regular Medicaid covers a parent in a family of three only below about $7,900 a year ($662 a month).",
    "Help buying a marketplace plan on HealthCare.gov starts at the poverty line: $27,320 a year for a family of three in 2026 ($15,960 for one person).",
    "Between those two lines, adults get no regular Medicaid and no help buying a plan. The only route is Georgia Pathways: adults 19 to 64 with income up to the poverty line who report 80 hours a month of work, school, job training or volunteering.",
    "About 200,000 Georgia adults are in this gap. Most work, often as cashiers, cooks or home health aides.",
    "Full Medicaid expansion covers adults up to 138% of the poverty line, about $37,700 a year for a family of three. 40 states and DC have it. The federal government pays 90% of the cost.",
    "Keisha Lance Bottoms, the 2026 Democratic nominee for Georgia governor, proposes full Medicaid expansion (her CARE Plan) and says she'd make it her top priority with the legislature.",
    "Rick Jackson, the 2026 Republican nominee, proposes what he calls 'intelligent Medicaid expansion': coverage tied to work, like Georgia Pathways. He has pledged to close the coverage gap but hasn't published an income limit. He is not against Medicaid.",
    "Under a 2025 federal law, most adults covered through expansion must report work hours, starting by January 2027; parents of children 13 and under are among those who can be exempt.",
    "Pathways: the state expected about 100,000 enrollees in its first year; 18,527 were enrolled as of June 30, 2026. A federal audit found it spent about twice as much running the program as on health care.",
    "A governor can't expand Medicaid alone: Georgia law requires the legislature's approval.",
    "Canvassers explain the rules; they don't promise a specific person will qualify."
  ];
  var R = {
    family: "a family of three (a parent and two kids)", max: 48000, ticks: [0, 10000, 20000, 30000, 40000],
    worlds: {
      today: [
        { to: 7944, c: "g", name: "Medicaid", edge: "$7,900", read: ["Medicaid", "Georgia’s regular Medicaid covers a parent of two only below about $7,900 a year." + s(1)] },
        { to: 27320, c: "r", name: "The gap", edge: "$27,320", read: ["The gap: no Medicaid, no help buying a plan", "The only way in is Georgia Pathways: report 80 hours a month of work, school or volunteering." + s(3)] },
        { to: 1e9, c: "b", name: "Help buying a plan", short: "Help buying", read: ["Help buying a plan", "From the poverty line, $27,320 for a family of three, families can get help paying for a plan on HealthCare.gov." + s(2)] }
      ],
      expand: [
        { to: 37702, c: "g", name: "Medicaid", edge: "$37,700", read: ["Medicaid", "With full expansion, adults qualify up to 138% of the poverty line, about $37,700 for a family of three." + s(4)] },
        { to: 1e9, c: "b", name: "Help buying a plan", short: "Help buying", read: ["Help buying a plan", "Above the expanded limit, families can get help paying for a plan on HealthCare.gov." + s(2)] }
      ]
    },
    people: [
      { name: "Ana", v: 7000, art: WU.art.ana, read: { today: ["Ana gets Medicaid", "At $7,000 she’s just under Georgia’s limit of about $7,900." + s(1)], expand: ["Ana gets Medicaid", "She still qualifies, with room to spare."] } },
      { name: "Bri", v: 14000, art: function (w) { return w === "expand" ? WU.art.briUmb : WU.art.briRain; },
        read: { today: ["Bri is in the gap", "Her only way in is Georgia Pathways, if she reports 80 hours a month." + s(3)], expand: ["Bri qualifies for Medicaid", "At $14,000 she’s well under the expanded limit, about $37,700." + s(4)] } },
      { name: "Dee", v: 45000, art: WU.art.dee, read: { today: ["Dee gets insurance through work", "Like most Georgians. Without it, at $45,000 she could get help buying a plan."], expand: ["Dee gets insurance through work", "Expansion doesn’t change anything for Dee."] } }
    ]
  };
  var miniRuler = function (v, w) { return function () { return '<div class="ruler" style="opacity:.98">' + WU.rulerSVG(R, w, v, { mini: true }) + "</div>"; }; };
  var ICON_LINE = '<svg viewBox="0 0 52 52" aria-hidden="true"><rect x="4" y="22" width="11" height="10" fill="#bfe9d3"/><rect x="15" y="22" width="18" height="10" fill="#f6d5d1"/><rect x="33" y="22" width="15" height="10" fill="#cfe0f5"/><path d="M24 16 V38" stroke="#262320" stroke-width="2.5"/><circle cx="24" cy="27" r="4" fill="#fff" stroke="#262320" stroke-width="2.5"/></svg>';
  var ICON_TWO = '<svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="17" cy="26" r="11" fill="#2f5fa8"/><circle cx="35" cy="26" r="11" fill="#b04a3a"/><path d="M24 26 h4" stroke="#fff" stroke-width="2"/></svg>';
  function nestIcon(svg) { return svg.replace("<svg ", '<svg style="width:84%;height:84%" '); }

  WU.lessons.health = {
    id: "health", tag: "GA2", title: "Health insurance in Georgia", format: "rule",
    race: { office: "Governor", state: "Georgia", year: 2026, status: "Positions as stated during the 2026 campaign; Election Day was Nov 3, 2026." },
    sources: [
      { t: "Georgia DFCS, 2026 family Medicaid limits: $662 a month for a parent in a family of three (about $7,900 a year)", u: "https://pamms.dhs.ga.gov/dfcs/medicaid/appendix-a2/2026-family-limits/" },
      { t: "HHS, 2026 poverty guidelines: $27,320 a year for a family of three, where help buying a plan starts", u: "https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines" },
      { t: "Georgia Pathways rules: adults 19 to 64, income up to the poverty line, 80 hours a month of work, school, training or volunteering (Disability Benefits 101, Georgia)", u: "https://ga.db101.org/ga/programs/health_coverage/medicaid-magi/faqs.htm" },
      { t: "HealthCare.gov, Medicaid expansion: adults up to 138% of the poverty line; the federal government pays 90%. 138% of $27,320 is about $37,700 (our math)", u: "https://www.healthcare.gov/medicaid-chip/medicaid-expansion-and-you/" },
      { t: "KFF, which states accepted Medicaid expansion (40 states and DC)", u: "https://www.kff.org/status-of-state-medicaid-expansion-decisions/" },
      { t: "Georgia Recorder via Cobb County Courier, Sept 2026: about 200,000 Georgia adults in the gap", u: "https://cobbcountycourier.com/2026/09/is-jacksons-intelligent-medicaid-expansion-weak-tea-or-a-revolutionary-fix/" },
      { t: "Georgetown Center for Children and Families, Georgia’s low-wage uninsured workers", u: "https://ccf.georgetown.edu/2021/04/28/a-profile-of-georgias-low-wage-uninsured-workers/" },
      { t: "Capitol Beat, June 2023: the state’s first-year estimate of about 100,000", u: "https://capitol-beat.org/2023/06/limited-georgia-medicaid-expansion-launches-this-weekend/" },
      { t: "GBPI: 18,527 enrolled as of June 30, 2026", u: "https://gbpi.org/pathways-to-coverage-three-years/" },
      { t: "Bottoms campaign: the CARE Plan", u: "https://www.keishaforgovernor.com/klb-policy-careplan-1.pdf" },
      { t: "Atlanta News First, Sept 8, 2026: both candidates’ health care plans", u: "https://www.atlantanewsfirst.com/2026/09/08/work-requirements-or-full-coverage-georgia-governor-hopefuls-roll-out-healthcare-proposals/" },
      { t: "GPB News, Oct 1, 2026: Medicaid work requirements stay no matter who wins", u: "https://www.gpb.org/news/2026/10/01/medicaid-work-requirements-are-here-stay-no-matter-who-wins-georgia-governors-race" },
      { t: "Official Code of Georgia § 49-4-142.2: expansion needs the General Assembly’s approval (via Justia)", u: "https://law.justia.com/codes/georgia/2022/title-49/chapter-4/article-7/section-49-4-142-2/" },
      { t: "American Academy of Pediatrics, the 2025 law\u2019s Medicaid work rules: states start by January 2027; parents of children 13 and under can be exempt", u: "https://www.aap.org/en/patient-care/national-center-for-a-system-of-services-for-children-and-youth-with-special-health-care-needs/medicaid-work-requirements-and-caregiver-exemptions/" }
    ],
    learn: [
      { type: "cover", race: "Georgia governor · 2026", when: "Election Day was Nov 3", h: "Three things you’ll be able to explain about health insurance in Georgia",
        goals: [
          { icon: nestIcon(WU.art.briRain), t: "Who Georgia’s Medicaid leaves out" },
          { icon: ICON_LINE, t: "Where any family lands on one income line" },
          { icon: ICON_TWO, t: "What each candidate for governor would change" }
        ], times: [3, 2], fine: "Built by Warmup from public sources. Not affiliated with or approved by either campaign.", btn: "Start: Bri’s question" },
      { type: "ask", key: "p1", voter: "bri", who: "Bri, a mom of two in Georgia, at her front door",
        quote: "My job doesn’t offer health insurance, and I can’t afford a plan. Can’t I just get Medicaid?",
        q: "Your guess: can Bri, who earns $14,000 a year, get Georgia’s regular Medicaid?",
        opts: ["Yes, $14,000 is low enough", "No, $14,000 is too much for it", "I’m not sure"],
        after: "Hold that guess. The next screen shows where Bri lands.", btn: "See where Bri lands" },
      { type: "ruler", task: "zones", start: 14000, ruler: R, src: [1, 2, 3, 6, 7],
        h: "In Georgia, a parent of two loses Medicaid at $7,900 a year. Help buying a plan starts at $27,320.",
        p: "Three sisters, each a mom of two (a family of three). Drag the line or tap a sister. The line is for the parent; kids qualify at higher incomes." + s(3),
        reveal: { key: "p1", right: 1, opts: ["Yes, $14,000 is low enough", "No, $14,000 is too much for it", "I’m not sure"], yes: "She’s in the gap, with about 200,000 Georgia adults, most of them working." + s(6, 7), no: "At $14,000 she’s in the gap, with about 200,000 Georgia adults, most of them working." + s(6, 7), none: "At $14,000 Bri is in the gap, with about 200,000 Georgia adults, most of them working." + s(6, 7) },
        btn: "Change one rule and watch Bri" },
      { type: "ruler", task: "flip", start: 14000, ruler: R, src: [4, 5],
        toggle: [{ w: "today", t: "Georgia today" }, { w: "expand", t: "With full expansion" }],
        h: "Full Medicaid expansion would raise Georgia’s limit to about $37,700 for a family of three" + s(4),
        doText: "Flip to “With full expansion” and watch Bri.", lockText: "Flip the switch to keep going",
        flipped: "One rule changed and Bri moved from the gap to Medicaid. 40 states and DC have made this change." + s(5) + " The federal government pays 90% of the cost." + s(4),
        btn: "Try it on a new family" },
      { type: "apply", key: "apply", src: [1, 2, 4], h: "Your turn: where does Tasha land?",
        p: "Tasha is a mom of two. Her job doesn’t offer health insurance.",
        cases: [
          { q: "Tasha earns $20,000 a year. Under Georgia’s rules today, what can she get?",
            opts: [
              { t: "Regular Medicaid", ok: false, why: "Georgia’s regular Medicaid stops at about $7,900 for a family of three. $20,000 is well above it." },
              { t: "Nothing, unless she reports 80 hours a month for Pathways", ok: true, why: "$20,000 is above the Medicaid limit and below $27,320, where help buying a plan starts. She’s in the gap." },
              { t: "Help buying a plan", ok: false, why: "Help buying a plan starts at the poverty line, $27,320 for a family of three. She’s below it." }
            ], after: function (box) { box.querySelector("#qa").insertAdjacentHTML("beforebegin", miniRuler(20000, "today")()); } },
          { q: "Same $20,000. If Georgia passed full Medicaid expansion, what could she get?",
            opts: [
              { t: "Medicaid", ok: true, why: "Expansion covers a family of three up to about $37,700, so $20,000 qualifies." },
              { t: "Nothing, she’d still be in the gap", ok: false, why: "Expansion closes the gap for families up to about $37,700." },
              { t: "Help buying a plan", ok: false, why: "Under $37,700 she’d qualify for Medicaid instead." }
            ], after: function (box) { box.querySelector("#qa").insertAdjacentHTML("beforebegin", miniRuler(20000, "expand")()); } }
        ], btn: "Where the candidates for governor stand" },
      { type: "choice", src: [3, 4, 5, 6, 9, 10, 11, 12, 13, 14],
        h: "Both candidates for governor say they\u2019d cover people like Bri. They differ on how.",
        cands: [
          { side: "d", ini: "KB", name: "Keisha Lance Bottoms", short: "Bottoms", role: "Democratic nominee",
            plan: "Full Medicaid expansion, part of her CARE Plan" + s(10),
            lines: [
              { l: "For Bri", t: "She\u2019d qualify. The limit for a family of three would be about $37,700." + s(4) },
              { l: "Work reporting", t: "A 2025 federal law requires it for most adults from 2027. Parents of young kids can be exempt." + s(12, 14) },
              { l: "So far", t: "40 states and DC have full expansion. Georgia doesn\u2019t." + s(5) }
            ] },
          { side: "r", ini: "RJ", name: "Rick Jackson", short: "Jackson", role: "Republican nominee",
            plan: "\u201CIntelligent Medicaid expansion\u201D: coverage tied to work, like Georgia Pathways" + s(11),
            lines: [
              { l: "For Bri", t: "He says his plan would close the coverage gap, with coverage tied to work. His income limit isn\u2019t public yet." + s(6) },
              { l: "Work reporting", t: "The center of the plan, as in Pathways (80 hours a month)." + s(3, 11) },
              { l: "So far", t: "Georgia Pathways, which also ties coverage to work, has 18,527 people enrolled after three years." + s(9) }
            ] }
        ],
        diff: "Bottoms would use the standard expansion 40 states use. Jackson would tie coverage to reporting work, like Pathways.",
        office: "A governor can\u2019t expand Medicaid alone. Georgia law requires the legislature to approve it." + s(13), btn: "Practice it at a door" }
    ],
    door: [
      { type: "door", attempt: 1, voter: "bri", name: "Bri", voice: "f", who: "Bri at her front door",
        intro: "Bri brings up health insurance. Answer out loud in about 30 seconds, accurately and fairly.",
        ask: "My job doesn’t offer health insurance, and I can’t afford a plan. Why can’t I get Medicaid, and what would the candidates for governor do about it?",
        example: "That's a tough spot, and you're not alone. About 200,000 Georgians earn too much for regular Medicaid but too little to get help buying a plan. Bottoms wants full Medicaid expansion, so people like you would qualify. Jackson wants what he calls intelligent Medicaid expansion, tied to reporting work hours, like Georgia Pathways.",
        rubric: {
          ask: "My job doesn't offer health insurance, and I can't afford a plan. Why can't I get Medicaid, and what would the candidates for governor do about it?",
          facts: FACTS,
          items: [
            { id: "gap", label: "Explained why Bri is stuck", all: [GAP], ai: "Explains why she can't get Medicaid: she earns too much for Georgia's regular Medicaid (about $7,900 for a family of three) but too little for help buying a plan (which starts at the poverty line, $27,320), or names the roughly 200,000 Georgians in that gap.", tip: "Say why she’s stuck: too much for Medicaid, too little for help buying a plan." },
            { id: "dem", label: "Said where Bottoms stands", all: [/(bottoms|democrat|keisha)/i, /expan/i], not: [/(oppos|against|reject|block|won'?t)\w*[^.]{0,20}expan/i], ai: "States that the Democratic nominee (Bottoms) wants full Medicaid expansion, so adults like Bri would qualify.", tip: "Say Bottoms wants full Medicaid expansion, so people like Bri would qualify." },
            { id: "rep", label: "Said where Jackson stands, fairly", all: [/(jackson|republican)/i, REP], not: [/(scam|joke|hates?|against medicaid|doesn'?t care)/i], ai: "States that the Republican nominee (Jackson) wants coverage tied to reporting work, like Georgia Pathways (what he calls intelligent Medicaid expansion), without calling him anti-Medicaid or mocking the plan.", tip: "Say Jackson wants coverage tied to reporting work hours, like Georgia Pathways." },
            { id: "listen", label: "Spoke to Bri, not just the issue", all: [LISTEN], minWords: 20, ai: "Acknowledges Bri's own situation or feelings, or checks in with her (a question, an offer to help), rather than only reciting policy.", tip: "Start with Bri (“That’s a tough spot”) or end with a check-in (“Does that help?”)." }
          ],
          flags: [AGAINST, SCORN, DEMOPP]
        } },
      { type: "result", attempt: 1, allH: "All four. That’s a complete, fair answer.", btn: "Hear a strong answer" },
      { type: "hear", name: "Bri", voice: "f", h: "A strong answer to Bri, with each key point marked",
        lines: [
          { who: "c", t: '<span class="pt" data-n="4">That\u2019s a tough spot, and you\u2019re not alone.</span> <span class="pt" data-n="1">Georgia\u2019s Medicaid stops at about $7,900 for a mom of two, and help buying a plan starts at about $27,300. About 200,000 Georgians are stuck in between.</span>' },
          { who: "c", t: '<span class="pt" data-n="2">Bottoms wants full Medicaid expansion, so people in your spot would qualify.</span> <span class="pt" data-n="3">Jackson wants what he calls intelligent Medicaid expansion, tied to reporting work hours, like Georgia Pathways.</span>' },
          { who: "c", t: 'The difference is how: full expansion, as in 40 states, or coverage built around reporting work. <span class="pt" data-n="4">Does that help?</span>' }
        ], btn: "Spot the mistake in another answer" },
      { type: "catch", name: "Bri", h: "This canvasser gets one thing wrong. Tap it.", ask: "What would the candidates for governor do about health insurance?",
        lines: ["About 200,000 Georgians earn too much for Medicaid and too little for help buying a plan.", "Bottoms wants full Medicaid expansion, so people like you would qualify.", "Jackson is against Medicaid."], wrong: 2,
        why: "Jackson isn’t against Medicaid. He wants coverage tied to reporting work, like Georgia Pathways. Getting the other side right is how voters learn to trust you.",
        notIt: "That line is accurate. Look for the one that misstates a candidate’s position.", btn: "Try tomorrow’s door now" },
      { type: "door", attempt: 2, voter: "rosa", name: "Rosa", voice: "f", who: "Rosa at her front door",
        intro: "Tomorrow’s warmup (try it now in this preview): a different family. Use the income line, not a memorized answer.",
        ask: "My husband and I make about $30,000 a year, and we have one son. Neither job offers insurance. Would either plan change anything for us?",
        example: "From what you've told me, at $30,000 for a family of three you're above the poverty line, so today you can get help buying a plan on HealthCare.gov. If Georgia passed full Medicaid expansion, like Bottoms wants, the limit would be about $37,700, so you'd likely qualify for Medicaid. HealthCare.gov can check your details.",
        rubric: {
          ask: "My husband and I make about $30,000 a year, and we have one son. Neither job offers insurance. Would either plan change anything for us?",
          facts: FACTS.concat(["A family of three earning about $30,000 is above the poverty line ($27,320), so today it can get help buying a marketplace plan. It would be under the expanded Medicaid limit (about $37,700). Whether Jackson's plan would cover them is not known from public sources, so a canvasser shouldn't claim either way."]),
          items: [
            { id: "today", label: "Placed Rosa’s family under today’s rules", all: [/(help (buying|paying for|with) (a )?(plan|insurance)|healthcare\.gov|health care \.?gov|marketplace|subsid|tax credit|above the (poverty|line))/i], ai: "Says that today, at about $30,000 for a family of three, they are above the poverty line ($27,320), so they can get help buying a plan on HealthCare.gov (the marketplace). Saying they are in the gap or get Medicaid today is wrong.", tip: "Say what they can get today: at $30,000 they’re above $27,320, so they can get help buying a plan on HealthCare.gov." },
            { id: "expand", label: "Applied full expansion to them", all: [/(expan|bottoms)/i, /(qualify|eligible|37,?7|thirty.seven|138|under the (new |expanded )?limit|get medicaid|be covered|medicaid would)/i], ai: "Says that under full Medicaid expansion (Bottoms's plan), a family of three earning about $30,000 would likely qualify for Medicaid, because the limit would be about $37,700 (138% of poverty).", tip: "Say that with full expansion the limit for three would be about $37,700, so at $30,000 they’d likely qualify for Medicaid." },
            { id: "hedge", label: "Didn’t overpromise", all: [/(likely|probably|should|might|depend|check|from what you|based on what|sounds like|i think|i believe)/i], ai: "Signals that eligibility depends on details or points them to check (for example HealthCare.gov or 'from what you've told me'), instead of guaranteeing coverage.", tip: "Add a hedge: “From what you’ve told me, you’d likely qualify. HealthCare.gov can check.”" }
          ],
          flags: [{ re: /(you'?re|you are|your family is)[^.]{0,12}in the gap|(get|qualify for) medicaid (now|today|already)/i, why: "At $30,000 a family of three is above the poverty line, so today they can get help buying a plan, not Medicaid.", cancels: ["today"] }, AGAINST, DEMOPP]
        } },
      { type: "result", attempt: 2, allH: "You applied the rule to a new family. That’s the skill.", btn: "Finish the lesson" },
      { type: "done", scroll: true, h: "You can explain health insurance in Georgia", d1: "Bri", d2: "Rosa",
        can: [
          { t: "Explain who Georgia’s Medicaid leaves out", from: [[1, "gap"]], tip: "Say why Bri is stuck: too much for Medicaid, too little for help buying a plan." },
          { t: "Place a new family on the income line", from: [[2, "today"], [2, "expand"]], tip: "Use the three lines for a family of three: $7,900, $27,320 and $37,700." },
          { t: "Say fairly where both candidates stand", from: [[1, "dem"], [1, "rep"]], tip: "Name both plans: full expansion, and coverage tied to reporting work." }
        ],
        tomorrow: "We’ll ask you where help buying a plan starts for a family of three, and what full expansion would change.",
        origin: "A real 2026 race: Keisha Lance Bottoms (Democrat) and Rick Jackson (Republican) for governor of Georgia. Their positions come from their own plans and news coverage during the campaign, which ended on Election Day, Nov 3, 2026. Built by Warmup from public sources; not affiliated with or approved by either campaign. Bri, Ana, Dee, Tasha and Rosa are made-up examples.",
        btn: "Back to lessons" }
    ]
  };
})();
