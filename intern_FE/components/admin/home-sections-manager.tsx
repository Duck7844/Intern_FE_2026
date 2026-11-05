"use client";

import { useEffect, useState, type FormEvent } from "react";
import { adminApi } from "@/lib/api/admin";
import { formatDateTime } from "@/lib/format";
import type { HomeSection } from "@/types/api";
import { ImageUpload } from "./image-upload";
import { Card, EmptyState, Field, LoadingBlock, Notice, PageHeader, Spinner, errorMessage, fieldClass } from "./ui";

const LABELS: Record<string, string> = {
  hero: "Hero (top banner)",
  picked_for_you: "Picked For You",
  find_homes: "Find Homes By Budget",
  affordability: "Home Affordability",
  home_estimate: "Home Estimate",
  pre_approval: "Pre-Approval",
  testimonials: "Testimonials",
  agents: "Agents",
  browse_by_location: "Browse by Location",
};

export function HomeSectionsManager() {
  const [sections, setSections] = useState<HomeSection[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    adminApi.homeSections
      .list()
      .then((list) => !cancelled && setSections(list))
      .catch((e: unknown) => !cancelled && setError(errorMessage(e, "Could not load home sections")));
    return () => {
      cancelled = true;
    };
  }, []);

  function onSaved(updated: HomeSection) {
    setSections((list) => (list ? list.map((s) => (s.id === updated.id ? updated : s)) : list));
  }

  return (
    <>
      <PageHeader title="Home page" description="Edit the title, description and image of each section. Changes appear on the home page immediately." />
      {error && <Notice tone="error">{error}</Notice>}
      {!sections && !error && <LoadingBlock rows={5} />}
      {sections && sections.length === 0 && <EmptyState title="No sections yet" description="Run the backend seed to create the home page content." />}
      {sections && sections.length > 0 && (
        <div className="flex flex-col gap-3">
          {sections.map((section) => (
            <SectionRow
              key={section.id}
              section={section}
              open={openId === section.id}
              onToggle={() => setOpenId((id) => (id === section.id ? null : section.id))}
              onSaved={onSaved}
            />
          ))}
        </div>
      )}
    </>
  );
}

function SectionRow({
  section,
  open,
  onToggle,
  onSaved,
}: {
  section: HomeSection;
  open: boolean;
  onToggle: () => void;
  onSaved: (s: HomeSection) => void;
}) {
  return (
    <Card className="p-0 md:p-0">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <div className="min-w-0">
          <p className="text-caption uppercase tracking-wide text-ink-secondary">
            #{section.order} · {section.key}
          </p>
          <p className="truncate text-body1 font-bold text-ink">{LABELS[section.key] ?? section.key}</p>
          <p className="truncate text-body3 text-ink-secondary">{section.title}</p>
        </div>
        <span className="shrink-0 text-caption text-ink-secondary">{open ? "Collapse ▲" : "Edit ▼"}</span>
      </button>
      {open && (
        <div className="border-t border-stroke-light px-5 py-5">
          <SectionForm section={section} onSaved={onSaved} />
        </div>
      )}
    </Card>
  );
}

function SectionForm({ section, onSaved }: { section: HomeSection; onSaved: (s: HomeSection) => void }) {
  const [title, setTitle] = useState(section.title);
  const [content, setContent] = useState(section.content ?? "");
  const [imageUrl, setImageUrl] = useState<string | null>(section.imageUrl);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  const dirty = title !== section.title || content !== (section.content ?? "") || imageUrl !== section.imageUrl;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }
    if (title.trim().length > 200) {
      setTitleError("Title must be 200 characters or less");
      return;
    }
    setTitleError(null);
    setBusy(true);
    setNotice(null);
    try {
      const updated = await adminApi.homeSections.update(section.id, {
        title: title.trim(),
        content: content.trim() || null,
        imageUrl,
      });
      onSaved(updated);
      setNotice({ tone: "success", text: "Saved. The home page now shows the new content." });
    } catch (e) {
      setNotice({ tone: "error", text: errorMessage(e, "Save failed") });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 lg:grid-cols-[1fr_320px]" aria-busy={busy}>
      <div className="flex flex-col gap-4">
        <Field label="Title" htmlFor={`title-${section.id}`} error={titleError ?? undefined} required>
          <input
            id={`title-${section.id}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
            disabled={busy}
            aria-invalid={!!titleError}
            className={`${fieldClass} h-11`}
          />
        </Field>
        <Field label="Description / content" htmlFor={`content-${section.id}`} hint="Leave empty if the section has no description.">
          <textarea
            id={`content-${section.id}`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            disabled={busy}
            className={`${fieldClass} min-h-[110px] resize-y py-2.5`}
          />
        </Field>
        {notice && <Notice tone={notice.tone}>{notice.text}</Notice>}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={busy || !dirty}
            className="inline-flex h-10 items-center gap-2 rounded-xs bg-brand px-5 text-btn-xs text-white hover:bg-brand-dark disabled:opacity-50"
          >
            {busy && <Spinner />}
            Save changes
          </button>
          <span className="text-caption text-ink-secondary">Last updated: {formatDateTime(section.updatedAt)}</span>
        </div>
      </div>
      <ImageUpload label="Image" value={imageUrl} onChange={setImageUrl} disabled={busy} />
    </form>
  );
}
