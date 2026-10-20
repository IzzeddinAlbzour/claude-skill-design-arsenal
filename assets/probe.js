// design-arsenal state probe: paste as the function for chrome-devtools evaluate_script (or claude-in-chrome javascript_tool)
// after driving the UI into the state you want measured (drawer open, menu open, cart full...). Read-only.
() => {
  const vis = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const label = (el) => (el.getAttribute('aria-label') || el.textContent || el.tagName).trim().slice(0, 40);
  const coarse = matchMedia('(pointer: coarse)').matches;
  const out = { viewport: `${innerWidth}x${innerHeight}`, coarse, smallTargets: [], smallText: [], smallInputs: [], hiddenFocusable: [], dialogsNoModal: [], overflowX: document.documentElement.scrollWidth > innerWidth };
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
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const el = walker.currentNode.parentElement;
    if (!el || seen.has(el) || !walker.currentNode.textContent.trim() || !vis(el)) continue;
    seen.add(el);
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 13) out.smallText.push(`${fs}px "${walker.currentNode.textContent.trim().slice(0, 30)}"`);
  }
  for (const d of document.querySelectorAll('[role=dialog]')) if (vis(d) && d.getAttribute('aria-modal') !== 'true') out.dialogsNoModal.push(label(d));
  for (const k of ['smallTargets', 'smallText']) if (out[k].length > 25) out[k] = [...out[k].slice(0, 25), `+${out[k].length - 25} more`];
  return out;
}
