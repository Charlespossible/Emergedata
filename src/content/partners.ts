import type { PartnerGroup, PartnerLogo } from './types';

export const partnersIntro =
  'Emerge Data works across the full spectrum of development, public, and private sector actors. Our client and partner community includes:';

export const partnerGroups: PartnerGroup[] = [
  {
    title: 'Development & Multilateral Partners',
    items: [
      'African Development Bank (AfDB)',
      'World Bank Group',
      'United Nations agencies (UNICEF, WHO, UNDP, UN Women)',
      'FCDO (UK Aid) and USAID',
      'Bill & Melinda Gates Foundation',
      'GIZ and other bilateral donors',
      'INGOs',
    ],
  },
  {
    title: 'Government, Private Sector & Civil Society',
    items: [
      'Federal and State Ministries (Health, Environment, Trade, Finance)',
      'National and subnational planning commissions',
      'SMEs, corporates, and investor networks',
      'Banks, DFIs, and impact investment funds',
      'NGOs and community-based organisations',
      'Universities and research institutions',
    ],
  },
];

/**
 * Marks embedded in the client's 2025 profile document, plus ones the client supplied
 * directly into `source-images/`. Do NOT add a logo for any organisation the client has
 * not confirmed in writing (plan §9.5). The whole row is gated by FEATURES.partnerLogos.
 *
 * width/height must match the files on disk or the row shifts as they load —
 * `npm run images` prints the current values.
 *
 * ⚠ RESOLUTION: Dew Drop, DEAL and CHIDA arrived as ~113px-wide JPEGs and trim to 30–78px
 * tall — below the row's own render height, so they are visibly softer than the rest.
 * Higher-resolution originals are needed; see source-images/README.md.
 */
export const partnerLogos: PartnerLogo[] = [
  { name: 'African Development Bank', file: '/images/partners/afdb', width: 225, height: 224 },
  {
    name: 'Nigeria Climate Innovation Centre',
    file: '/images/partners/nigeria-climate-innovation-centre',
    width: 296,
    height: 240,
  },
  { name: 'Enspire', file: '/images/partners/enspire', width: 191, height: 112 },
  { name: 'JCI Abuja Unity', file: '/images/partners/jci-abuja-unity', width: 322, height: 124 },
  {
    name: 'ArchiVisual Solutions',
    file: '/images/partners/archivisual-solutions',
    width: 310,
    height: 77,
  },
  {
    name: 'Dew Drop Foundation',
    file: '/images/partners/dew-drop-foundation',
    width: 55,
    height: 77,
  },
  { name: 'DEAL', file: '/images/partners/deal', width: 82, height: 25 },
  { name: 'CHIDA', file: '/images/partners/chida', width: 94, height: 30 },
];
