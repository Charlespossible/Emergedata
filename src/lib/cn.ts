import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * The design system defines its own font-size scale (text-display, text-h1, text-lead,
 * text-body…). tailwind-merge cannot know those are sizes rather than colours, and would
 * otherwise treat `text-body` and `text-white` as the same class group — silently dropping
 * one of them. Every custom key in tailwind.config.ts → theme.extend.fontSize must be
 * listed here.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'h1', 'h2', 'h3', 'lead', 'body', 'small', 'eyebrow'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
