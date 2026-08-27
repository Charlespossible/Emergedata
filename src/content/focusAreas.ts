import type { FocusArea } from './types';

/**
 * Verbatim from the 2025 company profile. The `capabilities` arrays are the doc's
 * run-on "our services include…" sentences split into discrete items and sentence-cased.
 * Nothing here is paraphrased.
 */
export const focusAreas: FocusArea[] = [
  {
    slug: 'health',
    number: '01',
    title: 'Health',
    summary:
      'Generating, analysing and translating health data to improve systems, financing and outcomes across Nigeria and the continent.',
    intro:
      'We generate, analyse, and translate health data to improve systems, financing, and outcomes.',
    capabilities: [
      'Primary healthcare utilisation and quality assessments',
      'Health financing and insurance landscape studies',
      'Disease burden mapping',
      'Community health behaviour and demand surveys',
      'Universal health coverage (UHC) readiness assessments',
      'Eldercare and vulnerable population studies',
      'Health policy advocacy grounded in field evidence',
    ],
    // Client-supplied 2026-08-28. "digitisation" is anglicised from the supplied
    // "digitization" to keep British spellings consistent site-wide.
    highlight: {
      title: 'Health technology',
      body: 'We provide comprehensive health technology solutions to automate critical aspects of healthcare delivery ranging from telemedicine, credit facility and electronic medical records, and in-facility digitisation services, supply and demand generation.',
    },
    worksWith:
      'We work with national and state ministries of health, development partners, NGOs, insurers, and community health structures — producing evidence that informs both clinical programme design and health finance strategies.',
    color: 'brand',
  },
  {
    slug: 'environment',
    number: '02',
    title: 'Environment',
    summary:
      'Measuring, mapping and modelling Africa’s environmental risk and opportunity, from climate exposure to circular economy pathways.',
    intro:
      'We measure, map, and model Africa’s environmental challenges and opportunities, from climate risk to circular economy pathways.',
    capabilities: [
      'Climate vulnerability and resilience assessments',
      'Environmental impact assessments for infrastructure, industry, and investment',
      'Circular economy diagnostics for SMEs and industrial clusters',
      'Carbon credit readiness and baseline studies',
      'Green enterprise data platforms',
      'Waste stream quantification and material flow mapping',
      'Community-level climate adaptation programme monitoring and evaluation',
    ],
    worksWith:
      'We partner with multilateral development banks, government agencies, green finance platforms, and local environmental actors to ensure that climate action is grounded in credible data.',
    color: 'green',
  },
  {
    slug: 'markets',
    number: '03',
    title: 'Markets',
    summary:
      'Market intelligence for businesses, investors and policymakers reading Africa’s fast-moving economic landscape.',
    intro:
      'We produce the market intelligence that businesses, investors, and policymakers need to understand Africa’s dynamic and rapidly evolving economic landscape.',
    capabilities: [
      'Sectoral market sizing and competitive landscape analysis',
      'Consumer behaviour and demand-side surveys',
      'Supply chain mapping and value chain diagnostics',
      'Digital economy and fintech market assessments',
      'SME cluster analysis and growth opportunity mapping',
      'Price monitoring and commodity market tracking',
      'Trade corridor and investment climate profiling',
    ],
    worksWith:
      'Our market data products help clients move from intuition to evidence, identifying where opportunities exist, where risks lie, and how markets are likely to evolve.',
    color: 'amber',
  },
  {
    slug: 'business-development',
    number: '04',
    title: 'Business Development',
    summary:
      'Helping ventures and established enterprises build evidence-based strategies for growth, performance and capability.',
    intro:
      'We support organisations from early-stage ventures to established enterprises to build stronger, more evidence-based strategies for growth.',
    capabilities: [
      'Business environment scoping and feasibility assessments',
      'Organisational performance diagnostics and benchmarking',
      'Talent and human capital gap analysis',
      'Behavioural change and adoption studies for new products or services',
      'Capacity building programme design grounded in needs assessment data',
      'Entrepreneurship ecosystem mapping',
      'Start-up and SME acceleration support using data-driven growth frameworks',
    ],
    worksWith:
      'We bring the same analytical rigour to business development that a driven team would bring to a business engagement, and calibrated for the African context.',
    color: 'teal',
  },
  {
    slug: 'socio-politico-risk',
    number: '05',
    title: 'Socio-Politico Risk Assessment',
    summary:
      'Political and governance intelligence that lets institutions and investors anticipate risk and navigate uncertainty.',
    intro:
      'We provide the political and governance intelligence that enables institutions, investors, and development actors to anticipate risk, navigate uncertainty, and make informed decisions across Africa’s complex operating environments.',
    capabilities: [
      'Political risk and scenario analysis',
      'Electoral and governance assessments',
      'Conflict early warning systems',
      'Security and regulatory landscape mapping',
      'Civic space monitoring',
      'Social cohesion surveys',
      'Anti-corruption diagnostics',
    ],
    worksWith:
      'We support development finance institutions, multilateral agencies, INGOs, diplomatic missions, and private investors with the contextual intelligence needed to safeguard investments, strengthen programmes, and respond proactively to emerging political and governance shifts. We understand that stability drives development and investment outcomes, and that effective decisions depend on timely, credible, and actionable intelligence.',
    color: 'accent',
  },
  {
    slug: 'private-financing',
    number: '06',
    title: 'Private Financing Initiatives',
    summary:
      'Building the evidence base and advisory frameworks that unlock private capital for Africa’s development priorities.',
    intro:
      'We build the evidence base and advisory frameworks that unlock private capital for Africa’s development priorities.',
    capabilities: [
      'Investment readiness assessments for SMEs and development-stage enterprises',
      'Blended finance structuring support and feasibility analysis',
      'Impact measurement and reporting frameworks aligned to ESG and SDG standards',
      'Green and climate finance landscape mapping',
      'Private sector engagement strategies for development partners and multilateral donors',
      'Data infrastructure for impact-linked financial instruments (results-based grants, social impact bonds, concessional debt)',
    ],
    worksWith: 'We understand that capital follows credibility built on data.',
    color: 'violet',
  },
];

export const focusAreasIntro =
  'Emerge Data organises its work around six interconnected domains, each representing a critical frontier of Africa’s development — and each requiring the kind of rigorous, granular data that transforms assumptions into evidence.';

export const getFocusAreaBySlug = (slug: string): FocusArea | undefined =>
  focusAreas.find((area) => area.slug === slug);
