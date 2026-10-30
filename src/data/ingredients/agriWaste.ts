import type { Ingredient } from '@/types';

const FERN = 'https://images.pexels.com/photos/1334149/pexels-photo-1334149.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const OLIVE = 'https://images.pexels.com/photos/15119264/pexels-photo-15119264.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const SAGE = 'https://images.pexels.com/photos/5852289/pexels-photo-5852289.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const SUCCULENT = 'https://images.pexels.com/photos/37992842/pexels-photo-37992842.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const AGRI_WASTE_INGREDIENTS: Ingredient[] = [
  {
    id: 'bagasse-cellulose',
    name: 'Bagasse Cellulose',
    inci: 'Cellulose',
    source: 'agri-waste',
    sourceDetail: 'Fibre from sugarcane bagasse, the residue left after cane juice extraction',
    image: FERN,
    summary: 'A fibre made from sugar-mill residue that suspends particles and adds body to formulas.',
    functions: ['thickening'],
    categories: ['skincare', 'body-lotion', 'shampoo', 'conditioner', 'foundation'],
    ph: { min: 3, max: 11, note: 'Non-ionic fibre; generally stable across the typical pH range.' },
    solubility: 'Insoluble; forms a dispersed network that suspends particles.',
    skinFit: { dry: 'unknown', oily: 'unknown', combination: 'unknown', normal: 'unknown', sensitive: 'unknown', 'acne-prone': 'unknown' },
    seasonNotes: {
      summer: 'Helps keep texture stable in warm weather; test for separation.',
      winter: 'Test texture and suspension at low temperatures.',
    },
    safety: {
      irritants: ['Low irritation potential; fine particles can irritate during handling'],
      restrictions: ['Grade and particle size change feel and suspension'],
      interactions: ['Often paired with a gum such as xanthan for suspension; verify in each formula'],
      patchTest: false,
    },
    sustainability: {
      renewable: true,
      valorization: true,
      extraction: 'Bagasse is pulped, purified and refined into cellulose.',
      environment: 'Turns a sugar-mill residue into an ingredient; bleaching chemistry and water use should be verified.',
    },
    evidence: {
      level: 'established',
      note: 'Cellulose is an established texturiser. Skin activity is not claimed; this is a texture ingredient.',
    },
  },
  {
    id: 'cascara-extract',
    name: 'Coffee Cherry (Cascara) Extract',
    inci: 'Coffea Arabica Fruit Extract',
    source: 'agri-waste',
    sourceDetail: 'Dried husk and pulp of coffee cherries, a by-product of coffee processing',
    image: SAGE,
    summary: 'An extract from coffee-processing husk, positioned for antioxidant use in formulas.',
    functions: ['antioxidant'],
    categories: ['skincare', 'serum', 'body-lotion', 'shampoo'],
    ph: { min: 4.5, max: 6.5, note: 'Naturally acidic extract; pH adjustment may be needed to reach target.' },
    solubility: 'Water-dispersible extract.',
    skinFit: { dry: 'unknown', oily: 'unknown', combination: 'unknown', normal: 'unknown', sensitive: 'unknown', 'acne-prone': 'unknown' },
    seasonNotes: {
      summer: 'Colour and odour can shift in heat; test storage.',
    },
    safety: {
      irritants: ['Allergen profile of the plant extract is not characterised here'],
      restrictions: ['Caffeine and polyphenol content should be specified, not assumed'],
      interactions: ['Acidic extract; can affect pH-sensitive pigments'],
      patchTest: true,
    },
    sustainability: {
      renewable: true,
      valorization: true,
      extraction: 'Hot water or ethanol extraction of dried coffee cherry husk.',
      environment: 'Recovers value from a coffee-processing by-product; processing water use should be verified.',
    },
    evidence: {
      level: 'limited',
      note: 'Antioxidant chemistry is documented in general; skin-benefit claims are not verified here.',
    },
  },
  {
    id: 'rice-bran-oil',
    name: 'Rice Bran Oil',
    inci: 'Oryza Sativa Bran Oil',
    source: 'agri-waste',
    sourceDetail: 'Oil pressed or extracted from rice bran, a milling by-product',
    image: SUCCULENT,
    summary: 'A nourishing vegetable oil recovered from rice milling. It needs antioxidant protection against oxidation.',
    functions: ['emollient', 'conditioning'],
    categories: ['skincare', 'body-lotion', 'conditioner', 'lipstick', 'foundation'],
    ph: { min: 3, max: 10, note: 'Non-ionic oil; pH-insensitive in typical use.' },
    solubility: 'Oil-soluble.',
    skinFit: { dry: 'good', oily: 'moderate', combination: 'moderate', normal: 'good', sensitive: 'moderate', 'acne-prone': 'moderate' },
    seasonNotes: {
      summer: 'Oxidation risk rises in heat; add an antioxidant and store cool.',
      winter: 'Smooth, nourishing texture suits cold weather.',
      'dry-climate': 'Emollient layer helps reduce moisture loss in dry air.',
    },
    safety: {
      irritants: ['Generally low irritation; crude oils may carry impurities'],
      restrictions: ['Oxidises over time; a refined grade and antioxidant are recommended'],
      interactions: ['Antioxidant pairing can slow rancidity; confirm with stability tests'],
      patchTest: false,
    },
    sustainability: {
      renewable: true,
      valorization: true,
      extraction: 'Bran is stabilised after milling, then the oil is pressed or solvent-extracted and refined.',
      environment: 'Uses a milling by-product; rice cultivation is water-intensive, so sourcing should be verified.',
    },
    evidence: {
      level: 'established',
      note: 'Established vegetable oil in cosmetics. Oxidative stability is grade-dependent.',
    },
  },
  {
    id: 'levulinate-preservative',
    name: 'Sodium Levulinate',
    inci: 'Sodium Levulinate',
    source: 'agri-waste',
    sourceDetail: 'Made from levulinic acid, produced from cellulose-rich agricultural residues',
    image: OLIVE,
    summary: 'A bio-based salt used as a preservative booster. Its performance must be proven in each formula.',
    functions: ['preservation'],
    categories: ['skincare', 'body-lotion', 'shampoo', 'conditioner', 'serum'],
    ph: { min: 5, max: 8, note: 'Used in near-neutral systems; efficacy depends on pH and formula. Challenge testing is required.' },
    solubility: 'Water-soluble.',
    skinFit: { dry: 'unknown', oily: 'unknown', combination: 'unknown', normal: 'unknown', sensitive: 'unknown', 'acne-prone': 'unknown' },
    seasonNotes: {
      summer: 'Preservation claims should be tested under warm storage conditions.',
      humid: 'Preservation claims should be tested under humid storage conditions.',
    },
    safety: {
      irritants: ['Irritation profile should be verified for each formula'],
      restrictions: ['No preservation claim without a challenge test on the finished product'],
      interactions: ['Efficacy can be reduced by formula ingredients and pH shifts'],
      patchTest: true,
    },
    sustainability: {
      renewable: true,
      valorization: true,
      extraction: 'Levulinic acid from acid hydrolysis of cellulose, then neutralised to the sodium salt.',
      environment: 'Uses lignocellulosic residue; process energy and catalyst use vary by producer.',
    },
    evidence: {
      level: 'limited',
      note: 'Used as a preservative booster. It is not a standalone preservation claim; efficacy must be validated per formula.',
    },
  },
];
