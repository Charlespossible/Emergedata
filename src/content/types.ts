export type FocusColor = 'brand' | 'green' | 'amber' | 'teal' | 'violet' | 'accent';

export type FocusArea = {
  slug: string;
  number: string;
  title: string;
  /** ~20 words. Used on the Home grid card. */
  summary: string;
  /** Verbatim opening statement from the 2025 profile. */
  intro: string;
  /** The doc's run-on "our services include…" sentence, split into discrete items. */
  capabilities: string[];
  /**
   * An offering within this area that is a different *kind* of work from the research
   * capabilities above — a product or service line rather than a study. Rendered as its
   * own callout so it does not read as one more bullet in the list.
   */
  highlight?: { title: string; body: string };
  worksWith?: string;
  color: FocusColor;
};

export type Differentiator = { title: string; description: string };

export type ApproachStage = { number: string; title: string; methods: string };

export type Leader = {
  slug: string;
  name: string;
  role: string;
  /** Base path without extension, e.g. /images/team/kenneth-apeh — .webp and .jpg are derived. */
  photo?: string;
  teaser: string;
  bio: string[];
  email?: string;
  phone?: string;
  order: number;
  /** Set where the source bio was restructured and needs client sign-off. */
  editorialNote?: string;
};

export type EngagementGroup = 'health' | 'environment' | 'markets-bd';

export type Engagement = {
  slug: string;
  title: string;
  group: EngagementGroup;
  partner?: string;
  /** TODO: awaiting a 25–40 word description per engagement from the client (plan §9.4). */
  description?: string;
  locations?: string[];
  /** True where the partner/geography is carried from the 2024 profile and needs confirming. */
  carried?: boolean;
  featured?: boolean;
};

export type PartnerGroup = { title: string; items: string[] };

export type PartnerLogo = {
  name: string;
  /** Base path without extension, e.g. /images/partners/afdb — .webp and .png are derived. */
  file: string;
  width: number;
  height: number;
};

export type Office = {
  state: string;
  address: string;
  isHq?: boolean;
  /** Nothing unverified goes live. Only published offices render. */
  published: boolean;
  phone?: string;
};

export type Country = { name: string; code: string; isHq?: boolean };

export type Stat = { value: string; label: string };

export type Value = { title: string };
