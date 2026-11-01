const { chromium, devices } = require("playwright"); const path = require("path");
(async () => { const b = await chromium.launch();
 for (const vp of [{width:430,height:763},{width:390,height:664},{width:375,height:553}]) {
  const ctx = await b.newContext({ ...devices["iPhone 13"], viewport: vp }); const p = await ctx.newPage(); await p.route(/fonts\./, r => r.abort());
  await p.goto("file://" + path.resolve(process.argv[2]) + "?all&fast"); const rep=[];
  for (let L=0; L<5; L++){ await p.click(`[data-lesson='${L}']`,{force:true}); await p.waitForTimeout(150); if (await p.$('#howgo')) { const o=await p.evaluate(()=>{const b=document.querySelector('.st-body')||document.getElementById('g12b');return b.scrollHeight-b.clientHeight}); if(o>0) console.log('HOW OVER',o); await p.click('#howgo',{force:true}); await p.waitForTimeout(150); } let c=0;
   while(!(await p.$("#knock"))){ await p.waitForTimeout(60); const o=await p.evaluate(()=>{const b=document.querySelector(".st-body")||document.getElementById("g12b"),r=b.getBoundingClientRect(); const kids=[...b.children].filter(k=>!k.classList.contains("st-src")); const src=b.querySelector(".st-src"); const last=kids[kids.length-1].getBoundingClientRect(); const top=kids[0].getBoundingClientRect().top-r.top; const gapMid=(src?src.getBoundingClientRect().top:r.bottom)-last.bottom; return [Math.round(top),Math.round(gapMid),b.scrollHeight-b.clientHeight, Math.round(r.height)]}); rep.push(`L${L}c${c}:${o[0]}/${o[1]}${o[2]>2?"/OVER"+o[2]:""}`); c++; await p.click("#stnext",{force:true}); await p.waitForTimeout(80); }
   await p.click("#home",{force:true}); await p.waitForTimeout(120);}
  console.log(vp.width+"x"+vp.height, rep.join(" ")); await ctx.close(); }
 await b.close(); })();
