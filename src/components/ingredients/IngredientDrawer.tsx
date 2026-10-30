import { useEffect, useState } from 'react';
import { FlaskConical, X } from 'lucide-react';
import type { Ingredient } from '@/types';
import { FUNCTION_LABELS, SOURCE_LABELS } from '@/data/taxonomy';
import Badge from '@/components/ui/Badge';
import { EvidenceBadge } from '@/components/ui/StatusBadges';
import Button from '@/components/ui/Button';
import {
  OverviewPanel,
  PhPanel,
  SafetyPanel,
  SkinSeasonPanel,
  SustainabilityPanel,
} from '@/components/ingredients/IngredientDetailPanels';

const TABS = ['Overview', 'Skin & season', 'Safety', 'pH', 'Sustainability'] as const;
type Tab = (typeof TABS)[number];

interface IngredientDrawerProps {
  ingredient: Ingredient;
  onClose: () => void;
  inLab: boolean;
  labFull: boolean;
  onToggleLab: (id: string) => void;
}

export default function IngredientDrawer({ ingredient, onClose, inLab, labFull, onToggleLab }: IngredientDrawerProps) {
  const [tab, setTab] = useState<Tab>('Overview');

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="absolute inset-0 bg-forest-900/40 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className="animate-drawer-in absolute bottom-0 left-0 right-0 flex max-h-[92vh] flex-col overflow-hidden rounded-t-3xl bg-paper shadow-lift sm:bottom-auto sm:left-auto sm:right-0 sm:top-0 sm:h-full sm:max-h-none sm:w-full sm:max-w-2xl sm:rounded-none sm:rounded-l-3xl"
      >
        <div className="relative h-44 flex-none overflow-hidden sm:h-56">
          <img src={ingredient.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-forest-900 transition hover:bg-white"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-sage-100">{SOURCE_LABELS[ingredient.source]}</p>
            <h2 id="drawer-title" className="mt-1 text-3xl font-semibold text-white">
              {ingredient.name}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <EvidenceBadge level={ingredient.evidence.level} />
            {ingredient.functions.map((fn) => (
              <Badge key={fn} tone="sage">
                {FUNCTION_LABELS[fn]}
              </Badge>
            ))}
          </div>

          <div role="tablist" className="mb-6 flex gap-1 overflow-x-auto rounded-full bg-sand-100 p-1">
            {TABS.map((item) => (
              <button
                key={item}
                role="tab"
                type="button"
                aria-selected={tab === item}
                onClick={() => setTab(item)}
                className={`flex-none rounded-full px-4 py-2 text-sm font-medium transition ${
                  tab === item ? 'bg-white text-forest-900 shadow-sm' : 'text-sand-900 hover:text-forest-900'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div key={tab} className="animate-fade-up">
            {tab === 'Overview' && <OverviewPanel ingredient={ingredient} />}
            {tab === 'Skin & season' && <SkinSeasonPanel ingredient={ingredient} />}
            {tab === 'Safety' && <SafetyPanel ingredient={ingredient} />}
            {tab === 'pH' && <PhPanel ingredient={ingredient} />}
            {tab === 'Sustainability' && <SustainabilityPanel ingredient={ingredient} />}
          </div>
        </div>

        <div className="flex-none border-t border-sand-200 bg-white/80 px-5 py-4 sm:px-7">
          <Button
            variant={inLab ? 'secondary' : 'primary'}
            className="w-full"
            disabled={!inLab && labFull}
            onClick={() => onToggleLab(ingredient.id)}
            icon={<FlaskConical className="h-4 w-4" aria-hidden />}
          >
            {inLab ? 'Remove from combination lab' : labFull ? 'Combination lab is full' : 'Add to combination lab'}
          </Button>
        </div>
      </div>
    </div>
  );
}
