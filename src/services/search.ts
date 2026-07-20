import { API_URL } from "@/constants";
import { SearchResultListDtoSchema } from "@/services/schemas";
import { parseWith } from "@/shared/parseWith";
import type { Result } from "@/types/result";
import type { Show } from "@/types/show";
import { apiFetch } from "./http";

export async function searchShows(query: string, signal?: AbortSignal): Promise<Result<Show[]>> {
  const response = await apiFetch(`${API_URL}/search/shows?q=${encodeURIComponent(query)}`, signal);
  const result = parseWith(response, SearchResultListDtoSchema);
  if (!result.ok) return result;
  return { ok: true, data: result.data.map((item) => item.show) };
}
