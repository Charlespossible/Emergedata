import { ArrowRight } from 'lucide-react';
import type { Leader } from '@/content/types';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LeaderPortrait } from './TeamCard';

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  leaders: Leader[];
  cta: { label: string; href: string };
};

export function LeadershipPreview({ eyebrow, title, lead, leaders, cta }: Props) {
  return (
    <Section tone="white" aria-labelledby="leadership-preview-title">
      <SectionHeading id="leadership-preview-title" eyebrow={eyebrow} title={title} lead={lead} />
      <ul className="mt-12 grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
        {leaders.map((leader, index) => (
          <Reveal as="li" key={leader.slug} index={index} className="group">
            <LeaderPortrait leader={leader} />
            <h3 className="mt-4 text-base font-semibold text-brand-900">{leader.name}</h3>
            <p className="mt-1 text-small text-ink-600">{leader.role}</p>
          </Reveal>
        ))}
      </ul>
      <div className="mt-12">
        <Button to={cta.href} variant="secondary">
          {cta.label}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}
