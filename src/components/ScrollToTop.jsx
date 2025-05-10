import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Add timeout to ensure it triggers after rendering
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' }); // change to 'smooth' if preferred
    }, 0);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}

