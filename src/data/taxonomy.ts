import type {
  CompatibilityStatus,
  EvidenceLevel,
  IngredientFunction,
  ProductCategory,
  Season,
  SkinType,
  SourceKind,
  Suitability,
} from '@/types';

export const FUNCTION_LABELS: Record<IngredientFunction, string> = {
  moisturizing: 'Moisturizing',
  emollient: 'Emollient',
  thickening: 'Thickening',
  conditioning: 'Conditioning',
  colouring: 'Colouring',
  preservation: 'Preservation',
  soothing: 'Soothing',
  antioxidant: 'Antioxidant',
  emulsifying: 'Emulsifying',
  'ph-adjusting': 'pH adjusting',
};

export const ALL_FUNCTIONS = Object.keys(FUNCTION_LABELS) as IngredientFunction[];

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  skincare: 'Skincare',
  serum: 'Serums',
  'body-lotion': 'Body lotions',
  shampoo: 'Shampoos',
  conditioner: 'Conditioners',
  'hair-dye': 'Hair dyes',
  foundation: 'Foundations',
  lipstick: 'Lipsticks',
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as ProductCategory[];

export const SKIN_LABELS: Record<SkinType, string> = {
  dry: 'Dry',
  oily: 'Oily',
  combination: 'Combination',
  normal: 'Normal',
  sensitive: 'Sensitive',
  'acne-prone': 'Acne-prone',
};

export const ALL_SKIN_TYPES = Object.keys(SKIN_LABELS) as SkinType[];

export const SUITABILITY_LABELS: Record<Suitability, string> = {
  good: 'Good fit',
  moderate: 'Moderate fit',
  caution: 'Use with caution',
  unknown: 'Not verified',
};

export const SOURCE_LABELS: Record<SourceKind, string> = {
  plant: 'Plant',
  algae: 'Algae',
  microbial: 'Microbial fermentation',
  'agri-waste': 'Agri-waste',
};

export const ALL_SOURCES = Object.keys(SOURCE_LABELS) as SourceKind[];

export const EVIDENCE_LABELS: Record<EvidenceLevel, string> = {
  established: 'Established function',
  limited: 'Limited data',
  unavailable: 'Data unavailable',
};

export const SEASON_LABELS: Record<Season, string> = {
  summer: 'Summer',
  winter: 'Winter',
  humid: 'Humid weather',
  'dry-climate': 'Dry climate',
};

export const ALL_SEASONS = Object.keys(SEASON_LABELS) as Season[];

export const COMPATIBILITY_LABELS: Record<CompatibilityStatus, string> = {
  compatible: 'Compatible in reference',
  caution: 'Use with caution',
  incompatible: 'Known incompatibility',
  untested: 'Lab validation required',
};
