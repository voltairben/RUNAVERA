"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavLink } from "@/components/NavLink";
import { ctaNavItem, primaryNavItems } from "@/lib/navigation";

interface MobileNavProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  dialogRef: RefObject<HTMLDivElement | null>;
}

// Full-screen takeover, not a drawer/dropdown-card — deliberately avoids the
// generic "hamburger reveals a white card" pattern. Starts below the
// (constant, unscaled) 64px mobile header so the trigger — now an X — stays
// visible and clickable while open.
export function MobileNav({ id, isOpen, onClose, dialogRef }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Nav");

  // Scroll lock while open.
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("scroll-locked");
    return () => document.body.classList.remove("scroll-locked");
  }, [isOpen]);

  // Focus the first panel link on open. The Tab cycle covers the whole dialog
  // (the visible close control in the header, then the panel's links and
  // actions) and skips rendered-hidden desktop links; Escape closes.
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    const dialog = dialogRef.current;
    if (!panel || !dialog) return;

    const getFocusable = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")).filter(
        (el) => el.getClientRects().length > 0,
      );

    getFocusable()
      .find((el) => panel.contains(el))
      ?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const outside = !dialog.contains(active);

      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, dialogRef]);

  return (
    <div
      id={id}
      ref={panelRef}
      inert={!isOpen}
      className={[
        "fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-center gap-group bg-deep-water px-6 tablet:hidden",
        isOpen
          ? "visible opacity-100 transition-opacity duration-200 ease-out"
          : "invisible opacity-0 transition-[opacity,visibility] duration-200 ease-out",
      ].join(" ")}
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
