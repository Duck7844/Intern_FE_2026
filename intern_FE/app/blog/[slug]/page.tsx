import type { Metadata } from "next";
import { Suspense } from "react";
import { Newsletter } from "@/components/blog/newsletter";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { resolveMediaUrl } from "@/lib/api/config";
import { getPostBySlug } from "@/lib/api/public";
import { ArticleContent, ArticleSkeleton } from "./article-content";

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Article not found | Pacificwide" };
  const image = resolveMediaUrl(post.thumbnailUrl);
  return {
    title: `${post.title} | Pacificwide`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

/**
 * Article detail. The page never reads `params` itself: header, newsletter
 * and footer form the shared App Shell, and the URL-specific article streams
 * in through <Suspense> (Cache Components + Partial Prefetching requirement).
 */
export default function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <>
      <SiteHeader activeHref="/blog" />
      <main className="flex flex-1 flex-col">
        <Suspense fallback={<ArticleSkeleton />}>
          <ArticleContent params={params} />
        </Suspense>
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
