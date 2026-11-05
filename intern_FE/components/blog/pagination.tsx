import Link from "next/link";
import { cn } from "@/lib/cn";

type PaginationProps = {
  page: number;
  totalPages: number;
  /** Builds the href for a page number, e.g. `/blog?page=2&q=term`. */
  hrefFor: (page: number) => string;
  className?: string;
};

/** Previous / numbered / next links in the site's button style. */
export function Pagination({ page, totalPages, hrefFor, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = windowAround(page, totalPages);
  const link = "inline-flex h-10 min-w-10 items-center justify-center rounded-xs border px-3 text-btn transition-colors";

  return (
    <nav aria-label="Pagination" className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
      <PageLink href={page > 1 ? hrefFor(page - 1) : null} className={link} label="Previous page">
        Previous
      </PageLink>
      {pages.map((p, i) =>
        p === null ? (
          <span key={`gap-${i}`} className="px-1 text-ink-tertiary">
            …
          </span>
        ) : (
          <PageLink
            key={p}
            href={p === page ? null : hrefFor(p)}
            current={p === page}
            className={link}
            label={`Page ${p}`}
          >
            {p}
          </PageLink>
        ),
      )}
      <PageLink href={page < totalPages ? hrefFor(page + 1) : null} className={link} label="Next page">
        Next
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  current,
  className,
  label,
  children,
}: {
  href: string | null;
  current?: boolean;
  className: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) {
    return (
      <span
        aria-current={current ? "page" : undefined}
        aria-disabled={!current}
        className={cn(className, current ? "border-brand bg-brand text-white" : "border-stroke-light text-ink-tertiary")}
      >
        {children}
      </span>
    );
  }
  return (
    <Link href={href} aria-label={label} className={cn(className, "border-stroke-bold text-ink hover:bg-surface-a")}>
      {children}
    </Link>
  );
}

/** 1 … 4 5 [6] 7 8 … 20 */
function windowAround(page: number, total: number): Array<number | null> {
  const pages = new Set<number>([1, total, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: Array<number | null> = [];
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push(null);
    out.push(sorted[i]);
  }
  return out;
}
