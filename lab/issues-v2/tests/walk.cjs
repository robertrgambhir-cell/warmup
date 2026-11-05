// Walks both v2 lessons from home to the end at one screen size, doing every interaction the way a learner would
// (a wrong guess first, the zones, the switch, every check, the route, the sort), answering door 1 by voice (a fake
// microphone) and door 2 by typing. Saves a screenshot of every screen and checks the layout of each one.
// Usage: node tests/walk.cjs <dist/index.html> <shots dir> <width> <height> [scale]
const { chromium } = require("playwright"); const path = require("path"); const fs = require("fs");
const [APPF, SHOTS] = process.argv.slice(2, 4); const W = +(process.argv[4] || 402), H = +(process.argv[5] || 874), DSF = +(process.argv[6] || 1);
const FONTS = path.join(__dirname, "fonts");
const f = (n) => `url(data:font/ttf;base64,${fs.readFileSync(path.join(FONTS, n)).toString("base64")}) format("truetype")`;
const FONT_CSS = `@font-face{font-family:"Figtree";font-weight:300 900;src:${f("Figtree.ttf")}}@font-face{font-family:"Newsreader";font-weight:200 800;src:${f("Newsreader.ttf")}}@font-face{font-family:"Newsreader";font-style:italic;font-weight:200 800;src:${f("NewsreaderItalic.ttf")}}`;
const SAY = {
  health: "Medicaid in Georgia stops really low, so you fall in the gap. Bottoms wants to expand Medicaid.",
  tariffs: "The company bringing the steel in pays the tariff, so prices go up. El-Sayed wants targeted tariffs, not dumb ones."
};
const TYPE = {
  health: "From what you've told me, at 30,000 for a family of three you're above the poverty line, so today you can get help buying a plan on HealthCare.gov. With full expansion you'd likely qualify for Medicaid.",
  tariffs: "Either you or your supplier pays the tariff when the goods come in, so you'd probably pay more and might have to raise prices or find other suppliers. It depends on your costs."
};
(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DSF });
  await ctx.addInitScript(() => {
    window.__say = "";
    class FakeSR { start() { setTimeout(() => this.onresult && this.onresult({ results: [Object.assign([{ transcript: window.__say }], { isFinal: true })] }), 80); }
      stop() { setTimeout(() => this.onend && this.onend(), 30); } abort() {} }
    window.SpeechRecognition = FakeSR; window.webkitSpeechRecognition = FakeSR;
  });
  const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(String(e))); p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  await p.route(/fonts\.googleapis\.com/, (r) => r.fulfill({ status: 200, contentType: "text/css", body: FONT_CSS }));
  await p.route(/fonts\.gstatic\.com/, (r) => r.abort());
  const log = []; let n = 0;
  const tag = () => p.evaluate(() => document.getElementById("tag").textContent);
  const layout = () => p.evaluate(() => {
    const out = [], body = document.getElementById("body"), phone = document.getElementById("phone").getBoundingClientRect();
    if (!body.classList.contains("scroll") && body.scrollHeight > body.clientHeight + 2) out.push(`body overflows ${body.scrollHeight - body.clientHeight}px at k=${WU.app.k}`);
    if (body.dataset.fallback) out.push(`too tall even at the smallest size: scrolls ${body.scrollHeight - body.clientHeight}px`);
    if (document.documentElement.scrollWidth > innerWidth + 1) out.push("page scrolls sideways");
    for (const el of document.querySelectorAll("#scr *")) {
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      if (!r.width || cs.visibility === "hidden" || el.closest(".sheet") || el.closest(".thread") || el.closest("svg")) continue;
      if (r.right > phone.right + 1 || r.left < phone.left - 1) out.push(`${el.tagName.toLowerCase()}.${el.className} sticks out ${Math.round(Math.max(r.right - phone.right, phone.left - r.left))}px`);
    }
    const nx = document.getElementById("next"); if (nx.scrollWidth > nx.clientWidth + 1) out.push("main button label cut off");
    return [...new Set(out)].slice(0, 5);
  });
  const shot = async (name) => { await p.waitForTimeout(250); const t = await tag(); n++; const file = `${String(n).padStart(2, "0")}-${name}.png`; await p.screenshot({ path: path.join(SHOTS, file) }); const lay = await layout(); const k = await p.evaluate(() => WU.app.k); const words = await p.evaluate(() => document.getElementById("body").innerText.split(/\s+/).filter(Boolean).length); log.push({ file, tag: t, k, lay, words }); };
  const next = async () => { await p.click("#next"); await p.waitForTimeout(150); };
  const locked = () => p.evaluate(() => document.getElementById("next").getAttribute("aria-disabled") === "true");
  const solveOpts = async (scope) => { // click options until the right one shows (wrong first when there is one)
    const k = await p.$$eval(`${scope} .opt`, (els) => els.length);
    for (let i = 0; i < k; i++) { const ok = await p.$(`${scope} .opt.right`); if (ok) break; await p.click(`${scope} .opt[data-i="${(i + 1) % k}"]`); await p.waitForTimeout(80); }
  };
  await p.goto("file://" + path.resolve(APPF) + "?fast"); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await shot("home");
  for (const id of ["health", "tariffs"]) {
    await p.goto("file://" + path.resolve(APPF) + "?fast#" + id); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    const L = await p.evaluate((x) => WU.lessons[x].learn.map((s) => s.type), id);
    for (let i = 0; i < L.length; i++) {
      const type = L[i];
      if (type === "ask") { await shot(`${id}-L${i}-ask-start`); await p.click('.opt[data-i="0"]'); }
      else if (type === "ruler") {
        const task = await p.evaluate(() => WU.app.lesson.learn[WU.app.i].task);
        if (task === "zones") { await shot(`${id}-L${i}-ruler-start`); for (const b of await p.$$(".who-row button")) { await b.click(); await p.waitForTimeout(60); } await p.fill("#rng", "30000"); await p.dispatchEvent("#rng", "input"); }
        else { await shot(`${id}-L${i}-flip-start`); await p.click('.toggle button[data-w="expand"]'); }
      }
      else if (type === "apply") { await shot(`${id}-L${i}-apply-start`); const m = await p.evaluate(() => WU.app.lesson.learn[WU.app.i].cases.length); for (let c = 0; c < m; c++) { await solveOpts("#case"); if (c < m - 1) { await p.click("#nx"); await p.waitForTimeout(80); } } }
      else if (type === "bars") { if (await p.$(".opt")) { await shot(`${id}-L${i}-bars-start`); await solveOpts("#body"); } }
      else if (type === "sort") { await shot(`${id}-L${i}-sort-start`); const ans = await p.evaluate(() => WU.app.lesson.learn[WU.app.i].items.map((x) => x.a)); for (let j = 0; j < ans.length; j++) { const wrong = ans[j] === "k" ? "n" : "k"; if (j === 1) await p.click(`.tfb[data-a="${wrong}"]`); await p.click(`.tfb[data-a="${ans[j]}"]`); if (j < ans.length - 1) await p.click("#nc"); } }
      else if (type === "choice") { await shot(`${id}-L${i}-choice-start`); await p.click('.ctabs button[data-i="1"]'); }
      else if (type === "border") { await shot(`${id}-L${i}-border-start`); await p.click("#send"); await p.waitForTimeout(1400); }
      else if (type === "route") { await shot(`${id}-L${i}-route-start`); while (await p.$("#adv")) { await p.click("#adv"); await p.waitForTimeout(60); } }
      if (await locked()) log.push({ file: `${id}-L${i}`, problem: "button still locked after the interaction" });
      await shot(`${id}-L${i}-${type}`);
      await next();
    }
    { /* the story bar goes back: the Learn chip, then an earlier segment, then forward again with no task to redo */
      await p.click("#tolearn"); await p.waitForTimeout(150);
      await p.click('#seg button.sg[data-i="2"]'); await p.waitForTimeout(150);
      const back = await tag(); if (!/ 2$/.test(back)) log.push({ file: id + "-stepper", problem: "tapping the story bar did not go back (got " + back + ")" });
      if (await locked()) log.push({ file: id + "-stepper", problem: "a finished screen locked again on the way back" });
      await p.click('#seg button.sg[data-i="' + (L.length - 1) + '"]'); await p.waitForTimeout(150);
      if (await locked()) log.push({ file: id + "-stepper", problem: "the last Learn screen locked again" });
      await next(); }
    const D = await p.evaluate(() => WU.app.lesson.door.map((s) => s.type));
    for (let i = 0; i < D.length; i++) {
      const type = D[i], att = await p.evaluate(() => WU.app.lesson.door[WU.app.i].attempt);
      if (type === "door" && att === 1) { await shot(`${id}-D${i}-door1-start`); await p.evaluate((t) => (window.__say = t), SAY[id]); await p.click(".mic button.m", { force: true }); await p.waitForTimeout(200); await p.click(".mic button.m", { force: true }); await p.waitForTimeout(700); }
      if (type === "door" && att === 2) { await p.click("#swap"); await p.waitForTimeout(150); await p.fill("#ta", TYPE[id]); await p.dispatchEvent("#ta", "input"); }
      if (type === "result") await p.waitForSelector("#again", { timeout: 30000 });
      if (type === "catch") { await p.click('.miss button[data-i="0"]'); const w = await p.evaluate(() => WU.app.lesson.door[WU.app.i].wrong); await p.click(`.miss button[data-i="${w}"]`); }
      if (await locked()) log.push({ file: `${id}-D${i}`, problem: "button still locked after the interaction" });
      await shot(`${id}-D${i}-${type}${att ? att : ""}`);
      if (type === "done") { const g = await p.evaluate(() => [WU.app.st.grade1 && WU.app.st.grade1.items.map((x) => x.id + ":" + x.met), WU.app.st.grade2 && WU.app.st.grade2.items.map((x) => x.id + ":" + x.met)]); log.push({ file: id + "-grades", grades: g }); break; }
      await next();
    }
  }
  fs.writeFileSync(path.join(SHOTS, "log.json"), JSON.stringify({ size: [W, H], errs, log }, null, 1));
  const bad = log.filter((x) => (x.lay && x.lay.length) || x.problem);
  console.log(`${W}x${H}: ${log.length} entries, page errors ${errs.length}, layout problems ${bad.length}`);
  bad.forEach((x) => console.log("  ", x.file, x.tag || "", JSON.stringify(x.lay || x.problem)));
  errs.slice(0, 5).forEach((e) => console.log("   error:", e));
  await b.close();
})();
