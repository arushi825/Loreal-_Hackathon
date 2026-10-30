import { ArrowRight, FlaskConical, Layers, Leaf, Recycle, Search, Sprout } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import type { Route } from '@/lib/useHashRoute';
import { ALL_CATEGORIES, CATEGORY_LABELS } from '@/data/taxonomy';

const HERO_IMAGE = 'https://images.pexels.com/photos/12448627/pexels-photo-12448627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const GALLERY = [
  'https://images.pexels.com/photos/15119252/pexels-photo-15119252.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5852289/pexels-photo-5852289.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/20737632/pexels-photo-20737632.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const STEPS = [
  { icon: Search, title: 'Discover', text: 'Search bio-based ingredients by source, function and skin type.' },
  { icon: Recycle, title: 'Replace', text: 'Swap a conventional ingredient for ranked bio-based alternatives.' },
  { icon: FlaskConical, title: 'Combine', text: 'Screen pairs for reference compatibility and pH overlap.' },
  { icon: Layers, title: 'Formulate', text: 'Get a structured draft with the evidence behind each choice.' },
];

interface HomePageProps {
  onNavigate: (route: Route) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-24 pb-8">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-20">
        <div className="animate-fade-up space-y-7">
          <Badge tone="mint" icon={<Sprout className="h-3.5 w-3.5" aria-hidden />}>
            Sustainable formulation research
          </Badge>
          <h1 className="text-5xl font-semibold leading-[1.05] text-forest-900 sm:text-6xl">
            Grow better formulas from <span className="italic text-olive-700">bio-based</span> ingredients
          </h1>
          <p className="max-w-xl text-lg text-sand-900">
            Find plant, algae, fermentation and agri-waste alternatives to conventional ingredients. Screen how they
            combine, see the evidence behind each one, and plan what needs lab testing.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => onNavigate('database')} icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
              Explore Bio-Ingredients
            </Button>
            <Button variant="secondary" onClick={() => onNavigate('formulator')}>
              Build a Formulation
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('alternatives')}>
              Compare Alternatives
            </Button>
          </div>
        </div>

        <div className="animate-fade-up relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-sage-200/70 to-sand-200/70 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-lift">
            <img src={HERO_IMAGE} alt="Aloe vera plant in natural light" className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]" />
            <div className="absolute bottom-4 left-4 right-4 rounded-3xl bg-white/90 p-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-olive-700">Live example</p>
                  <p className="font-display text-lg font-semibold text-forest-900">Aloe Leaf Juice</p>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  <Badge tone="mint">Established</Badge>
                  <Badge tone="olive">Plant</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.title} className="card group p-6 transition hover:-translate-y-1 hover:shadow-lift">
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-forest-700 transition group-hover:bg-forest-700 group-hover:text-white">
                  <step.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-display text-3xl text-sand-300">0{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-forest-900">{step.title}</h3>
              <p className="mt-2 text-sm text-sand-900">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <div className="space-y-4">
          <p className="eyebrow">Transparent by design</p>
          <h2 className="text-4xl font-semibold text-forest-900">Evidence is labelled, never assumed</h2>
          <p className="text-sand-900">
            Each ingredient shows whether its function is established, has limited data, or is not verified. Usage limits and
            clinical claims are deliberately left out until they can be validated.
          </p>
          <div className="flex items-center gap-3 pt-2 text-sm text-forest-800">
            <Leaf className="h-4 w-4 text-olive-700" aria-hidden />
            Sustainability data covers renewability, by-product use and extraction.
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {GALLERY.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              className={`w-full rounded-3xl object-cover shadow-card ${index === 1 ? 'mt-8' : ''} aspect-[3/4]`}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Product categories</p>
            <h2 className="mt-2 text-4xl font-semibold text-forest-900">Built for the products you make</h2>
          </div>
          <Button variant="secondary" onClick={() => onNavigate('formulator')}>
            Start a draft
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {ALL_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onNavigate('formulator')}
              className="card group flex items-center justify-between px-5 py-5 text-left transition hover:-translate-y-0.5 hover:bg-sage-50"
            >
              <span className="font-medium text-forest-900">{CATEGORY_LABELS[category]}</span>
              <ArrowRight className="h-4 w-4 text-olive-700 transition group-hover:translate-x-1" aria-hidden />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
