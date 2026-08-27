import { useMemo, useState } from 'react';
import { SEO } from '@/components/layout/SEO';
import { CTABand } from '@/components/sections/CTABand';
import { PageHeader } from '@/components/sections/PageHeader';
import { PartnerColumns } from '@/components/sections/PartnerColumns';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';
import { SITE } from '@/config/site';
import { ourWorkPage } from '@/content/pages';
import {
  getClosingStatement,
  getEngagementGroups,
  getEngagements,
  getPartnerGroups,
  getPartnersIntro,
  getWorkIntro,
} from '@/lib/content';

export default function OurWorkPage() {
  const engagements = getEngagements();
  const closing = getClosingStatement();
  const [filter, setFilter] = useState<string>('all');

  // Chips are derived from the data, never hard-coded.
  const chips = useMemo(() => {
    const present = new Set(engagements.map((item) => item.group));
    return [
      { id: 'all', label: ourWorkPage.filterAll },
      ...getEngagementGroups().filter((group) => present.has(group.id)),
    ];
  }, [engagements]);

  const visible = useMemo(
    () => (filter === 'all' ? engagements : engagements.filter((item) => item.group === filter)),
    [engagements, filter],
  );

  return (
    <>
      <SEO
        title={ourWorkPage.seo.title}
        description={ourWorkPage.seo.description}
        path="/our-work"
      />

      <PageHeader {...ourWorkPage.header} lead={getWorkIntro()} />

      <Section tone="white" aria-labelledby="engagements-title">
        <SectionHeading
          id="engagements-title"
          eyebrow={ourWorkPage.engagements.eyebrow}
          title={ourWorkPage.engagements.title}
        />

        <div
          role="group"
          aria-label={ourWorkPage.filterLabel}
          className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {chips.map((chip) => {
            const isActive = filter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(chip.id)}
                className={cn(
                  'inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-full px-5 text-small font-medium ring-1 transition duration-150',
                  isActive
                    ? 'bg-brand-600 text-white ring-brand-600'
                    : 'bg-white text-ink-600 ring-ink-200 hover:text-brand-600 hover:ring-brand-300',
                )}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="mt-10 text-body text-ink-500">{ourWorkPage.emptyState}</p>
        ) : (
          <ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {visible.map((engagement, index) => (
              <Reveal as="li" key={engagement.slug} index={index} className="h-full">
                <ProjectCard engagement={engagement} />
              </Reveal>
            ))}
          </ul>
        )}
      </Section>

      <PartnerColumns
        eyebrow={ourWorkPage.partners.eyebrow}
        title={ourWorkPage.partners.title}
        lead={getPartnersIntro()}
        groups={getPartnerGroups()}
        tone="muted"
      />

      <CTABand
        headline={closing.headline}
        body={closing.body}
        cta={ourWorkPage.cta}
        email={SITE.email}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />
    </>
  );
}
