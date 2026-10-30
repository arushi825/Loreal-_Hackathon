import type { ReactNode } from 'react';

export type BadgeTone = 'neutral' | 'green' | 'mint' | 'olive' | 'sage' | 'amber' | 'red';

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: 'bg-sand-100 text-sand-900 ring-sand-300',
  green: 'bg-forest-700 text-white ring-forest-700',
  mint: 'bg-mint-100 text-mint-900 ring-mint-300',
  olive: 'bg-olive-100 text-olive-900 ring-olive-300',
  sage: 'bg-sage-100 text-sage-900 ring-sage-300',
  amber: 'bg-amber-100 text-amber-900 ring-amber-300',
  red: 'bg-terracotta-100 text-terracotta-900 ring-terracotta-300',
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: ReactNode;
  className?: string;
}

export default function Badge({ children, tone = 'neutral', icon, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${TONE_CLASSES[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
