import { useMemo, useState } from 'react';
import { Info } from 'lucide-react';
import { INGREDIENTS } from '@/data/ingredients';
import { EMPTY_FILTERS, filterIngredients, type IngredientFilters } from '@/lib/filtering';
import { MAX_COMBINATION_SIZE } from '@/lib/compatibility';
import FilterBar from '@/components/database/FilterBar';
import IngredientCard from '@/components/ingredients/IngredientCard';

interface DatabasePageProps {
  labIds: string[];
  onToggleLab: (id: string) => void;
  onOpen: (id: string) => void;
}

export default function DatabasePage({ labIds, onToggleLab, onOpen }: DatabasePageProps) {
  const [filters, setFilters] = useState<IngredientFilters>(EMPTY_FILTERS);
  const results = useMemo(() => filterIngredients(INGREDIENTS, filters), [filters]);
  const labFull = labIds.length >= MAX_COMBINATION_SIZE;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="animate-fade-up max-w-3xl space-y-3">
        <p className="eyebrow">Bio-Chemical Database</p>
        <h1 className="text-4xl font-semibold text-forest-900 sm:text-5xl">Explore bio-based ingredients</h1>
        <p className="text-base text-sand-900">
          Search plant, algae, fermentation and agri-waste ingredients. Every card shows how much evidence sits behind it.
        </p>
      </header>

      <div className="flex items-start gap-3 rounded-2xl border border-olive-200 bg-olive-50 p-4 text-sm text-olive-900">
        <Info className="mt-0.5 h-4 w-4 flex-none" aria-hidden />
        <p>
          Prototype sample data, summarised from general industry knowledge and not checked against primary literature.
          Entries marked &ldquo;Limited&rdquo; or &ldquo;Not verified&rdquo; need laboratory validation.
        </p>
      </div>

      <FilterBar filters={filters} onChange={setFilters} resultCount={results.length} />

      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((ingredient) => (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              onOpen={onOpen}
              inLab={labIds.includes(ingredient.id)}
              labFull={labFull}
              onToggleLab={onToggleLab}
            />
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center gap-2 px-6 py-16 text-center">
          <p className="font-display text-2xl text-forest-900">No ingredients match these filters</p>
          <p className="text-sm text-sand-900">Try a broader search term or clear a filter.</p>
        </div>
      )}
    </div>
  );
}
