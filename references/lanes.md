# Skill catalog: what each skill gives you and how to use it

MI = model-invocable (Skill tool). R = manual-only: Read `~/.claude/skills/<name>/SKILL.md` (and the files it names) and follow it inline.

## impeccable (MI) — UX process, scoring, refinement
- Invoke: `/impeccable <command> [target]`. With no argument it shows a context-aware menu (runs `signals`). Engine: `~/.claude/skills/impeccable/scripts/impeccable` (offline once cached at `~/.impeccable/bin/<ver>/`).
- Boot every session: `context` (reads PRODUCT.md, DESIGN.md and surface briefs; emits directives like `NO_PRODUCT_MD`, `MANUAL_DETECTOR_REQUIRED`).
- Commands, grouped:
  - **Build:** `init` (writes PRODUCT.md; it interviews, so when the user is absent label the inferred facts), `shape` (brief, no code), `document` (DESIGN.md in Stitch format + `.impeccable/design.json`), `extract` (patterns used 3+ times into components and tokens).
  - **Evaluate:** `critique` (Nielsen 10 × 0–4 = /40; bands 36+ Excellent, 28–35 Good, 20–27 Acceptable, 12–19 Poor; P0–P3; persona red flags; 2 isolated subagents; persists `.impeccable/critique/` with a trend) and `audit` (5 × 0–4 = /20: a11y, perf, theming, responsive, implementation integrity; bands 18+ / 14–17 / 10–13 / 6–9).
  - **Refine:** `polish` (closes the critique snapshot), `bolder`, `quieter`, `distill`, `harden` (extreme inputs, errors, i18n, double submit, interrupted gestures), `onboard`.
  - **Enhance:** `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive` (proposes 2–3 directions first).
  - **Fix:** `clarify` (UX copy), `adapt` (mobile/tablet/print rethink, 44px, safe areas), `optimize` (LCP <2.5s, INP <200ms, CLS <0.1).
  - **Iterate (web only, needs the dev server):** `live`, `generate <n> <action> <element>` (in-browser variants).
- Detector: `detect --json <files|url>`. Exits 2 on findings. URL mode renders with a browser and `--viewport 390x844` works. `--scope type|layout` feeds `typeset`/`layout`. `hooks on` re-runs it after every UI edit (check it doesn't double-fire with other hooks).
- Before any UI edit, read `reference/craft-floor.md` (Refuse list + Verify list).
- Most useful uses:
  - the critique snapshot becomes polish's backlog automatically
  - `detect` on the live URL at 390px
  - `harden` and `clarify` for e-commerce flows
  - the per-surface mode (Persuade/Operate/Read/Experience)
- Avoid: running its `concept-seed` world tournament on a surface taste already directed; a second detector pass.

## design-taste-frontend (MI) — art direction plus a hard measured gate
- Page run, 10 steps: inventory → argument → draw → idea + live thing → copy → build static → gate → look and critique (≤3 rounds) → motion layer → report. App run, 8 steps (`references/app-screens.md`): dataset with asserts → one question → `draw --app` style → shell → data → states → `--app` check → report.
- Scripts at `~/.claude/skills/design-taste-frontend/scripts/`: `draw.mjs` (20 directions, 58 heroes, 185 section blueprints, 44 type systems, 56 palettes, 18 signature motions; history keeps projects distinct), `lint.mjs`, `inspect.mjs` (CDP, no Playwright; 1440/768/390; exits 1 on FAIL; counts moving elements; reduced-motion pass), `scenes.mjs`, `assets.mjs` (Openverse, Wikimedia, AIC and Met images; Commons, Internet Archive and NASA video; credits).
- The `scenes` library isn't shipped; for scroll scenes build on `assets/scenes/stage.js`, or use v2-experimental's GSAP skeletons (R).
- Rubric: critique.md 14 passes, score = 0.4 design + 0.3 usability + 0.2 creativity + 0.1 content, with hard caps (any FAIL ≤6.0; <4 real pictures: design ≤6.5; one identical fade: design ≤7).
- Its own test record: it wins on rule compliance (0 FAIL against a baseline of 8–13), **not** clearly on juror score. Stripped pages read thin, so fill the space freed by bans with substance: bigger type, full content, real pictures, colour fields.
- Most useful uses:
  - `--keep palette,type` for existing brands
  - `assets.mjs` for real archival and cultural imagery tied to the client's inventory
  - inspector before/after as objective proof
  - redesign branch `--out .taste-skill/before|after`

## Emil Kowalski skills
| Skill | MI | Writes? | Use it for | Output |
|---|---|---|---|---|
| emil-design-eng | yes (invoke by name) | review | the rulebook: frequency gate, purpose, easing, durations, springs, origin-aware popovers, press scale, clip-path tricks, Sonner principles | `\| Before \| After \| Why \|` table |
| animate (+RECIPES.md) | yes | **code** | building any motion: button, dropdown, tooltip, modal, drawer, toast, accordion, stagger, hold-to-confirm, tabs, scroll reveal, drag-dismiss, crossfade | code + gate result + ingredients + feel-check |
| review-animations (+STANDARDS.md) | **R** | review | strict motion gate on a diff; 10 standards; escalation triggers | Before/After/Why table + tiered verdict + **Block/Approve** |
| improve-animations (+AUDIT.md, PLAN-TEMPLATE.md) | yes | `plans/` only | codebase motion audit → self-contained plans for cheap executors; `quick`/`deep`/`execute <plan>`/`reconcile` | findings table + `plans/NNN-slug.md` |
| find-animation-opportunities | yes | read-only | where motion should be added, and what must not move; caps at 5–7; 2–5 rejected candidates required | 3-part report |
| animation-performance | yes | diagnose | jank: property tiers, CSS vs WAAPI vs rAF, Motion shorthands, React re-render, inherited CSS vars, blur, `will-change`; 8ms budget at 120Hz | per-finding cause/before/after/verified |
| animation-vocabulary | yes | read-only | turning vague words into exact motion terms | `**Term** - description` |
| apple-design | yes | knowledge | springs (damping 1.0 default, 0.8 after a flick, response 0.3–0.4), velocity hand-off, momentum projection `(v/1000)*d/(1-d)`, rubber-band, pointer-down response, materials and their fallbacks, optical tracking, the 8 principles | — |
| mobile-native | yes | **CSS/meta** | the phone platform layer (see conflicts.md §3) | wrong / changed / needs-a-phone |
| break-ui (+CATALOG.md) | yes | fixture + dev toggle | worst-case data (long names, emoji, RTL, 0/1/1,000 items, huge numbers, missing images); report first, fix on `fix all` | Severity table + decisions + what held |
| pick-ui-library | **R** | lookup | one library per task: base-ui, cmdk, Sonner, input-otp, motion, NumberFlow, torph, dnd kit, Virtuoso, zustand, clsx, cva, next-themes, recharts, shiki | one pick + reason |
| prototype (+PICKER.md) | **R**, only when the user asks | isolated route | 3–5 divergent variants on a named axis behind a floating picker | variants table, no favourite |
| ask-sonner (+API.md) | yes | code | Sonner setup, styling ladder (headless `toast.custom` for design systems), troubleshooting | — |
| animate-expo | yes | RN code | React Native / Expo motion (Reanimated 4, Gesture Handler, haptics) | — |
| write-swift | yes | Swift | Swift 6 / SwiftUI code; no motion rules | — |

## design-taste siblings (all R, all optional)
- `design-taste-frontend-v2-experimental`: GSAP sticky-stack, horizontal-pan and scroll-reveal skeletons (they fill the empty scenes library), CWV targets.
- `stitch-design-taste`: a DESIGN.md aimed at Google Stitch.
- `high-end-visual-design` (soft, glassy, spring), `minimalist-ui` (warm monochrome, bento), `industrial-brutalist-ui` (Swiss/terminal): deliberate style alternatives that **v2 bans**. Use one only when the user asks for that look, and then don't run taste's lint on that surface.
- `v1`, `gpt-taste`, `redesign-existing-projects`: superseded. `image-to-code`, `imagegen-*`, `brandkit`: stubs pointing elsewhere.

## Adjacent skills worth chaining
- `clone-website`: when the project is a 1:1 clone, aesthetics are pinned; only the correctness, mobile, motion-correctness and robustness lanes apply.
- `ecc:e2e-testing` / `ecc:browser-qa`: click-through verification after a redesign.
- `ecc:frontend-a11y`: deeper WCAG work beyond impeccable `audit`.
