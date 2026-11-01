import Link from "next/link";
import { PostCard } from "@/components/cards/post-card";
import type { BlogRow } from "@/lib/data/blog";

/** Figma category block: H4 + "View all" on one baseline, then three cards 24px apart. */
export function CategoryRow({ row }: { row: BlogRow }) {
  return (
    <section id={row.id} aria-labelledby={`${row.id}-title`} className="flex w-full scroll-mt-28 flex-col gap-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id={`${row.id}-title`} className="text-h4 tracking-[0.24px] text-ink">
          {row.title}
        </h2>
        <Link href={row.href} className="shrink-0 text-body2 text-ink underline underline-offset-2 hover:text-brand">
          View all
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {row.posts.map((p) => (
          <li key={p.slug} className="min-w-0">
            <PostCard post={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
