const apiBase = (import.meta.env.VITE_API_BASE_URL || "/api/v1").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(readonly status: number) {
    super("The request could not be completed.");
    this.name = "ApiError";
  }
}

export async function requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  const headers = new Headers(init.headers);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  try {
    response = await fetch(`${apiBase}${path}`, {
      ...init,
      headers,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(0);
  }

  if (!response.ok) throw new ApiError(response.status);

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError(response.status);
  }
}
