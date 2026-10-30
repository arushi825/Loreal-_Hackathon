import { useMemo, useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import type { IngredientFunction } from '@/types';
import { ALL_FUNCTIONS, FUNCTION_LABELS } from '@/data/taxonomy';
import { CONVENTIONAL_INGREDIENTS } from '@/data/conventional';
import { findAlternatives } from '@/lib/replacement';
import AlternativesTable from '@/components/alternatives/AlternativesTable';

interface AlternativesPageProps {
  onOpen: (id: string) => void;
}

export default function AlternativesPage({ onOpen }: AlternativesPageProps) {
  const [fn, setFn] = useState<IngredientFunction>('moisturizing');
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const candidates = useMemo(() => findAlternatives(fn), [fn]);
  const reference = CONVENTIONAL_INGREDIENTS.find((item) => item.id === referenceId) ?? null;

  const choose = (next: IngredientFunction, id: string | null) => {
    setFn(next);
    setReferenceId(id);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <header className="animate-fade-up max-w-3xl space-y-3">
        <p className="eyebrow">Ingredient Replacement</p>
        <h1 className="text-4xl font-semibold text-forest-900 sm:text-5xl">Compare bio-based alternatives</h1>
        <p className="text-base text-sand-900">
          Start from a conventional ingredient, or pick the function you need. Alternatives are ranked by evidence and sustainability.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-forest-900">1. Start from a conventional ingredient</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {CONVENTIONAL_INGREDIENTS.map((item) => {
            const selected = item.id === referenceId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => choose(item.function, item.id)}
                aria-pressed={selected}
                className={`card group flex flex-col gap-2 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lift ${
                  selected ? 'ring-2 ring-forest-600' : ''
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-olive-700">{FUNCTION_LABELS[item.function]}</span>
                <span className="font-semibold text-forest-900">{item.name}</span>
                <span className="text-sm text-sand-900">{item.note}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-forest-900">2. Or choose a function</h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Function">
          {ALL_FUNCTIONS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => choose(item, null)}
              aria-pressed={fn === item && !referenceId}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                fn === item ? 'bg-forest-700 text-white shadow-sm' : 'bg-white text-forest-800 ring-1 ring-inset ring-sand-300 hover:bg-sage-50'
              }`}
            >
              {FUNCTION_LABELS[item]}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-forest-900">
          {reference && (
            <>
              <span className="font-semibold">{reference.name}</span>
              <ArrowRight className="h-4 w-4 text-olive-700" aria-hidden />
            </>
          )}
          <span>
            Bio-based options for <span className="font-semibold">{FUNCTION_LABELS[fn]}</span>
          </span>
        </div>
        <AlternativesTable candidates={candidates} onOpen={onOpen} />
        <div className="flex items-start gap-3 rounded-2xl border border-olive-200 bg-olive-50 p-4 text-sm text-olive-900">
          <Info className="mt-0.5 h-4 w-4 flex-none" aria-hidden />
          <p>
            Ranking reflects evidence level and sustainability data only. It does not predict performance in your formula.
            Any substitution needs laboratory testing.
          </p>
        </div>
      </section>
    </div>
  );
}
