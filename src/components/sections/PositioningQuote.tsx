import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Props = { eyebrow: string; quote: string; attribution?: string };

/** The single most differentiating sentence in the profile. It gets a full band. */
export function PositioningQuote({ eyebrow, quote, attribution }: Props) {
  return (
    <Section tone="white">
      <figure className="mx-auto max-w-4xl text-center">
        <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        <blockquote className="mt-8">
          <p className="font-display text-h1 font-semibold text-brand-900">{quote}</p>
        </blockquote>
        {attribution ? (
          <figcaption className="mt-8 text-small text-ink-500">{attribution}</figcaption>
        ) : null}
      </figure>
    </Section>
  );
}
