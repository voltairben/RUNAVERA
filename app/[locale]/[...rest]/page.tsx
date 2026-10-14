import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { isAppLocale, routing } from "@/i18n/routing";

// Explicit-notFound() catch-all for any path under a resolved locale that
// doesn't match a real page. Confirmed empirically: a genuinely unmatched
// route (no page.tsx matches anywhere) always bubbles to the root
// app/not-found.tsx — a nested app/[locale]/not-found.tsx only activates
// for an explicit notFound() call thrown from within an already-*matched*
// page. This catch-all IS that match: it exists purely to call notFound()
// itself, so the nested, localized not-found.tsx renders — both for a
// genuine within-locale gap (e.g. /nl/does-not-exist → Dutch) and for an
// unrecognized locale-looking segment, which next-intl's "as-needed"
// prefix mode resolves as literal English content rather than an invalid
// locale value (e.g. /fr/about → matches here with locale "en", rest
// ["fr","about"] → renders the English not-found.tsx, not the neutral
// root one — confirmed via direct testing). See app/not-found.tsx and
// CLAUDE.md's Phase 13 section.
//
// Phase 23 finding: generateMetadata is resolved against this matched
// segment (this page, under app/[locale]/layout.tsx) regardless of which
// not-found boundary the body's notFound() call later bubbles to —
// confirmed against this installed Next version's own generate-metadata.md
// docs, which describe metadata as resolved from the matched segment tree
// independently of body content. Without a generateMetadata here, every
// not-found case inherited the layout's ordinary default title instead of
// a "not found" title — including the root app/not-found.tsx case (an
// invalid locale-looking segment, e.g. /api/..., falls back to
// routing.defaultLocale here, same as the layout's own fallback), even
// though that case's rendered *body* is the different, true root boundary.
// This is the same locale-resolution fallback app/[locale]/layout.tsx's own
// generateMetadata uses, kept consistent on purpose.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isAppLocale(localeParam) ? localeParam : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "NotFound" });
  return { title: t("heading") };
}

export default function CatchAll(): never {
  notFound();
}
