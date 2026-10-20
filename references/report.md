# Subagent prompts and the merged report

## Subagent prompt template (one lane per agent, run in parallel)

Give each agent the purpose, not just the query. Fill in the `<…>` parts:

```
You are reviewing <site/surface> through the lens of <skill(s)> (~/.claude/skills/<name>/; read SKILL.md and every supporting file it references for this task).
READ-ONLY on project source: do not edit anything under <project root>. Write only to <scratchpad>/reviews/<lane>.md.
Context: <stack>, <locale/direction>, <surface classes from design-arsenal §3>, dev server at <url> (do not stop it; don't drive existing browser tabs; launch your own headless browser only if the skill ships a script for it).
Screenshots: <paths> (desktop 1440, mobile 390 viewport slices).
Codebase rule: <graphify query first if graphify-out/ exists, else explore normally>.
Tasks:
1. In 5 bullets: what this skill offers and how to use it best on this project.
2. Apply the skill's own procedure and rubric; give its verdict/score in its own format.
3. Findings ranked by user impact, each with file:line and an exact fix (values, code).
4. Mobile/touch findings separately.
5. What you could not verify (real device, flows needing data).
Return ≤350 words: capabilities, verdict, top 8–10 findings (one line each, file:line), report path.
```

## Critic subagent (the taste-critique gate; fresh context every round)

```
You are a design juror who did not build this. Score it; do not fix it.
Rubric: ~/.claude/skills/design-taste-frontend/references/critique.md §2–4 (weights, caps, write-up shape). Apply every cap.
Calibration: real Sites of the Day land around 7.5–8.0; an honest 8.5 is rare. First score these anchors blind: <2 reference screenshots from the references-first step>, then <the previous round's screenshots + scores, if any>.
Screenshots of the work: <paths, every verify width, several scroll depths>. Live URL to interact with: <url>.
Measured facts (not up for debate): <lint/inspect/probe fail lines, grep hits>.
Return the ROUND block from critique.md §4: scores, caps applied, and only the top 3 problems, each with the screenshot and position. Do not talk yourself out of a problem you found; if you saw it, it counts.
```
Use a frontier model (Opus) for the critic; small judges are erratic. One critic per round, never the builder's context.

Lane → model: impeccable critique/audit **Opus**; taste **Opus**; apple + mobile **Opus**; Emil motion **Sonnet**; break-ui **Sonnet**; digests and searches **Haiku/Sonnet**.

Reminders for each lane's prompt:
- Emil motion: also read the manual-only `review-animations/SKILL.md` + `STANDARDS.md`.
- break-ui: say "report only, no toggle" when the job is review-only.
- taste: name the run (page vs `--app`) per surface; ask for the best-fit directions from `draw.mjs --options 3` without writing source.
- impeccable: the critique needs a target per surface; tell it the user is absent, so it should skip the interview and label its assumptions.

## Merged report (what the user sees)

```
# <Site> design review — <date>

## Verdicts
| Lane | Instrument | Score / verdict |
| impeccable critique | Nielsen /40 | 25/40 Acceptable |
| impeccable audit | /20 | 12/20 Acceptable |
| design-taste | critique.md + inspector | 5.7/10, 8 FAIL home |
| Emil motion | review-animations | Block |
| mobile-native + apple | checklist | 9/18 PASS |
| probe + devices | probe fail lines × verify widths; real-device pass | 0 FAIL at 360–1440; real device: not done |
| break-ui | worst case | 33 findings (n Broken) |

## Top fixes (ranked by user impact; mobile weighted up)
| # | Sev | Where (file:line) | Problem | Fix (exact) | Lanes agreeing |

## Direction recommendation (taste + rubric scores from router.md) — only if a redesign is on the table
## Motion plan (Emil) — keep / fix / add / delete
## Mobile checklist — PASS/FAIL table
## Not verified
## Next step options (pipelines C/D/E from design-arsenal)
```

Rules:
- Deduplicate across lanes. If 3 lanes flag the same thing, it's one row with 3 in "Lanes agreeing", ranked higher.
- Severity is P0–P3, using impeccable's definitions: P0 blocks a task; P1 is major, or a WCAG AA failure.
- Give exact values (px, ms, cubic-bezier, hex/oklch) and `file:line` on every fix.
- Never report a check you didn't run. Name the screenshot or tool behind each claim when it isn't obvious.
