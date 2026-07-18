import { AppLoader } from "@/components/AppLoader";
import { ShowCard } from "@/components/ShowCard";
import type { Show } from "@/types/show";

type SearchResultsProps = {
  searchQuery: string;
  hasSearched: boolean;
  shows: Show[];
  searchError: string | null;
  loading: boolean;
};

export function SearchResults({ searchQuery, hasSearched, shows, searchError, loading }: SearchResultsProps) {
  if (loading) {
    return <AppLoader message="Searching..." />;
  }

  if (searchError) {
    return <div role="alert">{searchError}</div>;
  }

  if (hasSearched && shows.length === 0) {
    return <div className="text-center">No shows found matching &quot;{searchQuery}&quot;</div>;
  }

  return (
    <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
      {shows.map((show) => (
        <li key={show.id}>
          <ShowCard show={show} />
        </li>
      ))}
    </ul>
  );
}
