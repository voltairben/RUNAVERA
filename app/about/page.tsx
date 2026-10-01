import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { TextLink } from "@/components/TextLink";

export default function AboutPage() {
  return (
    <main id="main-content" className="pt-header">
      <section className="bg-deep-water py-group tablet:py-section">
        <Container size="measure">
          <TextLink href="/" variant="subtle" className="text-body-sm inline-block">
            ← Back to Runavera
          </TextLink>
          <h1 className="text-display mt-component text-limestone">
            Luxury on the water, at your own pace
          </h1>
          <p className="text-body-lg mt-content text-mist">
            RUNAVERA brings people onto the water through luxury boat rentals, guided outings,
            and private charters on the Maas and Roer. Whether you&rsquo;re exploring the
            Maasplassen, celebrating with friends, or finding a quieter rhythm on the river,
            there&rsquo;s room to make the experience your own.
          </p>
          <p className="text-body-lg mt-content text-mist">
            From parties and gatherings aboard to unhurried time surrounded by water and open
            landscape, RUNAVERA makes the boat part of the occasion and the journey part of the
            destination.
          </p>
          <p className="text-body-lg mt-content text-mist">
            Inspired by Roermond, where the Roer meets the Maas, RUNAVERA invites you to see
            familiar waters differently: with more freedom, more comfort, and space to truly
            unwind.
          </p>
          {/* "Move beyond the Maas & Roer." is Arrival.tsx's own tagline, reused
              exactly; the "RUNAVERA — " prefix is this page's own addition for
              its standalone pull-quote context (see CLAUDE.md's About section). */}
          <p className="text-h3 mt-component text-limestone">
            RUNAVERA — Move beyond the Maas &amp; Roer.
          </p>
        </Container>
      </section>

      <section className="bg-limestone py-group tablet:py-section">
        <Container size="measure">
          <h2 className="text-h2 text-deep-water">The idea behind RUNAVERA</h2>
          <p className="text-body-lg mt-content text-maas">
            Inspired by the meeting of the Maas and Roer, RUNAVERA imagines a more personal way
            to experience the water around Roermond.
          </p>
          <p className="text-body-lg mt-content text-maas">
            The concept brings together luxury boat rentals, guided outings, private charters,
            and celebrations on the water. Some days call for exploring the Maasplassen with
            friends. Others call for a quiet stretch of river and time to slow down.
          </p>
          <p className="text-body-lg mt-content text-maas">
            However you choose to spend the day, the water sets the pace. RUNAVERA is about
            making room for both the occasion and the tranquillity along the way.
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
