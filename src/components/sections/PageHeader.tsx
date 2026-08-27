import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Props = { eyebrow: string; title: string; lead?: string };

/** Shared opening band for every inner page. */
export function PageHeader({ eyebrow, title, lead }: Props) {
  return (
    <section className="border-b border-ink-200 bg-ink-50 pb-14 pt-32 sm:pb-16 lg:pb-20 lg:pt-40">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-h1 text-brand-900">{title}</h1>
        {lead ? <p className="mt-5 max-w-prose text-lead text-ink-600">{lead}</p> : null}
      </Container>
    </section>
  );
}
