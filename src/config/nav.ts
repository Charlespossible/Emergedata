export type NavItem = {
  label: string;
  href: string;
  /** Rendered as a non-interactive span with aria-disabled when true. */
  disabled?: boolean;
  badge?: string;
  /** Sub-items render as a dropdown on desktop and a nested list in the drawer. */
  children?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Focus Areas',
    href: '/focus-areas',
    children: [
      { label: 'Health', href: '/focus-areas#health' },
      { label: 'Environment', href: '/focus-areas#environment' },
      { label: 'Markets', href: '/focus-areas#markets' },
      { label: 'Business Development', href: '/focus-areas#business-development' },
      { label: 'Socio-Politico Risk Assessment', href: '/focus-areas#socio-politico-risk' },
      { label: 'Private Financing Initiatives', href: '/focus-areas#private-financing' },
    ],
  },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Blog', href: '/blog', disabled: true, badge: 'Soon' },
];

/** Rendered as the primary CTA button in the header, not as a nav link. */
export const NAV_CTA = { label: 'Contact', href: '/contact' };

export const FOOTER_NAV = [
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'Our Work', href: '/our-work' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Focus Areas',
    items: [
      { label: 'Health', href: '/focus-areas#health' },
      { label: 'Environment', href: '/focus-areas#environment' },
      { label: 'Markets', href: '/focus-areas#markets' },
      { label: 'Business Development', href: '/focus-areas#business-development' },
      { label: 'Socio-Politico Risk', href: '/focus-areas#socio-politico-risk' },
      { label: 'Private Financing', href: '/focus-areas#private-financing' },
    ],
  },
];
