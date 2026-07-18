import { HomePageClient } from "@/components/HomePageClient";
import { CatalogStoreProvider } from "@/providers/CatalogStoreProvider";
import { SearchStoreProvider } from "@/providers/SearchStoreProvider";
import { fetchShows } from "@/services/shows";
import { categorizeShows } from "@/shared/normaliser";
import { getErrorMessage } from "@/shared/errorMapper";

export default async function HomePage() {
  const result = await fetchShows(undefined, 3600);
  const catalogData = result.ok ? categorizeShows(result.data) : {};
  const error = result.ok ? null : getErrorMessage(result.error);

  return (
    <SearchStoreProvider>
      <CatalogStoreProvider>
        <HomePageClient catalogData={catalogData} error={error} />
      </CatalogStoreProvider>
    </SearchStoreProvider>
  );
}
