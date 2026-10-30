import type { Ingredient, IngredientFunction, ProductCategory, SkinType, SourceKind } from '@/types';
import { FUNCTION_LABELS, SOURCE_LABELS } from '@/data/taxonomy';

export interface IngredientFilters {
  query: string;
  source: SourceKind | 'all';
  fn: IngredientFunction | 'all';
  skin: SkinType | 'all';
  category: ProductCategory | 'all';
}

export const EMPTY_FILTERS: IngredientFilters = {
  query: '',
  source: 'all',
  fn: 'all',
  skin: 'all',
  category: 'all',
};

function matchesQuery(ingredient: Ingredient, query: string): boolean {
  if (!query) return true;
  const haystack = [
    ingredient.name,
    ingredient.inci,
    ingredient.sourceDetail,
    ingredient.summary,
    SOURCE_LABELS[ingredient.source],
    ...ingredient.functions.map((fn) => FUNCTION_LABELS[fn]),
  ]
    .join(' ')
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function filterIngredients(list: Ingredient[], filters: IngredientFilters): Ingredient[] {
  return list.filter((ingredient) => {
    if (!matchesQuery(ingredient, filters.query.trim())) return false;
    if (filters.source !== 'all' && ingredient.source !== filters.source) return false;
    if (filters.fn !== 'all' && !ingredient.functions.includes(filters.fn)) return false;
    if (filters.category !== 'all' && !ingredient.categories.includes(filters.category)) return false;
    if (filters.skin !== 'all') {
      const fit = ingredient.skinFit[filters.skin];
      if (fit !== 'good' && fit !== 'moderate') return false;
    }
    return true;
  });
}
