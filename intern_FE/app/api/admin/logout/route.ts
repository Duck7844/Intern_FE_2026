import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/api/config";

/** POST /api/admin/logout – clears the admin cookie server-side. */
export async function POST(request: Request) {
  if (request.headers.get("x-requested-with") !== "fetch") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  const store = await cookies();
  store.set({ name: ADMIN_COOKIE, value: "", httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
