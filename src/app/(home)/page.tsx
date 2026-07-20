import { HomePage as HomePageContent } from "@/components/HomePage";
import { CatalogStoreProvider } from "@/providers/CatalogStoreProvider";
import { SearchStoreProvider } from "@/providers/SearchStoreProvider";
import { fetchShows } from "@/services/shows";
import { categorizeShows } from "@/shared/normaliser";
import { getErrorMessage } from "@/shared/errorMapper";

export default async function HomePage() {
  const result = await fetchShows(3600);
  const catalogData = result.ok ? categorizeShows(result.data) : {};
  const error = result.ok ? null : getErrorMessage(result.error);

  return (
    <SearchStoreProvider>
      <CatalogStoreProvider>
        <HomePageContent catalogData={catalogData} error={error} />
      </CatalogStoreProvider>
    </SearchStoreProvider>
  );
}
