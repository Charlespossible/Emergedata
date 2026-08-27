import { SEO } from '@/components/layout/SEO';
import { CTABand } from '@/components/sections/CTABand';
import { PageHeader } from '@/components/sections/PageHeader';
import { TeamCard } from '@/components/sections/TeamCard';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Stat } from '@/components/ui/Stat';
import { SITE } from '@/config/site';
import { leadershipPage } from '@/content/pages';
import {
  getClosingStatement,
  getExtendedStats,
  getLeaders,
  getLeadershipIntro,
  getTeamScale,
} from '@/lib/content';

export default function LeadershipPage() {
  const closing = getClosingStatement();

  return (
    <>
      <SEO
        title={leadershipPage.seo.title}
        description={leadershipPage.seo.description}
        path="/leadership"
      />

      <PageHeader {...leadershipPage.header} lead={getLeadershipIntro()} />

      <Section tone="white" aria-labelledby="leaders-title">
        <h2 id="leaders-title" className="sr-only">
          {leadershipPage.header.title}
        </h2>
        <ul className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {getLeaders().map((leader, index) => (
            <Reveal as="li" key={leader.slug} index={index} className="h-full">
              <TeamCard leader={leader} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="muted" aria-labelledby="team-scale-title">
        <SectionHeading
          id="team-scale-title"
          eyebrow={leadershipPage.teamScale.eyebrow}
          title={leadershipPage.teamScale.title}
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

      <CTABand
        headline={closing.headline}
        body={closing.body}
        cta={leadershipPage.cta}
        email={SITE.email}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />
    </>
  );
}
