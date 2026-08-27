import { SITE } from '@/config/site';
import type { ContactValues } from './validation';

export type SubmitResult = { ok: true; mode: 'endpoint' | 'mailto' } | { ok: false; error: string };

/**
 * Phase 1 has no backend. Set VITE_CONTACT_ENDPOINT to a Formspree or Web3Forms URL
 * and submissions POST there. With no endpoint configured we fall back to composing a
 * message in the visitor's own mail client, which always works.
 *
 * Phase 5 replaces the body of this function with a call to the real API. Nothing else
 * in the app knows how a message is delivered.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export const hasContactEndpoint = Boolean(ENDPOINT);

export async function submitContact(values: ContactValues): Promise<SubmitResult> {
  // Honeypot: a bot filled the hidden field. Report success, deliver nothing.
  if (values.website) return { ok: true, mode: 'endpoint' };

  if (!ENDPOINT) return submitViaMailto(values);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        organisation: values.organisation || '—',
        interest: values.interest || '—',
        message: values.message,
        _subject: `Website enquiry from ${values.name}`,
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: 'We could not send your message. Please try again, or email us directly.',
      };
    }
    return { ok: true, mode: 'endpoint' };
  } catch {
    return {
      ok: false,
      error: 'We could not reach the network. Please try again, or email us directly.',
    };
  }
}

function submitViaMailto(values: ContactValues): SubmitResult {
  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.organisation ? `Organisation: ${values.organisation}` : null,
    values.interest ? `Area of interest: ${values.interest}` : null,
    '',
    values.message,
  ].filter(Boolean);

  const href =
    `mailto:${SITE.email}` +
    `?subject=${encodeURIComponent(`Website enquiry from ${values.name}`)}` +
    `&body=${encodeURIComponent(lines.join('\n'))}`;

  window.location.href = href;
  return { ok: true, mode: 'mailto' };
}
