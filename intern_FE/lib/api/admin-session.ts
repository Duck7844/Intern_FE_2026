import "server-only";
import { cookies } from "next/headers";
import type { AuthUser } from "@/types/api";
import { ADMIN_COOKIE, serverApiUrl } from "./config";
import { apiFetch, isApiError } from "./http";

/**
 * Resolves the signed-in admin from the HttpOnly cookie by asking the API,
 * so role and account existence are always verified server-side.
 * Returns null when there is no cookie, the token is invalid/expired, or the
 * user is not an admin.
 */
export async function getAdminSession(): Promise<{ user: AuthUser; token: string } | null> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  try {
    const user = await apiFetch<AuthUser>(serverApiUrl(), "/auth/me", { token });
    return user.role === "admin" ? { user, token } : null;
  } catch (error) {
    if (isApiError(error) && (error.status === 401 || error.status === 403)) return null;
    throw error;
  }
}
