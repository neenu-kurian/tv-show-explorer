import { createStore } from "zustand/vanilla";
import type { SearchState, SearchStore } from "@/types/store";

export const defaultSearchState: SearchState = {
  searchQuery: "",
  searchResult: null,
  searchLoading: false,
  hasSearched: false,
  searchError: null,
};

export const createSearchStore = (initState: SearchState = defaultSearchState) => {
  return createStore<SearchStore>()((set) => ({
    ...initState,
    actions: {
      setSearchQuery: (value) => set({ searchQuery: value }),
      setSearchResult: (value) => set({ searchResult: value }),
      setSearchLoading: (value) => set({ searchLoading: value }),
      setHasSearched: (value) => set({ hasSearched: value }),
      setSearchError: (value) => set({ searchError: value }),
      clearSearch: () =>
        set({
          searchQuery: "",
          searchResult: null,
          searchLoading: false,
          hasSearched: false,
          searchError: null,
        }),
    },
  }));
};
