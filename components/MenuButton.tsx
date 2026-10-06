"use client";

import { forwardRef } from "react";
import { useTranslations } from "next-intl";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  controlsId: string;
}

// The one functionally-necessary icon in this navigation (not decorative) —
// plain inline markup, no icon library dependency.
export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  { isOpen, onClick, controlsId },
  ref
) {
  const t = useTranslations("MenuButton");

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-label={isOpen ? t("closeMenu") : t("openMenu")}
      className="flex h-11 w-11 items-center justify-center text-mist transition-colors duration-200 ease-out hover:text-sunset focus-visible:text-sunset tablet:hidden"
    >
      <span className="flex h-4 w-6 flex-col justify-between">
        <span
          className={[
            "h-px w-full bg-current transition-transform duration-200 ease-out",
            isOpen ? "translate-y-[7px] rotate-45" : "",
          ].join(" ")}
        />
        <span
          className={[
            "h-px w-full bg-current transition-opacity duration-200 ease-out",
            isOpen ? "opacity-0" : "",
          ].join(" ")}
        />
        <span
          className={[
            "h-px w-full bg-current transition-transform duration-200 ease-out",
            isOpen ? "-translate-y-[7px] -rotate-45" : "",
          ].join(" ")}
        />
      </span>
    </button>
  );
});
