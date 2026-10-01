import { notFound } from "next/navigation";

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
export default function CatchAll(): never {
  notFound();
}
