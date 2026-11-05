/* Lesson: Tariffs and auto jobs in Michigan. Format: WHAT CAUSES WHAT? (the Chain format).
   Real race: Michigan U.S. Senate, 2026 (Abdul El-Sayed, D; Mike Rogers, R). Facts come from the approved Michigan
   lesson (fact-checked Nov 1) plus five added and checked Nov 5: the 50% steel duty and USMCA's partial exemptions
   (a July 2026 trade brief), vehicle jobs up about 500 (Bridge Michigan's fact-check via Vehicle Service Pros), the
   University of Michigan's 2025 forecast and its "very uncertain" caveat (Crain's), other forces on auto jobs (Motor1)
   and who sets tariffs (CRS). Samira, Ray and the Grand Rapids furniture maker are made-up examples. */
(function () {
  "use strict";
  var WU = window.WU, s = WU.sup;
  var CANADA_PAYS = { re: /canada (pays|is paying|will pay|paid|pays for)/i, why: "Canada doesn’t pay the US tariff. The US company bringing the goods in pays it." };
  var CAUSED_ALL = { re: /(tariffs?|they) (caused|cost us|killed|wiped out|destroyed|took) (all )?(of )?(those |the |our |4,?000 )?(\w+ )?jobs/i, why: "The job numbers don’t prove tariffs caused the losses. Say tariffs may be one reason." };
  var ANTI_ALL = { re: /(el.?sayed|the democrat)[^.]{0,20}(opposes|is against|wants to (end|get rid of)) (all )?tariffs/i, why: "El-Sayed isn’t against all tariffs, only what he calls dumb ones." };
  var FACTS = [
    "A tariff is a tax on imported goods, paid to US Customs by the US company bringing the goods into the country.",
    "That company can pass the cost on in higher prices, take a smaller profit or switch suppliers. New York Fed economists found about 90% of the cost of 2025's tariffs fell on US businesses and consumers.",
    "Steel and aluminum from Canada are taxed at 50%. Parts that meet the USMCA trade deal's rules skip some other US tariffs. Canada has its own counter-tariffs on some US goods.",
    "Auto parts can cross the US-Canada border several times before a car is finished (NBC News followed one part that crossed four times), so tariffs can apply more than once.",
    "Michigan had about 4,000 fewer auto parts manufacturing jobs in June 2026 than in June 2025 (113,600 to 109,600, about 3.5%). Vehicle manufacturing added about 500 jobs over the same period.",
    "The job numbers show timing, not cause. Other forces, such as shifts in electric vehicle plans and pressure on suppliers, also affect auto jobs. A 2025 University of Michigan forecast estimated tariffs would cost Michigan about 3,300 auto jobs and called the estimate very uncertain.",
    "Abdul El-Sayed (2026 Democratic nominee, Michigan U.S. Senate): \"I'm not against tariffs per se. I'm just against dumb tariffs.\" He wants smart, targeted tariffs tied to Michigan jobs, with unions at the table. The UAW endorsed him in June 2026.",
    "Mike Rogers (2026 Republican nominee): backed the tariffs in September 2026; in October said \"Canada is not our enemy\" and called to end the Canada tariff fight, while saying \"there are tariffs that have helped.\"",
    "Presidents imposed these tariffs using powers Congress has delegated. A senator votes on trade laws and can vote to limit those powers but can't set tariffs alone.",
    "Canvassers explain the mechanism and the evidence; they don't claim certainty the evidence doesn't support."
  ];
  var ICON_BORDER = '<svg viewBox="0 0 52 52" aria-hidden="true"><path d="M26 6 V46" stroke="#9aa3ad" stroke-width="3" stroke-dasharray="5 5"/><path d="M28 30 h14 l5 5 -5 5 h-14 z" fill="#b3261e"/><circle cx="14" cy="22" r="8" fill="#8d98a6"/><circle cx="14" cy="22" r="3.5" fill="#6f7b88"/></svg>';
  var ICON_ROUTE = '<svg viewBox="0 0 52 52" aria-hidden="true"><path d="M2 26 H50" stroke="#9aa3ad" stroke-width="2.5" stroke-dasharray="4 4"/><path d="M6 14 C14 14 14 38 22 38 C30 38 30 14 38 14 C44 14 44 38 48 38" stroke="#545b63" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="14" cy="26" r="4" fill="#b3261e"/><circle cx="30" cy="26" r="4" fill="#b3261e"/></svg>';
  var ICON_CHART = '<svg viewBox="0 0 52 52" aria-hidden="true"><rect x="8" y="14" width="34" height="9" rx="4" fill="#a7adb5"/><rect x="8" y="29" width="30" height="9" rx="4" fill="#b3261e"/><text x="44" y="38" style="font:800 14px var(--sans);fill:#c27c12">?</text></svg>';

  WU.lessons.tariffs = {
    id: "tariffs", tag: "MI2", title: "Tariffs and auto jobs in Michigan", format: "chain",
    race: { office: "U.S. Senate", state: "Michigan", year: 2026, status: "Positions as stated during the 2026 campaign; Election Day was Nov 3, 2026." },
    sources: [
      { t: "New York Fed, Feb 2026: who paid the 2025 tariffs (about 90% fell on US businesses and consumers)", u: "https://libertystreeteconomics.newyorkfed.org/2026/02/who-is-paying-for-the-2025-u-s-tariffs/" },
      { t: "White House fact sheet, July 2026: additional tariffs on Canada (up to 50%)", u: "https://www.whitehouse.gov/fact-sheets/2026/07/fact-sheet-president-donald-j-trump-imposes-additional-tariffs-on-canada/" },
      { t: "Carra Globe trade brief, updated July 2026: steel and aluminum duties at 50%; goods that meet USMCA rules skip some other tariffs (a commercial summary of official notices)", u: "https://carraglobe.com/?p=7130" },
      { t: "Michigan Public (NPR), Aug 22, 2026: Canada strikes back with its own tariffs", u: "https://www.michiganpublic.org/2026-08-22/hours-after-u-s-imposes-tariffs-canada-says-itll-strike-back-starting-sept-8" },
      { t: "Bridge Michigan, July 2025: Canada is Michigan’s biggest trade partner", u: "https://bridgemi.com/michigan-government/trump-plans-35-tariffs-canada-michigans-biggest-trade-partner/" },
      { t: "NBC News: one auto part crosses the border four times on its way to a car", u: "https://www.nbcnewyork.com/news/national-international/one-auto-part-crosses-border-four-times/6245493/" },
      { t: "Michigan auto jobs dashboard, Q2 2026: 113,600 parts jobs in June 2025, 109,600 in June 2026", u: "https://www.michiganbusiness.org/globalassets/documents/car-medc-michigan-dashboard-q2-2026.pdf" },
      { t: "Vehicle Service Pros, July 29, 2026, on Bridge Michigan’s fact-check: parts jobs down about 3.5%; vehicle manufacturing up about 500", u: "https://www.vehicleservicepros.com/aftermarket-business-world/news/news/55394515/michigan-auto-parts-sector-sheds-4000-jobs-despite-trump-tariff-claims" },
      { t: "Crain’s Detroit Business, May 2025: University of Michigan forecast of about 3,300 auto jobs lost to tariffs, “very uncertain”", u: "https://prod.crainsdetroit.com/node/921496" },
      { t: "Motor1, July 28, 2026: EV shifts and supplier pressures also shape Michigan auto jobs", u: "https://www.motor1.com/news/803024/trump-michigan-auto-comeback-claim/" },
      { t: "IMPO, July 30, 2026: announced US production moves whose jobs haven’t arrived yet", u: "https://www.impomag.com/operations/news/22971566/michigan-auto-jobs-lag-despite-tariffdriven-production-push" },
      { t: "ClickOnDetroit, Oct 21, 2026: where El-Sayed and Rogers stand on tariffs", u: "https://www.clickondetroit.com/news/local/2026/10/21/heres-where-michigan-us-senate-candidates-el-sayed-rogers-stand-on-tariffs/" },
      { t: "El-Sayed campaign ad on trade deals, Sept 2026", u: "https://abdulforsenate.com/2026/09/new-ad-nafta/" },
      { t: "Newsweek: Rogers’s September statement backing the tariffs", u: "https://www.newsweek.com/mike-rogers-turns-on-trumps-tariffs-what-michigan-republican-said-before-12538135" },
      { t: "Reuters via GV Wire, Oct 7, 2026: Rogers’s ad calling to end the Canada tariff fight", u: "https://gvwire.com/2026/10/07/michigan-republican-rogers-calls-for-end-to-canada-tariff-fight-breaking-with-trump-again/" },
      { t: "UAW statement, Aug 25, 2026: tariffs aimed at low-wage countries, no escalation with Canada", u: "https://uaw.org/uaw-president-shawn-fain-on-u-s-trade-escalation-with-canada/" },
      { t: "Michigan Public, June 5, 2026: the UAW endorses El-Sayed", u: "https://www.michiganpublic.org/politics-government/2026-06-05/uaw-backs-el-sayed-over-other-democrats-running-for-us-senate" },
      { t: "Congressional Research Service, R48435: Congressional and presidential authority to impose import tariffs", u: "https://www.everycrsreport.com/reports/R48435.html" }
    ],
    learn: [
      { type: "cover", race: "Michigan U.S. Senate · 2026", when: "Election Day was Nov 3", h: "Three things you’ll be able to explain about tariffs and auto jobs",
        goals: [
          { icon: ICON_BORDER, t: "Where a tariff is charged, and who pays it first" },
          { icon: ICON_ROUTE, t: "Why parts that cross the border again and again cost more" },
          { icon: ICON_CHART, t: "What the job numbers show and don’t, and where each candidate stands" }
        ], times: [3, 2], fine: "Built by Warmup from public sources. Not affiliated with or approved by either campaign.", btn: "Start: Samira’s question" },
      { type: "ask", key: "p1", voter: "samira", who: "Samira, who stamps car parts at a plant in Warren, Michigan",
        quote: "Tariffs are supposed to protect jobs like mine. So why is our plant hurting?",
        q: "Your guess: when steel from Canada comes into Michigan, who pays the US tariff?",
        opts: ["The Canadian steel mill", "The Michigan company bringing it in", "Canada’s government"],
        after: "Hold that guess. You’ll see the answer on the next screen.", btn: "Send steel across the border" },
      { type: "border", key: "p1", src: [1, 3], rate: "Tariff: 50%",
        h: "A tariff is a tax the US company bringing goods in pays at the border",
        alt: "A coil of steel crosses from Canada into Michigan. A red tag reads Tariff: 50%. An arrow shows the Michigan parts maker paying the tariff to US Customs.",
        reveal: { key: "p1", right: 1, opts: ["The Canadian steel mill", "The Michigan company bringing it in", "Canada’s government"], yes: "The Michigan company bringing the steel in pays it to US Customs.", no: "The Michigan company bringing the steel in pays it to US Customs, not Canada." },
        p: "Steel from Canada is taxed at 50%." + s(3) + " Then the company has three choices:",
        next: [{ i: "price", t: "Raise its prices" }, { i: "profit", t: "Take a smaller profit" }, { i: "switch", t: "Find other suppliers" }],
        who: { lab: "Who ended up paying for 2025’s tariffs, measured by New York Fed economists" + s(1), us: 90, txt: "About 90% US businesses and shoppers" },
        btn: "Follow one part across the border" },
      { type: "route", src: [3, 4, 6],
        h: "A car part can cross the border four times, and costs can pile up each time a tariff applies" + s(6),
        alt: "A car part's route: steel made in Ontario, stamped into a part in Michigan, welded into a bigger piece in Ontario, more parts added in Michigan, finished car in Ontario. Four border crossings.",
        stops: [{ t: "Steel made", c: "ca", icon: "coil" }, { t: "Stamped into a part", c: "us", icon: "part" }, { t: "Welded into a bigger piece", c: "ca", icon: "frame" }, { t: "More parts added", c: "us", icon: "plus" }, { t: "Into a finished car", c: "ca", icon: "car" }],
        cross: [
          { tax: true, tag: "50%", text: "Into Michigan. The US tariff on steel from Canada applies: 50%, paid by the Michigan plant bringing it in." + s(3) },
          { tax: true, tag: "Canada\u2019s tariff", text: "Into Ontario. Canada’s own counter-tariffs can apply to some US goods, paid by the Canadian company bringing it in." + s(4) },
          { tax: "maybe", tag: "Maybe", text: "Into Michigan again. Parts that meet the USMCA trade deal’s rules skip some US tariffs, but the steel and aluminum in them are taxed either way." + s(3) },
          { tax: "maybe", tag: "Maybe", text: "Into Ontario again. Whether a tariff applies depends on the part and the trade rules. Each crossing is another chance for one." }
        ],
        start: "Follow one part from Canadian steel to a finished car, and watch its cost.",
        end: "Every tariff adds to the part’s cost. That can show up as a higher car price, a smaller profit or fewer orders.",
        note: "An example route. Real parts take many routes; NBC News followed one that crossed four times." + s(6) + " The cost column is an illustration, not real prices.",
        btn: "What happened to Michigan’s auto parts jobs" },
      { type: "bars", src: [7, 8, 9, 10],
        h: "Michigan had about 4,000 fewer auto parts jobs in June 2026 than a year before" + s(7),
        bars: [{ lab: "Michigan auto parts jobs, June 2025", v: 113600, txt: "113,600" + s(7), c: "#8a8f96" }, { lab: "Michigan auto parts jobs, June 2026", v: 109600, txt: "109,600" + s(7), c: "#b3261e" }],
        alt: "Two bars drawn to scale: 113,600 Michigan auto parts jobs in June 2025 and 109,600 in June 2026, a drop of about 3.5%.",
        p: "That’s a 3.5% drop. Over the same year, vehicle assembly jobs rose by about 500." + s(8),
        q: { t: "Does this show the tariffs caused the drop?", lock: "Answer to keep going",
          opts: [
            { t: "Yes. Jobs fell while tariffs went up.", ok: false, why: "Timing alone can’t show cause. Other things moved auto jobs that year too, like shifts in electric vehicle plans and pressure on suppliers." + s(10) },
            { t: "No. It shows when jobs fell, not why.", ok: true, why: "Tariffs may be one reason, but these numbers alone can’t say how much. In 2025, University of Michigan economists forecast tariffs would cost Michigan about 3,300 auto jobs, and called that estimate “very uncertain.”" + s(9) },
            { t: "No. Tariffs can’t affect jobs.", ok: false, why: "They can. Tariffs raise costs for companies that buy steel and parts from abroad. The question is how much, and the job numbers alone can’t answer it." }
          ] },
        btn: "Sort what’s shown from what isn’t" },
      { type: "sort", src: [1, 8, 11], h: "Some tariff claims are shown by evidence. Others aren’t, at least not yet.",
        p: "Sort each claim. Getting this right is what makes you trustworthy.", labels: ["Shown by evidence", "Not shown"],
        items: [
          { t: "US companies pay the tariff when goods cross into the US.", a: "k", why: "That’s how tariffs are collected: the company bringing goods in pays US Customs." },
          { t: "Most of the cost of 2025’s tariffs stayed with US businesses and shoppers.", a: "k", why: "New York Fed economists measured it: about 90%." + s(1) },
          { t: "Tariffs caused all 4,000 lost auto parts jobs.", a: "n", why: "Jobs fell while tariffs rose, but other forces moved jobs too. Nobody has measured the tariffs’ share." },
          { t: "Tariffs have already brought back more Michigan auto jobs than they cost.", a: "n", why: "Not so far: parts jobs fell about 4,000 and vehicle jobs rose about 500. Announced plant moves haven’t added jobs yet." + s(8, 11) }
        ], btn: "Where the candidates for Senate stand" },
      { type: "compare", src: [12, 13, 14, 15, 16, 17, 18],
        h: "Both candidates for Senate back some tariffs. They differ on which ones, and on Canada.",
        cands: [{ side: "d", ini: "AE", name: "Abdul El-Sayed", role: "Democratic nominee" }, { side: "r", ini: "MR", name: "Mike Rogers", role: "Republican nominee" }],
        rows: [
          { l: "In their words", d: "<q>I’m not against tariffs per se. I’m just against dumb tariffs.</q>" + s(12), r: "<q>Canada is not our enemy,</q> but <q>there are tariffs that have helped.</q>" + s(12) },
          { l: "On these tariffs", d: "Smart, targeted tariffs tied to Michigan jobs, with unions at the table" + s(12, 13), r: "Backed them in September; in October called to end the Canada tariff fight" + s(14, 15) }
        ],
        office: "Presidents imposed these tariffs using powers Congress has given the office. A senator votes on trade laws and can vote to limit those powers, but can’t set tariffs alone." + s(18),
        p: "The autoworkers’ union backs tariffs on low-wage countries, not a fight with Canada, and endorsed El-Sayed." + s(16, 17),
        btn: "Practice it at a door" }
    ],
    door: [
      { type: "door", attempt: 1, voter: "samira", name: "Samira", voice: "f", who: "Samira at her apartment door",
        intro: "Samira brings up tariffs. Answer out loud in about 30 seconds, accurately and fairly.",
        ask: "These tariffs on Canada are hitting our plant. Who actually pays for them, and what would the candidates for Senate do?",
        example: "The tariff is paid by the US company bringing the parts in, and most of that cost ends up in our prices. Parts cross the border back and forth, so they can get hit more than once. Michigan has about 4,000 fewer auto parts jobs than a year ago, and tariffs may be one reason. El-Sayed wants targeted tariffs, not dumb ones, with unions at the table. Rogers backed the tariffs, and now he wants the Canada fight ended.",
        rubric: {
          ask: "These tariffs on Canada are hitting our plant. Who actually pays for them, and what would the candidates for Senate do?",
          facts: FACTS,
          items: [
            { id: "who", label: "Explained who pays", all: [/(compan(y|ies)|business(es)?|importer|plant|we pay|you pay|americans pay|paid (here|in the us)|higher prices|prices|90|ninety)/i], ai: "Explains that the US company bringing goods in pays the tariff at the border, and that most of the cost stays with US businesses and shoppers (for example through higher prices). Saying Canada pays is wrong.", tip: "Say who pays: the US company bringing goods in, and much of it ends up in prices." },
            { id: "chain", label: "Explained why autos get hit hard", all: [/(cross(es|ing)?|back and forth|four times|more than once|again and again|supply chain|multiple times|twice)/i], ai: "Explains that auto parts cross the US-Canada border several times, so tariffs can apply more than once and costs pile up.", tip: "Add why autos get hit hard: parts cross the border back and forth, so tariffs can hit more than once." },
            { id: "honest", label: "Was careful about the job numbers", all: [/(4,?000|four thousand|jobs)/i, /(may|might|could|one reason|part of|not the only|hard to (say|know|tell)|can'?t (say|prove|tell)|other (reasons|things|factors)|doesn'?t prove|not proven|likely)/i], ai: "Mentions jobs AND shows caution: Michigan had about 4,000 fewer auto parts jobs in a year, and the numbers alone don't prove how much tariffs caused (tariffs may be one reason). Credit only if both are present.", tip: "Mention the jobs carefully: about 4,000 fewer auto parts jobs, and tariffs may be one reason." },
            { id: "sides", label: "Said where both candidates stand, fairly", all: [/(el.?sayed|democrat|dumb|targeted|smart tariffs)/i, /(rogers|republican|he backed|backed (them|the tariffs)|not our enemy|end the (canada )?(fight|tariff))/i], ai: "States El-Sayed's position (not against all tariffs, against 'dumb' ones; targeted tariffs tied to Michigan jobs, unions at the table) AND Rogers's (backed the tariffs; now wants the Canada fight ended while keeping others he says helped).", tip: "Give both sides: El-Sayed wants targeted tariffs, not “dumb” ones; Rogers backed them and now wants the Canada fight ended." }
          ],
          flags: [CANADA_PAYS, CAUSED_ALL, ANTI_ALL]
        } },
      { type: "result", attempt: 1, allH: "All four. That’s a complete, careful answer.", btn: "Hear a strong answer" },
      { type: "hear", name: "Samira", voice: "f", h: "A strong answer to Samira, with each key point marked",
        lines: [
          { who: "c", t: '<span class="pt" data-n="1">The US company bringing goods in pays the tariff, like a plant buying Canadian steel, and most of it ends up in higher prices here.</span> <span class="pt" data-n="2">Car parts cross the border back and forth, so tariffs can hit the same part more than once.</span>' },
          { who: "c", t: '<span class="pt" data-n="3">Michigan has about 4,000 fewer auto parts jobs than a year ago. Tariffs may be one reason, but nobody\u2019s measured how much.</span>' },
          { who: "c", t: '<span class="pt" data-n="4">El-Sayed wants targeted tariffs, not \u201Cdumb\u201D ones, with unions at the table. Rogers backed the tariffs, and now wants the Canada fight ended.</span>' }
        ], btn: "Spot the mistake in another answer" },
      { type: "catch", name: "Samira", h: "This canvasser gets one thing wrong. Tap it.", ask: "Who actually pays for these tariffs?",
        lines: ["The tariff is paid by the US company bringing the steel in.", "Parts cross the border back and forth, so tariffs can hit them more than once.", "Canada pays these tariffs, so they don’t cost us anything."], wrong: 2,
        why: "The US company bringing goods in pays the tariff, and most of the cost stays in the US. It’s the most common mix-up about tariffs.",
        notIt: "That line is accurate. Look for the one that gets who pays wrong.", btn: "Try tomorrow’s door now" },
      { type: "door", attempt: 2, voter: "ray", name: "Ray", voice: "m", who: "Ray at his front door",
        intro: "Tomorrow’s warmup (try it now in this preview): a different business. Use the chain you learned, not a memorized answer.",
        ask: "I run a hardware store in Lansing. A lot of my tools and lumber come from suppliers in Canada. If tariffs go up on that stuff, does that hurt me or help me?",
        example: "Most likely it costs you more. The tariff is paid at the border by whoever brings the goods in, so either you or your US supplier pays it, and they'd probably charge you more. Then you'd have to raise prices, take a smaller profit, or look for other suppliers. How much it hurts depends on whether you can pass it on.",
        rubric: {
          ask: "I run a hardware store in Lansing. A lot of my tools and lumber come from suppliers in Canada. If tariffs go up on that stuff, does that hurt me or help me?",
          facts: FACTS.concat(["For Ray: the tariff is paid at the border by whoever imports the goods into the US, Ray himself if he imports directly or his US supplier, who will likely charge him more. He may then raise prices, take a smaller profit or switch suppliers; the overall effect depends on details."]),
          items: [
            { id: "who2", label: "Said who pays first", all: [/(supplier|importer|whoever brings|bring(s|ing)? (it|them|the goods|that stuff|stuff) in|at the border|(you|he|they)( would|'d| will)? pay(s)? (the|that|a) (tariff|tax))/i], ai: "Explains that the tariff is paid at the border by whoever imports the goods into the US: Ray if he imports directly, or his US supplier, who will likely charge him more.", tip: "Start with who pays: Ray, or the US supplier bringing the goods in, pays the tariff at the border." },
            { id: "options2", label: "Named what can happen next", all: [/(raise|higher|pass (it|that|the cost)|prices?|profit|margin|eat|absorb|switch|other suppliers?|somewhere else|elsewhere|american.made|us.made)/i], ai: "Names at least one realistic response: Ray pays more and raises prices, takes a smaller profit, or switches to other suppliers.", tip: "Say what he can do: raise prices, take a smaller profit or find other suppliers." },
            { id: "honest2", label: "Was honest about the uncertainty", all: [/(depend|might|may|could|not sure|hard to say|probably|likely)/i], ai: "Says the effect depends on details (how much he can pass on, competitors, other suppliers) instead of promising it will only hurt or only help.", tip: "Be honest: “It depends on whether you can pass the cost on or switch suppliers.”" }
          ],
          flags: [CANADA_PAYS, { re: /(definitely|guarantee|for sure)[^.]{0,20}(help|hurt)/i, why: "Nobody can promise that. It depends on his costs and his options." }]
        } },
      { type: "result", attempt: 2, allH: "You traced a tariff through a new business. That’s the skill.", btn: "Finish the lesson" },
      { type: "done", scroll: true, h: "You can explain tariffs and auto jobs", d1: "Samira", d2: "Ray",
        can: [
          { t: "Say where a tariff is charged and who pays it first", any: true, from: [[1, "who"], [2, "who2"]], tip: "The US company bringing goods in pays at the border." },
          { t: "Explain why parts that cross back and forth cost more", from: [[1, "chain"]], tip: "Parts cross the border several times, so tariffs can hit more than once." },
          { t: "Be honest about what the job numbers show", from: [[1, "honest"]], tip: "About 4,000 fewer parts jobs; tariffs may be one reason, not proven." },
          { t: "Say fairly where both candidates stand", from: [[1, "sides"]], tip: "El-Sayed: targeted tariffs, not dumb ones. Rogers: backed them, now wants the Canada fight ended." }
        ],
        tomorrow: "We’ll ask you who pays a US tariff, and why auto parts can get hit more than once.",
        origin: "A real 2026 race: Abdul El-Sayed (Democrat) and Mike Rogers (Republican) for U.S. Senate in Michigan. Their positions come from their own statements and news coverage during the campaign, which ended on Election Day, Nov 3, 2026. Built by Warmup from public sources; not affiliated with or approved by either campaign. Samira, Ray and the Grand Rapids furniture maker are made-up examples.",
        btn: "Back to lessons" }
    ]
  };
})();
