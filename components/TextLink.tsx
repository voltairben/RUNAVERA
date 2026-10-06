import type { ComponentProps } from "react";

import { Link } from "@/i18n/navigation";

type TextLinkVariant = "default" | "subtle";

type TextLinkProps = ComponentProps<typeof Link> & {
  variant?: TextLinkVariant;
};

const variantStyles: Record<TextLinkVariant, string> = {
  default: "text-limestone hover:text-sunset",
  subtle: "text-mist hover:text-limestone",
};

/**
 * Inline/nav link primitive. Adds only interactive treatment (color,
 * underline reveal, hover) — font size/family are inherited from context
 * (e.g. `.text-nav` in a nav bar, `.text-body` inline in a paragraph), not
 * forced here, since this is a behavior primitive, not a typography one.
 *
 * Renders through next-intl's `Link` (`i18n/navigation.ts`) rather than a
 * bare `<a>` — Phase 13's locale-aware internal navigation fix, so every
 * relative internal href automatically carries the active locale prefix. A
 * disclosed change from the original Phase 3 "deliberately plain `<a>`, not
 * `next/link`" design (see CLAUDE.md's Phase 13 section) — absolute
 * external URLs and `#hash` anchors still pass through unprefixed.
 */
export function TextLink({ variant = "default", className, children, ...props }: TextLinkProps) {
  const classes = [
    "underline decoration-transparent underline-offset-4 transition-colors duration-200 ease-out hover:decoration-current",
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
}
