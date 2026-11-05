#!/usr/bin/env python3
"""Build the issue lessons v2 prototype into one self-contained HTML file.

    python3 build.py            # writes dist/index.html (full page, for GitHub Pages and local files)
    python3 build.py --artifact # also writes dist/artifact.html (no doctype/head; the claude.ai artifact wraps it)

The sources stay separate files (src/), in load order, so the same modules can be pasted into the single-file app:
core.js (engine), art.js (drawings), scenes.js (shared scenes), models.js (the Rule and Chain models),
coach.js (feedback), practice.js (At the door), home.js, lessons/*.js (data). Nothing here touches the live app.
"""
import pathlib, sys, re

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
ORDER = ["core.js", "art.js", "scenes.js", "models.js", "coach.js", "practice.js", "home.js", "lessons/health.js", "lessons/tariffs.js"]

HEAD = """<title>Warmup Issue Lessons</title>
<meta name="robots" content="noindex, nofollow">
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,500;1,6..72,600&display=swap">
"""

def build():
    css = (SRC / "lesson.css").read_text()
    js = "\n".join("/* ===== %s ===== */\n%s" % (f, (SRC / f).read_text()) for f in ORDER)
    assert "—" not in js + css, "em dash in the prototype"
    body = HEAD + "<style>\n" + css + "\n</style>\n<div id=\"wu\"></div>\n<script>\n" + js + "\nWU.boot();\n</script>\n"
    out = ROOT / "dist"
    out.mkdir(exist_ok=True)
    full = "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\">\n" + HEAD + "<style>\n" + css + "\n</style>\n</head>\n<body>\n<div id=\"wu\"></div>\n<script>\n" + js + "\nWU.boot();\n</script>\n</body>\n</html>\n"
    (out / "index.html").write_text(full)
    (ROOT / "index.html").write_text(full)  # the preview URL: /warmup/lab/issues-v2/
    if "--artifact" in sys.argv:
        (out / "artifact.html").write_text(body)
    print("built", len(full), "bytes")

if __name__ == "__main__":
    build()
