import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Arrival } from "@/components/Arrival";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { PillarGroup } from "@/components/PillarGroup";
import { TextLink } from "@/components/TextLink";

// The real RUNAVERA homepage (Phase 5). Replaces the Phase 2/3 foundation
// test surface entirely — it sits below Arrival on every homepage visit.
async function HomePage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Home" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  return (
    <main id="main-content" tabIndex={-1}>
      {/* ---------- Hero ---------- */}
      <section className="relative flex h-dvh flex-col justify-end overflow-hidden bg-deep-water">
        <div className="absolute inset-0">
          <Image
            src="/images/roermond-sunset-hero.png"
            alt={t("heroAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 35%" }}
          />
          {/* Bottom-weighted Deep Water scrim — legibility over photography,
              the same single documented gradient exception the Header's
              transparent-media theme already uses, not a second one. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-deep-water via-deep-water/40 to-transparent"
          />
        </div>

        <Container size="wide" className="relative pb-atmosphere">
          <div className="max-w-2xl">
            <h1 className="text-display text-limestone">{t("heroHeading")}</h1>
            <TextLink href="#pillars" className="text-body-lg mt-component inline-block">
              {t("exploreCue")}
            </TextLink>
          </div>
        </Container>

        {/* Required CC BY-SA 2.0 attribution — always visible, not
            hover-to-reveal-only (can't legally gate it behind an
            interaction). Photographer name/license identifier stay fixed
            across locales — only the connective microcopy translates. */}
        <p className="text-caption relative px-6 pb-4 text-mist/65 tablet:px-12 tablet:text-right desktop:px-20">
          {t("heroAttributionPhoto")}{" "}
          <TextLink
            href="https://commons.wikimedia.org/wiki/File:Sunset_in_roermond.jpg"
            variant="subtle"
          >
            Davy Landman, Wikimedia Commons
          </TextLink>{" "}
          —{" "}
          <TextLink href="https://creativecommons.org/licenses/by-sa/2.0/" variant="subtle">
            CC BY-SA 2.0
          </TextLink>
          . {t("heroAttributionModified")}
        </p>
      </section>

      {/* ---------- Four pillars ---------- */}
      <section
        id="pillars"
        aria-labelledby="pillars-heading"
        className="relative bg-deep-water py-group tablet:py-section"
      >
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-6 hidden w-px bg-mist/20 tablet:left-12 tablet:block desktop:left-20"
        />
        <Container size="wide" className="flex flex-col gap-hairline">
          <Eyebrow>{t("pillarsEyebrow")}</Eyebrow>
          <h2 id="pillars-heading" className="text-h2 max-w-2xl text-limestone">
            {t("pillarsHeading")}
          </h2>
        </Container>

        <Container size="wide" className="mt-section flex flex-col">
          <PillarGroup />
        </Container>
      </section>

      {/* ---------- The Maasplassen ---------- */}
      <section aria-labelledby="maasplassen-heading" className="bg-maas py-group tablet:py-section">
        <Container size="wide">
          <div className="max-w-[65ch]">
            <Eyebrow>{t("maasplassenEyebrow")}</Eyebrow>
            <h2 id="maasplassen-heading" className="text-h2 mt-hairline text-limestone">
              {t("maasplassenHeading")}
            </h2>
            <p className="text-body-lg mt-content text-mist">{t("maasplassenBody")}</p>
            <TextLink href="/maasplassen" variant="subtle" className="text-body mt-component inline-block">
              {t("maasplassenLink")}
            </TextLink>
          </div>
        </Container>
      </section>

      {/* ---------- RUNAVERA story ---------- */}
      <section aria-labelledby="story-heading" className="bg-limestone py-group tablet:py-section">
        <Container size="measure">
          <h2 id="story-heading" className="text-h2 text-deep-water">
            {t("storyHeading")}
          </h2>
          <p className="text-body-lg mt-content text-maas">{t("storyBody")}</p>
        </Container>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section aria-labelledby="cta-heading" className="bg-deep-water py-group tablet:py-section">
        <Container size="wide" className="flex flex-col items-start gap-content">
          <h2 id="cta-heading" className="text-h3 max-w-[65ch] text-limestone">
            {/* text-h3 is a visual-weight choice only — kept a semantic H2
                so the closing CTA stays a peer of Maasplassen/Story in the
                heading hierarchy, not a demoted subsection. */}
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

// Arrival renders in-flow before the homepage on every visit — never a
// replacement for it. It collapses on exit, leaving the already-rendered
// homepage in place. A no-JS visitor can scroll past it or use the
// skip-to-content link to reach the page directly.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <Arrival />
      <HomePage locale={locale} />
    </>
  );
}
