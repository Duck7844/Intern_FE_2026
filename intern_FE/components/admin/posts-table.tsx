"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, type FormEvent } from "react";
import { adminApi } from "@/lib/api/admin";
import { resolveMediaUrl } from "@/lib/api/config";
import { formatDateTime } from "@/lib/format";
import type { PostListItem, PostStatusFilter } from "@/types/api";
import {
  ActionButton,
  ActionLink,
  AdminPagination,
  Badge,
  Card,
  ConfirmDialog,
  EmptyState,
  LoadingBlock,
  Notice,
  PageHeader,
  Select,
  errorMessage,
  fieldClass,
} from "./ui";
import { useAdminList } from "./use-admin-list";

const PAGE_SIZE = 10;

export function PostsTable() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<PostStatusFilter>("all");
  const [q, setQ] = useState("");
  const [draftQ, setDraftQ] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<PostListItem | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetcher = useCallback(() => adminApi.posts.list({ page, limit: PAGE_SIZE, q: q || undefined, status }), [page, q, status]);
  const { stale: result, error: loadError, loading, reload } = useAdminList(`${page}|${status}|${q}`, fetcher);
  const error = actionError ?? loadError;

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setQ(draftQ.trim());
  }

  async function togglePublished(post: PostListItem) {
    setBusyId(post.id);
    setNotice(null);
    setActionError(null);
    try {
      await adminApi.posts.update(post.id, { published: !post.published });
      setNotice(post.published ? `"${post.title}" moved back to draft.` : `"${post.title}" published.`);
      reload();
    } catch (e) {
      setActionError(errorMessage(e, "Update failed"));
    } finally {
      setBusyId(null);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setBusyId(pendingDelete.id);
    setActionError(null);
    try {
      await adminApi.posts.remove(pendingDelete.id);
      setNotice(`"${pendingDelete.title}" deleted.`);
      setPendingDelete(null);
      if (result && result.data.length === 1 && page > 1) setPage(page - 1);
      else reload();
    } catch (e) {
      setActionError(errorMessage(e, "Delete failed"));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <PageHeader
        title="Blog posts"
        description="Create, edit, publish and delete posts. Only published posts are visible on the website."
        actions={
          <Link href="/admin/posts/create" className="inline-flex h-10 items-center rounded-xs bg-brand px-4 text-btn-xs text-white hover:bg-brand-dark">
            + New post
          </Link>
        }
      />

      <Card className="flex flex-col gap-4">
        <form onSubmit={onSearch} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={draftQ}
            onChange={(e) => setDraftQ(e.target.value)}
            placeholder="Search by title, slug or excerpt…"
            aria-label="Search posts"
            className={`${fieldClass} h-10 sm:max-w-sm`}
          />
          <Select
            aria-label="Filter by status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as PostStatusFilter);
              setPage(1);
            }}
            className="sm:w-44"
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </Select>
          <button type="submit" className="inline-flex h-10 items-center rounded-xs border border-stroke-bold px-4 text-btn-xs text-ink hover:bg-surface-a">
            Search
          </button>
        </form>

        {notice && <Notice tone="success">{notice}</Notice>}
        {error && <Notice tone="error">{error}</Notice>}
        {loading && !result && <LoadingBlock rows={6} />}

        {result && result.data.length === 0 && !loading && (
          <EmptyState
            title={q ? "No posts match your search" : "No posts yet"}
            description={q ? "Try another keyword or clear the filter." : "Click “New post” to create the first one."}
          />
        )}

        {result && result.data.length > 0 && (
          <div className={`overflow-x-auto ${loading ? "opacity-60" : ""}`}>
            <table className="w-full min-w-[720px] border-collapse text-body3">
              <thead>
                <tr className="border-b border-stroke-light text-left text-caption uppercase tracking-wide text-ink-secondary">
                  <th className="py-2 pr-3 font-semibold">Post</th>
                  <th className="py-2 pr-3 font-semibold">Status</th>
                  <th className="py-2 pr-3 font-semibold">Updated</th>
                  <th className="py-2 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {result.data.map((post) => {
                  const thumb = resolveMediaUrl(post.thumbnailUrl);
                  const busy = busyId === post.id;
                  return (
                    <tr key={post.id} className="border-b border-stroke-light last:border-0">
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-3">
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-xs bg-surface">
                            {thumb && <Image src={thumb} alt="" fill unoptimized sizes="48px" className="object-cover" />}
                          </div>
                          <div className="min-w-0">
                            <Link href={`/admin/posts/${post.id}/edit`} className="block truncate font-semibold text-ink hover:text-brand">
                              {post.title}
                            </Link>
                            <p className="truncate text-caption text-ink-secondary">/blog/{post.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-3">
                        {post.published ? <Badge tone="green">Published</Badge> : <Badge tone="grey">Draft</Badge>}
                      </td>
                      <td className="whitespace-nowrap py-3 pr-3 text-ink-secondary">{formatDateTime(post.updatedAt)}</td>
                      <td className="py-3">
                        <div className="flex items-center justify-end gap-4">
                          {post.published && (
                            <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="text-btn-xs font-semibold text-ink hover:underline">
                              View
                            </a>
                          )}
                          <ActionLink href={`/admin/posts/${post.id}/edit`}>Edit</ActionLink>
                          <ActionButton onClick={() => void togglePublished(post)} disabled={busy}>
                            {post.published ? "Unpublish" : "Publish"}
                          </ActionButton>
                          <ActionButton tone="danger" onClick={() => setPendingDelete(post)} disabled={busy}>
                            Delete
                          </ActionButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {result && <AdminPagination page={result.page} totalPages={result.totalPages} total={result.total} onChange={setPage} />}
      </Card>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this post?"
        description={pendingDelete ? `"${pendingDelete.title}" will be permanently deleted.` : undefined}
        busy={busyId !== null}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => void confirmDelete()}
      />
    </>
  );
}
