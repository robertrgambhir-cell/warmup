const { chromium } = require("playwright"); const path = require("path");
(async () => { const b = await chromium.launch(); const p = await b.newPage(); await p.route(/fonts\./, r => r.abort());
 await p.goto("file://" + path.resolve(process.argv[2])); const l = await p.evaluate(() => window.__warmupLines());
 require("fs").writeFileSync(process.argv[3], JSON.stringify(l)); console.log(l.length); await b.close(); })();
