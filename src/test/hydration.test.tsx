import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import App from '@/App';
import { render as renderServer } from '@/entry-server';
import { ROUTE_PATHS } from '@/routes.shared';

/**
 * Hydration has to succeed against the pre-rendered HTML. If it fails, React discards the
 * whole pre-rendered DOM and re-renders from scratch — losing exactly the first-paint win
 * the pre-render was added for, and logging an error that costs a Lighthouse point.
 *
 * React reports this through `onRecoverableError`, which is a far more reliable signal
 * than diffing two HTML strings produced by two different serialisers.
 */
function hydrationErrors(path: string): string[] {
  const { html } = renderServer(path);

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.appendChild(host);

  const errors: string[] = [];
  let root: ReturnType<typeof hydrateRoot>;

  act(() => {
    root = hydrateRoot(
      host,
      <StrictMode>
        <HelmetProvider>
          <MemoryRouter initialEntries={[path]}>
            <App />
          </MemoryRouter>
        </HelmetProvider>
      </StrictMode>,
      { onRecoverableError: (error) => errors.push(String(error)) },
    );
  });

  act(() => root.unmount());
  host.remove();
  return errors;
}

describe('hydration', () => {
  beforeAll(() => {
    HelmetProvider.canUseDOM = false;
  });
  afterAll(() => {
    HelmetProvider.canUseDOM = true;
  });

  it('hydrates every pre-rendered route without a mismatch', () => {
    for (const path of Object.values(ROUTE_PATHS)) {
      expect(hydrationErrors(path), `hydration mismatch on ${path}`).toEqual([]);
    }
  });

  it('hydrates the pre-rendered 404 page without a mismatch', () => {
    expect(hydrationErrors('/404')).toEqual([]);
  });
});
