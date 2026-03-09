/**
 * useFetch Hook
 *
 * Best Practices:
 * - Proper TypeScript generics for type safety
 * - Clean up on unmount to prevent memory leaks
 * - Loading and error states
 * - AbortController for request cancellation
 *
 * @example
 * const { data, loading, error } = useFetch<User[]>('/api/users');
 */

import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(url: string | null): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Don't fetch if URL is null
    if (!url) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    // Create abort controller for cleanup
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await fetch(url, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        // Ignore abort errors
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    }

    fetchData();

    // Cleanup: abort request on unmount
    return () => {
      abortController.abort();
    };
  }, [url]);

  return state;
}