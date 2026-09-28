import { cookies } from "next/headers";

import { Arrival } from "@/components/Arrival";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { Logo } from "@/components/Logo";
import { TextLink } from "@/components/TextLink";
import { ARRIVAL_COOKIE_NAME } from "@/lib/arrival-cookie";

// Temporary Phase 2/3 foundation test surface — NOT the homepage, hero, or
// a finished main-site entry. What a first-time visitor sees right after
// Arrival, and what a returning visitor sees immediately. A plain inventory
// of the design-system primitives, laid out like a style guide so it can't
// be mistaken for a draft of the real site. Replaced entirely when the real
// homepage is built in a later, separately approved phase.
function FoundationPlaceholder() {
  return (
    <main id="main-content" className="pt-header flex flex-col gap-section py-16">
      <Container size="wide" className="flex items-center gap-tight">
        <Logo variant="primary" priority className="h-10 w-10 object-contain" />
        <span className="text-caption text-mist">
          RUNAVERA — foundation test surface, Phase 2 (not the homepage)
        </span>
      </Container>

      <Container size="measure" className="flex flex-col gap-hairline">
        <Eyebrow>Typography</Eyebrow>
        <h1 className="text-h1">Design System Check</h1>
        <p className="text-body text-mist">
          A plain inventory confirming the type scale, spacing, layout, color, and core UI
          primitives render correctly.
        </p>
      </Container>

      <Container size="measure" className="flex flex-col gap-tight">
        <Eyebrow>Buttons</Eyebrow>
        <div className="flex flex-wrap items-center gap-tight">
          <Button variant="primary">Plan your experience</Button>
          <Button variant="secondary">Explore the water</Button>
        </div>
      </Container>

      <Container size="measure" className="flex flex-col gap-hairline">
        <Eyebrow>Text link</Eyebrow>
        <TextLink href="#" variant="subtle">
          Example text link
        </TextLink>
      </Container>
    </main>
  );
}

// Arrival renders in-flow, before the placeholder in DOM order — never a
// replacement for it. A returning visitor (cookie present) never gets
// <Arrival> in the DOM at all: zero flash. A first-time visitor gets both,
// stacked — Arrival collapses itself on exit, and the placeholder (already
// present) is what's left. This also means a no-JS visitor can always
// scroll past Arrival or use the skip-to-content link to reach it directly.
export default async function Home() {
  const cookieStore = await cookies();
  const hasArrived = cookieStore.has(ARRIVAL_COOKIE_NAME);

  return (
    <>
      {!hasArrived && <Arrival />}
      <FoundationPlaceholder />
    </>
  );
}
