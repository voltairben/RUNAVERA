# Phase 17 Design: Security Baseline for the Static Portfolio

**Status:** Proposed for review  
**Phase:** 17 — Security

## Goal

Apply a practical, conventional security baseline to RUNAVERA's existing static Next.js portfolio, fix concrete issues found during the review, and record any production-host settings that cannot be verified from the repository.

## Context

RUNAVERA is a localized concept portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, and `next-intl`. Site content is code-owned and static. The current application has no API routes, server actions, forms, authentication, database, payment processing, or customer data. The site uses a root `proxy.ts` for locale routing, and `next.config.ts` currently has no custom response headers.

The roadmap separates this baseline pass (Phase 17) from the final security review (Phase 24). Phase 17 should secure the site that exists without inventing backend requirements or implementing controls for hypothetical features.

## Decision

Phase 17 will combine a focused security review with implementation of straightforward, evidence-based hardening. It will cover source/configuration, the dependency manifest and lockfile, locale routing, and production response behavior. It will add appropriate security headers, address verified findings, and document host-level requirements that cannot be proven from the repo.

## Scope

- Review application code, routing and proxy behavior, Next.js configuration, package manifest and lockfile for concrete security concerns relevant to the current static site.
- Review dependency health using available package-manager audit information; update or remediate only findings that are concrete and compatible with the project's supported dependency versions.
- Configure a conservative set of applicable HTTP response security headers using the framework's supported configuration. Verify the actual responses from a production build, including localized routes and static assets where relevant.
- Evaluate whether Content Security Policy can be enabled without weakening it into an ineffective policy or breaking the current Next.js runtime. If it requires a nonce or hosting setup beyond this phase, document the blocker and the required follow-up rather than shipping a broken or misleading policy.
- Record transport-security requirements such as HTTPS and HSTS for deployment. Only configure HSTS in the application when its production deployment assumptions are known; do not enable `includeSubDomains` or preload based on an unverified domain/subdomain state.
- Fix confirmed security defects within the existing application scope and add focused verification for each implemented change.

## Out of Scope

- Adding a backend, database, CMS, API, route handler, server action, form, authentication, booking, payment, or customer-data flow.
- Selecting a hosting provider or changing production infrastructure when the provider and domain are not established in the repository.
- Designing controls for hypothetical future business features.
- Treating the Phase 17 pass as the final security sign-off; Phase 24 remains the independent final security review.

## Acceptance Criteria

1. The source, configuration, locale proxy, and dependency set have been reviewed for issues relevant to the current app, with findings and resolutions recorded.
2. Applicable response headers are configured and verified against production-build responses for representative localized pages.
3. Any dependency remediation is tied to a verified finding and does not introduce unnecessary packages or unsupported upgrades.
4. CSP is either implemented in a way compatible with the current Next.js output and verified in production mode, or its concrete deployment/runtime prerequisite is documented without claiming CSP protection is active.
5. HTTPS/HSTS assumptions are documented accurately; no irreversible or domain-wide HSTS option is enabled without evidence that it is safe for the deployed domain and subdomains.
6. No backend or data-handling feature is introduced.
7. The roadmap marks Phase 17 complete only after its acceptance criteria are verified, and Phase 24 remains a separate final review.

## Design Notes

Next.js supports response headers through its configuration. The exact header values must be selected against the current routes and runtime, then verified from a production build rather than inferred from development behavior. CSP is especially sensitive to the framework's scripts and rendering model. HSTS is a deployment policy whose safety depends on HTTPS coverage and domain/subdomain ownership, so repository-only evidence may be insufficient to enable its broadest directives.

## Phase Boundary

This design authorizes creation of an implementation plan after review. It does not itself authorize implementation. The plan will identify the exact files, verification steps, and any deployment questions that remain external to the codebase.
