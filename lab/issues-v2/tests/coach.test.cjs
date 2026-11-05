// Feedback checks with no browser: the quick check against answers a person might really give, and the AI path's
// guard (a credit whose quote isn't in the answer is dropped). Prints a table; exits 1 on a failed expectation.
// Usage: node tests/coach.test.cjs
const path = require("path");
global.window = global; global.location = { search: "" }; global.URLSearchParams = URLSearchParams;
global.document = { addEventListener() {} };
for (const f of ["core.js", "art.js", "scenes.js", "models.js", "coach.js", "lessons/health.js", "lessons/tariffs.js"]) require(path.join(__dirname, "../src", f));
const WU = global.WU;
const door = (id, n) => WU.lessons[id].door.find((d) => d.type === "door" && d.attempt === n);
const CASES = [
  // [lesson, attempt, label, answer, expected met ids (quick check), expect a flag?]
  ["health", 1, "the example answer", door("health", 1).example, ["gap", "dem", "rep", "listen"], false],
  ["health", 1, "says he's against Medicaid", "Bottoms wants to expand Medicaid. Jackson is against Medicaid.", ["dem"], true],
  ["health", 1, "doesn't know", "I'm not sure, I think they both care about it.", [], false],
  ["health", 1, "right ideas, other words", "Georgia only covers very poor parents, and if you make a bit more you get nothing until you reach the poverty level. Bottoms would open Medicaid up to about thirty eight thousand for a family like yours. Jackson would only cover people who log their work every month.", ["gap"], false],
  ["health", 1, "both oppose expansion", "Jackson opposed expansion. Bottoms also opposes expansion.", [], true],
  ["health", 1, "calls Pathways a scam", "Bottoms wants to expand Medicaid. Jackson's Pathways plan is a scam.", ["dem"], true],
  ["health", 1, "200,000 jobs", "Medicaid expansion would cost 200,000 jobs.", [], false],
  ["health", 1, "two words", "Let me know.", [], false],
  ["health", 2, "the example answer", door("health", 2).example, ["today", "expand", "hedge"], false],
  ["health", 2, "puts Rosa in the gap", "You're in the gap, so you can't get anything. Bottoms would expand Medicaid so you'd qualify.", ["expand"], true],
  ["health", 2, "Obamacare is bad", "Obamacare is bad, honestly, and nobody can help you with that.", [], false],
  ["tariffs", 1, "the example answer", door("tariffs", 1).example, ["who", "chain", "honest", "eld", "rog"], false],
  ["tariffs", 1, "says Canada pays", "Canada pays these tariffs. Prices go up for everyone. El-Sayed and Rogers both like them.", [], true],
  ["tariffs", 1, "blames all the jobs", "The tariffs killed 4,000 jobs. Companies pay them and prices go up.", ["who"], true],
  ["tariffs", 2, "the example answer", door("tariffs", 2).example, ["who2", "options2", "honest2"], false],
  ["tariffs", 2, "promises it helps", "It will definitely help you, Ray, because Canadian stuff gets more expensive.", [], true],
  ["tariffs", 2, "Canadian supplier pays", "The Canadian supplier pays the tariff at the border, so it might not hurt you.", ["honest2"], true],
  ["tariffs", 2, "helps for sure", "It helps you for sure, because you'd pay less than the big stores.", [], true]
];
let fail = 0; const rows = [];
for (const [id, n, label, text, want, flag] of CASES) {
  const r = WU.coach.quick(door(id, n).rubric, text);
  const got = r.items.filter((x) => x.met).map((x) => x.id);
  const ok = JSON.stringify(got.sort()) === JSON.stringify([...want].sort()) && (!!r.flags.length === flag);
  if (!ok) fail++;
  rows.push(`${ok ? "pass" : "FAIL"}  ${id} door ${n}  ${label.padEnd(26)} credited: ${got.join(", ") || "none"}${r.flags.length ? "  flagged: " + r.flags.length : ""}`);
  r.items.filter((x) => x.met).forEach((x) => { if (!x.quote || !text.includes(x.quote.replace(/^…|…$/g, ""))) { fail++; rows.push(`FAIL  quote for ${x.id} is not in the answer: ${x.quote}`); } });
}
// the AI guard: one honest credit, one invented quote, one credit with no quote
(async () => {
  const rub = door("health", 1).rubric, text = "Bottoms wants to expand Medicaid so you'd qualify.";
  const fake = { items: [{ id: "dem", met: true, quote: "Bottoms wants to expand Medicaid" }, { id: "rep", met: true, quote: "Jackson wants work requirements" }, { id: "gap", met: true, quote: "" }], flags: [{ quote: "not in the answer", why: "x" }] };
  WU.coach.endpoint = "mock"; global.fetch = async () => ({ ok: true, json: async () => fake });
  const r = await WU.coach.grade(rub, text);
  const okGuard = r.mode === "ai" && r.items.find((x) => x.id === "dem").met && !r.items.find((x) => x.id === "rep").met && r.items.find((x) => x.id === "rep").dropped && !r.items.find((x) => x.id === "gap").met && r.flags.length === 0;
  rows.push(`${okGuard ? "pass" : "FAIL"}  AI guard: keeps the real quote, drops the invented one and the empty one, drops a flag that isn't in the answer`);
  if (!okGuard) fail++;
  global.fetch = async () => { throw new Error("network down"); };
  WU.coach.endpoint = "mock2"; // new endpoint, but the channel is cached; force a fresh grade through the same path
  const r2 = await WU.coach.grade(rub, text);
  const okFall = r2.mode === "quick" && /network down/.test(r2.fellBack || "");
  rows.push(`${okFall ? "pass" : "FAIL"}  AI failure falls back to the quick check and says so`);
  if (!okFall) fail++;
  console.log(rows.join("\n")); console.log(fail ? `${fail} failed` : "all passed");
  process.exit(fail ? 1 : 0);
})();
