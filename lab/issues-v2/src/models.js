/* Warmup issue lessons v2: the interactive models.
   Rule format ("Who qualifies?"): the income line. Drag a household along it, see which zone it lands in, flip one
   condition (a different law) and watch the zones move.
   Chain format ("What causes what?"): the border crossing and the route. Send goods across, see who pays and when;
   follow one part across the border and watch costs pile up where a tariff can apply. */
(function () {
  "use strict";
  var WU = (window.WU = window.WU || {}), S = WU.scene, esc = WU.esc;
  var FILL = { g: "#bfe9d3", r: "#f6d5d1", b: "#cfe0f5", a: "#fbe3b0" }, INK = { g: "#1b7a4d", r: "#b3261e", b: "#2f6f9f", a: "#8a5608" };

  /* ---------- the income line ---------- */
  function zoneAt(zs, v) { for (var i = 0; i < zs.length; i++) if (v < zs[i].to) return i; return zs.length - 1; }
  function nest(svg, x, y, w, h) { return svg.replace("<svg ", '<svg x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" '); }
  function rulerSVG(R, world, v, o) {
    o = o || {};
    var W = 360, X = function (n) { return 8 + (Math.min(n, R.max) / R.max) * (W - 16); }, zs = R.worlds[world];
    var mini = !!o.mini, top = mini ? 6 : 88, bh = mini ? 20 : 34, out = "", from = 0, id = "rc" + Math.random().toString(36).slice(2, 7);
    out += '<defs><clipPath id="' + id + '"><rect x="8" y="' + top + '" width="' + (W - 16) + '" height="' + bh + '" rx="' + (mini ? 6 : 9) + '"/></clipPath></defs><g clip-path="url(#' + id + ')">';
    zs.forEach(function (z) {
      var a = X(from), b = X(Math.min(z.to, R.max));
      out += '<rect x="' + a + '" y="' + top + '" width="' + Math.max(0, b - a) + '" height="' + bh + '" fill="' + FILL[z.c] + '"/>';
      if (!mini) { var mx0 = X(v), nm = (b - a) > z.name.length * 7.4 + 14 ? z.name : ((b - a) > (z.short || "").length * 7.4 + 10 ? z.short : ""), cx = (a + b) / 2;
        /* keep the zone's name clear of the marker: move it to the roomier side, or shorten it */
        if (nm && Math.abs(cx - mx0) < nm.length * 3.7 + 12) { var L = mx0 - a, Rr = b - mx0; cx = L > Rr ? (a + mx0) / 2 - 4 : (mx0 + b) / 2 + 4; var room = Math.max(L, Rr) - 16; if (room < nm.length * 7.4) nm = room >= (z.short || "").length * 7.4 ? z.short : ""; }
        if (nm) out += '<text class="zone-t" x="' + cx + '" y="' + (top + bh / 2 + 4.5) + '" text-anchor="middle" fill="' + INK[z.c] + '" stroke="' + FILL[z.c] + '" stroke-width="4" paint-order="stroke">' + esc(nm) + "</text>"; }
      from = z.to;
    });
    out += "</g>";
    /* the zone edges are the numbers to remember, so they get the labels; plus $0 and the end of the line */
    var ly = top + bh + (mini ? 14 : 17), lab = '<text class="tick" x="8" y="' + ly + '">$0</text>';
    zs.forEach(function (z) {
      if (z.to >= R.max) return;
      var x = X(z.to);
      out += '<path d="M' + x + " " + (top - 3) + " V" + (top + bh + 3) + '" stroke="' + INK[z.c] + '" stroke-width="2"/>';
      lab += '<text class="tick" x="' + x + '" y="' + ly + '" text-anchor="middle" style="font-weight:800;font-size:' + (mini ? 11 : 12.5) + "px;fill:" + INK[z.c] + '">' + esc(z.edge || WU.money(z.to)) + "</text>";
    });
    var lastEdge = zs.filter(function (z) { return z.to < R.max; }).map(function (z) { return X(z.to); }).pop() || 0;
    if (!mini && W - 8 - lastEdge > 90) lab += '<text class="tick" x="' + (W - 8) + '" y="' + ly + '" text-anchor="end">$' + R.max / 1000 + "k a year</text>";
    var ppl = "";
    if (!mini) (R.people || []).forEach(function (p) {
      var art = typeof p.art === "function" ? p.art(world) : p.art, x = X(p.v), near = Math.abs(p.v - v) <= 600;
      ppl += nest(art, x - 21, 0, 42, 70) + '<text class="nm" x="' + x + '" y="' + (top - 6) + '" text-anchor="middle"' + (near ? ' style="fill:#2f5fa8"' : "") + ">" + esc(p.name) + "</text>";
    });
    var mx = X(v), mk = '<g class="handle" pointer-events="none"><path d="M' + mx + " " + (top - 5) + " V" + (top + bh + 5) + '" stroke="#262320" stroke-width="3" stroke-linecap="round"/><circle cx="' + mx + '" cy="' + (top + bh / 2) + '" r="' + (mini ? 5 : 7) + '" fill="#fff" stroke="#262320" stroke-width="3"/></g>';
    var H = ly + 6;
    return '<svg viewBox="0 0 ' + W + " " + H + '" aria-hidden="true">' + ppl + out + lab + mk + "</svg>";
  }
  WU.rulerSVG = rulerSVG;

  function rulerBlock(sc) {
    var R = sc.ruler;
    return '<div class="ruler">' + (sc.toggle ? '<div class="toggle" role="group" aria-label="Which rules">' + sc.toggle.map(function (t, i) { return '<button type="button" data-w="' + t.w + '" aria-pressed="' + (i === 0) + '">' + t.t + "</button>"; }).join("") + "</div>" : "") +
      '<div class="pic plain" id="rsvg"></div>' +
      '<label class="sr" for="rng">Yearly income for ' + esc(R.family) + '</label><input id="rng" type="range" aria-label="Yearly income" min="0" max="' + R.max + '" step="250" value="' + sc.start + '">' +
      '<div class="who-row">' + (R.people || []).map(function (p) { return '<button type="button" data-v="' + p.v + '" aria-pressed="false">' + esc(p.name) + " · " + WU.money(p.v) + "</button>"; }).join("") + "</div>" +
      '<div class="readout" id="read" aria-live="polite"></div></div>';
  }

  S.ruler = {
    html: function (sc) { return "<h2>" + sc.h + "</h2>" + (sc.p ? '<p class="small">' + sc.p + "</p>" : "") + rulerBlock(sc) + '<div id="task"></div>'; },
    mount: function (sc, ctx) {
      var R = sc.ruler, world = sc.toggle ? sc.toggle[0].w : "today", v = sc.start, seen = {}, flipped = false;
      var svgBox = document.getElementById("rsvg"), rng = document.getElementById("rng"), read = document.getElementById("read"), task = document.getElementById("task");
      function person() { var p = null; (R.people || []).forEach(function (q) { if (Math.abs(q.v - v) <= 600) p = q; }); return p; }
      function draw() {
        var zs = R.worlds[world], zi = zoneAt(zs, v), z = zs[zi], p = person();
        svgBox.innerHTML = rulerSVG(R, world, v);
        var st = p && p.read && p.read[world] ? p.read[world] : z.read;
        read.innerHTML = '<span class="amt">' + (p ? esc(p.name) + " · " : "") + WU.money(v) + " a year</span>" +
          '<span class="st ' + z.c + '">' + st[0] + "</span>" + (st[1] ? '<span class="sub">' + st[1] + "</span>" : "");
        (ctx.body.querySelectorAll(".who-row button") || []).forEach(function (b) { b.setAttribute("aria-pressed", String(p && +b.getAttribute("data-v") === p.v)); });
        rng.setAttribute("aria-valuetext", WU.money(v) + " a year: " + z.name);
        seen[world + zi] = true;
        progress();
      }
      function progress() {
        if (sc.task === "zones") {
          var n = R.worlds.today.length, got = 0; for (var i = 0; i < n; i++) if (seen["today" + i]) got++;
          var dots = ""; for (var j = 0; j < n; j++) dots += '<i class="' + (seen["today" + j] ? "on" : "") + '"></i>';
          task.innerHTML = '<p class="found' + '">' + dots + "<span>" + (got < n ? "Zones found: " + got + " of " + n + ". Drag the line or tap a sister." : "All three zones found.") + "</span></p>" + (got === n && sc.reveal ? reveal() : "");
          if (got === n) ctx.ready(); else ctx.lock("Find all three zones to keep going");
        } else if (sc.task === "flip") {
          task.innerHTML = flipped ? '<p class="say good">' + sc.flipped + "</p>" : WU.doLine(sc.doText);
          if (flipped) ctx.ready(); else ctx.lock(sc.lockText || "Flip the switch to keep going");
        }
        WU.fit();
      }
      function reveal() {
        var r = sc.reveal, g = ctx.st[r.key];
        if (g == null) return '<p class="say info">' + r.none + "</p>";
        return '<p class="say ' + (g === r.right ? "good" : "info") + '"><b>You guessed “' + esc(r.opts[g]) + '.”</b> ' + (g === r.right ? r.yes : r.no) + "</p>";
      }
      function set(n) { v = Math.max(0, Math.min(R.max, Math.round(n / 250) * 250)); rng.value = v; draw(); }
      rng.oninput = function () { set(+rng.value); };
      ctx.body.querySelectorAll(".who-row button").forEach(function (b) { b.onclick = function () { set(+b.getAttribute("data-v")); }; });
      ctx.body.querySelectorAll(".toggle button").forEach(function (b) {
        b.onclick = function () {
          world = b.getAttribute("data-w");
          ctx.body.querySelectorAll(".toggle button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
          if (world !== sc.toggle[0].w) flipped = true;
          draw();
        };
      });
      /* drag on the drawing itself */
      var dragging = false;
      function at(e) { var r = svgBox.getBoundingClientRect(); var x = (e.clientX - r.left) / r.width * 360; set(((x - 6) / 348) * R.max); }
      svgBox.addEventListener("pointerdown", function (e) { dragging = true; svgBox.setPointerCapture && svgBox.setPointerCapture(e.pointerId); at(e); });
      svgBox.addEventListener("pointermove", function (e) { if (dragging) at(e); });
      svgBox.addEventListener("pointerup", function () { dragging = false; });
      svgBox.addEventListener("pointercancel", function () { dragging = false; });
      svgBox.style.touchAction = "none";
      draw();
    }
  };

  /* ---------- the border crossing: where a tariff is charged and who pays it first ---------- */
  var COIL = '<g><ellipse cx="0" cy="0" rx="17" ry="17" fill="#8d98a6"/><ellipse cx="0" cy="0" rx="11" ry="11" fill="#b8c1cc"/><ellipse cx="0" cy="0" rx="5" ry="5" fill="#6f7b88"/></g>';
  var NEXT_ICON = {
    price: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 15 L15 5 H26 V16 L16 26 Z" fill="#fbe3b0" stroke="#8a5608" stroke-width="2" stroke-linejoin="round"/><circle cx="21" cy="10" r="2" fill="#8a5608"/><path d="M13 21 V12 M9.5 15.5 L13 12 L16.5 15.5" stroke="#b3261e" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    profit: '<svg viewBox="0 0 32 32" aria-hidden="true"><ellipse cx="16" cy="23" rx="9" ry="3.5" fill="#bfe9d3" stroke="#1b7a4d" stroke-width="2"/><ellipse cx="16" cy="18" rx="9" ry="3.5" fill="#bfe9d3" stroke="#1b7a4d" stroke-width="2"/><path d="M25 6 V13 M22 10 L25 13 L28 10" stroke="#b3261e" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    switch: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 11 H24 M20 7 L24 11 L20 15 M26 21 H8 M12 17 L8 21 L12 25" stroke="#2f6f9f" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  S.border = {
    html: function (sc) {
      return "<h2>" + sc.h + "</h2>" +
        '<div class="pic" style="padding:10px 8px"><svg id="bsvg" viewBox="0 0 360 150" role="img" aria-label="' + esc(sc.alt) + '">' +
        '<rect x="0" y="0" width="150" height="150" rx="12" fill="#f1ebe1"/><rect x="210" y="0" width="150" height="150" rx="12" fill="#e8eef6"/>' +
        '<text x="12" y="20" style="font:800 11px var(--sans);letter-spacing:.06em;fill:#7a6a55">CANADA</text><text x="348" y="142" text-anchor="end" style="font:800 11px var(--sans);letter-spacing:.06em;fill:#4b6a8c">US · MICHIGAN</text>' +
        '<path d="M180 6 V144" stroke="#9aa3ad" stroke-width="3" stroke-dasharray="7 7"/>' +
        '<g transform="translate(155 16)"><rect width="50" height="36" rx="5" fill="#fff" stroke="#9aa3ad" stroke-width="2"/><text x="25" y="16" text-anchor="middle" style="font:800 8px var(--sans);fill:#545b63">US</text><text x="25" y="27" text-anchor="middle" style="font:800 8px var(--sans);fill:#545b63">CUSTOMS</text></g>' +
        '<g transform="translate(62 52)"><rect x="-34" y="0" width="68" height="34" rx="4" fill="#fff" stroke="#b9a88f" stroke-width="2"/><path d="M-26 0 V-16 H-16 V0 M10 0 V-22 H20 V0" fill="#d9cdb9" stroke="#b9a88f" stroke-width="2"/><text x="0" y="15" text-anchor="middle" style="font:800 8.5px var(--sans);fill:#7a6a55">STEEL MILL</text><text x="0" y="26" text-anchor="middle" style="font:700 8px var(--sans);fill:#7a6a55">Ontario</text></g>' +
        '<g transform="translate(306 104)"><rect x="-40" y="-24" width="80" height="40" rx="6" fill="#fff" stroke="#9aa3ad" stroke-width="2"/><path d="M-40 -24 L0 -40 L40 -24" fill="#dfe6ef" stroke="#9aa3ad" stroke-width="2"/><text x="0" y="0" text-anchor="middle" style="font:800 9px var(--sans);fill:#2f5fa8">MICHIGAN</text><text x="0" y="11" text-anchor="middle" style="font:800 9px var(--sans);fill:#2f5fa8">PARTS MAKER</text></g>' +
        '<g id="coil" transform="translate(70 108)" style="transition:transform .9s cubic-bezier(.4,.1,.2,1)">' + COIL + '<text y="32" text-anchor="middle" style="font:700 10px var(--sans);fill:#545b63">steel</text></g>' +
        '<g id="tagg" opacity="0" style="transition:opacity .4s .7s"><path d="M196 70 h66 l8 9 -8 9 h-66 z" fill="#b3261e"/><text x="231" y="83" text-anchor="middle" style="font:800 11px var(--sans);fill:#fff">' + esc(sc.rate) + '</text></g>' +
        '<g id="pay" opacity="0" style="transition:opacity .4s 1.1s"><path d="M306 60 C306 38 262 34 207 34" stroke="#1b7a4d" stroke-width="2.5" fill="none" stroke-dasharray="4 4"/><path d="M212 29 L206 34 L212 39" stroke="#1b7a4d" stroke-width="2.5" fill="none"/><text x="266" y="24" text-anchor="middle" style="font:800 10.5px var(--sans);fill:#1b7a4d">pays the tariff</text></g>' +
        "</svg></div>" +
        '<div id="bnext"><button class="ghost" type="button" id="send" style="width:100%">Send the steel across the border</button></div><div id="bout"></div>';
    },
    mount: function (sc, ctx) {
      ctx.lock("Send the steel across to keep going");
      var send = document.getElementById("send");
      function go() {
        document.getElementById("coil").setAttribute("transform", "translate(234 108)");
        document.getElementById("tagg").setAttribute("opacity", "1");
        document.getElementById("pay").setAttribute("opacity", "1");
        document.getElementById("bnext").innerHTML = "";
        var r = sc.reveal, g = ctx.st[r.key];
        var guess = g == null ? "" : '<p class="say ' + (g === r.right ? "good" : "info") + '"><b>You guessed “' + esc(r.opts[g]) + '.”</b> ' + (g === r.right ? r.yes : r.no) + "</p>";
        var bar = '<div style="display:flex;flex-direction:column;gap:6px"><p class="small" style="margin:0">' + sc.who.lab + '</p><div style="display:flex;height:calc(20px * var(--k));border-radius:10px;overflow:hidden"><i style="display:block;width:' + sc.who.us + '%;background:#b3261e"></i><i style="display:block;flex:1;background:#c9cdd3"></i></div><p style="margin:0;font:800 calc(15px * var(--k))/1.2 var(--sans);color:#b3261e">' + sc.who.txt + "</p></div>";
        var opts = sc.next ? '<div class="nexts">' + sc.next.map(function (n) { return '<div><span class="ni">' + NEXT_ICON[n.i] + "</span><b>" + n.t + "</b></div>"; }).join("") + "</div>" : "";
        document.getElementById("bout").innerHTML = '<div style="display:flex;flex-direction:column;gap:12px">' + guess + "<p>" + sc.p + "</p>" + opts + bar + "</div>";
        ctx.st["sent_" + sc.key] = true;
        var bo = document.getElementById("bout"); bo.setAttribute("tabindex", "-1"); if (!ctx.st["sentFocus_" + sc.key]) { ctx.st["sentFocus_" + sc.key] = true; bo.focus({ preventScroll: true }); }
        ctx.ready(); WU.fit();
      }
      send.onclick = go;
      if (ctx.st["sent_" + sc.key]) go();
    }
  };

  /* ---------- the route: one part, four border crossings ---------- */
  var STOP_ICON = {
    coil: '<circle r="9" fill="#8d98a6"/><circle r="4" fill="#6f7b88"/>',
    part: '<path d="M-9 -9 H7 Q9 -9 9 -7 V-3 H-3 V7 Q-3 9 -5 9 H-7 Q-9 9 -9 7 Z" fill="#9aa5b1" stroke="#6f7b88" stroke-width="1.3" stroke-linejoin="round"/>',
    frame: '<path d="M-10 -6 H10 V6 H-10 Z M-6 -2 H6 V2 H-6 Z" fill-rule="evenodd" fill="#9aa5b1" stroke="#6f7b88" stroke-width="1.2"/>',
    plus: '<path d="M-10 -6 H10 V6 H-10 Z" fill="#9aa5b1" stroke="#6f7b88" stroke-width="1.2"/><circle cx="-4" cy="0" r="2.3" fill="#eef1f5"/><circle cx="4" cy="0" r="2.3" fill="#eef1f5"/>',
    car: '<path d="M-12 4 Q-12 -1 -7 -2 L-3 -8 Q-2 -9 1 -9 H5 Q8 -9 9 -7 L12 -2 Q14 -1 14 4 V6 H-12 Z" fill="#4a7fd1"/><circle cx="-6" cy="6" r="3.2" fill="#2f2a33"/><circle cx="8" cy="6" r="3.2" fill="#2f2a33"/>'
  };
  S.route = {
    html: function (sc) {
      return "<h2>" + sc.h + '</h2><div class="pic route" style="padding:6px 4px 2px"><svg id="rsv" viewBox="0 0 360 236" role="img" aria-label="' + esc(sc.alt) + '"></svg></div>' +
        '<div id="rtx" aria-live="polite"></div>' +
        '<div class="cost" aria-hidden="true"><div class="key"><span>Cost so far (not to scale):</span><span><i style="background:#c9ced6"></i>work</span><span><i style="background:var(--red)"></i>tariff</span><span><i style="background:var(--amber-fill)"></i>may apply</span></div><div class="bar" id="stk"></div></div>' +
        '<div id="rbtn"></div>';
    },
    mount: function (sc, ctx) {
      var k = 0, xs = [44, 116, 188, 260, 330], C = 54, U = 176, B = 116;
      function y(i) { return sc.stops[i].c === "ca" ? C : U; }
      function draw() {
        var s = '<rect x="0" y="0" width="360" height="' + (B - 3) + '" rx="12" fill="#f1ebe1"/><rect x="0" y="' + (B + 3) + '" width="360" height="' + (236 - B - 3) + '" rx="12" fill="#e8eef6"/>' +
          '<text class="lbl" transform="translate(9 ' + (B - 8) + ') rotate(-90)">CANADA</text><text class="lbl" transform="translate(9 ' + (B + 8) + ') rotate(-90)" text-anchor="end">US · MICHIGAN</text>' +
          '<path d="M0 ' + B + ' H360" stroke="#9aa3ad" stroke-width="3" stroke-dasharray="7 7"/>';
        for (var i = 0; i < sc.stops.length - 1; i++) {
          var x1 = xs[i], x2 = xs[i + 1], y1 = y(i), y2 = y(i + 1), mx = (x1 + x2) / 2, done = i < k;
          s += '<path d="M' + x1 + " " + y1 + " C" + mx + " " + y1 + " " + mx + " " + y2 + " " + x2 + " " + y2 + '" stroke="' + (done ? "#545b63" : "#c3c9d0") + '" stroke-width="3" fill="none" stroke-linecap="round"' + (done ? "" : ' stroke-dasharray="2 6"') + "/>";
        }
        for (var c = 0; c < sc.stops.length - 1; c++) {
          var cx = (xs[c] + xs[c + 1]) / 2, dn = c < k, tax = sc.cross[c].tax, col = tax === true ? "#b3261e" : tax ? "#d38a12" : "#545b63";
          s += '<g transform="translate(' + cx + " " + B + ')"><circle r="12" fill="' + (dn ? col : "#fff") + '" stroke="' + (dn ? "#fff" : "#c3c9d0") + '" stroke-width="2.5"/><text y="4.5" text-anchor="middle" style="font:800 12px var(--sans);fill:' + (dn ? "#fff" : "#8a8f96") + '">' + (c + 1) + "</text></g>";
          if (false && dn && sc.cross[c].tag) s += '<text x="' + cx + '" y="' + (B + (sc.stops[c + 1].c === "us" ? -18 : 28)) + '" text-anchor="middle" style="font:800 11px var(--sans);fill:' + col + '">' + esc(sc.cross[c].tag) + "</text>";
        }
        sc.stops.forEach(function (st, i) {
          var yy = y(i), on = i <= k, up = st.c === "ca";
          s += '<g transform="translate(' + xs[i] + " " + yy + ')" style="opacity:' + (on ? 1 : 0.4) + '"><circle r="19" fill="#fff" stroke="' + (i === k ? "#262320" : "#d5d9de") + '" stroke-width="' + (i === k ? 3 : 2) + '"/>' + (STOP_ICON[st.icon] || "") + "</g>";
          var words = st.t.split(" "), mid = Math.ceil(words.length / 2), l1 = words.slice(0, mid).join(" "), l2 = words.slice(mid).join(" ");
          var ty = up ? yy - 40 : yy + 33, tx = Math.min(Math.max(xs[i], 44), 324);
          s += '<text class="step-t" x="' + tx + '" y="' + ty + '" text-anchor="middle" style="opacity:' + (on ? 1 : 0.5) + '"><tspan x="' + tx + '">' + esc(l1) + '</tspan><tspan x="' + tx + '" dy="13">' + esc(l2) + "</tspan></text>";
        });
        document.getElementById("rsv").innerHTML = s;
        var parts = [["w", 3]];
        for (var j = 0; j < k; j++) { var tx2 = sc.cross[j].tax; if (tx2) parts.push([tx2 === true ? "t" : "m", 1]); parts.push(["w", 3]); }
        var tot = 3 + 3 * sc.cross.length + sc.cross.filter(function (c) { return c.tax; }).length;
        document.getElementById("stk").innerHTML = parts.map(function (q) { return '<i class="' + q[0] + '" style="width:' + (q[1] / tot * 100) + '%"></i>'; }).join("");
        var t = k === 0 ? "<p>" + sc.start + "</p>" : '<p class="kick" style="margin-bottom:4px">Crossing ' + k + " of " + sc.cross.length + "</p><p>" + sc.cross[k - 1].text + "</p>";
        document.getElementById("rtx").innerHTML = t + (k === sc.cross.length ? '<p class="small" style="margin-top:8px">' + sc.end + "</p>" : "");
        document.getElementById("rbtn").innerHTML = k < sc.cross.length ? '<button class="ghost" type="button" id="adv" style="width:100%">' + (k === 0 ? "Send it across: crossing 1" : "Next: crossing " + (k + 1)) + "</button>" : '<p class="fine">' + sc.note + "</p>";
        var adv = document.getElementById("adv"); if (adv) adv.onclick = function () { k++; ctx.st.routeK = k; draw(); };
        if (k === sc.cross.length) ctx.ready(); else ctx.lock("Follow all " + sc.cross.length + " crossings to keep going");
        WU.fit();
      }
      if (ctx.st.routeK) k = ctx.st.routeK;
      draw();
    }
  };
})();
