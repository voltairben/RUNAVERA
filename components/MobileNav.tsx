"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavLink } from "@/components/NavLink";
import { ctaNavItem, primaryNavItems } from "@/lib/navigation";

interface MobileNavProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

// Full-screen takeover, not a drawer/dropdown-card — deliberately avoids the
// generic "hamburger reveals a white card" pattern. Starts below the
// (constant, unscaled) 64px mobile header so the trigger — now an X — stays
// visible and clickable while open.
export function MobileNav({ id, isOpen, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Nav");
  const tMobileNav = useTranslations("MobileNav");

  // Scroll lock while open.
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("scroll-locked");
    return () => document.body.classList.remove("scroll-locked");
  }, [isOpen]);

  // Focus the panel on open; trap Tab inside it; Escape closes.
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    panel.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      id={id}
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={tMobileNav("dialogLabel")}
      hidden={!isOpen}
      className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-center gap-group bg-deep-water px-6 tablet:hidden"
    >
      <ul className="flex flex-col gap-component text-h4">
        {primaryNavItems.map((item) => (
          <li key={item.href}>
            <NavLink href={item.href} onClick={onClose}>
              {t(item.labelKey)}
            </NavLink>
          </li>
        ))}
      </ul>
      <LanguageSwitcher onNavigate={onClose} />
      <Button variant="primary" href={ctaNavItem.href} onClick={onClose} className="w-full">
        {t(ctaNavItem.labelKey)}
      </Button>
    </div>
  );
}
