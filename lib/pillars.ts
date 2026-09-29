export interface Pillar {
  name: string;
  slug: string;
  tagline: string;
  description: string;
}

// Single source of truth for the four experience directions — consumed by
// PillarGroup (homepage summary) and app/experiences/[slug]/page.tsx (detail
// content), so the two can't drift out of sync. Slugs match the naming
// convention Phase 6 already established for each pillar's
// `pillar-name-${slug}` view-transition contract.
export const pillars: Pillar[] = [
  {
    name: "Escapes",
    slug: "escapes",
    tagline: "Slow down.",
    description:
      "An escape asks for nothing but your attention. We set the pace by the water itself — a slower rhythm, a longer look at the horizon, a place to let the day settle.",
  },
  {
    name: "Explore",
    slug: "explore",
    tagline: "Go further.",
    description:
      "The Maasplassen reward the curious. Beyond the open water, quiet inlets and shoreline paths unfold for those willing to go a little further than the obvious route.",
  },
  {
    name: "Private",
    slug: "private",
    tagline: "Make it yours.",
    description:
      "Some moments are meant for a smaller circle. We shape private experiences around the people you bring — the pace, the setting, and the company all your own.",
  },
  {
    name: "Gather",
    slug: "gather",
    tagline: "Bring people together.",
    description:
      "The best gatherings happen where there's room to spread out and something to look at together. We build around groups who want the water as their backdrop.",
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((pillar) => pillar.slug === slug);
}
