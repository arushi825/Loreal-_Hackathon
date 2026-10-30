import type { SeasonGuide } from '@/types';

export const SEASON_GUIDES: SeasonGuide[] = [
  {
    season: 'summer',
    summary: 'Warm weather favours lighter textures and makes heat-stability and preservation checks more important.',
    considerations: [
      'Lighter, water-based textures are usually more comfortable',
      'Test emulsions and pigments for heat stability',
      'Re-check preservative performance in warm storage',
    ],
    favour: ['moisturizing', 'soothing', 'antioxidant'],
    watch: ['emollient', 'colouring'],
  },
  {
    season: 'winter',
    summary: 'Cold, dry indoor air often suits richer emollients and occlusive layers.',
    considerations: [
      'Richer emollients support a protective, barrier-type feel',
      'Check viscosity and separation at low temperatures',
      'Humectants alone may feel insufficient in heated indoor air',
    ],
    favour: ['emollient', 'conditioning'],
    watch: ['thickening'],
  },
  {
    season: 'humid',
    summary: 'High humidity raises microbial risk and can make heavy textures feel greasy.',
    considerations: [
      'Preservation must be validated; water-rich systems need extra care',
      'Lightweight, fast-absorbing textures are usually preferred',
      'Check oxidation of oils in warm, humid storage',
    ],
    favour: ['preservation', 'moisturizing'],
    watch: ['emollient'],
  },
  {
    season: 'dry-climate',
    summary: 'Low humidity increases water loss, so layering humectants with occlusive emollients is commonly discussed.',
    considerations: [
      'Pair humectants with occlusive emollients',
      'Use packaging that limits evaporation from open containers',
      'Check that viscosity holds as the product ages',
    ],
    favour: ['moisturizing', 'emollient'],
    watch: ['colouring'],
  },
];
