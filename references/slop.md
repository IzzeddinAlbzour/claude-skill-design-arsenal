# Zero-slop protocol

"Slop" is anything that makes a reader think "a model made this": the category default, the template, the decoration standing in for a decision. This file merges every skill's kill list into one:
- design-taste-frontend `tells.md`, the house rules and `lint.mjs`/`rules.mjs`
- impeccable `craft-floor.md` (Refuse list) and its detector rules
- Emil's Never-Ship table and review escalation triggers
- taste `copy.md`

Each source traces its rules to evidence: taste's study of 247 curated award sites; impeccable's heuristics plus detector; Emil's production experience. None of them alone guarantees zero slop. The **sweep** at the bottom does, because it combines their measuring instruments with a fresh-eyes look.

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
| Tiny uppercase letter-spaced labels | sentence case at a real size (≥13px) |
| Monospace as "technical" costume (P) | the dealt face; mono only for real code or IDs |
| Index numbering 01/02/03, "Step 2" (P) | a real `<ol>` only when order matters |
| One italic/serif/coloured accent word in the headline | one voice per headline |
| Default faces (Inter, Roboto, Poppins, Montserrat, Open Sans, Space Grotesk, Playfair, Plus Jakarta, Outfit, Sora, Lato, Nunito, Raleway, Fraunces, Geist, Instrument Sans/Serif, DM Sans/Serif, Syne, Cormorant, Lora, Newsreader, IBM Plex) | the dealt type system, or the brand-pinned face |
| 9+ near-equal sizes, timid 28px headline | 2–3 sizes doing the work, ≤5 total; display ≥4× body on pages |
| Headlines of 3+ lines | ≤2 lines at every width; cut words before shrinking |
| Grey body text | full ink for running text; muted only for secondary |
| Light weights to look "premium" | the dealt weights; one step heavier on dark |
| Letter-spacing on Arabic or other connected scripts | 0 tracking |

### Colour and surface
| Slop | Replace with |
|---|---|
| Violet/indigo accent; purple–blue gradients | a palette from the subject's material world |
| Cream/beige ground + terracotta/rust accent (the "assistant palette") | low-chroma stone/bone with deep ink, or a full flat warm field |
| Near-black + one neon accent + glow | dark-room direction: lit exhibits, no glow |
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
| Emoji as icons | one real icon set, one stroke weight |
| Lorem ipsum, "Acme", "John Doe", "User 1" | real content; plausible sample details listed in the report |
| Invented testimonials, logos, user counts, ratings, press | nothing, or clearly fictional samples flagged in the report (**never** presented as real) |
| <4 real pictures on a page; one photo reused 5 times | 6–12 real pictures: own photos, then `assets.mjs` archival finds from the inventory, then drawn-for-subject |
| Rounded-corner photos in mixed ratios | square corners (or one 4px radius), two crop ratios |
| Text over a busy photo | a calm region, a flat scrim, or text moved off the picture |
| Laptop/phone mockup frames around screenshots | the screenshot large and uncropped, or a live fragment |

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

### Motion
| Slop | Replace with |
|---|---|
| The same fade-and-rise on every section | entrance manner varied per content type; one signature move |
| Motion on everything / page-load choreography in product UI | Emil's frequency gate: app screens get feedback only |
| No motion at all on a page (P) | taste's floor: ≥8 purposeful moving elements |
| `transition: all`, `scale(0)`, `ease-in` on UI, built-in weak `ease-out`, bounce/elastic | exact properties; `scale(.95)` + opacity; `--ease-out`; springs only after a momentum gesture |
| Preloaders, counters, custom cursors, scroll hijack, typewriter or scramble text | the first frame painted; native scroll |
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
   - `node $TASTE/inspect.mjs <url>` (pages) at 1440/768/390 must have 0 FAIL.
   - Read every WARN as wrong unless you can defend it to a designer in one sentence.
2. **Grep what the linters under-count** (TSX is regex-only for impeccable):
   ```bash
   # portable (rg not always installed); add --include globs for your stack (vue, svelte, astro, html, mdx)
   INC="--include=*.ts --include=*.tsx --include=*.js --include=*.jsx --include=*.css --include=*.html --include=*.json"
   grep -rniE $INC "unlock|unleash|supercharge|seamless|elevate|empower|revolutioni|game.?changer|cutting.?edge|next.?gen|world.?class|effortless|reimagin|delve|tapestry|synergy|streamline|holistic|lorem|acme|john doe|get started|learn more|click here" src/
   grep -rnE  $INC "transition-all|transition: all|scale-0|scale\(0\)|ease-in[^-]|h-screen|100vh|bg-gradient|bg-clip-text|backdrop-blur|shadow-(md|lg|xl|2xl)|animate-(bounce|ping|pulse)|font-mono|tracking-(wide|wider|widest)|user-scalable=no|maximum-scale=1" src/
   ```
   Verified on a real Next/Tailwind repo, where it caught `transition-all`, `bg-gradient-to-t`, `shadow-lg` and `100vh`. Each hit is a slop candidate: fix it, or justify it as an allowed exception (a photo scrim gradient, a floating-element shadow).
   Also grep the locale dictionaries for slop in every language. Arabic marketing filler counts too: generic "جودة عالية" or "أفضل" with no fact behind them.
3. **Look.** Open every screenshot (desktop and 390px, several scroll depths). Run the five-second test: can a stranger say what this is and what to do? Then the logo-cover test: hide the brand; could this be any company in the category? If yes, creativity fails.
4. **Fresh eyes.** Spawn one subagent with **no conversation history**. Give it the screenshots and this file's kill list, and ask: "List every element that suggests a model or a template made this, with the screenshot and position. Say NONE only if you would bet on it." Fix what it finds, then run steps 1–3 once more.
5. **Substance check.** For every removal, name what replaced it. A screen that got emptier without getting more specific has failed.
6. **Record** in the report: lint/inspect/detect counts before → after, any `--allow` used and why, and the fresh-eyes verdict.

Zero slop is reached when all three meters show 0 FAIL, the grep is clean or each hit is justified, the fresh-eyes agent returns NONE, and the logo-cover test passes.
