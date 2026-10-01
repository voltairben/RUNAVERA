import { getTranslations } from "next-intl/server";

import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { TextLink } from "@/components/TextLink";
import { pillarSlugs } from "@/lib/pillars";

// A plain directory, not a second "chooser" — the asymmetric layout,
// hairline motif, and <ViewTransition> wrapping all belong to the
// homepage's and /plan's pillar-choosing moment (see
// components/PillarGroup.tsx). This page exists so the persistent nav's
// "Experiences" link (which points at bare /experiences) has somewhere
// real to land.
export default async function ExperiencesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Experiences" });
  const tPillars = await getTranslations({ locale, namespace: "Pillars" });

  return (
    <main id="main-content" className="pt-header">
      <section className="bg-deep-water py-group tablet:py-section">
        <Container size="wide">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="text-h1 mt-hairline max-w-2xl text-limestone">{t("heading")}</h1>
          <p className="text-body-lg mt-content max-w-[65ch] text-mist">{t("intro")}</p>

          <ul className="mt-component flex flex-col gap-content">
            {pillarSlugs.map((slug) => (
              <li key={slug}>
                <TextLink href={`/experiences/${slug}`} className="text-h4 inline-block">
                  {tPillars(`${slug}.name`)}
                </TextLink>
                <p className="text-body text-mist">{tPillars(`${slug}.tagline`)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
