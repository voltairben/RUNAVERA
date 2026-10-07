# Phase 18 Design: RUNAVERA Reality Check

**Status:** Proposed for review  
**Phase:** 18 — Reality Checker passes

## Goal

Perform a skeptical, evidence-based cross-cutting check that the site built through Phases 0–17 still coheres as a whole, while leaving all site findings for the roadmap phases that own them or for a post-roadmap refinement pass.

## Context

RUNAVERA is a static, code-owned-content portfolio built with Next.js 16 App Router, React, TypeScript, Tailwind CSS, and next-intl. Phases 0–15 and 17 are complete; Phase 16 is deliberately deferred. The Quality & Launch roadmap assigns functional testing, mobile/responsive verification, accessibility, performance, SEO, final security review, code review, and final visual/UX review to Phases 19–26.

The current Reality Checker definitions in `.claude/agents/testing-reality-checker.md` and `.codex/agents/testing-reality-checker.toml` are generic boilerplate for another project. They refer to Laravel/static HTML, a nonexistent QA screenshot script and output directory, a QA agent/phase absent from this roadmap, and a Contact Form that RUNAVERA explicitly does not have. The profiles also require arbitrary grades and production-readiness certification before the remaining quality phases have run.

## Decision

Phase 18 is a report-only, cross-cutting coherence review plus a project-specific correction of the two Reality Checker profiles. It will inventory the real routes across supported locales, smoke-check selected shared flows, and identify meaningful drift between the implementation, rendered site, and project documentation. It will not perform the detailed specialist testing assigned to Phases 19–26.

The profiles will keep their skeptical, evidence-first approach while removing unsupported commands, nonexistent workflows, arbitrary quality grades, and any production-readiness verdict. The review report will record findings and route them to a later roadmap phase or a post-roadmap refinement decision.

## Scope

- Update `.claude/agents/testing-reality-checker.md` and `.codex/agents/testing-reality-checker.toml` together. Align both with the actual RUNAVERA stack, static code-owned content, locale routing, and explicit absence of forms/backend features.
- Derive a route/locale inventory from `i18n/routing.ts`, the app routes, and `lib/pillars.ts`. Check that the site's real pages render with expected page identity/content and without obvious server, browser-console, or runtime errors. Include not-found behavior where applicable.
- Smoke-check cross-cutting integration seams: Arrival and Header reveal; navigation and locale switching; and a pillar choice reaching its matching detail page. Keep the checks shallow and focused on whether the combined site still coheres.
- Compare important current-state claims in the implementation, rendered site, `CLAUDE.md`, `AGENTS.md`, and `Roadmap/Roadmap.txt`. Report concrete drift with evidence; do not perform a line-by-line re-audit of completed phases.
- Produce a written report at `docs/quality/phase-18-reality-check.md`. Findings include severity, evidence/location, user impact, confidence, and a recommended roadmap owner or post-roadmap disposition. Temporary screenshots or other evidence may be captured when they substantiate a finding; no screenshot corpus is committed.
- After the review is complete, update the Phase 18 status/summary in project documentation and the roadmap to reflect only work actually completed.

## Boundaries

- No application, content, design, or site behavior fixes in Phase 18. Even small safe fixes are recorded for a later approved phase or post-roadmap refinement.
- No new product feature, dependency, test framework, durable screenshot pipeline, or committed screenshot collection.
- No detailed functional, mobile-device, accessibility, performance, SEO, or security audit; those belong to Phases 19–24. Do not substitute the cross-cutting smoke checks for those phases.
- No CodeRabbit/PR review or final visual/UX review; those remain Phases 25 and 26.
- No arbitrary letter/number quality rating and no production-readiness certification while Phases 19–26 remain incomplete.
- Do not add optional site polish or new site scope during the quality/launch sequence. Complete the roadmap phases first; revisit optional changes afterward using the findings and the user's direction.
- Keep Phase 16 deferred, Phase 17 complete, and all Phase 19–26 statuses unchanged until their own work is approved and completed.

## Completion Criteria

1. Both Reality Checker profiles are updated and synchronized, with no Laravel/static-HTML assumptions, nonexistent QA pipeline/agent, Contact Form journey, arbitrary grade, or premature production-readiness certification.
2. The report lists the actual route/locale coverage derived from the repository and records the selected shared-flow smoke checks with observable evidence.
3. Each reported issue includes a precise location or route, reproducible evidence, user impact, confidence, and a recommended owner phase or post-roadmap disposition. Unverified suspicions are labeled as such, not stated as findings.
4. The review distinguishes shallow cross-cutting checks from the specialized work reserved for Phases 19–26.
5. No site fixes, new features, or permanent screenshot artifacts are introduced. Temporary evidence and tooling are removed after the review.
6. Project documentation and the roadmap record Phase 18 as complete only after the profile update and report are complete; later phase rows remain unchanged.

## Phase Boundary

This design authorizes creation of an implementation plan after the written design is reviewed. It does not authorize implementation. Phase 18 may update its two agent profiles and record its review report/status, but all site findings remain deferred until the roadmap phase that owns them or the post-roadmap refinement period.
