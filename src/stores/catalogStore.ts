import { createStore } from "zustand/vanilla";
import type { CatalogState, CatalogStore } from "@/types/store";

export const defaultCatalogState: CatalogState = {
  sortBy: "rating-desc",
};

export const createCatalogStore = (initState: CatalogState = defaultCatalogState) => {
  return createStore<CatalogStore>()((set) => ({
    ...initState,
    actions: {
      setSortBy: (value) => set({ sortBy: value }),
    },
  }));
};
