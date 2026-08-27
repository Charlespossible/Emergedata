import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { NAV, type NavItem } from '@/config/nav';
import { FEATURES } from '@/config/features';

type Props = { solid: boolean };

/** Desktop navigation. The Blog item is a non-interactive span while FEATURES.blog is false. */
export function Nav({ solid }: Props) {
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {NAV.map((item) => (
          <li key={item.label}>
            <NavItemView item={item} solid={solid} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function NavItemView({ item, solid }: { item: NavItem; solid: boolean }) {
  const base =
    'relative inline-flex min-h-[44px] items-center gap-1.5 rounded-md px-3 text-small font-medium transition duration-150';
  const idle = solid ? 'text-ink-600 hover:text-brand-700' : 'text-brand-100 hover:text-white';

  if (item.disabled && !FEATURES.blog) {
    return (
      <span
        aria-disabled="true"
        tabIndex={-1}
        title="Our blog is coming soon."
        className={cn(base, 'cursor-not-allowed', solid ? 'text-ink-400' : 'text-brand-300/70')}
      >
        {item.label}
        {item.badge ? (
          <span className="rounded-full bg-accent-500/10 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-accent-600">
            {item.badge}
          </span>
        ) : null}
      </span>
    );
  }

  if (item.children?.length) {
    return <NavDropdown item={item} base={base} idle={idle} solid={solid} />;
  }

  return (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      className={({ isActive }) =>
        cn(base, isActive ? (solid ? 'text-brand-700' : 'text-white') : idle)
      }
    >
      {({ isActive }) => (
        <>
          {item.label}
          {isActive ? (
            <span
              aria-hidden="true"
              className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-accent-500"
            />
          ) : null}
        </>
      )}
    </NavLink>
  );
}

function NavDropdown({
  item,
  base,
  idle,
  solid,
}: {
  item: NavItem;
  base: string;
  idle: string;
  solid: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isActive = location.pathname === item.href;

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={item.href}
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(false)}
        className={cn(base, isActive ? (solid ? 'text-brand-700' : 'text-white') : idle)}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn('h-3.5 w-3.5 transition-transform duration-150', open && 'rotate-180')}
        />
        {isActive ? (
          <span
            aria-hidden="true"
            className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-accent-500"
          />
        ) : null}
      </Link>

      <div
        className={cn(
          'absolute left-0 top-full z-40 w-72 pt-2 transition duration-150',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <ul className="rounded-xl bg-white p-2 shadow-lg ring-1 ring-ink-200">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                to={child.href}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-small text-ink-600 transition duration-150 hover:bg-brand-50 hover:text-brand-700"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
