import type { Ingredient, IngredientFunction, ProductCategory, Season, SeasonGuide, SkinType } from '@/types';
import { INGREDIENTS } from '@/data/ingredients';
import { SEASON_GUIDES } from '@/data/seasons';
import { evidenceScore, sustainabilityScore } from '@/lib/scoring';
import { getPhWindow, type PhWindow } from '@/lib/compatibility';

export interface FormulationInput {
  category: ProductCategory;
  benefits: IngredientFunction[];
  climate: Season;
  skin: SkinType | null;
  preferAgriWaste: boolean;
  avoidColourants: boolean;
}

export interface FormulationRow {
  benefit: IngredientFunction;
  primary: Ingredient | null;
  alternatives: Ingredient[];
}

export interface FormulationDraft {
  rows: FormulationRow[];
  phWindow: PhWindow;
  needsValidation: Ingredient[];
  seasonGuide: SeasonGuide;
}

const SKIN_SCORE: Record<string, number> = { good: 2, moderate: 1, unknown: 0, caution: -1 };

function score(ingredient: Ingredient, input: FormulationInput): number {
  let total = evidenceScore(ingredient.evidence.level) + sustainabilityScore(ingredient) * 0.5;
  if (input.skin) {
    total += SKIN_SCORE[ingredient.skinFit[input.skin]];
  }
  if (input.preferAgriWaste && ingredient.source === 'agri-waste') {
    total += 2;
  }
  if (ingredient.seasonNotes[input.climate]) {
    total += 0.5;
  }
  return total;
}

function candidatesFor(benefit: IngredientFunction, input: FormulationInput): Ingredient[] {
  return INGREDIENTS.filter(
    (ingredient) =>
      ingredient.categories.includes(input.category) &&
      ingredient.functions.includes(benefit) &&
      !(input.avoidColourants && ingredient.functions.includes('colouring')),
  ).sort((a, b) => score(b, input) - score(a, input));
}

export function buildFormulation(input: FormulationInput): FormulationDraft {
  const used = new Set<string>();
  const rows: FormulationRow[] = input.benefits.map((benefit) => {
    const pool = candidatesFor(benefit, input).filter((ingredient) => !used.has(ingredient.id));
    const primary = pool[0] ?? null;
    if (primary) used.add(primary.id);
    const alternatives = pool.slice(1, 3);
    return { benefit, primary, alternatives };
  });

  const primaries = rows.flatMap((row) => (row.primary ? [row.primary] : []));

  return {
    rows,
    phWindow: getPhWindow(primaries),
    needsValidation: primaries.filter(
      (ingredient) => ingredient.evidence.level !== 'established' || ingredient.ph === null,
    ),
    seasonGuide: SEASON_GUIDES.find((guide) => guide.season === input.climate)!,
  };
}
