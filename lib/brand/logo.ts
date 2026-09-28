import type { StaticImageData } from "next/image";

import primaryLogo from "../../Logo/RUNAVERA.LOGO.1.png";

/**
 * Every recognised logo placement. Only `primary` has a real production
 * asset today — the rest resolve to `null` until individual production
 * files (not the composite presentation sheet) are supplied. Filling in a
 * slot below is the only change needed to start using it; no component API
 * or layout changes required.
 */
export type LogoVariant = "primary" | "secondary" | "wordmark" | "lockup";

interface LogoAsset {
  src: StaticImageData;
  alt: string;
}

export const logoAssets: Record<LogoVariant, LogoAsset | null> = {
  primary: {
    src: primaryLogo,
    alt: "RUNAVERA — Roermond, Limburg",
  },
  secondary: null,
  wordmark: null,
  lockup: null,
};
