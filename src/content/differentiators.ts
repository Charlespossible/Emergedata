import type { Differentiator } from './types';

/**
 * Titles are verbatim from the 2025 profile. The 2025 doc supplies no descriptions —
 * the supporting lines below are drafted in the firm's voice (≤22 words each) and are
 * AWAITING CLIENT APPROVAL (plan §9.3).
 */
export const differentiatorsIntro =
  'At Emerge Data, our distinction lies in four interlocking capabilities that few firms on the continent combine under one roof:';

export const differentiators: Differentiator[] = [
  {
    title: 'End-to-End Data Intelligence',
    description:
      'We design the instrument, run the field work, model the data and write the strategy — one team, one chain of evidence.',
  },
  {
    title: 'Multi-Sector Coverage with Cross-Sector Insight',
    description:
      'Six domains under one roof, so health financing informs market strategy and climate risk informs investment decisions.',
  },
  {
    title: 'Community-to-Policy Architecture',
    description:
      'Evidence gathered in households and clinics travels intact to ministries, boards and donor committees without losing its context.',
  },
  {
    title: 'Machine Learning-Augmented Analytics',
    description:
      'Statistical modelling, geospatial analysis and machine learning applied where they sharpen the answer, never as decoration.',
  },
];
