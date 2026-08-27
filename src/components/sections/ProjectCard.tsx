import type { Engagement } from '@/content/types';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { focusColor, type FocusColorName } from '@/components/ui/focusColor';
import { cn } from '@/lib/cn';

const groupLabels: Record<Engagement['group'], { label: string; color: FocusColorName }> = {
  health: { label: 'Health', color: 'brand' },
  environment: { label: 'Environment', color: 'green' },
  'markets-bd': { label: 'Markets & Business Development', color: 'teal' },
};

export function ProjectCard({ engagement }: { engagement: Engagement }) {
  const group = groupLabels[engagement.group];

  return (
    <Card as="article" interactive className="flex h-full flex-col">
      <span
        aria-hidden="true"
        className={cn('h-1 w-10 rounded-full', focusColor[group.color].rule)}
      />
      <h3 className="mt-5 text-h3 text-brand-900">{engagement.title}</h3>

      {engagement.description ? (
        <p className="mt-3 text-small text-ink-600">{engagement.description}</p>
      ) : null}

      <dl className="mt-5 flex flex-1 flex-col gap-3 text-small">
        {engagement.partner ? (
          <div>
            <dt className="font-medium text-ink-700">Partner</dt>
            <dd className="text-ink-600">{engagement.partner}</dd>
          </div>
        ) : null}
        {engagement.locations?.length ? (
          <div>
            <dt className="font-medium text-ink-700">Geography</dt>
            <dd className="text-ink-600">{engagement.locations.join(', ')}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-ink-200 pt-5">
        <Tag color={group.color}>{group.label}</Tag>
      </div>
    </Card>
  );
}
