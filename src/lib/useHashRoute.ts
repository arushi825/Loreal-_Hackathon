import { useCallback, useEffect, useState } from 'react';

export type Route = 'home' | 'database' | 'alternatives' | 'lab' | 'formulator';

const ROUTES: Route[] = ['home', 'database', 'alternatives', 'lab', 'formulator'];

function readRoute(): Route {
  const value = window.location.hash.replace(/^#\/?/, '');
  return (ROUTES as string[]).includes(value) ? (value as Route) : 'home';
}

export function useHashRoute(): [Route, (route: Route) => void] {
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((next: Route) => {
    window.location.hash = `/${next}`;
  }, []);

  return [route, navigate];
}
