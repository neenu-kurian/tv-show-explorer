"use client";

import { type ReactNode, createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createSearchStore } from "@/stores/searchStore";
import type { SearchStore } from "@/types/store";

type SearchStoreApi = ReturnType<typeof createSearchStore>;

const SearchStoreContext = createContext<SearchStoreApi | null>(null);

export function SearchStoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createSearchStore());

  return (
    <SearchStoreContext.Provider value={store}>
      {children}
    </SearchStoreContext.Provider>
  );
}

export function useSearchStore<T>(selector: (state: SearchStore) => T): T {
  const store = useContext(SearchStoreContext);
  if (!store) {
    throw new Error("useSearchStore must be used within SearchStoreProvider");
  }
  return useStore(store, selector);
}
