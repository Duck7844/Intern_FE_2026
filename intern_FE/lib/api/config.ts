/**
 * Where the NestJS API lives.
 * - Server Components and route handlers use API_URL (private, may be an
 *   internal address in production).
 * - Browser code uses NEXT_PUBLIC_API_URL.
 */
const DEFAULT_API_URL = "http://localhost:3000";

export function serverApiUrl(): string {
  return (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL).replace(/\/$/, "");
}

export const PUBLIC_API_URL = (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL).replace(/\/$/, "");

/**
 * Turns an image URL stored by the CMS into something next/image can load.
 * `/uploads/...` is kept relative: next.config.ts rewrites that path to the
 * API, so the image is same-origin and the Next image optimizer accepts it
 * (it refuses remote hosts on localhost / private IPs). `/images/...` is a
 * static frontend asset and absolute URLs pass through.
 */
export function resolveMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return url;
}

/** Cookie that carries the admin JWT between the browser and Next route handlers only. */
export const ADMIN_COOKIE = "pw_admin_token";

/** Cookie for signed-in website visitors (Sign in / Sign up in the header). */
export const USER_COOKIE = "pw_token";
