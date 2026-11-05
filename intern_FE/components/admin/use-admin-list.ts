"use client";

import { useCallback, useEffect, useState } from "react";
import { errorMessage } from "./ui";

type Loaded<T> = { key: string; data: T | null; error: string | null };

/**
 * Fetches a listing whenever `key` (page/filter/search) changes and exposes
 * `loading` as "the loaded key differs from the requested key", so no state
 * has to be set synchronously inside the effect. `stale` keeps the previous
 * page on screen (dimmed) while the next one loads.
 */
export function useAdminList<T>(key: string, fetcher: () => Promise<T>) {
  const [state, setState] = useState<Loaded<T> | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((data) => {
        if (!cancelled) setState({ key, data, error: null });
      })
      .catch((e: unknown) => {
        if (!cancelled) setState({ key, data: null, error: errorMessage(e, "Could not load data") });
      });
    return () => {
      cancelled = true;
    };
  }, [key, fetcher, tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);
  const current = state?.key === key ? state : null;

  return {
    data: current?.data ?? null,
    stale: state?.data ?? null,
    error: current?.error ?? null,
    loading: current === null,
    reload,
  };
}
