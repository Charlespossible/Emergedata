import { ArrowRight } from 'lucide-react';
import type { Engagement } from '@/content/types';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from './ProjectCard';

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  engagements: Engagement[];
  cta?: { label: string; href: string };
  tone?: 'white' | 'muted';
};

export function SelectEngagements({
  eyebrow,
  title,
  lead,
  engagements,
  cta,
  tone = 'muted',
}: Props) {
  return (
    <Section tone={tone} aria-labelledby="engagements-title">
      <SectionHeading id="engagements-title" eyebrow={eyebrow} title={title} lead={lead} />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {engagements.map((engagement, index) => (
          <Reveal as="li" key={engagement.slug} index={index} className="h-full">
            <ProjectCard engagement={engagement} />
          </Reveal>
        ))}
      </ul>
      {cta ? (
        <div className="mt-12">
          <Button to={cta.href} variant="secondary">
            {cta.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
