import type { AnchorHTMLAttributes } from "react";

type TextLinkVariant = "default" | "subtle";

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: TextLinkVariant;
}

const variantStyles: Record<TextLinkVariant, string> = {
  default: "text-limestone hover:text-sunset",
  subtle: "text-mist hover:text-limestone",
};

/**
 * Inline/nav link primitive. Adds only interactive treatment (color,
 * underline reveal, hover) — font size/family are inherited from context
 * (e.g. `.text-nav` in a nav bar, `.text-body` inline in a paragraph), not
 * forced here, since this is a behavior primitive, not a typography one.
 */
export function TextLink({ variant = "default", className, children, ...props }: TextLinkProps) {
  const classes = [
    "underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-current",
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
}
