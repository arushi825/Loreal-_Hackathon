import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { IngredientFunction, ProductCategory, SkinType, SourceKind } from '@/types';
import type { IngredientFilters } from '@/lib/filtering';
import { ALL_CATEGORIES, ALL_FUNCTIONS, ALL_SKIN_TYPES, ALL_SOURCES, CATEGORY_LABELS, FUNCTION_LABELS, SKIN_LABELS, SOURCE_LABELS } from '@/data/taxonomy';

interface FilterBarProps {
  filters: IngredientFilters;
  onChange: (next: IngredientFilters) => void;
  resultCount: number;
}

const selectClass = 'field py-2 pr-9';

export default function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  const update = <K extends keyof IngredientFilters>(key: K, value: IngredientFilters[K]) =>
    onChange({ ...filters, [key]: value });

  const active = filters.query || filters.source !== 'all' || filters.fn !== 'all' || filters.skin !== 'all' || filters.category !== 'all';

  return (
    <div className="card space-y-4 p-4 sm:p-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-800" aria-hidden />
        <input
          type="search"
          value={filters.query}
          onChange={(event) => update('query', event.target.value)}
          placeholder="Search by name, source, or function (e.g. humectant, algae, thickener)"
          className="field py-3 pl-11"
          aria-label="Search ingredients"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-1">
          <span className="text-xs font-medium text-sand-900">Source</span>
          <select className={selectClass} value={filters.source} onChange={(e) => update('source', e.target.value as SourceKind | 'all')}>
            <option value="all">All sources</option>
            {ALL_SOURCES.map((source) => (
              <option key={source} value={source}>{SOURCE_LABELS[source]}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-sand-900">Function</span>
          <select className={selectClass} value={filters.fn} onChange={(e) => update('fn', e.target.value as IngredientFunction | 'all')}>
            <option value="all">All functions</option>
            {ALL_FUNCTIONS.map((fn) => (
              <option key={fn} value={fn}>{FUNCTION_LABELS[fn]}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-sand-900">Product category</span>
          <select className={selectClass} value={filters.category} onChange={(e) => update('category', e.target.value as ProductCategory | 'all')}>
            <option value="all">All categories</option>
            {ALL_CATEGORIES.map((category) => (
              <option key={category} value={category}>{CATEGORY_LABELS[category]}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-sand-900">Skin type (good or moderate fit)</span>
          <select className={selectClass} value={filters.skin} onChange={(e) => update('skin', e.target.value as SkinType | 'all')}>
            <option value="all">Any skin type</option>
            {ALL_SKIN_TYPES.map((skin) => (
              <option key={skin} value={skin}>{SKIN_LABELS[skin]}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <p className="flex items-center gap-2 text-sm text-sand-900">
          <SlidersHorizontal className="h-4 w-4 text-olive-700" aria-hidden />
          Showing <span className="font-semibold text-forest-900">{resultCount}</span> ingredients
        </p>
        {active && (
          <button
            type="button"
            onClick={() => onChange({ query: '', source: 'all', fn: 'all', skin: 'all', category: 'all' })}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-forest-700 transition hover:bg-forest-50"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
