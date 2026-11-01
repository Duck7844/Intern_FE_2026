"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/lib/data/home";

type MobileMenuProps = {
  nav: NavItem[];
  accountLinks: { label: string; href: string }[];
  agentLink: { label: string; href: string };
  phone: string;
};

export function MobileMenu({ nav, accountLinks, agentLink, phone }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Close with Escape and lock scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-10 items-center justify-center rounded-xs text-ink hover:bg-stroke-light lg:hidden"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Backdrop */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 top-[var(--header-h)] z-40 bg-black/40 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <nav
        id={panelId}
        aria-label="Mobile"
        className={cn(
          "fixed inset-x-0 top-[var(--header-h)] z-50 max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b border-stroke-light bg-surface transition-transform duration-200 lg:hidden",
          open ? "translate-y-0" : "-translate-y-[120%]",
        )}
      >
        <ul className="flex flex-col px-4 py-2 sm:px-6">
          {nav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3 text-body2 text-ink"
              >
                {item.label}
                {item.hasMenu && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src="/icons/chevron-down.svg" alt="" width={20} height={20} />
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 border-t border-stroke-light px-4 py-4 text-body2 sm:px-6">
          <a href={`tel:${phone.replace(/\D/g, "")}`} className="text-ink">
            {phone}
          </a>
          <div className="flex items-center gap-4">
            {accountLinks.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-ink">
                {l.label}
              </Link>
            ))}
          </div>
          <Link href={agentLink.href} onClick={() => setOpen(false)} className="text-ink">
            {agentLink.label}
          </Link>
        </div>
      </nav>
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
