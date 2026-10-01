import { createNavigation } from "next-intl/navigation";

import { routing } from "@/i18n/routing";

// Single shared entry point for every locale-aware link/pathname check in
// the app (Phase 13 §4 of the implementation plan) — `Link` works in both
// Server and Client Components without prop-threading the active locale;
// `usePathname`/`useRouter` are Client-Component-only hooks.
export const { Link, usePathname, useRouter, getPathname, redirect, permanentRedirect } =
  createNavigation(routing);
