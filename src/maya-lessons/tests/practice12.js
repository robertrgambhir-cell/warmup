// Georgia's v12 Practice: runs GA P1 to GA P8 with a fake mic and screenshots each screen. Args: page, shots dir, width, height
const { chromium } = require("playwright"); const path = require("path");
const PAGE = "file://" + path.resolve(process.argv[2]) + "?all&fast"; const SHOTS = process.argv[3]; const W = +(process.argv[4] || 1440), H = +(process.argv[5] || 820), LES = +(process.argv[6] || 0); const ANS = JSON.parse(require("fs").readFileSync(__dirname + "/ans11.json", "utf8"));
const fake = () => { window.__say = "";
  class FakeSR { start() { const s = this; setTimeout(() => { s.onstart && s.onstart(); setTimeout(() => { s.onresult && s.onresult({ results: [[{ transcript: window.__say }]] }); }, 120); }, 60); }
    stop() { const s = this; setTimeout(() => s.onend && s.onend(), 40); } abort() { this.onend && this.onend(); } }
  window.SpeechRecognition = FakeSR; window.webkitSpeechRecognition = FakeSR; };
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await ctx.addInitScript(fake); const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(String(e)));
  await p.route(/fonts\.g/, (r) => r.abort()); await p.goto(PAGE);
  const tap = async (sel) => { await p.click(sel, { force: true }); await p.waitForTimeout(200); };
  const tag = async () => p.evaluate(() => (document.getElementById("snum") || {}).textContent);
  const fit = async () => p.evaluate(() => { const b = document.getElementById("g12b"); if (!b) return "no g12b"; const last = b.lastElementChild.getBoundingClientRect().bottom, bot = b.getBoundingClientRect().bottom; return Math.round(bot - last); });
  const shot = async (n) => { await p.waitForTimeout(700); await p.screenshot({ path: `${SHOTS}/L${LES}-${n}.png` }); console.log(n, await tag(), "space below:", await fit()); };
  const talk = async (t, n) => { await p.evaluate((x) => (window.__say = x), t); await tap("#talk"); await p.waitForTimeout(400); if (n) await shot(n); await tap("#talk"); await p.waitForTimeout(600); };
  await tap(`[data-lesson='${LES}']`); let c = 0; while (!(await p.$("#knock")) && c < 12) { await tap("#stnext"); c++; }
  await shot("P1"); await tap("#knock"); await p.waitForTimeout(400); await shot("P2-open");
  await talk("maya wants to help people get health care", "P2-live"); await shot("P2-follow");
  await talk("i'm not sure what he wants"); await shot("P3");
  await tap("#tohear"); await p.waitForTimeout(1500); await shot("P4");
  await tap("#tomiss"); await p.waitForTimeout(1500); await shot("P5"); await tap("[data-spot='0']"); await shot("P5-picked");
  await tap("#tosecond"); await p.waitForTimeout(400); await shot("P6");
  if (LES === 0) { await talk("She is. About 200,000 Georgians earn too much for Medicaid and can't afford health insurance. Maya will push the legislature to expand Medicaid so you qualify.");
  await talk("He wants a smaller plan like Pathways with work requirements."); } else { await talk(ANS[LES][0]); await talk(ANS[LES][1]); } await p.waitForTimeout(800); await shot("P7");
  await tap("#finish"); await shot("P8");
  console.log("page errors:", errs.length ? errs : "none"); await b.close();
})();
