import { PostCard } from "@/components/cards/post-card";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import type { PostListItem } from "@/types/api";

/**
 * "Related learning resources": H4 with prev/next chevrons, then a snap
 * row of PostCards. On `lg` each slide is one third of the row, so three
 * cards fit exactly (348px at 1366, 365px at 1440+).
 */
export function RelatedPosts({ posts }: { posts: PostListItem[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="bg-white pb-14 md:pb-20 lg:pb-[120px]">
      <Container gutter="fluid">
        <Carousel
          label="Related learning resources"
          controls="header"
          heading={<h2 className="text-h4 tracking-[0.24px] text-ink">Related learning resources</h2>}
          itemClassName="w-[280px] sm:w-[320px] lg:w-[calc((100%-48px)/3)]"
        >
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
