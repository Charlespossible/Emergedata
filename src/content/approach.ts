import type { ApproachStage } from './types';

export const approachIntro =
  'Emerge Data operates through a structured, four-stage intelligence cycle that we apply consistently across all sectors and engagement types:';

export const approachStages: ApproachStage[] = [
  {
    number: '01',
    title: 'Design',
    methods: 'Instrument design, sampling methodology, ethical frameworks, stakeholder mapping.',
  },
  {
    number: '02',
    title: 'Collect',
    methods:
      'In-field data collection, household surveys, KIIs, FGDs, remote sensing, administrative data.',
  },
  {
    number: '03',
    title: 'Analyse',
    methods: 'ML-augmented analytics, statistical modelling, geospatial analysis, thematic coding.',
  },
  {
    number: '04',
    title: 'Advise',
    methods: 'Evidence reports, dashboards, policy briefs, investment memos, community feedback.',
  },
];

export const benchmarking = {
  body: 'We benchmark our methodologies against global standards, drawing on frameworks from the World Health Organisation, World Bank, IPCC, UNDP, and leading academic institutions, while remaining deeply attuned to local contexts, community dynamics, and African institutional realities.',
  institutions: [
    'World Health Organisation',
    'World Bank',
    'IPCC',
    'UNDP',
    'Leading academic institutions',
  ],
};
