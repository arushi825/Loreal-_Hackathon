import type { PairRule } from '@/types';

export const PAIR_RULES: PairRule[] = [
  { a: 'aloe-leaf-juice', b: 'xanthan-gum', status: 'compatible', note: 'Commonly used together in gel bases. Check viscosity after adding preservative and actives.' },
  { a: 'aloe-leaf-juice', b: 'fermented-lactic-acid', status: 'caution', note: 'Acidification can affect aloe components over time. Track pH drift during stability testing.' },
  { a: 'spirulina-phycocyanin', b: 'fermented-lactic-acid', status: 'incompatible', note: 'Pigment colour and stability are expected to decline in acid. Keep pH near neutral.' },
  { a: 'spirulina-phycocyanin', b: 'hibiscus-flower-extract', status: 'caution', note: 'Both are pH-sensitive pigments. The combined shade is unpredictable without testing.' },
  { a: 'fermented-lactic-acid', b: 'hibiscus-flower-extract', status: 'caution', note: 'Acid shifts anthocyanin colour toward red. The intended shade and its stability need validation.' },
  { a: 'vegetable-glycerin', b: 'xanthan-gum', status: 'compatible', note: 'Glycerin is often pre-mixed to help xanthan disperse. Verify hydration time.' },
  { a: 'sodium-hyaluronate', b: 'vegetable-glycerin', status: 'compatible', note: 'A common humectant pairing. Viscosity and molecular weight still need checking.' },
  { a: 'bagasse-cellulose', b: 'xanthan-gum', status: 'caution', note: 'Both thicken. Over-thickening and texture changes are possible.' },
  { a: 'fermented-lactic-acid', b: 'levulinate-preservative', status: 'caution', note: 'Acid addition shifts pH and can change preservative performance. Challenge testing is required.' },
  { a: 'algae-beta-carotene', b: 'rice-bran-oil', status: 'caution', note: 'Both are oxidation-sensitive. An antioxidant system is advisable.' },
  { a: 'olive-squalane', b: 'sunflower-lecithin', status: 'compatible', note: 'A common oil-phase and emulsifier pairing. Emulsion stability must be tested.' },
  { a: 'fermented-lactic-acid', b: 'sunflower-lecithin', status: 'caution', note: 'Emulsifier performance can shift at lower pH. Test emulsion stability.' },
  { a: 'cascara-extract', b: 'spirulina-phycocyanin', status: 'caution', note: 'The acidic extract may affect the pigment. Test colour over time.' },
];
