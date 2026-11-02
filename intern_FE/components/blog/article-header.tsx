import Link from "next/link";
import { Fragment } from "react";
import { ArrowLeftIcon } from "@/components/icons/ui-icons";
import type { Post } from "@/lib/data/blog";
import { ShareButtons } from "./share-buttons";

/**
 * Top of the article column: Back link, H2 title, date + tag meta row,
 * 1px rule, right-aligned share row.
 */
export function ArticleHeader({ post }: { post: Post }) {
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
        <span>{post.date}</span>
        <span aria-hidden className="hidden h-6 w-px bg-stroke-bold sm:block" />
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {post.tags.map((tag, i) => (
            <Fragment key={`${tag}-${i}`}>
              {i > 0 && <li aria-hidden className="size-1 rounded-full bg-stroke-bold" />}
              <li>{tag}</li>
            </Fragment>
          ))}
        </ul>
      </div>

      <hr className="mt-4 border-0 border-t border-stroke-light" />

      <div className="mt-4 flex justify-end">
        <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
      </div>
    </header>
  );
}
