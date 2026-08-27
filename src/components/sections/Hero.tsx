import type { Stat } from '@/content/types';
import { BrandMotif } from '@/components/ui/BrandMotif';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Stat as StatTile } from '@/components/ui/Stat';

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: Stat[];
};

export function Hero({ eyebrow, title, lead, primaryCta, secondaryCta, stats }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 via-brand-900 to-brand-800 pb-16 pt-28 lg:pb-20 lg:pt-36">
      <BrandMotif className="-right-24 -top-24 h-[42rem] w-[42rem] text-white/[0.04] lg:-right-16" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <Container className="relative">
        <div className="max-w-3xl">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-display text-white">{title}</h1>
          <p className="mt-6 max-w-prose text-lead text-brand-100">{lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to={primaryCta.href} variant="onDeep" size="lg">
              {primaryCta.label}
            </Button>
            <Button to={secondaryCta.href} variant="onDeepOutline" size="lg">
              {secondaryCta.label}
            </Button>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:gap-10 lg:mt-20 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <StatTile value={stat.value} label={stat.label} tone="dark" />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
