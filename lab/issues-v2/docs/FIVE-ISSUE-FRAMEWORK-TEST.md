# Five-issue framework test

Can three formats (Rule, Chain, Flow) plus three shared modules (the choice, evidence check, say it) teach all five current issues well? Checked against each lesson's approved facts (`brain/examples/maya-2026/words/*.md`). Only health insurance and tariffs are rebuilt; the other three are mapped, not built.

| Issue | Race (real) | Format | Borrowed piece | Voter's question that picks it | Fit |
|---|---|---|---|---|---|
| Health insurance | Georgia governor | **Rule** | — | "Can I get Medicaid?" | Strong (built) |
| Tariffs and auto jobs | Michigan U.S. Senate | **Chain** | Evidence check | "Who pays? Why is our plant hurting?" | Strong (built) |
| School vouchers | Texas U.S. Senate | **Flow** | A small Rule (who got vouchers: 7 in 10 weren't in public school) | "Is my kid's school losing money?" | Good, once the Flow model is built |
| Your electric bill | Ohio U.S. Senate | **Chain** | A small Flow (who pays the grid's capacity costs) | "Why is my power bill so high?" | Good |
| Heating oil | Maine U.S. Senate | **Chain** | A small Rule (who gets heating aid, and how much of a tank it covers) | "Can I afford to heat my house?" | Good, with care on causation |

## School vouchers · Flow

- **Model.** One Texas budget, two arrows: public schools and private-school vouchers ($1 billion this year). The learner moves $1 billion to vouchers and sees it can't also go to public schools; then taps the ten voucher kids and finds 7 weren't in public school.
- **Use it.** A new family: a kid already in private school applies for a voucher. Where does the money come from, and does any public school lose a student?
- **The choice.** The candidate (fight vouchers going nationwide, keep the US Department of Education) and the opponent (backs vouchers, wants the Department gone), plus **what a senator can and can't do**: a senator can't cancel the Texas law; can vote on federal money and the new federal scholarship tax credit.
- **Watch.** Budgets are fungible. "Money spent on vouchers can't go to public schools" is the approved wording; "vouchers took $1 billion from schools" is not, unless a source says so.

## Electric bills · Chain (with a small Flow)

- **Model.** Data centers need power → the grid pays to keep enough power plants ready → those capacity costs go into everyone's bill → bills rise. The learner adds data centers to a grid and watches the capacity charge and Barb's bill move.
- **Evidence check.** "Data centers were 45% of three years of capacity costs" (shown, PJM's market monitor) vs "data centers are the main reason your bill went up" (not shown: 45% of one cost component isn't a share of the whole bill). The Nov 1 fact-checker already caught this exact overstatement once.
- **The choice.** Require data centers to pay their full power costs vs a bill that asks each state to consider it, plus the vote count (57 to 43, 60 needed).
- **Watch.** Rates are set by state regulators; say what a senator can and can't change.

## Heating oil · Chain (with a small Rule)

- **Model.** World oil prices (moved by the war with Iran) → Maine's price per gallon → the cost of one 275-gallon tank. The learner moves the price per gallon and watches Dale's fill cost. A small Rule: who gets heating aid and how much of a tank $700 covers.
- **Evidence check.** "Prices jumped about 30% in the first three weeks of the war" (shown, timing in the state survey) vs "the war is the only reason prices are high" (not shown).
- **The choice.** End the war and more heating aid vs early aid and a small reserve release, with how big the release was (two or three days of Northeast supply).
- **Watch.** Causation again; foreign-policy claims need sources; "end the war" is the candidate's goal, not a senator's power.

## Gaps the test found, and what changed

1. **Flow has no built model yet.** Vouchers needs it. It's the next component to build, not a reason for a fourth format.
2. **Two issues need a second, smaller model.** Electric bills (a Flow inside a Chain) and heating oil (a Rule inside a Chain). The system now allows one borrowed piece per lesson, never more. [Changed the design system to say so]
3. **Office powers vary by issue and office.** Every lesson now carries an office note on the choice screen; the builder must find a source for it or leave it out.
4. **Records and biography don't fit any format.** "What has the candidate done?" lessons (a vote record, a scandal) aren't in the five, but campaigns will ask. The proposal: don't make biography lessons; put a sourced record row in the choice module. If campaigns insist, test a small Record variant of the choice module before adding a format.
5. **Ballot measures** (Yes vs No, no candidates) fit the same formats; the choice module compares Yes and No instead of two candidates.

## Beyond campaigns

The same three models carry to other frontline jobs Warmup has named (home care, behavioral health, clinical intake): Rule for eligibility and coverage questions, Chain for "why is this happening" explanations (a medication interaction, a billing rule), Flow for costs. The choice module becomes "the options," and the door becomes a client, patient or customer. [Judgment; untested]
