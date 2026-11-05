import { NextResponse } from "next/server";
import { USER_COOKIE, serverApiUrl } from "@/lib/api/config";
import { apiFetch, isApiError } from "@/lib/api/http";
import { setSessionCookie } from "@/lib/api/session-cookie";
import type { LoginResponse } from "@/types/api";

/**
 * POST /api/auth/login  { email, password }
 * Website sign-in: exchanges credentials with the API and keeps the JWT in an
 * HttpOnly cookie. The browser never sees the token.
 */
export async function POST(request: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }
  if (typeof body.email !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  try {
    const login = await apiFetch<LoginResponse>(serverApiUrl(), "/auth/login", {
      method: "POST",
      body: { email: body.email, password: body.password },
    });
    await setSessionCookie(USER_COOKIE, login.access_token, login.expires_in);
    return NextResponse.json({ user: login.user });
  } catch (error) {
    if (isApiError(error)) {
      return NextResponse.json({ message: error.messages.join(" ") }, { status: error.status });
    }
    console.error("login failed", error);
    return NextResponse.json({ message: "The server is not reachable right now" }, { status: 502 });
  }
}
