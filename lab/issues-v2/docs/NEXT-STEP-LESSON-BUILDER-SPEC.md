# Next-step lesson builder spec

How the lesson machine (`warmup-engine`) would produce v2 lessons. **Not implemented.** The machine, its prompts and its playbook copy are unchanged.

## What changes in the machine

| Step today (`recipe/RUN.md`) | v2 change |
|---|---|
| Gather sources, claim cards | Same, plus: for each issue, collect **numbers that define a model** (limits, rates, amounts, steps) and **the office's powers** with a source |
| Pick five issues | Same |
| Write a 7-card spec (`schema/spec.md`) | **Pick a format first** (Rule, Chain, Flow) with a one-line reason, then write a v2 lesson file (the `lessons/*.js` shape, as JSON) |
| Draw pictures in Python (`pics.py`) | Mostly gone: v2 diagrams are drawn from data by the engine; only new people need a look (skin, hair, shirt) |
| Fact check | Same, plus: **causal claims** get their own pass (is this shown, or only timing?), and every Chain lesson must include one "not shown" claim |
| Design check | Replaced by the v2 walk test (`tests/walk.cjs`) at five sizes plus a screenshot review |
| Taste judge | Same, with the v2 tests (below) |
| Voices | Same voices, for each voter line |

## The format choice (the builder's first decision)

Ask of the voter's question and the claim cards:

1. Is the voter asking **"would this help me / who gets it?"** and do the sources give a limit, a threshold or a list of who qualifies? → **Rule.**
2. Is the voter asking **"why is this happening / who pays?"** and do the sources describe a cause, a price change or a forecast? → **Chain.**
3. Is the voter asking **"where is the money going?"** and do the sources give a cost, a budget line or who funds what? → **Flow.**
4. If two fit, pick the one the voter's question names, and allow **one** borrowed piece from the other.
5. If none fits (biography, a record), **don't write an issue lesson;** put the record in another lesson's choice module.

Write the reason into the lesson file (`format_reason`), so the reviewer can check it.

## The lesson file (v2)

```
{ id, tag, title, format: "rule" | "chain" | "flow", format_reason,
  race: { office, state, year, status },
  objectives: [3 or 4 things the learner will be able to do],
  misconceptions: [2 or 3 predictable mistakes, each with where the lesson confronts it],
  sources: [{ t, u, kind: "primary" | "news" | "secondary" | "our math" }],
  learn: [ cover, ask, <format model scenes>, apply?, evidence?, compare ],
  door:  [ door(attempt 1), result, hear, catch, door(attempt 2, new situation), result, done ] }
```

Each scene type's fields are exactly the ones in `src/lessons/health.js` and `tariffs.js`. The **model data** per format:

- **Rule:** `ruler.worlds` (zones with `to`, color, name, edge label, readout), `ruler.people` (the story's people and their incomes), the switch's two worlds.
- **Chain:** `stops` (place, label, icon), `cross` (tariff status: yes, maybe, no; one sentence each), plus the outcome bars and the evidence-check claims.
- **Flow:** `sources`, `destinations`, `amounts` (to be specified when the Flow model is built).

## The rubric (what the builder writes for each door)

For each point: `id`, `label`, `ai` (one sentence the AI coach grades against), `all` (phrase patterns for the quick check), `tip` (what to say next time). Plus `flags` for the lesson's misconceptions, and `facts` (the approved facts the AI coach may rely on). Rules:

- Door 1 grades the model, both positions fairly, and one listening point.
- Door 2 grades **application** to the new situation and a hedge (don't overpromise), and never requires a fact the sources don't support (Rosa and Jackson's plan is the example: unknown, so not graded).
- Every pattern is tested against the lesson's own example answer (must pass) and three bad answers (must fail), as `tests/coach.test.cjs` does.

## Checks a v2 run must pass before a person sees it

1. **Walk test** at 375x667, 390x844, 430x932, 1366x700 and 1440x820: no page errors, no overflow, no screen that falls back to scrolling except Done, no locked button after its task.
2. **Coach test:** example answers pass, bad answers fail, every credited quote is in the answer.
3. **Fact pass:** every number has a source, every causal sentence is labeled shown or not shown, every office claim has a source.
4. **Fairness pass:** the choice has the same rows for both candidates; no row is one-sided; the planted mistake misstates a position, not a fact.
5. **Time:** the estimate (`tests/timing.py`) under the day-1 target; if over, cut words before cutting interactions.
6. **A separate reviewer** runs the screen tests from `NEW-ISSUE-LESSON-UX-SYSTEM.md`.

## What the builder must not do

- Invent a model the sources don't support (a route with steps nobody reported, a limit nobody published).
- Draw a causal arrow as certain when the source shows timing.
- Name a power the office doesn't have.
- Credit a phrase instead of an idea (patterns must be checked against bad answers).

## Order of work, when Robert approves

1. Robert reviews the two prototypes and this system. His notes become rules in the playbook (the usual sweep).
2. Build the Flow model with the vouchers lesson by hand (the third gold standard).
3. Teach the machine the format choice and the v2 lesson file; rerun the five Maya issues in v2 and compare with the hand-built three.
4. Then the AI coach on a server (v156's worker), so feedback is AI on the hosted app too.
