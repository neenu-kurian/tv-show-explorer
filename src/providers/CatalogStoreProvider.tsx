"use client";

import { createCatalogStore } from "@/stores/catalogStore";
import { createStoreContext } from "@/stores/createStoreContext";

export const { Provider: CatalogStoreProvider, useStore: useCatalogStore } = createStoreContext(
  createCatalogStore,
  "CatalogStore",
);
