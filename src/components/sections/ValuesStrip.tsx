import type { Value } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Props = { eyebrow: string; title: string; values: Value[]; tone?: 'white' | 'muted' };

export function ValuesStrip({ eyebrow, title, values, tone = 'muted' }: Props) {
  return (
    <Section tone={tone} aria-labelledby="values-title">
      <SectionHeading id="values-title" eyebrow={eyebrow} title={title} />
      <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value, index) => (
          <Reveal as="li" key={value.title} index={index}>
            <div className="flex items-start gap-3 border-t border-ink-200 pt-4">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
              />
              <span className="text-body text-ink-700">{value.title}</span>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
