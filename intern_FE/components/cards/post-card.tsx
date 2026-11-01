import Image from "next/image";
import Link from "next/link";
import { Chip } from "@/components/ui/chip";
import type { Post } from "@/lib/data/blog";
import { cn } from "@/lib/cn";

type PostCardProps = {
  post: Post;
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
        <Image
          src={post.cover}
          alt=""
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 753px, 100vw"
              : "(min-width: 1024px) 365px, (min-width: 768px) 50vw, 100vw"
          }
          className="object-cover"
        />
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h3 className="text-h5 tracking-[0.4px] text-ink">
            <Link href={href} className="hover:text-brand">
              {post.title}
            </Link>
          </h3>
          <p className="flex items-center gap-2 text-body3 text-ink-secondary">
            <span>{post.date}</span>
            {post.readTime && (
              <>
                <span aria-hidden className="size-1 rounded-full bg-stroke-bold" />
                <span>{post.readTime}</span>
              </>
            )}
          </p>
          <p className="line-clamp-2 text-body2 text-ink">{post.excerpt}</p>
        </div>
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap items-center gap-2">
            {post.tags.map((tag, i) => (
              <li key={`${tag}-${i}`}>
                <Chip variant="tag">{tag}</Chip>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
