# Zero-slop protocol

"Slop" is anything that makes a reader think "a model made this": the category default, the template, the decoration standing in for a decision. This file merges every skill's kill list into one:
- design-taste-frontend `tells.md`, the house rules and `lint.mjs`/`rules.mjs`
- impeccable `craft-floor.md` (Refuse list) and its detector rules
- Emil's Never-Ship table and review escalation triggers
- taste `copy.md`

Each source traces its rules to evidence: taste's study of 247 curated award sites; impeccable's heuristics plus detector; Emil's production experience. None of them alone guarantees zero slop. The **sweep** at the bottom does, because it combines their measuring instruments with a fresh-eyes look.

**Version 2026-10-20. The list evolves; the process is the guarantee.** Every ban sends the model to the next most likely default: Space Grotesk was a recommended "impact" font in 2025 and is a tell in 2026; cream + terracotta escaped purple and became the "Claude look". So avoiding bans is not enough. Before code, decide every axis for this brief in writing (palette as named hex/OKLCH values, type families and scale, the one layout primitive, the motion moment, the imagery source, the copy voice) and ask of each: would a similar brief land on the same value? If yes, it is the next default; choose again. Add a dated row here when a new default shows up.

**Removal is half the job.** Taste's own testing found that pages with every tell stripped and nothing put back read thin, and lost to busier pages. "An empty page with good manners is a tell too." Every removed ornament is replaced by **substance**: bigger type, the full real content, a picture made for this subject, a field of flat colour, the one live thing.

## Kill list

Each row: what it is → what replaces it. Mark (P) for Pages only where app screens are allowed it (taste's app relaxations).

### Layout and structure
| Slop | Replace with |
|---|---|
| Centred hero: headline + sub + two buttons + screenshot | the dealt hero blueprint; one primary action; one dominant thing |
| Row of 3 identical icon-topped feature cards / any row of identical boxed cards (P) | dealt section blueprint (split, list, statement, index); use the number of items the content actually has |
| Bento grid of rounded tiles | a dealt composition; filled tiles only in `dense-tiles` |
| Hero-metric template (big number, small label, 3 stats) | one figure that owns the screen, and only if it's real |
| Stock section order (hero → logos → features → testimonial → pricing → CTA) | taste's argument: one claim per section, sections with no claim deleted |
| Every section the same layout; everything centred (>72%) | neighbours never share a layout; left-aligned default; centre one moment |
| Nested cards; cards as the default container | space and tone steps; never a card in a card |
| Same 12–16px radius on everything | one radius decided once (square or fully round) |
| Floating pill nav with blur | plain bar: wordmark, 3–5 links, one action |
| Modal as first thought | inline, a sheet, or a page; a modal only for protected focus |
| Empty half-screens / huddled sections (P) | equal margins; fill the void with a picture, second column, list or figure |

### Type
| Slop | Replace with |
|---|---|
| Eyebrow / kicker / pill badge / "New ·" chip above the heading | nothing; the heading names the section (**hard ban everywhere**) |
| Tiny uppercase letter-spaced labels; ALL-CAPS (often mono) eyebrows; template chrome: `A · B · C` meta strings, `WORD — fragment` labels, `→` stapled to every link | sentence case at a real size (≥13px); plain labels |
| Monospace as "technical" costume (P) | the dealt face; mono only for real code or IDs |
| Decorative index markers 01/02/03, "Step 2" (P) | a real `<ol>` only when order matters |
| One italic/serif/coloured/gradient/highlighted accent word in the headline | one voice per headline (Arabic has no italic at all) |
| Default faces: Roboto, Poppins, Montserrat, Open Sans, Playfair, Plus Jakarta, Outfit, Lato, Nunito, Raleway, Cormorant, Lora, DM Sans/Serif, IBM Plex Sans/Serif/Mono (Latin; not Plex Sans Arabic). Second-order "tasteful" set: Space Grotesk, Fraunces, Instrument Serif/Sans, Syne, Sora, Cal Sans, Newsreader. Inter or Geist alone or as display (`next/font` Geist left untouched) | the dealt type system or the brand-pinned face (picks: `libraries.md`). Inter/Geist only as body/UI under a distinct display face. Rulings: `conflicts.md` |
| Cairo / Tajawal (an AI-builder default) / Almarai (verify) as the only Arabic face | an Arabic display face that carries the identity; commodity faces for body only (`libraries.md`) |
| 9+ near-equal sizes, timid 28px headline | 2–3 sizes doing the work, ≤5 total; display ≥4× body on pages |
| Headlines of 3+ lines | ≤2 lines at every width; cut words before shrinking |
| Grey body text | full ink for running text; muted only for secondary |
| Light weights to look "premium" | the dealt weights; one step heavier on dark |
| Letter-spacing, italic or uppercase on Arabic or other connected scripts | 0 tracking; emphasis by weight, size or colour (`rtl.md`) |

### Colour and surface
| Slop | Replace with |
|---|---|
| Violet/indigo accent; purple–blue gradients (probe `purple-accent`) | a palette from the subject's material world |
| Cream ground ~#F4F1EA + terracotta ~#D97757 (Anthropic's own accent, so it reads as the "Claude look"), often with a serif display | low-chroma stone/bone with deep ink, or a full flat warm field, derived from the subject |
| Near-black (#0B0B0B/#111) + one acid-green, vermilion or neon accent (+ glow); emerald/teal as the lone accent nobody asked for | dark-room direction: lit exhibits, no glow; an accent the subject owns |
| Dark by default with grey body text, nobody asked for it (probe `dark-by-default`) | light unless the brief or the use scene chose dark; full-ink body |
| Gradients anywhere (backgrounds, buttons, text) | flat fields; a neutral 30–55% scrim under text on a photo is the only exception |
| Gradient text | solid ink |
| Glass/backdrop-blur panels (P) | solid surface one tone step from the ground |
| Resting drop shadows on cards; glows; hard offset shadows outside a real neo-brutalist world | tone steps; a shadow only on what floats (menu, dialog, sticky bar) |
| Hairlines everywhere, 1px outlined boxes, dashed guides, crosshairs (P) | space, scale change, tone step, a filled ≥4px bar |
| Coloured `border-left` stripe on cards/alerts | an icon + text state, or a tinted fill |
| Grey text on a coloured field | the field's own ink |
| Accent colour on headings, icons, bullets and borders | accent <5% of the screen: the action plus one recurring thing |

### Imagery and content
| Slop | Replace with |
|---|---|
| Fake grey-bar dashboards, abstract blobs, decorative shapes | a real working UI fragment (`data-ui`), or a real picture of the subject's world |
| Lorem ipsum, "Acme", "John Doe", "User 1" | real content; plausible sample details listed in the report |
| Invented testimonials, logos, user counts, ratings, press | nothing, or clearly fictional samples flagged in the report (**never** presented as real) |
| <4 real pictures on a page; one photo reused 5 times | 6–12 real pictures: own photos, then `assets.mjs` archival finds from the inventory, then drawn-for-subject |
| Rounded-corner photos in mixed ratios | square corners (or one 4px radius), two crop ratios |
| Text over a busy photo | a calm region, a flat scrim, or text moved off the picture |
| Laptop/phone mockup frames around screenshots | the screenshot large and uncropped, or a live fragment |

### Icons and libraries
| Slop | Replace with |
|---|---|
| Lucide at shadcn defaults (24px, 2px stroke, everywhere); `Sparkles` beside "AI", `Zap`, `Rocket`, `Shield`, `ArrowRight` on every CTA | a set picked for the direction (`libraries.md`); Lucide only restyled; the glyph that names the action, or none |
| Icon in a tinted rounded square above every feature | icon inline at cap height, a larger single-colour glyph with no container, or no icon |
| Emoji or ✦/✨ as icons or nav markers | one real icon set, one stroke weight matched to the type |
| Stock shadcn theme: zinc/slate base, stock `--primary`, one `--radius` (0.5/0.625rem), unstyled Card/Button/Badge | the restyle checklist in `libraries.md` |
| Aceternity / Magic UI stock effects: Spotlight, BackgroundBeams, AnimatedBeam, ShimmerButton, BorderBeam, Meteors, Marquee, NumberTicker, Sparkles, Lamp, AuroraBackground, 3D card | at most one dominant effect per page, built for the subject |
| Placeholder identities: pravatar/DiceBear/boring-avatars faces, fake macOS window dots | real people and real screens, or nothing |

### Copy
| Slop | Replace with |
|---|---|
| unlock, unleash, supercharge, seamless, elevate, empower, revolutionize, game-changer, cutting-edge, next-gen, world-class, best-in-class, all-in-one, effortless, blazing fast, reimagine, delve, tapestry, leverage, synergy, streamline, robust, holistic | a specific noun and a real number ("ships in a week", "38 seats") |
| Mad-libs ("The AI-powered platform for modern teams"), tricolons ("Fast. Simple. Secure."), "Not just X, it's Y", "More than a…", "X, reimagined", "Welcome to…", "Meet…" | what it is, the claim, the instruction, the name, or the place |
| "Get started", "Learn more", "Click here", "Submit", "Explore now" | the action named: "Book a table", "Choose your size", "Send order on WhatsApp" |
| Furniture text: "Est. 2024", coordinates, local-time strips, "Scroll to explore", "Available for work" dot | delete |
| Editorial-pretend labels: "Field notes", "Our philosophy", "Quietly trusted by" | delete, or a real section heading |
| Em-dash habit (more than 1–2 per page); three parallel items everywhere | plain sentences; the count the content really has |
| Captions that narrate the design | delete |
| Copy that any competitor could print unchanged | the competitor test: rewrite until it's false for them |
| Arabic filler and translated-sounding copy: جودة عالية، أفضل، ارتقِ بـ…، المستوى التالي، أطلق العنان، تجربة فريدة/لا مثيل لها، بكل سهولة، بسلاسة، عالمي المستوى، حلول متكاملة، اكتشف المزيد، ابدأ الآن، اضغط هنا، إرسال | the same bar as English: a fact, a number, the named action ("اطلب عبر واتساب"); Arabic written first and reviewed by a native speaker. Seed list mapped from the English bans; extend it per project |

### Motion
| Slop | Replace with |
|---|---|
| The same fade-and-rise on every section | entrance manner varied per content type; one signature move |
| Motion on everything / page-load choreography in product UI | Emil's frequency gate: app screens get feedback only |
| No motion at all on a page (P) | taste's floor: ≥8 purposeful moving elements |
| `transition: all`, `scale(0)`, `ease-in` on UI, built-in weak `ease-out`, bounce/elastic | exact properties; `scale(.95)` + opacity; `--ease-out`; springs only after a momentum gesture |
| Preloaders, count-up numbers, custom cursors, scroll hijack (Lenis on a store or form), typewriter or scramble text, infinite logo marquee, shimmer/border-beam buttons, SplitText letter-stagger on every headline | the first frame painted; native scroll; one authored moment |
| Hover lifts and zooms on every card; hover-only actions | colour/contrast hover behind a hover media query; actions reachable on touch |
| Animated keyboard actions, command palettes, tab switches | no animation |

### States and code
| Slop | Replace with |
|---|---|
| Only the happy path | default, hover, focus, active, disabled, loading, empty, error, success |
| A centred spinner | final layout with value-sized flat grey blocks, no shimmer, no layout shift |
| A full-screen error banner | the error inside the failed block: one sentence, last-good time, Retry |
| Empty states that say "No data" | what will be here, why, how to start |
| Default browser surfaces (selection, focus ring, caret, scrollbar) | themed `::selection` and `:focus-visible` in the accent; tabular numerals |
| Raw `100vh`, `h-screen` | `100svh` hero / `100dvh` shell |

## Sweep (run on every surface you changed, and on everything in a review)

Run it at the end of every code-changing pipeline, and as part of every review.
1. **Measure.**
   - `node $TASTE/lint.mjs <changed files> [--app]` must have 0 FAIL.
   - `$IMP detect --json <changed files>` and `$IMP detect --json --viewport 390x844 <url>`.
   - `node $TASTE/inspect.mjs <url>` (pages) with `--widths` set to the verify widths (`devices.md` §5) must have 0 FAIL.
   - `assets/probe.js` at the verify widths (`devices.md` §5): 0 `fail` lines. `few-images` applies to store/marketing Pages; `dark-by-default` unless the brief chose dark.
   - Read every WARN as wrong unless you can defend it to a designer in one sentence.
2. **Grep what the linters under-count** (TSX is regex-only for impeccable):
   ```bash
   # portable (rg not always installed); add --include globs for your stack (vue, svelte, astro, html, mdx)
   INC="--include=*.ts --include=*.tsx --include=*.js --include=*.jsx --include=*.css --include=*.html --include=*.json"
   LOC=$(ls -d messages locales public/locales i18n dictionaries src/dictionaries 2>/dev/null)   # locale dictionaries
   # copy, English then Arabic, in source and locale .json
   grep -rniE $INC "unlock|unleash|supercharge|seamless|elevate|empower|revolutioni|game.?changer|cutting.?edge|next.?gen|world.?class|effortless|reimagin|delve|tapestry|synergy|streamline|holistic|lorem|acme|john doe|get started|learn more|click here" src/ $LOC
   grep -rnE $INC "جودة عالية|أفضل|ارتق|المستوى التالي|أطلق العنان|تجربة (فريدة|استثنائية)|لا مثيل|بكل سهولة|بسلاسة|عالمي(ة)? المستوى|حلول متكاملة|اكتشف المزيد|ابدأ الآن|اضغط هنا|إرسال" src/ $LOC
   # code smells
   grep -rnE $INC "transition-all|transition: all|scale-0|scale\(0\)|ease-in[^-]|h-screen|100vh|bg-gradient|bg-clip-text|backdrop-blur|shadow-(md|lg|xl|2xl)|animate-(bounce|ping|pulse)|font-mono|tracking-(wide|wider|widest)|user-scalable=no|maximum-scale=1|userScalable: *false|maximumScale: *1|lucide-react|components/(magicui|aceternity)" src/
   # banned and commodity fonts (IBM Plex Sans Arabic and Geist Mono for code pass)
   grep -rnE $INC "Space.?Grotesk|Fraunces|Instrument.?(Serif|Sans)|Poppins|Montserrat|Roboto|Open.?Sans|Playfair|Plus.?Jakarta|\bOutfit\b|\bSora\b|\bLato\b|Nunito|Raleway|\bSyne\b|Cormorant|\bLora\b|Newsreader|DM.?(Sans|Serif)|Cal.?Sans|IBM.?Plex.?(Serif|Mono|Sans[^_ A])|\bInter\b|Geist|Tajawal|\bCairo\b|Almarai" src/
   # physical direction: logical utilities are required (ms/me/ps/pe/start/end/text-start/rounded-s/e/border-s/e)
   grep -rnE $INC "(^|[\"' :])-?(ml|mr|pl|pr|left|right)-[0-9a-z[]|text-(left|right)\b|rounded-[lr]\b|rounded-[lr]-|border-[lr]\b|border-[lr]-|(margin|padding|border)-(left|right)|text-align: *(left|right)" src/
   ```
   The English copy and code-smell greps caught `transition-all`, `bg-gradient-to-t`, `shadow-lg` and `100vh` on a real Next/Tailwind repo; the other lines are new, so expect false positives (`elevate` in "elevated surface", `أفضل` in a factual comparison, a restyled `lucide-react` import, a brand-pinned face). Each hit is a slop candidate: fix it, or justify it (a photo scrim gradient, a floating-element shadow, a direction utility inside `rtl:`/`ltr:`). Arabic/RTL failure modes beyond these greps: `rtl.md` §8.
3. **Look.** Open every screenshot (desktop and 390px, several scroll depths). Run the five-second test: can a stranger say what this is and what to do? Then the logo-cover test: hide the brand; could this be any company in the category? If yes, creativity fails.
4. **Fresh eyes.** Spawn one subagent with **no conversation history**. Give it the screenshots and this file's kill list, and ask: "List every element that suggests a model or a template made this, with the screenshot and position. Say NONE only if you would bet on it." Fix what it finds, then run steps 1–3 once more.
5. **Substance check.** For every removal, name what replaced it. A screen that got emptier without getting more specific has failed.
6. **Record** in the report: lint/inspect/detect counts before → after, any `--allow` used and why, and the fresh-eyes verdict.

Zero slop is reached when all three meters and the probe show 0 FAIL, the grep is clean or each hit is justified, the fresh-eyes agent returns NONE, and the logo-cover test passes.
