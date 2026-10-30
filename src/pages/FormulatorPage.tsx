import { useMemo, useState } from 'react';
import { buildFormulation, type FormulationInput } from '@/lib/formulation';
import FormulatorForm from '@/components/formulator/FormulatorForm';
import FormulationResult from '@/components/formulator/FormulationResult';

interface FormulatorPageProps {
  onOpen: (id: string) => void;
}

const INITIAL_INPUT: FormulationInput = {
  category: 'skincare',
  benefits: ['moisturizing', 'emollient', 'thickening'],
  climate: 'dry-climate',
  skin: null,
  preferAgriWaste: false,
  avoidColourants: false,
};

export default function FormulatorPage({ onOpen }: FormulatorPageProps) {
  const [input, setInput] = useState<FormulationInput>(INITIAL_INPUT);
  const draft = useMemo(
    () => (input.benefits.length > 0 ? buildFormulation(input) : null),
    [input],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <header className="animate-fade-up max-w-3xl space-y-3">
        <p className="eyebrow">Smart Formulation Assistant</p>
        <h1 className="text-4xl font-semibold text-forest-900 sm:text-5xl">Build a bio-based formulation draft</h1>
        <p className="text-base text-sand-900">
          Choose a category, benefits and conditions. The assistant proposes ingredients with the evidence level behind each one.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
        <FormulatorForm input={input} onChange={setInput} />
        <div className="lg:sticky lg:top-24">
          {draft ? (
            <FormulationResult draft={draft} skin={input.skin} onOpen={onOpen} />
          ) : (
            <div className="card px-6 py-16 text-center">
              <p className="font-display text-2xl text-forest-900">Select a benefit to begin</p>
              <p className="mt-2 text-sm text-sand-900">A structured draft will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
