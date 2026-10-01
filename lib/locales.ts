import type { AppLocale } from "@/i18n/routing";

export interface LocaleOption {
  code: AppLocale;
  label: string;
}

// Single source of truth for the language switcher (components/LanguageSwitcher.tsx)
// — mirrors lib/navigation.ts's existing one-source precedent. Each language is
// labeled in itself (an endonym), not translated — "English"/"Nederlands"/"Deutsch"
// are fixed values, not message keys.
export const localeOptions: LocaleOption[] = [
  { code: "en", label: "English" },
  { code: "nl", label: "Nederlands" },
  { code: "de", label: "Deutsch" },
];
