import type { ConventionalIngredient } from '@/types';

export const CONVENTIONAL_INGREDIENTS: ConventionalIngredient[] = [
  { id: 'propylene-glycol', name: 'Propylene Glycol', function: 'moisturizing', note: 'Often petrochemical-derived. Bio-based glycerin is a candidate replacement.' },
  { id: 'carbomer', name: 'Carbomer', function: 'thickening', note: 'Synthetic polymer thickener. Cellulose and xanthan are candidate replacements.' },
  { id: 'dimethicone', name: 'Dimethicone', function: 'emollient', note: 'Silicone emollient. Plant oils and butters are candidate replacements.' },
  { id: 'mineral-oil', name: 'Mineral Oil', function: 'emollient', note: 'Petroleum-derived. Squalane and rice bran oil are candidates.' },
  { id: 'synthetic-colourants', name: 'Synthetic Colourants', function: 'colouring', note: 'Petroleum-derived colourants. Plant and algae pigments are candidates with pH sensitivity to manage.' },
  { id: 'paraben-preservatives', name: 'Paraben Preservatives', function: 'preservation', note: 'Synthetic preservatives. Levulinate-based systems are candidates that require challenge testing.' },
  { id: 'polysorbate-20', name: 'Polysorbate 20', function: 'emulsifying', note: 'Synthetic emulsifier. Sunflower lecithin is a candidate that needs stability testing.' },
];
