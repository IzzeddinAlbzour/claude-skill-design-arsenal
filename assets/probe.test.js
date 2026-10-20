// Self-check for probe.js maths. Run: node assets/probe.test.js  (no browser; exits 1 on failure)
const assert = require('node:assert/strict');
const H = eval(require('node:fs').readFileSync(`${__dirname}/probe.js`, 'utf8'))('selftest');
const hex = (h) => ({ r: parseInt(h.slice(1, 3), 16), g: parseInt(h.slice(3, 5), 16), b: parseInt(h.slice(5, 7), 16), a: 1 });

// hue/saturation/lightness
assert.equal(Math.round(H.hsl(hex('#ff0000')).h), 0);
assert.equal(Math.round(H.hsl(hex('#0000ff')).h), 240);
assert.equal(Math.round(H.hsl(hex('#8b5cf6')).h), 258); // Tailwind v3 violet-500
assert.equal(H.hsl(hex('#808080')).s, 0);

// purple rule: violet/purple flagged; indigo-500 (239deg) and blue, terracotta, greys not
assert.ok(H.isPurple(hex('#8b5cf6')));
assert.ok(H.isPurple(hex('#7c3aed')));
assert.ok(H.isPurple(hex('#9333ea')));
assert.ok(!H.isPurple(hex('#6366f1')), 'indigo-500 is 239deg: caught by the grep, not the hue rule');
assert.ok(!H.isPurple(hex('#3b82f6')));
assert.ok(!H.isPurple(hex('#d97757')));
assert.ok(!H.isPurple({ ...hex('#8b5cf6'), a: 0.2 }), 'faint tint ignored');
assert.ok(!H.isPurple(hex('#1e1b2e')), 'too dark to read as purple');

// WCAG luminance and the dark-by-default threshold
assert.equal(H.lum(hex('#ffffff')), 1);
assert.equal(H.lum(hex('#000000')), 0);
assert.ok(Math.abs(H.lum(hex('#808080')) - 0.2159) < 0.001);
assert.ok(H.lum(hex('#0b0b0b')) < 0.2 && H.lum(hex('#111111')) < 0.2);
assert.ok(H.lum(hex('#f4f1ea')) > 0.2);

// font family normalisation (next/font renames) and the ban list
assert.equal(H.family('__Space_Grotesk_a1b2c3, __Space_Grotesk_Fallback_a1b2c3'), 'Space Grotesk');
assert.equal(H.family('"Inter", system-ui'), 'Inter');
assert.ok(H.banned.test('Space Grotesk') && H.banned.test('Newsreader') && H.banned.test('IBM Plex Sans'));
assert.ok(!H.banned.test('IBM Plex Sans Arabic'), 'Plex Sans Arabic is allowed (conflicts.md)');
assert.ok(!H.banned.test('Inter') && H.soloOnly.test('Inter') && H.soloOnly.test('Geist'));
assert.ok(!H.soloOnly.test('Geist Mono') && !H.soloOnly.test('Interstate'));
assert.ok(H.arabicCommodity.test('Tajawal') && !H.arabicCommodity.test('Thmanyah'));
assert.ok(H.arabic.test('نسجة') && !H.arabic.test('Nasja 89'));
assert.ok(H.rtlLang.test('ar') && H.rtlLang.test('ar-PS') && !H.rtlLang.test('en'));

console.log('probe self-check: all assertions passed');
