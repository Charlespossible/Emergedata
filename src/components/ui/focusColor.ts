/**
 * The six focus-area colours, in the only forms they are allowed to take:
 * a filled numeral badge with white text, a small dot, a rule, a border, and a
 * decorative (aria-hidden) icon.
 *
 * Every class here is written out in full — Tailwind's scanner cannot see class names
 * built by string concatenation, so never construct these dynamically.
 *
 * `icon` is used only on decorative marks. Note chart.amber fails contrast as text on
 * white, so no colour in this table is ever used for body copy or a card background.
 */
export type FocusColorName = 'brand' | 'green' | 'amber' | 'teal' | 'violet' | 'accent';

type FocusColorClasses = {
  badge: string;
  dot: string;
  rule: string;
  border: string;
  icon: string;
};

export const focusColor: Record<FocusColorName, FocusColorClasses> = {
  brand: {
    badge: 'bg-brand-600',
    dot: 'bg-brand-600',
    rule: 'bg-brand-600',
    border: 'border-brand-600',
    icon: 'text-brand-600',
  },
  green: {
    badge: 'bg-chart-green',
    dot: 'bg-chart-green',
    rule: 'bg-chart-green',
    border: 'border-chart-green',
    icon: 'text-chart-green',
  },
  amber: {
    badge: 'bg-chart-amber',
    dot: 'bg-chart-amber',
    rule: 'bg-chart-amber',
    border: 'border-chart-amber',
    icon: 'text-chart-amber',
  },
  teal: {
    badge: 'bg-chart-teal',
    dot: 'bg-chart-teal',
    rule: 'bg-chart-teal',
    border: 'border-chart-teal',
    icon: 'text-chart-teal',
  },
  violet: {
    badge: 'bg-chart-violet',
    dot: 'bg-chart-violet',
    rule: 'bg-chart-violet',
    border: 'border-chart-violet',
    icon: 'text-chart-violet',
  },
  accent: {
    badge: 'bg-accent-600',
    dot: 'bg-accent-600',
    rule: 'bg-accent-600',
    border: 'border-accent-600',
    icon: 'text-accent-600',
  },
};
