import { TextLink } from "@/components/TextLink";

interface PillarProps {
  name: string;
  tagline: string;
  href: string;
  className?: string;
}

/**
 * One of the four experience directions (Escapes/Explore/Private/Gather).
 * Deliberately generic — position/spacing variation between the four lives
 * in the page composition (see app/page.tsx), not here, so this stays a
 * plain reusable shape. `name` renders as an <h3> (nested under the
 * pillars section's own <h2> — see app/page.tsx) at a large Cormorant
 * scale, decoupled from that semantic level like every other heading in
 * this project.
 */
export function Pillar({ name, tagline, href, className }: PillarProps) {
  const classes = ["max-w-xl", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <h3 className="text-h1 text-limestone">{name}</h3>
      <p className="text-body-lg mt-tight text-mist">{tagline}</p>
      <TextLink href={href} className="text-body mt-component inline-block">
        Discover {name}
      </TextLink>
    </div>
  );
}
