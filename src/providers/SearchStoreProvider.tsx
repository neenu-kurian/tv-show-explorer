"use client";

import { type ReactNode, createContext, useContext, useEffect, useRef } from "react";
import { useStore } from "zustand";
import { createSearchStore, type SearchStore } from "@/stores/searchStore";

type SearchStoreApi = ReturnType<typeof createSearchStore>;

const SearchStoreContext = createContext<SearchStoreApi | null>(null);

export function SearchStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<SearchStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createSearchStore();
  }

  useEffect(() => {
    storeRef.current?.persist.rehydrate();
  }, []);

  return (
    <SearchStoreContext.Provider value={storeRef.current}>
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
