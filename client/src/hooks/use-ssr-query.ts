import { useQuery } from "convex/react";
import { useMemo } from "react";
import { useInitialData } from "./use-initial-data";

/**
 * A wrapper around useQuery that supports initial data from SSR.
 */
export function useSSRQuery(query: any, args: any, initialKey?: string) {
  const queryResult = useQuery(query, args);
  const initialData = useInitialData();

  return useMemo(() => {
    // If we have a real query result, use it
    if (queryResult !== undefined) {
      return queryResult;
    }

    // Use initial data if available (on server or during hydration)
    if (initialKey && initialData[initialKey]) {
      return initialData[initialKey];
    }

    return undefined;
  }, [queryResult, initialKey, initialData]);
}
