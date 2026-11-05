"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api/admin";
import { isApiError } from "@/lib/api/http";
import { formatDateTime } from "@/lib/format";
import type { Contact } from "@/types/api";
import { Badge, Card, ConfirmDialog, LoadingBlock, Notice, PageHeader, errorMessage } from "./ui";

/** Full message view. Opening an unread contact marks it as read automatically. */
export function ContactDetail({ contactId }: { contactId: string }) {
  const router = useRouter();
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let c = await adminApi.contacts.get(contactId);
        if (!c.isRead) c = await adminApi.contacts.setRead(contactId, true);
        if (!cancelled) setContact(c);
      } catch (e) {
        if (!cancelled) setError(isApiError(e) && e.status === 404 ? "This contact does not exist." : errorMessage(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [contactId]);

  async function toggleRead() {
    if (!contact) return;
    setBusy(true);
    try {
      setContact(await adminApi.contacts.setRead(contact.id, !contact.isRead));
    } catch (e) {
      setError(errorMessage(e, "Update failed"));
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!contact) return;
    setBusy(true);
    try {
      await adminApi.contacts.remove(contact.id);
      router.replace("/admin/contacts");
    } catch (e) {
      setError(errorMessage(e, "Delete failed"));
      setBusy(false);
      setConfirm(false);
    }
  }

  const back = (
    <Link href="/admin/contacts" className="inline-flex h-10 items-center rounded-xs border border-stroke-bold bg-white px-4 text-btn-xs text-ink hover:bg-surface-a">
      ← All contacts
    </Link>
  );

  if (error) {
    return (
      <>
        <PageHeader title="Contact details" actions={back} />
        <Notice tone="error">{error}</Notice>
      </>
    );
  }
  if (!contact) {
    return (
      <>
        <PageHeader title="Contact details" actions={back} />
        <LoadingBlock rows={4} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={contact.name}
        description={`Received ${formatDateTime(contact.createdAt)}`}
        actions={
          <>
            {back}
            <button type="button" onClick={() => void toggleRead()} disabled={busy} className="inline-flex h-10 items-center rounded-xs border border-stroke-bold bg-white px-4 text-btn-xs text-ink hover:bg-surface-a disabled:opacity-50">
              {contact.isRead ? "Mark as unread" : "Mark as read"}
            </button>
            <button type="button" onClick={() => setConfirm(true)} disabled={busy} className="inline-flex h-10 items-center rounded-xs bg-brand px-4 text-btn-xs text-white hover:bg-brand-dark disabled:opacity-50">
              Delete
            </button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <h2 className="text-caption uppercase tracking-wide text-ink-secondary">Message</h2>
          <p className="mt-3 whitespace-pre-wrap text-body2 text-ink">{contact.message}</p>
        </Card>
        <Card className="flex flex-col gap-4 text-body3">
          <div>
            <p className="text-caption uppercase tracking-wide text-ink-secondary">Status</p>
            <p className="mt-1">{contact.isRead ? <Badge tone="grey">Read</Badge> : <Badge tone="red">Unread</Badge>}</p>
          </div>
          <div>
            <p className="text-caption uppercase tracking-wide text-ink-secondary">Email</p>
            <a href={`mailto:${contact.email}`} className="mt-1 block break-all text-brand hover:underline">
              {contact.email}
            </a>
          </div>
          <div>
            <p className="text-caption uppercase tracking-wide text-ink-secondary">Phone</p>
            {contact.phone ? (
              <a href={`tel:${contact.phone}`} className="mt-1 block text-brand hover:underline">
                {contact.phone}
              </a>
            ) : (
              <p className="mt-1 text-ink-tertiary">Not provided</p>
            )}
          </div>
          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent("Re: Your message to Pacificwide")}`}
            className="inline-flex h-10 items-center justify-center rounded-xs border border-brand px-4 text-btn-xs text-brand hover:bg-brand/5"
          >
            Reply by email
          </a>
        </Card>
      </div>

      <ConfirmDialog
        open={confirm}
        title="Delete this contact?"
        description={`The message from ${contact.name} will be permanently deleted.`}
        busy={busy}
        onCancel={() => setConfirm(false)}
        onConfirm={() => void remove()}
      />
    </>
  );
}
