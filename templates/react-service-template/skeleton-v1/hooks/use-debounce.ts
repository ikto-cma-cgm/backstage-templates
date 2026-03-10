/**
 * useDebounce Hook
 *
 * Best Practices:
 * - Prevents excessive function calls (e.g., API requests on input)
 * - Cleans up timeout on unmount
 * - Type-safe generic implementation
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 */

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up timeout to update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up timeout if value changes or component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}