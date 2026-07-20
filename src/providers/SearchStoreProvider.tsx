"use client";

import { createSearchStore } from "@/stores/searchStore";
import { createStoreContext } from "@/stores/createStoreContext";

export const { Provider: SearchStoreProvider, useStore: useSearchStore } = createStoreContext(
  createSearchStore,
  "SearchStore",
);
