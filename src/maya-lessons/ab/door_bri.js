// Renders Bri's front door with the warm-up's door drawing (door11.js), for the Practice golden screen.
const fs = require("fs"), path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "door11.js"), "utf8").split("\n");
const head = src.slice(0, 70).join("\n");  // MOUTH, LOOKS2, HOME2, figure(), doorScene()
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const fn = new Function("esc", head + `
  LOOKS2.bri = { skin: "#8a5a3c", shade: "#6f4630", style: "bob", hair: "#2a1d17", shirt: "#d99a2b", shirtShade: "#b67f1f" };
  HOME2.bri = { kind: "house", wall: "#E3E6EC", texture: "boards", line: "#D3D8E0", door: "#2F6F7F", frame: "#FFFDF6", window: true, num: "52", extra: "plant" };
  return doorScene("bri", { label: "Bri at her front door" });`);
process.stdout.write(fn(esc));
