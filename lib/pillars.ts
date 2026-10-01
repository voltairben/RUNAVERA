// Single source of truth for the four experience directions' *identity*
// (slug + iteration order) — consumed by PillarGroup (homepage/plan summary)
// and app/[locale]/experiences/[slug]/page.tsx (detail content), so the two
// can't drift out of sync. Translated content (name/tagline/description)
// lives in messages/{locale}.json under "Pillars" (Phase 13) — slugs stay
// locale-invariant on purpose, matching the `pillar-name-${slug}`
// view-transition contract Phase 6 already established, and because
// translating a URL segment would need a per-locale slug map this project
// has no real reason to build.
export const pillarSlugs = ["escapes", "explore", "private", "gather"] as const;

export type PillarSlug = (typeof pillarSlugs)[number];

export function isPillarSlug(value: string): value is PillarSlug {
  return (pillarSlugs as readonly string[]).includes(value);
}
