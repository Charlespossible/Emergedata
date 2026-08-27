import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import { focusColor, type FocusColorName } from './focusColor';

const numeral = cva(
  'inline-flex items-center justify-center rounded-lg font-display font-semibold text-white',
  {
    variants: {
      size: {
        sm: 'h-9 w-9 text-sm',
        md: 'h-11 w-11 text-base',
        lg: 'h-14 w-14 text-lg',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

type Props = VariantProps<typeof numeral> & {
  children: string;
  color: FocusColorName;
  className?: string;
};

export function NumeralBadge({ children, color, size, className }: Props) {
  return (
    <span aria-hidden="true" className={cn(numeral({ size }), focusColor[color].badge, className)}>
      {children}
    </span>
  );
}
