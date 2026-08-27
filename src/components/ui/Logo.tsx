import { cn } from '@/lib/cn';

/**
 * The Emerge Data mark, redrawn as vector from the raster logo embedded in the company
 * profile: charcoal top arc, red left arc, navy bottom arc, bar chart at the centre.
 *
 * TODO — CLIENT INPUT REQUIRED (plan §9.7): replace with the official vector logo when
 * supplied. Every other use of the mark points at this component.
 */
export function LogoMark({
  className,
  onDeep = false,
  /** Set false when a visible wordmark sits alongside, so the name is not announced twice. */
  labelled = true,
}: {
  className?: string;
  onDeep?: boolean;
  labelled?: boolean;
}) {
  const arcTop = onDeep ? '#DCE7F5' : '#3F3A38';
  const arcLeft = '#DC2626';
  const arcBottom = onDeep ? '#5B85C4' : '#1F4E88';

  return (
    <svg
      viewBox="0 0 120 120"
      className={cn('shrink-0', className)}
      focusable="false"
      {...(labelled ? { role: 'img', 'aria-label': 'Emerge Data' } : { 'aria-hidden': true })}
    >
      <g fill="none" strokeWidth="13" strokeLinecap="butt">
        <path d="M32 24A44 44 0 0 1 104 46" stroke={arcTop} />
        <path d="M24 88A44 44 0 0 1 24 32" stroke={arcLeft} />
        <path d="M104 74A44 44 0 0 1 32 96" stroke={arcBottom} />
      </g>
      <circle cx="60" cy="60" r="27" fill="none" stroke={arcTop} strokeWidth="2.5" opacity="0.35" />
      <g>
        <rect x="45" y="62" width="6" height="14" rx="1.5" fill="#1F4E88" />
        <rect x="54" y="54" width="6" height="22" rx="1.5" fill="#16A34A" />
        <rect x="63" y="47" width="6" height="29" rx="1.5" fill="#F59E0B" />
        <rect x="72" y="58" width="6" height="18" rx="1.5" fill="#DC2626" />
      </g>
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** White wordmark for use on the deep brand bands. */
  onDeep?: boolean;
  /** Hide the wordmark and show the mark alone. */
  markOnly?: boolean;
};

export function Logo({ className, onDeep = false, markOnly = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="h-9 w-9" onDeep={onDeep} labelled={markOnly} />
      {markOnly ? null : (
        <span
          className={cn(
            'font-display text-[1.35rem] font-semibold leading-none tracking-tight',
            onDeep ? 'text-white' : 'text-brand-900',
          )}
        >
          Emerge<span className={onDeep ? 'text-brand-300' : 'text-brand-500'}> Data</span>
        </span>
      )}
    </span>
  );
}
