"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavLink } from "@/components/NavLink";
import { ctaNavItem, primaryNavItems } from "@/lib/navigation";

// 768px+ only (see globals.css breakpoints) — the collapse boundary sits at
// --breakpoint-tablet, not --breakpoint-desktop, so tablet gets the full
// horizontal nav too, not the mobile takeover.
export function DesktopNav() {
  const t = useTranslations("Nav");

  return (
    <div className="hidden items-center gap-tight tablet:flex desktop:gap-component">
      <ul className="flex items-center gap-tight whitespace-nowrap text-nav desktop:gap-content">
        {primaryNavItems.map((item) => (
          <li key={item.href}>
            <NavLink href={item.href}>{t(item.labelKey)}</NavLink>
          </li>
        ))}
      </ul>
      <LanguageSwitcher />
      <Button variant="secondary" href={ctaNavItem.href}>
        {t(ctaNavItem.labelKey)}
      </Button>
    </div>
  );
}
