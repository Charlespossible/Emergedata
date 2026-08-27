import { cva, type VariantProps } from 'class-variance-authority';
import { Link } from 'react-router-dom';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'bg-brand-600 text-white hover:bg-brand-700',
        secondary: 'border border-brand-600 text-brand-600 hover:bg-brand-50',
        /** One accent CTA per page, maximum — see the colour usage law. */
        accent: 'bg-accent-500 text-white hover:bg-accent-600',
        ghost: 'text-brand-600 hover:bg-brand-50',
        onDeep: 'bg-white text-brand-900 hover:bg-brand-50 focus-visible:ring-offset-brand-900',
        onDeepOutline:
          'border border-brand-200/60 text-white hover:border-white hover:bg-white/10 focus-visible:ring-offset-brand-900',
      },
      size: {
        sm: 'min-h-[44px] px-4 text-small',
        md: 'min-h-[48px] px-6 text-body',
        lg: 'min-h-[52px] px-8 text-body',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type Styling = VariantProps<typeof button> & { className?: string; children: ReactNode };

type Props =
  | (Styling & { to: string } & Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        'href' | 'className' | 'children'
      >)
  | (Styling & { href: string } & Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        'href' | 'className' | 'children'
      >)
  | (Styling & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>);

/** Renders a <Link>, an <a> or a <button> depending on which of `to` / `href` is given. */
export function Button({ className, variant, size, children, ...rest }: Props) {
  const classes = cn(button({ variant, size }), className);

  if ('to' in rest) {
    const { to, ...anchorProps } = rest;
    return (
      <Link to={to} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  if ('href' in rest) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
