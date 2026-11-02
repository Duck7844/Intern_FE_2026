"use client";

import { useState } from "react";
import { LinkIcon, MailIcon } from "@/components/icons/ui-icons";

type ShareButtonsProps = {
  title: string;
  /** Absolute or relative URL of the article. */
  url: string;
};

/** "Share this post" row: copy-link and email buttons (20px icons, 24px apart). */
export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const absolute = new URL(url, window.location.origin).toString();
    try {
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this link", absolute);
    }
  }

  const mailto = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-6 text-body2 text-ink">
      <span>Share this post</span>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Copied" : "Copy link"}
        className="relative flex size-5 items-center justify-center text-ink-secondary hover:text-ink"
      >
        <LinkIcon />
        <span aria-live="polite" className="sr-only">
          {copied ? "Link copied" : ""}
        </span>
      </button>
      <a
        href={mailto}
        aria-label="Share by email"
        className="flex size-5 items-center justify-center text-ink-secondary hover:text-ink"
      >
        <MailIcon />
      </a>
    </div>
  );
}
