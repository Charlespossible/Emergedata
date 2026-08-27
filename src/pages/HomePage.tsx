import { SEO } from '@/components/layout/SEO';
import { ApproachCycle } from '@/components/sections/ApproachCycle';
import { BenchmarkBand } from '@/components/sections/BenchmarkBand';
import { CTABand } from '@/components/sections/CTABand';
import { Differentiators } from '@/components/sections/Differentiators';
import { FocusAreaGrid } from '@/components/sections/FocusAreaGrid';
import { Hero } from '@/components/sections/Hero';
import { LeadershipPreview } from '@/components/sections/LeadershipPreview';
import { PartnerLogos } from '@/components/sections/PartnerLogos';
import { PositioningQuote } from '@/components/sections/PositioningQuote';
import { SelectEngagements } from '@/components/sections/SelectEngagements';
import { FEATURES } from '@/config/features';
import { SITE } from '@/config/site';
import { homePage } from '@/content/pages';
import {
  getApproachStages,
  getBenchmarking,
  getClosingStatement,
  getDifferentiators,
  getDifferentiatorsIntro,
  getFeaturedEngagements,
  getFocusAreas,
  getFocusAreasIntro,
  getLeadershipPreview,
  getPartnerLogos,
  getPositioningQuote,
  getStats,
} from '@/lib/content';
import { organizationJsonLd } from '@/lib/seo';

export default function HomePage() {
  const closing = getClosingStatement();
  const benchmarking = getBenchmarking();

  return (
    <>
      <SEO
        title={homePage.seo.title}
        description={homePage.seo.description}
        path="/"
        jsonLd={[organizationJsonLd()]}
      />

      <Hero {...homePage.hero} stats={getStats()} />

      <PositioningQuote eyebrow={homePage.positioning.eyebrow} quote={getPositioningQuote()} />

      {FEATURES.partnerLogos ? (
        <PartnerLogos title={homePage.partners.title} logos={getPartnerLogos()} />
      ) : null}

      <FocusAreaGrid
        eyebrow={homePage.focusAreas.eyebrow}
        title={homePage.focusAreas.title}
        lead={getFocusAreasIntro()}
        areas={getFocusAreas()}
      />

      <Differentiators
        eyebrow={homePage.differentiators.eyebrow}
        title={homePage.differentiators.title}
        lead={getDifferentiatorsIntro()}
        items={getDifferentiators()}
      />

      <ApproachCycle
        eyebrow={homePage.approach.eyebrow}
        title={homePage.approach.title}
        stages={getApproachStages()}
      />

      <BenchmarkBand
        eyebrow={homePage.benchmarking.eyebrow}
        body={benchmarking.body}
        institutions={benchmarking.institutions}
      />

      <SelectEngagements
        eyebrow={homePage.engagements.eyebrow}
        title={homePage.engagements.title}
        engagements={getFeaturedEngagements()}
        cta={homePage.engagements.cta}
      />

      <LeadershipPreview
        eyebrow={homePage.leadership.eyebrow}
        title={homePage.leadership.title}
        leaders={getLeadershipPreview(4)}
        cta={homePage.leadership.cta}
      />

      <CTABand
        headline={closing.headline}
        body={closing.body}
        cta={homePage.cta}
        email={SITE.email}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />
    </>
  );
}
