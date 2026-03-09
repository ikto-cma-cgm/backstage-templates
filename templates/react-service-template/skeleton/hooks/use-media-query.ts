/**
 * useMediaQuery Hook
 *
 * Best Practices:
 * - SSR-safe (returns false on server)
 * - Cleans up event listeners
 * - Responsive design helper
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Define event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener (modern browsers)
    mediaQuery.addEventListener('change', handleChange);

    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

// Predefined breakpoints for convenience
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () =>
  useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');