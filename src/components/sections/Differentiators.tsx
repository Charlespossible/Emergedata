import type { Differentiator } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  items: Differentiator[];
  tone?: 'white' | 'muted';
};

export function Differentiators({ eyebrow, title, lead, items, tone = 'muted' }: Props) {
  return (
    <Section tone={tone} aria-labelledby="differentiators-title">
      <SectionHeading id="differentiators-title" eyebrow={eyebrow} title={title} lead={lead} />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal as="li" key={item.title} index={index}>
            <div className="flex h-full flex-col border-t-2 border-brand-600 pt-5">
              <h3 className="text-h3 text-brand-900">{item.title}</h3>
              <p className="mt-3 text-small text-ink-600">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
