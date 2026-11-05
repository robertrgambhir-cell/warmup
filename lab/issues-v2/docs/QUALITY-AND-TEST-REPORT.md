# Quality and test report

Nov 5, 2026. What was built, what works, what was tested and how, and what still needs people.

## What was built

- **The lesson engine** (`src/`): shell, story bar, scale-to-fit, sources sheet, gating, routing; 15 scene types; the Rule model (income line with a switch) and the Chain models (border crossing, route with a cost bar); the feedback coach; speech in and out; one build to a single HTML file.
- **Health insurance, Georgia** (Rule): 7 Learn screens, 7 At the door screens.
- **Tariffs and auto jobs, Michigan** (Chain): 7 Learn screens, 7 At the door screens.
- **Two previews:** a GitHub Pages copy (speech works; feedback is the labeled quick check) and a private claude.ai page (AI feedback by Claude; the microphone isn't allowed there, so it switches to typing).
- **Six docs,** contact sheets of every old and new screen, and the tests below.

## What works, and how it was checked

| Check | Result | How |
|---|---|---|
| Both lessons, start to finish | Pass at 5 sizes: 375x667, 390x844, 430x932, 1366x700, 1440x820 | `tests/walk.cjs` taps through every screen like a learner (a wrong guess first, every zone, the switch, each check, each crossing, the sort), answers door 1 by voice through a stand-in microphone and door 2 by typing |
| Page errors | 0 at every size | Same walk |
| Overflow, clipped text, labels cut off, things sticking out of the phone | 0 at every size; no screen falls back to scrolling except the last one by design | Same walk's layout check, with Figtree and Newsreader loaded |
| Buttons left locked after the task | 0 | Same walk |
| Feedback credits only what was said | 11 of 11 answer cases graded as expected (good answers pass; "he's against Medicaid," "Canada pays," "the tariffs killed 4,000 jobs" and "it will definitely help" are flagged); every credited quote is in the answer | `tests/coach.test.cjs` |
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

| | Learn | Day 1 at the door (door 1, feedback, strong answer, mistake) | Tomorrow's door | Total |
|---|---|---|---|---|
| Health insurance v2 | about 4.4 min | about 3.2 min | about 1.8 min | about 10 min (9 at 238 words a minute) |
| Tariffs v2 | about 4.9 min | about 3.1 min | about 1.8 min | about 10.7 min (9.5) |
| Live Georgia lesson, same model | about 3.1 min | | | about 7.6 min |
| Live Michigan lesson, same model | about 2.8 min | | | about 7.2 min |

The model (in `tests/timing.py`): every word on the final state of a screen at 200 words a minute, 3 seconds per screen, extra time for each interaction, 53 seconds per spoken answer. It's pessimistic for skimmers and optimistic for slow readers.

**What this means.** Neither the live lessons (labeled 6 minutes) nor these (about 7.5 to 8 minutes for day 1) reach five minutes by this estimate. The new Learn is longer because the learner does things; the new door adds evidence in feedback. The biggest levers, in order: cut Learn to five screens (merge the guess into the model screen), make "Hear a strong answer" optional for anyone who got all points, and shorten the done screen. Before cutting, time five real people; reading speed is the assumption most likely to be wrong.

## Accuracy

- Facts come from the approved lessons (fact-checked Nov 1) plus nine checked on Nov 5: the 2026 poverty guidelines (HHS), Pathways rules (age, poverty-line income, 80 hours), the 138% expansion limit (HealthCare.gov; $37,700 is our math), Georgia's law requiring the legislature's approval (O.C.G.A. 49-4-142.2), the 50% steel duty and USMCA's partial exemptions (a July 2026 trade brief, a secondary source), vehicle jobs up about 500 (Bridge Michigan via Vehicle Service Pros), the University of Michigan forecast and its caveat (Crain's, May 2025), other forces on auto jobs (Motor1) and who sets tariffs (CRS).
- Causal claims: the jobs drop is presented as timing, not cause, with an explicit check.
- Offices: the governor note and the senator note are both sourced.
- Real races: both covers name the race and say Election Day was Nov 3; the lessons don't state results. Made-up people (Bri, Ana, Dee, Tasha, Rosa, Samira, Ray) are labeled at the end.
- Not independently verified this session: the approved lessons' own figures (I relied on the Nov 1 fact check), and the GPB article's work-rules point (the page wouldn't open here).

## Known issues and open decisions

1. **The Maya frame.** v2 names real candidates in real races. The live app presents one fictional Senate candidate across five races for different offices. Pick one: (a) real races named, as here (Claude's pick); (b) a stand-in only when every lesson comes from the same office.
2. **Second door moved to the next day.** The prototype lets you do it now; the app would need a one-door warmup slot on day 2.
3. **Button green deepened** for contrast; the brand green stays in drawings and the story bar.
4. **Time** is over target; see above.
5. **The tariffs route is an example route,** labeled as such; real parts take many routes.

## Independent review

A separate agent that didn't build the lessons reviewed them; its findings and what changed are below.
