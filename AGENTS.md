# RUNAVERA

Premium water-based-experiences portfolio site for VoltairStudio (Roermond/Limburg). "Design with energy. Build with intention."

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- ESLint + Prettier

## Structure

- `app/` — routes, layout, global styles
- `components/` — shared UI components (e.g. `Logo`)
- `lib/` — non-UI logic (e.g. `lib/brand/logo.ts` asset registry)
- `public/images/` — real photography, served as-is (e.g. the Phase 5 hero photo). **Not** where logo assets live — that line existed here since Phase 1 but was never accurate; corrected in Phase 5.
- `Logo/` — original supplied brand source files, statically imported (not served from `public/`) via `lib/brand/logo.ts`. Not served directly; do not delete or rename — an external tool renamed this to `LogoandImages/` between Phase 4 and 5, which broke the build; restored in Phase 5, not repeated.

## Design tokens

Fixed art-directed palette, defined once in `app/globals.css` and exposed via the Tailwind theme. Never hardcode these hex values in components — reference the token.

| Token | Hex | Role |
|---|---|---|
| Deep Water | `#071C21` | primary dark background |
| Maas | `#294A4A` | secondary water/landscape tone |
| Limestone | `#E8E3D8` | primary light background/text |
| Sunset | `#D8784A` | restrained accent |
| Mist | `#AEBDB8` | atmospheric secondary tone |

## Typography

Display: Cormorant Garamond. Body/UI: Inter. Loaded via `next/font/google` in the root layout (weights 400/600 for Cormorant, variable for Inter — this covers the full type scale below; don't change the font-loading call without a real reason).

Type scale is implemented as plain CSS utility classes in `app/globals.css` (`@layer utilities`), not React components — keeps typography reusable without over-componentizing it. Cormorant carries Display through H3 (emotion/place/editorial moments); Inter takes over at H4 and everything structural/functional (nav, buttons, captions, metadata).

| Class | Family | Weight | Size (mobile → desktop) |
|---|---|---|---|
| `.text-display` | Cormorant | 400 | 2.75rem → 6rem |
| `.text-h1` | Cormorant | 600 | 2.25rem → 3.5rem |
| `.text-h2` | Cormorant | 600 | 1.75rem → 2.5rem |
| `.text-h3` | Cormorant | 600 | 1.375rem → 1.75rem |
| `.text-h4` | Inter | 600 | 1rem → 1.125rem |
| `.text-body-lg` | Inter | 400 | 1.125rem → 1.25rem |
| `.text-body` | Inter | 400 | 0.9375rem → 1rem |
| `.text-body-sm` | Inter | 400 | 0.875rem |
| `.text-eyebrow` | Inter | 500 | 0.75rem, uppercase, tracked |
| `.text-nav` | Inter | 500 | 0.875rem, sentence-case, lightly tracked |
| `.text-button` | Inter | 500–600 | 0.875rem, uppercase, tracked |
| `.text-caption` | Inter | 400 | 0.75rem |

Desktop sizes apply at `--breakpoint-desktop` (1200px, see Responsive below). Display headings and the tagline render in **Title Case**, not all-caps — preserves Cormorant's serif character at large sizes (the brief's own all-caps tagline text is document emphasis, not a literal display spec). Navigation is **sentence-case**, not uppercase — deliberately avoids a "luxury yacht template" feel.

## Spacing

Named semantic layer on top of Tailwind v4's native `--spacing` multiplier, defined in `app/globals.css`'s `@theme` block: `--spacing-hairline` (8px, eyebrow→heading), `--spacing-tight` (16px, stacked short lines), `--spacing-content` (24px, paragraph rhythm), `--spacing-component` (40px, heading block→CTA), `--spacing-group` (64px, mobile section gap), `--spacing-section` (128px, desktop section gap), `--spacing-atmosphere` (192px, rare large desktop breathing room). Use as Tailwind utilities directly: `gap-content`, `py-section`, etc. Full-viewport/cinematic sections use `100dvh`, not these tokens — this scale governs rhythm within/between content sections only.

## Layout

`Container` (`components/Container.tsx`) is the one layout primitive, with a `size` prop:
- `full` — true edge-to-edge, zero gutter (cinematic/full-bleed sections).
- `wide` — 100% width bounded **only** by the responsive gutter (`px-6 tablet:px-12 desktop:px-20` = 24px/48px/80px), **no additional max-width ceiling**. This is deliberate: a fixed px cap (the generic "1280px centered SaaS container" pattern) is exactly what RUNAVERA's layout system exists to avoid. `wide` reuses only values already in the gutter system — no new tokens — so it stays trivial to adjust once the first real spatial/asymmetric composition is built.
- `measure` — same gutter as `wide`, plus a 65ch max-width cap for readable text. Not centered by default (no `mx-auto`) — anchor left/right per composition via `className`.

A true 12-column asymmetric grid, a `Stack` primitive, and a `Section heading` component are **explicitly deferred** — no page exists yet whose shape would justify their design; building them now would be guessing. `Container`/`Button`/`TextLink`/`Eyebrow` were built now because every future page needs them regardless of composition; those three are composition-specific and wait for real content.

Breakpoints (custom, not Tailwind's stock ones — `lg` defaults to 1024px, short of the brief's 1200px threshold): `--breakpoint-tablet: 48rem` (768px), `--breakpoint-desktop: 75rem` (1200px), used as `tablet:`/`desktop:` variants.

## UI primitives

`components/Button.tsx`, `components/TextLink.tsx`, `components/Eyebrow.tsx`, `components/Container.tsx` (flat under `components/`, matching `Logo.tsx`'s existing convention).

- **Button** — `variant: 'primary' | 'secondary'`, renders `<a>` if `href` is passed else `<button>`. Primary = solid Sunset fill, Deep Water text, sharp corners (0px radius), hover darkens ~9%. Secondary = transparent, 1px Mist border, hover shifts to Sunset. No shadow/transform/scale on hover — that's the generic SaaS card-hover trope RUNAVERA avoids. Min height 44px (touch target). Focus uses the existing global `:focus-visible` (2px Sunset outline) — no per-button override.
- **TextLink** — `variant: 'default' | 'subtle'`. Adds only interactive treatment (color, underline reveal, hover) — font size/family are inherited from context, not forced, since this is a behavior primitive, not a typography one.
- **Eyebrow** — **Mist-only**, no color prop offered at all (not even as an option) — Sunset is reserved for CTA fill/active state/focus, never a label color, and offering it as a prop would just invite the exact contradiction it's meant to prevent. Use sparingly, for real taxonomy labels (e.g. an experience pillar name) — not decorative filler above every heading; uppercase-tracked micro-labels are one of the most recognizable generic-Webflow/SaaS tells, so restraint here matters.

## Color usage

Beyond the token table above: Maas is a **background/mass** color (fills, panels, water-as-environment) — Mist is a **foreground/detail** color (text, strokes, icon lines) — never swap them. Sunset is the only "energy" color and stays episodic (CTA fill, active/selected state, focus ring, hover) — never body text, never decorative, never ambient. Calm (Deep Water/Maas/Limestone) should cover ~90%+ of any surface; that ratio is what keeps the palette reading as Energy×Calm rather than a flat dark-SaaS theme. No gradients without a specific, documented reason (e.g. literally simulating water/light falloff) — not for generic "depth."

## Motion (principles only — no library)

80% atmosphere / 20% movement. Three duration tiers, nothing more yet: Settle 150–250ms (micro-interactions), Reveal 400–700ms (content entering view), Flow 800–1600ms+ (atmospheric/cinematic, e.g. a future Current motif). Gentle ease-out only, no bounce/overshoot. Exact `cubic-bezier` curves are deferred to whenever the first real animation is built (not yet) — don't add an animation library speculatively.

## Logo rules

The supplied primary RUNAVERA emblem (`Logo/RUNAVERA.LOGO.1.png`) is the **authoritative** brand asset. Never redraw, regenerate, reinterpret, or alter its geometry/proportions. `Logo/RUNAVERA.LOGO.3D.jpg` is a presentation mockup only — not for UI use. `Logo/RUNAVERA.LOGO.ASSETS.png` is a flattened presentation/reference sheet, **not** a production asset source — never crop or extract variants from it.

Only the primary variant exists as a clean individual asset today. Secondary (monogram), tertiary (wordmark), and lockup variants are **not yet available** as production files. The logo registry (`lib/brand/logo.ts`) and `<Logo />` component (`components/Logo.tsx`) are built so those variants can be dropped in later by filling in the registry entry — no component API or layout changes required.

## No theme toggle

RUNAVERA ships one fixed, art-directed palette (see Design tokens). Do not add a light/dark/system theme toggle — this was a generic default in one of the installed agent personas that does not apply to this brand.

## Navigation (Phase 3)

`Header` (`components/Header.tsx`) mounts globally in `app/layout.tsx`, above `{children}`. Pages that aren't a future full-viewport Arrival apply the `.pt-header` utility (reserves `--header-height`, 88px — the header's max height — permanently, so its own scroll-shrink never causes page content to jump).

- **Breakpoint**: nav collapses to the mobile trigger/takeover pattern below `--breakpoint-tablet` (768px); tablet and desktop both show the full horizontal nav. Don't move this to 1200px "for future German labels" — that was tried, reverted as speculative engineering against a feature (i18n) that isn't built (see the Phase 3 plan). If real translated strings later prove too long at tablet width, that's an i18n-phase problem to solve with real strings in hand.
- **Data**: `lib/navigation.ts` is the single source of truth for nav items — `DesktopNav` and `MobileNav` both read from it so they can't drift apart.
- **`NavLink`** wraps `TextLink` with routing-aware active state (`usePathname`, `aria-current`). Uses TextLink's `default` variant (Limestone → Sunset hover) rather than Mist — nav links are primary wayfinding UI, not muted detail text. A deliberate, documented deviation from the Phase 3 plan's literal "Mist default" line.
- **CTA hierarchy**: the nav CTA is `Button variant="secondary"` everywhere except the mobile full-screen menu's bottom CTA, which is `variant="primary"` (solid Sunset) — the one deliberate full-Sunset moment per session. A solid Sunset button in a persistent header on every page would itself violate the "Sunset stays episodic" rule above.
- **Header theme**: `theme` prop (`'dark' | 'light' | 'transparent-media'`), the *default* value supplied by whoever renders `Header` — with one narrow, named exception (Phase 7): `/experiences` and its detail routes force `dark` regardless of what's passed in, since those pages have no photography for `transparent-media`'s scrim to justify (see `Header.tsx`'s `isExperiencesRoute` check). Every other route still gets exactly what its renderer passed. This is a fixed, explicit route check, not auto-detection — deliberately **not** an IntersectionObserver-based section-watching engine; no page has real in-page sections yet that would justify one. If a third distinct page-background need appears, that's the point to build the real per-page mechanism this was always meant to be, not to keep appending routes to the override. `transparent-media`'s scrim is the one documented gradient exception from the Phase 2 "no gradients without a specific rationale" rule (simulates light falloff for legibility over photography).
- **Scroll-shrink**: 88px → 64px on tablet+ only (mobile header is a constant 64px, no shrink) — subtle, 200ms, reuses the existing global `prefers-reduced-motion` foundation (no header-specific reduced-motion code needed). Logo shrinks modestly alongside it (40px → 32px). Easy to remove: it's one `isScrolled` boolean driving a couple of conditional class strings in `Header.tsx`.
- **Mobile menu**: full-screen Deep Water takeover (`MobileNav.tsx`), not a drawer/dropdown-card. Focus trap, `Escape` to close (restores focus to the trigger), scroll lock via the `.scroll-locked` utility class, starts below the (constant) 64px mobile header so the trigger — now an X — stays visible/clickable while open. Closes on link/CTA tap too (via `onClick`, not just Escape/trigger) — `Header` persists across client-side navigations since it's mounted in the root layout, so this isn't optional. Also force-closes (and releases the scroll lock) if the viewport crosses into tablet+ while open, so a resize/rotate can't orphan the lock with no visible trigger left to undo it.
- **Active link color** comes from a global `[aria-current="page"] { color: var(--color-sunset) !important; }` rule in `globals.css`, not a per-component class override — avoids depending on Tailwind's utility-ordering to reliably beat `TextLink`'s own color class.
- **Arrival hook**: `Header` accepts a `suppressed` prop (renders mounted-but-visually-inert) for Phase 4 to wire up against real Arrival logic. Not resolved now — today's `app/page.tsx` is an ordinary page, not Arrival, so it gets normal header clearance like any page.
- **Skip-to-content**: first focusable element in `app/layout.tsx`, jumps to `#main-content`.
- **Not built yet**: `Breadcrumb` component — Experience pages exist now (Phase 7), but a single nesting level (home → one pillar page) doesn't yet justify a generalized breadcrumb primitive; a plain `TextLink` back-link does the same job today (see the Experience pages section below). Revisit if a real second nesting level appears. Also not built: language selector (i18n not implemented), `/maasplassen`, `/about`, `/plan` (still 404 until their own phases build them — the nav links to its intended future IA on purpose).

## Arrival (Phase 4)

`components/Arrival.tsx` — the full-viewport, first-visit entry moment at `/`. Renders **in-flow** (not `position: fixed`), stacked directly above the homepage in `app/page.tsx` — never a replacement for it. This is what lets a no-JS visitor simply scroll past it, or use the existing skip-to-content link, and still reach `#main-content` with zero JS required.

- **Concept**: static logo = the confluence ("where two waters meet") already depicted in the logo's own monogram (two strands merged). The animated Current = the journey that follows — extends outward from the identity, never toward it. Sequence: logo fades in → held pause → tagline fades in → Current draws outward → holds indefinitely (does **not** auto-complete) → visitor-triggered exit.
- **First-time vs. returning**: gated by the `runavera_arrived` cookie (`lib/arrival-cookie.ts`, ~1 year). `app/layout.tsx` and `app/page.tsx` both read it server-side via `cookies()` — a returning visitor never gets `<Arrival>` in the DOM at all (zero flash), and `Header`'s initial visibility is seeded correctly from the same check (see Header below). This is why both routes are dynamically rendered (`ƒ`, not static) — an accepted, necessary tradeoff for that zero-flash guarantee, not an oversight.
- **Persistence mechanism**: a **synchronous** `document.cookie` write in the exit handler, not a server round-trip. A Route Handler + `fetch(..., { keepalive: true })` was tried first and looked fine in isolated testing, but a real repeated test (exit immediately followed by a reload, run 10x) showed it was still genuinely racy — `keepalive` only guarantees the *request* survives navigation, not that its response is processed before a near-simultaneous reload's own request is already in flight. A synchronous write has no such window. Safe to do client-side: this is a non-sensitive preference flag, not an auth-relevant cookie.
- **User control**: one single "Enter RUNAVERA" control, present from frame one, **not auto-focused** on mount (that would steal focus from the Phase 3 skip-to-content link — it's reachable via normal Tab order instead, right after the skip link since `Header` is `inert` while suppressed). Click, Escape, or scroll all trigger the same exit. No timer ever force-completes it.
- **Header integration**: no React Context. `Header` manages `suppressed` as its own internal state (seeded from a prop computed server-side in `app/layout.tsx`) and listens for one `window` custom event (`lib/arrival-events.ts`) that Arrival dispatches on exit to flip it back to visible. `Header`'s transition list needed `opacity` added (it already toggled `opacity-0`/`100` via `suppressed` but that property wasn't in the transitioned list yet — a real one-line gap from Phase 3, fixed here).
- **The Current** (`components/Current.tsx`): two hand-authored SVG paths per breakpoint (not one rescaled) — shallow diagonal on tablet+, steep near-vertical on mobile, split at the same `--breakpoint-tablet` (768px) the nav already uses. Colors are the logo's own internal strand colors (Sunset, Mist) — no new tints. Reveals via a `stroke-dashoffset` keyframe (`arrival-current-reveal` in globals.css), not a library. Stroke width is intentionally uniform, not tapered — true per-point taper would need a filled-ribbon path instead of a stroked line; deferred as a refinement.
- **Layout**: the identity block (logo+tagline) centers within whatever space remains above the Current band via `flex-1` — never hardcoded viewport percentages for relative positioning between the two. An earlier version used `top-[55%]` for the Current and it visibly cut through the tagline text once actually rendered — flex-based sizing was the fix, not a percentage tweak.
- **Reduced motion**: handled by the existing global rule, extended in this phase — it previously zeroed `animation-duration`/`transition-duration` but not `animation-delay`/`transition-delay`, so a delayed reveal (like the tagline's 950ms delay) would still wait out its delay before popping in. Both delay properties are now zeroed too. No Arrival-specific reduced-motion code needed as a result — a real gap in the Phase 1 foundation, not just an Arrival concern, so worth remembering for any future delayed animation.
- **Not built**: precise FLIP-style position-matching between Arrival's logo and Header's logo on exit (an approximate scale-down + Header's independent fade-in is used instead — documented simplification, not attempted pixel-matching).
- **Header route-awareness**: `Header` only respects its seeded `suppressed` state while `usePathname() === "/"` — on any other route it's always visible regardless of the cookie. Without this, a first-time visitor whose first hit is a direct link to a future non-`/` route would get a permanently invisible, `inert` header for the rest of that session, since nothing would ever dispatch the completion event to release it. Currently only reachable in theory (no other real routes exist yet), but a real landmine the moment one does — fixed proactively, not left for a future phase to rediscover. This also keeps Header correct across client-side App Router navigation, since `usePathname()` is live/reactive.
- **Accessibility**: the logo and tagline inside Arrival are real brand content, not decoration — they are **not** `aria-hidden`, only the Current SVG is (via its own internal attribute). A screen-reader user reading linearly gets "RUNAVERA — Roermond, Limburg" and "Move beyond the Maas & Roer." before reaching the "Enter RUNAVERA" control, not just a bare button with zero context.
- **Scroll-exit threshold**: requires `scrollY > 15`, not any scroll event at all — guards against iOS rubber-band overscroll or sub-pixel scroll-anchoring jitter being misread as an intentional skip gesture.
- **Current min-height**: `min-h-[220px]` floor on the Current's container, on top of its `vh`-based height — the square `viewBox` stretched via `preserveAspectRatio="none"` would otherwise squash into a visibly distorted, near-flat band on a short landscape viewport (confirmed: a 926×300 viewport would compute 180px without the floor, and does render exactly 220px with it).

## Homepage (Phase 5)

`app/page.tsx`'s `HomePage` — the real homepage, replacing the Phase 2/3 foundation placeholder entirely. Renders after `Arrival` exits (first visit) or immediately (returning visit), same in-flow stacking pattern as before.

- **Sections, in order**: full-bleed hero → four pillars (`id="pillars"`) → Maasplassen teaser → RUNAVERA story → closing CTA.
- **Hero**: `next/image` with `fill`, the supplied photo used exactly as provided — no color-grading, no re-encoding beyond `next/image`'s own optimization pipeline. `object-position: 50% 35%` keeps the sky/water band in frame. Bottom Deep Water scrim for legibility (the same single documented gradient exception the Header's `transparent-media` theme already uses — not a second one). Headline at `.text-display`, left-aligned — deliberately not centered, the most recognizable generic-hero convention.
- **Header theme**: `app/layout.tsx` now passes `theme="transparent-media"` to `<Header />`. This is a **site-wide default** (Header mounts once, globally — there's still no per-page theme mechanism) — fine while the homepage is the only real page, but the next page with a different background will need either its own reason this default still suits it, or a real per-page mechanism, deliberately not built yet.
- **Explore cue**: a plain `TextLink` anchor (`href="#pillars"`) in the hero — native browser anchor-scroll, no JS, respects reduced motion via the existing global `scroll-behavior: auto !important` rule.
- **Four pillars** (`components/Pillar.tsx`, new — genuinely justified by real 4× reuse, unlike earlier deferred primitives with no consumer yet): deliberately **not** an alternating zig-zag/card-grid pattern — that skeleton is itself one of the most recognizable generic travel/SaaS templates, regardless of what fills it. Instead: one consistent Deep Water background throughout (no alternating row colors — color-alternation is the most template-coded signal), each pillar at a different horizontal inset and different vertical gap (varies at both mobile and tablet+ — Private gets a deliberately larger gap at every width, not just desktop), a single thin Mist hairline threading one consistent side as a quiet "current" motif. Pure typography — no per-pillar photography exists, none invented. Section wrapped in `<section aria-labelledby="pillars-heading">` with its own Eyebrow+H2; each pillar name is an **H3** (not a peer H2) — screen-reader users need the same "these four are one group" signal sighted users get from the visual banding.
- **Maasplassen / Story**: Maas background + `wide` container (place/atmosphere) vs. Limestone background + `measure` container (the one light section on the page — brand/why, first-person-plural reflective tone, deliberately different register from Arrival's second-person tagline). Both single-instance sections, no repeated structure — what keeps them reading as teasers, not full pages.
- **Closing CTA**: `Button variant="secondary"` → `/plan`, same destination and treatment as the persistent nav CTA — fulfills the brief's own "gentle next step toward planning," not invented scope.
- **No scroll-triggered motion**: considered (a shared `useInView`/IntersectionObserver reveal), reconsidered, and dropped — the phase already introduces the site's first real photograph, first new component, and four new sections; adding the first JS-driven scroll interaction too, with no reason stronger than "it would feel nice," didn't meet the bar this project holds elsewhere. Sections render via plain document flow.
- **Attribution**: bottom-right of the hero, always visible (not hover-to-reveal — CC BY-SA can't legally be gated behind an interaction), `.text-caption`, Mist at ~65% opacity. All four required elements in one line — photographer name + source link (Davy Landman → the Commons file page), license link (CC BY-SA 2.0 → the license deed), and a "Modified" notice.
- **`Logo/` restoration**: between Phase 4 and 5, an external tool (Codex CLI) renamed `Logo/` to `LogoandImages/`, breaking the build. Fixed by restoring `Logo/` exactly as before — `lib/brand/logo.ts` needed no change, since its import was already correct once the folder existed again. The hero photo was relocated to `public/images/` instead, kept separate from brand-identity assets per explicit instruction.

## Pillar transitions (Phase 6)

`components/PillarGroup.tsx` (new) — a `"use client"` wrapper owning which pillar is currently chosen. `app/page.tsx` is an `async` Server Component and can't hold state itself, so this is where the four `<Pillar>` calls that used to sit directly in `app/page.tsx` now live; `app/page.tsx` still owns the surrounding `<section>`, its heading, and the base hairline.

- **Scoped `next/link` exception**: `Pillar.tsx`'s own CTA is the only link in the site using `next/link`'s `<Link>` instead of `TextLink`'s plain `<a>` — introduced specifically so its navigation is eligible for a React `<ViewTransition>`. Its visual classes are copied from `TextLink`'s `default` variant rather than importing `TextLink` itself, since `TextLink` always renders a plain `<a>` and isn't meant to change for this one case. `TextLink`, `Button`, `NavLink`, and every other link in the site are unchanged.
- **Chosen state**: click or Enter on a pillar's link sets `PillarGroup`'s `selectedSlug` synchronously (the click isn't `preventDefault`-ed — real navigation proceeds normally alongside it). The chosen pillar's heading and hairline tick shift to Sunset; the other three dim to ~40% opacity via `isDimmed`. This is the *entire* visible mechanism — it does not depend on `useLinkStatus()`'s `pending` ever firing (see below). Space is deliberately not wired to anything beyond its native scroll behavior — these are links, not buttons; only Enter (and click) activate them.
- **View Transition contract, closed in Phase 7**: only the chosen pillar's `<h3>` is ever wrapped in React's `<ViewTransition name={`pillar-name-${slug}`}>` (imported from `react`, per `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`) — the other three stay plain `<h3>` elements, so at most one `view-transition-name` exists in the tree at a time by construction, not by convention. This was the *departure* side only — Phase 7's `app/experiences/[slug]/page.tsx` now supplies the matching arrival-side element (see the Experience pages section below).
- **`useLinkStatus()` placement**: called inside a small child (`PillarLinkLabel`) rendered *inside* the `Link`, per the Next.js docs' requirement that it run in a descendant of the `Link` it reports on, not the same component that renders the `Link`. Its `pending` boolean only ever adds a small supplemental affordance (the CTA text tints Sunset) on top of the chosen-state treatment above — Next's own docs note `pending` can be skipped entirely for an already-prefetched navigation, so nothing depends on it appearing.
- **Reduced motion**: View Transition pseudo-elements (`::view-transition-old`, `::view-transition-new`, `::view-transition-group`) live outside the DOM tree the site's existing global `*` reduced-motion rule reaches — a real gap, not covered by that rule, confirmed against the Next.js docs' own reduced-motion guidance. `app/globals.css` adds a dedicated rule for them (same 0.01ms/0ms units as the existing rule, not the docs' literal `0s`, for consistency) — the same category of fix as the `animation-delay` gap found during the Arrival phase.
- **`prefetch` left at Next 16's default** (`"auto"`) — no evidence turned up during implementation or since that the `/experiences` routes need an override.
- **Not built in this phase**: no changes to `Header`, `Arrival`, `Current`, `lib/navigation.ts`, or the Maasplassen/Story/CTA sections.

## Experience pages (Phase 7)

`app/experiences/[slug]/page.tsx` (new) — the four real pillar destinations (`escapes`/`explore`/`private`/`gather`), closing the placeholder every pillar link pointed at since Phase 5. `app/experiences/page.tsx` (new) — a minimal index, added because the persistent header nav's "Experiences" link (`lib/navigation.ts`) points at bare `/experiences`, which would otherwise keep 404ing even with the four detail pages built.

- **Shared pillar data**: `lib/pillars.ts` (new) is the single source for each pillar's `name`/`slug`/`tagline`/`description` — consumed by both `PillarGroup.tsx` (homepage summary) and the new detail pages, matching `lib/navigation.ts`'s own "one source, not two" precedent. `PillarGroup.tsx` keeps its per-pillar layout `className` offsets local to itself (a homepage-composition detail, not pillar content).
- **`PillarGroup.tsx`'s `href`s**: each pillar now points at its own real `` `/experiences/${slug}` `` instead of the shared `/experiences` placeholder — no other change to Phase 6's mechanism (`transitionTypes`, `isChosen`/`isDimmed`, the `<ViewTransition>` wrap).
- **Closing the View Transition contract**: each detail page's `<h1>` (the pillar name) is wrapped in `<ViewTransition name={`pillar-name-${slug}`}>` — the exact same name Phase 6's chosen pillar carries. This is the first point a real end-to-end shared-element morph is possible and testable, not just the departure-side treatment Phase 6 could build alone.
- **`generateStaticParams`**: returns the four slugs from `lib/pillars.ts` (per `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md`); an unrecognized slug calls `notFound()` (`next/navigation`) rather than any custom 404 handling. In practice these routes still build as `ƒ` (dynamic, server-rendered on demand), not prerendered — `app/layout.tsx`'s `cookies()` read for the Arrival gate (Phase 4) forces the whole route tree dynamic, the same tradeoff Phase 4's own section already discloses for `/`. `generateStaticParams` still declares the four slugs as the known, valid set (correct `dynamicParams` behavior); it just doesn't get to prerender them at build time here.
- **Header theme exception**: see the Navigation section above — `/experiences` and its detail routes force `dark`, since these pages are text/atmosphere-only (a deliberate Phase 7 decision — no new photography, no new CC-licensing work this phase) and have nothing for `transparent-media`'s photography scrim to justify.
- **No new Breadcrumb component**: a plain `TextLink` back-link ("← Back to Runavera") handles the one level of nesting that exists today (home → one pillar page) — see the Navigation section's "Not built yet" note for when this should be revisited.
- **No new motion**: the View Transition mechanism is entirely Phase 6's; this phase only supplies the matching named arrival-side element.
- **Content register**: each pillar's `description` (2–3 sentences) matches the atmospheric, no-invented-specifics register Maasplassen/Story already use on the homepage — no prices, availability, or business details.

## Current phase

Phase 7 — Experience Detail Pages, complete. See `Roadmap/Roadmap.txt` for the full phase sequence and current status. Do not build the real `/maasplassen` page (Phase 8), `/about` (Phase 9), `/plan` (Phase 10), enquiry/booking forms, backend, or any later phase until that phase is explicitly approved.

## Agent responsibilities (`.codex/agents/`)

Brand Guardian (identity/logo/palette consistency), UI Designer (visual polish), UX Architect (IA/CSS architecture), Frontend Developer (implementation), Backend Architect (data/APIs — not needed yet), Application Security Engineer (not needed yet), Reality Checker (post-milestone sanity check), Test Results Analyzer (test/CI failure analysis). Don't invoke agents whose expertise the current phase doesn't need.

## Constraints

- No booking backend, CMS, or database until a real requirement exists.
- No animation libraries, large UI kits, icon libraries, WebGL, or video until a phase actually calls for them.
- Real business data (prices, availability, etc.) does not exist — use structured placeholder data, never invented real-looking data.
