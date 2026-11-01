import type { Metadata } from "next";
import { Fragment } from "react";
import { BlogToolbar } from "@/components/blog/blog-toolbar";
import { CategoryRow } from "@/components/blog/category-row";
import { LatestNews } from "@/components/blog/latest-news";
import { Newsletter } from "@/components/blog/newsletter";
import { SiteFooter } from "@/components/layout/site-footer";
import { BlogHeader } from "@/components/layout/blog-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BLOG_CATEGORIES, BLOG_ROWS, FEATURED_POST, LATEST_ASIDE_POSTS } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Learning Resources Center | Pacificwide",
  description: "Blogs, topics and guides on home buying, mortgage rates, calculators and refinancing.",
};

/**
 * Figma `blog` frames (375 / 1366 / 1440 / 1920).
 * Vertical rhythm: 80px top, 80px (mobile) / 120px bottom, 32px between blocks.
 */
export default function BlogPage() {
  return (
    <>
      <BlogHeader />
      <main className="flex flex-1 flex-col">
        <section className="bg-white pb-20 pt-20 lg:pb-[120px]">
          <Container gutter="fluid" className="flex flex-col items-center gap-8">
            <h1 className="w-full text-h1 text-ink">Learning Resources Center. Blogs, topics and more.</h1>

            <BlogToolbar categories={BLOG_CATEGORIES} />

            <LatestNews featured={FEATURED_POST} aside={LATEST_ASIDE_POSTS} />

            {BLOG_ROWS.map((row) => (
              <Fragment key={row.id}>
                <Divider />
                <CategoryRow row={row} />
              </Fragment>
            ))}

            <Button href="#" variant="secondary" size="sm" className="w-[100px]">
              See more
            </Button>
          </Container>
        </section>
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}

function Divider() {
  return <hr className="h-px w-full border-0 bg-stroke-bold" />;
}
