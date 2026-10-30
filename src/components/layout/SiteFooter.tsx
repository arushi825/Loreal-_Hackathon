import { Leaf } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-sand-200 bg-sand-50/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-700 text-white">
              <Leaf className="h-4 w-4" aria-hidden />
            </span>
            <span className="font-display text-lg font-semibold">Verdant Lab</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-sand-900">
            A research-support prototype. Every compatibility, pH and suitability result is a guide for
            laboratory planning, not an experimental finding or a product safety determination.
          </p>
        </div>
        <div className="text-sm text-sand-900 lg:text-right">
          <p className="font-medium text-forest-900">Data labels</p>
          <p className="mt-2">
            Entries marked &ldquo;Established&rdquo;, &ldquo;Limited&rdquo; or &ldquo;Not verified&rdquo; show the
            strength of the underlying information. Nothing here is a usage limit or a clinical claim.
          </p>
        </div>
      </div>
    </footer>
  );
}
