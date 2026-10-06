import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ViewTransition } from "react";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { TextLink } from "@/components/TextLink";
import { isPillarSlug, pillarSlugs } from "@/lib/pillars";

export function generateStaticParams() {
  return pillarSlugs.map((slug) => ({ slug }));
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isPillarSlug(slug)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Pillars" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const name = t(`${slug}.name`);
  const tagline = t(`${slug}.tagline`);
  const description = t(`${slug}.description`);

  return (
    <main id="main-content" className="pt-header">
      <section className="bg-deep-water py-group tablet:py-section">
        <Container size="measure">
          <TextLink href="/" variant="subtle" className="text-body-sm inline-block">
            {tCommon("backLink")}
          </TextLink>
          {/* The arrival half of Phase 6's departure-only contract: the same
              `pillar-name-${slug}` name the homepage's chosen pillar carries,
              so the browser can morph between the two headings. `slug` stays
              locale-invariant (Phase 13), so this contract is unaffected by
              which locale is active. */}
          <ViewTransition name={`pillar-name-${slug}`} share="morph" default="none">
            <h1 className="text-display mt-component text-limestone">{name}</h1>
          </ViewTransition>
          <p className="text-h4 mt-tight text-mist">{tagline}</p>
          <p className="text-body-lg mt-content text-mist">{description}</p>
        </Container>
      </section>

      <section aria-labelledby="cta-heading" className="bg-deep-water py-group tablet:py-section">
        <Container size="wide" className="flex flex-col items-start gap-content">
          <Eyebrow>{tCommon("ctaEyebrow")}</Eyebrow>
          <h2 id="cta-heading" className="text-h3 max-w-[65ch] text-limestone">
            {tCommon("ctaHeading")}
          </h2>
          <Button variant="secondary" href="/plan">
            {tCommon("ctaButton")}
          </Button>
        </Container>
      </section>
    </main>
  );
}
