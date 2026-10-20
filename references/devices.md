# Devices: targets, adaptive rules, matrix, verification

Load at target classification (router step 0) and at every verify step. The mobile PASS/FAIL checklist lives in `conflicts.md` §3; this file adds what it does not cover. Sources: Android window-size-class docs, Apple HIG, Microsoft Learn, NN/g, web.dev, Chrome for Developers, MDN, WebKit blog, Playwright docs, StatCounter (Sep 2026), Next.js 16 local docs. **verify** marks single-source or unfetched claims.

## 1. Classify the target first
Pick one primary target per surface and record it in PRODUCT.md/DESIGN.md. Breakpoints are by **available window size, not device type**; never UA-sniff for layout.

| Target | Navigation by class | Overlays | Density / type | Key rules |
|---|---|---|---|---|
| **Marketing site** | compact: header + menu sheet labelled "Menu"; ≥ lg: visible top nav, no hamburger | dialogs centred; sheets only on compact | fluid type, desktop ratio 1.333+; fluid space | `min-h-svh` hero; CTA in the first viewport at 390×664; nothing hover-only; text ≤ ~70ch at 1440 |
| **E-commerce** | compact: header + search + cart reachable from the bottom area; ≥ lg: visible mega-menu with a tap path to parent categories | compact: filter/variant sheets with detents; ≥ lg: sidebar filters, popovers | moderate fluid type | §2 commerce rules; 48px targets; ≥16px inputs; safe area on bars |
| **Web app / dashboard** | compact: bottom bar (3–5 destinations) or menu; medium: rail; expanded+: sidebar; list-detail at ≥ 840 | compact: full-screen or sheet; ≥ md: dialog or side panel | flatter scale; denser on `pointer-fine`, `pointer-coarse:` bumps | container queries for every widget; tables collapse to cards at `@max-md`; shortcuts and hover on fine pointers only |
| **PWA** | as web app, plus a back button under `display-mode: standalone` | sheets with detents; the back gesture closes the sheet | as web app | §3; per-route `<title>` (it becomes the window title) |
| **Native iOS / Android** (Expo, SwiftUI, Compose) | iOS tab bar → sidebar-adaptable tab view; Android `NavigationSuiteScaffold` (bar → rail) | system sheets with detents (`.presentationDetents`, Expo native sheets) | Dynamic Type / font scale | platform primitives, not web emulation; 44pt/48dp; route to `animate-expo`, `write-swift`, impeccable `ios.md`/`android.md` |
| **One adaptive design** | resolve per class with the web-app row for app-like products, the marketing row for content | — | one token set; per-class overrides only for nav, overlays, pane count, density | "one design" means one token system, not one layout: components still swap at class boundaries |

## 2. Window classes and what changes at each boundary
- **Width classes (Material):** compact < 600, medium 600–839, expanded 840–1199, large 1200–1599, extra-large ≥ 1600. Height: compact < 480 (phones in landscape), medium 480–899, expanded ≥ 900. Tailwind's sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536 are close, not equal; app targets may set `--breakpoint-*` at 600/840/1200/1600 in `@theme` (one unit for all).
- **Swap components, don't just reflow:** bottom bar → rail → sidebar; bottom sheet (compact, coarse) → centred dialog or popover (fine pointer, wide); single pane with push → list-detail or supporting pane (expanded+). Gate two-pane layouts on `min-height` too (`[@media(min-height:480px)]:`), so landscape phones stay one pane.
- **Shell vs components:** media queries for the page shell (nav type, panes, gutters); `@container` for everything that may sit in a sidebar, modal or grid cell.
- **Interaction idiom by input, layout by size:** hover and dense pointer affordances only under `(hover:hover) and (pointer:fine)` (Tailwind `pointer-fine:`/`pointer-coarse:`); a 1024px iPad with a trackpad is fine pointer, a touch laptop may be `any-pointer: coarse`. Apple: a resized window keeps its idiom, so a narrow desktop window still looks like a website, not a phone app. Avoid critical controls at the bottom of resizable iPad/Mac windows.
- **Gates per width:** fail at ≥ 1024 if the only nav is a hamburger (NN/g: hidden nav used 27% vs 48–50% visible on desktop), a bottom tab bar or bottom sheet appears, or lines run over 80ch. Fail at 390 if the CTA is not in the first viewport, a target is under 44px, an action is hover-only, the page scrolls sideways, a fixed bar lacks safe-area padding, or an input is under 16px.
- **Commerce:** phone PDP gets a sticky bar shown only after the inline add-to-cart scrolls away: solid `--surface` (no glass), one tone step or one soft shadow, min-height 64px + safe area, price + chosen variant + a ≥48px primary button, hidden while the keyboard is open. Required choices are a `radiogroup` of chips ≥44px (48 preferred); a tap with nothing chosen scrolls to the group and announces why via `aria-live` (no silent disabled button). Commit buttons go idle → pending → done (check ~200ms), exit ≈70% of enter. Badge bump `scale(1→1.15→1)` 250ms on `--ease-out`, no overshoot. Haptics only on a meaningful commit, guarded `navigator.vibrate?.(10)` (Android; Safari has no `vibrate`, and the switch-checkbox hack is fragile, verify). Gallery swipes with pinch-zoom and a count; filters in a full-height sheet with a sticky "Show N results". Desktop (fine pointer, ≥ 1024): two-column PDP, gallery with hover zoom or lens, sticky buy box, sidebar filters, **no** bottom sticky bar. Tablet: two columns from medium, tap-to-zoom unless `any-hover: hover`. Sticky-ATC lifts (+5–9% add-to-cart) are vendor A/B tests, not research.

## 3. Native-feel web (beyond `conflicts.md` §3)
- Heights: `--h-hero` 100svh for heroes, `--h-shell` 100dvh only for app shells (`tokens.css`).
- `viewport-fit=cover` + safe areas through `max()` (`.safe-*`, `--gutter` in `tokens.css`); landscape phones get side insets.
- Keyboard: Chrome 108+ Android defaults to `interactive-widget=resizes-visual`; set `resizes-content` (Next `viewport.interactiveWidget`) only when a bottom-fixed input or CTA must ride above the keyboard. **WebView is not affected by that change** (§6).
- `overscroll-behavior: contain` on drawers and inner scrollers; not `none` on body (kills pull-to-refresh).
- Sheets: 2–3 detents; a swipe **and** a Close button dismiss; the browser back gesture closes the sheet (push a history state on open; inferred). Never stack sheet on sheet.
- Route transitions: React 19.2 `<ViewTransition>` (Next 16): activates on transitions, `<Suspense>` and `useDeferredValue`, not plain `setState`; Next navigations are transitions; `share="morph" default="none"` stops unrelated crossfades; gate by reduced motion. Cross-document CSS view transitions: Chrome/Edge 126+, Safari 18.2+, no Firefox (verify on caniuse).
- Targets 44pt (Apple) / 48dp (Android) / ~48px with ~8px spacing (web.dev); WCAG 2.5.8 floor 24px. **Never** `userScalable: false` (see `conflicts.md` §3 item 1).

## 4. Fluid type and zoom
- Two scales interpolated with `clamp()`: about 1.2 at 320px to 1.25–1.333 (apps) or up to 1.414+ (editorial display) at ~1500px (Utopia). Tokens as `--text-*` in `@theme`, `clamp(min-rem, rem + vw, max-rem)`, max ≤ ~2.5× min.
- Keep a `rem` term in every `clamp()`; no text in `px`. `vw`-heavy clamps can stop text at ~150% when zoomed to 200% (WCAG 1.4.4 risk), so **test at 200% zoom** every time fluid type changes.
- Density follows input and viewing distance: fixed 4px-grid tokens with `pointer-coarse:` bumps for apps; fluid space pairs for marketing. Body ≥16px on phones; 60–75ch on desktop.

## 5. Device matrix
Palestine (StatCounter, Sep 2026): mobile 360×800 15.5%, 393×873 11.5%, 393×851 9.9%, 384×832 6.4%, 412×915 5.8%, 414×896 5.5%; browsers Chrome 82.6%, Safari 8.2%, Samsung Internet 8.0%; OS Android ~86–89%, iOS ~11–14%. Worldwide mobile leader: 414×896.
- **Phones:** 360, 375 (SE), 390–393, 412, 414, 430 (Pro Max). Short heights: 360×640, 375×667; a sticky CTA plus header must fit ~560px of visible height under in-app browser chrome.
- **Landscape phones:** 800×360, 844×390, 932×430 (compact height: two panes must not trigger).
- **Tablets:** 768×1024, 800×1280 (dominant Android), 820×1180, 1024×1366; landscape 1180×820, 1280×800.
- **Foldables (verify on a spec sheet):** ~344×882 cover, ~884×1104 unfolded. Viewport Segments API is Chromium-only (138+); progressive enhancement.
- **Desktop:** 1280×800, 1366×768, 1440×900, 1920×1080 (max-width sanity).
- **Verify widths by tier:** S: 390 + 1440. M: 360, 390, 768, 1024, 1440. L: every row above that the target uses, plus 375×667 and 844×390. Pass the list to `inspect.mjs --widths` and run the probe at each.

## 6. Engines and in-app browsers
- **All iOS is WebKit**: Chrome, Firefox, Edge on iOS and every iOS in-app browser. One WebKit pass covers layout; in-app views add their own toolbars and injected scripts.
- **Android in-app browsers are WebView (Blink)**, often older than Chrome, with the **old keyboard resize** (the layout viewport shrinks, so `100dvh` and fixed bottom bars jump). Test the keyboard inside Instagram/Facebook, not only Chrome.
- In-app browsers have **separate cookie jars**: no shared login or autofill. No third-party cookies or OAuth popups on critical paths; redirect-based OAuth (Google sign-in in webviews is commonly blocked, verify). Avoid downloads and `window.open` for receipts or `.ics`.
- **`wa.me` inside Instagram/Facebook:** plain `<a href="https://wa.me/...">` with no `target="_blank"` and no `window.open`; next to it the number as `tel:` text plus a copy button so a failed handoff still converts; optionally `whatsapp://send?phone=` as a second button. Only a real device can verify it.
- Detect in-app browsers by UA (`FBAN`/`FBAV`, `Instagram`, `; wv)`) only to show a non-blocking "Open in browser" hint; never gate content.
- Samsung Internet forced dark: declare `<meta name="color-scheme" content="light dark">` + `:root{color-scheme}` with real dark tokens, or `only light`.

## 7. The 20 known bugs
Fixes for 1–7 are in `conflicts.md` §3; the check column is what to run.
| # | Bug | Fix | Automated check |
|---|---|---|---|
| 1 | `100vh` hero overflows, CTA hidden | `--h-hero`/`--h-shell` | grep `h-screen\|100vh`; CTA bottom ≤ viewport at 375×667 |
| 2 | Notch / home-indicator overlap | `viewport-fit=cover`, `.safe-*` | grep fixed/sticky bars for `safe`; landscape iPhone (manual) |
| 3 | iOS input auto-zoom | inputs ≥16px rendered | probe `input-under-16px` |
| 4 | Keyboard covers input, footer jumps | default `resizes-visual`; hide sticky CTA on `:has(input:focus)`; `scrollIntoView({block:'center'})` | manual on Chrome Android, FB/IG WebView, iOS Safari |
| 5 | `:hover` stuck after tap | hover media query | grep raw `:hover` in CSS |
| 6 | Double-tap delay | `width=device-width`; `touch-action: manipulation` | assert the viewport meta |
| 7 | Scroll chaining, pull-to-refresh in a drawer | `overscroll-behavior: contain` | grep scroll containers |
| 8 | `position: sticky` dead | ancestor `overflow: hidden` → `clip` | script: walk up from each sticky element, flag non-`visible`/`clip` overflow |
| 9 | `backdrop-filter` jank on low-end Android | small elements only; solid `@supports not` fallback | trace at 4×/6× CPU |
| 10 | Forced dark (Samsung, Chrome auto-dark) | `color-scheme` meta + real dark tokens | dark-scheme screenshots; Samsung dark pass (manual) |
| 11 | Text inflation on rotation | `text-size-adjust: 100%` (not `none`) | landscape screenshot |
| 12 | Layout from `innerHeight` read once | CSS units or `resize`/`visualViewport` | portrait → landscape → portrait, assert no overflow |
| 13 | Horizontal overflow (the top RTL bug) | logical properties | probe `horizontal-overflow` at every width |
| 14 | RTL scroll maths | `Math.abs(scrollLeft)` (`rtl.md` §2) | carousel test with `dir="rtl"` in WebKit + Chromium |
| 15 | Icons not mirrored, or over-mirrored | `rtl.md` §3 | screenshots in both `dir`s |
| 16 | Number inputs, Arabic-Indic digits | `type="text"` + `inputmode` + `pattern`; normalise ٠–٩ | unit test of the normaliser |
| 17 | `<select>` styling | style the closed state; `appearance: base-select` only as enhancement | Baseline lint |
| 18 | Image weight and CLS | `next/image`, correct `sizes` for 360–430, fixed dimensions or `aspect-ratio` | Lighthouse "properly size images", CLS |
| 19 | Arabic font FOIT/CLS | `next/font`, subset Arabic + Latin, preload only above-fold weight, ≤2 font files above the fold | CLS < 0.1 on throttled mobile |
| 20 | Foldables | container queries; optional `horizontal-viewport-segments` | screenshots at 344 and 884 |

## 8. Performance and feature gating
- Core Web Vitals at p75 mobile: **LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1**. Lab proxy: Lighthouse mobile preset with 4×/6× CPU and slow 4G; assert LCP ≤ 2.5s, CLS ≤ 0.1, TBT ≤ 200ms, performance ≥ 90 (DevTools throttling is a first-order approximation; confirm on one real low-end Android). Field INP via `web-vitals` or Speed Insights. Budget heuristics (unsourced): ≤ ~150–170KB compressed first-load JS, LCP image ≤ ~100KB AVIF/WebP at phone width, Server Components for static content.
- `package.json`: `"browserslist": ["baseline widely available with downstream"]` (includes Samsung Internet and WebView). Newly/limited features only behind `@supports` with a fallback: `appearance: base-select`, `env(keyboard-inset-height)`, viewport segments, `text-size-adjust`, `interactive-widget`. Lint with `eslint-plugin-compat` or a Baseline-aware stylelint plugin (maturity unverified).

## 9. Automated vs real-device
**Automated (every build):** `npm run check`; Playwright projects in **Chromium and WebKit**: 360×800 Chromium, Pixel 7 (412), iPhone SE (375, WebKit), a 430 WebKit phone, iPad Mini (768, WebKit), 800×1280 Chromium tablet, Desktop Chrome 1280/1440, Desktop Firefox 1280 (check descriptor names in the installed version). Per route and project: no horizontal overflow, no console errors, inputs ≥16px, `@axe-core/playwright` with 0 serious/critical at 360 and 1280 in both `dir`s, `toHaveScreenshot` in light and dark, `dir="rtl"` present, CTA visible at 375×667, reflow at 320px, a 200% text pass (`html{font-size:200%}`, no clipping). Baselines generated in one environment (Playwright Docker image). Playwright WebKit is not branded Safari and cannot drive the iOS Simulator; emulation has no real keyboard, GPU or network stack.
**Real device (~20–30 min before a release):** a small iPhone and a Pro Max in Safari, plus the same link opened from WhatsApp, Instagram DM and Facebook; a low-end 360×800 Android in Chrome, Instagram/Facebook WebView and Samsung Internet with dark mode on. On each: keyboard open on every form, the `wa.me` handoff, back-button behaviour, a cookie or login flow inside the in-app browser, landscape, 200% font, VoiceOver/TalkBack on the main flow. Use a real-device cloud when no phones are at hand (in-app browser support there is unverified).

## 10. Done rule
Never claim "bug-free on all devices". Report: "passed matrix <widths × engines> and gates <list>; real-device pass: done on <devices> / not done", plus what failed or was skipped.
