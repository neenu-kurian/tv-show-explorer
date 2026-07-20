import { UserIcon } from "@heroicons/react/24/outline";
import { ShowPoster } from "@/components/ShowPoster";
import type { CastMemberProps } from "@/types/components";

export function CastMemberComponent({ member }: CastMemberProps) {
  return (
    <article className="flex flex-col items-center gap-1 p-1 text-center">
      <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-white shadow-sm">
        <ShowPoster src={member.person.image?.medium} alt={member.person.name}>
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <UserIcon aria-hidden="true" className="h-8 w-8" />
          </div>
        </ShowPoster>
      </div>
      <div>
        {member.person.name}
        {member.character.name ? <div className="text-caption">{member.character.name}</div> : null}
      </div>
    </article>
  );
}
