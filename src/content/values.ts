import type { Value } from './types';

/**
 * These seven values are absent from the 2025 profile, but they are published on the
 * client's own live site at emergedata.com.ng/about, so the wording below follows that
 * page rather than the plan's paraphrase — only the spellings are anglicised to match the
 * rest of the site (organisation, not organization).
 *
 * The section stays behind FEATURES.values so it can be dropped with one flag if the
 * client decides the values do not carry over to the 2025 positioning.
 */
export const values: Value[] = [
  { title: 'A data and evidence-driven organisation' },
  { title: 'Decent work and innovation' },
  { title: 'Encourage diversity and mutual respect in our workplace' },
  { title: 'Promote human dignity' },
  { title: 'Respect for our clients and the people we work with' },
  { title: 'Work with a sense of urgency' },
  { title: 'Integrity and transparency' },
];
