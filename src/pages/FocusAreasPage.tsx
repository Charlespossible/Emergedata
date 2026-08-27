import { SEO } from '@/components/layout/SEO';
import { CTABand } from '@/components/sections/CTABand';
import { FocusAreaBlock } from '@/components/sections/FocusAreaBlock';
import { FocusAreaRail } from '@/components/sections/FocusAreaRail';
import { PageHeader } from '@/components/sections/PageHeader';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/config/site';
import { focusAreasPage } from '@/content/pages';
import { getClosingStatement, getFocusAreas, getFocusAreasIntro } from '@/lib/content';
import { professionalServiceJsonLd } from '@/lib/seo';

export default function FocusAreasPage() {
  const areas = getFocusAreas();
  const closing = getClosingStatement();

  return (
    <>
      <SEO
        title={focusAreasPage.seo.title}
        description={focusAreasPage.seo.description}
        path="/focus-areas"
        jsonLd={[professionalServiceJsonLd()]}
      />

      <PageHeader {...focusAreasPage.header} lead={getFocusAreasIntro()} />

      <div className="bg-white py-10 lg:py-14">
        <Container>
          <div className="grid min-w-0 gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
            <FocusAreaRail areas={areas} />
            <div className="min-w-0">
              {areas.map((area, index) => (
                <FocusAreaBlock key={area.slug} area={area} alternate={index % 2 === 1} />
              ))}
            </div>
          </div>
        </Container>
      </div>

      <CTABand
        headline={closing.headline}
        body={closing.body}
        cta={focusAreasPage.cta}
        email={SITE.email}
        phone={SITE.phone}
        phoneHref={SITE.phoneHref}
      />
    </>
  );
}
