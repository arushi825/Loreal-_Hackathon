import type { Ingredient } from '@/types';
import { AGRI_WASTE_INGREDIENTS } from '@/data/ingredients/agriWaste';
import { FERMENTATION_INGREDIENTS } from '@/data/ingredients/fermentation';
import { PLANT_INGREDIENTS } from '@/data/ingredients/plant';

export const INGREDIENTS: Ingredient[] = [
  ...PLANT_INGREDIENTS,
  ...FERMENTATION_INGREDIENTS,
  ...AGRI_WASTE_INGREDIENTS,
];

export function getIngredientById(id: string): Ingredient | undefined {
  return INGREDIENTS.find((ingredient) => ingredient.id === id);
}
