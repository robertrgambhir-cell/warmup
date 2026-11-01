const { chromium } = require("playwright"); const path = require("path");
const page = "file://" + path.resolve(process.argv[2]);
const shots = process.argv[3];
const routes = ["", "start", "cover"].concat([...Array(11).keys()].map(n => "L" + n)).concat(["pintro", "result", "done"]);
(async () => {
  const b = await chromium.launch();
  for (const vp of [{ width: 1280, height: 800, name: "laptop" }, { width: 390, height: 664, name: "phone" }, { width: 375, height: 553, name: "se" }]) {
    const ctx = await b.newContext({ viewport: { width: vp.width, height: vp.height }, hasTouch: vp.name !== "laptop" });
    const p = await ctx.newPage(); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
    const errs = []; p.on("pageerror", e => errs.push(e.message));
    const rep = [];
    for (const r of routes) {
      await p.goto(page + (r ? "#" + r : "")); await p.waitForTimeout(r === "L4" ? 1700 : 250);
      if (r === "start") { /* how screen */ }
      const o = await p.evaluate(() => {
        const ph = document.querySelector(".phone").getBoundingClientRect(), body = document.querySelector(".body");
        let wide = 0; document.querySelectorAll(".phone *").forEach(e => { const q = e.getBoundingClientRect(); if (q.width && (q.right > ph.right + 1 || q.left < ph.left - 1) && !e.closest(".sheet")) wide++; });
        const foot = document.querySelector(".foot"); const fb = foot ? foot.getBoundingClientRect().bottom : 0;
        return { over: body ? body.scrollHeight - body.clientHeight : 0, wide, footOut: Math.round(fb - ph.bottom) };
      });
      const bad = o.over > 2 || o.wide || o.footOut > 1;
      rep.push((r || "home") + (bad ? `[OVER ${o.over} WIDE ${o.wide} FOOT ${o.footOut}]` : ""));
      if (vp.name === "laptop" && shots) await p.screenshot({ path: `${shots}/${r || "home"}.png`, clip: { x: 430, y: 0, width: 420, height: 800 } });
    }
    console.log(vp.name, rep.join(" "), errs.length ? "ERRORS " + errs.join(" | ") : "");
    await ctx.close();
  }
  /* flow: 1st try with typed answers, hear, catch, 2nd try, result */
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } }); const p = await ctx.newPage(); await p.route(/fonts\./, r => r.abort());
  const errs = []; p.on("pageerror", e => errs.push(e.message));
  await p.addInitScript(() => { delete window.SpeechRecognition; delete window.webkitSpeechRecognition; });
  await p.goto(page + "#try1");
  const say = async t => { await p.waitForSelector("#say", { timeout: 8000 }); await p.fill("#say", t); await p.click("#send"); };
  await say("Yes she wants to help."); await say("I'm not sure.");
  await p.waitForSelector("[data-go=hear]", { timeout: 8000 }); if (shots) await p.screenshot({ path: `${shots}/try1-end.png`, clip: { x: 430, y: 0, width: 420, height: 800 } });
  await p.click("[data-go=hear]"); await p.waitForTimeout(6000); if (shots) await p.screenshot({ path: `${shots}/hear.png`, clip: { x: 430, y: 0, width: 420, height: 800 } });
  await p.click("#skip").catch(() => p.click("[data-go=catch]"));
  await p.waitForSelector(".opt", { timeout: 9000 }); await p.click(".opt[data-o='2']"); if (shots) await p.screenshot({ path: `${shots}/catch.png`, clip: { x: 430, y: 0, width: 420, height: 800 } });
  await p.click("[data-go=try2]");
  await say("Right now 200,000 working Georgians can't get insurance. Maya wants full Medicaid expansion."); await say("He wants a Pathways-style plan with work requirements.");
  await p.waitForSelector("[data-go=result]", { timeout: 8000 }); if (shots) await p.screenshot({ path: `${shots}/try2-end.png`, clip: { x: 430, y: 0, width: 420, height: 800 } });
  await p.click("[data-go=result]"); await p.waitForTimeout(400); if (shots) await p.screenshot({ path: `${shots}/result-3.png`, clip: { x: 430, y: 0, width: 420, height: 800 } });
  await p.click("[data-go=done]"); await p.waitForTimeout(300); if (shots) await p.screenshot({ path: `${shots}/done-real.png`, clip: { x: 430, y: 0, width: 420, height: 800 } });
  console.log("flow", await p.evaluate(() => document.querySelector("h2").textContent), errs.length ? "ERRORS " + errs.join(" | ") : "no errors");
  await b.close();
})();
