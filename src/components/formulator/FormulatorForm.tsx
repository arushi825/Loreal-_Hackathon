import type { IngredientFunction, ProductCategory, Season, SkinType } from '@/types';
import { ALL_CATEGORIES, ALL_SEASONS, ALL_SKIN_TYPES, CATEGORY_LABELS, FUNCTION_LABELS, SEASON_LABELS, SKIN_LABELS } from '@/data/taxonomy';
import type { FormulationInput } from '@/lib/formulation';
import Badge from '@/components/ui/Badge';

const BENEFIT_OPTIONS: IngredientFunction[] = ['moisturizing', 'emollient', 'thickening', 'conditioning', 'colouring', 'soothing', 'antioxidant', 'emulsifying', 'preservation', 'ph-adjusting'];

interface FormulatorFormProps {
  input: FormulationInput;
  onChange: (next: FormulationInput) => void;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-sand-200 bg-white px-4 py-3 text-sm text-forest-900 transition hover:bg-sand-50">
      {label}
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-forest-700" />
    </label>
  );
}

export default function FormulatorForm({ input, onChange }: FormulatorFormProps) {
  const toggleBenefit = (fn: IngredientFunction) => {
    const benefits = input.benefits.includes(fn) ? input.benefits.filter((item) => item !== fn) : [...input.benefits, fn];
    onChange({ ...input, benefits });
  };

  return (
    <div className="card space-y-7 p-5 sm:p-7">
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-forest-900">1. Product category</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ALL_CATEGORIES.map((category: ProductCategory) => (
            <button
              key={category}
              type="button"
              onClick={() => onChange({ ...input, category })}
              aria-pressed={input.category === category}
              className={`rounded-2xl px-3 py-3 text-sm font-medium transition ${
                input.category === category ? 'bg-forest-700 text-white shadow-sm' : 'bg-sand-50 text-forest-800 ring-1 ring-inset ring-sand-200 hover:bg-sage-50'
              }`}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-forest-900">2. Desired benefits</h2>
        <div className="flex flex-wrap gap-2">
          {BENEFIT_OPTIONS.map((fn) => {
            const active = input.benefits.includes(fn);
            return (
              <button
                key={fn}
                type="button"
                onClick={() => toggleBenefit(fn)}
                aria-pressed={active}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                  active ? 'bg-olive-700 text-white' : 'bg-white text-forest-800 ring-1 ring-inset ring-sand-300 hover:bg-olive-50'
                }`}
              >
                {FUNCTION_LABELS[fn]}
              </button>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-forest-900">3. Climate</h2>
          <div className="grid grid-cols-2 gap-2">
            {ALL_SEASONS.map((season: Season) => (
              <button
                key={season}
                type="button"
                onClick={() => onChange({ ...input, climate: season })}
                aria-pressed={input.climate === season}
                className={`rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                  input.climate === season ? 'bg-forest-700 text-white' : 'bg-sand-50 text-forest-800 hover:bg-sage-50'
                }`}
              >
                {SEASON_LABELS[season]}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-forest-900">4. Target skin type (optional)</h2>
          <select
            className="field"
            value={input.skin ?? ''}
            onChange={(e) => onChange({ ...input, skin: (e.target.value || null) as SkinType | null })}
            aria-label="Target skin type"
          >
            <option value="">No specific skin type</option>
            {ALL_SKIN_TYPES.map((skin) => (
              <option key={skin} value={skin}>
                {SKIN_LABELS[skin]}
              </option>
            ))}
          </select>
        </section>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-forest-900">5. Requirements</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <Toggle label="Prioritise agri-waste sources" checked={input.preferAgriWaste} onChange={(value) => onChange({ ...input, preferAgriWaste: value })} />
          <Toggle label="Exclude colourants" checked={input.avoidColourants} onChange={(value) => onChange({ ...input, avoidColourants: value })} />
        </div>
        {input.benefits.length === 0 && (
          <Badge tone="amber">Select at least one benefit to generate a draft</Badge>
        )}
      </section>
    </div>
  );
}
