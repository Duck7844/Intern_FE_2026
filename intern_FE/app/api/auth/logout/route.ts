import { NextResponse } from "next/server";
import { USER_COOKIE } from "@/lib/api/config";
import { clearSessionCookie } from "@/lib/api/session-cookie";

/** POST /api/auth/logout – clears the visitor session cookie. */
export async function POST(request: Request) {
  if (request.headers.get("x-requested-with") !== "fetch") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  await clearSessionCookie(USER_COOKIE);
  return NextResponse.json({ ok: true });
}
