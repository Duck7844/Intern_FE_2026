import "server-only";
import { cookies } from "next/headers";

/** HttpOnly session cookie helpers shared by the auth route handlers. */
export async function setSessionCookie(name: string, token: string, maxAge: number) {
  const store = await cookies();
  store.set({
    name,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

export async function clearSessionCookie(name: string) {
  const store = await cookies();
  store.set({ name, value: "", httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
}
