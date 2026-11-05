import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { AdminShell, AdminShellSkeleton } from "@/components/admin/admin-shell";
import { getAdminSession } from "@/lib/api/admin-session";
import type { AuthUser } from "@/types/api";

/**
 * Every signed-in admin screen renders through this guard. The session is
 * verified against the API (GET /auth/me) on each request, so a revoked or
 * expired token, or a non-admin account, is sent back to the login page.
 * `cookies()` is request data, hence the Suspense boundary.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<AdminShellSkeleton />}>
      <Guard>{children}</Guard>
    </Suspense>
  );
}

async function Guard({ children }: { children: ReactNode }) {
  let session: { user: AuthUser; token: string } | null;
  try {
    session = await getAdminSession();
  } catch (error) {
    // Network failure (API down) rather than an auth failure: say so instead
    // of crashing the page with "fetch failed".
    console.error("admin session check failed", error);
    return <ApiUnavailable />;
  }
  if (!session) redirect("/admin/login?reason=expired");
  return <AdminShell email={session.user.email}>{children}</AdminShell>;
}

function ApiUnavailable() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-s border border-stroke-light bg-white p-8 text-center">
        <h1 className="font-sans text-h4 font-bold tracking-normal text-ink">API is not reachable</h1>
        <p className="mt-2 text-body3 text-ink-secondary">
          The admin area needs the backend API (intern_be). Start it, then reload this page.
        </p>
        <pre className="mt-4 rounded-xs bg-surface-a p-3 text-left text-caption text-ink">
          cd D:\Intern\intern_be{"\n"}npm run start:dev
        </pre>
        <Link href="/admin" className="mt-6 inline-flex h-10 items-center rounded-xs bg-brand px-4 text-btn-xs text-white hover:bg-brand-dark">
          Reload
        </Link>
      </div>
    </main>
  );
}
