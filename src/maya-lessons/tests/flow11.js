const { chromium } = require("playwright"); const path = require("path"); const fs = require("fs");
const PAGE = "file://" + path.resolve(process.argv[2]) + "?all&fast"; const SHOTS = process.argv[3]; const ONLY = process.argv[4] ? process.argv[4].split(",").map(Number) : [0,1,2,3,4];
const ANS = JSON.parse(fs.readFileSync(process.argv[5], "utf8")); const SHOTALL = process.argv[6] !== "noshots";
const fake = () => { window.__say = "";
  class FakeSR { start() { const s = this; setTimeout(() => { s.onstart && s.onstart(); setTimeout(() => { s.onresult && s.onresult({ results: [[{ transcript: window.__say }]] }); }, 120); }, 60); }
    stop() { const s = this; setTimeout(() => s.onend && s.onend(), 40); } abort() { this.onend && this.onend(); } }
  window.SpeechRecognition = FakeSR; window.webkitSpeechRecognition = FakeSR; };
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 402, height: 860 }, isMobile: false, hasTouch: true, deviceScaleFactor: 2 });
  await ctx.addInitScript(fake); const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(String(e)));
  await p.route(/fonts\./, (r) => r.abort()); await p.goto(PAGE);
  const tap = async (sel) => { await p.click(sel, { force: true }); await p.waitForTimeout(150); };
  const shot = async (n, force) => { if (!SHOTALL && !force) return; await p.waitForTimeout(1100); await p.screenshot({ path: `${SHOTS}/${n}.png` }); };
  const overflow = async () => p.evaluate(() => { const b = document.querySelector(".st-body"); return b ? b.scrollHeight - b.clientHeight : 0; });
  const talk = async (t, n) => { await p.evaluate((x) => (window.__say = x), t); await tap("#talk"); await p.waitForTimeout(350); if (n) await shot(n); await tap("#talk"); await p.waitForTimeout(500); };
  await shot("home", true);
  for (const L of ONLY) {
    await tap(`[data-lesson='${L}']`); if (await p.$('#howgo')) { await shot('how'); await tap('#howgo'); } const over = [];
    const nc = await p.evaluate(() => 0);
    let c = 0; while (!(await p.$("#knock"))) { await shot(`L${L}-c${c}`); const o = await overflow(); if (o > 2) over.push(c + ":" + o); c++; await tap("#stnext"); if (c > 20) break; }
    await shot(`L${L}-intro`); await tap("#knock"); await shot(`L${L}-t1`);
    await talk("maya wants to help people", `L${L}-t1live`); await talk("i'm not sure what he wants"); await p.waitForTimeout(300); await shot(`L${L}-t1end`);
    await tap("#tohear"); await p.waitForTimeout(600); await shot(`L${L}-hear`);
    const ticks = await p.$$eval(".wlive li", (e) => e.length);
    await tap("#tomiss"); await p.waitForTimeout(600);
    const wrong = await p.evaluate(() => 0); const tiles = await p.$$(".spot-tiles .tile");
    // tap a wrong one first, then the right one
    const M = await p.evaluate((l) => window.__miss ? 0 : 0, L);
    await shot(`L${L}-spot`);
    for (let k = 0; k < tiles.length; k++) { await tap(`[data-spot='${k}']`); if (await p.$("#tosecond")) break; }
    await shot(`L${L}-spotok`);
    await tap("#tosecond"); await shot(`L${L}-t2intro`); await tap("#knock");
    await talk(ANS[L][0]); await talk(ANS[L][1]); await p.waitForTimeout(500);
    const res = await p.$$eval(".four-list li", (e) => e.map((x) => (x.classList.contains("y") ? "+" : "-")).join("")); const warn = !!(await p.$(".warnline"));
    const o2 = await overflow(); await shot(`L${L}-result`);
    await tap("#finish"); await shot(`L${L}-done`); await tap("#srcs"); const ns = await p.$$eval(".srclist li", (e) => e.length); await tap("#srcback"); await tap("#home");
    console.log(`L${L} cards=${c} overflow=[${over.join(" ")}] hearTicks=${ticks} result=${res}${warn ? " WARN" : ""} resultOverflow=${o2} sources=${ns}`);
  }
  await tap("[data-lesson='1']"); await tap("[data-card='8']"); await tap("#stnext"); await tap("[data-part='3']"); await p.waitForTimeout(400); const t3 = await p.$(".spot-tiles") ? "spot" : "?"; await tap("[data-part='0']"); const t0 = await p.$("#story.tap") ? "learn" : "?";
  console.log("part jump:", t3, t0); console.log("page errors:", errs.length ? errs : "none"); await b.close();
})();
