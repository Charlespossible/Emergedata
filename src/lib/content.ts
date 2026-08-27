/**
 * The single seam between the app and its content.
 *
 * Components MUST import from here, never from `src/content/*` directly. When Phase 5
 * swaps the static files for a CMS or an API, every getter below becomes async and only
 * this file changes — the call sites move from `getFocusAreas()` to `await getFocusAreas()`.
 */
import * as about from '@/content/about';
import { approachStages, approachIntro, benchmarking } from '@/content/approach';
import { countries } from '@/content/countries';
import { differentiators, differentiatorsIntro } from '@/content/differentiators';
import { focusAreas, focusAreasIntro, getFocusAreaBySlug } from '@/content/focusAreas';
import { leaders, leadershipIntro } from '@/content/leadership';
import { offices, publishedOffices, headquarters } from '@/content/offices';
import { partnerGroups, partnerLogos, partnersIntro } from '@/content/partners';
import { stats, extendedStats } from '@/content/stats';
import { values } from '@/content/values';
import {
  engagements,
  engagementGroups,
  featuredEngagements,
  workIntro,
  getEngagementBySlug,
} from '@/content/work';
import type {
  ApproachStage,
  Country,
  Differentiator,
  Engagement,
  EngagementGroup,
  FocusArea,
  Leader,
  Office,
  PartnerGroup,
  PartnerLogo,
  Stat,
  Value,
} from '@/content/types';

/* ---------- Focus areas ---------- */
export const getFocusAreas = (): FocusArea[] => focusAreas;
export const getFocusArea = (slug: string): FocusArea | undefined => getFocusAreaBySlug(slug);
export const getFocusAreasIntro = (): string => focusAreasIntro;

/* ---------- About ---------- */
export const getWhoWeAre = (): string[] => about.whoWeAre;
export const getPositioningQuote = (): string => about.positioningQuote;
export const getMission = () => about.mission;
export const getVision = () => about.vision;
export const getPresence = () => about.presence;
export const getTeamScale = (): string => about.teamScale;
export const getLegalStatus = () => about.legalStatus;
export const getClosingStatement = () => about.closingStatement;

/* ---------- Differentiators & approach ---------- */
export const getDifferentiators = (): Differentiator[] => differentiators;
export const getDifferentiatorsIntro = (): string => differentiatorsIntro;
export const getApproachStages = (): ApproachStage[] => approachStages;
export const getApproachIntro = (): string => approachIntro;
export const getBenchmarking = () => benchmarking;

/* ---------- People ---------- */
export const getLeaders = (): Leader[] => [...leaders].sort((a, b) => a.order - b.order);
export const getLeadershipPreview = (count = 4): Leader[] => getLeaders().slice(0, count);
export const getLeadershipIntro = (): string => leadershipIntro;

/* ---------- Work ---------- */
export const getEngagements = (): Engagement[] => engagements;
export const getFeaturedEngagements = (): Engagement[] => featuredEngagements;
export const getEngagementGroups = (): { id: EngagementGroup; label: string }[] => engagementGroups;
export const getWorkIntro = (): string => workIntro;
export const getEngagement = (slug: string): Engagement | undefined => getEngagementBySlug(slug);

/* ---------- Partners ---------- */
export const getPartnerGroups = (): PartnerGroup[] => partnerGroups;
export const getPartnerLogos = (): PartnerLogo[] => partnerLogos;
export const getPartnersIntro = (): string => partnersIntro;

/* ---------- Places ---------- */
export const getOffices = (): Office[] => offices;
export const getPublishedOffices = (): Office[] => publishedOffices;
export const getHeadquarters = (): Office => headquarters;
export const getCountries = (): Country[] => countries;

/* ---------- Misc ---------- */
export const getStats = (): Stat[] => stats;
export const getExtendedStats = (): Stat[] => extendedStats;
export const getValues = (): Value[] => values;
