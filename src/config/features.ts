/**
 * Single switchboard for everything that ships behind a flag.
 * Flip a flag here; no other file needs to change.
 */
export const FEATURES = {
  /** Blog is in the nav but non-interactive until the backend phase.
   *  Setting this to true turns the nav span into a <Link> AND registers the /blog route. */
  blog: false,
  /** Core values section on /about — carried from the 2024 profile, awaiting client confirmation. */
  values: true,
  /** Interactive map on /contact. Phase 1 ships a static country list; no third-party map JS. */
  map: false,
  /** Newsletter capture in the footer. */
  newsletter: false,
  /** Partner logo row. The five marks are embedded in the client's own 2025 profile.
   *  Set to false to fall back to the text-only "Clients & Partners" treatment. */
  partnerLogos: true,
  /** Legal status card on /about — carried from the 2024 profile. */
  legalStatus: true,
} as const;

export type FeatureName = keyof typeof FEATURES;
