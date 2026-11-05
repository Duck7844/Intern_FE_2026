"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { resolveMediaUrl } from "@/lib/api/config";
import { adminApi } from "@/lib/api/admin";
import { isApiError } from "@/lib/api/http";
import { Spinner } from "./ui";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 2 * 1024 * 1024;

type ImageUploadProps = {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  /** Aspect ratio class for the preview box. */
  previewClassName?: string;
  disabled?: boolean;
};

/**
 * Uploads a JPG/PNG/WEBP (≤ 2 MB) to POST /upload through the admin proxy
 * and hands back the `/uploads/<uuid>.ext` URL. The same limits are enforced
 * client-side first so the user gets instant feedback.
 */
export function ImageUpload({ label, value, onChange, previewClassName = "aspect-[16/9]", disabled }: ImageUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const preview = resolveMediaUrl(value);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    if (!ACCEPTED.includes(file.type)) {
      setError("Only JPG, PNG or WEBP images are allowed.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("The image must be 2 MB or smaller.");
      return;
    }
    setBusy(true);
    try {
      const result = await adminApi.upload(file);
      onChange(result.data.url);
    } catch (err) {
      setError(isApiError(err) ? err.messages.join(" ") : "Upload failed. Please try again.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-body3 font-semibold text-ink">{label}</span>
      <div className={`relative w-full overflow-hidden rounded-xs border border-stroke-light bg-surface-a ${previewClassName}`}>
        {preview ? (
          <Image src={preview} alt="" fill unoptimized sizes="600px" className="object-cover" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-body3 text-ink-tertiary">No image</span>
        )}
        {busy && (
          <span className="absolute inset-0 flex items-center justify-center gap-2 bg-white/70 text-body3 text-ink">
            <Spinner /> Uploading…
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor={inputId}
          className={`inline-flex h-9 cursor-pointer items-center rounded-xs border border-stroke-bold bg-white px-3 text-btn-xs text-ink hover:bg-surface-a ${disabled || busy ? "pointer-events-none opacity-50" : ""}`}
        >
          {value ? "Replace image" : "Upload image"}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={ACCEPTED.join(",")}
          className="sr-only"
          disabled={disabled || busy}
          onChange={(e) => void onFile(e.target.files?.[0])}
        />
        {value && (
          <button type="button" onClick={() => onChange(null)} disabled={disabled || busy} className="text-btn-xs text-brand hover:underline disabled:opacity-50">
            Remove
          </button>
        )}
        <span className="text-caption text-ink-secondary">JPG, PNG or WEBP · max 2 MB</span>
      </div>
      {value && <p className="break-all text-caption text-ink-secondary">{value}</p>}
      {error && (
        <p role="alert" className="text-caption text-brand">
          {error}
        </p>
      )}
    </div>
  );
}
