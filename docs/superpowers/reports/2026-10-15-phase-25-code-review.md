# Phase 25: Code Review — Report

**Review target:** the full current implementation on `main`, commit `8a3e6d9` (confirmed matching `origin/main`, no drift, at execution time). No open PR was found or made the explicit target; no `gh` CLI exists in this environment to positively confirm or rule out an open PR on GitHub.com itself, so this review defaults to the main-branch snapshot, per the plan's own fallback.

**Review surface:** confirmed no CodeRabbit configuration exists anywhere in the repo (no `.coderabbit.yaml`/`.yml`) and no `.github/` directory at all (so no CodeRabbit-via-Actions wiring). In place of CodeRabbit, this review used this session's installed `/code-review` skill at **high** effort, targeted at `app/`, `components/`, `lib/`, `i18n/`, `messages/`, `proxy.ts`, and `next.config.ts` (the paths covering all five Review Focus areas) — not the `--ultra` cloud variant, per the plan's constraint. Every candidate the skill produced was independently re-verified against the actual source and, where a framework-behavior claim was involved, against this installed Next version's own bundled docs — not accepted on the skill's word alone. Direct manual tracing was also performed in parallel, covering route/locale/metadata flows, external-link handling, and image configuration, to catch anything path-targeted automated review might miss (e.g. project-specific intent that only the phase history makes legible).

**Tools/evidence used:** `/code-review` skill (high effort); direct `Read`/`Grep`/`Bash` tracing of the flagged files and their collaborators; `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md` (installed version's own docs) to verify two framework-behavior claims; `git log`/`git status` for the review-target baseline.

---

## Confirmed findings

Each is a real, currently-present defect, verified against source (and official docs where a framework claim was involved) — not fixed in this phase, per Phase 25's review-only scope. Severity is relative to this site's actual risk profile (a static, no-backend, no-auth brand site), not a generic CVSS-style scale.

### 1. Header has zero error-boundary coverage on every route (significant)

- **File:** `app/[locale]/layout.tsx` (renders `<Header>` as a sibling of `{children}`); `app/[locale]/error.tsx`; absence of `app/error.tsx`/`app/global-error.tsx`.
- **Evidence:** confirmed directly against the installed Next version's own `error.md`: *"`error.js` wraps `loading.js`, `not-found.js`, `page.js`, and nested `layout.js` files in a React error boundary. It does **not** wrap the `layout.js` or `template.js` above it in the same segment."* `app/[locale]/error.tsx` is in the same segment as `app/[locale]/layout.tsx` — so it never covers Header. No `app/error.tsx` or `app/global-error.tsx` exists at the true root (confirmed via direct directory listing) to cover the root layout either.
- **Failure scenario:** any runtime error thrown while rendering `Header` or a descendant (`DesktopNav`, `MobileNav`, `LanguageSwitcher`, `NavLink`, `MenuButton`, `Logo`) — e.g. a translation lookup for a key missing from the still-draft NL/DE message files — has no project-branded fallback to catch it, on any route, since `Header` mounts globally. The visitor sees Next's generic, unstyled, unbranded default error UI instead.
- **Smallest fix (not applied):** add `app/global-error.tsx`, the mechanism the installed docs themselves name for exactly this root-layout gap. It must define its own `<html>`/`<body>` and doesn't inherit global styles, so it needs its own minimal, on-brand markup.
- **Owning phase/follow-up:** no currently-scheduled phase covers general frontend-correctness fixes; recommend a dedicated follow-up before launch, not folded into Phase 26 (which is visual/UX-focused, not architectural).

### 2. The error boundary's "Try again" button doesn't actually retry (moderate)

- **File:** `app/[locale]/error.tsx:19-21`.
- **Evidence:** the component destructures and uses only `reset`, wired to the "Try again" button. Confirmed against the installed docs: `retry` became the stable prop in `v16.3.0`, and is the documented mechanism for exactly this UI pattern — *"An error component can use the `retry()` function to prompt the user to attempt to recover... re-fetch and re-render the error boundary's children."* `reset()` is explicitly the narrower alternative — *"In most cases, you should use `retry()` instead... clear the error state and re-render... **without** re-fetching."*
- **Failure scenario:** for most real error causes (a thrown exception during a server-rendered segment's data/translation fetch), clicking "Try again" clears local error state and re-renders the *same already-failed* children without re-attempting anything — the identical error reappears immediately, defeating the button's own translated purpose (`Error.retry` in `messages/*.json`).
- **Smallest fix (not applied):** destructure and call `retry` instead of `reset`.
- **Owning phase/follow-up:** same dedicated frontend-correctness follow-up as Finding 1.

### 3. Mobile menu can silently lose Tab position on an unrelated Header re-render (minor, edge-case-triggered)

- **File:** `components/Header.tsx:108-119` (`closeMenu`, not memoized); `components/MobileNav.tsx:36-77` (Tab-trap effect, deps `[isOpen, onClose, dialogRef]`).
- **Evidence:** `closeMenu` is a plain function recreated on every `Header` render, passed to `MobileNav` as `onClose`. MobileNav's focus-trap effect depends on `onClose`'s identity, so it re-runs — refocusing the first panel link — on *any* Header re-render while the menu is open, not only on genuine open. `.scroll-locked` (confirmed in `app/globals.css:193-195`) is a plain `overflow: hidden` on `<body>`, which is a well-known imperfect lock against iOS rubber-band bounce; this project's own code already guards against that exact class of quirk elsewhere (Arrival's documented `scrollY > 15` exit threshold, explicitly to filter "iOS rubber-band overscroll"), so a stray scroll event flipping `Header`'s own `isScrolled` state while the menu is open is a realistic, not contrived, trigger.
- **Failure scenario:** a keyboard user tabs to the 3rd/4th mobile-menu link; an unrelated Header re-render (most plausibly the iOS rubber-band case above) fires mid-interaction and silently resets focus to the first link.
- **Smallest fix (not applied):** wrap `closeMenu` in `useCallback`.
- **Owning phase/follow-up:** same dedicated frontend-correctness follow-up as Findings 1-2.

### 4. Homepage's closing CTA is missing the Eyebrow every other equivalent section has (minor)

- **File:** `app/[locale]/page.tsx:117-130`.
- **Evidence:** direct comparison confirms `about/page.tsx:63`, `experiences/[slug]/page.tsx:75`, and `maasplassen/page.tsx:81` all render `<Eyebrow>{tCommon("ctaEyebrow")}</Eyebrow>` immediately before their closing-CTA heading; the homepage's otherwise-identical block (same `tCommon` import, same `ctaHeading`/`ctaButton` keys) has no Eyebrow at all. No CLAUDE.md rationale exists for the homepage differing.
- **Failure scenario:** a visitor who reaches the closing CTA on three of the site's real pages sees a "Next step" label before the heading; on the homepage, the same copy-pasted section pattern silently drops it — an unintentional structural/visual inconsistency, not a deliberate design choice.
- **Smallest fix (not applied):** add the same `<Eyebrow>{tCommon("ctaEyebrow")}</Eyebrow>` line to the homepage's closing CTA.
- **Owning phase/follow-up:** **Phase 26 (Final visual/UX review)** — this is exactly the kind of cross-page visual-consistency check that phase is for.

### 5. `proxy.ts`'s locale-matcher exclusion has no path-segment boundary (minor, currently dormant)

- **File:** `proxy.ts:16`.
- **Evidence:** the matcher's negative lookahead, `(?!api|_next|_vercel|.*\\..*)`, excludes any path that merely *starts with* the literal substring `api`/`_next`/`_vercel` — there's no `/` or word-boundary anchor after them. Confirmed by reading the regex directly; no test currently exercises a route name that would expose this.
- **Failure scenario:** a future real route added at a path like `/apiary` or `/apidocs` (not under `/api/`) would be wrongly excluded from next-intl's locale rewriting the same way a genuine `/api/...` path is — it would never resolve `/nl`/`/de` prefixes and would silently bypass the i18n routing layer. Not reachable today; no such route exists.
- **Smallest fix (not applied):** anchor the exclusions to a path segment, e.g. `(?!api/|_next/|_vercel/|.*\\..*)` plus an exact-match case for the bare `/api` root if that's ever needed.
- **Owning phase/follow-up:** same dedicated frontend-correctness follow-up as Findings 1-3; low urgency since no such route exists yet — worth closing whenever a new top-level route is next added, as a matter of discipline.

### 6. Header's resize-driven breakpoint check duplicates the CSS token with no shared constant (minor, maintainability)

- **File:** `components/Header.tsx:128` (`window.matchMedia("(min-width: 48rem)")`); `app/globals.css` (`--breakpoint-tablet: 48rem`).
- **Evidence:** confirmed via grep across `lib/` that no shared breakpoint constant exists anywhere in the codebase — this is the *only* runtime JS mechanism that actually needs the breakpoint value (to force-close the mobile menu and release the scroll lock on a resize/rotate crossing into tablet+), and it re-states the literal instead of referencing a shared source.
- **Failure scenario:** if the tablet breakpoint is ever revisited (CLAUDE.md's own Navigation section already flags it as a live, previously-debated question re: German string lengths), this JS literal can silently desync from the CSS token, reopening exactly the orphaned-scroll-lock bug this effect exists to prevent, with no compiler or lint error to catch the drift.
- **Smallest fix (not applied):** export a single shared string constant (e.g. from `lib/`) and use it both here and anywhere else a breakpoint check is ever added in JS.
- **Owning phase/follow-up:** same dedicated frontend-correctness follow-up as Findings 1-3, 5.

### 7. `app/not-found.tsx`'s entire static `metadata` export is dead code (minor, clarity)

- **File:** `app/not-found.tsx:20-23`.
- **Evidence:** Phase 23 already established (and fixed the *title* consequence of) the mechanism this extends: `generateMetadata` resolves against the *matched* segment tree, which for a real request never includes this true-root file — the actual title/description for every real 404 case comes from `app/[locale]/[...rest]/page.tsx`'s own `generateMetadata`. This review confirms the *entire* static export here — not just the title Phase 23 already addressed, but the `description` field too — is unreachable for any real request, for the identical reason.
- **Failure scenario:** not a functional bug (the catch-all's `generateMetadata` already supplies a correct title, and the layout's own description is an acceptable fallback) — but a maintainer reading this file in isolation would reasonably believe this export controls the rendered 404 metadata; it never does today.
- **Smallest fix (not applied):** either remove the dead export or add a one-line comment pointing to the catch-all's `generateMetadata` as the real source, matching the project's own documentation style elsewhere.
- **Owning phase/follow-up:** low-priority documentation/cleanup item; no urgency, fold into whenever this file is next touched.

---

## Reviewed, not confirmed as defects

Each candidate below was traced to source and judged *not* to contradict actual project intent or constraints, with reasoning — not silently dropped.

- **`components/Button.tsx`'s hardcoded `#C56D43` hover shade.** This literal hex matches CLAUDE.md's own explicitly documented Button spec ("Primary... hover darkens ~9%"). The project's "never hardcode these hex values" rule is stated in the Design Tokens section about the five *named* palette tokens specifically, to prevent them drifting from `app/globals.css`'s single source of truth; `#C56D43` is a derived, single-use shade with no corresponding named token to reference, and inventing one for exactly one call site would be the kind of premature abstraction this project's own conventions elsewhere explicitly avoid. Not reached or flagged across any of Phases 17-24's own reviews either.
- **`app/[locale]/layout.tsx`'s hardcoded Deep Water hex in `viewport.themeColor`.** Confirmed via grep as the only non-CSS usage site of this exact hex in the whole repo (`app/globals.css:4` and this one call site, nothing else). Next's `viewport` metadata export is plain server-rendered TypeScript with no built-in mechanism to read a Tailwind CSS custom property's resolved value, so there is no low-cost way to reference the token directly. A disclosed, narrow, accepted exception rather than a fix-worthy defect.
- **External attribution links (Wikimedia Commons, Creative Commons license pages) open in the same tab, with no `target="_blank"`.** Confirmed via `TextLink.tsx`: it renders through next-intl's `Link`, which doesn't set `target` at all here. This is *not* a security issue — the classic window.opener/reverse-tabnabbing risk requires `target="_blank"` in the first place, which these links never use — just a UX choice (same-tab navigation away from the site for an attribution link), not contradicted by any documented project constraint, and not flagged across any prior phase.

## Already documented, confirmed still present

- **Skip-link focus gap on every page except the homepage** (Phase 21's own recorded "fix now, not applied" finding) — confirmed directly: `app/[locale]/layout.tsx`'s skip link still only has a matching `tabIndex={-1}` target on the homepage's `<main>`; every other real page template still lacks it. Not re-triaged here; stays exactly as Phase 21 recorded it.

## Accepted limitations and unverified coverage (carried forward, not re-litigated — no new evidence changes their basis)

- Safari/WebKit keyboard navigation with Tab-through-links enabled — still explicitly unverified (Phase 21); no Apple hardware exists in this environment.
- `upgrade-insecure-requests` breaking local plain-HTTP testing of the production build — still an accepted limitation for the current, unknown deployment setup (Phase 18-20, reconfirmed Phase 24); a no-op on a real HTTPS deployment.
- `braces` (dev-only, via `eslint-config-next`'s dependency chain) — still has no non-breaking fix available (Phase 17, reconfirmed Phase 24).
- No `Strict-Transport-Security` header — deployment HTTPS/domain status remains unknown from this repository (Phase 17).
- Real production deployment behavior generally — this review, like every phase before it, covers only the repository and a local build; it makes no claim about a live, deployed target.

## What this review does not claim

This is a source-level code review, not a certification or a claim of defect-free status. The seven confirmed findings above are genuinely present in current source, independently verified against the code and (for the two framework-behavior claims) against this installed Next version's own documentation — not merely suggested by a tool and taken on faith. None are fixed in this phase; each is routed to an owning phase or follow-up above, per Phase 25's review-only scope. An absence of further findings in any specific area (e.g. the View Transition/pillar-morph mechanism, image configuration, or message-dictionary parity across locales) reflects what this review's method could reach, not a guarantee nothing remains — those areas were traced directly and found consistent with the already-extensive Phase 6/7/14/19/22/23/24 evidence already on record, not newly re-proven from scratch.
