export function BlogListSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading articles" className="flex w-full animate-pulse flex-col gap-8">
      <div className="h-11 w-full rounded-xs bg-surface lg:w-[340px] lg:self-end" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-[480px] rounded-xs bg-surface lg:col-span-2" />
        <div className="flex flex-col gap-10">
          <div className="h-[220px] rounded-xs bg-surface" />
          <div className="h-[220px] rounded-xs bg-surface" />
        </div>
      </div>
    </div>
  );
}

export function BlogError({ detail }: { detail?: string }) {
  return (
    <div className="w-full rounded-s border border-stroke-light bg-surface-a px-6 py-16 text-center">
      <h2 className="text-h3 text-ink">Articles are temporarily unavailable</h2>
      <p className="mt-2 text-body2 text-ink-secondary">We could not reach the content service. Please try again shortly.</p>
      {detail && process.env.NODE_ENV !== "production" && (
        <p className="mt-4 text-body3 text-ink-tertiary">{detail}</p>
      )}
    </div>
  );
}

export function BlogEmpty({ query }: { query?: string }) {
  return (
    <div className="w-full rounded-s border border-stroke-light bg-surface-a px-6 py-16 text-center">
      <h2 className="text-h3 text-ink">{query ? "No articles match your search" : "No articles yet"}</h2>
      <p className="mt-2 text-body2 text-ink-secondary">
        {query ? `Nothing found for “${query}”. Try a different keyword.` : "Check back soon for new guides and market insights."}
      </p>
    </div>
  );
}
