# Repository Source of Truth

## Project Structure & Module Organization
This repository is a Codex workflow package, not an application runtime. Most work lives under `.codex/`:
- `agents/`: role briefs such as `architect`, `backend`, `frontend`, and `doc-planner`
- `rules/`: global constraints, delivery safety, and delegation boundaries
- `workflows/`: playbooks for `audit`, `think`, `forge`, `test`, `pr`, and `ship`
- `skills/`: reusable guidance packs, each defined by a `SKILL.md`
- `contexts/`: behavior overlays for research, implementation, and review

Start with `.codex/MANUAL.md`. Plans and audit artifacts are meant to land under `.orchestrator/` when work is substantial.

## Build, Test, and Development Commands
There is no native build or test harness at repository root. Use shell inspection to validate changes:

```sh
sed -n '1,200p' .codex/MANUAL.md
find .codex -maxdepth 2 -type f | sort
rg -n "\.codex|\.orchestrator|Conventional Commits|docs/" .codex AGENTS.md
```

Run commands from the repository root. Keep examples directly executable.

## Coding Style & Naming Conventions
This repo is Markdown-first. Prefer short headings, direct prose, and imperative instructions. Write repository documentation, prompts, workflows, and guidance files in English only. Keep filenames lowercase and kebab-case for workflows and skills, for example `.codex/workflows/ship.md`. Preserve YAML front matter where it already exists. Prefer ASCII unless the file already relies on Unicode.

## Testing Guidelines
No automated suite is configured here. Review contributions by checking internal consistency:
- referenced paths exist
- workflow names and role names match across manual, rules, and workflows
- examples reflect real repository conventions such as `.orchestrator/plans/YYYY-MM-DD-hh-mm-slug/`
- legacy directory names, hidden helper runners, or obsolete tool names are removed

Use `rg` to catch stale references before finishing.

## Commit & Pull Request Guidelines
Repository history is not available in this workspace, but the rules require Conventional Commits such as `feat(scope): summary`, `fix: summary`, `docs: summary`, and `chore: summary`. Keep PRs focused, explain why a workflow or rule changed, list affected files, and include sample prompts or commands when behavior changes. Update related docs in the same change.
