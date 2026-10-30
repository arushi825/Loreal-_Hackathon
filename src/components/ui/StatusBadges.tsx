import { CircleDashed, FlaskConical, Sprout } from 'lucide-react';
import type { EvidenceLevel, Suitability } from '@/types';
import { EVIDENCE_LABELS, SUITABILITY_LABELS } from '@/data/taxonomy';
import Badge, { type BadgeTone } from '@/components/ui/Badge';

const EVIDENCE_TONE: Record<EvidenceLevel, BadgeTone> = {
  established: 'mint',
  limited: 'amber',
  unavailable: 'neutral',
};

const EVIDENCE_ICON: Record<EvidenceLevel, typeof Sprout> = {
  established: Sprout,
  limited: FlaskConical,
  unavailable: CircleDashed,
};

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const Icon = EVIDENCE_ICON[level];
  return (
    <Badge tone={EVIDENCE_TONE[level]} icon={<Icon className="h-3.5 w-3.5" aria-hidden />}>
      {EVIDENCE_LABELS[level]}
    </Badge>
  );
}

const SUITABILITY_TONE: Record<Suitability, BadgeTone> = {
  good: 'green',
  moderate: 'sage',
  caution: 'red',
  unknown: 'neutral',
};

export function SuitabilityPill({ value }: { value: Suitability }) {
  return <Badge tone={SUITABILITY_TONE[value]}>{SUITABILITY_LABELS[value]}</Badge>;
}
