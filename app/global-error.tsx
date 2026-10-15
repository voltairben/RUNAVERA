"use client"; // Error boundaries must be Client Components — Next's own convention, not a Phase 13/26 choice.

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

// The true root error boundary — confirmed empirically (installed error.md
// docs, re-verified against current source during planning): app/[locale]/
// error.tsx only wraps `{children}`, never the layout.tsx that renders it
// in. Header mounts in that same-segment layout, so without this file, any
// runtime error thrown while rendering Header or a descendant (DesktopNav,
// MobileNav, LanguageSwitcher, NavLink, MenuButton, Logo) on any route fell
// through to Next's generic, unbranded default error page. This file closes
// that gap. It replaces the root layout entirely when active — no parent
// layout, no global styles, no locale/translation context reach it — so,
// like app/not-found.tsx (the same true-root position), it renders its own
// <html>/<body>, imports globals.css directly, and loads its own fonts.
// Always English, same reasoning as app/not-found.tsx: no locale is
// resolvable here by definition.
export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col items-center justify-center gap-content bg-deep-water px-6 text-center">
        <h1 className="text-h1 text-limestone">Something went wrong</h1>
        <p className="text-body-lg text-mist">An unexpected error occurred. Please try again.</p>
        <button
          type="button"
          onClick={retry}
          className="text-button inline-flex min-h-11 items-center justify-center border border-mist px-6 text-limestone transition-colors duration-200 ease-out hover:border-sunset hover:text-sunset"
        >
          Try again
        </button>
        <Link
          href="/"
          className="text-nav text-limestone underline decoration-transparent underline-offset-4 transition-colors duration-200 ease-out hover:text-sunset hover:decoration-current"
        >
          Return home
        </Link>
      </body>
    </html>
  );
}
