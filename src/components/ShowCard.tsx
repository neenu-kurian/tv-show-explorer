import Link from "next/link";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { ShowPoster } from "@/components/ShowPoster";
import { ShowRating } from "@/components/ShowRating";
import type { Show } from "@/types/show";

type ShowCardProps = {
  show: Show;
};

export function ShowCard({ show }: ShowCardProps) {
  return (
    <div className="mb-5 flex flex-col gap-2">
      <Link href={`/show/${show.id}`} className="rounded-xl focus-ring">
        <article>
          <div className="relative flex h-96 w-64 flex-col overflow-hidden rounded-xl bg-white shadow-xl transition duration-200 ease-in-out hover:-translate-y-1">
            <ShowPoster src={show.image?.medium} alt={show.name ?? "Show Poster"} className="h-full w-full object-cover">
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <PhotoIcon className="h-1/3 w-1/3" role="img" aria-label="No Image Available" />
              </div>
            </ShowPoster>
            {show.rating.average ? (
              <ShowRating score={show.rating.average} className="top-3 right-3 rounded-badge bg-black/80 px-2.5 py-1.5 text-sm text-white" />
            ) : null}
          </div>
        </article>
      </Link>
      <h3 className="mb-0 mt-2 overflow-hidden px-2 text-left text-base font-medium text-gray-800">
        {show.name}
      </h3>
    </div>
  );
}
