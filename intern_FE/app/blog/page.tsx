import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogListSkeleton } from "@/components/blog/blog-states";
import { Newsletter } from "@/components/blog/newsletter";
import { BlogHeader } from "@/components/layout/blog-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Learning Resources Center | Pacificwide",
  description: "Blogs, topics and guides on home buying, mortgage rates, calculators and refinancing.",
};

/**
 * Figma `blog` frames (375 / 1366 / 1440 / 1920).
 * The listing reads ?page and ?q, so it streams inside Suspense while the
 * header, title and newsletter form the static shell.
 */
export default function BlogPage({ searchParams }: PageProps<"/blog">) {
  return (
    <>
      <BlogHeader activeHref="/blog" />
      <main className="flex flex-1 flex-col">
        <section className="bg-white pb-20 pt-20 lg:pb-[120px]">
          <Container gutter="fluid" className="flex flex-col items-center gap-8">
            <h1 className="w-full text-h1 text-ink">Learning Resources Center. Blogs, topics and more.</h1>
            <Suspense fallback={<BlogListSkeleton />}>
              <BlogContent searchParams={searchParams} />
            </Suspense>
          </Container>
        </section>
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
