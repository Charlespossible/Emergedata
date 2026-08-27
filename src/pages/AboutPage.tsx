import { SEO } from '@/components/layout/SEO';
import { ApproachCycle } from '@/components/sections/ApproachCycle';
import { BenchmarkBand } from '@/components/sections/BenchmarkBand';
import { CTABand } from '@/components/sections/CTABand';
import { Differentiators } from '@/components/sections/Differentiators';
import { PageHeader } from '@/components/sections/PageHeader';
import { PresenceSection } from '@/components/sections/PresenceSection';
import { ValuesStrip } from '@/components/sections/ValuesStrip';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Stat } from '@/components/ui/Stat';
import { FEATURES } from '@/config/features';
import { SITE } from '@/config/site';
import { aboutPage } from '@/content/pages';
import {
  getApproachStages,
  getBenchmarking,
  getClosingStatement,
  getCountries,
  getDifferentiators,
  getDifferentiatorsIntro,
  getExtendedStats,
  getLegalStatus,
  getMission,
  getPresence,
  getPublishedOffices,
  getTeamScale,
  getValues,
  getVision,
  getWhoWeAre,
} from '@/lib/content';

export default function AboutPage() {
  const closing = getClosingStatement();
  const benchmarking = getBenchmarking();
  const mission = getMission();
  const vision = getVision();
  const presence = getPresence();
  const legal = getLegalStatus();

  return (
    <>
      <SEO title={aboutPage.seo.title} description={aboutPage.seo.description} path="/about" />

      <PageHeader {...aboutPage.header} />

      <Section tone="white" aria-labelledby="who-we-are-title">
        <SectionHeading
          id="who-we-are-title"
          eyebrow={aboutPage.whoWeAre.eyebrow}
          title={aboutPage.whoWeAre.title}
        />
        <div className="mt-10 columns-1 gap-12 lg:columns-2">
          {getWhoWeAre().map((paragraph, index) => (
            <p key={index} className="mb-6 break-inside-avoid text-body text-ink-600">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section tone="muted" aria-labelledby="mission-vision-title">
        <SectionHeading
          id="mission-vision-title"
          eyebrow={aboutPage.missionVision.eyebrow}
          title={aboutPage.missionVision.title}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {[mission, vision].map((item) => (
            <Card key={item.title} className="border-t-2 border-accent-500">
              <h3 className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-brand-600">
                {item.title}
              </h3>
              <p className="mt-4 font-display text-h3 font-normal text-brand-900">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Differentiators
        eyebrow={aboutPage.differentiators.eyebrow}
        title={aboutPage.differentiators.title}
        lead={getDifferentiatorsIntro()}
        items={getDifferentiators()}
        tone="white"
      />

      <ApproachCycle
        eyebrow={aboutPage.approach.eyebrow}
        title={aboutPage.approach.title}
        stages={getApproachStages()}
        tone="muted"
      />

      <BenchmarkBand
        eyebrow={aboutPage.benchmarking.eyebrow}
        body={benchmarking.body}
        institutions={benchmarking.institutions}
      />

      <PresenceSection
        eyebrow={aboutPage.presence.eyebrow}
        title={aboutPage.presence.title}
        body={presence.body}
        countries={getCountries()}
        offices={getPublishedOffices()}
      />

      <Section tone="muted" aria-labelledby="team-scale-title">
        <SectionHeading
          id="team-scale-title"
          eyebrow={aboutPage.teamScale.eyebrow}
          title={aboutPage.teamScale.title}
        />
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <p className="max-w-prose text-lead text-ink-600">{getTeamScale()}</p>
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-2">
            {getExtendedStats().map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <Stat value={stat.value} label={stat.label} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {FEATURES.values ? (
        <ValuesStrip
          eyebrow={aboutPage.values.eyebrow}
          title={aboutPage.values.title}
          values={getValues()}
          tone="white"
        />
      ) : null}

      {FEATURES.legalStatus ? (
        <Section tone="muted" padded={false} className="pb-16 pt-4 sm:pb-20">
          <Card className="max-w-2xl">
            <h2 className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-ink-500">
              {legal.title}
            </h2>
            <p className="mt-3 text-small text-ink-600">{legal.body}</p>
          </Card>
        </Section>
      ) : null}

      <CTABand
        headline={closing.headline}
        body={closing.body}
        cta={aboutPage.cta}
        email={SITE.email}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />
    </>
  );
}
