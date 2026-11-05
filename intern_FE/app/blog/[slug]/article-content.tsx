import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/blog/article-header";
import { ArticleSummary } from "@/components/blog/article-summary";
import { Markdown } from "@/components/blog/markdown";
import { RelatedPosts } from "@/components/blog/related-posts";
import { resolveMediaUrl } from "@/lib/api/config";
import { getPostBySlug, getPublishedPosts } from "@/lib/api/public";

type ArticleContentProps = Pick<PageProps<"/blog/[slug]">, "params">;

/**
 * Everything on the page that depends on the URL. It awaits `params` inside
 * the page's <Suspense> boundary so the surrounding App Shell (header,
 * newsletter, footer) stays shared across every article. Data is fetched per
 * request, so edits and publish/unpublish are reflected immediately.
 */
export async function ArticleContent({ params }: ArticleContentProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const cover = resolveMediaUrl(post.thumbnailUrl);
  const related = await getPublishedPosts({ limit: 7 })
    .then((r) => r.data.filter((p) => p.id !== post.id).slice(0, 6))
    .catch(() => []);

  return (
    <>
      <article className="bg-white pb-14 pt-8 md:pb-20 lg:pb-[120px] lg:pt-10">
        <div className="mx-auto w-full max-w-[720px] px-4 sm:px-6 lg:px-0">
          <ArticleHeader post={post} />

          {post.excerpt && (
            <div className="mt-8">
              <ArticleSummary text={post.excerpt} />
            </div>
          )}

          {cover && (
            <figure className="relative mt-8 aspect-[35/24] w-full overflow-hidden rounded-xs bg-stroke-light">
              <Image src={cover} alt="" fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
            </figure>
          )}

          <hr className="my-8 border-0 border-t border-stroke-light" />

          <Markdown content={post.content} />
        </div>
      </article>

      <RelatedPosts posts={related} />
    </>
  );
}

/** Grey placeholder with the article column's proportions, shown while the URL part streams. */
export function ArticleSkeleton() {
  return (
    <div aria-hidden className="bg-white pb-14 pt-8 md:pb-20 lg:pb-[120px] lg:pt-10">
      <div className="mx-auto w-full max-w-[720px] animate-pulse px-4 sm:px-6 lg:px-0">
        <div className="h-5 w-16 rounded bg-surface" />
        <div className="mt-6 h-10 w-3/4 rounded bg-surface" />
        <div className="mt-6 h-5 w-1/2 rounded bg-surface" />
        <div className="mt-8 h-[200px] rounded-s bg-surface-a" />
        <div className="mt-8 aspect-[35/24] w-full rounded-xs bg-surface" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full rounded bg-surface" />
          <div className="h-4 w-11/12 rounded bg-surface" />
          <div className="h-4 w-4/5 rounded bg-surface" />
        </div>
      </div>
    </div>
  );
}
