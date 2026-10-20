# Request router

Find the row closest to the request; combine rows when it spans several. **Tier** sets effort (SKILL.md §0). Skills marked [R] are manual-only: read their SKILL.md.

## Step 0: classify the target (before any row)
Name the target: marketing site, e-commerce, web app/dashboard, PWA, native iOS/Android, or one adaptive design across devices. `devices.md` §1 gives its navigation, overlay and density rules; §5 sets the **verify widths** for every gate below. Also load `rtl.md` when the locale is RTL or the product is apparel/print-on-demand, and `libraries.md` when choosing or restyling icons, components, fonts or motion libraries.

## Review and diagnosis (read-only)
| Request sounds like | Tier | Route |
|---|---|---|
| "review / audit / what do you think of my site / roast it" | L | Pipeline A: parallel lanes → merged report → zero-slop sweep steps 1–4 as evidence |
| "does this look AI-made / generic / templated?" | M | slop.md sweep (measure + grep + look + fresh eyes) + taste critique.md score; return the kill-list hits with fixes |
| "review this PR / diff for design" | M | `emil-design-eng` Before/After/Why table + `review-animations` [R] on motion lines + taste `lint.mjs` on changed files + impeccable `detect` on changed files + break-ui only if data-bound components changed |
| "is it accessible?" | M | impeccable `audit` (a11y dimension) + mobile checklist items 5, 11, 14 + contrast via `inspect.mjs` |
| "why is it janky / laggy / dropping frames" | M | `animation-performance` (name the cause first) → fix → re-measure |
| "what's this effect called" | S | `animation-vocabulary` |
| "how does it feel on phone / mobile review" | M | Pipeline E, review half only |
| "stress test / edge cases / what breaks" | M | `break-ui` (report → fix on request) + impeccable `harden` checklist |

## Fixing and polishing (existing world, keep the look)
| Request | Tier | Route |
|---|---|---|
| one concrete tweak ("logo too big on mobile", "button colour off", "spacing here") | S | Fix directly using conflicts.md values + the owning lane's rule; screenshot at 390 + 1440; slop grep on the touched file + probe at both widths. No subagents, no draw |
| "fix the design issues / clean this up" | M–L | Pipeline A (or reuse an existing review) → Implement in severity order → Gates + slop sweep |
| "polish / make it feel premium / finishing touches" | M | Pipeline D + slop sweep; `emil-design-eng` checklist; impeccable `polish` |
| "make it feel native on phone / mobile is bad" | M–L | Pipeline E + Implement + Gates |
| "too loud / too busy" | M | impeccable `quieter` or `distill` inside the existing tokens, then taste lint (never pull grey body text or banned devices back in) |
| "too bland / boring / flat" | M | impeccable `bolder` scoped to the target; on Pages also taste: bigger display step, one colour field, a real picture, a signature move |
| typography only | M | impeccable `typeset` (+`detect --scope type`) within taste type rules; ≤5 sizes; no tracking on Arabic |
| colour only / dark mode | M | impeccable `colorize` (OKLCH, roles, dark composed not inverted) within taste's palette bans; set `color-scheme` + theme-color metas |
| spacing / layout / alignment | M | impeccable `layout` (+`detect --scope layout`) + taste frame rules (equal margins, 2–3 anchor lines, section gaps 120–240 desktop / 72–112 phone) |
| copy / microcopy / error messages | S–M | impeccable `clarify` + slop.md copy table; keep the product's language (Arabic copy gets the same scrutiny) |
| empty / loading / error states, onboarding | M | impeccable `harden`/`onboard` + slop.md states table + taste app-screens §states |
| forms / checkout | M | impeccable `clarify` + `harden` + mobile checklist item 5 (input types, autocomplete) + break-ui on the summary |
| performance / Core Web Vitals | M | impeccable `optimize` + `animation-performance`; budgets and throttling in `devices.md` §8 |

## Motion
| Request | Tier | Route |
|---|---|---|
| "animate X / add a transition" | S–M | Pipeline F (`animate` 7 steps); gesture-driven → apple-design |
| "make it feel alive / where should things move" | M | `find-animation-opportunities` (5–7 picks, rejected list) → `animate` for the chosen 1–3 |
| "improve all the animations / motion audit" | L | `improve-animations` → plans/ → execute (cheap model) → `review-animations` [R] |
| drawer / sheet / carousel / drag / swipe | M | apple-design (springs, velocity, rubber-band) + `animate` RECIPES + mobile checklist 9, 10 |
| toasts | S–M | `pick-ui-library` [R] → Sonner → `ask-sonner`; headless `toast.custom` for a design system |

## Building and redesigning
| Request | Tier | Route |
|---|---|---|
| new landing / marketing / portfolio page | L | Pipeline B, Page run |
| new dashboard / admin / settings / app screen | L | Pipeline B, App run (`draw --app`, dataset with asserts) |
| custom apparel / print-on-demand / merch store | L | Pipeline B per region (below) + `rtl.md` §7 |
| "works on every device" / one adaptive design / tablet or foldable layout | L | `devices.md` §1–2 component swaps per class + full matrix (§5) + Pipeline E |
| new component inside an existing site | M | Pipeline F conventions + match the surrounding tokens (no draw) + `pick-ui-library` [R] + break-ui + slop sweep on the component |
| "redesign / restyle / make it look designed, not AI" | L | Pipeline C (review baseline → taste draw → rebuild → before/after proof) |
| "show me a few options / variants" | M | `prototype` [R] (3 variants on a named axis), or impeccable `generate` live in the browser |
| design system / DESIGN.md / tokens | M | impeccable `document` (scan) or `extract`; Stitch target → `stitch-design-taste` [R] |
| clone a site 1:1 | L | `clone-website`; aesthetics pinned; afterwards only the correctness/mobile/motion/robustness lanes |
| user asks for a specific style (glassy Apple, brutalist, warm minimal) | M–L | the matching taste sibling [R] (`high-end-visual-design`, `industrial-brutalist-ui`, `minimalist-ui`); don't run taste v2 lint against that surface; Emil, mobile and impeccable lanes still apply |
| native iOS / Android | L | impeccable (`ios.md`/`android.md`, `audit.native`), `animate-expo`, `write-swift`; web-only tools (taste inspector, `detect`, `live`, probe) don't apply; `ecc:liquid-glass-design` only here |

## Custom apparel: sector mapping
`draw.mjs` has no apparel sector. Deal per region:
- brand/story Page (hero, lookbook, about): `--sector fashion` (8 directions, editorial bias); if it repeats an earlier project, `--sector physical-product` (13);
- catalog and PDP Page regions: `--sector ecommerce` (6 directions, a small pool that repeats across projects, so check the draw history);
- designer/customizer: App screen, `draw --app --kind builder`; cart/checkout: `--app --kind commerce`.

Always pass `--have product-photo,photography`. Overrides: the picture floor is met by real garment photos (on-body, flat, print close-ups), never by `assets.mjs` archival images as the product; a dealt hero that needs pictures the client lacks gets `--redraw hero`; WhatsApp is the checkout (`rtl.md` §7).

## Picking a direction (`draw.mjs --options 3`)
Score each option 0–2 on: (1) carries something only this client has (an inventory item); (2) fits audience and locale (RTL mirroring, an Arabic face in the sheet); (3) survives a 390px phone; (4) asset feasibility (real photos exist for what it demands); (5) distance from the kill list (no cream + terracotta, near-black + acid, banned face). Highest total wins; on a tie take the less familiar. Write one line: the score and why. **The user picks** when stakes are high (a live brand, a launch, or the top two within 1 point): show both with one line each.

## References first (L builds and redesigns, before `draw`)
Fetch 3–6 real references (`refs.md`): Hoverstat.es and Godly/Recent for one signature idea, Typewolf for named type, Mobbin/Refero if a paid MCP is connected, plus the client's own assets and the strongest real sites in the category. Distil them into tokens written to DESIGN.md before code: type pair, palette in OKLCH, radius, spacing, the one layout primitive, the signature move. They feed the inventory, the `--brief` line, the rubric and any `--redraw`; they never become a second direction dealer. Never pixel-clone or copy a layout.

## When in doubt
Default to the smallest tier that fully solves the request. Still run the slop grep and probe on whatever you touched; that part is never skipped.
