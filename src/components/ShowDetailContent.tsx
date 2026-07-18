import { CastInfo } from "@/components/CastInfo";
import { ShowInfo } from "@/components/ShowInfo";
import type { CastMember } from "@/types/cast";
import type { Show } from "@/types/show";

type ShowDetailContentProps = {
  show: Show;
  cast: CastMember[];
  castError: string | null;
  castLoading: boolean;
};

export function ShowDetailContent({ show, cast, castError, castLoading }: ShowDetailContentProps) {
  return (
    <>
      <ShowInfo show={show} />
      <CastInfo cast={cast} castError={castError} castLoading={castLoading} />
    </>
  );
}
