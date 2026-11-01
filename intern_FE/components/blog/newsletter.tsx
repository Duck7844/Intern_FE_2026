import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Figma `section/newsletter` (756px tall on desktop, 996px on 375).
 * TODO(figma): the node could not be fetched (MCP quota). This is a
 * provisional block using the design tokens; replace once the spec is read.
 */
export function Newsletter() {
  return (
    <section className="bg-surface-a py-14 md:py-20 lg:py-[120px]">
      <Container gutter="fluid" className="flex flex-col items-center gap-8 text-center">
        <div className="flex max-w-[640px] flex-col gap-1 text-ink">
          <h2 className="text-h2-sm md:text-h2">Stay ahead of the market</h2>
          <p className="text-body2 md:text-body1">
            Get the latest buying, selling and mortgage insights from Pacificwide delivered to your inbox.
          </p>
        </div>
        <form className="flex w-full max-w-[520px] flex-col gap-3 sm:flex-row" action="#">
          <label className="flex h-11 min-w-0 flex-1 items-center rounded-xs border border-stroke-light bg-white px-3 focus-within:border-ink">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent text-body2 text-ink outline-none placeholder:text-ink-tertiary"
            />
          </label>
          <Button type="submit" size="md" className="w-full sm:w-auto">
            Subscribe
          </Button>
        </form>
      </Container>
    </section>
  );
}
