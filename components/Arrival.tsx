"use client";

import { useEffect, useRef, useState } from "react";

import { Current } from "@/components/Current";
import { Logo } from "@/components/Logo";
import { ARRIVAL_COOKIE_MAX_AGE_SECONDS, ARRIVAL_COOKIE_NAME } from "@/lib/arrival-cookie";
import { ARRIVAL_COMPLETE_EVENT } from "@/lib/arrival-events";

const EXIT_DURATION_MS = 1000;

/**
 * RUNAVERA's signature first-visit entry moment. Renders in-flow (not
 * `position: fixed`) so a no-JS visitor can simply scroll past it, or use
 * the existing skip-to-content link — both reach `#main-content`, which
 * sits on the ordinary page content rendered immediately after this
 * component (see app/page.tsx). Never a dead end regardless of JS/motion
 * preference.
 *
 * Sequencing (logo → beat → tagline → Current) is driven entirely by CSS
 * `animation-delay` (see the `arrival-fade-in` / `arrival-current-reveal`
 * keyframes in globals.css), not a JS timer chain — reduced motion is
 * handled for free by the existing global `prefers-reduced-motion` rule
 * (collapses every duration to ~0, so everything simply appears
 * immediately — no separate reduced-motion code path needed here).
 *
 * The logo and tagline are real brand content, not decoration — they are
 * NOT aria-hidden, so a screen-reader user reading linearly still gets the
 * brand identity and tagline, not just a bare "Enter RUNAVERA" button with
 * no context. Only the Current SVG (genuinely decorative, no information
 * conveyed) is hidden, via its own internal aria-hidden. The "Enter
 * RUNAVERA" control is a sibling of the identity block, reachable through
 * normal tab order, and deliberately NOT auto-focused on mount — that would
 * steal focus from the existing Phase 3 skip-to-content link.
 */
export function Arrival() {
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const hasExitedRef = useRef(false);

  const exit = () => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;

    // A direct, synchronous cookie write — not a network round-trip. A
    // Route Handler + `fetch(..., { keepalive: true })` was tried first,
    // but real testing (exit immediately followed by a reload) showed it's
    // still genuinely racy: keepalive only guarantees the *request*
    // survives navigation, not that its response (and Set-Cookie) is
    // processed before a near-simultaneous reload's own request is already
    // in flight. A synchronous write has no such window — it's committed
    // before this function returns, let alone before any possible reload.
    // Safe to do client-side: this is a non-sensitive "have I seen this
    // before" preference flag, not an auth/security-relevant cookie.
    document.cookie = `${ARRIVAL_COOKIE_NAME}=1; path=/; max-age=${ARRIVAL_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
    window.dispatchEvent(new Event(ARRIVAL_COMPLETE_EVENT));

    setIsExiting(true);
    // Match the CSS: under reduced motion the global rule collapses the
    // exit transition to ~0.01ms, so the DOM (including the now-invisible
    // "Enter RUNAVERA" button) shouldn't still be tabbable for a full
    // second afterward — unmount on the same near-instant timescale.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => setIsDone(true), prefersReducedMotion ? 0 : EXIT_DURATION_MS);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape only — not "any key", so this doesn't fight assistive-tech
      // navigation (arrow keys reading content, etc). Tab/Enter/Space on
      // the control itself already work natively as a real <button>.
      if (event.key === "Escape") exit();
    };
    // A small threshold, not "any scroll" — guards against iOS rubber-band
    // overscroll or a sub-pixel scroll-anchoring jitter being misread as an
    // intentional skip gesture. A real scroll gesture clears this easily.
    const handleScroll = () => {
      if (window.scrollY > 15) exit();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      className={[
        "relative flex h-dvh flex-col overflow-hidden bg-deep-water",
        "transition-[opacity,max-height] duration-1000 ease-out",
        isExiting ? "max-h-0 opacity-0" : "max-h-[100dvh] opacity-100",
      ].join(" ")}
    >
      {/* Identity block centers within whatever space remains above the
          Current band (flex-1), never a hardcoded viewport percentage —
          guarantees no overlap between the tagline and the Current lines
          regardless of exact rendered heights at any viewport size. */}
      <div className="pointer-events-none flex flex-1 flex-col items-center justify-center px-6">
        <Logo
          variant="primary"
          priority
          style={{ animation: "arrival-fade-in 500ms ease-out both" }}
          className={[
            "h-[clamp(140px,34vw,200px)] w-[clamp(140px,34vw,200px)] object-contain",
            "tablet:h-[clamp(200px,20vh,320px)] tablet:w-[clamp(200px,20vh,320px)]",
            "transition-transform duration-1000 ease-out",
            isExiting ? "scale-[0.3]" : "",
          ].join(" ")}
        />
        <p
          style={{ animation: "arrival-fade-in 500ms ease-out 950ms both" }}
          className="text-display mt-[6vh] text-center text-limestone tablet:mt-[8vh]"
        >
          Move beyond the Maas &amp; Roer.
        </p>
      </div>

      {/* Current already sets its own aria-hidden internally. min-h guards
          against a short landscape viewport (e.g. a rotated phone) squashing
          the vh-based height into a near-flat, distorted band. */}
      <Current className="pointer-events-none h-[45vh] min-h-[220px] w-full shrink-0 tablet:h-[60vh]" />

      <button
        type="button"
        onClick={exit}
        className="text-nav absolute bottom-10 left-1/2 -translate-x-1/2 text-mist underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-sunset hover:decoration-current focus-visible:text-sunset"
      >
        Enter RUNAVERA
      </button>
    </div>
  );
}
