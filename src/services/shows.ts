import { API_URL } from "@/constants";
import { ShowDtoSchema, ShowListDtoSchema } from "@/services/schemas";
import { parseWith } from "@/shared/parseWith";
import type { Result } from "@/types/result";
import type { Show } from "@/types/show";
import { apiFetch } from "./http";

export async function fetchShows(signal?: AbortSignal, revalidate?: number): Promise<Result<Show[]>> {
  const response = await apiFetch(`${API_URL}/shows`, signal, revalidate);
  return parseWith(response, ShowListDtoSchema);
}

export async function fetchShowData(
  id: number,
  signal?: AbortSignal,
  revalidate?: number,
): Promise<Result<Show>> {
  const response = await apiFetch(`${API_URL}/shows/${id}`, signal, revalidate);
  return parseWith(response, ShowDtoSchema);
}
