"use client";

import { startTransition, useState } from "react";

import { Pillar } from "@/components/Pillar";
import { pillars } from "@/lib/pillars";

// Composition detail shared by the homepage and /plan (Phase 10 reuses this
// component directly rather than inventing a second chooser) — each
// pillar's horizontal/vertical offset within the asymmetric layout (see
// CLAUDE.md's Homepage and Phase 10 sections). Not pillar *content*, so it
// stays local here rather than in the shared lib/pillars.ts data both this
// component and the detail pages consume.
//
// Private gets a larger gap at every width, not just tablet+ — varied
// vertical spacing is the pillars' visual differentiator on mobile (no
// horizontal offset room there), so it needs to actually vary at the
// mobile breakpoint too, not only above it.
const layoutClassNames: Record<string, string> = {
  explore: "mt-group tablet:ml-16 tablet:mt-section",
  private: "mt-section tablet:ml-8 tablet:mt-atmosphere",
  gather: "mt-group tablet:ml-24 tablet:mt-section",
};

/**
 * Owns which pillar is currently chosen. Lifted here because both pages
 * that render this (app/page.tsx and app/plan/page.tsx) are async Server
 * Components and can't hold state themselves. Set on click/Enter
 * (see Pillar.tsx) without preventing the click, so real navigation proceeds
 * alongside the chosen-state visual.
 *
 * `startTransition` is required, not optional decoration: React's own docs
 * state plainly that `<ViewTransition>` animations activate on Transitions,
 * and that "regular setState calls do not trigger them" — confirmed the
 * hard way, by testing. A plain `setSelectedSlug` call rendered the
 * conditional `<ViewTransition>` wrapper correctly but never actually
 * engaged the browser's view-transition machinery (no `view-transition-name`
 * ever appeared, even at rest). Wrapping the same call in `startTransition`
 * fixed it — the chosen-state CSS visual (§ Pillar.tsx) still works
 * regardless, since it never depended on this either way.
 */
export function PillarGroup() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  return (
    <>
      {pillars.map((pillar) => (
        <Pillar
          key={pillar.slug}
          name={pillar.name}
          slug={pillar.slug}
          tagline={pillar.tagline}
          href={`/experiences/${pillar.slug}`}
          className={layoutClassNames[pillar.slug]}
          isChosen={selectedSlug === pillar.slug}
          isDimmed={selectedSlug !== null && selectedSlug !== pillar.slug}
          onChoose={() => startTransition(() => setSelectedSlug(pillar.slug))}
        />
      ))}
    </>
  );
}
