import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Header } from "@/components/Header";
import { ARRIVAL_COOKIE_NAME } from "@/lib/arrival-cookie";
import { routing, isAppLocale } from "@/i18n/routing";

import "../globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Defense-in-depth: next-intl's own middleware (proxy.ts) never produces a
// `locale` value outside routing.locales in practice (confirmed via
// testing — an unrecognized segment like "fr" resolves as literal English
// content, not an invalid locale param), so this mostly guards against a
// future change to that behavior rather than something reachable today.
export const dynamicParams = false;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071c21",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isAppLocale(localeParam) ? localeParam : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Layout" });

  return {
    title: {
      default: t("metadataTitle"),
      // Fixed literal, not translated — "RUNAVERA" is the brand name.
      template: "%s | RUNAVERA",
    },
    description: t("metadataDescription"),
    // No manual `icons` field: app/icon.png and app/apple-icon.png are picked
    // up automatically via Next.js's file-based metadata convention.
  };
}

// Document language is now locale-aware (`<html lang={locale}>`) — the
// EN/NL/DE internationalisation phase this was deferred to since Phase 1.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  // Defense-in-depth alongside `dynamicParams = false` above — see the
  // Phase 13 implementation plan's note that exactly which mechanism
  // rejects an unsupported locale was an implementation-time verification
  // item, not a settled single guarantee. `notFound()` returns `never`, so
  // `localeParam` narrows to `AppLocale` for the rest of this function.
  if (!isAppLocale(localeParam)) {
    notFound();
  }
  const locale = localeParam;

  const cookieStore = await cookies();
  const hasArrived = cookieStore.has(ARRIVAL_COOKIE_NAME);
  const t = await getTranslations({ locale, namespace: "Layout" });

  return (
    <html lang={locale} className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <body>
        {/* NextIntlClientProvider wraps the whole body shell — skip link,
            Header, and page content together — not just {children}. Header
            (and DesktopNav/MobileNav/LanguageSwitcher through it) is a
            Client Component that needs useTranslations; a selective wrap
            around only {children} would leave it with no translation
            context. The skip link's own text is resolved server-side just
            above (one more getTranslations call alongside the existing
            cookies() read) — it doesn't need the client provider itself,
            but renders inside the same boundary rather than a carve-out. */}
        <NextIntlClientProvider locale={locale}>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[60] -translate-y-20 bg-limestone px-4 py-2 text-body-sm text-deep-water transition-transform duration-200 ease-out focus:translate-y-0"
          >
            {t("skipToContent")}
          </a>
          {/* Initial `suppressed` value only — Header manages that as its own
              state from here on and flips it via the arrival-complete event
              (see components/Header.tsx). Assumes Arrival only ever renders
              at the homepage of each locale — see Header.tsx's own
              locale-stripped-pathname homepage check.

              `theme="dark"` is the SITE-WIDE default (Header mounts once,
              globally). Header forces `transparent-media` back on for the
              homepage specifically — see its own doc comment. */}
          <Header suppressed={!hasArrived} theme="dark" />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
