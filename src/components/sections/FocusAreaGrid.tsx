import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { FocusArea } from '@/content/types';
import { Card } from '@/components/ui/Card';
import { NumeralBadge } from '@/components/ui/NumeralBadge';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Props = { eyebrow: string; title: string; lead?: string; areas: FocusArea[] };

export function FocusAreaGrid({ eyebrow, title, lead, areas }: Props) {
  return (
    <Section tone="white" aria-labelledby="focus-areas-title">
      <SectionHeading id="focus-areas-title" eyebrow={eyebrow} title={title} lead={lead} />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {areas.map((area, index) => (
          <Reveal as="li" key={area.slug} index={index} className="h-full">
            <Card interactive className="group flex h-full flex-col">
              <NumeralBadge color={area.color}>{area.number}</NumeralBadge>
              <h3 className="mt-5 text-h3 text-brand-900">{area.title}</h3>
              <p className="mt-3 flex-1 text-small text-ink-600">{area.summary}</p>
              <Link
                to={`/focus-areas#${area.slug}`}
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-small font-medium text-brand-600 transition duration-150 hover:text-brand-700"
              >
                Learn more
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                />
                <span className="sr-only">about {area.title}</span>
              </Link>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
