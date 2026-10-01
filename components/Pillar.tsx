"use client";

import Link, { useLinkStatus } from "next/link";
import { ViewTransition } from "react";

interface PillarProps {
  name: string;
  slug: string;
  tagline: string;
  href: string;
  className?: string;
  isChosen: boolean;
  isDimmed: boolean;
  onChoose: () => void;
}

/**
 * Must be a descendant of the `Link` it reports on, not the component that
 * renders the `Link` itself (Next.js's own constraint on useLinkStatus).
 * `pending` is supplemental only — Next.js skips it entirely for an
 * already-prefetched navigation, so it never gates the chosen-state visual
 * in Pillar itself, only adds a small extra affordance when it does fire.
 */
function PillarLinkLabel({ name }: { name: string }) {
  const { pending } = useLinkStatus();
  return <span className={pending ? "text-sunset" : undefined}>Discover {name}</span>;
}

/**
 * One of the four experience directions (Escapes/Explore/Private/Gather).
 * `isChosen`/`isDimmed`/`onChoose` are lifted into PillarGroup (a client
 * component — the Server Components that render it, app/page.tsx and
 * app/plan/page.tsx, can't hold state themselves). `name` renders as an
 * <h3> — nested under a pillars section's own <h2>, which whichever page
 * renders `PillarGroup` is responsible for providing (see app/page.tsx and
 * app/plan/page.tsx) — decoupled from that semantic level like every other
 * heading in this project.
 *
 * The CTA renders `next/link`'s `<Link>` instead of `TextLink` — the one
 * scoped exception in the site, so this navigation is eligible for a React
 * `<ViewTransition>`. Its visual classes are copied from TextLink's own
 * `default` variant rather than importing TextLink itself, since TextLink
 * always renders a plain `<a>` and isn't meant to change for this one case.
 */
export function Pillar({
  name,
  slug,
  tagline,
  href,
  className,
  isChosen,
  isDimmed,
  onChoose,
}: PillarProps) {
  const classes = [
    "group relative max-w-xl transition-opacity duration-200",
    isDimmed ? "opacity-40" : "opacity-100",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const heading = (
    <h3
      className={[
        "text-h1 transition-colors duration-200",
        isChosen ? "text-sunset" : "text-limestone",
      ].join(" ")}
    >
      {name}
    </h3>
  );

  return (
    <div className={classes}>
      {/* Hairline tick — extends the section's shared Mist current motif
          with one small per-pillar mark, brightening to Sunset on
          hover/focus/chosen (see CLAUDE.md's Phase 6 section). */}
      <span
        aria-hidden="true"
        className={[
          "absolute -left-4 top-2 h-6 w-px transition-colors duration-200",
          isChosen
            ? "bg-sunset"
            : "bg-mist/40 group-hover:bg-sunset group-focus-within:bg-sunset",
        ].join(" ")}
      />
      {/* Only the chosen pillar's heading ever carries a view-transition
          name — the other three stay unwrapped, so at most one exists in
          the tree at a time by construction (View Transitions require
          uniqueness). Phase 7's real destination page is expected to give
          its own matching heading this same `pillar-name-${slug}` value;
          this phase can only build and verify the departure side. */}
      {isChosen ? (
        <ViewTransition name={`pillar-name-${slug}`}>{heading}</ViewTransition>
      ) : (
        heading
      )}
      <p className="text-body-lg mt-tight text-mist">{tagline}</p>
      <Link
        href={href}
        onClick={onChoose}
        transitionTypes={["pillar-choice"]}
        className="mt-component inline-block text-body text-limestone underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-sunset hover:decoration-current"
      >
        <PillarLinkLabel name={name} />
      </Link>
    </div>
  );
}
