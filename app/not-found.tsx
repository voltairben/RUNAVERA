import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google";

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
  title: "Page not found | RUNAVERA",
  description: "The page you're looking for doesn't exist.",
};

// The true root not-found boundary — required for Next's App Router to
// generate its synthetic not-found route at all (confirmed empirically:
// without this file present, app/[locale]/not-found.tsx's nested boundary
// never activates, even for an explicit notFound() call). This root file
// renders only for a URL that matches *no route at all* in the entire app
// — in practice, a rare edge case, since next-intl's proxy (middleware)
// normalizes almost everything into a resolved locale before it ever
// reaches here (see app/[locale]/[...rest]/page.tsx for the far more common
// "valid locale, no matching page" case — including an unrecognized
// locale-looking segment like /fr/about, which next-intl's "as-needed"
// prefix mode resolves as English content rather than an invalid locale
// value; confirmed via direct testing, not assumed). Always English, by
// design, as a last-resort backstop — see CLAUDE.md's Phase 13 section.
export default function RootNotFound() {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col items-center justify-center gap-content bg-deep-water px-6 text-center">
        <p className="text-eyebrow text-mist">404</p>
        <h1 className="text-h1 text-limestone">Page not found</h1>
        <p className="text-body-lg text-mist">The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
        <Link
          href="/"
          className="text-nav text-limestone underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-sunset hover:decoration-current"
        >
          Return home
        </Link>
      </body>
    </html>
  );
}
