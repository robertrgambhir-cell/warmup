#!/usr/bin/env python3
"""Estimated time per lesson, from the walk's word counts plus stated assumptions. An estimate, not a measurement:
no person has been timed. Usage: python3 tests/timing.py <walk log.json>
Assumptions (each one is a guess to replace with real timings from the first testers):
- Reading: 200 words a minute on a phone (adult silent reading of nonfiction averages about 238; phone and
  instructional text run slower). Only the final state of each screen is counted, so feedback text is included.
- Each tap-to-answer or tap-to-advance: 3 seconds. Exploring the income line or the route: 15 seconds.
- Each check case or crossing beyond the one on screen at the end: 12 seconds (read and answer).
- A spoken answer: 8 seconds to hear the voter, 10 to think, 35 to answer.
"""
import json, sys, re
d = json.load(open(sys.argv[1]))
EXTRA = {"ruler-start": 0, "ruler": 15 + 6, "flip": 6, "apply": 12 + 6, "bars": 4, "sort": 3 * 4, "border": 6, "route": 15 + 3 * 4, "ask": 3,
         "door1": 53, "door2": 53, "result1": 0, "result2": 0, "hear": 0, "catch": 6, "compare": 0, "count": 0, "cover": 0, "done": 0}
out = {}
for x in d["log"]:
    if "words" not in x or x["file"].startswith("01-home"): continue
    m = re.match(r"\d+-(\w+)-(L|D)(\d+)-(.*)\.png", x["file"])
    lesson, part, kind = m.group(1), m.group(2), m.group(4)
    if kind.endswith("-start"): continue
    key = kind.replace("1", "1").replace("2", "2")
    secs = x["words"] / 200 * 60 + 3 + EXTRA.get(key, EXTRA.get(kind.rstrip("12"), 0))
    o = out.setdefault(lesson, {"L": 0, "D": 0, "rows": []})
    o[part] += secs; o["rows"].append((x["tag"], kind, x["words"], round(secs)))
for k, o in out.items():
    print(f"\n{k}")
    for r in o["rows"]: print(f"  {r[0]:9} {r[1]:14} {r[2]:4} words  ~{r[3]}s")
    door2 = [r for r in o["rows"] if r[1] in ("door2", "result2")]
    d2 = sum(r[3] for r in door2)
    print(f"  Learn ~{o['L']/60:.1f} min · At the door ~{o['D']/60:.1f} min · total ~{(o['L']+o['D'])/60:.1f} min")
    tot = o['L'] + o['D']; words = sum(r[2] for r in o["rows"]); fast = tot - words / 200 * 60 + words / 238 * 60
    print(f"  Day 1 without the second door (it opens the next day in the app): ~{(tot-d2)/60:.1f} min; day 2's door ~{d2/60:.1f} min")
    print(f"  At 238 words a minute (average adult nonfiction reading) instead of 200: total ~{fast/60:.1f} min")
