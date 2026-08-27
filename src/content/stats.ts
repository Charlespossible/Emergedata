import type { Stat } from './types';

/** Proof points from the 2025 profile. */
export const stats: Stat[] = [
  { value: '21', label: 'Professionals' },
  { value: '150+', label: 'Volunteer network' },
  { value: '9', label: 'Countries of project experience' },
  { value: '6', label: 'Areas of focus' },
];

export const extendedStats: Stat[] = [
  ...stats,
  { value: '5', label: 'States in Nigeria' },
  { value: '12+', label: 'Years leadership experience' },
];
