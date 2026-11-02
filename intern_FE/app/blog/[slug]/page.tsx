import type { Metadata } from "next";
import { Suspense } from "react";
import { Newsletter } from "@/components/blog/newsletter";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ALL_POSTS, getArticle } from "@/lib/data/blog";
import { ArticleContent, ArticleSkeleton } from "./article-content";

export function generateStaticParams() {
  return ALL_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found | Pacificwide" };
  return {
    title: `${article.title} | Pacificwide`,
    description: article.summary,
  };
}

/**
 * Article detail (design: 1366px frame).
 * The page itself never reads `params`: header, newsletter and footer form
 * the shared App Shell, and the URL-specific article streams in through
 * <Suspense> (Next Cache Components + Partial Prefetching requirement).
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
