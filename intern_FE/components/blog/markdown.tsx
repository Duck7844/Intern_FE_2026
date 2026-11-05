import Image from "next/image";
import type { ComponentProps } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { resolveMediaUrl } from "@/lib/api/config";

type ImgProps = ComponentProps<"img">;

/**
 * Safe Markdown renderer for article bodies. react-markdown never injects
 * raw HTML (no rehype-raw) and strips `javascript:` style URLs, so content
 * typed into the admin cannot execute scripts on the public site.
 */
export function Markdown({ content }: { content: string }) {
  return (
    <div className="text-body2 text-ink [&>*+*]:mt-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          h1: ({ children }) => <h2 className="mt-10 font-sans text-body1 font-bold leading-5 text-ink first:mt-0">{children}</h2>,
          h2: ({ children }) => <h2 className="mt-10 font-sans text-body1 font-bold leading-5 text-ink first:mt-0">{children}</h2>,
          h3: ({ children }) => <h3 className="mt-8 font-sans text-body2 font-bold text-ink">{children}</h3>,
          p: ({ children }) => <p>{children}</p>,
          a: ({ href, children }) => (
            <a href={href} className="text-brand underline underline-offset-2" rel="noopener noreferrer">
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6">{children}</ol>,
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-brand pl-4 text-ink-secondary">{children}</blockquote>
          ),
          code: ({ children }) => <code className="rounded bg-surface px-1 py-0.5 font-mono text-[0.9em]">{children}</code>,
          pre: ({ children }) => <pre className="overflow-x-auto rounded-xs bg-surface-a p-4 text-body3">{children}</pre>,
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-body3">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="border border-stroke-light bg-surface-a px-3 py-2 text-left">{children}</th>,
          td: ({ children }) => <td className="border border-stroke-light px-3 py-2">{children}</td>,
          img: ({ src, alt }: ImgProps) => <ArticleImage src={typeof src === "string" ? src : undefined} alt={alt ?? ""} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function ArticleImage({ src, alt }: { src?: string; alt: string }) {
  const resolved = resolveMediaUrl(src);
  if (!resolved) return null;
  return (
    <figure className="my-8 overflow-hidden rounded-xs bg-stroke-light">
      <Image src={resolved} alt={alt} width={1440} height={900} sizes="(min-width: 768px) 720px, 100vw" className="h-auto w-full object-cover" />
      {alt && <figcaption className="px-1 pt-2 text-body3 text-ink-secondary">{alt}</figcaption>}
    </figure>
  );
}
