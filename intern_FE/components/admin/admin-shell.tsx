"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { adminApi } from "@/lib/api/admin";
import { cn } from "@/lib/cn";
import { Spinner } from "./ui";

const NAV = [
  { label: "Dashboard", href: "/admin", exact: true },
  { label: "Home page", href: "/admin/home" },
  { label: "Blog posts", href: "/admin/posts" },
  { label: "Contacts", href: "/admin/contacts" },
];

/** Sidebar + top bar wrapper for every signed-in admin screen. */
export function AdminShell({ email, children }: { email: string; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function logout() {
    setSigningOut(true);
    try {
      await adminApi.logout();
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  const nav = (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-xs px-3 py-2 text-body3 font-semibold transition-colors",
              active ? "bg-brand text-white" : "text-ink hover:bg-surface-a",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-stroke-light bg-white px-4 py-6 lg:flex">
        <Link href="/admin" className="px-3 font-heading text-h4 text-brand">
          PACIFICWIDE
        </Link>
        <p className="mb-6 px-3 text-caption uppercase tracking-wide text-ink-secondary">Admin dashboard</p>
        {nav}
        <div className="mt-auto flex flex-col gap-2 px-3 pt-6">
          <Link href="/" target="_blank" rel="noreferrer" className="text-caption text-ink-secondary hover:text-ink">
            View public site ↗
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between gap-4 border-b border-stroke-light bg-white px-4 md:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="admin-mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex size-9 items-center justify-center rounded-xs border border-stroke-light"
            >
              <span className="sr-only">Toggle navigation</span>
              <span aria-hidden className="flex flex-col gap-1">
                <span className="block h-0.5 w-4 bg-ink" />
                <span className="block h-0.5 w-4 bg-ink" />
                <span className="block h-0.5 w-4 bg-ink" />
              </span>
            </button>
            <span className="font-heading text-h5 text-brand">PACIFICWIDE</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="hidden truncate text-body3 text-ink-secondary sm:block" title={email}>
              {email}
            </span>
            <button
              type="button"
              onClick={logout}
              disabled={signingOut}
              className="inline-flex h-9 items-center gap-2 rounded-xs border border-stroke-bold px-3 text-btn-xs text-ink hover:bg-surface-a disabled:opacity-50"
            >
              {signingOut && <Spinner />}
              Sign out
            </button>
          </div>
        </header>

        {menuOpen && (
          <div id="admin-mobile-nav" className="border-b border-stroke-light bg-white p-4 lg:hidden">
            {nav}
          </div>
        )}

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function AdminShellSkeleton() {
  return (
    <div aria-busy="true" className="flex min-h-screen animate-pulse flex-col lg:flex-row">
      <div className="hidden w-64 border-r border-stroke-light bg-white lg:block" />
      <div className="flex-1">
        <div className="h-14 border-b border-stroke-light bg-white" />
        <div className="mx-auto mt-8 w-full max-w-6xl space-y-4 px-4">
          <div className="h-8 w-56 rounded bg-surface" />
          <div className="h-40 rounded-sm bg-white" />
        </div>
      </div>
    </div>
  );
}
