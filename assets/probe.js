// design-arsenal probe: paste as the function for chrome-devtools evaluate_script (or claude-in-chrome javascript_tool)
// after driving the UI into the state you want measured (drawer open, menu open, cart full...). Read-only.
// Run it at every verify width (references/devices.md). Read `fail` first; the lists below it say where.
// Self-check of the colour/luminance/font maths: `node assets/probe.test.js` (no browser needed).
(arg) => {
  // ---- pure helpers (exported to the self-check when called with 'selftest') ----
  const H = {
    // sRGB 0-255 -> HSL (h in degrees, s/l 0-1)
    hsl: ({ r, g, b }) => {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
      if (!d) return { h: 0, s: 0, l };
      const s = d / (1 - Math.abs(2 * l - 1));
      const h = max === r ? 60 * (((g - b) / d) % 6) : max === g ? 60 * ((b - r) / d + 2) : 60 * ((r - g) / d + 4);
      return { h: (h + 360) % 360, s, l };
    },
    // WCAG relative luminance
    lum: ({ r, g, b }) => [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; })
      .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0),
    // Krebs "vibe purple": hue 250-300, s > .25, .15 < l < .85, alpha >= .3
    isPurple: (c) => { const { h, s, l } = H.hsl(c); return (c.a ?? 1) >= 0.3 && h >= 250 && h <= 300 && s > 0.25 && l > 0.15 && l < 0.85; },
    // next/font renames families (`__Space_Grotesk_a1b2c3`); strip that back to the real name
    family: (stack) => stack.split(',')[0].trim().replace(/["']/g, '').replace(/^_+/, '').replace(/_(Fallback_)?[0-9a-f]{5,}$/i, '').replace(/_/g, ' '),
    // kill list (references/slop.md); Inter/Geist only flag when they carry the page alone (see `fonts`)
    banned: /^(space grotesk|fraunces|instrument (serif|sans)|poppins|montserrat|roboto|open sans|playfair|plus jakarta|outfit|sora|lato|nunito|raleway|syne|cormorant|lora|newsreader|dm (sans|serif)|cal sans|ibm plex (sans|serif|mono)(?! arabic))\b/i,
    soloOnly: /^(inter|geist)\b(?! mono)/i,
    arabicCommodity: /^(cairo|tajawal|almarai)\b/i,
    arabic: /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/,
    rtlLang: /^(ar|he|iw|fa|ur|ps|yi|ckb|dv|sd|ug)\b/i,
  };
  if (arg === 'selftest') return H;

  // ---- browser part ----
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const cache = new Map();
  const rgba = (css) => { // any CSS colour (oklch, lab, hex, named) -> {r,g,b,a} via the canvas
    if (!cache.has(css)) { cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#0000'; cv.fillStyle = css; cv.fillRect(0, 0, 1, 1); const [r, g, b, a] = cv.getImageData(0, 0, 1, 1).data; cache.set(css, { r, g, b, a: a / 255 }); }
    return cache.get(css);
  };
  const COLOR = /(rgba?|hsla?|oklch|oklab|lab|lch|color)\([^()]*\)|#[0-9a-f]{3,8}\b/gi;
  const vis = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const label = (el) => (el.getAttribute('aria-label') || el.textContent || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 40);
  const coarse = matchMedia('(pointer: coarse)').matches;
  const html = document.documentElement;
  const out = { viewport: `${innerWidth}x${innerHeight}`, coarse, fail: [],
    smallTargets: [], smallText: [], smallInputs: [], hiddenFocusable: [], dialogsNoModal: [], purple: [], arabicType: [], fonts: {}, images: {} };

  // targets, inputs, hidden focusables
  for (const el of document.querySelectorAll('a[href],button,[role=button],input,select,textarea,[tabindex]:not([tabindex="-1"])')) {
    if (!vis(el)) continue;
    const r = el.getBoundingClientRect();
    const min = coarse ? 44 : 24; // 44 on touch, WCAG 2.2 floor 24 on mouse
    // hit area may be grown by a ::before/::after (e.g. before:-inset-1.5); measure the larger box
    const pad = ['::before', '::after'].map((p) => getComputedStyle(el, p)).filter((s) => s.content !== 'none' && s.position === 'absolute')
      .map((s) => Math.max(0, -parseFloat(s.top) || 0, -parseFloat(s.left) || 0, -parseFloat(s.right) || 0, -parseFloat(s.bottom) || 0));
    const grow = 2 * Math.max(0, ...pad);
    const inline = el.tagName === 'A' && getComputedStyle(el).display === 'inline'; // WCAG 2.5.8 exempts inline text links
    if (!inline && (r.width + grow < min || r.height + grow < min)) out.smallTargets.push(`${label(el)} ${Math.round(r.width)}x${Math.round(r.height)}${grow ? ` (+${grow})` : ''}`);
    if (el.closest('[aria-hidden="true"]') && !el.closest('[inert]')) out.hiddenFocusable.push(label(el)); // inert = correctly unfocusable
    if (/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName) && parseFloat(getComputedStyle(el).fontSize) < 16) out.smallInputs.push(label(el));
  }

  // text: small sizes, font share by rendered characters, Arabic tracking/italic
  const share = {};
  let chars = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const text = walker.currentNode.textContent.trim();
    const el = walker.currentNode.parentElement;
    if (!el || !text || !vis(el)) continue;
    const s = getComputedStyle(el);
    const fam = H.family(s.fontFamily);
    share[fam] = (share[fam] || 0) + text.length; chars += text.length;
    if (seen.has(el)) continue;
    seen.add(el);
    const fs = parseFloat(s.fontSize);
    if (fs < 13) out.smallText.push(`${fs}px "${text.slice(0, 30)}"`);
    const ar = H.arabic.test(text) || (el.matches(':lang(ar)') && !/[A-Za-z]/.test(text));
    if (ar && ((s.letterSpacing !== 'normal' && parseFloat(s.letterSpacing) !== 0) || s.fontStyle !== 'normal')) out.arabicType.push(`${s.letterSpacing} ${s.fontStyle} "${text.slice(0, 30)}"`);
  }
  const ranked = Object.entries(share).sort((a, b) => b[1] - a[1]);
  for (const [f, n] of ranked.slice(0, 6)) out.fonts[f] = `${Math.round((100 * n) / chars)}%`;
  const banned = ranked.filter(([f]) => H.banned.test(f)).map(([f]) => f);
  if (ranked[0] && H.soloOnly.test(ranked[0][0]) && ranked[0][1] / chars > 0.9) banned.push(`${ranked[0][0]} alone`);
  const commodity = ranked.filter(([f]) => H.arabicCommodity.test(f)).map(([f]) => f);

  // colour: purple on filled CTAs or large surfaces (incl. gradient stops); images deduped by src
  const area = innerWidth * innerHeight;
  const srcs = new Map();
  const addSrc = (u) => { if (!u || u.startsWith('data:image/svg')) return; let k = u; try { const x = new URL(u, location.href); k = x.searchParams.get('url') || x.origin + x.pathname; } catch {} srcs.set(k, (srcs.get(k) || 0) + 1); };
  for (const el of document.body.querySelectorAll('*')) {
    if (!vis(el)) continue;
    const r = el.getBoundingClientRect(), s = getComputedStyle(el);
    const cta = /^(BUTTON|A)$/.test(el.tagName) || el.getAttribute('role') === 'button' || /btn|button|cta/i.test(el.className?.baseVal ?? el.className);
    if (cta || r.width * r.height > 0.15 * area) {
      const cols = [s.backgroundColor, ...(s.backgroundImage.match(COLOR) || [])].map(rgba).filter((c) => c.a >= 0.3);
      if (cols.some(H.isPurple)) out.purple.push(`${cta ? 'CTA' : 'surface'} ${label(el)}`);
    }
    if (r.width >= 100 && r.height >= 100) { // pictures, not icons
      if (el.tagName === 'IMG') addSrc(el.currentSrc || el.src);
      else if (el.tagName === 'VIDEO') addSrc(el.poster || el.currentSrc);
      for (const m of s.backgroundImage.matchAll(/url\(["']?([^"')]+)/g)) addSrc(m[1]);
    }
  }
  const reused = [...srcs].filter(([, n]) => n > 1).map(([k, n]) => `${k.split('/').pop()} x${n}`);
  out.images = { unique: srcs.size, reused };

  // page-level
  const bg = [document.body, html].map((e) => rgba(getComputedStyle(e).backgroundColor)).find((c) => c.a > 0) || { r: 255, g: 255, b: 255 };
  const dark = H.lum(bg) < 0.2, prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const darkByDefault = dark && !prefersDark;
  if (dark && prefersDark) out.notes = ['dark page under a dark preference: re-run with light emulation to tell dark-by-default'];
  const overflow = html.scrollWidth - html.clientWidth;
  const rtlNoDir = H.rtlLang.test(html.lang) && html.dir !== 'rtl';
  for (const d of document.querySelectorAll('[role=dialog]')) if (vis(d) && d.getAttribute('aria-modal') !== 'true') out.dialogsNoModal.push(label(d));

  // verdicts (conditional ones say when they apply)
  const F = (cond, msg) => cond && out.fail.push(msg);
  F(out.purple.length, `purple-accent: ${out.purple.length} (hue 250-300 on CTA/large surface)`);
  F(darkByDefault, 'dark-by-default: body luminance < 0.2 under a light preference (ignore only if the brief chose dark)');
  F(banned.length, `banned-font: ${banned.join(', ')}`);
  F(srcs.size < 6, `few-images: ${srcs.size} unique (gate >= 6 on store/marketing Pages; ignore on App screens)`);
  F(reused.length, `reused-images: ${reused.length} pictures shown more than once`);
  F(out.arabicType.length, `arabic-tracking-or-italic: ${out.arabicType.length}`);
  F(out.smallInputs.length, `input-under-16px: ${out.smallInputs.length}`);
  F(out.smallTargets.length, `small-targets (<${coarse ? 44 : 24}px): ${out.smallTargets.length}`);
  F(overflow > 0, `horizontal-overflow: ${overflow}px`);
  F(rtlNoDir, `rtl-without-dir: html lang="${html.lang}" dir="${html.dir}"`);
  F(out.smallText.length, `text-under-13px: ${out.smallText.length}`);
  F(out.hiddenFocusable.length, `focusable-in-aria-hidden: ${out.hiddenFocusable.length}`);
  F(out.dialogsNoModal.length, `dialog-without-aria-modal: ${out.dialogsNoModal.length}`);
  if (commodity.length) (out.notes ||= []).push(`Arabic commodity face(s) ${commodity.join(', ')}: body only, identity must ride on a display face (libraries.md)`);
  for (const k of ['smallTargets', 'smallText', 'purple', 'arabicType']) if (out[k].length > 15) out[k] = [...out[k].slice(0, 15), `+${out[k].length - 15} more`];
  return out;
}
