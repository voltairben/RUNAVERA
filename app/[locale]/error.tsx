"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

// Must be a Client Component — React's error-boundary convention, not a
// Phase 13 choice. Translated via useTranslations since getTranslations
// (the server equivalent used elsewhere) isn't available here.
export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("Error");

  return (
    <main id="main-content" className="flex min-h-dvh items-center bg-deep-water pt-header">
      <Container size="measure" className="flex flex-col items-start gap-content">
        <h1 className="text-h1 text-limestone">{t("heading")}</h1>
        <p className="text-body-lg text-mist">{t("body")}</p>
        <Button variant="secondary" onClick={reset}>
          {t("retry")}
        </Button>
      </Container>
    </main>
  );
}
