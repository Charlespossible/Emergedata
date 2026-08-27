import type { PartnerGroup } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  groups: PartnerGroup[];
  tone?: 'white' | 'muted';
};

/**
 * Presented as a "client and partner community" — the client's own framing. No
 * organisation here is claimed as a client, and no logo is attached to these names.
 */
export function PartnerColumns({ eyebrow, title, lead, groups, tone = 'white' }: Props) {
  return (
    <Section tone={tone} aria-labelledby="partners-title">
      <SectionHeading id="partners-title" eyebrow={eyebrow} title={title} lead={lead} />
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
        {groups.map((group, index) => (
          <Reveal key={group.title} index={index}>
            <h3 className="border-b border-ink-200 pb-4 text-h3 text-brand-900">{group.title}</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3 text-body text-ink-600">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-brand-400"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
