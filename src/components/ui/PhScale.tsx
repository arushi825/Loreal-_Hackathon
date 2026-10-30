import type { PhProfile } from '@/types';

interface PhScaleProps {
  ph: PhProfile | null;
}

export default function PhScale({ ph }: PhScaleProps) {
  if (!ph) {
    return (
      <div className="rounded-2xl border border-dashed border-sand-300 bg-sand-50 px-4 py-3 text-sm text-sand-800">
        pH window not verified for this ingredient.
      </div>
    );
  }

  const left = (ph.min / 14) * 100;
  const width = ((ph.max - ph.min) / 14) * 100;

  return (
    <div className="space-y-3">
      <div className="relative h-3 rounded-full bg-gradient-to-r from-terracotta-300 via-sand-200 via-50% to-mint-300">
        <div
          className="absolute top-1/2 h-5 -translate-y-1/2 rounded-full border-2 border-forest-700 bg-forest-500/30 shadow-sm transition-all duration-500"
          style={{ left: `${left}%`, width: `${width}%` }}
          aria-label={`Working pH window ${ph.min} to ${ph.max}`}
        />
      </div>
      <div className="flex justify-between text-[11px] font-medium text-sand-800">
        <span>0 acidic</span>
        <span>7 neutral</span>
        <span>14 alkaline</span>
      </div>
      <p className="text-sm font-medium text-forest-800">
        Working window {ph.min} to {ph.max}
      </p>
      <p className="text-sm text-sand-900">{ph.note}</p>
    </div>
  );
}
