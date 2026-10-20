# Conflict rulings, checklists, canonical numbers

Use this when two skills disagree, or when a skill's number has to be turned into code. Sources were checked against each skill's own files (October 2026): emil-design-eng, animate/RECIPES, review-animations/STANDARDS, apple-design, mobile-native, design-taste-frontend (motion.md, house rules, rules.mjs), and impeccable (animate.md, craft-floor.md, operate.md, adapt.md).

## 1. Ruling table

| Topic | Emil | Taste | Impeccable | Apple | **Ruling** |
|---|---|---|---|---|---|
| Repeated-UI duration | <300ms | press 140, hover 180, menu 240 | 100–150 / 150–300 | response 0.3–0.4s springs | **<300ms** for anything seen often |
| Overlay (modal/drawer) | 200–500 | 250–450 | 300–500 | sheet damping 0.8, response 0.3 | modal 250ms; drawer/sheet enter 450ms, exit 300ms on `--ease-drawer`. Under a gesture, a spring (damping 1.0, response 0.35; 0.8 only after a flick) that hands off the finger's velocity. Drawers enter from their trigger's side, mirrored in RTL |
| Page reveal / opening | marketing "can be longer" | 700–900 reveal, 1200 opening, load settled by 1.2s | 500–800 for ONE focal entrance | — | **Pages only, once per visit**: 500–900 reveal; 1100–1300 for one picture opening |
| ease-out | `0.23,1,0.32,1` | `0.22,1,0.36,1` | `0.16,1,0.3,1` | — | Project's curve if one exists; else **Emil's `0.23,1,0.32,1`**. Use expo `0.16,1,0.3,1` only for reveals ≥800ms. Never define near-duplicates. |
| ease-in-out | `0.77,0,0.175,1` | `0.76,0,0.24,1` | — | mirrored curve on reversal | Emil's |
| ease-in | never on UI | only `--ease-exit` for a short exit leaving for good | — | — | Never, except that one exit case |
| Bounce/elastic | 0.1–0.3 only for drag/momentum | banned on interface | not by reflex | damping 0.8 only after a flick | **No bounce** except a spring settling after a momentum gesture |
| Motion amount | gate rejects most; zero is success | page FAIL <8 moving elements, WARN <16 | one authored moment, no identical entrance everywhere | — | Pages: meet taste's floor with **varied, purposeful** moves (signature + entrances varied by content type + control feedback + one moving picture). App screens: Emil gate, no entrances |
| Stagger | 30–80ms, `translateY(8px)` | items 50–90, lines 80–110, rise 16–32px | cap total delay | — | UI lists **50ms / 8px**; page sections **70ms / 16–24px**; ≤4 steps; fire once |
| Properties | transform, opacity, clip-path; height for accordions | transform, opacity, clip-path | "reach past": blur, mask, backdrop | rAF + transform | transform/opacity/clip-path, plus `filter: blur` <20px. Shadows via `filter: drop-shadow`. Never layout properties, never `transition: all` |
| Blur | <20px; 2px crossfade mask | blur-in ≤8px, 600ms, gone once settled, never body text | bounded | materialize blur+scale | entrance ≤8px; crossfade 2px; ceiling <20px |
| Glass | — | banned (WARN >1 on pages, FAIL on app panels) | not as decoration | `blur(20px) saturate(180%)` materials | Pages: **no**. App/gesture chrome: only if the language is Apple-like (the brief or DESIGN.md names iOS/Apple, or the project already uses materials), with `prefers-reduced-transparency` → solid and `prefers-contrast` → near-solid + border. In doubt, stay solid |
| Exit vs enter | exit faster, same path | exit 60–70% of entrance | exit faster | same path, mirrored | exit ≈ **70%** of entrance on the **same path** |
| Press | `scale(0.97)` 160ms ease-out | `scale(.97)` 140ms | 100–150 | on pointer-down, 100ms | `:active{scale:.97}`, **140ms**, `--ease-out`; feedback on pointer-down |
| Hover | gate `(hover:hover) and (pointer:fine)`; reduce on dense lists | 180ms colour; moving hover 300–400 | all states needed | — | hover only inside the media query; colour/opacity 150–200ms `ease`; no card lifts on dense grids; `:active` covers touch. Tailwind v4 `hover:` already compiles to `(hover:hover)` only |
| Keyboard / 100+ per day | never animate | no animation | — | — | Never: command palette, shortcuts, tab switches, typing |
| Reduced motion | gentler, not zero | finished state = reduced state | keep opacity/colour, never a global 0.01ms kill | crossfade; also reduced-transparency and contrast | Keep opacity/colour, drop travel/scale/parallax/autoplay; content visible with no JS. Replace any global `*{animation-duration:.01ms!important}` with `tokens.css`, which covers every CSS transition; gate keyframe/JS motion (`motion-safe:`, `<MotionConfig reducedMotion="user">`, a `no-preference` query) or tag it `data-motion="travel"` |
| Display type | — | sheet sets size, up to 9rem; tracking −0.02 to −0.05em | max 6rem; tracking floor −0.04em | −0.02em large, ~0 body | Pages: sheet size; Operate/Read ≤6rem; tracking ≥ −0.04em; **no tracking on Arabic/connected scripts** |
| Body | 16px inputs | ≥16px, 17–19 scale, full ink, measure ≤75ch | 16px floor, 65–75ch | rem/em, respects text size | 16–19px, full ink for running text, 62–72ch |
| Banned visuals | semi-transparent shadow over solid border | eyebrows, mono, 01/02 numbering, hairlines, gradients, resting shadows, glass, pill nav, icon cards, emoji, cream+terracotta, violet, accent word in headline, >2 faces | eyebrow is a hard ban; the rest are defaults the brief can earn back | — | On taste-run pages, **taste's list applies**; the brief overrides via `--allow` with the reason reported. App screens use taste's app relaxations (1px borders, small labels allowed) |
| Fonts | — | lint WARN: Inter, Poppins, Montserrat, Roboto, Open Sans, Space Grotesk, Playfair, Plus Jakarta, Outfit, Sora, Lato, Nunito, Raleway | bans Fraunces, Playfair, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk/Mono, IBM Plex, Inter-as-display, DM Sans/Serif, Outfit, Plus Jakarta, Instrument Sans | system font | Use the dealt face; brand-pinned fonts win. The kill list in `slop.md` is the one ban list. Inter/Geist only as body/UI under a distinct display face. Arabic picks and licences: `libraries.md` |
| Touch target | 44pt/48dp (animate-expo) | ≥44px | 44×44 | ~10px hit padding | **≥44×44**; extend with padding or a pseudo-element, not visual size |
| Light/dark | — | chosen by subject; `color-scheme` | by physical scene | — | Pick by the use scene; set `color-scheme` and theme-color metas |
| Direction dealer | — | `draw.mjs` | concept-seed | — | **taste draw only** |
| Gradients / atmosphere | — | banned | — | — | Anthropic's 2025 aesthetics prompt says "layer CSS gradients" for atmosphere; on taste-run pages **the ban holds**. Atmosphere comes from flat colour fields, real pictures and type scale; the only gradient is a neutral 30–55% scrim under text on a photo |
| Liquid glass | — | glass banned | — | Liquid Glass materials, scroll-edge effects | `ecc:liquid-glass-design` and Liquid Glass styling **never on web Pages**; native iOS chrome, or app chrome under the Glass row, only |
| IBM Plex | — | — | bans IBM Plex | — | Latin IBM Plex Sans/Serif/Mono are banned defaults. **IBM Plex Sans Arabic is allowed** as an Arabic body/UI face (a commodity face, so a display face carries identity); Plex Sans may be its Latin companion inside Arabic-first surfaces only |
| Newsreader | — | `draw.mjs` can deal it | banned | — | **Banned** (a 2025 "impact" pick, now a default). If the dealt sheet names it, `draw.mjs --redraw type` |
| Radius | — | one radius decided once | — | — | Extend the project's radius scale; at most 3 radii on one screen |
| 3D flips, large on-screen moves | — | — | — | — | Infrequent, so 400–500ms on `--ease-in-out`; a crossfade under reduced motion; mirror rotations tied to reading direction in RTL |
| Scarce photography | — | ≥4 real pictures (6–12 usual) | — | — | Product shots large and once each, cut-outs or flat colour fields, type-led directions. Archival/heritage images only as context, never as the product, and only after asking the owner |
| Rubrics | review Block/Approve | critique.md (Awwwards-weighted, caps) | Nielsen /40, audit /20 | — | Report all three; they measure different things. Don't "fix" one by breaking another |

**Wiring:** with no easing tokens in the project, add `assets/tokens.css` to the global stylesheet. In Tailwind v4 use the tokens through arbitrary values (`ease-[var(--ease-out)]`, `duration-[var(--t-ui)]`) or `@theme` entries.

## 2. Emil checklist (sweep every touched file)

| Smell | Fix |
|---|---|
| `transition: all` / `transition-all` | list the exact properties |
| `scale(0)` / `scale-0` entrance | `scale(0.95)` + `opacity:0` |
| `ease-in` on UI, or built-in `ease-out` on a deliberate animation | `var(--ease-out)` |
| popover with `transform-origin:center` | `var(--transform-origin)` (Base UI) or the trigger side; modals stay centred |
| animation on a keyboard or 100+/day action | delete it |
| UI duration >300ms with no reason | 150–250ms |
| `:hover` motion without a hover media query | wrap in `(hover:hover) and (pointer:fine)` |
| keyframes on rapidly re-triggered things (toasts, toggles) | transitions, which retarget |
| Motion `x`/`y`/`scale` shorthands on a busy page | full `transform` string |
| same timing for enter and exit | exit ≈70%, faster |
| everything appears at once | 30–80ms stagger, ≤4 steps |
| no `:active` on pressables | `scale(.97)` at 140ms |
| `setState` per frame / animated inherited CSS var | write to `ref.current.style.transform` |
| missing `prefers-reduced-motion` | gentler fallback that keeps opacity |
| `behavior:'smooth'` scroll | `matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'` |

## 3. Mobile checklist (mobile-native + apple-design + impeccable adapt + taste phone rules)

Mark each item PASS or FAIL with `file:line`:
1. viewport: `width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content`. In Next.js use `export const viewport = { viewportFit:'cover', interactiveWidget:'resizes-content', themeColor:[…] }`. **Never** `user-scalable=no` or `maximum-scale=1`; Next.js 16's own `generateViewport` doc example shows `maximumScale: 1, userScalable: false`, so don't copy it.
2. Two `theme-color` metas (light and dark) matching the header background; `color-scheme`.
3. `env(safe-area-inset-*)` on fixed headers, bottom bars and floating buttons, through `max()` because insets don't replace margins (`padding-block-end: max(1rem, env(safe-area-inset-bottom))`; `.safe-*` classes in `tokens.css`).
4. `100dvh` for app shells and bottom-pinned UI; `100svh` for heroes; no raw `100vh` / `h-screen`.
5. Inputs, selects and textareas at ≥16px on touch (iOS zoom), plus `inputmode`, `type=tel/email`, `autocomplete`, `enterkeyhint`, and `autocapitalize="none"` where relevant.
6. `-webkit-tap-highlight-color: transparent`, and only once every tappable has `:active` feedback.
7. `touch-action: manipulation` on controls (removes the double-tap delay).
8. `user-select:none; -webkit-touch-callout:none` on controls only, never on body.
9. `overscroll-behavior: contain` on drawers, menus and inner scrollers; body scroll locked while an overlay is open.
10. Carousels: native `scroll-snap-type: x mandatory`, or a custom swipe with `touch-action: pan-y` plus `pointercancel` handling, a velocity rule (>0.11 px/ms) and pointer capture. In **RTL**, check the swipe direction and arrow mirroring.
11. Touch targets ≥44×44, including icon buttons, badges, steppers, dots, social icons and close buttons.
12. Hover only behind a hover media query; nothing important is hover-only (quick-view and add-to-cart must be reachable on touch).
13. Fixed elements (scroll-to-top, chat bubbles, sticky CTA) never cover content or each other, and hide while the keyboard is open.
14. Off-canvas menu: `inert` when closed, Esc to close, focus trapped and returned, scroll lock, and it opens from the trigger side (mirrored in RTL).
15. Sticky primary action on long product pages; an add-to-cart that is reachable without scrolling past the gallery.
16. Text ≥13px anywhere; body 16–18px; margins 16–20px; headlines ≤2 lines at 390px.
17. Manifest + `apple-touch-icon` if the site should feel installable.
18. Real-device-only items (always list them as unverified unless tested): swipe feel, keyboard overlap, notch, iOS input zoom, pull-to-refresh, 120Hz smoothness.

## 4. Taste vs shadcn/Tailwind defaults

Taste lint FAILs on `border-t/b/l/r`, `divide-*`, `h-px`, `shadow-*`, `bg-gradient-*`, `bg-clip-text`, `font-mono`, `tracking-wide*`+`uppercase`+`text-xs`, and Tailwind `purple/violet/indigo-*`. It WARNs on `border`+`rounded`, `backdrop-blur`, `h-screen`, `transition-all`, `scale-0` and `animate-bounce|ping|pulse`.

On Pages, restyle the primitives:
- separate surfaces by tone step instead of borders
- drop resting shadows
- pick ONE radius (square or fully round)

App screens may keep 1px borders at roughly 1.1–1.3:1 contrast against the ground. Use `--allow <rule>` only for brand-pinned exceptions, with the reason.
