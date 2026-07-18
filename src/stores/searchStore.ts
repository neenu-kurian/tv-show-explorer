import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSessionStorage } from "@/stores/createSessionStorage";
import type { Result } from "@/types/result";
import type { Show } from "@/types/show";

export type SearchState = {
  searchQuery: string;
  searchResult: Result<Show[]> | null;
  searchLoading: boolean;
  hasSearched: boolean;
  searchError: string | null;
};

export type SearchActions = {
  setSearchQuery: (value: string) => void;
  setSearchResult: (value: Result<Show[]> | null) => void;
  setSearchLoading: (value: boolean) => void;
  setHasSearched: (value: boolean) => void;
  setSearchError: (value: string | null) => void;
  clearSearch: () => void;
};

export type SearchStore = SearchState & SearchActions;

export const defaultSearchState: SearchState = {
  searchQuery: "",
  searchResult: null,
  searchLoading: false,
  hasSearched: false,
  searchError: null,
};

export const createSearchStore = (initState: SearchState = defaultSearchState) => {
  return createStore<SearchStore>()(
    persist(
      (set) => ({
        ...initState,
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
      }),
      {
        name: "show-explorer-search",
        storage: createJSONStorage(() => createSessionStorage()),
        // Rehydration happens manually (see SearchStoreProvider) so the
        // client's first render matches the server-rendered HTML.
        skipHydration: true,
        partialize: (state) => ({
          searchQuery: state.searchQuery,
          searchResult: state.searchResult,
          hasSearched: state.hasSearched,
          searchError: state.searchError,
        }),
      },
    ),
  );
};
