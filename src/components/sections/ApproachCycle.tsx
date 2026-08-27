import type { ApproachStage } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  stages: ApproachStage[];
  tone?: 'white' | 'muted';
};

/** Horizontal stepper from lg up; a vertical timeline below it. */
export function ApproachCycle({ eyebrow, title, lead, stages, tone = 'white' }: Props) {
  return (
    <Section tone={tone} aria-labelledby="approach-title">
      <SectionHeading id="approach-title" eyebrow={eyebrow} title={title} lead={lead} />

      <ol className="mt-12 grid gap-8 lg:grid-cols-4 lg:gap-6">
        {stages.map((stage, index) => (
          <Reveal as="li" key={stage.number} index={index} className="relative">
            {/* Connector to the next stage: vertical on mobile, horizontal from lg.
                Drawn per segment so it never overruns the final stage. */}
            {index < stages.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute left-[1.375rem] top-11 hidden h-[calc(100%+1rem)] w-px bg-brand-200 sm:block lg:left-11 lg:top-[1.375rem] lg:h-px lg:w-[calc(100%-2.75rem+1.5rem)]"
              />
            ) : null}
            <div className="flex gap-5 sm:gap-6 lg:flex-col">
              <span
                aria-hidden="true"
                className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white font-display text-small font-semibold text-brand-600 ring-1 ring-brand-200"
              >
                {stage.number}
              </span>
              <div className="lg:pr-6">
                <h3 className="text-h3 text-brand-900">{stage.title}</h3>
                <p className="mt-2 text-small text-ink-600">{stage.methods}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
