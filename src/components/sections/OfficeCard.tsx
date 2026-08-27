import { MapPin, Phone } from 'lucide-react';
import type { Office } from '@/content/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export function OfficeCard({ office }: { office: Office }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <h3 className="text-h3 text-brand-900">{office.state}</h3>
        {office.isHq ? <Badge variant="brand">Headquarters</Badge> : null}
      </div>
      <address className="mt-4 flex flex-col gap-3 text-small not-italic text-ink-600">
        <span className="flex gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
          <span>{office.address}</span>
        </span>
        {office.phone ? (
          <a
            href={`tel:${office.phone.replace(/\s+/g, '')}`}
            className="flex min-h-[44px] items-center gap-3 text-brand-600 transition duration-150 hover:text-brand-700"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            {office.phone}
          </a>
        ) : null}
      </address>
    </Card>
  );
}
