import Image from "next/image";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { TextLink } from "@/components/TextLink";

export default function MaasplassenPage() {
  return (
    <main id="main-content" className="pt-header">
      {/* Height-bounded editorial banner, not a repeat of the homepage's
          cinematic 100dvh hero — this page's job is a slower, text-led
          read, not a first-impression arrival. Sits below the header
          (dark theme, see components/Header.tsx), not overlaid by it. */}
      <section className="relative aspect-[3/2] w-full overflow-hidden bg-deep-water tablet:aspect-[16/9]">
        <Image
          src="/images/kinrooi-maasplassen.jpg"
          alt="The Maasplassen lake system at Kinrooi, Belgium: open water bordered by low green banks under a wide sky."
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Required CC BY-SA 2.0 attribution — always visible, not
            hover-to-reveal (can't legally gate it behind an interaction).
            Full TASL form (title/author/source/license) plus the
            modification notice the ShareAlike clause requires for this
            cropped derivative — see CLAUDE.md's Phase 8 section. */}
        <p className="text-caption absolute bottom-0 right-0 px-4 py-2 text-mist/65 tablet:px-6">
          &ldquo;Kinrooi - Maasplassen&rdquo; by{" "}
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
          . Cropped.
        </p>
      </section>

      <section className="bg-deep-water py-group tablet:py-section">
        <Container size="measure">
          <Eyebrow>The Maasplassen</Eyebrow>
          <h1 className="text-h1 mt-hairline text-limestone">The Maasplassen</h1>
          <p className="text-body-lg mt-content text-mist">
            Where the water meets: a confluence that widened, over time, into a landscape of open
            water, quiet inlets, and shoreline that rewards a slower pace.
          </p>
          <p className="text-body-lg mt-content text-mist">
            The Maasplassen didn&rsquo;t begin as a destination. Much of it took shape from
            decades of sand and gravel extraction along the Maas, gradually flooding into the
            connected lakes that now stretch across the Limburg border into Belgium. What was once
            industrial became, gradually and almost by accident, one of the largest open-water
            landscapes in the Netherlands.
          </p>
          <p className="text-body-lg mt-content text-mist">
            Roermond sits at one edge of it, where the Roer meets the Maas — but the Maasplassen
            itself has no single center. It unfolds differently from every shoreline: open and
            wind-exposed in some stretches, sheltered and still in others, always shaped by the
            water rather than against it.
          </p>
          <p className="text-body-lg mt-content text-mist">
            That variety is the reason RUNAVERA is built around it rather than around any one
            place within it. The Maasplassen sets the pace — our experiences follow.
          </p>
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
