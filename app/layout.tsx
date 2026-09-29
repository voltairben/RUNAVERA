import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { Header } from "@/components/Header";
import { ARRIVAL_COOKIE_NAME } from "@/lib/arrival-cookie";

import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RUNAVERA — Roermond, Limburg",
    template: "%s | RUNAVERA",
  },
  description:
    "RUNAVERA — premium water-based experiences on the Roer, Maas and Maasplassen, Roermond.",
  // No manual `icons` field: app/icon.png and app/apple-icon.png are picked
  // up automatically via Next.js's file-based metadata convention.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071c21",
};

// Document language is fixed to English for now. Locale-aware `lang` and
// routing land in the i18n phase (EN/NL/DE) — not part of this foundation.
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const hasArrived = cookieStore.has(ARRIVAL_COOKIE_NAME);

  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[60] -translate-y-20 bg-limestone px-4 py-2 text-body-sm text-deep-water transition-transform duration-200 focus:translate-y-0"
        >
          Skip to content
        </a>
        {/* Initial `suppressed` value only — Header manages that as its own
            state from here on and flips it via the arrival-complete event
            (see components/Header.tsx). Assumes Arrival only ever renders
            at "/" — the only real route today; revisit if a first-time
            visitor's entry route ever needs to vary.

            `theme="dark"` is the SITE-WIDE default (Header mounts once,
            globally). This flipped in Phase 8: with `/experiences*` and
            `/maasplassen` both needing `dark` and only `/` wanting
            `transparent-media`, `dark` is now the honest default rather
            than a growing list of routes overriding a `transparent-media`
            default. `Header.tsx` forces `transparent-media` back on for
            `pathname === "/"` specifically — see its own doc comment. */}
        <Header suppressed={!hasArrived} theme="dark" />
        {children}
      </body>
    </html>
  );
}
