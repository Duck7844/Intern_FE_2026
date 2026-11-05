import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, serverApiUrl } from "@/lib/api/config";

/**
 * Authenticated proxy: /api/admin/<path> → <API>/<path>
 *
 * - The browser never sees the JWT; it is read from the HttpOnly cookie here.
 * - Only the admin surface of the API can be reached through this proxy.
 * - Mutations must carry `X-Requested-With: fetch` (CSRF defence: a
 *   cross-site form post cannot add custom headers).
 * - The API still verifies the token and the admin role on every call.
 */
const ALLOWED_PREFIXES = ["home-sections", "posts", "contacts", "upload", "stats"];

type Ctx = { params: Promise<{ path: string[] }> };

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;

async function handle(request: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params;
  const target = path.join("/");

  if (!ALLOWED_PREFIXES.includes(path[0] ?? "")) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ message: "Not signed in" }, { status: 401 });
  }

  const mutating = request.method !== "GET";
  if (mutating && request.headers.get("x-requested-with") !== "fetch") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const url = `${serverApiUrl()}/${target}${request.nextUrl.search}`;
  const headers: Record<string, string> = { Authorization: `Bearer ${token}`, Accept: "application/json" };
  const contentType = request.headers.get("content-type");
  if (contentType) headers["Content-Type"] = contentType;

  const init: RequestInit & { duplex?: "half" } = { method: request.method, headers, cache: "no-store" };
  if (mutating && request.body) {
    // Stream the body through untouched (JSON or multipart upload).
    init.body = request.body;
    init.duplex = "half";
  }

  let upstream: Response;
  try {
    upstream = await fetch(url, init);
  } catch (error) {
    console.error("admin proxy: API unreachable", error);
    return NextResponse.json({ message: "The API is not reachable right now" }, { status: 502 });
  }

  // Public pages render per request, so this is belt-and-braces: it also
  // drops any router-cache copy of the static shells after a content change.
  if (mutating && upstream.ok) {
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");
  }

  const text = await upstream.text();
  return new NextResponse(text, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
  });
}
