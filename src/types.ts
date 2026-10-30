export type SourceKind = 'plant' | 'algae' | 'microbial' | 'agri-waste';

export type IngredientFunction =
  | 'moisturizing'
  | 'emollient'
  | 'thickening'
  | 'conditioning'
  | 'colouring'
  | 'preservation'
  | 'soothing'
  | 'antioxidant'
  | 'emulsifying'
  | 'ph-adjusting';

export type ProductCategory =
  | 'skincare'
  | 'serum'
  | 'body-lotion'
  | 'shampoo'
  | 'conditioner'
  | 'hair-dye'
  | 'foundation'
  | 'lipstick';

export type SkinType = 'dry' | 'oily' | 'combination' | 'normal' | 'sensitive' | 'acne-prone';

export type Suitability = 'good' | 'moderate' | 'caution' | 'unknown';

export type Season = 'summer' | 'winter' | 'humid' | 'dry-climate';

export type EvidenceLevel = 'established' | 'limited' | 'unavailable';

export type CompatibilityStatus = 'compatible' | 'caution' | 'incompatible' | 'untested';

export interface PhProfile {
  min: number;
  max: number;
  note: string;
}

export interface Ingredient {
  id: string;
  name: string;
  inci: string;
  source: SourceKind;
  sourceDetail: string;
  image: string;
  summary: string;
  functions: IngredientFunction[];
  categories: ProductCategory[];
  ph: PhProfile | null;
  solubility: string;
  skinFit: Record<SkinType, Suitability>;
  seasonNotes: Partial<Record<Season, string>>;
  safety: {
    irritants: string[];
    restrictions: string[];
    interactions: string[];
    patchTest: boolean;
  };
  sustainability: {
    renewable: boolean;
    valorization: boolean;
    extraction: string;
    environment: string;
  };
  evidence: {
    level: EvidenceLevel;
    note: string;
  };
}

export interface PairRule {
  a: string;
  b: string;
  status: CompatibilityStatus;
  note: string;
}

export interface ConventionalIngredient {
  id: string;
  name: string;
  function: IngredientFunction;
  note: string;
}

export interface SeasonGuide {
  season: Season;
  summary: string;
  considerations: string[];
  favour: IngredientFunction[];
  watch: IngredientFunction[];
}
