import Image from "next/image";
import Link from "next/link";
import { resolveMediaUrl } from "@/lib/api/config";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import type { PostListItem } from "@/types/api";

type PostCardProps = {
  post: PostListItem;
  /**
   * `default` – Figma `card/blog`: 220px cover.
   * `featured` – Figma `hero block / main container`: 228px cover on mobile, 480px from `lg`.
   */
  size?: "default" | "featured";
  className?: string;
};

export function PostCard({ post, size = "default", className }: PostCardProps) {
  const href = `/blog/${post.slug}`;
  const featured = size === "featured";
  const cover = resolveMediaUrl(post.thumbnailUrl);

  return (
    <article className={cn("flex w-full min-w-0 flex-col gap-4", className)}>
      <Link
        href={href}
        aria-label={post.title}
        className={cn(
          "relative block w-full overflow-hidden rounded-xs bg-stroke-light",
          featured ? "h-[228px] lg:h-[480px]" : "h-[220px]",
        )}
      >
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 753px, 100vw"
                : "(min-width: 1024px) 365px, (min-width: 768px) 50vw, 100vw"
            }
            className="object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center font-heading text-h5 text-ink-tertiary">
            No image
          </span>
        )}
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h3 className="text-h5 tracking-[0.4px] text-ink">
            <Link href={href} className="hover:text-brand">
              {post.title}
            </Link>
          </h3>
          <p className="text-body3 text-ink-secondary">
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          </p>
          {post.excerpt && <p className="line-clamp-2 text-body2 text-ink">{post.excerpt}</p>}
        </div>
      </div>
    </article>
  );
}
