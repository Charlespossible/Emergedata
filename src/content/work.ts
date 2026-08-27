import type { Engagement, EngagementGroup } from './types';

export const workIntro =
  'The following engagements illustrate the breadth and depth of Emerge Data’s intelligence work across our areas of focus.';

export const engagementGroups: { id: EngagementGroup; label: string }[] = [
  { id: 'health', label: 'Health' },
  { id: 'environment', label: 'Environment' },
  { id: 'markets-bd', label: 'Markets & Business Development' },
];

/**
 * TODO — CLIENT INPUT REQUIRED (plan §9.4):
 * the 2025 profile supplies engagement TITLES ONLY. Supply a 25–40 word `description`,
 * the confirmed `partner` and the `locations` for each of the seven engagements,
 * particularly the two new ones (Digital Innovation for Circular Economy in Africa;
 * SME Growth Strategy Advisory). Nothing below is invented — every `partner` and
 * `locations` value marked `carried: true` comes from the 2024 profile and needs confirming.
 */
export const engagements: Engagement[] = [
  {
    slug: 'uhc-readiness-assessment',
    title: 'Universal Health Coverage (UHC) Readiness Assessment',
    group: 'health',
    partner: 'Songhai',
    locations: ['Abuja', 'Nasarawa', 'Kano', 'Enugu', 'Imo', 'Kaduna', 'Lagos'],
    carried: true,
    featured: true,
  },
  {
    slug: 'eldercare-intelligence-financing-study',
    title: 'Eldercare Intelligence & Financing Study',
    group: 'health',
    partner: 'Dew Drop Foundation',
    carried: true,
  },
  {
    slug: 'climate-action-for-smes',
    title: 'Climate Action for SMEs',
    group: 'environment',
    partner: 'African Development Bank / Natural Eco-Capital',
    locations: ['Nigeria', 'South Africa', 'Cameroon', 'Mozambique', 'Egypt', 'Angola'],
    carried: true,
    featured: true,
  },
  {
    slug: 'green-venture-building',
    title: 'Green Venture Building for Climate Change Entrepreneurs',
    group: 'environment',
    partner: 'Nigeria Climate Innovation Centre',
    locations: ['Lagos'],
    carried: true,
  },
  {
    slug: 'digital-innovation-circular-economy',
    title: 'Digital Innovation for Circular Economy in Africa',
    group: 'environment',
  },
  {
    slug: 'digital-economy-programme',
    title: 'Digital Economy Programme',
    group: 'markets-bd',
    partner: 'DEAL',
    locations: ['MORSE graduates and practitioners'],
    carried: true,
    featured: true,
  },
  {
    slug: 'sme-growth-strategy-advisory',
    title: 'SME Growth Strategy Advisory',
    group: 'markets-bd',
  },
];

export const featuredEngagements = engagements.filter((item) => item.featured);

export const getEngagementBySlug = (slug: string): Engagement | undefined =>
  engagements.find((item) => item.slug === slug);
