"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { UnderlineTabs } from "@/components/ui/underline-tabs";
import type { LocationGroup } from "@/lib/data/home";

/** Figma shows 19 links plus the "Show more" control in a 5-column grid. */
const INITIAL_VISIBLE = 19;

export function LocationTabs({ groups }: { groups: LocationGroup[] }) {
  const [active, setActive] = useState(groups[0]?.id ?? "");
  const [expanded, setExpanded] = useState(false);
  const group = groups.find((g) => g.id === active) ?? groups[0];
  const links = expanded ? group.links : group.links.slice(0, INITIAL_VISIBLE);
  const hasMore = group.links.length > INITIAL_VISIBLE;

  return (
    <div className="flex w-full flex-col gap-8">
      <UnderlineTabs
        tabs={groups.map((g) => ({ id: g.id, label: g.label }))}
        value={active}
        onChange={(id) => {
          setActive(id);
          setExpanded(false);
        }}
        label="Location type"
      />

      <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 sm:gap-y-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
        {links.map((l, i) => (
          <li key={`${l.label}-${i}`} className="flex items-center">
            <Link href={l.href} className="text-body3 text-ink hover:text-brand hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
        {hasMore && (
          <li className="flex items-end">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1 text-body3 text-ink hover:text-brand"
            >
              {expanded ? "Show less" : "Show more"}
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width={16}
                height={16}
                className={expanded ? "rotate-180" : undefined}
              />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
