# References: zero-slop brands and galleries

Load for the references-first step (`router.md`). Take techniques and tokens, never layouts or pixels. **[verify]** = prior knowledge, not fetched in Oct 2026: check on the live site with devtools before using a value.

## Transferable techniques
| Reference | Technique to transfer |
|---|---|
| **Linear** | Colour in **LCH, not HSL**, so equal lightness looks equally light; a few base variables, every surface/text/icon tier derived by formula (they explored with black/white opacities), never hand-picked hex. Use OKLCH the same way. |
| **Aesop** | One family (Suisse Int'l) for nav, headlines, product copy and buttons; a serif only for the wordmark; h1 at weight 400, **never bold**; long editorial product copy. |
| **Thmanyah** | An owned Arabic typeface, now free (licence limits in `libraries.md`). |
| **Nothing** | Owned type (NDot, NType 82, NType 82 Mono by Colophon) used on packaging, web and phone UI alike. |
| **Emil Kowalski** | Motion only to inform or show a state change; weigh how often it is seen; never animate keyboard actions (Raycast's launcher has no open animation, and that is right). |
| **Rauno Freiberg** | Interactions modelled on the physical world: interruptible, momentum kept; touch reuses tap and swipe; pinch means precision. Let users *do* the thing (place their design on the shirt) rather than read about it. |
| **Hirbawi** (kufiya weavers since 1961) | First-person family voice with names, places, dates and plainly stated struggle; the story carries a plain template. |
| **tRASHY, Nöl Collective** (Palestinian) | The story told through the garment: tailoring, prints, casting; named makers ("fabric vendors in Nablus, embroiderers in Gaza, tailors in Ramallah"). |
| **Ounass** | Locally shot editorial with regional people instead of stock. |
| Apple, Stripe, Vercel, Family [verify] | Apple: one product per screen, type contrast by size. Stripe: real product diagrams over illustration (note: two anti-slop blogs wrongly call Stripe's headline face a serif). Family: sheets grow from the element tapped. |

## Galleries
| Gallery | Use | Fetch |
|---|---|---|
| **Typewolf** SOTD | type decisions: each entry names its fonts | static PNGs at `/assets/img/sotd/YYYY-MM-DD.png`; paused since Dec 2025 |
| **Fonts In Use** | type in context | not tested |
| **Hoverstat.es** | "alternative" non-template web design; one signature idea | live site |
| **Godly → Recent** | motion and interface ideas | static WebP posters at `cdn.recent.design/items/<id>/0/poster/<width>.webp`; feed has sponsored items |
| **Mobbin, Refero** | real shipped mobile/web flows (PDP, size picker, cart, RTL) | paid plans only (MCP/API) |
| **Awwwards** SOTD | avoid as a model for stores/mobile: skews to heavy WebGL agency showcases, scroll-jacking and preloaders; taste-style tools already calibrate on it | needs a browser (lazy placeholders) |
| Land-book, Lapa Ninja, One Page Love [verify] | **negative** reference only: SaaS-template sameness concentrates here | not tested |
| Siteinspire, Minimal Gallery, Httpster [verify] | small curated sets, lower template density | not tested |
