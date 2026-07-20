"use client";

import { type ReactNode, createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createCatalogStore } from "@/stores/catalogStore";
import type { CatalogStore } from "@/types/store";

type CatalogStoreApi = ReturnType<typeof createCatalogStore>;

const CatalogStoreContext = createContext<CatalogStoreApi | null>(null);

export function CatalogStoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createCatalogStore());

  return (
    <CatalogStoreContext.Provider value={store}>
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
