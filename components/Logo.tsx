import Image, { type ImageProps } from "next/image";

import { logoAssets, type LogoVariant } from "@/lib/brand/logo";

type LogoProps = Omit<ImageProps, "src" | "alt"> & {
  variant?: LogoVariant;
  alt?: string;
};

/**
 * Renders a RUNAVERA logo variant from the shared asset registry
 * (`lib/brand/logo.ts`). Falls back to the primary emblem if the requested
 * variant has no production asset yet.
 */
export function Logo({ variant = "primary", alt, ...imageProps }: LogoProps) {
  const asset = logoAssets[variant] ?? logoAssets.primary;

  if (!asset) {
    return null;
  }

  return <Image src={asset.src} alt={alt ?? asset.alt} {...imageProps} />;
}
