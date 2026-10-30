import { CalendarDays, FlaskConical, Droplets, ShieldAlert } from 'lucide-react';
import type { FormulationDraft } from '@/lib/formulation';
import type { SkinType } from '@/types';
import { FUNCTION_LABELS, SEASON_LABELS, SOURCE_LABELS } from '@/data/taxonomy';
import Badge from '@/components/ui/Badge';
import { EvidenceBadge, SuitabilityPill } from '@/components/ui/StatusBadges';

interface FormulationResultProps {
  draft: FormulationDraft;
  skin: SkinType | null;
  onOpen: (id: string) => void;
}

export default function FormulationResult({ draft, skin, onOpen }: FormulationResultProps) {
  const { phWindow, seasonGuide } = draft;

  return (
    <div className="space-y-6">
      <div className="card overflow-hidden">
        <div className="border-b border-sand-200 bg-sand-50 px-5 py-4">
          <h2 className="text-lg font-semibold text-forest-900">Draft structure</h2>
          <p className="text-xs text-sand-800">Structured suggestion for laboratory planning. Amounts are not set here.</p>
        </div>
        <ul className="divide-y divide-sand-200">
          {draft.rows.map((row) => (
            <li key={row.benefit} className="space-y-3 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-olive-700">{FUNCTION_LABELS[row.benefit]}</span>
                {row.primary ? <EvidenceBadge level={row.primary.evidence.level} /> : null}
              </div>
              {row.primary ? (
                <button type="button" onClick={() => onOpen(row.primary!.id)} className="block text-left">
                  <span className="font-display text-xl font-semibold text-forest-900 hover:underline">{row.primary.name}</span>
                  <span className="mt-1 block text-sm text-sand-900">
                    {SOURCE_LABELS[row.primary.source]} | {row.primary.sustainability.renewable ? 'Renewable' : 'Renewable not verified'}
                  </span>
                </button>
              ) : (
                <p className="text-sm text-terracotta-800">No bio-based option in the sample set for this benefit in this category.</p>
              )}
              {row.primary && skin && <SuitabilityPill value={row.primary.skinFit[skin]} />}
              {row.alternatives.length > 0 && (
                <p className="text-sm text-sand-900">
                  Alternatives:{' '}
                  {row.alternatives.map((alt, index) => (
                    <span key={alt.id}>
                      <button type="button" onClick={() => onOpen(alt.id)} className="font-medium text-forest-700 hover:underline">
                        {alt.name}
                      </button>
                      {index < row.alternatives.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="card space-y-3 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-forest-900">
            <Droplets className="h-4 w-4 text-olive-700" aria-hidden />
            Working pH
          </h3>
          {phWindow.status === 'shared' ? (
            <p className="text-sm text-forest-900">Shared window pH {phWindow.min} to {phWindow.max} across the selected primaries.</p>
          ) : phWindow.status === 'none' ? (
            <p className="text-sm text-terracotta-800">No shared window. A pH adjustment strategy or a different primary is needed.</p>
          ) : (
            <p className="text-sm text-sand-900">No verified pH data among the selected primaries. Measure in the lab.</p>
          )}
        </div>

        <div className="card space-y-3 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-forest-900">
            <CalendarDays className="h-4 w-4 text-olive-700" aria-hidden />
            {SEASON_LABELS[seasonGuide.season]} guidance
          </h3>
          <p className="text-sm text-sand-900">{seasonGuide.summary}</p>
          <ul className="space-y-1.5 text-sm text-forest-900">
            {seasonGuide.considerations.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-sage-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
        <h3 className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="h-4 w-4" aria-hidden />
          Validation required before any use
        </h3>
        <p className="mt-1 text-sm">
          Stability, preservative challenge testing, colour, pH drift and patch testing are all needed. No usage frequency or
          limit is provided here.
        </p>
        {draft.needsValidation.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {draft.needsValidation.map((item) => (
              <Badge key={item.id} tone="amber" icon={<FlaskConical className="h-3.5 w-3.5" aria-hidden />}>
                {item.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
