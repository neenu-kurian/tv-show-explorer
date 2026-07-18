"use client";

import { useEffect, useMemo, useRef } from "react";
import { SEARCH_TIMEOUT } from "@/constants";
import { getErrorMessage } from "@/shared/errorMapper";
import { searchShowsApi } from "@/services/search";
import { useSearchStore } from "@/providers/SearchStoreProvider";

export function useDebouncedSearch() {
  const timeoutRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const searchQuery = useSearchStore((state) => state.searchQuery);
  const searchResult = useSearchStore((state) => state.searchResult);
  const searchLoading = useSearchStore((state) => state.searchLoading);
  const hasSearched = useSearchStore((state) => state.hasSearched);
  const searchError = useSearchStore((state) => state.searchError);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const setSearchResult = useSearchStore((state) => state.setSearchResult);
  const setSearchLoading = useSearchStore((state) => state.setSearchLoading);
  const setHasSearched = useSearchStore((state) => state.setHasSearched);
  const setSearchError = useSearchStore((state) => state.setSearchError);
  const clearSearch = useSearchStore((state) => state.clearSearch);

  const cancelPending = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  };

  const handleSearch = (nextQuery?: string) => {
    const trimmedQuery = (nextQuery ?? searchQuery).trim();
    setSearchQuery(trimmedQuery);
    cancelPending();

    if (trimmedQuery === "") {
      clearSearch();
      return;
    }

    timeoutRef.current = window.setTimeout(async () => {
      setSearchLoading(true);
      setSearchError(null);
      const controller = new AbortController();
      abortRef.current = controller;

      const result = await searchShowsApi(trimmedQuery, controller.signal);
      if (controller.signal.aborted) return;

      if (!result.ok) {
        setSearchResult(result);
        setSearchError(getErrorMessage(result.error));
      } else {
        setSearchResult({ ok: true, data: result.data.map((item) => item.show) });
      }

      setSearchLoading(false);
      setHasSearched(true);
    }, SEARCH_TIMEOUT);
  };

  useEffect(() => {
    return () => {
      cancelPending();
    };
  }, []);

  const shows = useMemo(() => {
    if (!searchResult?.ok) return [];
    return searchResult.data;
  }, [searchResult]);

  return {
    searchQuery,
    setSearchQuery: (value: string) => {
      setSearchQuery(value);
      if (value.trim() === "") {
        clearSearch();
        return;
      }
      handleSearch(value);
    },
    searchLoading,
    hasSearched,
    searchError,
    shows,
    handleSearch,
    clearSearch,
  };
}
