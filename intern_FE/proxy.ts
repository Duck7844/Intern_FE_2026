import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/api/config";

/**
 * Optimistic guard for the admin area: without the admin cookie, bounce to
 * the login page before rendering anything. The real check (token validity
 * and admin role) happens in the admin layout and on every API call.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const hasCookie = request.cookies.has(ADMIN_COOKIE);

  if (!isLogin && !hasCookie) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
