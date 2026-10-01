import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { PillarGroup } from "@/components/PillarGroup";
import { TextLink } from "@/components/TextLink";

// The decision-prompt moment every CTA on the site points to ("Plan your
// experience"). Reuses <PillarGroup /> directly rather than inventing a new
// chooser UI — this page's whole purpose is choosing a pillar, the same
// real justification the homepage already has for that composition. No
// contact method, form, or booking flow exists here or anywhere on the
// site — RUNAVERA has no backend; the real "conversion" is picking a real
// /experiences/[slug] destination below.
export default function PlanPage() {
  return (
    <main id="main-content" className="pt-header">
      <section className="bg-deep-water py-group tablet:py-section">
        <Container size="measure">
          <TextLink href="/" variant="subtle" className="text-body-sm inline-block">
            ← Back to Runavera
          </TextLink>
          <h1 className="text-display mt-component text-limestone">Plan your experience</h1>
          <p className="text-body-lg mt-content text-mist">
            Four directions, one current — choose where today takes you.
          </p>
        </Container>
      </section>

      <section
        id="plan-pillars"
        aria-labelledby="plan-pillars-heading"
        className="relative bg-deep-water py-group tablet:py-section"
      >
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-6 hidden w-px bg-mist/20 tablet:left-12 tablet:block desktop:left-20"
        />
        <Container size="wide" className="flex flex-col gap-hairline">
          <Eyebrow>The experiences</Eyebrow>
          <h2 id="plan-pillars-heading" className="text-h2 max-w-2xl text-limestone">
            Four directions, one current.
          </h2>
        </Container>

        <Container size="wide" className="mt-section flex flex-col">
          <PillarGroup />
        </Container>
      </section>

      <section className="bg-deep-water pb-group tablet:pb-section">
        <Container size="measure">
          <p className="text-body-lg text-mist">
            However you choose to spend the day, the water sets the pace.
          </p>
        </Container>
      </section>
    </main>
  );
}
