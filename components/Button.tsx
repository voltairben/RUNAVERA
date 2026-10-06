import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";

import { Link } from "@/i18n/navigation";

type ButtonVariant = "primary" | "secondary";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonBaseProps | "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// Sharp corners (no radius), solid/hairline treatment, no shadow or
// transform on hover — deliberately not the generic SaaS pill button.
const baseStyles =
  "text-button inline-flex min-h-11 items-center justify-center px-6 transition-colors duration-200 ease-out disabled:pointer-events-none disabled:opacity-40";

const variantStyles: Record<ButtonVariant, string> = {
  // #C56D43 = Sunset darkened ~9%, for the hover state.
  primary: "bg-sunset text-deep-water hover:bg-[#C56D43]",
  secondary: "border border-mist text-limestone hover:border-sunset hover:text-sunset",
};

// Anchor branch renders through next-intl's `Link` (`i18n/navigation.ts`)
// rather than a bare `<a>` — Phase 13's locale-aware internal navigation
// fix, same mechanism as TextLink. The `<button>` branch (no href) is
// unaffected.
export function Button({ variant = "primary", className, children, href, ...props }: ButtonProps) {
  const classes = [baseStyles, variantStyles[variant], className].filter(Boolean).join(" ");

  if (href !== undefined) {
    const linkProps = props as Omit<ComponentProps<typeof Link>, "href">;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
