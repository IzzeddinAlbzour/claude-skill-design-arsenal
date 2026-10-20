# Exact commands

Run from the **project root**. In Git Bash on Windows, `~` works. Set:
```bash
IMP="sh $HOME/.claude/skills/impeccable/scripts/impeccable"     # Windows cmd: %USERPROFILE%\.claude\skills\impeccable\scripts\impeccable.cmd
TASTE="$HOME/.claude/skills/design-taste-frontend/scripts"
```
Add `.impeccable/` and `.taste-skill/` to `.gitignore` (or `.git/info/exclude` if the user doesn't want the tracked file changed).

## impeccable engine
```bash
$IMP context [--target <path>]          # once per session; follow its directives
$IMP signals                            # JSON: setup, critique.latest, git.changedFiles, devServer, scan.targets
$IMP detect --json src/                 # static scan (TSX = regex only; an undercount)
$IMP detect --json --viewport 390x844 http://localhost:3000/   # rendered scan (needs browser)
$IMP detect --json --scope type,layout <target>
$IMP critique-storage slug "<target>"   # then write/trend/latest/close, used by critique and polish
$IMP hooks status|on|off                # post-edit detector hook
$IMP doctor --json                      # drift report
```
Exit codes for `detect`: 0 clean, 1 a target couldn't be scanned, 2 findings. With `--json` the output goes to stdout as an array of `{antipattern, severity, category, file, line, snippet}`.

## design-taste-frontend
```bash
# direction (page)
node $TASTE/draw.mjs --sector ecommerce --brief "<one line>" --sections showcase,gallery,about,faq,footer \
  [--tone warm] [--have product-photo,photography] [--keep palette,type] --options 3
node $TASTE/draw.mjs <same args> --direction <chosen-id>      # writes .taste-skill/direction.json
node $TASTE/draw.mjs --show | --redraw hero|type|palette|photos|section:<role>|direction | --alternatives <role> | --list sectors|directions|roles|tones
# direction (app screen)
node $TASTE/draw.mjs --app --kind commerce --brief "<one line>" --screens list,detail [--theme light] [--keep palette,type] --options 3
node $TASTE/draw.mjs --app ... --style <id>
# gate
node $TASTE/lint.mjs src/ [--app] [--json]                    # exit 1 on FAIL
node $TASTE/inspect.mjs http://localhost:3000/ [--widths 1440,768,390] [--app] [--allow rule,rule] [--film] [--out .taste-skill/inspect] [--json]
node $TASTE/scenes.mjs <url>                                  # only with scroll scenes
# imagery
node $TASTE/assets.mjs "<inventory query>" [--orientation portrait] [--min-width 1200] [--limit 5]
node $TASTE/assets.mjs "<query>" --video
node $TASTE/assets.mjs --get <ref> --to public/<site>/found     # records credits.json
node $TASTE/assets.mjs --credits --to public/<site>/found
```
`inspect.mjs` exit codes: 0 no FAIL, 1 FAIL, 2 usage error. Screenshots land in `.taste-skill/inspect/`; open them all. `TASTE_SKILL_HISTORY=<path>` isolates the draw history in tests.

## Probe
`assets/probe.js` measures the slop gates the other meters miss, in any UI state (drawer open, cart full) the inspector can't reach. Paste the whole file as the `function` argument to chrome-devtools `evaluate_script` at each verify width (emulate `390x844x2,mobile,touch` for the coarse-pointer target rule). It returns `fail` lines first: purple accent, dark by default, banned fonts (by share of rendered text), unique images deduped by src (with reuse), Arabic tracking/italic, inputs under 16px, small targets (44px coarse, 24px fine; counts pseudo-element hit-area growth, exempts inline links), horizontal overflow, RTL `lang` without `dir`, text under 13px, focusables inside `aria-hidden` (`inert` is correct), dialogs without `aria-modal`. Detail lists follow. Check the maths after editing it: `node assets/probe.test.js`.

## Gotchas from real runs
- **Split lint by surface class.** Run `lint.mjs <page files>` (page rules) and `lint.mjs --app <app-screen files>` (designer, cart, checkout, dashboard). A single page-mode run over `src/` reports app-legit borders and shadows as FAILs. Mark a floating bar's single shadow with a `taste-skill-ignore` comment and the reason.
- **Pages fail `still-page` (<8 moving elements) unless a reveal layer exists.** Add one small IntersectionObserver reveal component. Its hidden state lives only under `html.js` + `(prefers-reduced-motion: no-preference)`, it fires once, and it varies the manner by content type (headings rise, cards stagger, pictures clip-reveal).
- **Inspector `eyebrow` catches hero kickers** ("Collection · 2027" above the h1). Move the line under the headline as the supporting sentence.
- **Inspector `gradient` flags photo scrims too.** Use a flat `bg-black/45` band behind the text area instead.
- **The probe cannot judge "open" by visibility.** Off-canvas drawers stay in the DOM, translated off-screen. Check the state the app exposes (`inert` removed, `aria-hidden="false"`, or the toggle's `aria-expanded`) before you conclude a drawer opened.
- **Don't edit regexes with shell `sed`.** The shell layer can eat backslashes (`\u200d` → `200d`). Use the Edit tool, and never paste literal zero-width characters into source; write escapes. (fallback, or for review agents)
Use chrome-devtools MCP (`emulate` viewport `390x844x2,mobile,touch`, then `take_screenshot`) or claude-in-chrome. Take viewport shots at several scroll offsets; full-page mobile captures shrink to an unreadable strip.

## Emil skills
No CLIs. `improve-animations` writes `plans/NNN-slug.md` + `plans/README.md` (or `animation-plans/` if `plans/` is taken). `break-ui` adds a dev-only `?data=worst` toggle and fixture; delete it or keep it as a regression fixture, as the user decides.
