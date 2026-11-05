import { PostCard } from "@/components/cards/post-card";
import { getPublishedPosts } from "@/lib/api/public";
import type { Paginated, PostListItem } from "@/types/api";
import { BlogSearch } from "./blog-search";
import { BlogEmpty, BlogError } from "./blog-states";
import { LatestNews } from "./latest-news";
import { Pagination } from "./pagination";

const PAGE_SIZE = 10;

type BlogContentProps = {
  searchParams: Promise<{ page?: string; q?: string }>;
};

/**
 * Server Component: reads ?page & ?q, fetches published posts per request
 * and renders the listing. Page 1 without a search shows the newest post as
 * the featured block (Figma "Latest news"); the rest form the article grid.
 */
export async function BlogContent({ searchParams }: BlogContentProps) {
  const params = await searchParams;
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const q = params.q?.trim() || undefined;

  let result: Paginated<PostListItem>;
  try {
    result = await getPublishedPosts({ page, limit: PAGE_SIZE, q });
  } catch (error) {
    return (
      <>
        <BlogSearch query={q} />
        <BlogError detail={error instanceof Error ? error.message : undefined} />
      </>
    );
  }

  const showFeatured = page === 1 && !q && result.data.length > 0;
  const [featured, ...others] = showFeatured ? result.data : [];
  const grid = showFeatured ? others.slice(2) : result.data;
  const aside = showFeatured ? others.slice(0, 2) : [];

  const hrefFor = (p: number) => {
    const query = new URLSearchParams();
    if (p > 1) query.set("page", String(p));
    if (q) query.set("q", q);
    const s = query.toString();
    return s ? `/blog?${s}` : "/blog";
  };

  return (
    <>
      <BlogSearch query={q} />

      {result.data.length === 0 ? (
        <BlogEmpty query={q} />
      ) : (
        <>
          {showFeatured && featured && <LatestNews featured={featured} aside={aside} />}

          {grid.length > 0 && (
            <section aria-labelledby="all-articles" className="flex w-full flex-col gap-5">
              <div className="flex items-baseline justify-between gap-4">
                <h2 id="all-articles" className="text-h4 tracking-[0.24px] text-ink">
                  {q ? `Results for “${q}”` : "All articles"}
                </h2>
                <p className="text-body3 text-ink-secondary">{result.total} articles</p>
              </div>
              <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {grid.map((p) => (
                  <li key={p.id} className="min-w-0">
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Pagination page={result.page} totalPages={result.totalPages} hrefFor={hrefFor} className="w-full" />
        </>
      )}
    </>
  );
}
