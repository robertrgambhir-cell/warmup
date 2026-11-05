# Original vs new: screen-by-screen

What each v2 screen replaces, what it keeps, what changed and why. The originals are untouched (live version 155); every original screen is in `img/old-health-insurance.jpg` and `img/old-tariffs.jpg`, every new one in `img/new-health-insurance.jpg`, `img/new-tariffs.jpg` and `screens/`.

**Support column:** **R** = supported by research named in the design system; **H** = a design hypothesis to test with people; **F** = a factual or fairness fix.

**Rollback.** Nothing in the live app changed. The prototype lives only in `lab/issues-v2/` of the warmup repo (and the branch `issues-v2`) and in a private claude.ai page. Deleting that folder removes it.

---

## Health insurance (Georgia)

| Original (GA) | New (GA2) | Kept | Changed | Why | Objective | Support |
|---|---|---|---|---|---|---|
| Cover: "Three foundational things we want you to know about health insurance" with three facts | Cover: "Three things you'll be able to explain about health insurance in Georgia" with three abilities; race and date; not-affiliated line | The cover layout, three items with small pictures, the Learn and At the door line | Goals are things to do, not facts to repeat; the race is named; screen counts replace the unmeasured "3 min" | Objectives you can check at the end; the race was hidden; no time claim without timing | All | H (objectives), F (race, time) |
| — | GA2 1, Ask: Bri at her door, "Can't I just get Medicaid?", a guess | Bri | New screen: a guess before teaching | The guess is answered and named on the next screen | Who's left out | R (pretesting) |
| GA 1: income bar with a mom under an umbrella below $8,000 | GA2 2, the income line: drag Bri, Ana and Dee across three zones (Medicaid, the gap, help buying a plan) | The bar, the umbrellas, the sisters, the $7,900 limit | Learner moves the line and must find all three zones; the gap now has its far edge ($27,320) and names Pathways as the only way in | The original showed one edge; the gap only makes sense with both | Place any family | H (interactive model), F (Pathways) |
| GA 2: three sisters, Bri in the rain | Folded into GA2 2 | The three sisters, their pay and their status under each one | They're now points on the line | One picture carries the whole rule | Who's left out | H |
| GA 3: about 200,000, more than Savannah | Folded into GA2 2's answer to the guess | The 200,000 and who they are | The Savannah picture is cut (time) | It cost about 17 seconds for a fact the reveal can state | Who's left out | H (trade-off) |
| GA 4: 40 states and DC, the grid | GA2 3, flip "Georgia today" to "With full expansion" and watch the zones move; 40 states and DC in the success line | 40 states and DC, the 90% | The grid is replaced by the change itself: the green zone grows to $37,700 and Bri moves | "Change one condition" is the core of a Rule lesson | Place any family | H |
| — | GA2 4, Use it: Tasha at $20,000, today and with expansion | — | New: apply the rule to a new person, with the mini line after each answer | Application, not recall | Place any family | R (retrieval), H (format) |
| GA 5: opponent's plan like Pathways | Moved into GA2 6, the choice | "Intelligent Medicaid expansion" in his words; Pathways | No longer its own screen | Both plans on the same rows | Both candidates | R (contrasting cases) |
| GA 6: Pathways, fewer than 1 in 5, KFF Health News clipping | GA2 5, same evidence and clipping | The clipping (Robert's favorite element), 100,000 vs 18,527 | Shorter body | Kept because it's an outside source carrying the claim | Both candidates | — |
| GA 7: "Maya will push the legislature…" | GA2 6, the choice: Bottoms and Jackson on the same three rows; the office note | Her plan, his plan, the work-rules point | Real names; an explicit line that Georgia law requires the legislature's approval | The original gave a governor's power to a Senate stand-in | Both candidates | F |
| P1: door with the three things | GA2 D1: door with a one-line brief | The door on top, Bri | The three things are no longer read out before speaking | The learner should retrieve, not reread | All | R |
| P2: answer Bri out loud | GA2 D1: speak or type | The mic look and live words | Typing fallback; an example answer, labeled | Works on a laptop and where the mic is blocked | All | — |
| P3: "You got 0 of 3" | GA2 D2: each point with the learner's own words, a mode badge, flags for misstatements, one next step | Point-by-point result | Evidence quotes; "AI feedback" vs "Quick check" labeled; listening and fairness are graded | Don't credit what wasn't said; be clear what's AI | All | R (specific feedback), F |
| P4: hear it done | GA2 D3: a strong answer with points marked | The model answer | Shorter; includes the check-in with Bri and the work-rules caveat | Model listening and accuracy, not only content | Both candidates | R (worked example) |
| P5: catch the mistake ("He's against Medicaid") | GA2 D4: same planted mistake | The easy, flat mistake | — | Robert's rule: easy to catch | Both candidates | — |
| P6: answer Bri again | GA2 D5: Rosa, a different family at $30,000 ("tomorrow's warmup") | A second spoken try | New voter and situation; moved to the next day in the app | Tests transfer; spacing | Place any family | R (spacing), H (transfer) |
| P7, P8: briefed, 0 to 3 | GA2 D6, D7: result, then what you showed at each door, tomorrow's question, where the lesson came from | Growth, the reveal, source links | Objectives marked shown or not yet; nothing is shown that the learner didn't say | Honest accomplishment | All | — |

## Tariffs and auto jobs (Michigan)

| Original (MI) | New (MI2) | Kept | Changed | Why | Objective | Support |
|---|---|---|---|---|---|---|
| Cover: three facts, one causal ("lost about 4,000… as tariffs climbed") | Cover: three abilities; race and date | Layout | No causal claim on the cover | F: timing isn't cause | All | F |
| — | MI2 1, Ask: Samira, "Who pays the US tariff?" guess | Samira | New guess screen | The most common misconception is "the other country pays" | Who pays | R |
| MI 1: tariff is a tax, about 90% on US businesses and shoppers | MI2 2, the border: send the steel across; the tariff tag appears; the Michigan company pays US Customs; three choices; the 90% bar | The 90% finding | The learner makes it happen; the three things a company can do are drawn | Seeing who pays beats being told | Who pays | H |
| MI 2: Canada from 0% to 50%, Canada hit back | Folded into MI2 2 and MI2 3 | The 50% and Canada's counter-tariffs | Stated where they apply | — | Who pays | — |
| MI 3: Samira, a part crosses the border four times | MI2 3, the route: follow one part across four crossings; each crossing colored by whether a tariff applies; a cost bar grows | The four crossings (the most promising picture in the original) | Now the central interaction; crossings say which tariffs apply and which may not (USMCA) | Why autos get hit hard is the mechanism | Why parts cost more | H, F (USMCA nuance) |
| MI 4: about 4,000 jobs lost "as tariffs climbed" | MI2 4: the same numbers drawn honestly to scale (113,600 to 109,600), vehicle jobs up about 500, and "Does this show the tariffs caused the drop?" | The jobs numbers | The causal framing is gone; the learner has to say what the chart can't show; the University of Michigan forecast is shown with its "very uncertain" caveat | Correlation is not causation | Job numbers | F, R |
| — | MI2 5, evidence check: four claims sorted, two each way | — | New | Calibration, and fairness to both directions | Job numbers | H |
| MI 5, MI 6, MI 7: opponent; UAW; Maya | MI2 6, the choice: El-Sayed and Rogers on the same rows; the office note; UAW as context | Their own words; UAW's position and endorsement | Real names; what a senator can and can't do about tariffs | The original never said who sets tariffs | Both candidates | F, R |
| P1 to P8 | MI2 D1 to D7, as in Georgia; tomorrow's door is Ray's hardware store in Lansing | The structure | Transfer to a new business; the planted mistake is now "Canada pays these tariffs" (the original planted "Maya is against all tariffs") | The new mistake is the misconception the lesson exists to fix | All | R, H |

## The cut that didn't make it

A furniture-maker check (who pays a lumber tariff; what a later layoff can show) was built and removed to save about 45 seconds; Ray's door tests the same transfer. Its data is saved in `cut/tariffs-apply-cut.js`, ready to paste back.
