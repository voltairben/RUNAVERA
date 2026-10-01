import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { TextLink } from "@/components/TextLink";

export default async function MaasplassenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Maasplassen" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  return (
    <main id="main-content" className="pt-header">
      {/* Height-bounded editorial banner, not a repeat of the homepage's
          cinematic 100dvh hero — this page's job is a slower, text-led
          read, not a first-impression arrival. Sits below the header
          (dark theme, see components/Header.tsx), not overlaid by it. */}
      <section className="relative aspect-[3/2] w-full overflow-hidden bg-deep-water tablet:aspect-[16/9]">
        <Image
          src="/images/kinrooi-maasplassen.jpg"
          alt={t("bannerAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Required CC BY-SA 2.5 attribution — always visible, not
            hover-to-reveal (can't legally gate it behind an interaction).
            Full TASL form (title/author/source/license) plus the
            modification notice the ShareAlike clause requires for this
            cropped derivative — see CLAUDE.md's Phase 8 section. Title,
            photographer name, and license identifier stay fixed across
            locales — only the connective microcopy translates. */}
        <p className="text-caption absolute bottom-0 right-0 px-4 py-2 text-mist/65 tablet:px-6">
          &ldquo;Kinrooi - Maasplassen&rdquo; {t("attributionBy")}{" "}
          <TextLink
            href="https://commons.wikimedia.org/wiki/File:Kinrooi_-_Maasplassen.jpg"
            variant="subtle"
          >
            Edelhart Kempeneers, Wikimedia Commons
          </TextLink>{" "}
          —{" "}
          <TextLink href="https://creativecommons.org/licenses/by-sa/2.5/" variant="subtle">
            CC BY-SA 2.5
          </TextLink>
          . {t("attributionCropped")}
        </p>
      </section>

      <section className="bg-deep-water py-group tablet:py-section">
        <Container size="measure">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="text-h1 mt-hairline text-limestone">{t("heading")}</h1>
          <p className="text-body-lg mt-content text-mist">{t("body1")}</p>
          <p className="text-body-lg mt-content text-mist">{t("body2")}</p>
          <p className="text-body-lg mt-content text-mist">{t("body3")}</p>
          <p className="text-body-lg mt-content text-mist">{t("body4")}</p>
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
