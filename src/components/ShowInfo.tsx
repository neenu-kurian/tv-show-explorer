import { PhotoIcon } from "@heroicons/react/24/outline";
import { htmlToText } from "@/shared/htmlToText";
import { ShowPoster } from "@/components/ShowPoster";
import { ShowRating } from "@/components/ShowRating";
import { InfoChip } from "@/components/InfoChip";
import type { Show } from "@/types/show";

type ShowInfoProps = {
  show: Show;
};

export function ShowInfo({ show }: ShowInfoProps) {
  const summaryText = htmlToText(show.summary ?? "No description available");
  const premieredYear = show.premiered ? new Date(show.premiered).getFullYear().toString() : null;

  return (
    <div className="gap-6 p-5 md:flex">
      <div className="relative mx-auto aspect-poster shrink-0 overflow-hidden rounded-xl shadow-lg md:max-w-80">
        <ShowPoster src={show.image?.original} alt={show.name ?? "Show Poster"} loading="eager">
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <PhotoIcon className="h-1/3 w-1/3" role="img" aria-label="No Image Available" />
          </div>
        </ShowPoster>
        {show.rating.average ? (
          <ShowRating score={show.rating.average} className="left-2 top-3 rounded-badge bg-black/80 px-2.5 py-1.5 text-white" />
        ) : null}
      </div>
      <div className="flex-1">
        {show.name ? <h1 className="mb-3 text-display text-black">{show.name}</h1> : null}
        <div className="mb-4 flex flex-wrap gap-2">
          {premieredYear ? <InfoChip label="Year" value={premieredYear} /> : null}
          {show.runtime ? <InfoChip label="Duration" value={`${show.runtime}m`} /> : null}
          <InfoChip label="Status" value={show.status} />
        </div>
        {show.genres.length ? (
          <div className="mb-4 flex flex-wrap gap-2">
            {show.genres.map((genre) => (
              <InfoChip key={genre} label={genre} />
            ))}
          </div>
        ) : null}
        <div className="mb-8 whitespace-pre-line leading-relaxed text-black">{summaryText}</div>
      </div>
    </div>
  );
}
