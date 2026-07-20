import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { AppLoader } from "@/components/AppLoader";
import { ShowCard } from "@/components/ShowCard";
import type { ShowCatalogProps } from "@/types/components";

export function ShowCatalog({ loading, error, catalogData }: ShowCatalogProps) {
  if (loading) {
    return <AppLoader message="Loading shows..." />;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  const entries = Object.entries(catalogData);
  if (entries.length === 0) {
    return <p>No shows found</p>;
  }

  return (
    <>
      {entries.map(([genre, shows]) => (
        <section key={genre} className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-heading text-gray-900">{genre}</h2>
            <ArrowRightIcon className="h-5 w-5 text-gray-600" />
          </div>
          <ul className="m-0 flex w-full list-none gap-5 overflow-x-auto scroll-smooth p-0 pb-4">
            {shows.map((show) => (
              <li key={show.id}>
                <ShowCard show={show} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
