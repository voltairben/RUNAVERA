export interface NavItem {
  label: string;
  href: string;
}

// Single source of truth for nav links — consumed by both DesktopNav and
// MobileNav so they can't drift out of sync. Routes below don't exist yet
// (Experience pages, About, Maasplassen, Plan are all future phases) — the
// links are wired to their intended future paths on purpose.
export const primaryNavItems: NavItem[] = [
  { label: "Experiences", href: "/experiences" },
  { label: "The Maasplassen", href: "/maasplassen" },
  { label: "About", href: "/about" },
];

export const ctaNavItem: NavItem = {
  label: "Plan your experience",
  href: "/plan",
};
