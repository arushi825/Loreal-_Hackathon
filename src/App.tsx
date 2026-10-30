import { useCallback, useEffect, useState } from 'react';
import { useHashRoute } from '@/lib/useHashRoute';
import { MAX_COMBINATION_SIZE } from '@/lib/compatibility';
import { getIngredientById } from '@/data/ingredients';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import IngredientDrawer from '@/components/ingredients/IngredientDrawer';
import HomePage from '@/pages/HomePage';
import DatabasePage from '@/pages/DatabasePage';
import AlternativesPage from '@/pages/AlternativesPage';
import LabPage from '@/pages/LabPage';
import FormulatorPage from '@/pages/FormulatorPage';

function App() {
  const [route, navigate] = useHashRoute();
  const [labIds, setLabIds] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route]);

  const toggleLab = useCallback((id: string) => {
    setLabIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= MAX_COMBINATION_SIZE) return prev;
      return [...prev, id];
    });
  }, []);

  const openIngredient = useCallback((id: string) => setOpenId(id), []);
  const closeIngredient = useCallback(() => setOpenId(null), []);

  const openedIngredient = openId ? getIngredientById(openId) : undefined;
  const labFull = labIds.length >= MAX_COMBINATION_SIZE;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader route={route} onNavigate={navigate} />

      <main className="flex-1">
        {route === 'home' && <HomePage onNavigate={navigate} />}
        {route === 'database' && <DatabasePage labIds={labIds} onToggleLab={toggleLab} onOpen={openIngredient} />}
        {route === 'alternatives' && <AlternativesPage onOpen={openIngredient} />}
        {route === 'lab' && <LabPage labIds={labIds} onToggleLab={toggleLab} onOpen={openIngredient} />}
        {route === 'formulator' && <FormulatorPage onOpen={openIngredient} />}
      </main>

      <SiteFooter />

      {openedIngredient && (
        <IngredientDrawer
          key={openedIngredient.id}
          ingredient={openedIngredient}
          onClose={closeIngredient}
          inLab={labIds.includes(openedIngredient.id)}
          labFull={labFull}
          onToggleLab={toggleLab}
        />
      )}
    </div>
  );
}

export default App;
