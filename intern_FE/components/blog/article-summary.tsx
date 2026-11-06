import { SparkleIcon } from "@/components/icons/ui-icons";

/** Grey "Summary" box with the AI-generated note underneath. */
export function ArticleSummary({ text }: { text: string }) {
  return (
    <aside aria-labelledby="article-summary" className="rounded-sm bg-surface-a p-6 md:p-8">
      <h2 id="article-summary" className="text-h5 text-ink">
        Summary
      </h2>
      <p className="mt-4 text-body2 text-ink">{text}</p>
      <p className="mt-6 flex items-center justify-center gap-2 text-body3 text-ink-secondary">
        <SparkleIcon />
        AI-generated summary for quick review
      </p>
    </aside>
  );
}
