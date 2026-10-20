# Arabic / RTL, Palestinian identity, custom apparel

Load when the locale is RTL (Arabic, Hebrew, Persian, Urdu) or the product is apparel, print-on-demand or a customizer. Sources: W3C alreq, W3C bidi articles, Apple HIG (Right to left), Wikimedia Codex, Material, Ahmad Shadeed's RTL Styling 101, Baymard (free summaries), Custom Ink. Items marked **verify** or **test** are practitioner judgement or single-source; check them before treating as fact.

## 1. Arabic typography
- **Tracking is always 0**, buttons and nav included. Tracking disconnects joined letters (alreq: only spaces next to non-dual-joining letters may be adjusted). `tokens.css` enforces it on `:lang(ar)`; apply `tracking-*` only inside `:lang(en)` / `[dir=ltr]` scopes.
- **No per-letter effects** on Arabic: gradient text, per-letter transparency, outlines and letter-stagger animation expose the overlapping joins (alreq §4.3.7).
- **Line-height (test):** body about 1.7–1.9, headings about 1.25–1.4, never `leading-none`/`leading-tight` (1.0–1.1 clips stacked dots and descenders). These figures combine alreq's "ascenders and descenders extend much further" with one guide's +10–15%; test with diacritics and ي ج ع م.
- **Size beside Latin:** Arabic looks smaller at the same size. Apple: increase the RTL size by about 2pt; roughly 1.1–1.2× (verify per font). Set it per script with `:lang(ar)` or `size-adjust` in `@font-face`.
- **No italic, no uppercase.** There is no true Arabic italic (the browser fakes an oblique) and Arabic has no case. Emphasis by weight, size or colour.
- **No `text-justify`** on product copy; kashida justification is not reliable in browsers (verify). Start-aligned ragged text.
- **Font stack:** an Arabic family first for `:lang(ar)`. Fallback runs per glyph, so a Latin-first stack silently renders Arabic in a system font. Picks: `libraries.md`.
- **Numerals:** pick one system for prices, sizes and phone numbers and keep it. W3C maps Arabic-Indic ٠–٩ to Egypt/Saudi/Iraq; Levantine commerce practice favours Western digits (unsourced, verify with the owner). Phone numbers always Western digits so they copy into WhatsApp. Digits always run LTR. `font-variant-numeric: tabular-nums` in totals; check the font has tabular figures for the digit set used. Normalise ٠–٩ to ASCII on submit; use `type="text"` + `inputmode="numeric"|"tel"` + `pattern`, not `type="number"`.

## 2. Layout
- `<html lang="ar" dir="rtl">` set **server-side** per `[lang]` segment; setting `dir` after hydration flashes the LTR layout (probe `rtl-without-dir`).
- **Logical properties only:** `ms-/me-/ps-/pe-/start-/end-/text-start/text-end/rounded-s/rounded-e/border-s/border-e`, `margin-inline`, `inset-inline-start`. The grep in `slop.md` flags physical ones. `rtl:`/`ltr:` variants only for transforms. Whether `space-x-*` behaves logically in Tailwind v4 is unverified: prefer `gap`.
- `overflow-x: clip`, not `hidden`, on wide wrappers (`hidden` breaks `position: sticky`).
- RTL `scrollLeft` is 0 at the start and goes negative; Safari reports overscroll past the range. Carousel maths uses `Math.abs(scrollLeft)` and is tested at both ends in WebKit and Chromium.

## 3. Mirror / don't mirror
- **Mirror** what encodes reading or navigation direction: back/next arrows, chevrons, steppers, sliders, toggles, progress bars (fill from the right), pagination, rating selectors, step indicators, breadcrumbs (`>` mirrors by itself), slide-ins (enter from inline-start), carousels (`direction: 'rtl'` in Embla/Swiper so arrows, swipe and snap order agree), drawers (from the trigger's side). Order of images when the order is meaningful.
- **Never mirror:** logos (even with text), the WhatsApp icon, check marks, media play/pause and video scrubbers, clocks and calendars, currency symbols, numbers, phone numbers, photographs and illustrations, charts where flipping changes meaning, the cart icon itself (reposition only its badge). **Never mirror a garment mockup**: shirts carry text and asymmetric prints, so a flip misrepresents the product.
- No blanket `[dir=rtl] svg { transform: scaleX(-1) }`. Mirror per icon with `rtl:-scale-x-100` or by swapping the icon.

## 4. Bidi isolation
- Known-Latin phrases (English product names): `<span lang="en" dir="ltr">`. User or runtime text of unknown direction: `dir="auto"` or `<bdi>`.
- Prices: `<bdi>₪ 89</bdi>` (or `89 ₪`); choose one sign position for the whole site and keep the number and sign together with `&nbsp;`. Phone numbers, SKUs, order IDs: `dir="ltr"`.
- Customizer: `dir="auto"` on the text input **and** on the preview text layer.
- Plain text with no markup (WhatsApp prefill, meta titles): wrap LTR runs in LRI U+2066 … PDI U+2069 (FSI U+2068 for unknown direction). Never the old LRE/RLE embeddings. In JS: `` `\u2066${sku}\u2069` ``.

## 5. Copy
- Write Arabic first; a native Palestinian speaker reviews it. Literal English idioms ("ارتقِ بأسلوبك إلى المستوى التالي" = "Elevate your style") are the Arabic slop tell; the filler list and grep are in `slop.md`. MSA vs Levantine warmth is the owner's call (no source; verify).
- Direction-neutral wording: not "swipe left" or "the button on the right".

## 6. Palestinian identity without cliché
Tatreez is a semantic language: motifs encode region, village, family and life events; UNESCO listed it in 2021. Wallpaper use is the cliché.
- **Banned:** stock keffiyeh texture as a background, tatreez borders on every section, the flag palette (red/green/black/white) as UI palette or gradient, map-of-Palestine silhouettes as decoration, olive-branch line icons, a sunset "heritage" gradient hero, calligraphic display faces for UI copy.
- **Respectful use (design judgement):** name the motif and its region; render it on a true cross-stitch grid (tatreez is a pixel system); use one structural device (the stitch grid as a layout rule, or thread-colour logic such as madder red and indigo) rather than decoration; credit or partner with embroiderers and producers; ask the owner before using heritage content (`conflicts.md` Scarce photography). Real local photography beats vector heritage iconography. Tell the story through the garment (`refs.md`).

## 7. Apparel PDP, size guide, customizer
**Evidence (Baymard, 18 sites, 370+ sessions):** 83% of desktop and 87% of mobile apparel sites give insufficient sizing info; 84% of participants used sizing info; 58% of size charts omit critical measurements; 36% had no size finder; 28% of desktop sites don't use buttons for size; 33% lack a "Fit" review subscore; users rarely switch size but often accept another colour; 10% used search.
- **PDP:** gallery of real model photos plus a flat mockup; price with currency; size **buttons** (radiogroup, not a dropdown) with an inline link to a **product-specific** chart in cm (plus inches for international); colour swatches crossed out when unavailable in the chosen size; fit note ("the model is 180cm and wears L"); fabric/GSM and print method; delivery areas and times, listing only what is truly served; reviews with fit info.
- **Proof model (Custom Ink):** a human checks every design and sends a free proof; uploads PNG/JPG/PDF/AI/EPS at 300 DPI+, vector best. Show this promise; it is the trust mechanism.
- **Customizer:** mobile-first bottom-sheet toolbar (text / upload / templates / colour / side); front/back toggle with each side customised separately; live preview on a **photographed** garment, not a flat SVG tee; print-area boundary on the mockup; low-DPI warning at upload; no letter-spacing control on Arabic text layers; ends on a proof screen (mockup + placement + size + quantity) that becomes the order message.
- **Canvas Arabic risk:** many canvas libraries render Arabic disconnected or reversed. Fabric.js/Konva shaping and bidi are **unverified**: test with "نسجة" plus mixed English and digits before shipping.
- **WhatsApp as checkout:** PayPal and Shopify Payments are unavailable in Palestine, so WhatsApp plus cash on delivery, transfer or a payment link is the checkout, not a shortcut. `wa.me/<number>?text=` prefill with order summary, design ID or link, size per quantity, colour, price, delivery city; isolates around SKU, price and phone (§4). Say what happens next (reply time, proof, payment, delivery). Minimal form (name, phone, city), no account. Handoff inside Instagram/Facebook: `devices.md` §6.
- **Trust:** real photos of printed output, the human proof, a reprint/return policy for print defects, the WhatsApp number visible, named delivery partners. No countdowns, fake urgency, placeholder 5-star reviews or stock-model mockups that misplace the print.

## 8. AI failure checklist (run on every RTL surface)
| # | Failure | Check |
|---|---|---|
| 1 | `lang="ar"` without `dir="rtl"`, or `dir` set client-side | probe `rtl-without-dir`; view-source of the first response |
| 2 | Physical utilities and `translate-x` enter animations | physical-direction grep (`slop.md`) |
| 3 | Latin type settings on Arabic: tracking, `leading-none/tight`, `uppercase`, `italic` | probe `arabic-tracking-or-italic`; `grep -rnE "leading-(none\|tight)\|uppercase\|italic" src/` on Arabic components |
| 4 | Latin-only stack, or one commodity Arabic face (Cairo/Tajawal) with no display voice | probe `fonts` + `notes`; font grep |
| 5 | Broken numbers: mixed sign position, phone reversed, mixed digit systems | `grep -rnE "₪\|\+970\|\+972" src/` and check each sits in `<bdi>`/`dir="ltr"`; `grep -rn "[٠-٩]" src/ messages/` if the site chose Western digits |
| 6 | Over-mirroring: logo, WhatsApp, check, play, cart, photos flipped | `grep -rnE "scaleX\(-1\)\|scale-x-100" src/` and `grep -rnE "dir=.?rtl.?\] *(svg\|img)" src/` |
| 7 | Under-mirroring: back arrow points left, next arrow on the wrong side, progress fills left-to-right, swipe opposite to arrows | screenshots at `dir="rtl"`; carousel test at both ends |
| 8 | Unisolated mixed-script strings ("!Oversized Tee") | `grep -rnE "wa\.me" src/` and check the prefill uses U+2066/U+2069; Latin names wrapped in `lang="en"` |
| 9 | Customizer renders Arabic disconnected or reversed | manual: type "نسجة 12 Tee" on every canvas/SVG text layer |
| 10 | Translated-sounding copy | Arabic copy grep (`slop.md`); native review |
| 11 | Heritage clichés (§6) | look: screenshots; `grep -rniE "keffiyeh\|kufiya\|tatreez\|map" public/ src/` for decorative assets |
| 12 | Generic e-commerce slop: size dropdown, no cm chart, all swatches enabled, countdowns, placeholder reviews | `grep -rnE "<select[^>]*size\|countdown\|Countdown" src/`; PDP review against §7 |
| 13 | Physical-direction words in copy ("swipe left", "on the right", "اسحب لليسار") | `grep -rniE "swipe (left\|right)\|on the (left\|right)\|لليسار\|لليمين\|على اليسار\|على اليمين" src/ messages/` |
