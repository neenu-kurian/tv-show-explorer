import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSessionStorage } from "@/stores/createSessionStorage";
import type { SortBy } from "@/types/show";

export type CatalogState = {
  sortBy: SortBy;
};

export type CatalogActions = {
  setSortBy: (value: SortBy) => void;
};

export type CatalogStore = CatalogState & CatalogActions;

export const defaultCatalogState: CatalogState = {
  sortBy: "rating-desc",
};

export const createCatalogStore = (initState: CatalogState = defaultCatalogState) => {
  return createStore<CatalogStore>()(
    persist(
      (set) => ({
        ...initState,
        setSortBy: (value) => set({ sortBy: value }),
      }),
      {
        name: "show-explorer-catalog",
        storage: createJSONStorage(() => createSessionStorage()),
        // Rehydration happens manually (see CatalogStoreProvider) so the
        // client's first render matches the server-rendered HTML.
        skipHydration: true,
      },
    ),
  );
};
