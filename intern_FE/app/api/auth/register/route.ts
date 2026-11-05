import { NextResponse } from "next/server";
import { USER_COOKIE, serverApiUrl } from "@/lib/api/config";
import { apiFetch, isApiError } from "@/lib/api/http";
import { setSessionCookie } from "@/lib/api/session-cookie";
import type { AuthUser, LoginResponse } from "@/types/api";

/**
 * POST /api/auth/register  { name, email, password }
 * Creates the account through the API (always role `user`), then signs the
 * new user in straight away so they land on the site with a session cookie.
 */
export async function POST(request: Request) {
  let body: { name?: unknown; email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }
  if (typeof body.name !== "string" || typeof body.email !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ message: "Name, email and password are required" }, { status: 400 });
  }

  try {
    await apiFetch<AuthUser>(serverApiUrl(), "/auth/register", {
      method: "POST",
      body: { name: body.name, email: body.email, password: body.password },
    });
    const login = await apiFetch<LoginResponse>(serverApiUrl(), "/auth/login", {
      method: "POST",
      body: { email: body.email, password: body.password },
    });
    await setSessionCookie(USER_COOKIE, login.access_token, login.expires_in);
    return NextResponse.json({ user: login.user }, { status: 201 });
  } catch (error) {
    if (isApiError(error)) {
      return NextResponse.json({ message: error.messages.join(" ") }, { status: error.status });
    }
    console.error("register failed", error);
    return NextResponse.json({ message: "The server is not reachable right now" }, { status: 502 });
  }
}
