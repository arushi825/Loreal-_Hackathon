import { Plus, Check } from 'lucide-react';
import type { Ingredient } from '@/types';
import { FUNCTION_LABELS, SOURCE_LABELS } from '@/data/taxonomy';
import Badge from '@/components/ui/Badge';
import { EvidenceBadge } from '@/components/ui/StatusBadges';

interface IngredientCardProps {
  ingredient: Ingredient;
  onOpen: (id: string) => void;
  inLab: boolean;
  labFull: boolean;
  onToggleLab: (id: string) => void;
}

export default function IngredientCard({ ingredient, onOpen, inLab, labFull, onToggleLab }: IngredientCardProps) {
  const disabled = !inLab && labFull;

  return (
    <article className="card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <button
        type="button"
        onClick={() => onOpen(ingredient.id)}
        className="relative aspect-[16/10] overflow-hidden text-left"
        aria-label={`Open details for ${ingredient.name}`}
      >
        <img
          src={ingredient.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3">
          <Badge tone="neutral" className="bg-white/90">
            {SOURCE_LABELS[ingredient.source]}
          </Badge>
        </span>
      </button>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-xl font-semibold text-forest-900">{ingredient.name}</h3>
          <p className="mt-0.5 truncate text-xs text-sand-800">{ingredient.inci}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ingredient.functions.map((fn) => (
            <Badge key={fn} tone="sage">
              {FUNCTION_LABELS[fn]}
            </Badge>
          ))}
        </div>

        <p className="line-clamp-2 text-sm text-sand-900">{ingredient.summary}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <EvidenceBadge level={ingredient.evidence.level} />
          <button
            type="button"
            onClick={() => onToggleLab(ingredient.id)}
            disabled={disabled}
            aria-pressed={inLab}
            title={disabled ? 'Combination lab is full' : undefined}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
              inLab
                ? 'bg-forest-700 text-white'
                : 'bg-sage-100 text-forest-800 hover:bg-sage-200'
            }`}
          >
            {inLab ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
            {inLab ? 'In lab' : 'Add to lab'}
          </button>
        </div>
      </div>
    </article>
  );
}
