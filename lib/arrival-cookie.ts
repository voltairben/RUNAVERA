// Shared between the Server Action that sets this cookie
// (lib/arrival-actions.ts) and every Server Component that reads it
// (app/layout.tsx, app/page.tsx) — one name, one lifetime, defined once. A
// plain constants file, not "use server", since a server-action file may
// only export async functions and both callers need this at module scope.
export const ARRIVAL_COOKIE_NAME = "runavera_arrived";
export const ARRIVAL_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // ~1 year, user-confirmed
