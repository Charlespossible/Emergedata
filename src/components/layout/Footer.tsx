import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { SITE } from '@/config/site';
import { FEATURES } from '@/config/features';
import { FOOTER_NAV, NAV } from '@/config/nav';
import { getHeadquarters } from '@/lib/content';

export function Footer() {
  const hq = getHeadquarters();
  const year = new Date().getFullYear();
  const blogItem = NAV.find((item) => item.disabled);

  return (
    <footer className="bg-brand-900 text-brand-200">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo onDeep />
            <p className="mt-5 max-w-xs text-small text-brand-200">{SITE.tagline}</p>
            <p className="mt-6 text-small text-brand-300">
              A data intelligence and management consulting firm headquartered in Abuja, Nigeria.
            </p>
          </div>

          {FOOTER_NAV.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-white">
                {group.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="inline-flex min-h-[36px] items-center text-small text-brand-200 transition duration-150 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {group.title === 'Company' && blogItem && !FEATURES.blog ? (
                  <li>
                    <span
                      aria-disabled="true"
                      tabIndex={-1}
                      className="inline-flex min-h-[36px] cursor-not-allowed items-center gap-2 text-small text-brand-300/70"
                    >
                      {blogItem.label}
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-brand-200">
                        {blogItem.badge}
                      </span>
                    </span>
                  </li>
                ) : null}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-white">
              Get in touch
            </h2>
            <address className="mt-5 flex flex-col gap-4 text-small not-italic">
              <span className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <span>{hq.address}</span>
              </span>
              <a
                href={`mailto:${SITE.email}`}
                className="flex min-h-[36px] items-center gap-3 transition duration-150 hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="flex min-h-[36px] items-center gap-3 transition duration-150 hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                {SITE.phone}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-small text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>{SITE.domain}</p>
        </div>
      </Container>
    </footer>
  );
}
