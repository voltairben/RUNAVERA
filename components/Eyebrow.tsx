import type { ElementType, ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Small tracked label for an actual taxonomy/category (e.g. an experience
 * pillar name) — use sparingly, not as decorative filler above every
 * heading. Mist-only, no color prop: Sunset is reserved for CTA fill,
 * active/selected state, and focus — never a default label color.
 */
export function Eyebrow({ children, as: Tag = "p", className }: EyebrowProps) {
  const classes = ["text-eyebrow text-mist", className].filter(Boolean).join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
