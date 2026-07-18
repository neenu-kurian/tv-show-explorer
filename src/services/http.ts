import type { Result } from "@/types/result";

export async function apiFetch(
  url: string,
  signal?: AbortSignal,
  revalidate?: number,
): Promise<Result<unknown>> {
  const signals = [AbortSignal.timeout(5000)];
  if (signal) signals.push(signal);
  const combinedSignal = AbortSignal.any(signals);
  try {
    const response = await fetch(url, {
      signal: combinedSignal,
      ...(revalidate !== undefined ? { next: { revalidate } } : {}),
    });
    if (!response.ok) {
      if (response.status === 404) {
        return { ok: false, error: { type: "NOT_FOUND" } };
      }
      return { ok: false, error: { type: "SERVER", status: response.status } };
    }
    return { ok: true, data: await response.json() };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { ok: false, error: { type: "ABORTED" } };
    }
    if (err instanceof DOMException && err.name === "TimeoutError") {
      return { ok: false, error: { type: "TIMEOUT", message: "Request timed out" } };
    }
    return {
      ok: false,
      error: { type: "NETWORK", message: err instanceof Error ? err.message : undefined },
    };
  }
}
