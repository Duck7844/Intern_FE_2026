import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, serverApiUrl } from "@/lib/api/config";
import { apiFetch, isApiError } from "@/lib/api/http";
import type { LoginResponse } from "@/types/api";

/**
 * POST /api/admin/login  { email, password }
 * Exchanges credentials with the API, refuses non-admin accounts, and stores
 * the JWT in an HttpOnly cookie that only Next route handlers can read.
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

    if (login.user.role !== "admin") {
      return NextResponse.json({ message: "This account does not have admin access" }, { status: 403 });
    }

    const store = await cookies();
    store.set({
      name: ADMIN_COOKIE,
      value: login.access_token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: login.expires_in,
    });

    return NextResponse.json({ user: login.user });
  } catch (error) {
    if (isApiError(error)) {
      const status = error.status === 401 ? 401 : error.status;
      return NextResponse.json({ message: error.message }, { status });
    }
    console.error("admin login failed", error);
    return NextResponse.json({ message: "The API is not reachable right now" }, { status: 502 });
  }
}
