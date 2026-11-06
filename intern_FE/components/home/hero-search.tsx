"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const TABS = [
  { id: "sale", label: "For sale" },
  { id: "rent", label: "For rent" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** Figma `modal/rate search tool/combo` – white card with pill tabs + search field. */
export function HeroSearch() {
  const [tab, setTab] = useState<TabId>("sale");
  const [query, setQuery] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to search route once it exists
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-3 rounded-sm bg-white p-4 shadow-card sm:p-6"
    >
      <div role="tablist" aria-label="Listing type" className="flex items-center gap-3">
        {TABS.map((t) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-full px-4 py-1 text-body2 transition-colors",
                active ? "bg-ink text-white" : "bg-surface text-ink hover:bg-stroke-light",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xs border border-stroke-light bg-white py-2 pl-3 pr-2.5 focus-within:border-ink">
            <span className="sr-only">Search location</span>
            <input
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Address, Neighbor, City, Zip code or School"
              className="min-w-0 flex-1 bg-transparent text-body2 text-ink outline-none placeholder:text-ink-tertiary"
            />
            <Image src="/icons/search.svg" alt="" width={20} height={20} className="shrink-0" />
          </label>
          <Button type="submit" size="md" className="w-full sm:w-auto">
            Search
          </Button>
        </div>
        <div className="flex justify-center px-1">
          <Link href="#" className="text-body2 text-ink underline underline-offset-2">
            Advance search
          </Link>
        </div>
      </div>
    </form>
  );
}
