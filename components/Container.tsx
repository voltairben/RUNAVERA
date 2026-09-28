import type { ElementType, ReactNode } from "react";

export type ContainerSize = "full" | "measure" | "wide";

interface ContainerProps {
  size?: ContainerSize;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * `full` — true edge-to-edge, zero gutter (cinematic/full-bleed sections).
 * `wide` — 100% width bounded only by the responsive gutter, no extra
 *   max-width ceiling. Deliberately not a centered SaaS container: it's as
 *   wide as the gutter system allows, not capped at a fixed px number.
 * `measure` — same gutter as `wide`, plus a 65ch cap for readable text.
 *   Not centered by default (`mx-auto`) — anchor per composition via
 *   `className` when needed.
 */
const sizeStyles: Record<ContainerSize, string> = {
  full: "w-full",
  wide: "w-full px-6 tablet:px-12 desktop:px-20",
  measure: "w-full max-w-[65ch] px-6 tablet:px-12 desktop:px-20",
};

export function Container({ size = "wide", as: Tag = "div", className, children }: ContainerProps) {
  const classes = [sizeStyles[size], className].filter(Boolean).join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
