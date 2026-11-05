# New issue lesson UX system

The shared mobile experience for every issue lesson, whatever its format. Built and running in the v2 prototype (`lab/issues-v2/src`). Labels as in the design system: **[Decision]** is a rule Robert approved earlier, **[Kept]** is carried over unchanged, **[New]** is proposed here.

## 1. Principles

1. **One screen, one job.** The header states the takeaway; the body holds one picture or one interaction; the bottom row holds Sources and the main button. [Kept]
2. **Do something, then read.** On model screens the learner acts first (drag, flip, send, sort) and the words confirm what they saw. [New]
3. **The button tells you what to do until you've done it.** A locked button reads as the instruction ("Find all three zones to keep going"), then turns green and previews the next takeaway. No silent disabled states. [New]
4. **Wrong answers teach.** A wrong pick turns red and explains why; the learner tries again. No points, no penalties, no confetti mid-Learn. [New, consistent with the briefing tone, Decision]
5. **Honest everywhere.** Progress is literal (one story-bar segment per screen), numbers carry sources, the feedback mode is labeled, made-up people are labeled. [Kept and extended]
6. **Briefed, not entertained.** The interactions are tools, not games. [Kept]

## 2. Layout

- **Frame.** Full screen on a phone (safe-area padding on all sides). On a laptop the lesson sits in a 402-pixel phone frame, as tall as the window allows up to 874 pixels, on the warm page color. [Kept]
- **Top.** Close ✕, then the segmented story bar: one segment per screen, full or empty. At the switch to the door, the Learn bar folds into a green "✓ Learn" chip and the door's segments turn blue. [Kept]
- **Body.** A flex column that scales to fit. One variable, `--k`, multiplies every font size, gap and picture height; the engine picks the largest value from 1.12 down to 0.74 that fits with no scrolling. On very short screens the body scrolls rather than clip, and the test suite reports every screen that does. [Kept and extended]
- **Bottom.** Sources (small, left) and the main button (the rest of the row). The main button wraps to two lines, never truncates. [Kept]
- **Screen tag.** Bottom right, small gray ("GA2 3", "MI2 D2"). GA2 and MI2 mark version 2 so they never collide with the live tags. [Kept]

## 3. Typography and color

| Role | Face | Size at k = 1 |
|---|---|---|
| Header | Figtree 800 | 24 px (cover 27) |
| Body | Figtree 500 | 16 px, 1.45 line height |
| Small and readouts | Figtree 500 to 700 | 13 to 14.5 px |
| Voter quotes, clippings, quoted words in feedback | Newsreader | 19 to 21 px quotes, italic for quoted learner words |
| Labels inside drawings | Figtree 700 to 800 | 11.5 to 13 px |

Tokens (all in `lesson.css`, single light theme like the live app): ink `#3c3c3c`, body `#4b4b4b`, panel `#f4f6f8`, page `#ece7df`, green `#35b57c` / deep `#1b7a4d`, red `#b3261e`, amber `#f2b134` (may apply, not shown), blue `#4a7fd1` (the door and its button), Democratic and Republican avatar colors `#2f5fa8` and `#b04a3a` used only for the two initials circles. Semantic color stays consistent: green is covered or right, red is left out or wrong, amber is uncertain, blue is at the door. [Kept palette; New semantic rule]

## 4. Scene types (the component library)

| Scene | What's on it | Where | File |
|---|---|---|---|
| `cover` | Real race and date, header, three or four "you'll be able to" goals with small pictures, Learn and At the door times, the not-affiliated line | Every lesson | scenes.js |
| `ask` | The voter at their open door, their quote in Newsreader, a guess with three options; the answer arrives on a later screen | Every lesson | scenes.js |
| `ruler` | The Rule model: income line with zones, the story's people, slider plus chips plus drag, a readout in words, optional switch between two sets of rules, task tracking | Rule lessons | models.js |
| `border` | The Chain's first link: goods cross, the tariff tag appears, an arrow shows who pays, then three choices and a measured-share bar | Chain lessons about prices | models.js |
| `route` | The Chain: a route across a border (or any line between two places) step by step, crossings colored by tariff status, a cost bar that grows | Chain lessons | models.js |
| `bars` | Evidence drawn to scale, an optional newspaper clipping and an optional check question | Every format | scenes.js |
| `count` | A big number with a familiar comparison, people drawn to scale | Optional | scenes.js |
| `apply` | New cases one at a time, each answered until right, optional mini model after each answer | Every format | scenes.js |
| `sort` | Claims sorted into "Shown by evidence" or "Not shown," with why | Chain lessons, any disputed number | scenes.js |
| `compare` | The choice: initials avatars, real names and party, the same rows for both, a yellow note on what the office can do | Every candidate lesson | scenes.js |
| `door` | The voter's door on top, the conversation thread, mic or typing, example answer link | Every lesson | practice.js |
| `result` | Feedback: mode badge, each point with the learner's quoted words or "Not heard yet," flags for misstatements, what worked, next time, try again | Every lesson | practice.js |
| `hear` | A strong answer with each key point marked, play aloud | Every lesson | practice.js |
| `catch` | One canvasser answer, one flat misstatement to tap | Every lesson | practice.js |
| `done` | Two doors and how they were graded, objectives shown or not yet, tomorrow's question, where the lesson came from with all source links | Every lesson | practice.js |

A Flow lesson needs one more model scene (`flow`: sources, destinations, a movable amount). Nothing else should be needed for the five current issues.

## 5. Interaction standards

- **Every interaction has a teaching job,** written in the lesson file next to it. If you can't name the job, cut the interaction.
- **Gating.** A scene that asks for an action locks the main button with the instruction as its label; the locked button nudges the instruction line if tapped.
- **Three ways to do every direct manipulation.** Drag the drawing, use the native slider (keyboard and screen reader), or tap a named chip (Ana, Bri, Dee). [New]
- **Checks.** Tap an option; red with an explanation if wrong, green with the reason if right; options lock once right; one case at a time.
- **Guesses** are never graded on the spot; the model screen answers them and names the learner's guess.
- **State is kept per lesson** while the page is open, so Back and Try again don't lose work.
- **Example answers** are always labeled "Example answer, not yours," and their results say so.

## 6. Illustration

- **Kept:** the warm-up's door and voters (`figure()` and `doorScene()` copied unchanged), the sisters with umbrellas and rain, Samira.
- **New voters** use the same figure code: Rosa (Georgia, door 2) and Ray (Lansing, door 2).
- **Diagrams** are drawn in SVG from data: zones from the rule's numbers, bars from the values, the route from the stop list. Nothing is a static image, so the lesson machine can generate them and they scale.
- **Rules:** labels never overlap (checked by eye at five sizes); edge labels carry the numbers to remember; a person's name sits under their figure; illustration never carries a fact the text doesn't also state.

## 7. Motion

Short and functional: the door's breathe and blink (copied), goods crossing the border (0.9 s), the cost bar growing, the zone switch. Everything respects `prefers-reduced-motion`. No celebratory animation mid-lesson.

## 8. Spoken practice

- The door picture stays on top; the voter's line plays aloud on arrival and is always on screen in text.
- **Speak or type.** The mic uses the browser's speech recognition where allowed (iPhone Safari with Dictation, Chrome on desktop). If the mic is blocked or missing, the screen says so in one line and switches to typing. Typing is always one tap away and graded the same way.
- Live words appear while speaking; a very short answer asks for a few sentences.
- **Voices** are the browser's built-in voices in this prototype (a stand-in; the live app's recorded Kokoro and ElevenLabs voices plug into `WU.speak.say`).

## 9. Feedback

- **Mode badge on every result:** "AI feedback · Claude" (purple) or "Quick check · phrase matching, not AI" (gray). If the AI was expected and failed, the screen says it fell back.
- **Each point shows evidence:** "You said: “…”" with the learner's own words, or "Not heard yet." An AI credit whose quote isn't in the answer is dropped and marked "Not credited."
- **Misstatements are flagged by name** ("Check this: “Canada pays these tariffs” Canada doesn't pay the US tariff…").
- **One next step,** in words they could say. When everything landed, "Keep it."

## 10. Sources

Superscripts on every number and every candidate claim, numbered per lesson; the Sources button opens a sheet listing that screen's sources; the last screen lists every source with a link. A figure we computed says "our math." Secondary sources are labeled as such. [Kept and extended]

## 11. Accessibility

- Every control is a real button, link, textarea or range input with a label; visible focus ring.
- The income line has a native slider and chips, not drag only.
- Readouts and feedback use `aria-live="polite"`; drawings have `role="img"` and a sentence description.
- Text contrast meets WCAG AA on white and on the tinted panels (lowest is the gray fine print at 4.9 to 1). **The live app's green button fails AA** (white on `#35b57c` is 2.6 to 1); v2 keeps that green for drawings and the story bar but uses a deeper `#1f8455` (4.7 to 1) for button fills, and `#3567b8` (5.6 to 1) for the blue door button.
- Tap targets are at least 36 px tall, most 44 to 54.
- `prefers-reduced-motion` turns off animation.
- Speech is optional everywhere; a canvasser who can't or won't speak types.
- Not yet done: a screen reader pass on a real iPhone (VoiceOver), and captions for the voice lines are the on-screen text only.

## 12. Reusable code

The prototype is plain JavaScript and CSS with no framework, in the same style as the live single-file app, so it can be pasted in:

```
src/core.js      engine: shell, story bar, routing, scale-to-fit, sources sheet, gating
src/art.js       the warm-up's door and voter figures plus the sisters and Samira
src/scenes.js    cover, ask, count, bars, apply, sort, compare
src/models.js    ruler (Rule), border and route (Chain)
src/coach.js     feedback: AI via Claude when reachable, quick check otherwise, evidence guard
src/practice.js  door, result, hear, catch, done; speech in and out
src/lessons/*.js lesson data only (words, numbers, sources, rubrics)
build.py         joins them into one self-contained HTML file
```

A lesson is a data object. A new lesson in an existing format needs no new code.
