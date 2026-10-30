import { AlertTriangle } from 'lucide-react';
import type { Ingredient } from '@/types';
import { getPhWindow } from '@/lib/compatibility';
import Badge from '@/components/ui/Badge';

interface LabInsightsProps {
  ingredients: Ingredient[];
}

export default function LabInsights({ ingredients }: LabInsightsProps) {
  const window = getPhWindow(ingredients);

  const phMessage =
    window.status === 'shared'
      ? `Shared working window pH ${window.min} to ${window.max}, based on the ingredients with verified pH data.`
      : window.status === 'none'
        ? 'No shared working pH window. A pH adjustment strategy or a substitution is needed before combining.'
        : 'No verified pH data for these ingredients. pH behaviour must be measured in the lab.';

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="card space-y-4 p-6">
        <h3 className="text-lg font-semibold text-forest-900">pH behaviour</h3>
        <div className="relative h-4 rounded-full bg-gradient-to-r from-terracotta-300 via-sand-200 via-50% to-mint-300">
          {window.status === 'shared' && (
            <div
              className="absolute top-1/2 h-6 -translate-y-1/2 rounded-full border-2 border-forest-700 bg-forest-500/30"
              style={{ left: `${(window.min / 14) * 100}%`, width: `${((window.max - window.min) / 14) * 100}%` }}
            />
          )}
        </div>
        <div className="flex justify-between text-[11px] font-medium text-sand-800">
          <span>0 acidic</span>
          <span>14 alkaline</span>
        </div>
        <p
          className={`text-sm ${window.status === 'shared' ? 'text-forest-900' : 'text-terracotta-800'}`}
        >
          {phMessage}
        </p>
        {window.unverified.length > 0 && (
          <p className="text-sm text-sand-900">
            Not verified: {window.unverified.map((item) => item.name).join(', ')}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-none" aria-hidden />
          <div className="space-y-1">
            <p className="font-semibold">Laboratory validation required</p>
            <p className="text-sm">
              Every combination here is a reference-level screen. Results are not experimental findings. Stability,
              preservation, colour and texture must be tested before any use.
            </p>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="mb-3 text-lg font-semibold text-forest-900">Stability checklist</h3>
          <div className="flex flex-wrap gap-2">
            {['Emulsion stability', 'Colour over time', 'Viscosity drift', 'Preservative challenge', 'pH drift', 'Oxidation'].map((item) => (
              <Badge key={item} tone="olive">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
