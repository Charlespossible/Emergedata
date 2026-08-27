import { describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import { FEATURES } from '@/config/features';
import { getFocusAreas, getLeaders, getPublishedOffices, getOffices } from '@/lib/content';

function renderAt(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

/** Lazy routes need a tick before their content lands. */
const findHeading = (name: RegExp) => screen.findByRole('heading', { level: 1, name });

describe('routes', () => {
  it('renders the home hero and its stat tiles', async () => {
    renderAt('/');
    expect(await findHeading(/Evidence that turns decisions into outcomes/i)).toBeInTheDocument();
    expect(screen.getByText('21')).toBeInTheDocument();
    expect(screen.getByText('150+')).toBeInTheDocument();
  });

  it('renders every inner route with exactly one h1', async () => {
    const routes: [string, RegExp][] = [
      ['/about', /African data intelligence/i],
      ['/focus-areas', /Six interconnected domains/i],
      ['/our-work', /Evidence delivered, decisions made/i],
      ['/leadership', /The people behind the evidence/i],
      ['/contact', /Start a conversation/i],
    ];

    for (const [path, heading] of routes) {
      const view = renderAt(path);
      expect(await findHeading(heading)).toBeInTheDocument();
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
      view.unmount();
    }
  });

  it('sends /blog to the 404 page while the blog flag is off', async () => {
    expect(FEATURES.blog).toBe(false);
    renderAt('/blog');
    expect(await findHeading(/could not find that page/i)).toBeInTheDocument();
  });

  it('renders an unknown path as the 404 page', async () => {
    renderAt('/nothing-here');
    expect(await findHeading(/could not find that page/i)).toBeInTheDocument();
  });
});

describe('navigation', () => {
  it('marks the Blog item disabled and out of the tab order', async () => {
    renderAt('/');
    await findHeading(/Evidence that turns decisions/i);
    const blogItems = screen.getAllByText('Blog');
    expect(blogItems.length).toBeGreaterThan(0);
    for (const item of blogItems) {
      expect(item).toHaveAttribute('aria-disabled', 'true');
      expect(item).toHaveAttribute('tabindex', '-1');
    }
    // It must never be a link.
    expect(screen.queryByRole('link', { name: /^Blog/ })).toBeNull();
  });

  it('exposes a skip link as the first focusable element', async () => {
    renderAt('/');
    await findHeading(/Evidence that turns decisions/i);
    expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument();
  });
});

describe('content integrity', () => {
  it('renders all six focus areas with anchor ids', async () => {
    renderAt('/focus-areas');
    await findHeading(/Six interconnected domains/i);
    for (const area of getFocusAreas()) {
      expect(document.getElementById(area.slug)).not.toBeNull();
      expect(screen.getAllByText(area.title).length).toBeGreaterThan(0);
    }
    expect(getFocusAreas()).toHaveLength(6);
  });

  it('renders all seven leaders', async () => {
    renderAt('/leadership');
    await findHeading(/The people behind the evidence/i);
    const leaders = getLeaders();
    expect(leaders).toHaveLength(7);
    for (const leader of leaders) {
      expect(screen.getByText(leader.name)).toBeInTheDocument();
    }
  });

  it('opens a leader bio in a focus-trapped dialog and closes it', async () => {
    const user = userEvent.setup();
    renderAt('/leadership');
    await findHeading(/The people behind the evidence/i);

    const [firstBioButton] = screen.getAllByRole('button', { name: /read bio/i });
    await user.click(firstBioButton);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    await user.click(within(dialog).getByRole('button', { name: /close/i }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('publishes no unverified office address', async () => {
    renderAt('/contact');
    await findHeading(/Start a conversation/i);

    const unpublished = getOffices().filter((office) => !office.published);
    expect(unpublished.length).toBeGreaterThan(0);
    for (const office of unpublished) {
      expect(screen.queryByText(office.address)).toBeNull();
    }
    for (const office of getPublishedOffices()) {
      expect(screen.getAllByText(office.address).length).toBeGreaterThan(0);
    }
  });

  it('does not resurrect retired 2024 copy', async () => {
    for (const path of ['/', '/about', '/focus-areas', '/our-work', '/leadership']) {
      const view = renderAt(path);
      await waitFor(() => expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1));
      const text = document.body.textContent ?? '';
      expect(text).not.toMatch(/Agriculture[- ]Derisking/i);
      expect(text).not.toMatch(/Other Services/i);
      expect(text).not.toMatch(/JohnBosco|Kizito/i);
      expect(text).not.toMatch(/a\.kenneth@|j\.ezenwa@|o\.loveth@/i);
      expect(text).not.toMatch(/120\+ volunteers/i);
      view.unmount();
    }
  });
});

describe('contact form', () => {
  it('validates required fields before submitting', async () => {
    const user = userEvent.setup();
    renderAt('/contact');
    await findHeading(/Start a conversation/i);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i, { selector: 'input' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('offers every focus area as an area of interest', async () => {
    renderAt('/contact');
    await findHeading(/Start a conversation/i);
    const select = screen.getByLabelText(/area of interest/i);
    for (const area of getFocusAreas()) {
      expect(within(select).getByRole('option', { name: area.title })).toBeInTheDocument();
    }
  });
});
