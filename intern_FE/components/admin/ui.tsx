"use client";

import Link from "next/link";
import type { ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Small building blocks shared by every admin screen.                 */
/* ------------------------------------------------------------------ */

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-sans text-h3 font-bold text-ink">{title}</h1>
        {description && <p className="mt-1 text-body3 text-ink-secondary">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-s border border-stroke-light bg-white p-5 md:p-6", className)}>{children}</div>;
}

type Tone = "error" | "success" | "info" | "warning";

const toneClasses: Record<Tone, string> = {
  error: "border-brand/30 bg-brand/5 text-brand",
  success: "border-success/30 bg-success/5 text-success",
  info: "border-stroke-light bg-surface-a text-ink-secondary",
  warning: "border-warning/40 bg-warning/10 text-[#8a5200]",
};

export function Notice({ tone = "info", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cn("rounded-xs border px-4 py-3 text-body3", toneClasses[tone], className)}>
      {children}
    </div>
  );
}

export function Badge({ tone, children }: { tone: "green" | "grey" | "red" | "amber"; children: ReactNode }) {
  const cls = {
    green: "bg-success/10 text-success",
    grey: "bg-surface text-ink-secondary",
    red: "bg-brand/10 text-brand",
    amber: "bg-warning/15 text-[#8a5200]",
  }[tone];
  return <span className={cn("inline-flex items-center rounded-label px-2 py-0.5 text-caption font-semibold", cls)}>{children}</span>;
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent", className)}
    />
  );
}

export function LoadingBlock({ label = "Loading…", rows = 4 }: { label?: string; rows?: number }) {
  return (
    <div aria-busy="true" aria-label={label} className="flex animate-pulse flex-col gap-3">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="h-12 rounded-xs bg-surface" />
      ))}
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-s border border-dashed border-stroke-bold px-6 py-14 text-center">
      <p className="text-body1 font-semibold text-ink">{title}</p>
      {description && <p className="max-w-md text-body3 text-ink-secondary">{description}</p>}
      {action}
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-body3 font-semibold text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      {children}
      {error ? <p className="text-caption text-brand">{error}</p> : hint ? <p className="text-caption text-ink-secondary">{hint}</p> : null}
    </div>
  );
}

export const fieldClass =
  "w-full rounded-xs border border-stroke-light bg-white px-3 text-body2 text-ink outline-none transition-colors placeholder:text-ink-tertiary focus:border-ink disabled:bg-surface-a aria-[invalid=true]:border-brand";

export function Select({ className, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...rest} className={cn(fieldClass, "h-10 pr-8", className)} />;
}

/** Numbered pager driven by state (admin tables fetch client-side). */
export function AdminPagination({
  page,
  totalPages,
  total,
  onChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return <p className="text-caption text-ink-secondary">{total} items</p>;
  }
  const btn = "inline-flex h-9 min-w-9 items-center justify-center rounded-xs border px-3 text-btn-xs transition-colors disabled:opacity-40";
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-caption text-ink-secondary">
        Page {page} of {totalPages} · {total} items
      </p>
      <div className="flex items-center gap-2">
        <button type="button" className={cn(btn, "border-stroke-bold text-ink hover:bg-surface-a")} disabled={page <= 1} onClick={() => onChange(page - 1)}>
          Previous
        </button>
        <button type="button" className={cn(btn, "border-stroke-bold text-ink hover:bg-surface-a")} disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

/** Minimal modal confirmation. Keeps destructive actions behind a second click. */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  busy,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4" onClick={busy ? undefined : onCancel}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="w-full max-w-sm rounded-s bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" className="text-body1 font-bold text-ink">
          {title}
        </h2>
        {description && <p className="mt-2 text-body3 text-ink-secondary">{description}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="inline-flex h-10 items-center rounded-xs border border-stroke-bold px-4 text-btn-xs text-ink hover:bg-surface-a disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="inline-flex h-10 items-center gap-2 rounded-xs bg-brand px-4 text-btn-xs text-white hover:bg-brand-dark disabled:opacity-50"
          >
            {busy && <Spinner />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ActionLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("text-btn-xs font-semibold text-brand hover:underline", className)}>
      {children}
    </Link>
  );
}

export function ActionButton({
  onClick,
  children,
  tone = "default",
  disabled,
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  tone?: "default" | "danger";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn("text-btn-xs font-semibold hover:underline disabled:opacity-40", tone === "danger" ? "text-brand" : "text-ink", className)}
    >
      {children}
    </button>
  );
}

export function errorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
