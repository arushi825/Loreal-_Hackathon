import { CheckCircle2, Plus, X } from 'lucide-react';
import { INGREDIENTS } from '@/data/ingredients';
import { MAX_COMBINATION_SIZE } from '@/lib/compatibility';
import CompatibilityMatrix from '@/components/lab/CompatibilityMatrix';
import LabInsights from '@/components/lab/LabInsights';

interface LabPageProps {
  labIds: string[];
  onToggleLab: (id: string) => void;
  onOpen: (id: string) => void;
}

export default function LabPage({ labIds, onToggleLab, onOpen }: LabPageProps) {
  const selected = labIds
    .map((id) => INGREDIENTS.find((ingredient) => ingredient.id === id))
    .filter((ingredient) => ingredient !== undefined);
  const full = selected.length >= MAX_COMBINATION_SIZE;

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <header className="animate-fade-up max-w-3xl space-y-3">
        <p className="eyebrow">Ingredient Combination Lab</p>
        <h1 className="text-4xl font-semibold text-forest-900 sm:text-5xl">Test how ingredients behave together</h1>
        <p className="text-base text-sand-900">
          Select two to {MAX_COMBINATION_SIZE} ingredients. See reference compatibility, pH overlap and what still needs lab work.
        </p>
      </header>

      <section className="card space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-forest-900">Your combination</h2>
          <span className="text-sm text-sand-900">
            {selected.length} of {MAX_COMBINATION_SIZE} selected
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {INGREDIENTS.map((ingredient) => {
            const active = labIds.includes(ingredient.id);
            const disabled = !active && full;
            return (
              <button
                key={ingredient.id}
                type="button"
                onClick={() => onToggleLab(ingredient.id)}
                disabled={disabled}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                  active ? 'bg-forest-700 text-white shadow-sm' : 'bg-sand-100 text-forest-800 hover:bg-sage-100'
                }`}
              >
                {active ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
                {ingredient.name}
              </button>
            );
          })}
        </div>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-sand-200 pt-4">
            {selected.map((ingredient) => (
              <span key={ingredient.id} className="inline-flex items-center gap-1 rounded-full bg-white py-1 pl-3 pr-1 text-sm text-forest-900 ring-1 ring-sand-300">
                <button type="button" onClick={() => onOpen(ingredient.id)} className="hover:underline">
                  {ingredient.name}
                </button>
                <button
                  type="button"
                  onClick={() => onToggleLab(ingredient.id)}
                  aria-label={`Remove ${ingredient.name}`}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-sand-800 hover:bg-sand-100"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              </span>
            ))}
          </div>
        )}
      </section>

      {selected.length < 2 ? (
        <div className="card px-6 py-16 text-center">
          <p className="font-display text-2xl text-forest-900">Select at least two ingredients</p>
          <p className="mt-2 text-sm text-sand-900">Results for pairs, pH overlap and lab flags will appear here.</p>
        </div>
      ) : (
        <section className="animate-fade-up space-y-6">
          <LabInsights ingredients={selected} />
          <CompatibilityMatrix ingredients={selected} />
        </section>
      )}
    </div>
  );
}
