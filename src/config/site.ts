/**
 * Public origin, no trailing slash. Override with VITE_SITE_URL when building for a host
 * other than production (staging, a preview domain). The deploy subfolder is separate —
 * that comes from BASE_PATH and is applied in src/lib/seo.ts.
 */
const ORIGIN = (import.meta.env.VITE_SITE_URL ?? 'https://www.emergedata.com.ng').replace(
  /\/$/,
  '',
);

export const SITE = {
  name: 'Emerge Data',
  // As published in the client's own footer at emergedata.com.ng: 'Emerge Data Ltd'.
  legalName: 'Emerge Data Ltd',
  tagline: "Data-Driven Intelligence for Africa's Economy",
  closingLine: 'Africa runs on decisions. Decisions run on data.',
  url: ORIGIN,
  domain: 'emergedata.com.ng',
  email: 'info@emergedata.com.ng',
  phone: '+234 802 7982900',
  phoneHref: '+2348027982900',
  address: {
    street: '22 Aguiyi Ironsi Street',
    district: 'Maitama',
    city: 'Abuja',
    region: 'FCT',
    country: 'Nigeria',
    countryCode: 'NG',
    full: '22 Aguiyi Ironsi Street, Maitama, Abuja, FCT, Nigeria',
  },
  /** Awaiting client confirmation — see §9.9 of the plan. Empty array = no sameAs in JSON-LD. */
  socials: [] as { label: string; href: string }[],
  defaultSeo: {
    titleTemplate: '%s | Emerge Data',
    defaultTitle: 'Emerge Data — Data Intelligence & Management Consulting, Abuja Nigeria',
    description:
      'Emerge Data is a data intelligence and management consulting firm in Abuja, Nigeria, generating the evidence governments, businesses and development partners need.',
    ogImage: '/images/og/emerge-data-og.jpg',
  },
} as const;
