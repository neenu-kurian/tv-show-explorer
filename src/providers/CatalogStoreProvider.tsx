"use client";

import { type ReactNode, createContext, useContext, useEffect, useRef } from "react";
import { useStore } from "zustand";
import { createCatalogStore, type CatalogStore } from "@/stores/catalogStore";

type CatalogStoreApi = ReturnType<typeof createCatalogStore>;

const CatalogStoreContext = createContext<CatalogStoreApi | null>(null);

export function CatalogStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<CatalogStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createCatalogStore();
  }

  useEffect(() => {
    storeRef.current?.persist.rehydrate();
  }, []);

  return (
    <CatalogStoreContext.Provider value={storeRef.current}>
      {children}
    </CatalogStoreContext.Provider>
  );
}

export function useCatalogStore<T>(selector: (state: CatalogStore) => T): T {
  const store = useContext(CatalogStoreContext);
  if (!store) {
    throw new Error("useCatalogStore must be used within CatalogStoreProvider");
  }
  return useStore(store, selector);
}
