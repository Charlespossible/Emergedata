import { cn } from '@/lib/cn';

/**
 * The logo's concentric data arcs, at very low opacity, as a section background.
 * Used wherever photography is missing — never a stock office photo.
 */
export function BrandMotif({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 600 600"
      className={cn('pointer-events-none absolute select-none', className)}
    >
      <g fill="none" strokeLinecap="round">
        <circle cx="300" cy="300" r="250" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path
          d="M300 60a240 240 0 0 1 208 120"
          stroke="currentColor"
          strokeWidth="26"
          opacity="0.9"
        />
        <path
          d="M92 420A240 240 0 0 1 92 180"
          stroke="currentColor"
          strokeWidth="26"
          opacity="0.9"
        />
        <path
          d="M508 420A240 240 0 0 1 300 540"
          stroke="currentColor"
          strokeWidth="26"
          opacity="0.9"
        />
        <circle cx="300" cy="300" r="150" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </g>
      <g fill="currentColor" opacity="0.9">
        <rect x="246" y="316" width="20" height="46" rx="3" />
        <rect x="278" y="288" width="20" height="74" rx="3" />
        <rect x="310" y="258" width="20" height="104" rx="3" />
        <rect x="342" y="300" width="20" height="62" rx="3" />
      </g>
    </svg>
  );
}
