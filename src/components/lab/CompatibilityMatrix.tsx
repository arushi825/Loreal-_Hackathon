import type { CompatibilityStatus, Ingredient } from '@/types';
import { COMPATIBILITY_LABELS } from '@/data/taxonomy';
import { analyseCombination, type PairAnalysis } from '@/lib/compatibility';
import Badge, { type BadgeTone } from '@/components/ui/Badge';

const STATUS_TONE: Record<CompatibilityStatus, BadgeTone> = {
  compatible: 'mint',
  caution: 'amber',
  incompatible: 'red',
  untested: 'neutral',
};

const STATUS_CELL: Record<CompatibilityStatus, string> = {
  compatible: 'bg-mint-100 text-mint-900',
  caution: 'bg-amber-100 text-amber-900',
  incompatible: 'bg-terracotta-100 text-terracotta-900',
  untested: 'bg-sand-100 text-sand-900',
};

const STATUS_SYMBOL: Record<CompatibilityStatus, string> = {
  compatible: 'Ok',
  caution: '!',
  incompatible: 'X',
  untested: '?',
};

interface CompatibilityMatrixProps {
  ingredients: Ingredient[];
}

export default function CompatibilityMatrix({ ingredients }: CompatibilityMatrixProps) {
  const pairs = analyseCombination(ingredients);
  const find = (a: Ingredient, b: Ingredient): PairAnalysis | undefined =>
    pairs.find((pair) => (pair.a.id === a.id && pair.b.id === b.id) || (pair.a.id === b.id && pair.b.id === a.id));

  return (
    <div className="space-y-5">
      <div className="card overflow-x-auto p-4 sm:p-6">
        <table className="w-full min-w-[480px] border-separate border-spacing-1.5 text-sm">
          <thead>
            <tr>
              <th className="p-2" />
              {ingredients.map((ingredient) => (
                <th key={ingredient.id} className="p-2 text-left align-bottom font-semibold text-forest-900">
                  <span className="block max-w-[120px] truncate">{ingredient.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ingredients.map((rowIngredient) => (
              <tr key={rowIngredient.id}>
                <th className="max-w-[160px] truncate p-2 text-left font-semibold text-forest-900">{rowIngredient.name}</th>
                {ingredients.map((colIngredient) => {
                  if (rowIngredient.id === colIngredient.id) {
                    return (
                      <td key={colIngredient.id} className="rounded-xl bg-forest-900 p-3 text-center text-white/70">
                        -
                      </td>
                    );
                  }
                  const pair = find(rowIngredient, colIngredient);
                  const status: CompatibilityStatus = pair?.status ?? 'untested';
                  return (
                    <td
                      key={colIngredient.id}
                      title={COMPATIBILITY_LABELS[status]}
                      className={`rounded-xl p-3 text-center text-xs font-bold transition hover:scale-[1.03] ${STATUS_CELL[status]}`}
                    >
                      <span aria-label={COMPATIBILITY_LABELS[status]}>{STATUS_SYMBOL[status]}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(COMPATIBILITY_LABELS) as CompatibilityStatus[]).map((status) => (
            <Badge key={status} tone={STATUS_TONE[status]}>
              {STATUS_SYMBOL[status]} {COMPATIBILITY_LABELS[status]}
            </Badge>
          ))}
        </div>
      </div>

      <ul className="grid gap-3 md:grid-cols-2">
        {pairs.map((pair) => (
          <li key={`${pair.a.id}-${pair.b.id}`} className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-forest-900">
                {pair.a.name} + {pair.b.name}
              </p>
              <Badge tone={STATUS_TONE[pair.status]}>{COMPATIBILITY_LABELS[pair.status]}</Badge>
            </div>
            <p className="mt-2 text-sm text-sand-900">{pair.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
