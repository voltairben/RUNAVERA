import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Phase 17 security baseline: a static Content-Security-Policy — no nonce,
// since this static site has no backend/user input for a nonce to defend
// against beyond what 'self' already excludes (see CLAUDE.md's Security
// section). It restricts script/style/image/font/frame origins and blocks
// framing entirely, but 'unsafe-inline' in script-src and style-src means it
// does NOT block an injected inline script from running or an inline style
// from being applied.
//
// `upgrade-insecure-requests` is production-only: the dev server runs over
// plain HTTP, and this directive would make the browser rewrite same-origin
// requests to HTTPS, breaking local development.
const isProd = process.env.NODE_ENV === "production";
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${isProd ? "upgrade-insecure-requests;" : ""}
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
