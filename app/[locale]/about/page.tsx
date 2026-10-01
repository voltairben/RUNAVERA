import { getTranslations } from "next-intl/server";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { TextLink } from "@/components/TextLink";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  // The pull-quote's "Move beyond the Maas & Roer." portion is Arrival's
  // own tagline, reused exactly (not duplicated as a separate message key)
  // — see CLAUDE.md's About section. Composing it from the Arrival
  // namespace here is what keeps the two from drifting independently
  // across locales.
  const tArrival = await getTranslations({ locale, namespace: "Arrival" });

  return (
    <main id="main-content" className="pt-header">
      <section className="bg-deep-water py-group tablet:py-section">
        <Container size="measure">
          <TextLink href="/" variant="subtle" className="text-body-sm inline-block">
            {tCommon("backLink")}
          </TextLink>
          <h1 className="text-display mt-component text-limestone">{t("heading")}</h1>
          <p className="text-body-lg mt-content text-mist">{t("intro1")}</p>
          <p className="text-body-lg mt-content text-mist">{t("intro2")}</p>
          <p className="text-body-lg mt-content text-mist">{t("intro3")}</p>
          <p className="text-h3 mt-component text-limestone">RUNAVERA — {tArrival("tagline")}</p>
        </Container>
      </section>

      <section className="bg-limestone py-group tablet:py-section">
        <Container size="measure">
          <h2 className="text-h2 text-deep-water">{t("ideaHeading")}</h2>
          <p className="text-body-lg mt-content text-maas">{t("idea1")}</p>
          <p className="text-body-lg mt-content text-maas">{t("idea2")}</p>
          <p className="text-body-lg mt-content text-maas">{t("idea3")}</p>
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
