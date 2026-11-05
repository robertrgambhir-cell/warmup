# Quality and test report

Nov 5, 2026. What was built, what works, what was tested and how, and what still needs people.

## What was built

- **The lesson engine** (`src/`): shell, story bar, scale-to-fit, sources sheet, gating, routing; 15 scene types; the Rule model (income line with a switch) and the Chain models (border crossing, route with a cost bar); the feedback coach; speech in and out; one build to a single HTML file.
- **Health insurance, Georgia** (Rule): a cover and 5 Learn screens; 7 At the door screens (4 today, 3 tomorrow).
- **Tariffs and auto jobs, Michigan** (Chain): a cover and 6 Learn screens; 7 At the door screens (4 today, 3 tomorrow).
- **Previews:** a private claude.ai page, live (AI feedback by Claude; the microphone isn't allowed there, so it switches to typing), and a GitHub Pages copy that goes live when the `issues-v2` branch is merged (speech works; feedback is the labeled quick check). The branch adds only `lab/issues-v2/`.
- **Six docs,** contact sheets of every old and new screen, and the tests below.

## What works, and how it was checked

| Check | Result | How |
|---|---|---|
| Both lessons, start to finish | Pass at 5 sizes: 375x667, 390x844, 430x932, 1366x700, 1440x820 | `tests/walk.cjs` taps through every screen like a learner (a wrong guess first, every zone, the switch, each check, each crossing, the sort), answers door 1 by voice through a stand-in microphone and door 2 by typing; then taps the story bar back to Learn screen 3 and forward again, and fails if a finished screen locks |
| Page errors | 0 at every size | Same walk |
| Overflow, clipped text, labels cut off, things sticking out of the phone | 0 at every size; no screen falls back to scrolling except the last one by design | Same walk's layout check, with Figtree and Newsreader loaded |
| Buttons left locked after the task | 0 | Same walk |
| Feedback credits only what was said | 18 of 18 answer cases graded as expected, including the reviewer's eight bad answers ("Canada pays these tariffs… both like them," "Bottoms also opposes expansion," "Pathways is a scam," "cost 200,000 jobs," "Obamacare is bad," "Let me know," "the Canadian supplier pays," "it helps you for sure"); every credited quote is in the answer | `tests/coach.test.cjs` |
| The AI guard | Pass: an AI credit with an invented quote is dropped; an empty quote isn't credited; a failure falls back to the quick check and says so | Same, with a stand-in AI response |
| Keyboard | The income slider moves by arrow keys and Page Up and Down, reads its value aloud as dollars and zone, and updates the readout; options and buttons take focus | A scripted keyboard pass |
| Visual inspection | Every screen viewed at 402x874 | Contact sheets in `img/` |
| Contrast | Body and labels pass WCAG AA; the button greens were deepened because the live green fails AA for white text | Computed ratios |

## What was **not** tested

- **Real people.** No one has used these lessons. No learning gains, no timing, no comprehension results exist.
- **A real microphone on an iPhone.** Speech was tested with a stand-in recognizer. The code is the same browser API the live app uses, but iPhone Safari's behavior (Dictation on, permission prompt, stopping after silence) needs a manual test.
- **AI feedback live.** The claude.ai page calls Claude through the page's own capability, which this session can't open. The prompt, the evidence guard and the fallback were tested with stand-in responses only. Open the private page, answer a door, and look for the purple "AI feedback · Claude" badge; if you see the gray badge with "The AI coach didn't answer this time," it fell back.
- **AI feedback on the public preview.** Not available there: it needs a server (the v156 worker), which isn't deployed. That page labels its feedback "Quick check · phrase matching, not AI."
- **Voices.** The prototype uses the browser's built-in voices, not Warmup's recorded voices.
- **Screen readers on a real phone** (VoiceOver), and older iPhones (iOS 15 and earlier).

## Quick check: honest limits

It's phrase matching. It misses good answers said in other words: "Bottoms would open Medicaid up to about thirty-eight thousand for a family like yours" is right but isn't credited as her position, because it never says "expand." It can be fooled by an answer that strings the right words together without meaning them. That's why it's labeled, why it shows the words it matched and why AI feedback is the target.

## Time (estimated, not measured)

| | Learn | Day 1 at the door (door 1, feedback, strong answer, mistake) | Day 2 (tomorrow's door, feedback, done) | Total |
|---|---|---|---|---|
| Health insurance v2 | about 4.2 min | about 3.2 min | about 2.5 min | about 9.9 min (8.8 at 238 words a minute) |
| Tariffs v2 | about 5.0 min | about 3.2 min | about 2.7 min | about 11.1 min (9.8) |
| Live Georgia lesson, same model | about 3.1 min | | | about 7.6 min |
| Live Michigan lesson, same model | about 2.8 min | | | about 7.2 min |

The model (in `tests/timing.py`): every word on the final state of a screen at 200 words a minute, 3 seconds per screen, extra time for each interaction, 53 seconds per spoken answer. It's pessimistic for skimmers and optimistic for slow readers.

**What this means.** Neither the live lessons (labeled 6 minutes) nor these (about 7.4 and 8.2 minutes for day 1) reach five minutes by this estimate. The covers now show screen counts, not minutes, until the lessons are timed with people. The new Learn is longer because the learner does things; the new door adds evidence in feedback. The biggest levers, in order: cut Learn to five screens (merge the guess into the model screen), make "Hear a strong answer" optional for anyone who got all points, and shorten the done screen. Before cutting, time five real people; reading speed is the assumption most likely to be wrong.

## Accuracy

- Facts come from the approved lessons (fact-checked Nov 1) plus nine checked on Nov 5: the 2026 poverty guidelines (HHS), Pathways rules (age, poverty-line income, 80 hours), the 138% expansion limit (HealthCare.gov; $37,700 is our math), Georgia's law requiring the legislature's approval (O.C.G.A. 49-4-142.2), the 50% steel duty and USMCA's partial exemptions (a July 2026 trade brief, a secondary source), vehicle jobs up about 500 (Bridge Michigan via Vehicle Service Pros), the University of Michigan forecast and its caveat (Crain's, May 2025), other forces on auto jobs (Motor1) and who sets tariffs (CRS).
- Causal claims: the jobs drop is presented as timing, not cause, with an explicit check.
- Offices: the governor note and the senator note are both sourced.
- Real races: both covers name the race and say Election Day was Nov 3; the lessons don't state results. Made-up people (Bri, Ana, Dee, Tasha, Rosa, Samira, Ray) are labeled at the end.
- **Confirmed this session:** the 2026 poverty guidelines (HHS), Pathways' age, income and 80-hour rules, Georgia's law requiring the legislature's approval (O.C.G.A. 49-4-142.2, read on Justia), the Supreme Court's Feb 20, 2026 ruling against the emergency-powers tariffs (Fortune), the 2025 law's work rules starting by January 2027 with an exemption path for parents of young children (AAP). The reviewer separately confirmed the NY Fed figure (94% falling to 86% by November 2025, measured on import prices), steel at 50% with no USMCA exemption, and Michigan parts jobs (FRED shows 109.5k for June 2026; the lesson uses the state dashboard's 109.6k).
- **Not confirmed, recheck before anyone outside sees it:** (1) Georgia's parent Medicaid limit. The approved lesson says $662 a month for a family of three (about $7,900 a year); the state's table didn't load here, and the reviewer found a secondary site saying $797 a month, possibly with an income disregard. (2) The exact child age in the federal parent exemption (the AAP page's chart splits at 13; the lesson says "13 and under"). (3) Rogers's September statement: his position is now worded "has backed the tariffs" without a date. (4) Poverty line: $27,320 is the 2026 guideline, which applies to plans bought now for 2027; 2026 plans used $26,650.

## Known issues and open decisions

1. **The Maya frame.** v2 names real candidates in real races. The live app presents one fictional Senate candidate across five races for different offices. Pick one: (a) real races named, as here (Claude's pick); (b) a stand-in only when every lesson comes from the same office.
2. **Second door moved to the next day.** The prototype lets you do it now; the app would need a one-door warmup slot on day 2.
3. **Button green deepened** for contrast; the brand green stays in drawings and the story bar.
4. **Time** is over target; see above.
5. **The tariffs route is an example route,** labeled as such; real parts take many routes.

## Independent review

A separate agent that didn't build the lessons reviewed them (walked both at 1366x700 and 375x667, typed deliberately bad answers, spot-checked facts on the web). Its findings, ranked, and what changed:

| # | Finding | What changed |
|---|---|---|
| 1 | The quick check credited wrong answers (eight examples, including 4 of 4 for "Canada pays… both like them"), and the done screen celebrated regardless | A point now needs one sentence carrying the candidate's name and position together; "not" patterns block contradictions; misstatement flags cancel the point they contradict (under AI grading too); short answers can't earn the listening point; the done headline depends on what was shown. All eight now fail in the tests |
| 2 | The federal work rule was wrong for Bri: parents of young children can be exempt, and the rules start by January 2027 | Fixed in the facts, the choice screen and the strong answer; the flag that penalized the correct statement is gone |
| 3 | Jackson's plan was misdescribed ("smaller," and Pathways' income limit put in his column) | His row now says he hasn't set a limit; "smaller" is gone everywhere |
| 4 | The Pathways evidence screen was one-sided and compared a first-year forecast with three-year enrollment | Screen cut; both programs' track records now sit in one "So far" row on the choice screen, worded as what they are. The KFF Health News clipping went with it |
| 5 | "$7,900" read as if the whole family gets nothing | The line now says it's for the parent and that kids qualify at higher incomes |
| 6 | The tariffs sort contradicted itself on net jobs | Rewritten: no one has measured either effect |
| 7 | Canada's tariff drawn as certain; tariff blocks as big as work steps | Crossing 2 is now "may apply"; tariff blocks are smaller and the bar says "not to scale" |
| 8 | The tariffs choice screen was unbalanced (an endorsement for one side; an undated "backed, then reversed" for the other) | Endorsement removed; Rogers "has backed the tariffs"; the Supreme Court ruling added to the office note |
| 9 | Drawing collisions (marker over labels, empty Canada panel, the screen tag in the frame's corner, cramped result rows) | Fixed: names move clear of the marker, a steel mill in Canada, wider customs box, tag moved in, result spacing |
| 10 | Header and jargon issues (MI2 4's header hid the takeaway; USMCA, counter-tariffs) | MI2 4's header now says "The numbers show when, not why"; USMCA and counter-tariffs replaced with plain words |
| 11 | Slider without an accessible name; focus lost after sending the steel | Both fixed |

**Not changed, and why.** The reviewer called the four taps on the route and the "find all three zones" task partly for show. I kept them: following each crossing is the mechanism, and visiting each zone is how the line gets built. Dee's readout now explains why she sits in the blue zone. Ray's door still tests mainly who pays and what can happen next; adding the chain and the job evidence to it would make day 2 longer.

## Robert's Nov 5 review

Four screens read as confusing and the story bar didn't go back. Fixed: candidate tabs replace the two-column grids, the sort shows one claim at a time, the border bar's labels fit, and the story bar navigates. Rules added to the UX system (never a two-column text grid on a phone; one question on screen at a time; labels never cut off; the story bar is navigation). After the changes: 43 checks at each of six sizes (375x667, 390x844, 402x874, 430x932, 1366x700, 1440x820), 0 page errors, 0 layout problems; 18 of 18 coach tests pass. The walk test now covers going back through the story bar.

### Second independent review of the reworked screens

A separate agent tested the reworked screens by touch at 375x667 and 390x844. It found the border screen clear and the story bar working, and raised eight issues. All eight are fixed:

| # | Finding | What changed |
|---|---|---|
| 1 | Going back to a finished choice or sort screen locked it again and started it over | A screen counts as finished when its task is done; going back shows it finished. The walk test now visits every Learn screen again through the story bar and fails if one locks |
| 2 | Georgia cards unequal: her plan's own name and a reassuring fact; his "What he calls…" and a disappointing comparison | Both plans named in the candidate's own words; both "So far" rows state the same kind of fact (where the approach stands now); the first-year forecast comparison is off this screen |
| 3 | El-Sayed's heading used his own sales word ("Smart") | Now "Wants targeted tariffs…", matching Rogers's descriptive heading |
| 4 | The Democrat always first, so the Republican reads as the reply | No card opens until tapped; tab order is random each visit |
| 5 | Sort: a wrong answer gave no next step; two competing buttons; the "Not proven" icon looked like an "i" | Wrong answers say what to tap; "Next claim" is the main button; the icon is a "?" |
| 6 | Text shrank to 76% at 375x667 | Floor raised to 82%; short screens scroll with a fade, and feedback scrolls into view |
| 7 | Story bar targets too small | 44 pixels tall |
| 8 | "Now tap Rogers" showed on a finished screen | Fixed by 1 |

After these fixes: 0 page errors and 0 layout problems at six sizes; 18 of 18 coach tests pass. On 375x667, seven of 43 screens now scroll by 25 to 56 pixels (the home list, both guess screens, both Georgia ruler screens, the Georgia choice, the jobs chart); on 1366x700, one does (the first ruler, 27 pixels). None scroll at 390x844 or larger.
