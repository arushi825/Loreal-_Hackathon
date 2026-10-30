import type { Ingredient, IngredientFunction } from '@/types';
import { INGREDIENTS } from '@/data/ingredients';
import { evidenceScore, sustainabilityScore } from '@/lib/scoring';

export function findAlternatives(fn: IngredientFunction): Ingredient[] {
  return INGREDIENTS.filter((ingredient) => ingredient.functions.includes(fn)).sort(
    (a, b) =>
      evidenceScore(b.evidence.level) + sustainabilityScore(b) - (evidenceScore(a.evidence.level) + sustainabilityScore(a)),
  );
}
