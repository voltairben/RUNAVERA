import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { TextLink } from "@/components/TextLink";
import { getPillar, pillars } from "@/lib/pillars";

export function generateStaticParams() {
  return pillars.map((pillar) => ({ slug: pillar.slug }));
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = getPillar(slug);

  if (!pillar) {
    notFound();
  }

  return (
    <main id="main-content" className="pt-header">
      <section className="bg-deep-water py-group tablet:py-section">
        <Container size="measure">
          <TextLink href="/" variant="subtle" className="text-body-sm inline-block">
            ← Back to Runavera
          </TextLink>
          {/* The arrival half of Phase 6's departure-only contract: the same
              `pillar-name-${slug}` name the homepage's chosen pillar carries,
              so the browser can morph between the two headings. */}
          <ViewTransition name={`pillar-name-${pillar.slug}`}>
            <h1 className="text-display mt-component text-limestone">{pillar.name}</h1>
          </ViewTransition>
          <p className="text-h4 mt-tight text-mist">{pillar.tagline}</p>
          <p className="text-body-lg mt-content text-mist">{pillar.description}</p>
        </Container>
      </section>

      <section aria-labelledby="cta-heading" className="bg-deep-water py-group tablet:py-section">
        <Container size="wide" className="flex flex-col items-start gap-content">
          <Eyebrow>Next step</Eyebrow>
          <h2 id="cta-heading" className="text-h3 max-w-[65ch] text-limestone">
            When you&rsquo;re ready, we&rsquo;re here to help you plan it.
          </h2>
          <Button variant="secondary" href="/plan">
            Plan your experience
          </Button>
        </Container>
      </section>
    </main>
  );
}
