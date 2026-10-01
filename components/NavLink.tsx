"use client";

import type { ReactNode } from "react";

import { TextLink } from "@/components/TextLink";
import { usePathname } from "@/i18n/navigation";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  /** Passed by MobileNav so tapping a link closes the open menu. */
  onClick?: () => void;
}

/**
 * Wraps TextLink with routing-aware active state (`usePathname`). Kept
 * separate from TextLink itself, which is deliberately routing-agnostic —
 * this is the thin, page-shape-specific layer on top of it.
 *
 * Uses TextLink's `default` variant (Limestone → Sunset on hover) rather
 * than the Phase 3 plan's literal "Mist default" — nav links are primary
 * wayfinding UI, not secondary/muted detail text. A deliberate deviation
 * from the plan text, not a silent change.
 *
 * Active-state color comes from the global `[aria-current="page"]` rule in
 * globals.css, not a per-component override — avoids depending on Tailwind
 * utility ordering to beat TextLink's own color class.
 *
 * `usePathname` comes from `i18n/navigation.ts` (next-intl), not
 * `next/navigation` — it returns the locale-stripped pathname, so this
 * comparison against `lib/navigation.ts`'s locale-agnostic `href` values
 * keeps working unchanged across `/`, `/nl`, `/de` (Phase 13).
 */
export function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  // Boundary-aware match, not a bare `startsWith` — that would also match
  // an unrelated future route sharing the same prefix (e.g. `/experiences`
  // vs. a hypothetical `/experiences-extra`). The `+ "/"` requires a real
  // path separator before treating it as "within this nav item's section"
  // (e.g. `/experiences/escapes`, a real child route since Phase 7).
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <TextLink href={href} onClick={onClick} aria-current={isActive ? "page" : undefined}>
      {children}
    </TextLink>
  );
}
