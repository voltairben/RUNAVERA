import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { TextLink } from "@/components/TextLink";
import { pillars } from "@/lib/pillars";

// A plain directory, not a second "chooser" — the asymmetric layout,
// hairline motif, and <ViewTransition> wrapping all belong to the
// homepage's own pillar-choosing moment (see components/PillarGroup.tsx).
// This page exists so the persistent nav's "Experiences" link (which
// points at bare /experiences) has somewhere real to land.
export default function ExperiencesIndexPage() {
  return (
    <main id="main-content" className="pt-header">
      <section className="bg-deep-water py-group tablet:py-section">
        <Container size="wide">
          <Eyebrow>The experiences</Eyebrow>
          <h1 className="text-h1 mt-hairline max-w-2xl text-limestone">
            Four directions, one current.
          </h1>
          <p className="text-body-lg mt-content max-w-[65ch] text-mist">
            Each pillar is its own way into the Maasplassen. Choose the one that fits.
          </p>

          <ul className="mt-component flex flex-col gap-content">
            {pillars.map((pillar) => (
              <li key={pillar.slug}>
                <TextLink href={`/experiences/${pillar.slug}`} className="text-h4 inline-block">
                  {pillar.name}
                </TextLink>
                <p className="text-body text-mist">{pillar.tagline}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
