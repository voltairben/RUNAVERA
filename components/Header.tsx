"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Container } from "@/components/Container";
import { DesktopNav } from "@/components/DesktopNav";
import { Logo } from "@/components/Logo";
import { MenuButton } from "@/components/MenuButton";
import { MobileNav } from "@/components/MobileNav";
import { ARRIVAL_COMPLETE_EVENT } from "@/lib/arrival-events";

export type HeaderTheme = "dark" | "light" | "transparent-media";

interface HeaderProps {
  /**
   * Explicit, page-declared theme for the header's "at rest" (not scrolled)
   * appearance — NOT auto-detected. Whoever renders Header sets this.
   *
   * Deliberately not a generalized IntersectionObserver-based section-theme
   * engine: no page has real editorial/cinematic sections yet that would
   * justify one. This prop is the "clear, maintainable theme/state API"
   * instead — automatic section observation is worth evaluating once real
   * sections exist (see CLAUDE.md), not built speculatively now.
   */
  theme?: HeaderTheme;
  /**
   * Initial visibility seed for the Arrival experience (Phase 4) — computed
   * server-side in app/layout.tsx from the arrival cookie, so a returning
   * visitor's header is correct from first paint with no flash. NOT a
   * live-controlled prop after mount: Header owns the ongoing value itself
   * (see `suppressed` state below) and flips it to `false` when it hears
   * the `ARRIVAL_COMPLETE_EVENT` window event Arrival dispatches on exit.
   */
  suppressed?: boolean;
}

// "dark"/"light" cover Deep Water-or-Maas vs. Limestone sections.
// "transparent-media" is the one documented gradient exception from Phase 2
// (a scrim simulating light falloff for legibility over full-bleed
// photography — not decorative depth).
const themeStyles: Record<HeaderTheme, string> = {
  dark: "bg-transparent text-limestone",
  "transparent-media": "bg-gradient-to-b from-deep-water/60 to-transparent text-limestone",
  light: "bg-transparent text-deep-water",
};

const SCROLL_THRESHOLD = 24;

function useIsScrolled(threshold: number) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}

export function Header({ theme = "dark", suppressed: initialSuppressed = false }: HeaderProps) {
  const [suppressedState, setSuppressed] = useState(initialSuppressed);
  const pathname = usePathname();
  // Arrival only ever renders at "/" — nothing would ever dispatch
  // ARRIVAL_COMPLETE_EVENT to release a header that started suppressed on
  // any other route (e.g. a first-time visitor whose first hit is a direct
  // link to a future /experiences). `usePathname()` is live and reactive,
  // so this also stays correct across client-side App Router navigation
  // without needing to re-derive `initialSuppressed`.
  const suppressed = pathname === "/" && suppressedState;
  const isScrolled = useIsScrolled(SCROLL_THRESHOLD);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = "mobile-nav";

  useEffect(() => {
    const handleArrivalComplete = () => setSuppressed(false);
    window.addEventListener(ARRIVAL_COMPLETE_EVENT, handleArrivalComplete);
    return () => window.removeEventListener(ARRIVAL_COMPLETE_EVENT, handleArrivalComplete);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };
  const toggleMenu = () => (isMenuOpen ? closeMenu() : setIsMenuOpen(true));

  // If the viewport crosses into tablet+ while the mobile menu is open
  // (resize/rotate), force it closed — otherwise MobileNav gets CSS-hidden
  // (`tablet:hidden`) while `isOpen` stays true, orphaning the
  // `scroll-locked` body class with no visible trigger left to undo it.
  useEffect(() => {
    if (!isMenuOpen) return;
    const mediaQuery = window.matchMedia("(min-width: 48rem)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isMenuOpen]);

  // Mobile header is a constant 64px (h-16), no scroll-shrink — only
  // tablet+ gets the subtle shrink to 64px from --header-height (guardrail:
  // restrained, no aggressive scaling, easy to remove later by dropping the
  // `isScrolled` branch below). Reads the same CSS variable `.pt-header`
  // reserves as page clearance, so the two can't drift apart.
  const heightClasses = isScrolled ? "h-16" : "h-16 tablet:h-[var(--header-height)]";
  const logoClasses = isScrolled ? "h-8 w-8" : "h-8 w-8 tablet:h-10 tablet:w-10";

  return (
    <header
      aria-hidden={suppressed || undefined}
      inert={suppressed}
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background-color,height,opacity] duration-200",
        heightClasses,
        suppressed ? "pointer-events-none opacity-0" : "",
        isScrolled
          ? "border-b border-mist/20 bg-deep-water text-limestone"
          : themeStyles[theme],
      ].join(" ")}
    >
      <Container size="wide" className="flex h-full items-center justify-between">
        <Logo
          variant="primary"
          priority
          className={["object-contain transition-[height,width] duration-200", logoClasses].join(
            " "
          )}
        />
        <DesktopNav />
        <MenuButton ref={menuButtonRef} isOpen={isMenuOpen} onClick={toggleMenu} controlsId={menuId} />
      </Container>

      <MobileNav id={menuId} isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
}
