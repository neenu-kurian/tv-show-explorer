"use client";

import { useMemo } from "react";
import { SearchInput } from "@/components/SearchInput";
import { SearchResults } from "@/components/SearchResults";
import { ShowCatalog } from "@/components/ShowCatalog";
import { SortDropdown } from "@/components/SortDropdown";
import { useCatalog } from "@/hooks/useCatalog";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { sortOptions } from "@/constants";
import type { HomePageClientProps } from "@/types/components";

export function HomePageClient({ catalogData, error }: HomePageClientProps) {
  const { catalogData: sortedCatalogData, sortBy, setSortBy } = useCatalog(catalogData);
  const { searchQuery, searchLoading, hasSearched, searchError, shows, handleSearch } =
    useDebouncedSearch();

  const shouldShowSearchResults = useMemo(() => {
    return searchLoading || hasSearched || searchQuery.trim() !== "";
  }, [hasSearched, searchLoading, searchQuery]);

  return (
    <>
      <header className="sticky top-0 z-10 mb-8 flex flex-col gap-4 bg-white py-6 shadow-md">
        <h1 className="text-center text-3xl font-bold text-gray-900 md:ml-5 md:text-left">
          TV Maze
        </h1>
        <div className="w-full items-center gap-16 px-5 md:flex">
          <SearchInput
            value={searchQuery}
            onChange={handleSearch}
            onSubmit={handleSearch}
            placeholder="Search for TV shows..."
          />
          <SortDropdown
            value={sortBy}
            options={sortOptions}
            onChange={setSortBy}
            className="mt-5 md:mt-0"
          />
        </div>
      </header>

      <div className="mt-14 pl-10">
        {shouldShowSearchResults ? (
          <SearchResults
            searchQuery={searchQuery}
            shows={shows}
            searchError={searchError}
            loading={searchLoading}
            hasSearched={hasSearched}
          />
        ) : (
          <ShowCatalog loading={false} error={error} catalogData={sortedCatalogData} />
        )}
      </div>
    </>
  );
}
