# New issue lesson design system

Warmup issue lessons, version 2. Prepared Nov 5, 2026 by Claude for Robert. A proposal with two working lessons behind it (health insurance and tariffs); nothing here is live, and the lesson machine and the live app are unchanged.

**How to read the labels.** **[Fact]** is something I checked in the code, the lesson data or a source. **[Decision]** is a rule Robert approved earlier (mostly in `lesson-playbook.md`). **[Evidence]** is published research. **[Judgment]** is my own call. **[Estimate]** is a number from a model, not a measurement.

**What I reviewed.** The 20-file review package wasn't attached to this session and isn't in the project, so I reviewed what it was built from: the deployed issue lessons (`m-r4x8t2/wdpfxqlsvp/issues/index.html`, version 155), the five approved lesson files and words lists (`warmup-engine/brain/examples/maya-2026`), the lesson source (`warmup/src/maya-lessons`), the playbook, the lesson machine's prompts, the Nov 4 handoff files, the v156 AI staging work and screenshots I captured of all 86 live screens with the real fonts. Where a package file would have added something I couldn't see (for example any notes in `06-KNOWN-ISSUES-AND-UNKNOWNS.md`), I may have missed it.

---

## 1. Independent review of the current lessons

### What's genuinely good and stays

1. **A real person carries the issue.** Bri and her two sisters turn an income threshold into something a canvasser can picture and retell. [Judgment, backed by Robert's praise and the concreteness research in Mayer 2009]
2. **Takeaway headers.** Each screen's header states its point. It's the strongest writing rule in the playbook. [Decision]
3. **Sources done right.** Superscripts on every number, a sheet that opens beside the button and links at the end. [Decision; Robert called the sheet excellent]
4. **Newsroom clippings.** An outside headline carries the claim, so the lesson doesn't sound like the campaign. [Decision]
5. **Plain, fair steelmanning.** The opponent's position is stated in his own words, and the planted mistake teaches that misstating the other side is the error. [Decision]
6. **Spoken practice at a drawn door,** with a first try, a model answer, catch-the-mistake, a second try and growth. [Decision; retrieval practice is well supported, Roediger and Karpicke 2006]
7. **The visual identity.** Figtree and Newsreader, the Duolingo-style lesson screen, the green button, the segmented story bar, the illustrated voters. [Decision]

### What deserves a fundamental rethink

1. **Every issue is forced into the same story.** All five lessons run problem, candidate's plan, opponent's plan in seven cards. Medicaid is a rule about who qualifies; tariffs are a chain of causes; vouchers are a flow of money. One template teaches all three as a list of facts. [Fact: 5 of 5 lessons use the same 7-card order]
2. **Learn is read, not built.** Every Learn screen is look, read, tap forward. Nothing asks the learner to predict, place, sort or apply before the door. [Fact] People learn more when they generate an answer or prediction first, even a wrong one. [Evidence: Richland, Kornell and Kao 2009; Carpenter and Toftness 2017]
3. **The test rewards three memorized phrases.** Grading on the hosted app is keyword matching. Georgia's first key point credits words like "gap," "can't afford" or "like you," so it can be passed without saying anything true about eligibility. [Fact: `lessons11.js` accept patterns; the Nov 4 check found a credit for a fact the answer never stated]
4. **The second try repeats the first.** Same voter, same question, right after hearing the model answer. That measures short-term recall of the model, not understanding. Transfer to a new case is the harder and more useful skill. [Fact; Evidence: Barnett and Ceci 2002 on how rarely near repetition shows transfer]
5. **The offices are muddled.** The welcome video presents Maya Kaur as a U.S. Senate candidate, while the Georgia lesson is a governor's race and says Maya "will push the legislature," a governor's power. [Fact; flagged in handoff 08, item 12, and 02]
6. **One causal claim is overstated.** The tariffs lesson says Michigan "lost about 4,000 auto parts jobs in a year, as tariffs on Canada climbed," and the planted-mistake answer repeats it as a true line. The timing is real; the cause isn't established. [Fact; Judgment on the framing]
7. **Time claims were never measured.** Covers say Learn 3 min and At the door 3 min. With one model applied to both old and new lessons (200 words a minute, plus time to tap and speak), the live Georgia lesson comes to about 7.6 minutes and Michigan about 7.2. [Estimate; no person has been timed]
8. **Two layout rules work against teaching.** "Every screen stands alone" makes each screen re-explain instead of building a model step by step. "Use every pixel" scales type up to fill space, which is fine, but treats breathing room as a defect. [Judgment]
9. **Feedback doesn't show its evidence.** "You got 0 of 3" with missed labels, but never the learner's own words that earned or failed a point. [Fact]

---

## 2. The learning problems issue lessons have to solve

Looking across the five issues and the kinds of races Warmup will meet (city, state, federal; ballot measures), almost every issue lesson asks the learner to do some of these:

| Learning problem | What the learner must be able to do | Examples |
|---|---|---|
| A rule with a threshold | Say who qualifies, and what changes if one condition changes | Medicaid, minimum wage, heating aid, school voucher eligibility, student debt relief |
| A mechanism | Trace how A leads to B, and say how sure we are of each link | Tariffs, electric bills, heating oil prices, rent and housing supply |
| A flow of money or resources | Say where money comes from, where it goes and what it displaces | Vouchers, a budget fight, a tax change, a bond measure |
| A choice between positions | Say fairly where each candidate stands, on the same dimensions, and what the office can actually do | Every candidate lesson |
| Evidence status | Separate what's measured from what's claimed, forecast or unknown | Every lesson; most acute for mechanisms |
| Saying it at the door | Explain it aloud, to a real person, accurately and fairly | Every lesson |

The first three are different mental models. The last three show up in every lesson.

---

## 3. The system: three formats, three shared modules

**Recommendation: three formats, not four or five.** Your Format D ("How do the options differ?") is real, but it isn't a separate kind of lesson; it's the last third of every candidate lesson. Making it a format would make it the default, and we'd be back to lessons that list positions without teaching the issue underneath. So it becomes a shared module, along with evidence status and spoken practice. [Judgment]

| Format | The learner builds | Core interaction | Assessment |
|---|---|---|---|
| **RULE: Who qualifies?** | A line with zones, and what moves the zones | Drag a household along the line; flip one condition | Place new households, including one changed condition |
| **CHAIN: What causes what?** | A sequence of steps, each with how sure we are | Step through the chain; change one input; sort claims by evidence | Trace the chain in a new product or place, and say what the evidence can't show |
| **FLOW: Where does the money go?** | Sources, destinations and what's displaced | Move money from a source; see what else shrinks | Trace a new dollar; say who pays and who receives |

| Shared module | What it does | Used by |
|---|---|---|
| **The choice** | Both candidates on the same rows, sourced, plus what the office can and can't do | Every lesson with candidates |
| **Evidence check** | Sort claims into "shown by evidence" or "not shown" (a forecast, a claim, unknown) | Every Chain lesson; any lesson with a disputed number |
| **Say it** | Door 1 → feedback with quotes → a strong answer → catch the mistake → tomorrow's door with a new situation | Every lesson |

A lesson uses one format for its core. It may borrow one piece of another format's model when the issue needs it (heating oil is a Chain about prices plus a small Rule about who gets heating aid), but it never gets a custom structure.

### FORMAT A · RULE · "Who qualifies?"

- **Solves.** Eligibility is invisible: people hear a number ("138% of poverty") without a picture of who's in and who's out. The line makes the rule spatial, and moving one person makes it concrete.
- **Fits.** Benefits and eligibility (Medicaid, SNAP, heating aid, child care subsidies), thresholds (minimum wage, tax brackets, voucher income caps), anything where "would this help me?" is the voter's question.
- **Sequence.**
  1. A voter's question and a guess ("Can Bri get Medicaid?").
  2. The line: one household type, two or three zones, the people from the story placed on it. The learner must visit every zone.
  3. Change one condition (a different law, a different household size) and watch the zones move.
  4. Use it: one or two new households, one with a changed condition.
  5. What we know so far about the existing program (an evidence screen, often with a clipping).
  6. The choice.
- **Visuals.** The income line (zones in green, red and blue; edges labeled with the only numbers to remember), the story's people as figures on the line, a two-state switch, a readout that says the zone in words.
- **Assessment.** Classify new cases; the door's second voter has a different household, so the canvasser has to use the line, not the script.
- **Limits.** Real eligibility has many conditions (age, immigration status, assets, disability). The line shows one household type and one variable; the lesson must say so and point voters to the official checker. Never let a canvasser promise eligibility.
- **How the builder recognizes it.** The voter's question is "would this help me?" or "who gets it?"; the sources contain an income limit, an age limit, a percentage of poverty or a list of who qualifies; a candidate proposes to change a limit or a rule.

### FORMAT B · CHAIN · "What causes what?"

- **Solves.** Causal stories are where canvassers say things that aren't true ("the tariffs killed those jobs," "Canada pays"). The chain makes each link visible and attaches how sure we are to each one.
- **Fits.** Prices and costs (tariffs, electric bills, heating oil, rent), economic effects, anything where the voter asks "why is this happening?"
- **Sequence.**
  1. A voter's question and a guess about the first link ("Who pays the tariff?").
  2. The first link, interactive (send goods across the border; see who pays).
  3. The chain (follow one part across four crossings; watch costs build).
  4. The outcome people point to, drawn to scale, with a check: does this show the cause?
  5. Evidence check: sort claims by what's shown.
  6. The choice.
- **Visuals.** A route or flow diagram, step by step; a cost or quantity bar that grows; outcome bars drawn honestly to scale; a sorting card.
- **Assessment.** Trace the chain in a new product or business; say what can and can't be concluded from timing.
- **Limits.** Chains get long. Keep to four or five links, show the uncertain ones as uncertain, and never draw a link the sources don't support. The example route must be labeled as an example.
- **How the builder recognizes it.** The voter's question is "why?" or "who pays?"; sources describe a cause and an effect, a price or a rate change, a forecast; candidates disagree about consequences more than about rules.

### FORMAT C · FLOW · "Where does the money go?"

- **Solves.** Budget fights feel abstract and zero-sum costs are hidden. Following one dollar from source to destination makes "this money can't also go there" visible.
- **Fits.** Vouchers, budget cuts, tax changes, bond measures, who pays for a program (data center power costs are part Flow).
- **Sequence.** A question and a guess → where the money comes from → where it goes (move it) → who gets it (a person) → what else it could have paid for → evidence → the choice.
- **Visuals.** A source and destination diagram with movable amounts; shares drawn to scale; one person on the receiving end.
- **Assessment.** Trace a new dollar; say who pays and who receives.
- **Limits.** Budgets are fungible and political; a Flow lesson must avoid implying one-to-one trade-offs the budget doesn't actually make. Label displacement as "can't also go to," not "was taken from," unless a source says so.
- **How the builder recognizes it.** Sources talk about a program's cost, a budget line, who funds what; the voter's question is "where's the money going?" or "is my kid's school losing money?"
- **Status.** Not built yet; the vouchers lesson is the first candidate.

### The shared modules

- **The choice.** Same rows for both candidates (their words, their plan, what it would change), real names and party in a real race, each cell sourced. A line on what the office can and can't do: a governor can't expand Medicaid alone in Georgia; a senator can vote to limit tariff powers but can't set tariffs. If a row has nothing sourced for one candidate, drop the row rather than leave it lopsided.
- **Evidence check.** Two buttons, "Shown by evidence" and "Not shown." Include at least one tempting claim from each side's direction, so the check teaches calibration rather than partisanship.
- **Say it.** See section 5.

---

## 4. One learning experience across every format

Every lesson runs the same six beats, so the app feels like one product even when the middle changes.

| Beat | What happens | Why | Time target |
|---|---|---|---|
| 1. The question | A voter at a door asks something real; the learner guesses before learning | Guessing first makes the answer stick, even when the guess is wrong [Evidence: pretesting effect] | 20 s |
| 2. The model | The format's interactive core, one to three screens | Building a model beats reading a list [Evidence: Mayer's segmenting and generative learning; Judgment on these specific interactions] | 60 to 90 s |
| 3. Use it | One or two new cases, answered with feedback until right | Application to a new case, while the model is fresh | 30 s |
| 4. The choice | Both candidates on the same rows; what the office can do | Fair comparison on shared dimensions [Evidence: contrasting cases, Schwartz and Bransford 1998] | 30 s |
| 5. Say it | Door 1 → feedback on what you said → a strong answer → catch the mistake | Retrieval aloud, then a worked example, then error detection [Evidence: retrieval practice; worked examples; Judgment on order] | 2 to 3 min |
| 6. Tomorrow's door | Next day: a different voter whose situation needs the model, not the script | Spacing and transfer [Evidence: Cepeda et al. 2006 on spacing; transfer is the real test] | 1 to 2 min |

**What stays from Warmup's philosophy:** five-minute-ish daily sessions, plain language, spacing, retrieval, spoken practice, a chance to fix mistakes, a briefing tone and a clear sense of accomplishment. **What changes:** the learner does something on most Learn screens, the second try tests transfer and moves to the next day, and feedback quotes the learner's own words.

**The honest time picture.** With the same reading-speed model, the new lessons estimate at about 8 minutes for day 1 (Learn plus the first door) and about 2 minutes for tomorrow's door. The live lessons estimate at about 7.2 to 7.6 minutes. Five minutes isn't reachable with two spoken answers and a real explanation unless the second door moves to the next day (done) and Learn drops to four screens. That's the trade-off to test with people. [Estimate; see QUALITY-AND-TEST-REPORT.md]

---

## 5. Pedagogy rules (the ones the builder will need)

1. **Write objectives as things to do, not things to remember.** "Place any family on Georgia's income line," not "About 200,000 Georgians are in the gap." Each lesson has three to four, shown on the cover and checked at the end.
2. **Remember at most three numbers, and make them the model's edges.** Georgia: $7,900, $27,320, $37,700. Everything else is context and goes in smaller type or the sources.
3. **Nonessential but useful goes in the readout or the sources,** not the header (Pathways' age range, the exact 138%).
4. **Visual explanation is required for the model, optional for the choice.** The Mandarin test applies fully to model screens; the comparison screen is allowed to be text-led.
5. **Introduce a number only with a picture of its meaning:** a zone edge, a bar drawn to scale, a count of people.
6. **One human through-line plus new people for transfer.** Bri carries the lesson; Tasha and Rosa are new on purpose, so the learner has to use the rule.
7. **Build across screens.** A screen may refer to the model the last screen built (the same line, the same route), as long as its header still states its own takeaway.
8. **Prompt retrieval before exposure** (the guess), **during** (place a case) **and after** (the door).
9. **Correct misconceptions by name.** Each lesson lists its two or three predictable mistakes ("Canada pays," "he's against Medicaid," "the tariffs caused all of it") and confronts each one somewhere: a guess, a sort, a flag in feedback, the planted mistake.
10. **Assess application, not phrases.** The second door must require the model (a different household, a different product), and the rubric checks the application.
11. **Feedback quotes the learner.** A point is credited only with the learner's own words shown; nothing is credited that wasn't said. The mode (AI or phrase matching) is labeled every time.
12. **State uncertainty in the lesson itself.** Chain lessons must have at least one "not shown" claim and say what would show it.
13. **Real races, real offices.** Name the race and office on the cover; say what the office can do; say when positions date from; label made-up people as made up.
14. **Practice is explanation, not persuasion.** The canvasser explains accurately and fairly and checks in with the voter; the rubric rewards listening and fairness.

### Rules from the playbook, revised

| Old rule [Decision] | New rule | Trade-off |
|---|---|---|
| Every screen stands alone | Every header states its own takeaway; the model may build across screens | A screenshot sent alone loses some context, but the learner gains a model that builds |
| Use every pixel | No dead bands inside panels; content scales to fit; whitespace that creates hierarchy is fine; on very short screens scroll rather than clip | Slightly more white space on tall phones |
| Mandarin test on every screen | Required on model screens; text-led allowed on the choice and the feedback | The comparison screen is denser |
| Picture plus text on every screen | A small set of scene types (ask, model, use it, evidence, the choice, door, feedback) | More component code to maintain |
| Three key points graded at the end | Three or four objectives, each checked where it fits (a placement, a sort, the door) | Grading is less uniform across lessons |
| Second try at the same door | Second door is a new situation and moves to the next day | Day 1 ends without the "you went from 0 to 3" moment; growth shows on day 2 |
| Stand-in candidate (Maya) for every lesson | Real race and office named; stand-in mode only when every lesson comes from the same office | Investors see real candidates' names; the Maya frame needs a decision (QUALITY report) |

---

## 6. What's research and what's hypothesis

| Design choice | Status |
|---|---|
| Guess before teaching | **Supported** for retention (pretesting effect), in lab and classroom studies with short texts |
| Spoken retrieval practice | **Supported** (testing effect; self-explanation) |
| Worked example after a first attempt | **Supported** in general; the order (attempt first, then example) is supported for novices in some studies and debated in others |
| Interactive model (the line, the route) | **Plausible**, supported for simulations in science teaching (PhET-style studies), **untested** here |
| Transfer door on the next day | **Supported** for spacing; transfer gains from varied practice are **likely but small** in the literature |
| Evidence-check sort | **Hypothesis** (calibration training), no direct study for canvassers |
| Feedback that quotes the learner | **Supported** in principle (specific, task-level feedback, Hattie and Timperley 2007); our implementation **untested** |
| Five minutes a day | **Warmup's product bet**, not a finding; current lessons don't meet it by estimate |

## Sources for the research named here

- Richland, Kornell and Kao (2009), "The pretesting effect," Journal of Experimental Psychology: Applied.
- Carpenter and Toftness (2017), "The effect of prequestions on learning from video presentations," Journal of Applied Research in Memory and Cognition.
- Roediger and Karpicke (2006), "Test-enhanced learning," Psychological Science.
- Cepeda et al. (2006), "Distributed practice in verbal recall tasks," Psychological Bulletin.
- Barnett and Ceci (2002), "When and where do we apply what we learn?" Psychological Bulletin.
- Schwartz and Bransford (1998), "A time for telling," Cognition and Instruction.
- Mayer (2009), Multimedia Learning, 2nd edition.
- Hattie and Timperley (2007), "The power of feedback," Review of Educational Research.
- Chi et al. (1994), "Eliciting self-explanations improves understanding," Cognitive Science.
