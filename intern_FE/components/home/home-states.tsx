import { Container } from "@/components/ui/container";

/** Shown in the static shell while the CMS data streams in. */
export function HomeSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading homepage" className="animate-pulse">
      <div className="h-[520px] bg-ink/80 md:h-[624px]" />
      <Container className="flex flex-col gap-10 py-20">
        <div className="mx-auto h-10 w-64 rounded bg-surface" />
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[320px] rounded-s bg-surface-a" />
          ))}
        </div>
      </Container>
    </div>
  );
}

export function HomeError({ detail }: { detail?: string }) {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-h2-sm text-ink md:text-h2">Content is temporarily unavailable</h1>
      <p className="mt-3 text-body2 text-ink-secondary">
        We could not load the homepage content. Please try again in a moment.
      </p>
      {detail && process.env.NODE_ENV !== "production" && (
        <p className="mt-4 text-body3 text-ink-tertiary">{detail}</p>
      )}
    </Container>
  );
}

export function HomeEmpty() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-h2-sm text-ink md:text-h2">Nothing to show yet</h1>
      <p className="mt-3 text-body2 text-ink-secondary">
        No homepage sections have been published. Sign in to the admin area to add content.
      </p>
    </Container>
  );
}
