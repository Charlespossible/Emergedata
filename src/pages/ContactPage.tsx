import { Mail, MapPin, Phone } from 'lucide-react';
import { SEO } from '@/components/layout/SEO';
import { ContactForm } from '@/components/sections/ContactForm';
import { OfficeCard } from '@/components/sections/OfficeCard';
import { PageHeader } from '@/components/sections/PageHeader';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { SITE } from '@/config/site';
import { contactPage } from '@/content/pages';
import { getCountries, getFocusAreas, getPublishedOffices } from '@/lib/content';

export default function ContactPage() {
  const interests = getFocusAreas().map((area) => ({ value: area.slug, label: area.title }));
  const offices = getPublishedOffices();

  return (
    <>
      <SEO
        title={contactPage.seo.title}
        description={contactPage.seo.description}
        path="/contact"
      />

      <PageHeader {...contactPage.header} />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-h3 text-brand-900">{contactPage.form.title}</h2>
            <div className="mt-8">
              <ContactForm
                interests={interests}
                successMessage={contactPage.form.successMessage}
                mailtoNote={contactPage.form.mailtoNote}
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <Card>
              <h2 className="text-h3 text-brand-900">{contactPage.details.title}</h2>
              <address className="mt-5 flex flex-col gap-4 text-body not-italic text-ink-600">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex min-h-[44px] items-center gap-3 transition duration-150 hover:text-brand-600"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                  {SITE.email}
                </a>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="flex min-h-[44px] items-center gap-3 transition duration-150 hover:text-brand-600"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                  {SITE.phone}
                </a>
                <span className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                  <span>{SITE.address.full}</span>
                </span>
              </address>
            </Card>

            <div>
              <h2 className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-ink-500">
                {contactPage.offices.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-5">
                {offices.map((office) => (
                  <li key={office.state}>
                    <OfficeCard office={office} />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-small text-ink-500">{contactPage.officesNote}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted" aria-labelledby="where-we-work-title">
        <h2
          id="where-we-work-title"
          className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-ink-500"
        >
          {contactPage.whereWeWork.title}
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {getCountries().map((country) => (
            <li key={country.code}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-small text-ink-700 ring-1 ring-ink-200">
                {country.name}
                {country.isHq ? (
                  <span className="text-xs font-medium text-brand-600">HQ</span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
