import { CastInfo } from "@/components/CastInfo";
import { ShowInfo } from "@/components/ShowInfo";
import type { ShowDetailContentProps } from "@/types/components";

export function ShowDetailContent({ show, cast, castError, castLoading }: ShowDetailContentProps) {
  return (
    <>
      <ShowInfo show={show} />
      <CastInfo cast={cast} castError={castError} castLoading={castLoading} />
    </>
  );
}
