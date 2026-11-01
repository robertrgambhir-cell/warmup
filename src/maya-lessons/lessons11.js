  /* ---------- version 11 lessons (rules: claude/campaign-demos/lesson-playbook.md). Inside a lesson the real candidate is "Maya" and the opponent is "her Republican opponent"; the real names appear only on the end card. ---------- */
  var BLUE_BG = "linear-gradient(165deg,#24569f 0%,#1F4C91 55%,#163a72 100%)", ANCHOR_BG = "radial-gradient(110% 70% at 50% 0%,#2b3d5e 0%,#1d1c22 62%)", DARK_BG = "radial-gradient(120% 80% at 50% 100%,#3a2c18 0%,#1b1a1f 60%)";
  var PARTS = ["Learn", "1st try", "Hear it done", "Catch the mistake", "2nd try"];
  var PART_MIN = ["2 min", "30 sec", "1 min", "30 sec", "1 min"];
  function sup(n) { return '<sup class="sn">' + n + '</sup>'; }
  var PERSON = '<svg viewBox="0 0 24 30" aria-hidden="true"><circle cx="12" cy="7" r="5.5" fill="currentColor"/><path d="M3 29v-6c0-5 4-9 9-9s9 4 9 9v6z" fill="currentColor"/></svg>';
  function icard(c, title, icon, chips) { return '<div class="st-icard" aria-hidden="true" style="--ic:' + c[0] + ';--ics:' + c[1] + ';--icl:' + c[2] + ';--ish:' + c[3] + '"><div class="ic-top">' + icon + '<b>' + title + '</b></div><i></i><i class="s"></i><div class="ic-row">' + chips.map(function (x) { return '<span>' + x + '</span>'; }).join("") + '</div></div>'; }
  function vbars(rows, max) { return '<div class="vb">' + rows.map(function (r, k) { return '<div class="col"><b>' + r[1] + '</b><div class="bar" style="--h:' + Math.max(6, Math.round(r[2] / max * 150)) + 'px;background:' + r[3] + ';transition-delay:' + (k * 180) + 'ms"></div><span>' + r[0] + '</span></div>'; }).join("") + '</div>'; }
  function hrows(rows, max) { return '<div class="hr">' + rows.map(function (r, k) { return '<div class="row"><span>' + r[0] + '</span><div class="trk"><i style="--w:' + (r[2] / max * 100).toFixed(1) + '%;background:' + r[3] + ';transition-delay:' + (k * 200) + 'ms"></i><b>' + r[1] + '</b></div></div>'; }).join("") + '</div>'; }

  /* cover: the issue, one line, then the five parts; Learn lists what you'll learn (the same three moves the practice checks) */
  /* cover (Robert, Oct 31, 11:33 PM): only the issue and what you'll learn; how a lesson works moved to its own screen before the first lesson */
  function cover(issue, moves, next) { return { bg: BLUE_BG, dark: true, next: next, html: function () {
    return '<h2 class="cv-h">' + issue + '</h2><p class="cv-sub">One of the top 5 issues voters are raising at the door.</p>' +
      '<div class="cv-learn"><p class="cv-here">What you’ll learn</p><ol>' + moves.map(function (m, k) { return '<li><i>' + (k + 1) + '</i><span>' + m[0] + '</span></li>'; }).join("") + '</ol></div>'; } }; }
  function stance(h, items, note, src) { return { bg: "#EEF3FB", next: "How her opponent’s plan differs", src: src, html: function () {
    return '<h2 class="mya"><span class="mk">Where Maya stands</span>' + h + '</h2><ol class="m3">' + items.map(function (it, k) { return '<li class="' + (it[0] || "") + '"><i>' + (k + 1) + '</i><div><b>' + it[1] + '</b><span>' + it[2] + '</span></div></li>'; }).join("") + '</ol>' + (note ? '<p class="m3n">' + note + '</p>' : ""); } }; }
  function plans(h, base, k, j, note, src) { return { bg: "#FBF6EE", next: "What your vote decides", src: src, html: function () {
    var col = function (c, who, a) { return '<div class="col ' + c + '"><small>' + who + '</small><b>' + a[0] + '</b>' + a.slice(1).map(function (r) { return '<span>' + r + '</span>'; }).join("") + '</div>'; };
    return '<h2 class="st-h">' + h + '</h2><div class="tp"><div class="base"><small>Today</small>' + base + '</div><div class="cols">' + col("k", "Maya", k) + col("j", "Her opponent", j) + '</div>' + (note ? '<p class="note">' + note + '</p>' : "") + '</div>'; } }; }
  function fork(h, kt, jt, note, src) { return { bg: "#F3EFE8", next: "Your line for the door", src: src, html: function () {
    var ch = function (x, y) { return '<path d="M' + (x - 7) + ' ' + y + ' L' + x + ' ' + (y + 7) + ' L' + (x + 7) + ' ' + y + '" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; };
    var dg = function (x, y, d) { return '<path d="M' + (x - 8 * d) + ' ' + (y - 2) + ' L' + x + ' ' + (y + 7) + ' L' + (x + 3 * d) + ' ' + (y - 5) + '" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; };
    return '<span class="st-kick">What your vote decides</span><h2 class="st-h">' + h + '</h2><div class="fk"><svg viewBox="0 0 300 150" aria-hidden="true"><path d="M150 0 L150 70 C150 104 70 100 62 146 M150 70 C150 104 230 100 238 146" stroke="#d6c9b4" stroke-width="28" fill="none" stroke-linecap="round"/>' + ch(150, 12) + ch(150, 38) +
      dg(101, 104, -1) + dg(199, 104, 1) + dg(71, 128, -1) + dg(229, 128, 1) + '<circle cx="62" cy="144" r="9" fill="#2f6f9f"/><circle cx="238" cy="144" r="9" fill="#8d4b3c"/></svg>' +
      '<div class="ends"><div class="end k"><small>If Maya wins</small><b>' + kt + '</b></div><div class="end j"><small>If her opponent wins</small><b>' + jt + '</b></div></div></div>' + (note ? '<p class="fk-note">' + note + '</p>' : ""); } }; }
  function keep(today, k, j) { return { bg: ANCHOR_BG, dark: true, next: "Practice it at a door", html: function () {
    return '<span class="st-kick">Your line for the door</span><div class="lk"><div><small>Today</small><p>' + today + '</p></div><div class="k"><small>Maya</small><p>' + k + '</p></div><div class="j"><small>Her opponent</small><p>' + j + '</p></div></div>'; } }; }
  function promise(o) { return { bg: DARK_BG, dark: true, next: o.next, src: o.src, html: function () {
    return '<h2 class="st-h">' + o.h + '</h2>' + (o.quote ? '<p class="st-q">“' + o.quote + '”<small>' + o.who + '</small></p>' : "") +
      '<div class="st-bars2"><div class="col"><b class="v">' + o.pv + '</b><div class="bar goal" style="--h:' + o.ph + 'px"></div><span>' + o.pl + '</span></div><div class="col"><b class="v glow">' + o.rv + '</b><div class="bar got" style="--h:' + o.rh + 'px"></div><span>' + o.rl + '</span></div></div>' +
      '<p class="st-punch">' + o.punch + '</p>'; } }; }

  /* a headline from an independent newsroom, so the takeaway is theirs, not ours (Robert, Oct 31, 6:18 PM); the outlet's name in plain text, never its logo */
  function news(outlet, date, head, url, by) { return '<a class="news" href="' + url + '" target="_blank" rel="noopener"><span class="nw-o">' + outlet + '</span><span class="nw-h">' + head + '</span><span class="nw-d">' + date + (by ? ' · ' + by : '') + ' ↗</span></a>'; }
  /* US tile map: 40 states and DC expanded Medicaid; 10 didn't */
  /* placed by each state's real location (centroids assigned to a 12 by 7 grid, then hand-checked: DC beside Maryland and Virginia, North Carolina above South Carolina) */
  var TILES = [["WA",0,0],["MT",0,2],["ND",0,3],["MN",0,4],["VT",0,10],["ME",0,11],["OR",1,0],["ID",1,1],["WY",1,2],["SD",1,3],["IA",1,4],["WI",1,5],["MI",1,6],["NY",1,9],["MA",1,10],["NH",1,11],["NV",2,0],["UT",2,1],["CO",2,2],["NE",2,3],["MO",2,4],["IL",2,5],["IN",2,6],["OH",2,7],["PA",2,8],["NJ",2,9],["CT",2,10],["RI",2,11],["CA",3,0],["AZ",3,1],["NM",3,2],["KS",3,3],["AR",3,4],["KY",3,6],["WV",3,7],["MD",3,8],["DE",3,9],["OK",4,3],["LA",4,4],["MS",4,5],["TN",4,6],["VA",4,7],["DC",4,8],["AK",5,0],["TX",5,3],["AL",5,5],["GA",5,6],["NC",5,7],["HI",6,1],["FL",6,6],["SC",6,7]];
  function usmap(no) {
    var grid = {}; TILES.forEach(function (t) { grid[t[1] * 12 + t[2]] = t[0]; });
    var h = "";
    for (var c = 0; c < 84; c++) { var s = grid[c]; h += s ? '<i class="' + (s === "GA" ? "ga" : no.indexOf(s) >= 0 ? "n" : "y") + '" style="transition-delay:' + (c * 9) + 'ms">' + s + '</i>' : '<i class="e"></i>'; }
    return '<div class="usmap" role="img" aria-label="Map: 40 states and DC expanded Medicaid. 10 did not: ' + no.join(", ") + '.">' + h + '</div>';
  }
  var GA_SHAPE = '<svg viewBox="0 0 92 104" role="img" aria-label="Map of Georgia"><path d="M4.5 3.0 L48.6 3.0 L52.3 13.5 L57.6 23.0 L64.6 32.4 L69.9 38.8 L77.0 45.0 L84.0 57.6 L88.4 65.0 L84.0 70.2 L81.4 80.7 L77.9 92.3 L69.0 92.9 L67.3 97.5 L64.6 100.5 L63.7 96.1 L50.5 95.4 L32.9 93.8 L17.7 93.1 L16.1 87.0 L14.3 74.4 L15.2 66.0 L12.6 57.6 L12.1 49.2 L9.9 34.5 L6.9 17.8Z" fill="#f3c9bf" stroke="#C2412D" stroke-width="2" stroke-linejoin="round"/><g fill="#C2412D">' + (function () { var d = ""; for (var k = 0; k < 20; k++) { d += '<circle cx="' + (24 + (k % 5) * 10) + '" cy="' + (36 + Math.floor(k / 5) * 12) + '" r="3.4"/>'; } return d; })() + '</g></svg>';

  /* ===================== 1. Georgia: health coverage ===================== */
  var SG = {
    gbpi: ["GBPI, Georgia Medicaid budget overview, 2025", "https://gbpi.org/?p=39138"],
    kffPar: ["KFF, Medicaid income limits for parents", "https://www.kff.org/affordable-care-act/state-indicator/medicaid-income-eligibility-limits-for-parents/"],
    hhs: ["HHS 2026 poverty guidelines", "https://aspe.hhs.gov/Poverty-Guidelines"],
    paFlier: ["2026 Pathways limits", "https://healthyfuturega.org/wp-content/uploads/2023/08/2026-Pathways-Eligibility-Flier-.pdf"],
    rec: ["Georgia Recorder via Cobb County Courier, Sep 2026", "https://cobbcountycourier.com/2026/09/is-jacksons-intelligent-medicaid-expansion-weak-tea-or-a-revolutionary-fix/"],
    census: ["US Census, Savannah", "https://www.census.gov/quickfacts/savannahcitygeorgia"],
    ccf: ["Georgetown CCF, Georgia’s uninsured workers", "https://ccf.georgetown.edu/2021/04/28/a-profile-of-georgias-low-wage-uninsured-workers/"],
    hc: ["HealthCare.gov, Medicaid expansion", "https://www.healthcare.gov/medicaid-chip/medicaid-expansion-and-you/"],
    kffScotus: ["KFF, the 2012 Supreme Court ruling", "https://www.kff.org/health-reform/issue-brief/a-guide-to-the-supreme-courts-affordable-care-act-decision/"],
    kffStatus: ["KFF, which states expanded", "https://www.kff.org/status-of-state-medicaid-expansion-decisions/"],
    kemp: ["Gov. Kemp’s office, Aug 2024", "https://gov.georgia.gov/press-releases/2024-08-19/governor-kemp-joined-commissioners-john-king-and-russel-carlson-provides"],
    cbeat23: ["Capitol Beat, the state’s first-year estimate", "https://capitol-beat.org/2023/06/limited-georgia-medicaid-expansion-launches-this-weekend/"],
    dch: ["Georgia DCH filing, Aug 2026", "https://www.medicaid.gov/medicaid/section-1115-demonstrations/downloads/ga-pathways-fmap-amendment-app-10012026.pdf"],
    gao: ["GAO report via WABE, Sep 2025", "https://www.wabe.org/?p=866284"],
    ajcN: ["The Atlanta Journal-Constitution (KFF Health News), Mar 2024", "https://www.ajc.com/news/health-news/georgias-medicaid-work-requirements-costs-millions-despite-low-enrollment/5BOJLD6GQFBIZJMPTD64FPYRMQ/"],
    care: ["Maya’s plan (the Bottoms CARE Plan)", "https://www.keishaforgovernor.com/klb-policy-careplan-1.pdf"],
    jackson: ["His Sept 8 rollout, Capitol Beat", "https://capitol-beat.org/?p=18845"],
    ajcJ: ["AJC on his plan", "https://www.ajc.com/politics/2026/09/rick-jackson-proposes-intelligent-medicaid-expansion-in-georgia/"],
    gpb: ["GPB News, Oct 2026 (work rules either way)", "https://www.gpb.org/news/2026/10/01/medicaid-work-requirements-are-here-stay-no-matter-who-wins-georgia-governors-race"]
  };
  var GA_MOVES = [["The problem", "About 200,000 working Georgians earn too much for Medicaid and too little to buy insurance"], ["Maya’s plan", "Full Medicaid expansion, and end Pathways"], ["Her opponent’s plan", "A Pathways-style plan with work rules"]];
  var GA_STORY = [
    cover("Health coverage", [["Who gets left out today"], ["Maya’s plan: full Medicaid expansion"], ["How her opponent’s plan differs"]], "Learn about health coverage"),
    { bg: "#FDE9EC", next: "Who that line leaves out", src: [SG.gbpi, SG.kffPar], html: function () {
      return '<h2 class="st-h lg">What’s Medicaid?</h2>' +
        icard(["#b23a5a", "#fde9ec", "#f3dbe1", "rgba(150,40,70,.45)"], "MEDICAID", '<svg viewBox="0 0 24 24" width="30" height="30"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.3 5.3 3.3 1.7-2 3.1-3.3 5.3-3.3 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" fill="#e2557a"/><path d="M12 9.5v6M9 12.5h6" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>', ["Doctor", "Hospital", "Medicine"]) +
        '<p class="st-p">Health coverage for people with low incomes, paid by the state and federal government. About <b>18%</b> of Georgians have it, and <b>71%</b> of them are children.' + sup(1) + '</p>' +
        '<p class="st-p small">That count includes PeachCare for Kids, the version for children whose families earn a bit too much for Medicaid.</p>' +
        '<div class="bignum"><b>$8,000</b><span>For adults the line is strict: a parent of two must earn less than this a year.' + sup(2) + '</span></div>'; } },
    { bg: "#E8F1FB", next: "How many Georgians are in Bri’s spot", src: [SG.kffPar, SG.hhs, SG.paFlier], html: function () {
      var p = function (cls, name, pay, cov) { return '<div class="p ' + cls + '"><span class="mk">' + (cls === "bad" ? "✕" : "✓") + '</span>' + PERSON + '<b>' + name + '</b><small>' + pay + '</small><span class="cv">' + cov + '</span></div>'; };
      return '<h2 class="st-h">Three sisters, each a mom of two. <span class="st-red">Bri falls through the gap.</span></h2>' +
        '<div class="sis3" role="img" aria-label="Ana earns $7,000 and has Medicaid. Bri earns $14,000 and has no coverage: she is in the gap. Dee earns $45,000 and has insurance through her job.">' + p("ok", "Ana", "$7,000", "Medicaid") + p("bad", "Bri", "$14,000", "No coverage") + p("ok", "Dee", "$45,000", "Job insurance") + '</div><div class="incl" aria-hidden="true"><span>Lower pay</span><span>Higher pay</span></div>' +
        '<p class="st-p">Bri earns too much for Medicaid and too little for help buying a plan, which starts at about $27,000 for her family.' + sup(2) + '</p>' +
        '<p class="st-p small">This is the <b>coverage gap</b>. (Pathways can cover Bri, but only if she proves 80 work hours a month.' + sup(3) + ')</p>'; } },
    { bg: "#FBEFE9", next: "What Medicaid expansion is", src: [SG.rec, SG.census, SG.ccf], html: function () {
      return '<h2 class="st-h">About 200,000 Georgia adults are in Bri’s spot.' + sup(1) + '</h2>' +
        '<div class="ga-map">' + GA_SHAPE + '<div><b>200,000</b><span>More people than live in Savannah (148,000).' + sup(2) + '</span></div></div>' +
        '<div class="cmp2" aria-hidden="true"><div class="r"><span>In the gap</span><div class="t"><i style="--w:100%;background:#C2412D">~200,000</i></div></div><div class="r"><span>Savannah</span><div class="t"><i style="--w:74%;background:#b9a98f">148,000</i></div></div></div>' +
        '<p class="st-p small">Most of them work: cashiers, cooks, home health aides, jobs that rarely come with insurance.' + sup(3) + '</p>'; } },
    { bg: "#DDF1E5", next: "Who said yes, and who didn’t", src: [SG.hc, SG.kffScotus, SG.kffStatus], html: function () {
      var b = ""; for (var k = 0; k < 10; k++) b += '<i class="' + (k === 9 ? "st" : "") + '" style="transition-delay:' + (k * 90) + 'ms">$</i>';
      return '<h2 class="st-h">Medicaid expansion: the federal government pays 90%.</h2>' +
        '<p class="st-p">In 2010, President Obama’s Affordable Care Act offered every state a deal: cover all adults earning up to about <b>$22,000</b> a year.' + sup(1) + '</p>' +
        '<div class="bills" role="img" aria-label="For every 10 dollars of care, the federal government pays 9 and Georgia pays 1.">' + b + '</div><div class="bills-k"><span>Federal government: $9</span><span class="st">Georgia: $1</span></div>' +
        '<p class="st-p small">A 2012 Supreme Court ruling made it each state’s choice.' + sup(2) + ' Georgia keeps saying no, turning down federal money it’s eligible for, money Georgians’ federal taxes already help pay.' + sup(3) + '</p>'; } },
    { bg: "#F2F6F3", next: "What Georgia did instead", src: [SG.kffStatus], html: function () {
      return '<h2 class="st-h">40 states and DC said yes. Georgia is one of 10 that didn’t.' + sup(1) + '</h2>' + usmap(["AL", "FL", "GA", "KS", "MS", "SC", "TN", "TX", "WI", "WY"]) +
        '<div class="map-k"><span>Expanded</span><span class="n">Didn’t</span><span class="ga">Georgia</span></div><p class="st-p small">Even North Carolina, next door, said yes in 2023.</p>'; } },
    { bg: "#F4EEE6", next: "How Pathways turned out", src: [SG.kemp, SG.paFlier], html: function () {
      return '<h2 class="st-h">In 2023, Gov. Brian Kemp chose his own plan instead: Georgia Pathways.</h2>' +
        '<div class="fl"><div><small>Who</small><span>Adults earning up to about $16,000 a year.' + sup(2) + '</span></div><div><small>The catch</small><span>Prove 80 hours a month of work, school or volunteering.' + sup(2) + '</span></div><div><small>His case</small><span>Coverage tied to work, at a cost Georgia controls, as “a pathway to an education, a job, a career.”' + sup(1) + '</span></div></div>'; } },
    { bg: DARK_BG, dark: true, next: "Where Maya stands", src: [SG.cbeat23, SG.dch, SG.gao, SG.ajcN], html: function () {
      return news("The Atlanta Journal-Constitution", "March 2024", "Georgia’s Medicaid work requirements cost millions, despite low enrollment", SG.ajcN[1], "by KFF Health News") + '<h2 class="st-h sm">Brian Kemp’s Georgia Pathways, three years in:</h2>' +
        '<div class="duo"><div><small>Who it reached</small><div class="bars"><div><b>100,000</b><i style="--h:96px"></i><span>Goal' + sup(1) + '</span></div><div><b>~20,000</b><i class="hot" style="--h:20px"></i><span>Enrolled' + sup(2) + '</span></div></div></div>' +
        '<div><small>Where $80M went</small><div class="bars"><div><b>$54M</b><i class="hot" style="--h:96px"></i><span>Running it' + sup(3) + '</span></div><div><b>$26M</b><i style="--h:46px"></i><span>Care' + sup(3) + '</span></div></div></div></div>' +
        '<p class="st-p dim">The 100,000 goal was for year one. Two of every three dollars went to administration.</p>'; } },
    stance("End what isn’t working. Cover the gap.", [["end", "End Brian Kemp’s Georgia Pathways", "It reached about 20,000 people and spent most of its money on administration."], ["", "Pass full Medicaid expansion", "Every adult earning up to about $22,000 qualifies. The federal government pays 90%."], ["", "Fund rural hospitals", "A separate plan, Rural Care First: higher payments to keep small-town hospitals and clinics open."]],
      "She’d push the legislature to pass Medicaid expansion and rural hospital funding.", [SG.care]),
    plans("Two plans for Georgians like Bri", "Parents qualify under about $8,000. Other adults only through Pathways, with 80 work hours a month." + sup(1),
      ["Full Medicaid expansion", "Every adult earning up to about $22,000.", "The federal government pays 90%."],
      ["“Intelligent Medicaid expansion”", "“On day one, I will close the coverage gap.”" + sup(2), "A Pathways-style plan; how many it covers isn’t set." + sup(2)],
      "The 90% normally goes only to full expansion. Either way, a 2025 federal law adds work rules: 80 hours a month, with exemptions." + sup(3), [SG.paFlier, SG.rec, SG.gpb]),
    fork("Which plan Georgia’s next governor pushes", "Full Medicaid expansion for adults up to about $22,000. Pathways ends.", "A Pathways-style plan with work rules. How many it covers isn’t set.", "The governor doesn’t pass laws; the legislature does. But the governor has tremendous influence over what it passes.", []),
    keep("Georgia covers adults only if they’re parents earning under about $8,000, or through Pathways with work hours.", "Full Medicaid expansion: every adult up to about $22,000 covered. End Pathways.", "A Pathways-style plan with work rules.")
  ];


  /* ===================== 2. Texas: school vouchers ===================== */
  var ST = {
    tefa: ["Texas Education Freedom Accounts", "https://educationfreedom.texas.gov/"],
    lbb: ["SB 2 fiscal note", "https://capitol.texas.gov/tlodocs/89R/fiscalnotes/html/SB00002H.htm"],
    trib: ["Texas Tribune, Sept 2026", "https://www.texastribune.org/2026/09/03/texas-school-voucher-program-2-billion-expansion-budget-comptroller/"],
    tea: ["TEA enrollment 2025-26", "https://tea.texas.gov/data-reports/school-performance/accountability-research/enroll-2025-26.pdf"],
    kprc: ["KPRC, state voucher data", "https://www.click2houston.com/news/local/2026/08/18/70-of-texas-voucher-awardees-previously-attended-private-school-or-were-homeschooled-state-data-shows/"],
    ag: ["Her opponent’s AG release", "https://www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-celebrates-school-choice-texans-and-vows-defend-new-law"],
    abbott: ["Gov. Abbott’s signing release", "https://gov.texas.gov/news/post/governor-abbott-signs-landmark-school-choice-legislation-into-law"],
    irs: ["IRS, federal scholarship credit", "https://www.irs.gov/charities-non-profits/federal-scholarship-tax-credit-fstc"],
    ivg: ["Her opponent’s questionnaire", "https://ivoterguide.com/candidate/2902/race/28707/election/1433"],
    site: ["Maya’s plan (Talarico campaign)", "https://jamestalarico.com/issue/public-education/"],
    vote: ["KWTX/Texas Tribune, the House vote", "https://www.kwtx.com/2025/04/17/voucher-vote-updates-bid-send-voucher-plan-statewide-vote-is-defeated/"]
  };
  var TX_MOVES = [["The problem", "Texas sends $1 billion of tax money to private schools, mostly for kids already there"], ["Maya’s plan", "Fight vouchers going nationwide; public money for public schools"], ["Her opponent’s plan", "Backs vouchers and wants the Department of Education gone"]];
  var TX_STORY = [
    cover("School vouchers", [["Where Texas tax money is going"], ["Maya’s plan: public money for public schools"], ["How her opponent’s plan differs"]], "Learn about school vouchers"),
    { bg: "#E6EFFA", next: "Why Texas did it", src: [ST.tefa, ST.lbb], html: function () {
      return '<h2 class="st-h lg">What’s a voucher?</h2>' +
        icard(["#1f5f99", "#e3eef8", "#d4e3f2", "rgba(31,95,153,.4)"], "VOUCHER", '<svg viewBox="0 0 24 24" width="30" height="30"><path d="M2 9.5 12 4.5l10 5-10 5z" fill="#1f5f99"/><path d="M6.5 11.8v4.2c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.2" fill="none" stroke="#1f5f99" stroke-width="2"/></svg>', ["Tax money", "Private school"]) +
        '<p class="st-p">State tax money a family can spend on private school. Texas started them this school year: <b>$10,474</b> a year for most students, up to $30,000 with a disability.' + sup(1) + '</p>' +
        '<div class="bignum"><b style="color:#1f5f99">$1B</b><span>Year one’s budget, from the same state budget that pays for public schools.' + sup(2) + '</span></div>'; } },
    { bg: "#FDF1D6", next: "Who got the money", src: [ST.abbott, ST.ag], html: function () {
      return '<h2 class="st-h">In 2025, Gov. Greg Abbott signed vouchers into law.' + sup(1) + '</h2>' +
        '<div class="fl"><div><small>The case</small><span>Parents choose their kids’ school, so kids don’t “be trapped in schools that fail to meet their academic needs.”' + sup(2) + '</span></div><div><small>Who said it</small><span>Maya’s Republican opponent, who as attorney general vowed: “I promise to vigorously defend this law.”' + sup(2) + '</span></div></div>'; } },
    { bg: "#FCEBD8", next: "Where it’s headed", src: [ST.kprc, ST.trib, ST.tea], html: function () {
      var kids = ""; for (var k = 0; k < 10; k++) kids += '<i class="' + (k < 7 ? "a" : "b") + '" style="animation-delay:' + (200 + k * 90) + 'ms">' + PERSON + '</i>';
      return '<h2 class="st-h">7 in 10 vouchers went to kids who weren’t in public school to begin with.' + sup(1) + '</h2>' +
        '<div class="sk-kids" role="img" aria-label="7 of 10 voucher students were already in private school or homeschool; 3 came from public school">' + kids + '</div><div class="st-legend"><span><i style="background:#e08a2c"></i>Already in private school or homeschool</span><span><i style="background:#3b80b6"></i>From public school</span></div>' +
        '<p class="st-p small">About 110,000 students got one this fall, about 2% of Texas kids; 106,000 more were waitlisted.' + sup(2) + '</p>'; } },
    { bg: "#EEF3FB", next: "Where Maya stands", src: [ST.lbb, ST.trib, ST.abbott], html: function () {
      return news("The Texas Tribune", "Sept 3, 2026", "Comptroller requests doubling Texas school voucher program to $2 billion", ST.trib[1]) + '<h2 class="st-h sm">It’s built to grow, out of the same budget that pays for public schools.</h2>' +
        vbars([["2027", "$1.0B", 1, "#e0b98a"], ["2028", "$3.1B", 3.1, "#e08a2c"], ["2030", "$4.0B", 4, "#b5541b"]], 4) + '<p class="st-p small">The Legislature’s own cost estimate.' + sup(1) + ' Gov. Abbott promised in 2022: “If you like the public school your child is attending, it will still be fully funded.”' + sup(3) + '</p>'; } },
    stance("Public money for public schools.", [["end", "Stop vouchers going nationwide", "She calls them “voucher scams” that “defund public schools.”"], ["", "Protect public school funding", "Keep the US Department of Education and the special education money it guarantees."], ["", "Fund teachers and pre-K", "Hire more teachers, raise their pay and bring universal pre-K."]],
      "Her record: a former public school teacher, she voted no on the Texas law and tried to send it to a statewide vote. The House killed that, 86 to 62.", [ST.site, ST.vote]),
    plans("Should tax dollars pay for private school?", "Texas vouchers are state law; a senator can’t cancel them. The Senate votes on a federal private-school tax credit and on the Department of Education." + sup(1),
      ["No", "Voted against the Texas law.", "Would fight vouchers going nationwide."],
      ["Yes", "As attorney general: “I promise to vigorously defend this law.”" + sup(2), "“I support eliminating the U.S. Department of Education.”" + sup(3)], "", [ST.irs, ST.ag, ST.ivg]),
    fork("Which senator Texas sends to Washington", "Fights vouchers going nationwide and protects public school money.", "Backs vouchers and wants the Department of Education gone.", "A senator can’t change the Texas program, but every Senate vote decides whether vouchers go nationwide.", []),
    keep("Texas spends $1 billion a year on vouchers, and 7 in 10 went to kids already out of public school.", "Fight vouchers going nationwide. Public money for public schools.", "Backs vouchers and wants the Department of Education gone.")
  ];

  /* ===================== 3. Ohio: electric bills ===================== */
  var SO = {
    occ: ["Ohio Consumers’ Counsel", "https://occ.ohio.gov/sites/default/files/2026-03/OCC-Data-Centers-in-Ohio.pdf"],
    pf: ["PolitiFact, PUCO bill data", "https://politifact.com/factchecks/2026/jul/20/sherrod-brown/sherrod-brown-blames-hb-6-for-electric-bill-spike-experts-say-the-law-wasnt-the-main-cause/"],
    imm: ["Utility Dive, PJM market monitor", "https://www.utilitydive.com/news/data-centers-pjm-capacity-auction/808951/"],
    doj: ["US Justice Department", "https://www.justice.gov/usao-sdoh/pr/former-ohio-house-speaker-sentenced-20-years-prison-leading-racketeering-conspiracy"],
    hus: ["Her opponent’s Senate release", "https://www.husted.senate.gov/?p=12816"],
    n5: ["News 5 Cleveland, his floor remarks", "https://www.news5cleveland.com/news/local-news/data-centers-remain-a-flashpoint-in-ohios-u-s-senate-race"],
    rc: ["Roll Call, Senate vote", "https://rollcall.com/2026/09/30/voluntary-ratepayer-protection-bill-blocked-in-senate-again/"],
    jobs: ["JobsOhio release, 2023", "https://www.jobsohio.com/news-press/amazon-web-services-plans-to-invest-an-estimated-7-8-billion-in-ohio"],
    fox: ["Maya’s words (Brown campaign video via Fox News)", "https://www.foxnews.com/politics/brown-embraced-amazon-data-centers-blaming-higher-utility-costs-high-stakes-senate-race"],
    site: ["Maya’s plan (Brown campaign)", "https://www.sherrodbrown.com/our-fight/"]
  };
  var OH_MOVES = [["The problem", "Bills are up by more than half since 2019, mostly from data center demand"], ["Maya’s plan", "Require data centers to pay their full power costs"], ["Her opponent’s plan", "A bill that leaves it up to each state"]];
  var OH_STORY = [
    cover("Your electric bill", [["Why Ohio bills went up"], ["Maya’s plan: data centers pay their way"], ["How her opponent’s plan differs"]], "Learn about electric bills"),
    { bg: "#E9EEF6", next: "What’s happened to bills", src: [SO.occ], html: function () {
      var racks = ""; for (var c = 0; c < 3; c++) for (var r = 0; r < 5; r++) racks += '<rect x="' + (44 + c * 74) + '" y="' + (40 + r * 18) + '" width="62" height="12" rx="3" fill="#33435f"/><circle class="blink" style="animation-delay:' + ((c * 5 + r) * 170 % 1300) + 'ms" cx="' + (96 + c * 74) + '" cy="' + (46 + r * 18) + '" r="2.6" fill="#7ee0a8"/>';
      return '<h2 class="st-h lg">What’s a data center?</h2>' +
        '<svg class="sk-dc" viewBox="0 0 300 150" aria-hidden="true"><rect x="30" y="26" width="240" height="114" rx="14" fill="#1f2a3d"/>' + racks + '<path class="bolt" d="M262 10 L250 32 H260 L252 52 L274 24 H263 L270 10z" fill="#f2b134"/></svg>' +
        '<p class="st-p">A building packed with computers that run the internet and AI, day and night. Ohio has about <b>200</b>, the fifth most in the country.' + sup(1) + '</p><p class="st-p small">By 2030 they could use about a tenth of all the electricity Ohio sells.' + sup(1) + '</p>'; } },
    { bg: "#FDF1D6", next: "Why bills went up", src: [SO.pf], html: function () {
      return '<h2 class="st-h">The average Ohio home electric bill is up more than half since 2019.' + sup(1) + '</h2>' +
        vbars([["Oct 2019", "$89/mo", 89, "#f2c76b"], ["Jan 2026", "$145/mo", 145, "#e08a1a"]], 145) + '<p class="st-p small">Up 13.5% in the last year alone.' + sup(1) + '</p>'; } },
    { bg: "#E6F2EC", next: "What Ohio remembers", src: [SO.imm], html: function () {
      return '<h2 class="st-h">The grid’s own watchdog says data centers are the main reason.' + sup(1) + '</h2>' +
        '<div class="pie"><div class="pc" style="--p:45"></div><div><b>45%</b><span>of a $47 billion jump in grid power costs over three years came from data center demand</span></div></div>' +
        '<p class="st-p small">Ohio is on PJM, the grid serving 13 states. Its costs flow into your bill.</p>'; } },
    { bg: DARK_BG, dark: true, next: "Her opponent’s fix", src: [SO.doj, SO.pf], html: function () {
      return '<h2 class="st-h">What Ohio remembers: House Bill 6, a $1.3 billion power-company bailout passed with bribes.' + sup(1) + '</h2>' +
        '<div class="sk-note"><b>Get this right at the door</b><span>HB6 isn’t why bills are up now: its nuclear charge was repealed before it was collected, and its coal charge ended in 2025.' + sup(2) + ' Maya’s opponent backed HB6 but was never charged.</span></div>'; } },
    { bg: "#F4EEE6", next: "Where Maya stands", src: [SO.n5, SO.hus, SO.rc, SO.jobs], html: function () {
      return '<h2 class="st-h">Her opponent’s fix: the Ratepayer Protection Act</h2><p class="st-q dk">“In plain language, if you create the cost, you should pay the cost.”' + sup(1) + '<small>Her opponent, on the Senate floor, 2026</small></p>' +
        '<div class="fl"><div><small>What</small><span>Asks each state to consider making data centers pay for the grid upgrades they need. No state has to.' + sup(2) + '</span></div><div><small>Where</small><span>Passed the House 417 to 3. Stalled in the Senate: 57 votes, 60 needed.' + sup(3) + '</span></div><div><small>Record</small><span>As lieutenant governor he recruited data centers, like Amazon’s $7.8 billion.' + sup(4) + '</span></div></div>'; } },
    stance("Data centers pay their own way.", [["", "Require data centers to pay their full power costs", "In her words: “I’ll require the data centers to pay the full cost of their own electricity, not you.”"], ["", "Fight to cap rate hikes", "Limit how much utilities can raise your rates. She hasn’t published details."], ["end", "End data center tax breaks", "And let towns decide where data centers go. She hasn’t proposed banning them."]],
      "A senator writes federal grid rules; Ohio sets local rates and tax breaks. Say “fighting for,” not “will cap.”", [SO.fox, SO.site]),
    plans("Who should pay for data centers’ power?", "Rising grid costs land on every customer’s bill, including yours." + sup(1),
      ["Require them to pay", "Data centers pay their full power costs.", "Plus a fight to cap rate hikes."],
      ["Ask states to consider it", "Each state decides; none has to." + sup(2), "Stalled in the Senate, 57 to 43." + sup(3)], "Both say towns should decide where data centers go.", [SO.imm, SO.hus, SO.rc]),
    fork("Which senator Ohio sends to Washington", "Pushes to require data centers to pay their full power costs.", "Keeps a bill that leaves it to each state.", "A senator can’t set Ohio’s rates, but votes on the federal rules that decide who pays for the grid.", []),
    keep("Ohio bills are up more than half since 2019, mostly from data center demand.", "Require data centers to pay their full power costs.", "A bill that leaves it up to each state.")
  ];

  /* ===================== 4. Maine: heating oil ===================== */
  var SM = {
    eia: ["EIA, how Maine heats", "https://www.eia.gov/consumption/residential/data/2020/state/pdf/State%20Space%20Heating%20Fuels.pdf"],
    doer: ["Maine Dept. of Energy Resources prices", "https://www.maine.gov/energy/heating-fuel-prices"],
    mills: ["Gov. Mills’s letter to Congress", "https://www.maine.gov/governor/mills/sites/maine.gov.governor.mills/files/2026-10/JTM%20to%20Delegation%20-%20LIHEAP%2010-02-2026.pdf"],
    heap: ["MaineHousing, HEAP", "https://www.mainehousing.org/programs-services/energy/energydetails/home-energy-assistance-program"],
    col1: ["Her opponent: early aid release", "https://www.collins.senate.gov/newsroom/as-mainers-face-rising-home-heating-oil-costs-senator-collins-announces-release-of-more-than-38-million-in-federal-home-heating-aid-for-maine-households"],
    col2: ["Her opponent: reserve release", "https://www.collins.senate.gov/newsroom/administration-responds-to-senators-collins-and-king-by-releasing-home-heating-oil-from-northeast-reserve"],
    doe: ["US Energy Department", "https://www.energy.gov/node/4860871"],
    bdn: ["Bangor Daily News fact check", "https://www.bangordailynews.com/2026/10/08/news/maine-election-senate-2026-troy-jackson-susan-collins-debate-fact-check/"],
    jk: ["Maya’s plan (Jackson campaign)", "https://www.jacksonformaine.com/news/jackson-hits-the-airwaves-directing-mainers-to-heating-assistance-as-energy-costs-skyrocket"],
    bdnOil: ["Bangor Daily News / Maine Public, Sept 28, 2026", "https://www.bangordailynews.com/2026/09/28/business/business-energy/maine-heating-oil-prices-record-high-iran-war/"],
    dafs: ["Maine DAFS, 2023 checks", "https://maine.gov/dafs/news/mills-administration-announces-all-450-winter-energy-relief-checks-have-been-mailed"]
  };
  var ME_MOVES = [["The problem", "Half of Maine heats with oil, and it’s about $6 a gallon"], ["Maya’s plan", "End the war driving prices; more heating aid"], ["Her opponent’s plan", "Early aid and a small release from the oil reserve"]];
  var ME_STORY = [
    cover("Heating oil", [["What this winter will cost"], ["Maya’s plan: fix the cause, fund the help"], ["How her opponent’s plan differs"]], "Learn about heating oil"),
    { bg: "#FCEBDD", next: "What a tank costs now", src: [SM.eia], html: function () {
      return '<h2 class="st-h lg">Half of Maine heats with oil.' + sup(1) + '</h2>' +
        '<div class="sk-duo"><div class="c"><b class="o">49%</b><div class="bar" style="--h:120px"></div><span>Maine homes</span></div><div class="c"><b>3%</b><div class="bar us" style="--h:8px"></div><span>US homes</span></div></div>' +
        '<p class="st-p">An oil tank in the basement, filled by truck, burned all winter. No state depends on heating oil more.</p>'; } },
    { bg: DARK_BG, dark: true, next: "The help that exists", src: [SM.doer, SM.mills, SM.bdnOil], html: function () {
      return news("Bangor Daily News", "Sept 28, 2026", "Maine posts record-breaking heating oil prices amid Iran War", SM.bdnOil[1], "by Maine Public") + '<h2 class="st-h sm">Oil is about $6 a gallon, up about 80% in a year.' + sup(1) + '</h2>' +
        '<div class="tanks"><div><div class="tk sm"><i></i></div><b>~$920</b><span>One fill, last fall</span></div><div><div class="tk"><i></i></div><b class="glow">~$1,660</b><span>One 275-gallon fill, now</span></div></div>' +
        ''; } },
    { bg: "#E8F1FB", next: "Her opponent’s record", src: [SM.heap, SM.mills], html: function () {
      return '<h2 class="st-h">Heating aid (HEAP) covers less than a third of one tank.' + sup(1) + '</h2>' +
        hrows([["One tank now", "$1,660", 1660, "#e07a1e"], ["Average HEAP benefit", "~$510", 510, "#3b80b6"]], 1660) +
        '<div class="fl"><div><small>Who</small><span>Homeowners and renters earning up to $73,213 for a family of four. Apply through May 29.' + sup(1) + '</span></div><div><small>Why DC</small><span>Congress votes on its money every year. The President’s 2027 budget proposed eliminating it.' + sup(2) + '</span></div></div>'; } },
    { bg: "#F4EEE6", next: "Where Maya stands", src: [SM.col1, SM.col2, SM.doe, SM.bdn], html: function () {
      return '<h2 class="st-h">Her opponent’s record: a longtime heating aid champion</h2>' +
        '<div class="fl"><div><small>Aid</small><span>Pushed for $36.7 million to reach Maine early this fall, “one of the earliest releases in the program’s history.”' + sup(1) + '</span></div><div><small>Reserve</small><span>Urged a release of up to 315,000 barrels.' + sup(2) + ' Experts: “two or three days’ worth of supply for the Northeast.”' + sup(3) + '</span></div><div><small>War</small><span>Voted five times against ending it, then to end it from April 30 on.' + sup(4) + '</span></div></div>'; } },
    stance("Fix the cause. Help families now.", [["end", "End the war in Iran", "Reporting ties the price spike to it. In her words: “I don’t want to spend it in Iran. I want to spend it here.”"], ["", "More money for heating aid", "Bigger federal heating aid budgets, so help covers more than a fraction of a tank."]],
      "She’s done it before: in 2023, as Maine Senate President, she helped pass $450 checks to about 876,000 Mainers and $40 million more for heating aid.", [SM.jk, SM.dafs]),
    plans("How should Maine get through this winter?", "Heating aid averages about $510, under a third of one $1,660 tank." + sup(1),
      ["Fix the cause, fund the help", "End the war driving prices.", "Put more federal money into heating aid."],
      ["Ease supply, speed up aid", "Pushed for the reserve release and early aid." + sup(2), "Voted 5 times against ending the war, then to end it since April 30." + sup(3)], "", [SM.heap, SM.col2, SM.bdn]),
    fork("Which senator Maine sends to Washington", "Pushes to end the war and fund more heating aid.", "Keeps pressing for supply and earlier aid.", "A senator can’t set oil prices, but votes on the war and on heating aid every year.", []),
    keep("Half of Maine heats with oil, and it’s about $6 a gallon, up 80% in a year.", "End the war driving prices. Put more money into heating aid.", "Pushed for early aid and a small release from the oil reserve.")
  ];

  /* ===================== 5. Michigan: tariffs ===================== */
  var SI = {
    nyfed: ["New York Fed, who pays tariffs", "https://libertystreeteconomics.newyorkfed.org/2026/02/who-is-paying-for-the-2025-u-s-tariffs/"],
    wh: ["White House fact sheet, Canada tariffs", "https://www.whitehouse.gov/fact-sheets/2026/07/fact-sheet-president-donald-j-trump-imposes-additional-tariffs-on-canada/"],
    ustr: ["USTR, Michigan trade", "https://ustr.gov/countries-regions/united-states-trade-data/michigan"],
    medc: ["Michigan auto jobs dashboard", "https://www.michiganbusiness.org/globalassets/documents/car-medc-michigan-dashboard-q2-2026.pdf"],
    uaw: ["UAW statement, Aug 2026", "https://uaw.org/uaw-president-shawn-fain-on-u-s-trade-escalation-with-canada/"],
    nw: ["Newsweek, his September statement", "https://www.newsweek.com/mike-rogers-turns-on-trumps-tariffs-what-michigan-republican-said-before-12538135"],
    gv: ["Reuters via GV Wire, his Oct 7 ad", "https://gvwire.com/2026/10/07/michigan-republican-rogers-calls-for-end-to-canada-tariff-fight-breaking-with-trump-again/"],
    cod: ["ClickOnDetroit, both on tariffs", "https://www.clickondetroit.com/news/local/2026/10/21/heres-where-michigan-us-senate-candidates-el-sayed-rogers-stand-on-tariffs/"],
    ad: ["Maya’s ad (El-Sayed campaign)", "https://abdulforsenate.com/2026/09/new-ad-nafta/"]
  };
  var MI_MOVES = [["The problem", "Tariffs on Canada are costing Michigan auto jobs"], ["Maya’s plan", "Smart, targeted tariffs, with unions at the table"], ["Her opponent’s plan", "Backed the tariffs; now wants the Canada fight ended but keeps others"]];
  var MI_STORY = [
    cover("Tariffs and auto jobs", [["What the Canada tariffs are doing"], ["Maya’s plan: smart tariffs, not dumb ones"], ["How her opponent’s plan differs"]], "Learn about tariffs"),
    { bg: "#E3F3F0", next: "What changed this year", src: [SI.nyfed], html: function () {
      return '<h2 class="st-h lg">What’s a tariff?</h2>' +
        '<svg class="sk-crate" viewBox="0 0 300 140" aria-hidden="true"><path d="M150 6 V134" stroke="#9cc7bf" stroke-width="3" stroke-dasharray="6 7"/><g class="mv"><rect x="40" y="52" width="70" height="62" rx="6" fill="#c58a4a"/><path d="M40 72 H110 M40 94 H110 M62 52 V114 M88 52 V114" stroke="#a46f35" stroke-width="3"/><g transform="translate(96 30) rotate(12)"><rect width="56" height="28" rx="6" fill="#d9483b"/><text x="28" y="19" text-anchor="middle" class="tag">+ tax</text></g></g><text x="70" y="134" text-anchor="middle" class="sv-l">Canada</text><text x="232" y="134" text-anchor="middle" class="sv-l">US</text></svg>' +
        '<p class="st-p">A tax on goods brought in from another country. The US company importing them pays it, and about 90% of the cost landed on US businesses and shoppers last year.' + sup(1) + '</p>'; } },
    { bg: "#E9EEF6", next: "What it did to jobs", src: [SI.wh, SI.ustr], html: function () {
      return '<h2 class="st-h">Canadian goods went from tariff-free to taxed.' + sup(1) + '</h2>' +
        hrows([["Before 2025 (USMCA goods)", "0%", 0.5, "#9cc7bf"], ["Canadian cars (non-US parts)", "25%", 25, "#e08a1a"], ["Steel and aluminum", "50%", 50, "#c8402f"], ["About $20B of other goods", "50%", 50, "#c8402f"]], 50) +
        '<p class="st-p small">Canada hit back. Michigan trades about $60 billion a year in goods with Canada, and some car parts cross the border four times before a vehicle is done.' + sup(2) + '</p>'; } },
    promise({ h: "Tariffs were sold as bringing the auto industry back.", quote: "the auto industry is back... pulling Detroit and Michigan along with it", who: "The President, at GM, July 2026", pv: "113,600", ph: 140, pl: "Michigan auto parts jobs, June 2025", rv: "109,600", rh: 135, rl: "June 2026", punch: "<b>4,000 fewer</b> parts jobs since the tariffs began." + sup(1), next: "What autoworkers say", src: [SI.medc] }),
    { bg: "#F4EEE6", next: "Her opponent’s record", src: [SI.uaw], html: function () {
      return '<h2 class="st-h">The autoworkers’ union backs some tariffs, not these.</h2>' +
        '<div class="sk-q"><p>“Tariffs work, but only if they are deployed intentionally to protect workers.”</p><p>“The UAW rejects any escalation on Canada.”' + sup(1) + '</p><small>United Auto Workers, Aug 2026</small></div>' +
        '<p class="st-p">The UAW endorsed Maya. The fight isn’t tariffs or no tariffs; it’s which tariffs, and for whom.</p>'; } },
    { bg: "#EEF3FB", next: "Where Maya stands", src: [SI.nw, SI.gv, SI.cod], html: function () {
      return '<h2 class="st-h">Her opponent backed the tariffs, then broke with the Canada fight</h2>' +
        '<div class="sk-tl"><div class="sk-t"><b>September</b><span>“Tariffs are necessary, but are not a one-size-fits-all solution.”' + sup(1) + '</span></div><div class="sk-t"><b>Oct 7</b><span>“Canada is not our enemy.” “We need to end this tariff war now.”' + sup(2) + '</span></div><div class="sk-t on"><b>Oct 20</b><span>“But there are tariffs that have helped.”' + sup(3) + '</span></div></div>'; } },
    stance("Smart tariffs, not dumb ones.", [["end", "End the tariff fight with Canada", "She says her opponent “cheerled this tariff war from the beginning.”"], ["", "Targeted tariffs tied to a plan for Michigan jobs", "Protect the auto and manufacturing industries she wants to grow, with clear goals for when each tariff lifts."], ["", "Workers at the table", "Unions help write trade rules. “No more bad trade deals. No dumb tariffs.”"]],
      "In her words: “I’m not against tariffs per se. I’m just against dumb tariffs.”", [SI.cod, SI.ad]),
    plans("What should tariffs do for Michigan?", "50% tariffs on about $20 billion of Canadian goods, and Canada hit back." + sup(1),
      ["Build Michigan industry", "Tariffs tied to a plan for jobs here, with goals for when they end.", "Unions at the table."],
      ["Keep the ones he says help", "End the Canada fight; keep other tariffs he credits with bringing jobs back." + sup(2), "Work with the President to make deals." + sup(2)], "", [SI.wh, SI.cod]),
    fork("Which senator Michigan sends to Washington", "Pushes tariffs tied to a plan for Michigan jobs, with unions at the table.", "Works with the President on the tariffs he says help.", "Congress holds the tariff power but has handed much of it to the President. A senator votes on taking it back.", []),
    keep("Michigan has 4,000 fewer auto parts jobs since the Canada tariffs began.", "Smart, targeted tariffs tied to a plan for Michigan jobs, with unions at the table.", "Backed the tariffs; now wants the Canada fight ended but keeps others.")
  ];

  /* ===================== the lessons ===================== */
  var MONICA = { name: "Monica", meta: "Canvasser", skin: "#c99a74", hair: "#2a1b14", style: "long", shirt: "#35B57C" };
  var L = [
    { id: "ga", title: "Medicaid and Georgia Pathways", issue: "Health coverage", from: "Keisha Lance Bottoms", race: "Georgia governor", opp: "Rick Jackson", story: GA_STORY, moves: GA_MOVES,
      voter: { key: "tasha", name: "Tasha", meta: "Home health aide, Albany", kv: "af_sarah",
        open: "Hi. Is Maya going to do anything about health insurance? I don’t get any through work.", follow: "I heard the other guy wants to expand it too.", bye: "Okay. That helps. Thanks for coming by." },
      hear: [["v", 0], ["m", "She is. Right now about 200,000 working Georgians earn too much for Medicaid and too little to buy insurance.", 0], ["m", "Maya wants full Medicaid expansion, so any adult earning up to about $22,000 can get covered. The federal government pays 90%.", 1], ["v", 1], ["m", "He wants a Pathways-style plan with work rules. Pathways only signed up about 20,000 people.", 2], ["v", 2]],
      miss: { lines: [["v", 0], ["m", "She is. About 200,000 working Georgians can’t get coverage right now."], ["m", "Maya wants full Medicaid expansion, so adults earning up to about $22,000 are covered."], ["v", 1], ["m", "He’s against Medicaid."]],
        tiles: ["200,000 working Georgians can’t get coverage", "Maya wants full Medicaid expansion", "Her opponent is against Medicaid"], wrong: 2,
        fix: "He isn’t against Medicaid. He’s against full Medicaid expansion, and wants a Pathways-style plan with work rules instead." },
      grade: [/(gap|uninsured|no (health )?(insurance|coverage)|without (health )?(insurance|coverage)|can'?t (afford|get)|200,?000|two hundred thousand|left out|too much for medicaid|fall through|falls? (in|through))/, /expan/, /(pathways[- ]style|like pathways|keep(ing)? pathways|work (requirement|rule|hour)s?|intelligent|partial|smaller (plan|version))/],
      wrong: /((opponent|republican|other guy|\bhe\b)('s| is)? (against|opposed to|anti)[^.]{0,12}medicaid\b(?! expan)|no work requirement|free (health|insurance))/,
      key: "Maya wants full Medicaid expansion (adults up to about $22,000, federal government pays 90%) and to end Georgia Pathways, which reached about 20,000 people. About 200,000 working Georgians are in the coverage gap. Her opponent wants 'intelligent Medicaid expansion': a Pathways-style plan with work rules; how many it covers isn't set." },
    { id: "tx", title: "Vouchers and public schools", issue: "School vouchers", from: "James Talarico", race: "Texas US Senate", opp: "Ken Paxton", story: TX_STORY, moves: TX_MOVES,
      voter: { key: "hector", name: "Héctor", meta: "Rancher and school board member, west Texas", kv: "am_fenrir",
        open: "Afternoon. I’m on the school board out here. What does Maya think about these vouchers?", follow: "And the other fella? Where’s he on it?", bye: "Fair enough. I’ll be voting, I always do." },
      hear: [["v", 0], ["m", "Texas now spends a billion dollars a year of tax money on private school vouchers, and 7 in 10 went to kids who weren’t in public school.", 0], ["m", "Maya fought them as a teacher and a lawmaker. In the Senate she’d fight vouchers going nationwide. Public money for public schools.", 1], ["v", 1], ["m", "He backs vouchers, and he wants to get rid of the US Department of Education.", 2], ["v", 2]],
      miss: { lines: [["v", 0], ["m", "Texas spends a billion dollars a year on private school vouchers, mostly for kids already there."], ["m", "If Maya wins, she’ll cancel the Texas voucher program."], ["v", 1], ["m", "He backs vouchers and wants the Department of Education gone."]],
        tiles: ["$1 billion goes to vouchers, mostly for kids already in private school", "Maya will cancel the Texas voucher program", "Her opponent backs vouchers"], wrong: 1,
        fix: "A senator can’t cancel a Texas law. Maya would fight vouchers going nationwide and protect public school money." },
      grade: [/(tax (money|dollar)s?|public money|taxpayer|billion|already (in|at|out of)|7 (in|out of) 10|70 ?%|seventy percent|private school)/, /((against|oppos|fought|fight|stop|vote[sd]? (no|against)|block)[^.]{0,40}voucher|public (money|dollars?)[^.]{0,20}public school|nation ?wide)/, /((\bhe\b|opponent|republican|other)[^.]{0,40}(back|support|for|like|defend|want)[^.]{0,20}voucher|department of education|eliminat)/],
      wrong: /((cancel|end|take away|get rid of|repeal|kill) (the |your |texas('s)? )?(voucher|program)|(paxton|opponent|republican)('s| is)? (a )?(crook|liar|lying))/,
      key: "Maya, a former public school teacher, fought vouchers in the Texas House and in the Senate would fight vouchers going nationwide and protect public school funding. Texas spends $1 billion a year on vouchers; 7 in 10 went to kids already out of public school. A senator can't cancel the Texas program. Her opponent backs vouchers and wants to eliminate the US Department of Education." },
    { id: "oh", title: "Data centers and your electric bill", issue: "Your electric bill", from: "Sherrod Brown", race: "Ohio US Senate", opp: "Sen. Jon Husted", story: OH_STORY, moves: OH_MOVES,
      voter: { key: "barb", name: "Barb", meta: "Retired bus driver, Lima", kv: "af_aoede",
        open: "Oh, hi. These electric bills are killing me. Is Maya going to do anything about them?", follow: "I heard the senator already has a bill on this.", bye: "Alright. Thank you, hon." },
      hear: [["v", 0], ["m", "Ohio bills are up more than half since 2019, and the grid’s own watchdog says data centers are the main reason.", 0], ["m", "Maya would require data centers to pay the full cost of their own power, not you.", 1], ["v", 1], ["m", "His bill only asks each state to consider it. No state has to do it.", 2], ["v", 2]],
      miss: { lines: [["v", 0], ["m", "Your bill went up because of the HB6 bribery scandal."], ["m", "Maya would require data centers to pay the full cost of their power."], ["v", 1], ["m", "His bill leaves it up to each state."]],
        tiles: ["Bills went up because of HB6", "Maya: data centers pay their full power costs", "His bill leaves it to each state"], wrong: 0,
        fix: "HB6’s charges were repealed or ended, so it isn’t why bills are up now. Data center demand is the main reason." },
      grade: [/((bill|rate|price|cost)s?[^.]{0,50}(up|rise|rising|rose|risen|higher|increase|doubl|half)|(up|rose|risen|higher|increase)[^.]{0,30}(bill|rate)|main reason)/, /((make|require|have|force|should|want)[^.]{0,30}data cent[^.]{0,40}pay|data cent[^.]{0,30}(pay|cover)[^.]{0,40}(full|own|their|cost))/, /(each state|states? (decide|choose|consider)|up to (the|each) state|optional|voluntar|doesn'?t (require|make)|no state has to|leaves? it)/],
      wrong: /((husted|opponent|republican|\bhe\b) (was )?(charged|indicted|arrested)|hb ?6 is why|because of (the )?hb ?6|(ban|shut down) (the )?data cent)/,
      key: "Maya wants to require data centers to pay the full cost of their power, fight to cap rate hikes, end their tax breaks and let towns decide where they go (no ban). Ohio home bills rose more than half since 2019; the grid watchdog says data centers are the main reason. HB6 isn't why bills rose. Her opponent's Ratepayer Protection Act asks each state to consider making data centers pay; none has to; it stalled in the Senate." },
    { id: "me", title: "Heating oil this winter", issue: "Heating oil", from: "Troy Jackson", race: "Maine US Senate", opp: "Sen. Susan Collins", story: ME_STORY, moves: ME_MOVES,
      voter: { key: "dale", name: "Dale", meta: "Sawmill worker, Millinocket", kv: "am_michael",
        open: "I heat with oil, and honestly I’m scared about this winter. What’s Maya going to do?", follow: "The senator got that oil reserve released, didn’t she?", bye: "Alright. I’ll think on it before Tuesday." },
      hear: [["v", 0], ["m", "Half of Maine heats with oil, and it’s about six dollars a gallon, up about 80% in a year.", 0], ["m", "Maya would end the war that’s driving prices and put more money into heating aid.", 1], ["v", 1], ["m", "She pushed for that, and for early heating aid. But the reserve release is two or three days of supply for the Northeast.", 2], ["v", 2]],
      miss: { lines: [["v", 0], ["m", "Half of Maine heats with oil, and it’s about six dollars a gallon."], ["m", "Maya would end the war driving prices and fund more heating aid."], ["v", 1], ["m", "Sure, but the senator never voted to end the war."]],
        tiles: ["Oil is about $6 a gallon", "Maya: end the war, more heating aid", "The senator never voted to end the war"], wrong: 2,
        fix: "She has voted to end the war since April 30. Before that, she voted against ending it five times." },
      grade: [/((oil|heat|fuel)[^.]{0,60}(\$ ?6|six dollars|price|cost|expensive|record|80)|half (of )?(maine|homes|the state)|50 ?%|fifty percent)/, /((end|stop)[^.]{0,20}(the )?war|(heating|fuel) (aid|assistance|help)|liheap|heap)/, /(reserve|release|barrel|supply|early (aid|help|money)|two or three days)/],
      wrong: /(never voted to end|price cap|cap (heating )?oil|reserve will (lower|fix)|(collins|opponent|republican)('s| is)? (lying|a liar))/,
      key: "Maya would end the war in Iran driving oil prices and put more federal money into heating aid; in 2023 she helped pass $450 checks and $40 million for heating aid. Half of Maine heats with oil, about $6 a gallon, up about 80%. Her opponent pushed for early heating aid and a release of up to 315,000 barrels from the reserve (two or three days of Northeast supply). She voted five times against ending the war, then to end it since April 30." },
    { id: "mi", title: "Tariffs, Canada and auto jobs", issue: "Tariffs and auto jobs", from: "Abdul El-Sayed", race: "Michigan US Senate", opp: "Mike Rogers", story: MI_STORY, moves: MI_MOVES,
      voter: { key: "samira", name: "Samira", meta: "UAW member, stamping plant in Warren", kv: "af_bella",
        open: "These tariffs on Canada are hitting our plant. What’s Maya going to do?", follow: "Is the Republican any different? He says Canada’s not our enemy now.", bye: "Okay. I’ll vote before my shift." },
      hear: [["v", 0], ["m", "Michigan has 4,000 fewer auto parts jobs since the tariffs began, and parts cross that border back and forth.", 0], ["m", "Maya isn’t against all tariffs, just dumb ones. She wants targeted tariffs that build Michigan jobs, with unions at the table.", 1], ["v", 1], ["m", "He backed the tariffs for months. Now he wants the Canada fight ended, but he keeps the others he says helped.", 2], ["v", 2]],
      miss: { lines: [["v", 0], ["m", "Michigan has 4,000 fewer auto parts jobs since the tariffs began."], ["m", "Maya’s against all tariffs."], ["v", 1], ["m", "He backed them, and now he wants the Canada fight ended."]],
        tiles: ["4,000 fewer auto parts jobs", "Maya is against all tariffs", "He backed them; now wants the Canada fight ended"], wrong: 1,
        fix: "She’s against dumb tariffs, not all tariffs. She backs targeted tariffs that protect Michigan jobs." },
      grade: [/((job|plant|layoff|parts|orders|shift|price|cost)s?[^.]{0,60}(tariff|canada)|(tariff|canada)[^.]{0,60}(job|plant|layoff|parts|orders|price|cost|hurt|hit))/, /(dumb|smart|target|not against|union)/, /((\bhe\b|opponent|republican|other)[^.]{0,60}(backed|supported|support|cheer|flip|changed|until|enemy|end|keep|now))/],
      wrong: { test: function (t) { return /(hates tariffs|no tariffs at all|(rogers|opponent|republican) wants to keep the canada)/.test(t) || (/against all tariffs/.test(t) && !/(not|n't) against all tariffs/.test(t)); } },
      key: "Maya: 'I'm not against tariffs per se. I'm just against dumb tariffs.' She backs targeted tariffs tied to a plan for Michigan jobs, with unions at the table, and opposes the Canada fight. Michigan auto parts jobs fell about 4,000 since the tariffs began. Her opponent called tariffs necessary until October, now says Canada is not our enemy and wants the tariff war ended, but says some tariffs have helped." }
  ];
  L.forEach(function (x) {
    x.voter.voice = x.voter.kv;
    var seen = {}; x.sources = [];
    x.story.forEach(function (c) { (c.src || []).forEach(function (s) { if (!seen[s[1]]) { seen[s[1]] = 1; x.sources.push(s); } }); });
    /* lines spoken in Hear it done and Catch the mistake: voter lines by index into open/follow/bye */
    var vl = [x.voter.open, x.voter.follow, x.voter.bye];
    x.hearLines = x.hear.map(function (h) { return h[0] === "v" ? { who: "v", text: vl[h[1]] } : { who: "m", text: h[1], tick: h[2] }; });
    x.missLines = x.miss.lines.map(function (h) { return h[0] === "v" ? { who: "v", text: vl[h[1]] } : { who: "m", text: h[1] }; });
    x.model = x.hearLines.filter(function (h) { return h.who === "m"; }).map(function (h) { return h.text; }).join(" ");
  });
  var ICONS = [
    ['<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.3 5.3 3.3 1.7-2 3.1-3.3 5.3-3.3 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" fill="#fff"/><path d="M12 9.3v6M9 12.3h6" stroke="var(--c)" stroke-width="2.2" stroke-linecap="round"/></svg>', "#e2557a"],
    ['<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M2.5 9.5 12 4.5l9.5 5-9.5 5z" fill="#fff"/><path d="M6.5 11.8v4.4c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.4" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><path d="M20.5 10v5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>', "#3b80b6"],
    ['<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M13.5 2 5 13.5h6L9.5 22 19 9.8h-6.2z" fill="#fff" stroke="#fff" stroke-width="1" stroke-linejoin="round"/></svg>', "#e8a21a"],
    ['<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M12 22c4.4 0 7-2.9 7-6.8 0-3.6-2.4-5.6-3.6-8.6-.4 1.9-1.4 3-2.6 3.6.3-3.3-1.2-6.4-4-8.2.2 3.3-1.6 5.3-3.3 7.4C4.2 11.1 5 12.6 5 15.2 5 19.1 7.6 22 12 22z" fill="#fff"/><path d="M12 22c-1.9 0-3.1-1.3-3.1-3 0-2 1.6-3 2.4-4.6.9 1.2 3.8 2.2 3.8 4.6 0 1.7-1.2 3-3.1 3z" fill="var(--c)"/></svg>', "#f07c3c"],
    ['<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M3 15.5v-3l2-4.5c.3-.7 1-1 1.7-1h10.6c.7 0 1.4.3 1.7 1l2 4.5v3c0 .8-.6 1.5-1.4 1.5H4.4c-.8 0-1.4-.7-1.4-1.5z" fill="#fff"/><path d="M6.2 11.5 7.4 8.6h9.2l1.2 2.9z" fill="var(--c)"/><circle cx="7" cy="17.5" r="2.2" fill="#fff" stroke="var(--c)" stroke-width="1.4"/><circle cx="17" cy="17.5" r="2.2" fill="#fff" stroke="var(--c)" stroke-width="1.4"/></svg>', "#2a9d8f"]
  ];
  window.__warmupLines = function () { var out = [], add = function (t, v) { out.push({ t: cleanSay(t), v: v }); }; L.forEach(function (x) { [x.voter.open, x.voter.follow, x.voter.bye].forEach(function (t) { add(t, x.voter.kv); }); x.hearLines.concat(x.missLines).forEach(function (h) { if (h.who === "m") add(h.text, "af_heart"); }); }); return out; };
