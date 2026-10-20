# design-arsenal

A Claude Code skill that orchestrates every installed design skill into one zero-AI-slop pipeline, for any target: marketing site, store, web app, PWA, native iOS/Android, or one adaptive design across devices (including Arabic/RTL).

- Routes work through [impeccable](https://github.com/pbakaus/impeccable), [taste-skill / design-taste-frontend](https://github.com/Leonxlnx/taste-skill) and [Emil Kowalski's skills](https://github.com/emilkowalski/skills), each in its own lane, and settles their conflicts with one rule set.
- Versioned slop kill list (`references/slop.md`), including second-order "tasteful" defaults.
- Measured gates: grep checks plus a browser probe (`assets/probe.js`) for purple accents, dark-by-default, banned fonts, image count, Arabic tracking, input zoom, touch targets, overflow, and missing `dir`.
- Cross-device verification matrix and known-bug list (`references/devices.md`); Arabic/RTL and apparel rules (`references/rtl.md`).

## Install

```sh
git clone https://github.com/IzzeddinAlbzour/claude-skill-design-arsenal ~/.claude/skills/design-arsenal
```

Install the orchestrated skills too; design-arsenal calls them and degrades without them.

## Test

```sh
node assets/probe.test.js
```

Items marked "verify" in the references come from research that couldn't be confirmed. Check them before relying on them.
