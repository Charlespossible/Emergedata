import type { PartnerLogo } from '@/content/types';
import { Container } from '@/components/ui/Container';
import { asset } from '@/lib/asset';
import { Reveal } from '@/components/ui/Reveal';

type Props = { title: string; logos: PartnerLogo[] };

/**
 * Static, wrapping logo row on the deep brand field — the same `brand-900` band as the
 * benchmarking section. No marquee: a moving strip fights the restrained-motion rule and
 * adds nothing at this count.
 *
 * The marks are knocked out to white (`brightness-0 invert`) rather than shown in their
 * own colours, because several are dark navy or charcoal and would disappear against this
 * background. Hover lifts the opacity rather than restoring colour, for the same reason.
 *
 * The render height is deliberately modest: the source marks are low-resolution rasters
 * from the company profile (the smallest is 77px tall), and the knockout removes the
 * colour information that hides soft edges. Displaying them below their native size keeps
 * the type crisp. Larger marks need higher-resolution originals from the client.
 */
export function PartnerLogos({ title, logos }: Props) {
  if (logos.length === 0) return null;

  return (
    <section className="bg-brand-900 py-14 lg:py-20">
      <Container>
        <Reveal>
          <h2 className="text-center text-eyebrow font-semibold uppercase tracking-[0.14em] text-white">
            {title}
          </h2>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14 lg:gap-x-16">
            {logos.map((logo) => (
              <li key={logo.name}>
                <picture>
                  <source srcSet={asset(`${logo.file}.webp`)} type="image/webp" />
                  <img
                    src={asset(`${logo.file}.png`)}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-auto max-w-[8.5rem] object-contain opacity-80 brightness-0 invert transition duration-150 hover:opacity-100 sm:h-11 sm:max-w-[10rem] lg:h-12 lg:max-w-[11.5rem]"
                  />
                </picture>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
