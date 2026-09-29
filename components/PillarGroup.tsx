"use client";

import { startTransition, useState } from "react";

import { Pillar } from "@/components/Pillar";

interface PillarData {
  name: string;
  slug: string;
  tagline: string;
  href: string;
  className?: string;
}

const pillars: PillarData[] = [
  { name: "Escapes", slug: "escapes", tagline: "Slow down.", href: "/experiences" },
  {
    name: "Explore",
    slug: "explore",
    tagline: "Go further.",
    href: "/experiences",
    className: "mt-group tablet:ml-16 tablet:mt-section",
  },
  // Private gets a larger gap at every width, not just tablet+ — varied
  // vertical spacing is the pillars' visual differentiator on mobile (no
  // horizontal offset room there), so it needs to actually vary at the
  // mobile breakpoint too, not only above it.
  {
    name: "Private",
    slug: "private",
    tagline: "Make it yours.",
    href: "/experiences",
    className: "mt-section tablet:ml-8 tablet:mt-atmosphere",
  },
  {
    name: "Gather",
    slug: "gather",
    tagline: "Bring people together.",
    href: "/experiences",
    className: "mt-group tablet:ml-24 tablet:mt-section",
  },
];

/**
 * Owns which pillar is currently chosen. Lifted here because app/page.tsx is
 * an async Server Component and can't hold state itself. Set on click/Enter
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
          {...pillar}
          isChosen={selectedSlug === pillar.slug}
          isDimmed={selectedSlug !== null && selectedSlug !== pillar.slug}
          onChoose={() => startTransition(() => setSelectedSlug(pillar.slug))}
        />
      ))}
    </>
  );
}
