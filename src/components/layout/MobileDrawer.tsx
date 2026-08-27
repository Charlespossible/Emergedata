import { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { X, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/cn';
import { NAV, NAV_CTA } from '@/config/nav';
import { FEATURES } from '@/config/features';
import { SITE } from '@/config/site';
import { Logo } from '@/components/ui/Logo';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

type Props = { open: boolean; onClose: () => void };

export function MobileDrawer({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(open);
  useFocusTrap(panelRef, open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-brand-950/40"
        onClick={onClose}
        role="presentation"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="absolute inset-y-0 right-0 flex w-full max-w-sm animate-drawer-in flex-col overflow-y-auto bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
          <Link to="/" onClick={onClose}>
            <Logo />
            <span className="sr-only">home</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-500 transition duration-150 hover:bg-ink-100 hover:text-brand-900"
          >
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Site" className="flex-1 px-5 py-6">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) =>
              item.disabled && !FEATURES.blog ? (
                <li key={item.label}>
                  <span
                    aria-disabled="true"
                    tabIndex={-1}
                    className="flex min-h-[48px] cursor-not-allowed items-center gap-2 px-1 font-display text-h3 text-ink-400"
                  >
                    {item.label}
                    {item.badge ? (
                      <span className="rounded-full bg-accent-500/10 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-accent-600">
                        {item.badge}
                      </span>
                    ) : null}
                  </span>
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex min-h-[48px] items-center px-1 font-display text-h3 transition duration-150',
                        isActive ? 'text-brand-600' : 'text-brand-900 hover:text-brand-600',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                  {item.children?.length ? (
                    <ul className="mb-2 ml-1 flex flex-col border-l border-ink-200 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            to={child.href}
                            onClick={onClose}
                            className="flex min-h-[44px] items-center text-small text-ink-600 transition duration-150 hover:text-brand-600"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="border-t border-ink-200 px-5 py-6">
          <Link
            to={NAV_CTA.href}
            onClick={onClose}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-brand-600 px-6 font-medium text-white transition duration-150 hover:bg-brand-700"
          >
            {NAV_CTA.label}
          </Link>
          <div className="mt-5 flex flex-col gap-3 text-small">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-[44px] items-center gap-2 text-ink-600 hover:text-brand-600"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="inline-flex min-h-[44px] items-center gap-2 text-ink-600 hover:text-brand-600"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
