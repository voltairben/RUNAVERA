# Phase 26: Final Visual / UX Review — Report

**Review target:** `main` at commit `8a3e6d9` at review start (the same baseline Phase 25 reviewed; `CLAUDE.md`/`AGENTS.md`/`Roadmap.txt` carried uncommitted Phase 25 write-up changes in the working tree throughout, which this review did not touch beyond its own assigned edits).

**Build/serve:** `npm run build` + `npm start` on port 3100 for all route/locale/viewport and nav checks. WebKit's pillar-morph checks (Task 2 Steps 4–5) hit `net::ERR_SSL_PROTOCOL_ERROR`/`SSL connect error` against that production build — the same already-documented `upgrade-insecure-requests`-breaks-WebKit limitation Phases 18–21 recorded, not a new defect. Per that established precedent, those three checks only ran against `npm run dev` on port 3101 instead, exactly as Phase 19/21 did for the same reason.

**Tools:** a temporary Playwright script in the scratchpad (outside the repository, removed after this review — no new project dependency), reusing Chromium/Firefox/WebKit already cached on this machine from prior phases (`C:\Users\benni\AppData\Local\ms-playwright`). Screenshots were written to the scratchpad and inspected directly; none were committed.

---

## Route and locale matrix (Task 1 Step 2–3, Task 2 Steps 1–2)

All nine page shapes (`/`, `about`, `experiences`, the four experience details, `maasplassen`, `plan`) in EN, NL, DE — 54 combinations at 390×844 and 1440×900 — plus a localized not-found in NL and DE and the true root not-found via `/api/phase26-not-found-probe`: **57/57 checks clean**. Zero horizontal overflow (`document.documentElement.scrollWidth` never exceeded the viewport width), zero broken images (`naturalWidth === 0`), correct `<html lang>` on every locale, and correct per-route translated titles on every page including both not-found boundaries (confirmed still working post-Phase 23/25: e.g. `/nl` → "Pagina niet gevonden | RUNAVERA", `/api/phase26-not-found-probe` → "Page not found | RUNAVERA", `hasHeader: false`). Visual spot-check of the homepage across all three locales (full-page screenshots) showed clean spacing, no clipping or overlap, legible attribution, and consistent pillar-hairline indentation in every locale, including the longer German hero copy.

No new layout defects were found in this matrix beyond the two already-assigned findings below. Nothing here contradicts or reopens any Phase 18–21 finding.

## Tablet navigation (Task 1 Step 3, Task 2 Step 3, Task 3 Step 2) — RESOLVED

**Baseline, before the fix:** at 768/769/850/950px (German, `/de/about`), the nav `<ul>` wrapped to two lines (confirmed via per-link bounding-box `top` coordinates differing, and visually: "Die Maasplassen" and "Über RUNAVERA" each broke across two lines). Wrapping stopped at 1000px+, matching Phase 20's own prior measurement exactly. **New nuance found in this baseline, beyond Phase 20's original German-only framing:** the English control at 850px (`/about`) also wrapped — "The Maasplassen" broke across two lines — and in both locales the nav CTA button's own text also wrapped ("Plan your experience" → "PLAN YOUR" / "EXPERIENCE"; "Erlebnis planen" → "ERLEBNIS" / "PLANEN"). The underlying cause (no `white-space: nowrap` on the nav list, squeezed flex width) affects both locales at this range — German's longer compound-style words just break more jarringly (mid-word) than English's two-word phrase (between words).

**Fix applied** (`components/DesktopNav.tsx`): tightened the outer nav-grouping gap and the primary-link-list gap from `gap-component`/`gap-content` to the existing `gap-tight` token at tablet widths only, restoring both original values at `desktop:` (1200px+), and added `whitespace-nowrap` to the primary-link list. No new token, no breakpoint change, no label/destination change — exactly the smallest fix Phase 20's own diagnosis pointed at.

**Post-fix, re-verified at all 8 widths (768, 769, 850, 950, 1000, 1199, 1200px German + 850px English control):** zero wrapping and zero horizontal overflow at every single width, both locales. Visual confirmation at 768/850/1200px: all three labels stay on one line, no overlap with the language switcher or CTA button, and the CTA button text itself now also renders on one line at 850px — resolved as a direct side effect of the freed-up space, with no separate change needed. Desktop (1200px+) spacing is visually unchanged from before the fix (the `desktop:` variants restore the original `gap-component`/`gap-content` values exactly). A full re-run of the 57-route baseline after this change found no regression anywhere else on the site (every page's header uses this same component).

## Closing CTA consistency (Task 1 Step 4, Task 3 Step 1) — RESOLVED

Phase 25's finding 4 confirmed still present at the start of this review: the homepage's closing CTA had no `<Eyebrow>`, unlike the otherwise-identical block on About/Maasplassen/Experience-detail pages. **Fix applied** (`app/[locale]/page.tsx`): added `<Eyebrow>{tCommon("ctaEyebrow")}</Eyebrow>` immediately before the closing CTA's `<h2>`, reusing the existing import and translation call — no new message key, no heading/button copy change. Visually confirmed on EN/NL/DE: the eyebrow ("NEXT STEP" / translated equivalents) renders in Mist, above the heading, with no collision with the heading or button, matching the three reference pages exactly.

## WebKit pillar-morph motion (Task 2 Steps 4–5, Phase 14 roadmap follow-up) — INSPECTED, RESOLVED

All three documented cases were run against WebKit (dev server, per the note above):

- **Visible-heading morph, normal speed** (1280×800 and 390×844): the chosen pillar heading ("Escapes") was confirmed visible at click in both viewports; navigation to `/experiences/escapes` completed correctly (`h1` = "Escapes"); `document.getAnimations()` captured real, running transition activity at 200ms with `cubic-bezier(0,0,0.2,1)` (ease-out) during the navigation — consistent with the project's own documented Settle-tier transitions firing (Pillar dimming/heading/tick/CTA). As Phase 14 itself already documented, WebKit's own visual morph is confirmed only by this kind of animation metadata, not by frame-stepped visual inspection (WebKit's screen recording steps between frames rather than showing continuous motion) — this review does not claim anything beyond what Phase 14 already established for WebKit specifically.
- **Off-screen heading, no-morph fallback**: the "Gather" pillar's heading was confirmed off-screen (bounding box outside the 800px-tall viewport) while its link remained on-screen; the link was activated via a direct DOM-dispatched click (bypassing Playwright's own scroll-into-view-before-click behavior, which would otherwise defeat the test). Navigation to `/experiences/gather` completed correctly (`h1` = "Gather") with no automatic scroll — the new page loaded at its own natural top position, not an artificially preserved or compensating scroll offset. This matches the documented intentional behavior exactly: no pair forms when the heading is off-screen at click, and the page never scrolls to compensate.
- **Reduced motion**: with `prefers-reduced-motion: reduce` set at the browser-context level, the same visible-heading navigation completed in 310ms with no perceptible delay or stuck transition; `document.getAnimations()` showed the global reduced-motion rule's `0.01ms` forced duration on the active transitions, exactly as documented.

All three cases are now inspected and documented for WebKit specifically (see the roadmap follow-up resolution below). This is WebKit evidence, not Safari evidence — no actual Safari browser or Apple hardware was used or is available in this environment.

## What this review does not claim

- No automated visual-regression/pixel-diff comparison was performed — findings came from direct layout/overflow/animation-metadata checks and manual screenshot inspection, not an automated baseline-image diff tool.
- No real Safari, no real iOS hardware, and no TalkBack/screen-reader testing were performed in this phase — Phase 21's existing real-device findings (TalkBack, mobile-menu trigger unreachability) and its Safari/WebKit-keyboard-Tab-through-links item remain exactly as previously recorded, neither re-verified nor re-opened here.
- This is not a production-deployment review and makes no claim about a live, deployed target — all checks ran against a local build/dev server.
- Phase 25's other six findings (error-boundary coverage, `reset()`/`retry()`, mobile-menu focus-trap re-run, `proxy.ts` matcher boundary, breakpoint-constant duplication, dead `not-found.tsx` metadata) were explicitly out of scope for this visual/UX phase and were not touched, fixed, or re-triaged here — they remain exactly as Phase 25 recorded them, still awaiting their own follow-up.
- This is not a certification of defect-free status; it reflects what this specific review's method (the named routes, viewports, and WebKit cases) could reach.
