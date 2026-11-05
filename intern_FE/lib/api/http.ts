import type { ApiErrorBody } from "@/types/api";

/** Thrown for every non-2xx response so callers can branch on `status`. */
export class ApiError extends Error {
  readonly status: number;
  readonly messages: string[];

  constructor(status: number, messages: string[]) {
    super(messages[0] ?? `Request failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.messages = messages;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string;
};

/**
 * Single fetch wrapper used on both server and client. JSON in, JSON out,
 * errors normalised to ApiError. Never caches: content is CMS-driven and
 * must reflect admin edits immediately.
 */
export async function apiFetch<T>(baseUrl: string, path: string, options: RequestOptions = {}): Promise<T> {
  const { body, token, headers, ...rest } = options;
  const init: RequestInit = {
    ...rest,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(body !== undefined && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers as Record<string, string> | undefined),
    },
    body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
  };

  const response = await fetch(`${baseUrl}${path}`, init);
  const text = await response.text();
  const json = text ? safeJson(text) : null;

  if (!response.ok) {
    const errorBody = json as ApiErrorBody | null;
    const messages = Array.isArray(errorBody?.message)
      ? errorBody.message
      : [typeof errorBody?.message === "string" ? errorBody.message : `Request failed (${response.status})`];
    throw new ApiError(response.status, messages);
  }
  return json as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
