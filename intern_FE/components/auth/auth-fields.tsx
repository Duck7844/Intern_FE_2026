"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type AuthFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  id: string;
  label: string;
  error?: string;
};

/** Labelled 44px input in the site's field style, with an inline error line. */
export function AuthField({ id, label, error, ...input }: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-body3 font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        {...input}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-11 w-full rounded-xs border bg-white px-3 text-body2 text-ink outline-none transition-colors placeholder:text-ink-tertiary focus:border-ink disabled:bg-surface-a",
          error ? "border-brand" : "border-stroke-light",
        )}
      />
      {error && (
        <p id={`${id}-error`} className="text-body3 text-brand">
          {error}
        </p>
      )}
    </div>
  );
}

export function AuthNotice({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn("rounded-xs px-3 py-2 text-body3", tone === "error" ? "bg-brand/10 text-brand" : "bg-success/10 text-success")}
    >
      {children}
    </p>
  );
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
