import type { Result } from "./result";
import type { Show, SortBy } from "./show";

export type CatalogState = {
  sortBy: SortBy;
};

export type CatalogActions = {
  setSortBy: (value: SortBy) => void;
};

export type CatalogStore = CatalogState & { actions: CatalogActions };

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

export type SearchStore = SearchState & { actions: SearchActions };
