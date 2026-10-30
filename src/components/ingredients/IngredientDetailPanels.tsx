import type { ReactNode } from 'react';
import { AlertTriangle, Ban, Recycle, Factory, Globe, Thermometer, Layers } from 'lucide-react';
import type { Ingredient, Season, SkinType } from '@/types';
import { ALL_SEASONS, ALL_SKIN_TYPES, SEASON_LABELS, SKIN_LABELS } from '@/data/taxonomy';
import PhScale from '@/components/ui/PhScale';
import { SuitabilityPill } from '@/components/ui/StatusBadges';
import Badge from '@/components/ui/Badge';

function ListBlock({ title, items, icon }: { title: string; items: string[]; icon: ReactNode }) {
  return (
    <div className="rounded-2xl bg-sand-50 p-4">
      <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-forest-900">
        {icon}
        {title}
      </h4>
      {items.length === 0 ? (
        <p className="text-sm text-sand-800">None recorded.</p>
      ) : (
        <ul className="space-y-1.5 text-sm text-sand-900">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1 w-1 flex-none rounded-full bg-sage-500" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function OverviewPanel({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className="space-y-5">
      <p className="text-base text-sand-900">{ingredient.summary}</p>
      <dl className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-sand-50 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-olive-700">Source</dt>
          <dd className="mt-1 text-sm text-forest-900">{ingredient.sourceDetail}</dd>
        </div>
        <div className="rounded-2xl bg-sand-50 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-olive-700">Solubility</dt>
          <dd className="mt-1 text-sm text-forest-900">{ingredient.solubility}</dd>
        </div>
      </dl>
      <div>
        <h4 className="mb-2 text-sm font-semibold text-forest-900">Evidence</h4>
        <p className="rounded-2xl border border-sand-200 p-4 text-sm text-sand-900">{ingredient.evidence.note}</p>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-semibold text-forest-900">Product categories</h4>
        <div className="flex flex-wrap gap-1.5">
          {ingredient.categories.map((category) => (
            <Badge key={category} tone="olive">
              {category.replace('-', ' ')}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkinSeasonPanel({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-1 text-sm font-semibold text-forest-900">Skin-type fit</h4>
        <p className="mb-3 text-xs text-sand-800">Based on formulation evidence in this prototype. Unverified fits are shown as such.</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {ALL_SKIN_TYPES.map((skin: SkinType) => (
            <li key={skin} className="flex items-center justify-between rounded-2xl border border-sand-200 px-4 py-2.5">
              <span className="text-sm font-medium text-forest-900">{SKIN_LABELS[skin]}</span>
              <SuitabilityPill value={ingredient.skinFit[skin]} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-forest-900">
          <Thermometer className="h-4 w-4 text-olive-700" aria-hidden />
          Seasonal considerations
        </h4>
        <ul className="grid gap-2">
          {ALL_SEASONS.map((season: Season) => (
            <li key={season} className="rounded-2xl bg-sand-50 p-4">
              <p className="text-sm font-semibold text-forest-900">{SEASON_LABELS[season]}</p>
              <p className="mt-1 text-sm text-sand-900">
                {ingredient.seasonNotes[season] ?? 'No specific note recorded. See the general seasonal guidance in the Formulator.'}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SafetyPanel({ ingredient }: { ingredient: Ingredient }) {
  const { safety } = ingredient;
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-semibold">Application frequency and usage limits are not verified in this prototype.</p>
        <p className="mt-1">Set them with a safety assessment and regulatory review for each finished product.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <ListBlock title="Potential irritants" items={safety.irritants} icon={<AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden />} />
        <ListBlock title="Restrictions" items={safety.restrictions} icon={<Ban className="h-4 w-4 text-terracotta-600" aria-hidden />} />
        <ListBlock title="Interactions" items={safety.interactions} icon={<Layers className="h-4 w-4 text-olive-700" aria-hidden />} />
      </div>
      <p className="text-sm text-forest-900">
        <span className="font-semibold">Patch test advised:</span> {safety.patchTest ? 'Yes' : 'Not flagged in this prototype'}
      </p>
    </div>
  );
}

export function PhPanel({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className="space-y-5">
      <PhScale ph={ingredient.ph} />
      <div className="rounded-2xl bg-sand-50 p-4 text-sm text-sand-900">
        <p className="font-semibold text-forest-900">Adjustment strategy</p>
        <p className="mt-1">
          {ingredient.ph
            ? 'Keep the finished formula inside the working window. Use a pH adjuster only after checking how it affects every other ingredient.'
            : 'No verified pH window exists, so measure pH stability in a laboratory before setting a target.'}
        </p>
      </div>
    </div>
  );
}

export function SustainabilityPanel({ ingredient }: { ingredient: Ingredient }) {
  const { sustainability } = ingredient;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge tone={sustainability.renewable ? 'mint' : 'neutral'} icon={<Recycle className="h-3.5 w-3.5" aria-hidden />}>
          {sustainability.renewable ? 'Renewable source' : 'Renewable status not verified'}
        </Badge>
        <Badge tone={sustainability.valorization ? 'olive' : 'neutral'} icon={<Factory className="h-3.5 w-3.5" aria-hidden />}>
          {sustainability.valorization ? 'Agricultural by-product valorized' : 'No by-product valorization recorded'}
        </Badge>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-sand-50 p-4">
          <h4 className="text-sm font-semibold text-forest-900">Extraction</h4>
          <p className="mt-1 text-sm text-sand-900">{sustainability.extraction}</p>
        </div>
        <div className="rounded-2xl bg-sand-50 p-4">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-forest-900">
            <Globe className="h-4 w-4 text-olive-700" aria-hidden />
            Environmental notes
          </h4>
          <p className="mt-1 text-sm text-sand-900">{sustainability.environment}</p>
        </div>
      </div>
    </div>
  );
}
