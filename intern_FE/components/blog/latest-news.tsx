import { PostCard } from "@/components/cards/post-card";
import type { Post } from "@/lib/data/blog";

type LatestNewsProps = {
  featured: Post;
  aside: Post[];
};

/**
 * Figma `latest` / `hero block`.
 * One 3-column grid reproduces every frame: featured spans two columns
 * (722px at 1366, 753px at 1440/1920) and the aside is one column
 * (348px / 365px). Below `lg` everything stacks, 24px apart.
 */
export function LatestNews({ featured, aside }: LatestNewsProps) {
  return (
    <section aria-labelledby="latest-news" className="flex w-full flex-col gap-5">
      <h2 id="latest-news" className="text-h4 tracking-[0.24px] text-ink">
        Latest news
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PostCard post={featured} size="featured" className="lg:col-span-2" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 lg:gap-10">
          {aside.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
