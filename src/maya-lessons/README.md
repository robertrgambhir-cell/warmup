# Maya Kaur issue lessons: source

The campaign issue lessons (five real 2026 candidates shown as the fictional Maya Kaur). Rules for changing them: the lesson playbook, claude/campaign-demos/lesson-playbook.md in the Warmup project.

## Build

    python3 build.py clips11.json ../../maya.html        # full page, with voices
    python3 build.py "" maya11-lean.html                 # lean copy, no voices (the project copy)

The build stitches base-v10-lean.html (CSS, shell, faces, Maya's photo, voices helpers) + v11.css + lessons11.js + engine11.js + door11.js, and embeds clips11.json (Kokoro voice clips keyed by line text).

## Publish (every change goes to all of these)

1. robertrgambhir-cell/warmup: maya.html (standalone link robertrgambhir-cell.github.io/warmup/maya.html)
2. robertrgambhir-cell/m-r4x8t2: wdpfxqlsvp/issues/index.html (inside the demo app; yourwarmup.com/wdpfxqlsvp/?issues opens it). The app's Learn-tab tile and overlay are in wdpfxqlsvp/app.html (versions 130 and 134; app-addon-v130.html is the snippet).
3. The claude.ai artifact https://claude.ai/artifact/6hYEdPwqN2Zskdh6jkDh43 (publish maya.html)
4. The lean copy to the project: claude/campaign-demos/maya-lessons-app.html

## Files

- lessons11.js: all five lessons (cards, sources, voters, Hear it done and Catch the mistake scripts, grading regexes)
- engine11.js: home, stepper, shell, fit-to-screen (fitCard), voices, listening, events
- door11.js: the warm-up's door drawing (figure, doorScene) and the four practice parts
- v11.css: everything new since version 10 (appended in order v11 to v11.9)
- New voice lines: run tests/lines11.js on a built page to get lines11.json, then gen11.py (Kokoro, kokoro.onnx and voices.bin) writes clips11.json
- tests/: flow11.js (whole-lesson run with a fake mic; args page, shots dir, lessons, ans11.json), fill.js (overflow and fill at three iPhone sizes)
