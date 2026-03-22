import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 1023px)';

const getMatches = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(MOBILE_QUERY).matches;
};

export const useViewportMode = (): boolean => {
  const [isNarrowViewport, setIsNarrowViewport] = useState(getMatches);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQueryList = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event: MediaQueryListEvent): void => {
      setIsNarrowViewport(event.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, []);

  return isNarrowViewport;
};
