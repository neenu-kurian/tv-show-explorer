import { AppLoader } from "@/components/AppLoader";
import { CastMemberComponent } from "@/components/CastMember";
import { MAX_CAST_MEMBERS_TO_DISPLAY } from "@/constants";
import type { CastInfoProps } from "@/types/components";

export function CastInfo({ cast, castError, castLoading }: CastInfoProps) {
  const castToDisplay = cast.slice(0, MAX_CAST_MEMBERS_TO_DISPLAY);

  return (
    <>
      <h2 className="mt-5 pl-5 text-title">Top Cast</h2>
      {castLoading ? <AppLoader message="Loading cast..." /> : null}
      {!castLoading && castError ? (
        <div className="text-center" role="alert">
          {castError}
        </div>
      ) : null}
      {!castLoading && !castError && cast.length === 0 ? (
        <div className="mt-5 pl-5 text-left">No cast information available</div>
      ) : null}
      {!castLoading && !castError && cast.length > 0 ? (
        <div className="mb-10 px-5">
          <div className="mt-5 grid grid-cast gap-6">
            {castToDisplay.map((member) => (
              <CastMemberComponent key={member.person.id} member={member} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
