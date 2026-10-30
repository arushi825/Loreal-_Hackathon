import type { Ingredient } from '@/types';
import { FUNCTION_LABELS, SOURCE_LABELS, EVIDENCE_LABELS } from '@/data/taxonomy';
import { EvidenceBadge } from '@/components/ui/StatusBadges';
import Badge from '@/components/ui/Badge';

interface AlternativesTableProps {
  candidates: Ingredient[];
  onOpen: (id: string) => void;
}

export default function AlternativesTable({ candidates, onOpen }: AlternativesTableProps) {
  if (candidates.length === 0) {
    return <p className="card p-6 text-sm text-sand-900">No bio-based ingredients in the sample set cover this function yet.</p>;
  }

  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-sand-50 text-xs uppercase tracking-wide text-olive-800">
          <tr>
            <th className="px-5 py-4 font-semibold">Ingredient</th>
            <th className="px-5 py-4 font-semibold">Source</th>
            <th className="px-5 py-4 font-semibold">Working pH</th>
            <th className="px-5 py-4 font-semibold">Sustainability</th>
            <th className="px-5 py-4 font-semibold">Evidence</th>
            <th className="px-5 py-4" />
          </tr>
        </thead>
        <tbody className="divide-y divide-sand-200">
          {candidates.map((ingredient) => (
            <tr key={ingredient.id} className="transition hover:bg-sage-50/60">
              <td className="px-5 py-4">
                <p className="font-semibold text-forest-900">{ingredient.name}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {ingredient.functions.map((fn) => (
                    <Badge key={fn} tone="sage">{FUNCTION_LABELS[fn]}</Badge>
                  ))}
                </div>
              </td>
              <td className="px-5 py-4 text-sand-900">{SOURCE_LABELS[ingredient.source]}</td>
              <td className="px-5 py-4 text-sand-900">
                {ingredient.ph ? `${ingredient.ph.min} to ${ingredient.ph.max}` : 'Not verified'}
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-col items-start gap-1.5">
                  <Badge tone={ingredient.sustainability.renewable ? 'mint' : 'neutral'}>
                    {ingredient.sustainability.renewable ? 'Renewable' : 'Not verified'}
                  </Badge>
                  {ingredient.sustainability.valorization && <Badge tone="olive">By-product</Badge>}
                </div>
              </td>
              <td className="px-5 py-4">
                <EvidenceBadge level={ingredient.evidence.level} />
                <span className="sr-only">{EVIDENCE_LABELS[ingredient.evidence.level]}</span>
              </td>
              <td className="px-5 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onOpen(ingredient.id)}
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-forest-700 transition hover:bg-forest-50"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
