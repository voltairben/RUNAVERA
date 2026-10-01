export interface NavItem {
  /** Key within the "Nav" messages namespace (messages/{locale}.json). */
  labelKey: string;
  href: string;
}

// Single source of truth for nav links — consumed by both DesktopNav and
// MobileNav so they can't drift out of sync. `href`s stay locale-invariant
// (locale-prefixing happens where they're rendered, via TextLink/Button's
// next-intl `Link` — see Phase 13); labels are translation-key references,
// not literal strings, resolved per locale in messages/{locale}.json.
export const primaryNavItems: NavItem[] = [
  { labelKey: "experiences", href: "/experiences" },
  { labelKey: "maasplassen", href: "/maasplassen" },
  { labelKey: "about", href: "/about" },
];

export const ctaNavItem: NavItem = {
  labelKey: "planCta",
  href: "/plan",
};
