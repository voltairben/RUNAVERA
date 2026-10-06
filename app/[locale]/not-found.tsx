import { getTranslations } from "next-intl/server";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

// A real, within-site gap under a *valid* locale (e.g. /nl/does-not-exist)
// — translated and on-brand. Distinct from the root app/not-found.tsx, which
// handles a request that never resolves to a supported locale at all (e.g.
// /fr/about) and is deliberately always English — see CLAUDE.md's Phase 13
// section.
export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main id="main-content" className="flex min-h-dvh items-center bg-deep-water pt-header">
      <Container size="measure" className="flex flex-col items-start gap-content">
        <p className="text-eyebrow text-mist">404</p>
        <h1 className="text-h1 text-limestone">{t("heading")}</h1>
        <p className="text-body-lg text-mist">{t("body")}</p>
        <Button variant="secondary" href="/">
          {t("homeLink")}
        </Button>
      </Container>
    </main>
  );
}
