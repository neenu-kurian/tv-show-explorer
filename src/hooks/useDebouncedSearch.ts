"use client";

import { useEffect, useMemo, useRef } from "react";
import { SEARCH_TIMEOUT } from "@/constants";
import { getErrorMessage } from "@/shared/errorMapper";
import { searchShows } from "@/services/search";
import { useSearchStore } from "@/providers/SearchStoreProvider";

export function useDebouncedSearch() {
  const timeoutRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const searchResult = useSearchStore((state) => state.searchResult);
  const searchLoading = useSearchStore((state) => state.searchLoading);
  const hasSearched = useSearchStore((state) => state.hasSearched);
  const searchError = useSearchStore((state) => state.searchError);
  const {
    setSearchQuery,
    setSearchResult,
    setSearchLoading,
    setHasSearched,
    setSearchError,
    clearSearch,
  } = useSearchStore((state) => state.actions);

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
      const result = await searchShows(trimmedQuery, controller.signal);
      if (controller.signal.aborted) return;
      setSearchResult(result);
      setSearchError(result.ok ? null : getErrorMessage(result.error));
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
    searchLoading,
    hasSearched,
    searchError,
    shows,
    handleSearch,
    clearSearch,
  };
}
