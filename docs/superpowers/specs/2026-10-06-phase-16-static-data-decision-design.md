# Phase 16 Design: Keep RUNAVERA Static Until a Real Data Need Exists

**Status:** Proposed for review  
**Phase:** 16 — Backend / data architecture

## Goal

Decide whether the current concept portfolio needs backend infrastructure and define when that decision should be revisited.

## Context

RUNAVERA is a fictional concept portfolio, not an operating booking business. The site has no real prices, availability, customer accounts, enquiries, or transactions to process. Its current content is committed with the application: localized copy lives in `messages/{locale}.json`, navigation lives in `lib/navigation.ts`, and the invariant pillar slugs live in `lib/pillars.ts`. A source scan found no application fetch calls, server actions, route handlers, database clients, or backend environment variables.

The project instructions already say not to add a booking backend, CMS, or database until a real requirement exists.

## Decision

Keep the current site static and localized. Do not introduce backend services or data infrastructure just to fill Phase 16. Keep Phase 16 deferred and its roadmap status unchanged until an actual requirement warrants backend or data architecture work.

## Boundaries

- No database, API, CMS, authentication, server actions, enquiry form, or booking flow.
- No invented real-world business data, prices, availability, customer records, or credentials.
- Keep the existing localized message dictionaries and code-owned navigation and pillar slugs as the current sources of truth.
- Do not select a vendor, framework, schema, or hosting service in advance of a concrete use case.

## Revisit triggers

Reopen backend/data architecture only when a verified requirement needs one or more of the following:

- A real operator must update site content without changing application code.
- Real availability, bookings, payments, or customer enquiries must be processed or persisted.
- Users need accounts or saved/personalized state that must persist across visits.

Before selecting technology, establish who owns the data, how it is created and updated, what needs persistence, and the relevant privacy, security, and operational requirements. The concept project's fictional details are not sufficient evidence for any of these triggers.

## Completion boundary

This decision does not implement a backend or complete Phase 16. Phase 16 stays deferred / `NOT STARTED` until a real use case exists and is explicitly approved. When a trigger arises, create a new scoped design based on that requirement before implementation.
