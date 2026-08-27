import { Mail, Phone } from 'lucide-react';
import { BrandMotif } from '@/components/ui/BrandMotif';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

type Props = {
  headline: string;
  body: string;
  cta: { label: string; href: string };
  email: string;
  phone: string;
  phoneHref: string;
};

export function CTABand({ headline, body, cta, email, phone, phoneHref }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-800 to-brand-900 py-20 lg:py-28">
      <BrandMotif className="-bottom-40 -left-32 h-[36rem] w-[36rem] text-white/[0.04]" />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-h1 text-white">{headline}</h2>
            <p className="mx-auto mt-6 max-w-prose text-lead text-brand-100">{body}</p>
            <div className="mt-10 flex justify-center">
              {/* The one accent CTA permitted per page. */}
              <Button to={cta.href} variant="accent" size="lg">
                {cta.label}
              </Button>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 text-small text-brand-200 sm:flex-row sm:gap-8">
              <a
                href={`mailto:${email}`}
                className="inline-flex min-h-[44px] items-center gap-2 transition duration-150 hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {email}
              </a>
              <a
                href={`tel:${phoneHref}`}
                className="inline-flex min-h-[44px] items-center gap-2 transition duration-150 hover:text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {phone}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
