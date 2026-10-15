# Phase 26: Final Visual / UX Review — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task by task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete RUNAVERA's final visual and UX review, resolve the two confirmed visual inconsistencies assigned to Phase 26, and document the review evidence and remaining limits.

**Architecture:** Review the production build across the real page shapes and three locales, using screenshots and focused browser interaction checks. Correct the homepage closing CTA's missing eyebrow and the German tablet navigation wrap if the recorded issue still reproduces. Inspect the Phase 14 heading morph in WebKit at normal speed, for visible and off-screen headings, and with reduced motion enabled; report any newly discovered issues without expanding this phase into unrelated fixes.

**Tech Stack:** Existing Next.js App Router, React, TypeScript, Tailwind CSS, next-intl, and the browser engines already used for project verification. No new dependency, design library, animation library, or persistent screenshot/test harness.

**Spec:** `Roadmap/Roadmap.txt` Phase 26 row and Phase 14 follow-up; `AGENTS.md` / `CLAUDE.md` design, responsive, motion, and accessibility constraints; Phase 20's German tablet navigation finding; Phase 25 report finding 4 and the reviewed route inventory.

## Global Constraints

- Keep Phase 16 deferred and do not add backend, forms, authentication, booking, payment, or user-account functionality.
- Preserve RUNAVERA's fixed palette, type scale, semantic spacing, 768px tablet / 1200px desktop breakpoints, layout primitives, restrained motion, and primary supplied logo.
- Do not move the desktop navigation collapse boundary from 768px to 1200px to hide the German wrap; solve the measured tablet-width layout issue within the existing breakpoint system.
- Use existing design tokens and components; do not add new palette colors, arbitrary design tokens, animation libraries, or generalized layout abstractions.
- Keep the Phase 25 error-boundary, retry, mobile-menu focus, matcher, breakpoint-constant, and not-found metadata findings outside this visual/UX phase. Record them only if needed to identify follow-up ownership; do not fix them here.
- Keep the Phase 21 TalkBack and skip-link findings as previously recorded. Do not claim real Safari keyboard, iOS hardware, TalkBack, or deployed-production coverage from browser simulation.
- Do not change any other phase status or rewrite historical phase findings. Phase 26's status changes only after this review and its report are complete.
- Store temporary screenshots/video outside the repository; do not add visual evidence binaries or durable test tooling to the project.

## Review Focus

- **Route and locale layout:** all nine valid page shapes should remain legible and composed in EN, NL, and DE; headings, body copy, image crops, attribution, navigation, and CTAs should not clip or overlap.
- **Tablet navigation:** long German labels should remain on one line and the header should not overlap or create horizontal page overflow from 768px through 1199px; desktop spacing returns at 1200px.
- **Responsive hierarchy and section rhythm:** the homepage and interior page layouts should preserve the established typography, alignment, spacing, and clear CTA hierarchy at mobile, tablet, and desktop widths.
- **Motion and reduced motion:** visible-heading morph should be legible at normal speed in WebKit; off-screen selection should use the documented no-morph fallback without scrolling or cross-fade; reduced-motion preference should remove perceptible transition delay without blocking navigation.
- **Closing CTA consistency:** the homepage closing CTA should match the three equivalent pages by showing the existing translated `Common.ctaEyebrow` above its heading.

---

### Task 1: Establish review baseline and route matrix

**Files:**
- Read: `Roadmap/Roadmap.txt`, `AGENTS.md`, `CLAUDE.md`
- Read: `docs/superpowers/reports/2026-10-15-phase-25-code-review.md`
- Read: `app/[locale]/`, `components/`, `i18n/`, `messages/`, and `app/globals.css`

**Interfaces:**
- Consumes: Phase 20 responsive findings, Phase 14 motion evidence, Phase 25's CTA finding, and the current production implementation.
- Produces: a fixed route/locale/viewport checklist and a baseline record distinguishing known issues from new findings.

- [ ] **Step 1: Confirm the target and status**

Record branch, commit, working-tree state, current Phase 26 status, and the available browser engines. Do not treat unrelated untracked historical plan/report files as Phase 26 changes. Use the current checked-in commit at execution time, not the Phase 25 review's earlier SHA.

- [ ] **Step 2: Build the valid-route matrix**

Review these nine page shapes in each of EN, NL, and DE: homepage (`/`), about, experiences index, four experience details (`escapes`, `explore`, `private`, `gather`), Maasplassen, and plan. Also review a localized not-found route in NL and DE plus the true root not-found route `/api/phase26-not-found-probe`. Confirm the exact localized paths from `i18n/routing.ts` rather than hand-adding locale prefixes.

- [ ] **Step 3: Fix the review viewports**

Use 390×844 for mobile and 1440×900 for desktop across the route matrix. For the German navigation specifically, inspect 768px, 769px, 850px, 950px, 1000px, 1199px, and 1200px at 900px height; capture English at 850px as a control. The 768/769 pair is included because prior Firefox testing confirmed its exact breakpoint rounding difference.

- [ ] **Step 4: Record known issues and exclusions**

Mark the Phase 20 German tablet wrap, the Phase 25 homepage CTA eyebrow omission, and the Phase 14 WebKit morph follow-up as assigned Phase 26 work. Mark the other Phase 25 code findings and Phase 21 assistive-technology findings as out of scope. Do not reclassify a previously documented issue as newly discovered without fresh evidence.

**Deliverable:** a bounded review matrix with baseline state and known findings identified.

### Task 2: Inspect the production UI and motion behavior

**Files:**
- Review: the routes and components listed in Task 1
- No source edits

**Interfaces:**
- Consumes: Task 1's route/locale/viewport matrix.
- Produces: screenshot/video evidence and a list of observed visual/UX issues with route, locale, viewport, and reproduction steps.

- [ ] **Step 1: Build and serve the production version**

Run `npm run build`, then serve that production build locally using the project's established `next start` workflow. Record browser names/versions and viewport dimensions. Keep any temporary browser scripts and screenshots outside the repository and remove them after the review.

- [ ] **Step 2: Inspect every route shape and locale**

For every route in the matrix, inspect the initial viewport and scroll through the full page at the specified mobile and desktop sizes. Check for clipped or overlapping text, unexpected wraps, inconsistent section spacing, unreadable photo attribution, broken image crops, missing or duplicated section labels, and CTAs that do not follow the page's established hierarchy. Record screenshots for any defect; do not create findings from taste alone where the design system or phase history already explains the choice.

- [ ] **Step 3: Inspect mobile and desktop navigation states**

At 390×844, inspect the closed header, opened mobile takeover, visible close control, localized labels, and close-on-navigation behavior. At desktop sizes, inspect all three localized navs, active-route styling, CTA placement, scroll-shrink, and the transparent-media homepage header. This is visual regression coverage only; do not claim it re-resolves Phase 21's TalkBack or Safari keyboard findings.

- [ ] **Step 4: Inspect the WebKit pillar morph at normal speed**

At 1280×800 and 390×844, run the production build in the available WebKit engine at normal playback speed with the chosen pillar heading visible at click. Record the visible heading moving/resizing into the detail heading, whether a whole-page cross-fade appears, and whether duplicate glyphs or header/body artifacts occur. Save a short recording if the browser tooling supports it. Report the result as WebKit evidence; call it Safari evidence only if actual Safari is available and used.

- [ ] **Step 5: Inspect the documented off-screen and reduced-motion cases**

For the off-screen case, place the chosen heading outside the viewport while leaving its link available, activate the link without browser automation scrolling the heading into view, and confirm navigation completes with no morph, no cross-fade, and no automatic scroll. With `prefers-reduced-motion: reduce` enabled in WebKit, repeat a visible-heading navigation and confirm it completes without perceptible animation delay or a stuck transition. Treat the off-screen no-morph behavior as intentional, as documented in Phase 14.

**Deliverable:** reviewed route/locale coverage and direct evidence for the two known visual issues and all three morph cases.

### Task 3: Resolve the assigned visual inconsistencies

**Files:**
- Modify if still needed: `app/[locale]/page.tsx`
- Modify if still needed: `components/DesktopNav.tsx`
- No translation-dictionary changes are expected; the CTA uses the existing `Common.ctaEyebrow` message in all locales.

**Interfaces:**
- Consumes: Task 2 evidence for the homepage CTA and German tablet navigation.
- Produces: consistent translated closing CTA treatment and a non-wrapping German tablet nav that fits without changing the breakpoint or causing overflow.

- [ ] **Step 1: Add the established eyebrow to the homepage closing CTA**

In `app/[locale]/page.tsx`, insert `<Eyebrow>{tCommon("ctaEyebrow")}</Eyebrow>` immediately before the existing closing CTA `<h2>` in the section labelled `Closing CTA`. Reuse the existing `Eyebrow` import and translation call; do not add a new message or change the CTA heading/button copy.

The resulting section opening should be:

```tsx
<Container size="wide" className="flex flex-col items-start gap-content">
  <Eyebrow>{tCommon("ctaEyebrow")}</Eyebrow>
  <h2 id="cta-heading" className="text-h3 max-w-[65ch] text-limestone">
    {tCommon("ctaHeading")}
  </h2>
  <Button variant="secondary" href="/plan">
    {tCommon("ctaButton")}
  </Button>
</Container>
```

- [ ] **Step 2: Tighten only the tablet navigation spacing**

If Task 2 confirms the German wrap remains, update `components/DesktopNav.tsx` to use the existing `gap-tight` spacing at tablet widths for both the outer nav grouping and the primary-link list, restoring the current `gap-component` and `gap-content` values at `desktop:`. Add `whitespace-nowrap` to the primary-link list so a label cannot break mid-word. Keep the 768px tablet breakpoint and all nav labels, font sizes, and destinations unchanged. If the baseline shows that this precise spacing change creates overlap or horizontal page overflow at any target width, do not add a second speculative redesign; record the constraint and leave the remaining nav issue for an explicitly scoped follow-up.

Use these class strings on the existing elements:

```tsx
<div className="hidden items-center gap-tight tablet:flex desktop:gap-component">
  <ul className="flex items-center gap-tight whitespace-nowrap text-nav desktop:gap-content">
```

- [ ] **Step 3: Review the resulting visual hierarchy**

Revisit the homepage closing CTA on EN/NL/DE at mobile and desktop sizes; confirm the eyebrow uses the existing Mist token and the additional line does not collide with the heading or button. Revisit German navigation at every width in Task 1 Step 3 and English at 850px; confirm the labels stay intact, the header does not overlap, there is no horizontal page overflow, and the desktop `gap-component`/`gap-content` spacing is restored at 1200px.

**Deliverable:** the Phase 25 CTA finding resolved and the German nav issue resolved if the evidence supports the specified token-based adjustment, with before/after screenshots.

### Task 4: Record Phase 26 results and update status

**Files:**
- Create: `docs/superpowers/reports/2026-10-15-phase-26-final-visual-ux-review.md`
- Modify: `AGENTS.md`
- Modify: `CLAUDE.md`
- Modify: `Roadmap/Roadmap.txt`
- Modify only if needed by Task 3: `app/[locale]/page.tsx`, `components/DesktopNav.tsx`

**Interfaces:**
- Consumes: Task 2's visual findings and Task 3's verified corrections.
- Produces: an evidence-backed Phase 26 report, mirrored project records, and a Phase 26 roadmap status consistent with actual work.

- [ ] **Step 1: Write the Phase 26 report**

Record commit/browser/build information, the route and locale matrix reviewed, viewports covered, screenshots/video evidence locations (outside the repository), each finding and disposition, the homepage CTA change, the German nav result (including if it was not reproduced or remained unresolved), and the visible/off-screen/reduced-motion WebKit results. State clearly that automated visual comparison, real Safari hardware, iOS hardware, and TalkBack were not covered unless actually performed. Do not claim a certification or production-deployment review.

- [ ] **Step 2: Resolve the roadmap's Phase 14 visual follow-up**

Replace the Phase 26 pending text under `PHASE 14 FOLLOW-UP CHECKS` with a Phase 26 result that describes what the WebKit visible-heading, off-screen, and reduced-motion checks actually showed. Mark the visual follow-up resolved only if all three cases were inspected and documented; preserve the intentional off-screen no-morph behavior. Leave the Phase 21 Safari/WebKit keyboard follow-up explicitly unverified.

- [ ] **Step 3: Add the matching Phase 26 summary**

Add `## Final Visual / UX Review (Phase 26)` to `AGENTS.md` and `CLAUDE.md` with identical substantive wording, apart from existing agent-directory references. Link the report and summarize actual browser/route coverage, visual corrections, unresolved findings, and unavailable device/browser coverage. Update `Current phase` in both files to mark Phase 26 complete only if the review report and required checks are complete.

- [ ] **Step 4: Update only Phase 26 and its assigned follow-up text in the roadmap**

Change Phase 26 from `NOT STARTED` to `COMPLETE` only after Tasks 1–4's review, corrections, and report are complete. Update the current-position paragraph to include the Phase 26 result. Keep Phases 0–25, Phase 16's deferred status, and every unrelated follow-up/status unchanged. If an in-scope visual finding remains unresolved, document it and its owner; do not imply that Phase 26 fixed it.

- [ ] **Step 5: Check the final documentation and code diff**

Review the full diff for scope. Confirm any application-code changes are limited to `app/[locale]/page.tsx` and `components/DesktopNav.tsx`, all other findings remain documented for their own follow-ups, mirrored summaries match, Phase 26 is marked complete only with evidence, Phase 21's unverified item remains unchanged, and no screenshots, temporary scripts, new dependencies, or unrelated files were added. Run `git diff --check` and inspect the complete diff.

**Deliverable:** a complete final visual/UX review with an auditable report, only the assigned visual corrections, and an accurate Phase 26 roadmap record.

## Plan Self-Review

- **Spec coverage:** covers Phase 26's final visual/UX review, Phase 14's WebKit morph follow-up, Phase 20's German tablet wrap, and Phase 25's homepage CTA finding. Other Phase 25 and Phase 21 findings remain outside this phase.
- **Placeholder scan:** all route shapes, locales, viewport dimensions, visual states, owned files, completion conditions, and scope limits are explicit; no TBD/TODO steps remain.
- **Interface consistency:** Task 1's matrix feeds Task 2; Task 2's findings feed Task 3's two scoped corrections and Task 4's report/status decision.
- **Review Focus coverage:** route/localization, tablet nav, section hierarchy, motion/reduced motion, and CTA consistency are each covered by named visual checks. The phase introduces no automated test suite or durable screenshot harness.
