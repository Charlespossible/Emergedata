import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { BrandMotif } from '@/components/ui/BrandMotif';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FEATURES } from '@/config/features';
import { NAV } from '@/config/nav';
import { notFoundPage } from '@/content/pages';

export default function NotFoundPage() {
  const routes = NAV.filter((item) => !(item.disabled && !FEATURES.blog));

  return (
    <>
      <SEO
        title={notFoundPage.seo.title}
        description={notFoundPage.seo.description}
        path="/404"
        noIndex
      />

      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink-50 pb-20 pt-36">
        <BrandMotif className="-right-32 -top-20 h-[36rem] w-[36rem] text-brand-900/[0.04]" />
        <Container className="relative">
          <div className="max-w-2xl">
            <Eyebrow>{notFoundPage.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-h1 text-brand-900">{notFoundPage.title}</h1>
            <p className="mt-5 max-w-prose text-lead text-ink-600">{notFoundPage.lead}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to={notFoundPage.primaryCta.href} size="lg">
                {notFoundPage.primaryCta.label}
              </Button>
              <Button to={notFoundPage.secondaryCta.href} variant="secondary" size="lg">
                {notFoundPage.secondaryCta.label}
              </Button>
            </div>

            <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink-200 pt-8">
              {routes.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="inline-flex min-h-[44px] items-center text-small font-medium text-brand-600 transition duration-150 hover:text-brand-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
