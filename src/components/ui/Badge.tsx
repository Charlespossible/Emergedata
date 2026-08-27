import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

const badge = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-none',
  {
    variants: {
      variant: {
        neutral: 'bg-ink-100 text-ink-600',
        brand: 'bg-brand-50 text-brand-700',
        accent: 'bg-accent-500/10 text-accent-600',
        onDeep: 'bg-white/10 text-brand-100',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
);

type Props = VariantProps<typeof badge> & { children: ReactNode; className?: string };

export function Badge({ children, variant, className }: Props) {
  return <span className={cn(badge({ variant }), className)}>{children}</span>;
}
