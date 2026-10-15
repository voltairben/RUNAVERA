# Phase 25: Code Review — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Review RUNAVERA's current production implementation for correctness, security, maintainability, and regressions; document evidence-backed findings without silently expanding into fixes owned by other phases.

**Architecture:** Review the checked-in application as a whole because the repository is on `main` and has no active feature diff or CodeRabbit configuration — confirmed directly: no `.coderabbit.yaml`/`.yml` anywhere in the repo, no `.github/` directory at all (so no CodeRabbit-via-Actions wiring either). The `gh` CLI isn't installed in this environment, so an open PR's existence on GitHub.com itself can't be positively confirmed or ruled out from this local checkout — Task 1 Step 1's "review that PR instead if one becomes the explicit target" framing already handles this ambiguity correctly, defaulting to the main-branch snapshot otherwise. In place of CodeRabbit, use this session's own installed `/code-review` skill (not the cloud `/code-review ultra` variant — that one is user-triggered and billed, and this plan's approval does not constitute that separate trigger) as the concrete "equivalent independent source review" mechanism for Task 2, at **high** effort, targeted at the Review Focus paths below (the skill accepts a path target, which fits since there's no diff or PR to point it at). Verify any finding against the actual code and existing phase evidence, then record findings and dispositions in the project documentation.

**Tech Stack:** Existing Next.js App Router, React, TypeScript, Tailwind CSS, next-intl, ESLint, and Prettier, plus this session's installed `/code-review` skill (no install, already available). No new package, CI integration, service, or review configuration is in scope.

**Spec:** `Roadmap/Roadmap.txt` Phase 25 row; `AGENTS.md` / `CLAUDE.md` project constraints and phase findings; current application source under `app/`, `components/`, `lib/`, `i18n/`, and `messages/`.

## Global Constraints

- Keep Phase 16 deferred; do not add backend, data services, forms, authentication, or booking/payment features.
- Preserve the fixed RUNAVERA palette, typography, layout, navigation, motion, logo, localization, and accessibility constraints in `AGENTS.md`.
- Do not change code, dependencies, review-provider settings, or CI configuration as part of this review phase.
- Do not re-open accepted limitations from Phases 17–24 unless new source evidence shows their recorded basis has changed.
- Do not claim coverage of real Safari keyboard behavior, iOS hardware, production deployment, or other explicitly unavailable environments.
- Do not invoke `/code-review ultra` (the cloud multi-agent variant) under this plan's authorization — that requires a separate, explicit user trigger and carries its own billing; this plan covers the plain `/code-review` skill only.
- Leave Phase 26 and every other roadmap status unchanged.

## Review Focus

- **Navigation and locale input:** invalid locale/route combinations should reach the documented not-found behavior, while valid EN/NL/DE routes and language-switch destinations remain coherent. Check route guards, generated params, and link construction.
- **Client interaction state:** Arrival dismissal, mobile-menu focus/scroll lifecycle, pillar selection, and View Transition behavior should not strand focus, scroll lock, or state across route changes. Trace event and cleanup paths against Phases 14, 19, and 21 evidence.
- **Untrusted content and URL handling:** rendered copy, route params, image sources, and external links should not introduce injection or unsafe navigation paths. Confirm any concern against actual use sites rather than framework patterns alone.
- **Responsive and localized layouts:** EN/NL/DE navigation and page composition should use the established breakpoints and layout tokens; distinguish current source defects from the already documented German tablet wrap and cross-engine boundary behavior.
- **Security and metadata drift:** current headers, dependency declarations, metadata fallbacks, and not-found handling should still match the completed Phase 23/24 records; do not infer deployment properties absent from the repository.

---

### Task 1: Establish review scope and evidence baseline

**Files:**
- Read: `Roadmap/Roadmap.txt`
- Read: `AGENTS.md`, `CLAUDE.md`
- Read: `app/`, `components/`, `lib/`, `i18n/`, `messages/`, `next.config.ts`, `package.json`, and `package-lock.json`

**Interfaces:**
- Consumes: current `main` checkout and completed Phase 17–24 records.
- Produces: an inventory of production routes, client interaction entry points, shared primitives, and prior accepted/unverified findings for review.

- [ ] **Step 1: Confirm the review target**

Record the checked-out commit, working-tree state, and whether a PR diff or CodeRabbit configuration exists. The planning baseline is `main` at `8a3e6d9`; recheck at execution rather than assuming it remains current. If a PR becomes the explicit target before execution, review that PR's complete diff and relevant surrounding code instead of treating the current main-branch snapshot as the target.

- [ ] **Step 2: Build a route and interaction inventory from source**

List every real localized route and the shared components/handlers that drive Arrival, Header/MobileNav, pillar navigation, language switching, metadata, and not-found behavior. Cross-reference those paths with the completed phase records so known limitations are not reported as newly discovered defects.

- [ ] **Step 3: Check available review surface**

Check whether CodeRabbit or an equivalent review integration is available and authorized for this repository (already confirmed absent — see Architecture above). Use this session's installed `/code-review` skill as the equivalent review integration for Task 2, at high effort, targeted at the paths listed in Review Focus — not the `--ultra` cloud variant. Do not install a plugin, create a PR, publish code, or change repository settings as a workaround.

**Deliverable:** a bounded review scope with known findings and environment limits clearly separated from new evidence.

### Task 2: Review implementation and validate candidate findings

**Files:**
- Review: production source paths inventoried in Task 1
- No source edits

**Interfaces:**
- Consumes: Task 1's route/interaction inventory and the five Review Focus areas.
- Produces: a list of candidate findings, each tied to exact file/line evidence, severity, reproduction or reasoning, and affected user behavior.

- [ ] **Step 1: Run `/code-review` at high effort against the Review Focus paths**

Invoke the installed `/code-review` skill (high effort, per the approved decision) targeted at `app/`, `components/`, `lib/`, `i18n/`, `messages/`, `proxy.ts`, and `next.config.ts` — the paths covering all five Review Focus areas. Capture its findings as candidates, not final conclusions; every one still goes through Step 4's independent verification below before being reported.

- [ ] **Step 2: Review route, locale, metadata, and not-found flows directly**

Trace valid and invalid route handling from `proxy.ts` and `i18n/` through `app/[locale]/` layouts/pages and catch-all routes. Confirm metadata ownership in the route modules and message lookups in all three dictionaries. Treat a candidate as a finding only when the current implementation contradicts expected behavior or the project constraints. This direct trace runs alongside Step 1's skill output, not instead of it — the skill may miss project-specific intent (e.g. the deliberate `global-not-found` rejection) that only the phase history makes legible.

- [ ] **Step 3: Review interactive component lifecycle and accessibility contracts directly**

Trace setup, event handling, and cleanup in Arrival, Header, MobileNav, PillarGroup, and shared link/button components. Check keyboard activation, focus restoration, dialog labeling/inertness, scroll-lock release, reduced-motion handling, and route-change behavior against the component code and the Phase 19/20/21/14 records. A prior report alone is not proof that a defect remains; verify current source and any available evidence.

- [ ] **Step 4: Review untrusted inputs, external destinations, assets, and security configuration directly**

Inspect the handling of route params and link destinations, any raw HTML/script mechanisms, image configuration, and response-header configuration. Compare dependency and header state to Phase 24's record. Do not perform live-target scanning or change package versions during review.

- [ ] **Step 5: Independently verify every candidate, from the skill and from direct review alike**

For every candidate (Step 1's skill output and Steps 2–4's direct findings), capture the smallest concrete code path or reproducible condition that demonstrates it. Check whether it is already documented, intentionally accepted, environment-specific, or disproven by current code. Drop unsupported or duplicate candidates; keep unresolved environment limitations in a separate section from confirmed defects.

**Deliverable:** evidence-backed findings only, with duplicate, stale, and unsupported tool suggestions excluded.

### Task 3: Record Phase 25 outcome and update project status

**Files:**
- Modify: `AGENTS.md`
- Modify: `CLAUDE.md`
- Modify: `Roadmap/Roadmap.txt`
- Create: `docs/superpowers/reports/2026-10-15-phase-25-code-review.md`

**Interfaces:**
- Consumes: Task 2's verified findings and review-surface result.
- Produces: an auditable review report, mirrored phase summary, and an accurate Phase 25 roadmap status.

- [ ] **Step 1: Write the review report**

Record review target and commit, reviewed paths, whether CodeRabbit/PR review was available, tools and evidence used (including that `/code-review` ran at high effort as the equivalent review integration, alongside direct manual tracing), verified findings with severity/location/impact, disproven or duplicate suggestions, accepted limitations, and unverified areas. If there are no confirmed findings, say so and state the review's scope and limits; do not imply that an absence of findings proves the site defect-free.

- [ ] **Step 2: Add matching Phase 25 summaries**

Add `## Code Review (Phase 25)` to both `AGENTS.md` and `CLAUDE.md`, keeping the substantive text identical apart from their existing agent-directory distinction. Link the report and summarize the actual reviewed scope, confirmed finding count and disposition, review method, and limitations. Do not add generic promises to fix issues in later phases.

- [ ] **Step 3: Update only Phase 25 roadmap status and current position**

Phase 25 is a review-only phase: its own completion is about whether the *review and report* are finished, not about whether every finding the review surfaces has already been fixed. Set Phase 25 to `COMPLETE` once the review and report are finished and every candidate finding has a documented disposition (confirmed-and-recorded, disproven, duplicate, already-documented, or accepted limitation) — an unresolved defect does not keep Phase 25 itself at `NOT STARTED`. For any confirmed, unresolved defect, record it in the report with which later phase or follow-up it belongs to, without fixing it here and without changing that other phase's own status. Update the current-position paragraph with evidence-backed results and preserve Phase 26, Phase 21's Safari/WebKit unverified follow-up, and all accepted security limitations.

- [ ] **Step 4: Check documentation consistency**

Review the complete documentation diff for matching summaries, correct links, preserved Phase 26 status, no stale claims, and no source/config changes. Confirm the report separates confirmed findings from accepted limitations and unverified coverage.

**Deliverable:** a review report with traceable evidence and a Phase 25 status that reflects the actual completion criteria.

## Plan Self-Review

- **Spec coverage:** the plan covers Phase 25's CodeRabbit/PR-review focus, a no-PR current-main fallback (confirmed via direct checks: no CodeRabbit config, no `.github/`), the installed `/code-review` skill as the concrete substitute mechanism (high effort, per approved decision, distinct from the separately-gated `--ultra` cloud variant), finding validation, documentation, and status reporting. Phase 26 and prior-phase follow-ups remain outside scope.
- **Placeholder scan:** all review areas, paths, outcomes, and phase-status rules are named; there are no TBD/TODO implementation steps.
- **Type/interface consistency:** Task 1 produces the inventory consumed by Task 2; Task 2's findings (skill output plus direct review, both independently verified) feed Task 3's report and status decision.
- **Review Focus coverage:** each of the five listed failure areas is explicitly traced in Task 2, both via the skill and via direct tracing; this is a review phase, so it adds no tests or test files.
