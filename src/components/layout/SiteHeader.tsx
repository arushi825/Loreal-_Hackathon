import { useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';
import type { Route } from '@/lib/useHashRoute';

const NAV_ITEMS: { route: Route; label: string }[] = [
  { route: 'database', label: 'Ingredient Database' },
  { route: 'alternatives', label: 'Alternatives' },
  { route: 'lab', label: 'Combination Lab' },
  { route: 'formulator', label: 'Formulator' },
];

interface SiteHeaderProps {
  route: Route;
  onNavigate: (route: Route) => void;
}

export default function SiteHeader({ route, onNavigate }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  const go = (next: Route) => {
    onNavigate(next);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => go('home')}
          className="group flex items-center gap-2.5 rounded-full pr-2"
          aria-label="Verdant Lab home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-700 text-white transition group-hover:rotate-[-8deg]">
            <Leaf className="h-4.5 w-4.5" aria-hidden />
          </span>
          <span className="font-display text-lg font-semibold text-forest-900">Verdant Lab</span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.route}
              type="button"
              onClick={() => go(item.route)}
              aria-current={route === item.route ? 'page' : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                route === item.route
                  ? 'bg-forest-700 text-white'
                  : 'text-forest-800 hover:bg-sage-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-forest-800 ring-1 ring-sand-300 transition hover:bg-sage-100 lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {open && (
        <nav className="animate-fade-up border-t border-sand-200 bg-paper px-4 py-3 lg:hidden" aria-label="Mobile">
          <div className="grid gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.route}
                type="button"
                onClick={() => go(item.route)}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  route === item.route ? 'bg-forest-700 text-white' : 'text-forest-900 hover:bg-sage-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
