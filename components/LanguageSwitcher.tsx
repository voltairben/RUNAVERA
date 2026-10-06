"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { localeOptions } from "@/lib/locales";

interface LanguageSwitcherProps {
  /** Passed by MobileNav so tapping a language also closes the open menu. */
  onNavigate?: () => void;
  className?: string;
}

/**
 * Keeps the visitor on the equivalent page in the chosen language — `Link`
 * with an explicit `locale` override, given the *current* (locale-stripped)
 * pathname, is next-intl's own documented pattern for exactly this
 * component. Same `Link` primitive TextLink/Button/Pillar all use (Phase
 * 13 §4), not a second mechanism. Locale names render as endonyms
 * (English/Nederlands/Deutsch) — fixed values from lib/locales.ts, not
 * translated strings.
 */
export function LanguageSwitcher({ onNavigate, className }: LanguageSwitcherProps) {
  const t = useTranslations("LanguageSwitcher");
  const activeLocale = useLocale();
  const pathname = usePathname();

  const classes = ["flex items-center gap-hairline text-nav", className].filter(Boolean).join(" ");

  return (
    <nav aria-label={t("label")} className={classes}>
      {localeOptions.map((option, index) => {
        const isActive = option.code === activeLocale;
        return (
          <span key={option.code} className="flex items-center gap-hairline">
            {index > 0 && (
              <span aria-hidden="true" className="text-mist/40">
                /
              </span>
            )}
            <Link
              href={pathname}
              locale={option.code}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              className={[
                "underline decoration-transparent underline-offset-4 transition-colors duration-200 ease-out hover:decoration-current",
                isActive ? "text-sunset" : "text-mist hover:text-limestone",
              ].join(" ")}
            >
              {option.label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
