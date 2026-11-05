"use client";

import type { AuthUser } from "@/types/api";

type SessionUser = Omit<AuthUser, "created_at">;

/**
 * Browser-side auth client for website visitors. All calls go to the Next
 * route handlers in app/api/auth, which own the HttpOnly session cookie.
 */
async function post<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Requested-With": "fetch" },
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: "same-origin",
  });
  const json = (await response.json().catch(() => null)) as (T & { message?: string }) | null;
  if (!response.ok) {
    throw new AuthError(response.status, json?.message ?? `Request failed (${response.status})`);
  }
  return json as T;
}

export class AuthError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

export const authApi = {
  login: (input: { email: string; password: string }) => post<{ user: SessionUser }>("/api/auth/login", input),
  register: (input: { name: string; email: string; password: string }) =>
    post<{ user: SessionUser }>("/api/auth/register", input),
  logout: () => post<{ ok: true }>("/api/auth/logout"),
};

/** Only allow redirects to same-site paths (no open redirect). */
export function safeNextPath(value: string | null | undefined, fallback = "/"): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/api/")) return fallback;
  return value;
}
