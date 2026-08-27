import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

type Props = { eyebrow: string; body: string; institutions: string[] };

export function BenchmarkBand({ eyebrow, body, institutions }: Props) {
  return (
    <section className="bg-brand-900 py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Eyebrow tone="dark">{eyebrow}</Eyebrow>
              <ul className="mt-6 flex flex-wrap gap-2">
                {institutions.map((name) => (
                  <li key={name}>
                    <span className="inline-flex rounded-full bg-white/[0.07] px-3 py-1.5 text-small text-brand-100 ring-1 ring-white/10">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="max-w-prose text-lead text-brand-100">{body}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
