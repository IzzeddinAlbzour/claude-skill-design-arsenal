# Libraries: icons, components, fonts, motion

Load when picking or restyling an icon set, component kit, typeface or motion library (pipeline B step 4, C type/colour/components steps, any shadcn project). `pick-ui-library` stays the lookup for behaviour components (toasts, command menus, drag, virtualisation); this file decides the **look**. The tells themselves are in `slop.md`. Most evidence here is designer opinion, not measured data; **verify** marks claims not re-checked in Oct 2026.

## 1. Icons
Order of preference:
1. **Custom SVG** for the 5–15 brand and hero icons; a library only for utility glyphs.
2. **Phosphor** (MIT): six hand-drawn weights (Thin, Light, Regular, Bold, Fill, Duotone), ~1,200 icons. Match the weight to the type.
3. **Hugeicons** (free Stroke Rounded set, commercial use without credit; Pro styles paid) / **Iconoir** (MIT, ~1,500, 1.5px stroke; verify) / **Tabler** (MIT, ~5–6k, but Lucide-adjacent, so it de-slops little). Central Icons is a paid set with radius and stroke per package (licence key).
4. **Lucide only restyled:** stroke tuned to the type (1–1.5px beside light or high-contrast type, 2px beside heavy grotesks), size tuned per role, never in tinted squares, never the default "AI" glyphs.

Avoid as identity: Heroicons (Tailwind UI look; verify) and Material Symbols (Google look; verify). **SF Symbols are licensed for Apple platforms only, never the web.** Remix Icon changed licence in 2024 (verify terms).

**Swapping shadcn's internal Lucide:** shadcn imports Lucide inside generated components (Select chevron, Dialog/Sheet close X, Checkbox check, etc.). Choose the icon library at `shadcn create` (2026 setup offers base, style and icon library), or `grep -rn "lucide-react" components/ui src/components/ui` and replace each import with the chosen set at a matched size and stroke.

**Without the tinted-square tell:** icon inline with the heading at cap height; a larger single-colour or duotone glyph with no container; a typographic marker; a real product crop; or no icon when the text is short.

## 2. Components
- **Headless primitives + your own tokens.** Base UI is shadcn's default since July 2026 (Radix still via `-b radix`); React Aria for RTL-heavy and form-heavy parts (strongest i18n and locale-aware date/number handling; verify); Ark UI. Primitives carry no look; the slop is shipping shadcn's default tokens and shapes unchanged.
- Styled systems (MUI, Mantine, Chakra, HeroUI) each have a house look that is harder to de-brand; avoid them for identity work.
- shadcn's "Default" style is deprecated (new projects get "New York"). The violet-primary claim about shadcn's default theme is unreliable; the default is neutral/zinc.

**shadcn restyle checklist** (Pages also need `conflicts.md` §4 for taste lint):
1. Replace every colour token with a brand-derived palette, foreground pairs included (`--primary`, `--primary-foreground`, `--background`, `--foreground` carry most of the brand). No indigo or violet primary.
2. Vary radius by role, or pick one decided radius (0 or full), instead of one `--radius` everywhere.
3. Change density: control heights, padding, borders-vs-fills ratio. No shadow-plus-border.
4. Change the type stack and scale (§3).
5. Swap the icon set, or at least its stroke and size (§1).
6. Restyle focus rings, selection and scrollbar.
7. Remove uniform `shadow-sm` cards; hierarchy by size and position.
8. Rewrite motion: no fade-up on every section.
9. At most one hero effect, bespoke; never stock spotlight, beams or aurora.

## 3. Fonts
**Latin.** Default route: taste `draw.mjs` deals the type system; if it deals a kill-list face, `--redraw type` (`conflicts.md`). Other sources:
- Paid display faces (Klim, Grilli Type, Dinamo, Commercial Type; licensing per pageview, not researched: verify) for headings over a quieter text face.
- Fontshare (free incl. commercial; ITF Free Font License vs OFL per family; whether FFL fonts may be self-hosted is disputed: verify). Satoshi and General Sans are now common on Framer-template sites.
- Velvetyne, Collletttivo (free, experimental; display only; verify).
- Inter and Geist only as body/UI under a distinct display face.

**Arabic** (pair by stroke contrast, x-height and tooth height, not by name):
1. **29LT** (Pascal Zoghbi; multiscript families built Arabic-first; rentable via Fontstand) or **TPTQ Arabic** (Kristyan Sarkis with Typotheque; Greta Arabic, Kanun; non-exclusive, partially exclusive or buyout custom licences). Paid; both give a matched Latin.
2. **Thmanyah** (free for personal and commercial use incl. websites, apps, logos, print). Its licence forbids modifying or renaming, republishing, **redistributing or hosting** the files, outdoor signage and implied endorsement. That conflicts with self-hosting via `next/font/local`: **get the terms confirmed in writing before using it on a site.** Family reported as Sans / Serif Text / Serif Display × 5 weights (third-party CSS, verify); Latin coverage is incomplete, so pair a Latin face (one site uses Manrope).
3. **IBM Plex Sans Arabic** (OFL) with Plex Sans as its Latin companion inside Arabic-first surfaces (`conflicts.md`); safe and engineered but increasingly common (verify).
4. Readex Pro, Alexandria (OFL, verify); Noto Kufi / Noto Naskh Arabic are the neutral "system" look.
5. **Overused:** Cairo, Tajawal (Lovable's default Arabic font), Almarai (verify). Body only, behind a display face that carries the identity, or justified in the report.

Khatt on fonts.com is Arabetics, not Khatt Foundry; don't conflate. Wiring: `next/font` with per-locale CSS variables, `:lang(ar)` sets its own size and leading (`rtl.md` §1), subset Arabic + Latin, preload only the above-fold weight.

## 4. Motion
- **First:** CSS transitions and the View Transitions API (React `<ViewTransition>`: `devices.md` §3). Native, cheap, low slop risk.
- **Motion** (`motion` package, MIT core, Motion+ paid; verify) for springs, layout animation and gestures in React 19. Wrap the app in `<MotionConfig reducedMotion="user">`.
- **GSAP** is free for all uses since Webflow's acquisition, SplitText and MorphSVG included; npm `gsap` ships the plugins and `gsap-trial` is deprecated. The licence is Webflow's, revocable for non-compliance, and prohibits tools that compete with Webflow's visual animation builder. Use it for one authored scroll or type moment.
- **Lenis** only for a scroll-driven narrative that needs it; never on stores or forms.
- One dominant effect per page. Uses that read as slop: `slop.md` Motion table.
