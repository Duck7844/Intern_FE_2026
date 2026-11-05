"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api/admin";
import type { DashboardStats } from "@/types/api";
import { Card, LoadingBlock, Notice, PageHeader, errorMessage } from "./ui";

export function DashboardStatsView() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    adminApi
      .stats()
      .then((s) => !cancelled && setStats(s))
      .catch((e: unknown) => !cancelled && setError(errorMessage(e, "Could not load statistics")));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageHeader title="Dashboard" description="Overview of the website content." />
      {error && <Notice tone="error">{error}</Notice>}
      {!stats && !error && <LoadingBlock rows={3} />}
      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Blog posts"
            value={stats.posts.total}
            detail={`${stats.posts.published} published · ${stats.posts.draft} draft`}
            href="/admin/posts"
          />
          <StatCard
            title="Contacts"
            value={stats.contacts.total}
            detail={`${stats.contacts.unread} unread · ${stats.contacts.read} read`}
            href="/admin/contacts"
            highlight={stats.contacts.unread > 0}
          />
          <StatCard title="Home sections" value={stats.homeSections} detail="Title, description, image" href="/admin/home" />
        </div>
      )}
      <Card>
        <h2 className="text-body1 font-bold text-ink">Quick actions</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Quick href="/admin/posts/create">New post</Quick>
          <Quick href="/admin/contacts?status=unread">View unread contacts</Quick>
          <Quick href="/admin/home">Edit home page</Quick>
          <Quick href="/" external>
            Open website
          </Quick>
        </div>
      </Card>
    </>
  );
}

function StatCard({ title, value, detail, href, highlight }: { title: string; value: number; detail: string; href: string; highlight?: boolean }) {
  return (
    <Link href={href} className="rounded-s border border-stroke-light bg-white p-5 transition-colors hover:border-stroke-bold">
      <p className="text-body3 text-ink-secondary">{title}</p>
      <p className={`mt-2 font-heading text-h2 ${highlight ? "text-brand" : "text-ink"}`}>{value}</p>
      <p className="mt-1 text-caption text-ink-secondary">{detail}</p>
    </Link>
  );
}

function Quick({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex h-9 items-center rounded-xs border border-stroke-bold bg-white px-3 text-btn-xs text-ink hover:bg-surface-a"
    >
      {children}
    </Link>
  );
}
