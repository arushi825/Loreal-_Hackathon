import type { CompatibilityStatus, Ingredient, PairRule } from '@/types';
import { PAIR_RULES } from '@/data/pairRules';

export const MAX_COMBINATION_SIZE = 6;

export interface PairAnalysis {
  a: Ingredient;
  b: Ingredient;
  status: CompatibilityStatus;
  note: string;
}

export interface PhWindow {
  status: 'shared' | 'none' | 'no-data';
  min: number;
  max: number;
  unverified: Ingredient[];
}

function ruleKey(a: string, b: string): string {
  return [a, b].sort().join('|');
}

const RULE_INDEX = new Map<string, PairRule>(
  PAIR_RULES.map((rule) => [ruleKey(rule.a, rule.b), rule]),
);

export function analysePair(a: Ingredient, b: Ingredient): PairAnalysis {
  const rule = RULE_INDEX.get(ruleKey(a.id, b.id));
  if (!rule) {
    return {
      a,
      b,
      status: 'untested',
      note: 'No reference interaction data in this prototype. Laboratory validation is required.',
    };
  }
  return { a, b, status: rule.status, note: rule.note };
}

export function analyseCombination(list: Ingredient[]): PairAnalysis[] {
  const pairs: PairAnalysis[] = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      pairs.push(analysePair(list[i], list[j]));
    }
  }
  return pairs;
}

export function getPhWindow(list: Ingredient[]): PhWindow {
  const verified = list.filter((ingredient) => ingredient.ph !== null);
  const unverified = list.filter((ingredient) => ingredient.ph === null);

  if (verified.length === 0) {
    return { status: 'no-data', min: 0, max: 0, unverified };
  }

  const min = Math.max(...verified.map((ingredient) => ingredient.ph!.min));
  const max = Math.min(...verified.map((ingredient) => ingredient.ph!.max));

  if (min > max) {
    return { status: 'none', min, max, unverified };
  }
  return { status: 'shared', min, max, unverified };
}
