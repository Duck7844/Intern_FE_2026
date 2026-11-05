import "server-only";
import { cookies } from "next/headers";
import type { AuthUser } from "@/types/api";
import { USER_COOKIE, serverApiUrl } from "./config";
import { apiFetch, isApiError } from "./http";

/**
 * The signed-in website visitor, verified against the API (GET /auth/me) on
 * every request. Null when there is no cookie or the token is invalid/expired.
 * Any API outage is treated as "signed out" so the public pages keep working.
 */
export async function getUserSession(): Promise<AuthUser | null> {
  const token = (await cookies()).get(USER_COOKIE)?.value;
  if (!token) return null;
  try {
    return await apiFetch<AuthUser>(serverApiUrl(), "/auth/me", { token });
  } catch (error) {
    if (!isApiError(error)) console.error("user session check failed", error);
    return null;
  }
}
