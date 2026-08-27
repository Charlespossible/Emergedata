/**
 * Page-level microcopy: section eyebrows, headings, leads, CTA labels and SEO strings.
 *
 * This exists so that pages and components contain zero literal copy. Everything a
 * non-engineer might want to reword lives in this file or one of its siblings.
 */

export const homePage = {
  seo: {
    title: 'Home',
    description:
      'Emerge Data is a data intelligence and management consulting firm in Abuja, Nigeria, generating evidence for governments, businesses, development partners and communities.',
  },
  hero: {
    eyebrow: 'Data-Driven Intelligence for Africa’s Economy',
    title: 'Evidence that turns decisions into outcomes.',
    lead: 'Emerge Data is a data intelligence and management consulting firm in Abuja, Nigeria — generating the evidence governments, businesses, development partners and communities need to make decisions that matter.',
    primaryCta: { label: 'Start a conversation', href: '/contact' },
    secondaryCta: { label: 'Explore our focus areas', href: '/focus-areas' },
  },
  positioning: {
    eyebrow: 'Insight to action',
  },
  partners: {
    title: 'Working with',
  },
  focusAreas: {
    eyebrow: 'What we do',
    title: 'Six areas of focus',
  },
  differentiators: {
    eyebrow: 'Why Emerge Data',
    title: 'What makes us different',
  },
  approach: {
    eyebrow: 'How we work',
    title: 'Our approach',
  },
  benchmarking: {
    eyebrow: 'Methodology',
  },
  engagements: {
    eyebrow: 'Our work',
    title: 'Select engagements',
    cta: { label: 'See all engagements', href: '/our-work' },
  },
  leadership: {
    eyebrow: 'Our people',
    title: 'Led by practitioners',
    cta: { label: 'Meet the leadership team', href: '/leadership' },
  },
  cta: {
    label: 'Start a conversation',
    href: '/contact',
  },
};

export const aboutPage = {
  seo: {
    title: 'About',
    description:
      'An insight-to-action firm: Emerge Data collects data, builds the evidence, translates it into strategy, and walks alongside clients and communities as they act on it.',
  },
  header: {
    eyebrow: 'About Emerge Data',
    title: 'African data intelligence — rigorous in method, practical in outcome.',
    lead: 'A data intelligence and management consulting firm headquartered in Abuja, Nigeria, working across health, environment, markets, business development, socio-politico risk and private financing.',
  },
  whoWeAre: { eyebrow: 'Who we are', title: 'An insight-to-action firm' },
  missionVision: { eyebrow: 'Purpose', title: 'Mission and vision' },
  differentiators: { eyebrow: 'Why Emerge Data', title: 'What makes us different' },
  approach: { eyebrow: 'How we work', title: 'Our approach' },
  benchmarking: { eyebrow: 'Methodology' },
  presence: { eyebrow: 'Where we work', title: 'Our presence' },
  teamScale: { eyebrow: 'Our team', title: 'Depth and reach' },
  values: { eyebrow: 'What we stand for', title: 'Core values' },
  cta: { label: 'Work with us', href: '/contact' },
};

export const focusAreasPage = {
  seo: {
    title: 'Focus Areas',
    description:
      'Health, environment, markets, business development, socio-politico risk assessment and private financing — the six domains Emerge Data organises its intelligence work around.',
  },
  header: {
    eyebrow: 'Areas of focus',
    title: 'Six interconnected domains',
  },
  cta: { label: 'Discuss an engagement', href: '/contact' },
};

export const ourWorkPage = {
  seo: {
    title: 'Our Work',
    description:
      'Select engagements across health, environment, markets and business development, and the client and partner community Emerge Data works with across Africa.',
  },
  header: {
    eyebrow: 'Our work',
    title: 'Evidence delivered, decisions made',
  },
  engagements: { eyebrow: 'Select engagements', title: 'Engagements' },
  filterLabel: 'Filter engagements by area',
  filterAll: 'All',
  emptyState: 'No engagements match this filter.',
  partners: { eyebrow: 'Who we work with', title: 'Clients & partners' },
  cta: { label: 'Start a conversation', href: '/contact' },
};

export const leadershipPage = {
  seo: {
    title: 'Leadership',
    description:
      'The Emerge Data management team combines technical expertise in data science, economics, business development and community programming with practical African experience.',
  },
  header: {
    eyebrow: 'Leadership',
    title: 'The people behind the evidence',
  },
  teamScale: { eyebrow: 'Our team', title: 'Depth and reach' },
  cta: { label: 'Talk to the team', href: '/contact' },
};

export const contactPage = {
  seo: {
    title: 'Contact',
    description:
      'Talk to Emerge Data about an engagement. Headquartered at 22 Aguiyi Ironsi Street, Maitama, Abuja, with project experience across nine African countries.',
  },
  header: {
    eyebrow: 'Contact',
    title: 'Start a conversation',
    lead: 'Tell us about the decision you are trying to make. We will come back to you with how we would build the evidence for it.',
  },
  form: {
    title: 'Send us a message',
    successMessage: 'Thank you — your message has been sent. We will come back to you shortly.',
    mailtoNote: 'Opens your email app.',
  },
  details: { title: 'Contact details' },
  offices: { title: 'Offices' },
  whereWeWork: { title: 'Where we work' },
  officesNote:
    'Additional offices across Nigeria are listed once confirmed. Reach the headquarters for any enquiry in the meantime.',
};

export const notFoundPage = {
  seo: {
    title: 'Page not found',
    description: 'The page you are looking for does not exist or has moved.',
  },
  eyebrow: 'Error 404',
  title: 'We could not find that page.',
  lead: 'The page you are looking for does not exist, or it has moved. Try one of the routes below.',
  primaryCta: { label: 'Back to home', href: '/' },
  secondaryCta: { label: 'Contact us', href: '/contact' },
};
