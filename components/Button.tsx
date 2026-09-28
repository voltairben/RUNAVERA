import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// Sharp corners (no radius), solid/hairline treatment, no shadow or
// transform on hover — deliberately not the generic SaaS pill button.
const baseStyles =
  "text-button inline-flex min-h-11 items-center justify-center px-6 transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40";

const variantStyles: Record<ButtonVariant, string> = {
  // #C56D43 = Sunset darkened ~9%, for the hover state.
  primary: "bg-sunset text-deep-water hover:bg-[#C56D43]",
  secondary: "border border-mist text-limestone hover:border-sunset hover:text-sunset",
};

export function Button({ variant = "primary", className, children, href, ...props }: ButtonProps) {
  const classes = [baseStyles, variantStyles[variant], className].filter(Boolean).join(" ");

  if (href !== undefined) {
    return (
      <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
