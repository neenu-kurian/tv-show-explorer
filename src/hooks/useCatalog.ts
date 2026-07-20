"use client";

import { useMemo } from "react";
import { sortShows } from "@/shared/normaliser";
import { useCatalogStore } from "@/providers/CatalogStoreProvider";
import type { CategorizedShows } from "@/types/show";

export function useCatalog(catalogData: CategorizedShows) {
  const sortBy = useCatalogStore((state) => state.sortBy);
  const { setSortBy } = useCatalogStore((state) => state.actions);

  const sortedCatalogData = useMemo(
    () => sortShows(catalogData, sortBy),
    [catalogData, sortBy],
  );

  return {
    catalogData: sortedCatalogData,
    sortBy,
    setSortBy,
  };
}
