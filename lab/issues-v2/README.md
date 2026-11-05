# Warmup issue lessons, v2 (prototype)

Two redesigned issue lessons on a new lesson system: **health insurance** (Georgia governor's race, the Rule format) and **tariffs and auto jobs** (Michigan U.S. Senate race, the Chain format).

**This is separate from the live app.** Nothing in `m-r4x8t2` (yourwarmup.com), the issue lessons at `maya.html` or the lesson machine changed. Deleting this folder removes the prototype.

- Preview: https://robertrgambhir-cell.github.io/warmup/lab/issues-v2/ (speech works in iPhone Safari with Dictation on and in desktop Chrome; feedback is the labeled quick check)
- Private preview on claude.ai (AI feedback by Claude; typing instead of the mic): the artifact link in the project notes
- Open one lesson: add `#health` or `#tariffs`; add `?fast` to skip voices

## Docs

- `docs/NEW-ISSUE-LESSON-DESIGN-SYSTEM.md`: the review, the three formats, the shared modules, the pedagogy rules
- `docs/NEW-ISSUE-LESSON-UX-SYSTEM.md`: layout, type, color, components, interaction, accessibility
- `docs/ORIGINAL-VS-NEW-COMPARISON.md`: screen by screen, with contact sheets in `docs/img/`
- `docs/FIVE-ISSUE-FRAMEWORK-TEST.md`: how the system fits all five issues
- `docs/QUALITY-AND-TEST-REPORT.md`: what was built, tested and still needs testing
- `docs/NEXT-STEP-LESSON-BUILDER-SPEC.md`: how the lesson machine would make these (not built)
- `docs/screens/`: every screen at 402x874

## Build and test

```
python3 build.py --artifact                         # dist/index.html, dist/artifact.html and ./index.html
node tests/walk.cjs dist/index.html out 402 874 2   # walks both lessons, screenshots, layout checks
node tests/coach.test.cjs                           # feedback: good answers pass, bad ones fail, quotes are real
python3 tests/timing.py out/log.json                # time estimate from the walk (an estimate, not a measurement)
```

Fonts for tests (Figtree, Newsreader; SIL Open Font License) are in `tests/fonts/`.
