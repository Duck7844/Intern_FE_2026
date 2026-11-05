import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons/ui-icons";
import { formatDate } from "@/lib/format";
import type { PostDetail } from "@/types/api";
import { ShareButtons } from "./share-buttons";

/**
 * Top of the article column: Back link, H2 title, date meta row,
 * 1px rule, right-aligned share row.
 */
export function ArticleHeader({ post }: { post: PostDetail }) {
  const updated = post.updatedAt !== post.createdAt;

  return (
    <header className="flex flex-col">
      <Link
        href="/blog"
        className="inline-flex w-fit items-center gap-2 text-body2 text-ink hover:text-brand"
      >
        <ArrowLeftIcon />
        Back
      </Link>

      <h1 className="mt-6 text-h2-sm text-ink md:text-h2">{post.title}</h1>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-body2 text-ink">
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        {updated && (
          <>
            <span aria-hidden className="hidden h-6 w-px bg-stroke-bold sm:block" />
            <span className="text-ink-secondary">Updated {formatDate(post.updatedAt)}</span>
          </>
        )}
      </div>

      <hr className="mt-4 border-0 border-t border-stroke-light" />

      <div className="mt-4 flex justify-end">
        <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
      </div>
    </header>
  );
}
