import { SITE } from '@/config/site';
import { getCountries, getFocusAreas } from './content';

/** Deploy subfolder, always with a trailing slash: '/' or '/emerge/'. */
const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/** Absolute URL for a path that is written root-relative in the source, e.g. '/images/og/x.jpg'. */
export const absoluteUrl = (pathFromRoot: string) =>
  `${SITE.url}${BASE}${pathFromRoot.replace(/^\//, '')}`;

/** Absolute URL for an app route, e.g. '/about'. */
export const canonical = (route: string) => absoluteUrl(route === '/' ? '' : route);

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: absoluteUrl('/images/og/logo-512.png'),
  image: absoluteUrl(SITE.defaultSeo.ogImage),
  description: SITE.defaultSeo.description,
  slogan: SITE.tagline,
  email: SITE.email,
  telephone: SITE.phone,
  ...(SITE.socials.length ? { sameAs: SITE.socials.map((s) => s.href) } : {}),
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${SITE.address.street}, ${SITE.address.district}`,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.countryCode,
  },
  areaServed: getCountries().map((country) => ({ '@type': 'Country', name: country.name })),
});

export const professionalServiceJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  url: canonical('/focus-areas'),
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${SITE.address.street}, ${SITE.address.district}`,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.countryCode,
  },
  areaServed: getCountries().map((country) => ({ '@type': 'Country', name: country.name })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Areas of focus',
    itemListElement: getFocusAreas().map((area) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: area.title, description: area.intro },
    })),
  },
});
