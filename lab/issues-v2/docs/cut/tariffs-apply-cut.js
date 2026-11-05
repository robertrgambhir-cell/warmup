      { type: "apply", key: "apply", src: [1], h: "Your turn: follow a tariff on something new",
        p: "Imagine a Grand Rapids furniture maker that buys lumber from Canada. The US puts a new tariff on Canadian lumber.",
        cases: [
          { q: "Who pays the tariff when the lumber crosses into the US?",
            opts: [
              { t: "The Canadian lumber mill", ok: false, why: "The tariff is collected from the company bringing the lumber into the US, not the seller." },
              { t: "The Grand Rapids furniture maker", ok: true, why: "It’s bringing the lumber in, so it pays US Customs at the border." },
              { t: "Canada’s government", ok: false, why: "Canada doesn’t pay a US tariff. The US company bringing the goods in does." }
            ] },
          { q: "A year later, the company cuts 20 jobs. What can you honestly say?",
            opts: [
              { t: "The tariff caused it", ok: false, why: "The timing alone doesn’t show that. Orders, other costs or the company’s own plans could matter too." },
              { t: "The tariff may be one reason, but the timing alone doesn’t prove it", ok: true, why: "That’s the honest version. You’d want to know what else changed, like orders or costs." },
              { t: "The tariff had nothing to do with it", ok: false, why: "You can’t rule it out either. Higher lumber costs could be part of it." }
            ] }
        ], btn: "Where the candidates for Senate stand" },
