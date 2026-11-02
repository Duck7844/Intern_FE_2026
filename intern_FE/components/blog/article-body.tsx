import Image from "next/image";
import type { ContentBlock } from "@/lib/data/blog";

/**
 * Renders the article content blocks with the spacing read from the design:
 * paragraphs flush (16/24), 40px above a sub-heading, 16px below it,
 * 32px around images, decimal list indented 24px.
 */
export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="text-body2 text-ink">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className="mt-10 mb-4 font-sans text-body1 font-bold leading-5 text-ink first:mt-0">
                {block.text}
              </h2>
            );
          case "paragraph":
            return <p key={i}>{block.text}</p>;
          case "image":
            return (
              <figure key={i} className="my-8 overflow-hidden rounded-xs bg-stroke-light">
                {block.width && block.height ? (
                  // Intrinsic size known: keep the image's own aspect ratio.
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    sizes="(min-width: 768px) 720px, 100vw"
                    className="h-auto w-full object-cover"
                  />
                ) : (
                  <div className="relative aspect-[35/24] w-full">
                    <Image src={block.src} alt={block.alt} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
                  </div>
                )}
              </figure>
            );
          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag key={i} className={block.ordered ? "list-decimal pl-6" : "list-disc pl-6"}>
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    {item}
                  </li>
                ))}
              </Tag>
            );
          }
        }
      })}
    </div>
  );
}
