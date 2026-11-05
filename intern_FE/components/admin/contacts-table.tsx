"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { adminApi } from "@/lib/api/admin";
import { formatDateTime } from "@/lib/format";
import type { Contact, ContactStatusFilter } from "@/types/api";
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
} from "./ui";
import { useAdminList } from "./use-admin-list";

const PAGE_SIZE = 10;
const FILTERS: ContactStatusFilter[] = ["all", "unread", "read"];

export function ContactsTable() {
  const initial = useSearchParams().get("status");
  const [status, setStatus] = useState<ContactStatusFilter>(FILTERS.includes(initial as ContactStatusFilter) ? (initial as ContactStatusFilter) : "all");
  const [page, setPage] = useState(1);
  const [actionError, setActionError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Contact | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetcher = useCallback(() => adminApi.contacts.list({ page, limit: PAGE_SIZE, status }), [page, status]);
  const { stale: result, error: loadError, loading, reload } = useAdminList(`${page}|${status}`, fetcher);
  const error = actionError ?? loadError;

  async function toggleRead(contact: Contact) {
    setBusyId(contact.id);
    setActionError(null);
    try {
      await adminApi.contacts.setRead(contact.id, !contact.isRead);
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
      await adminApi.contacts.remove(pendingDelete.id);
      setNotice(`Contact from ${pendingDelete.name} deleted.`);
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
      <PageHeader title="Contacts" description="Messages sent through the website contact form." />

      <Card className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Select
            aria-label="Filter by read status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as ContactStatusFilter);
              setPage(1);
            }}
            className="w-44"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </Select>
          <button type="button" onClick={reload} className="inline-flex h-10 items-center rounded-xs border border-stroke-bold px-4 text-btn-xs text-ink hover:bg-surface-a">
            Refresh
          </button>
        </div>

        {notice && <Notice tone="success">{notice}</Notice>}
        {error && <Notice tone="error">{error}</Notice>}
        {loading && !result && <LoadingBlock rows={6} />}

        {result && result.data.length === 0 && !loading && (
          <EmptyState title="No contacts" description={status === "unread" ? "Every message has been read." : "Nobody has sent the contact form yet."} />
        )}

        {result && result.data.length > 0 && (
          <div className={`overflow-x-auto ${loading ? "opacity-60" : ""}`}>
            <table className="w-full min-w-[760px] border-collapse text-body3">
              <thead>
                <tr className="border-b border-stroke-light text-left text-caption uppercase tracking-wide text-ink-secondary">
                  <th className="py-2 pr-3 font-semibold">Sender</th>
                  <th className="py-2 pr-3 font-semibold">Message</th>
                  <th className="py-2 pr-3 font-semibold">Status</th>
                  <th className="py-2 pr-3 font-semibold">Received</th>
                  <th className="py-2 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {result.data.map((c) => {
                  const busy = busyId === c.id;
                  return (
                    <tr key={c.id} className={`border-b border-stroke-light last:border-0 ${c.isRead ? "" : "bg-surface-a/60"}`}>
                      <td className="py-3 pr-3 align-top">
                        <Link href={`/admin/contacts/${c.id}`} className={`block ${c.isRead ? "font-medium" : "font-bold"} text-ink hover:text-brand`}>
                          {c.name}
                        </Link>
                        <p className="text-caption text-ink-secondary">{c.email}</p>
                        {c.phone && <p className="text-caption text-ink-secondary">{c.phone}</p>}
                      </td>
                      <td className="max-w-md py-3 pr-3 align-top">
                        <p className="line-clamp-2 text-ink">{c.message}</p>
                      </td>
                      <td className="py-3 pr-3 align-top">{c.isRead ? <Badge tone="grey">Read</Badge> : <Badge tone="red">Unread</Badge>}</td>
                      <td className="whitespace-nowrap py-3 pr-3 align-top text-ink-secondary">{formatDateTime(c.createdAt)}</td>
                      <td className="py-3 align-top">
                        <div className="flex items-center justify-end gap-4">
                          <ActionLink href={`/admin/contacts/${c.id}`}>Xem</ActionLink>
                          <ActionButton onClick={() => void toggleRead(c)} disabled={busy}>
                            {c.isRead ? "Mark as unread" : "Mark as read"}
                          </ActionButton>
                          <ActionButton tone="danger" onClick={() => setPendingDelete(c)} disabled={busy}>
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
        title="Delete this contact?"
        description={pendingDelete ? `The message from ${pendingDelete.name} (${pendingDelete.email}) will be permanently deleted.` : undefined}
        busy={busyId !== null}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => void confirmDelete()}
      />
    </>
  );
}
