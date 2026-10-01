import { defineRouting } from "next-intl/routing";

// URL is the sole source of truth for language (confirmed Phase 13 decision):
// English stays unprefixed (`localePrefix: "as-needed"`), and
// `localeDetection: false` disables next-intl's default Accept-Language- and
// cookie-based auto-redirect, so an unprefixed route always serves English
// regardless of browser language or a previously visited locale.
export const routing = defineRouting({
  locales: ["en", "nl", "de"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];

export function isAppLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}
