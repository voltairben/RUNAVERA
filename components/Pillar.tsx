"use client";

import { useLinkStatus } from "next/link";
import { useTranslations } from "next-intl";
import { ViewTransition } from "react";

import { Link } from "@/i18n/navigation";

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
  const t = useTranslations("Pillars");
  return <span className={pending ? "text-sunset" : undefined}>{t("discover", { name })}</span>;
}

/**
 * One of the four experience directions (Escapes/Explore/Private/Gather).
 * `isChosen`/`isDimmed`/`onChoose` are lifted into PillarGroup (a client
 * component — the Server Components that render it, app/[locale]/page.tsx
 * and app/[locale]/plan/page.tsx, can't hold state themselves). `name`
 * renders as an <h3> — nested under a pillars section's own <h2>, which
 * whichever page renders `PillarGroup` is responsible for providing —
 * decoupled from that semantic level like every other heading in this
 * project.
 *
 * The CTA renders `i18n/navigation.ts`'s locale-aware `Link` directly (the
 * same primitive TextLink uses), so this navigation can pass
 * `transitionTypes` and take part in a React `<ViewTransition>`. Its visual
 * classes are copied from TextLink's `default` variant rather than imported
 * from it.
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
    "group relative max-w-xl transition-opacity duration-200 ease-out",
    isDimmed ? "opacity-40" : "opacity-100",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const heading = (
    <h3
      className={[
        "text-h1 transition-colors duration-200 ease-out",
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
          "absolute -left-4 top-2 h-6 w-px transition-colors duration-200 ease-out",
          isChosen
            ? "bg-sunset"
            : "bg-mist/40 group-hover:bg-sunset group-focus-within:bg-sunset",
        ].join(" ")}
      />
      {/* Named before navigation so the old snapshot carries the name;
          share="morph" + default="none" keep it a morph, not a crossfade (globals.css). */}
      <ViewTransition name={`pillar-name-${slug}`} share="morph" default="none">
        {heading}
      </ViewTransition>
      <p className="text-body-lg mt-tight text-mist">{tagline}</p>
      <Link
        href={href}
        onClick={(event) => {
          // Modified clicks open a new tab and must not change this page's selection.
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          onChoose();
        }}
        transitionTypes={["pillar-choice"]}
        className="mt-component inline-block text-body text-limestone underline decoration-transparent underline-offset-4 transition-colors duration-200 ease-out hover:text-sunset hover:decoration-current"
      >
        <PillarLinkLabel name={name} />
      </Link>
    </div>
  );
}
