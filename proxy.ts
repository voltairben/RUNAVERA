import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

// Next.js 16 renamed "Middleware" to "Proxy" (functionality unchanged) —
// per node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md this
// project's installed version requires the file at the project root to be
// named `proxy.ts`, exporting a `proxy` function, not `middleware.ts`'s
// `middleware` export next-intl's own examples are typically written
// against. The handler itself (`createMiddleware`) is unchanged.
export const proxy = createMiddleware(routing);

export const config = {
  // Skip Next internals, file-extension requests (static assets), and the
  // Logo/-sourced image imports (bundled, never requested as routes).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
