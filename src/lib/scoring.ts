import type { EvidenceLevel, Ingredient } from '@/types';

const EVIDENCE_SCORE: Record<EvidenceLevel, number> = {
  established: 2,
  limited: 1,
  unavailable: 0,
};

export function evidenceScore(level: EvidenceLevel): number {
  return EVIDENCE_SCORE[level];
}

export function sustainabilityScore(ingredient: Ingredient): number {
  return (ingredient.sustainability.renewable ? 1 : 0) + (ingredient.sustainability.valorization ? 1 : 0);
}
