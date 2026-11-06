import "server-only";
import { cookies } from "next/headers";
import type { AuthUser } from "@/types/api";
import { ADMIN_COOKIE, serverApiUrl } from "./config";
import { apiFetch, isApiError } from "./http";

export type AdminSession =
  /** Valid token and the account is an admin. */
  | { status: "ok"; user: AuthUser; token: string }
  /** No cookie, expired/invalid token, or not an admin. */
  | { status: "anonymous" }
  /** The API could not be reached (network error). */
  | { status: "unavailable"; error: unknown };

/**
 * Resolves the signed-in admin from the HttpOnly cookie by asking the API,
 * so role and account existence are always verified server-side.
 *
 * `cookies()` is deliberately awaited outside the try/catch: during static
 * prerendering Next aborts it with an internal signal that must propagate to
 * the Suspense boundary, not be swallowed as a "network error".
 */
export async function getAdminSession(): Promise<AdminSession> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return { status: "anonymous" };
  try {
    const user = await apiFetch<AuthUser>(serverApiUrl(), "/auth/me", { token });
    return user.role === "admin" ? { status: "ok", user, token } : { status: "anonymous" };
  } catch (error) {
    if (isApiError(error)) return { status: "anonymous" };
    return { status: "unavailable", error };
  }
}
