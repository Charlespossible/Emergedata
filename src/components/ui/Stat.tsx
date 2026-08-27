import { cn } from '@/lib/cn';

type Props = { value: string; label: string; tone?: 'light' | 'dark'; className?: string };

export function Stat({ value, label, tone = 'light', className }: Props) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span
        className={cn(
          'font-display text-3xl font-semibold leading-none sm:text-4xl',
          tone === 'dark' ? 'text-white' : 'text-brand-900',
        )}
      >
        {value}
      </span>
      <span className={cn('text-small', tone === 'dark' ? 'text-brand-200' : 'text-ink-500')}>
        {label}
      </span>
    </div>
  );
}
