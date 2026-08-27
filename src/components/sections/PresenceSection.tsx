import type { Country, Office } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { OfficeCard } from './OfficeCard';

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  countries: Country[];
  offices: Office[];
  tone?: 'white' | 'muted';
};

export function PresenceSection({
  eyebrow,
  title,
  body,
  countries,
  offices,
  tone = 'white',
}: Props) {
  return (
    <Section tone={tone} aria-labelledby="presence-title">
      <SectionHeading id="presence-title" eyebrow={eyebrow} title={title} />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <p className="max-w-prose text-body text-ink-600">{body}</p>

          <h3 className="mt-10 text-eyebrow font-semibold uppercase tracking-[0.14em] text-ink-500">
            Countries of project experience
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {countries.map((country) => (
              <li key={country.code}>
                <span className="inline-flex items-center gap-2 rounded-full bg-ink-50 px-3.5 py-2 text-small text-ink-700 ring-1 ring-ink-200">
                  {country.name}
                  {country.isHq ? (
                    <span className="text-xs font-medium text-brand-600">HQ</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <ul className="flex flex-col gap-6">
            {offices.map((office) => (
              <li key={office.state}>
                <OfficeCard office={office} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
