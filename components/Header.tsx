"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/Container";
import { DesktopNav } from "@/components/DesktopNav";
import { Logo } from "@/components/Logo";
import { MenuButton } from "@/components/MenuButton";
import { MobileNav } from "@/components/MobileNav";
import { usePathname } from "@/i18n/navigation";
import { ARRIVAL_COMPLETE_EVENT } from "@/lib/arrival-events";

export type HeaderTheme = "dark" | "light" | "transparent-media";

interface HeaderProps {
  /**
   * Explicit, page-declared theme for the header's "at rest" (not scrolled)
   * appearance — the default value, supplied by whoever renders Header
   * (currently `"dark"`, passed once from app/layout.tsx).
   *
   * One narrow, named exception (Phase 8, revised from Phase 7): `/` forces
   * `transparent-media` regardless of this prop — the homepage's own
   * full-bleed photographic hero is the genuine special case, not an
   * arbitrary default the rest of the site deviates from. This flipped
   * direction from Phase 7's original shape (`/experiences*` forcing
   * `dark` against a `transparent-media` default) once a second real route
   * (`/maasplassen`) also needed `dark` — two of three real routes wanting
   * the same thing made `dark` the honest default, not `transparent-media`.
   * This is a fixed, explicit route check, not a generalized theme engine:
   * still NOT auto-detected in the IntersectionObserver/scroll-position
   * sense — no page has real editorial/cinematic sections yet that would
   * justify that (see CLAUDE.md). If a genuinely different third case
   * appears later, that's the point to build the real per-page mechanism
   * Phase 5 deferred, not to keep flipping or appending routes here.
   */
  theme?: HeaderTheme;
  /**
   * Initial visibility seed for Arrival (Phase 4). The header starts
   * suppressed on the homepage and is revealed when Arrival exits. It is
   * reset on client navigation back to the homepage.
   */
  suppressed?: boolean;
}

// "dark"/"light" cover Deep Water-or-Maas vs. Limestone sections.
// "transparent-media" renders its gradient scrim as a separate overlay element
// (see the scrim below), not on the header background, so the scrim can fade
// with opacity instead of being removed instantly when the header goes solid.
const themeStyles: Record<HeaderTheme, string> = {
  dark: "bg-transparent text-limestone",
  "transparent-media": "bg-transparent text-limestone",
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

export function Header({ theme: themeProp = "dark", suppressed: initialSuppressed = false }: HeaderProps) {
  const t = useTranslations("Logo");
  // `usePathname` comes from `i18n/navigation.ts` (next-intl) — it returns
  // the locale-stripped pathname, so the homepage is always "/" regardless
  // of which locale ("/", "/nl", "/de") is actually active (Phase 13). The
  // checks below are unchanged as a result — no new per-locale branching.
  const pathname = usePathname();
  const [arrivalState, setArrivalState] = useState(() => ({
    pathname,
    suppressed: initialSuppressed,
  }));
  if (arrivalState.pathname !== pathname) {
    setArrivalState({ pathname, suppressed: pathname === "/" });
  }
  // Arrival renders on every homepage visit. Reset the header before paint
  // when client navigation returns to `/`, so it stays behind the intro.
  const suppressed = pathname === "/" && arrivalState.suppressed;
  // Phase 8 exception (see the `theme` prop doc above): the homepage forces
  // `transparent-media`, overriding whatever the page renderer passed.
  // Simpler than the check it replaces — "/" has no trailing-slash/prefix
  // ambiguity to guard against, unlike `/experiences` vs. `/experiences-extra`.
  const theme = pathname === "/" ? "transparent-media" : themeProp;
  const isScrolled = useIsScrolled(SCROLL_THRESHOLD);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = "mobile-nav";

  useEffect(() => {
    const handleArrivalComplete = () => {
      setArrivalState((current) => ({ ...current, suppressed: false }));
    };
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
        "fixed inset-x-0 top-0 z-50 transition-[background-color,height,opacity] duration-200 ease-out",
        heightClasses,
        suppressed ? "pointer-events-none opacity-0" : "",
        isScrolled
          ? "border-b border-mist/20 bg-deep-water text-limestone"
          : themeStyles[theme],
      ].join(" ")}
    >
      {theme === "transparent-media" && (
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-deep-water/60 to-transparent transition-opacity duration-200 ease-out",
            isScrolled ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
      )}
      <Container size="wide" className="flex h-full items-center justify-between">
        <Logo
          variant="primary"
          priority
          alt={t("alt")}
          className={[
            "object-contain transition-[height,width] duration-200 ease-out",
            logoClasses,
          ].join(" ")}
        />
        <DesktopNav />
        <MenuButton ref={menuButtonRef} isOpen={isMenuOpen} onClick={toggleMenu} controlsId={menuId} />
      </Container>

      <MobileNav id={menuId} isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
}
