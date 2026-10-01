// Shared between Arrival.tsx's own client-side synchronous cookie write
// (its exit handler — see CLAUDE.md's Arrival section for why that's a
// direct `document.cookie` write, not a Server Action) and every Server
// Component that reads it (app/[locale]/layout.tsx, app/[locale]/page.tsx)
// — one name, one lifetime, defined once.
export const ARRIVAL_COOKIE_NAME = "runavera_arrived";
export const ARRIVAL_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // ~1 year, user-confirmed
