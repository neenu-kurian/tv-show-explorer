import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import { ShowDetailContent } from "@/components/ShowDetailContent";
import { fetchShowData } from "@/services/shows";
import { fetchCastData } from "@/services/cast";
import { getErrorMessage } from "@/shared/errorMapper";

type ShowDetailPageProps = {
  params: { id: string };
};

export default async function ShowDetailPage({ params }: ShowDetailPageProps) {
  const id = Number(params.id);
  const showResult = await fetchShowData(id, undefined, 3600);

  if (!showResult.ok) {
    if (showResult.error.type === "NOT_FOUND") {
      notFound();
    }
    return (
      <div>
        <BackLink />
        <div className="text-center" role="alert">
          {getErrorMessage(showResult.error)}
        </div>
      </div>
    );
  }

  const castResult = await fetchCastData(id, undefined, 3600);
  const cast = castResult.ok ? castResult.data : [];
  const castError = castResult.ok ? null : getErrorMessage(castResult.error);

  return (
    <div>
      <BackLink />
      <ShowDetailContent show={showResult.data} cast={cast} castError={castError} castLoading={false} />
    </div>
  );
}

function BackLink() {
  return (
    <Link
      href="/"
      className="my-7 ml-3 inline-flex items-center gap-2 text-base font-medium text-black hover:opacity-70 focus-visible:outline-none focus-ring"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      Back to shows
    </Link>
  );
}
