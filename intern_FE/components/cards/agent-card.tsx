import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Agent } from "@/lib/data/home";
import { cn } from "@/lib/cn";

/**
 * Agent card from the "Meet Your Local Experts" grid. Spec inferred from the
 * Figma screenshot (quota-limited): white card, 12px radius, portrait on top,
 * two stats and a full-width outline CTA.
 */
export function AgentCard({ agent, className }: { agent: Agent; className?: string }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-s border border-transparent bg-white transition-shadow hover:border-stroke-bold hover:shadow-card",
        className,
      )}
    >
      <div className="relative aspect-[365/264] w-full bg-surface">
        {agent.photo ? (
          <Image src={agent.photo} alt={agent.name} fill sizes="(min-width: 1024px) 365px, 100vw" className="object-cover" />
        ) : (
          <PersonPlaceholder />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-sans text-body1 font-bold leading-5 text-ink">{agent.name}</h3>
          <p className="text-body3 text-ink-secondary">{agent.role}</p>
        </div>

        <address className="flex flex-col gap-0.5 not-italic">
          <a href={`mailto:${agent.email}`} className="truncate text-body3 text-ink hover:underline">
            {agent.email}
          </a>
          <a href={`tel:${agent.phone.replace(/\D/g, "")}`} className="text-body3 text-ink hover:underline">
            {agent.phone}
          </a>
        </address>

        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dd className="text-body2 font-bold text-ink">{agent.salesVolume}</dd>
            <dt className="text-body3 text-ink-secondary">Sales Volume</dt>
          </div>
          <div>
            <dd className="text-body2 font-bold text-ink">{agent.totalDeals}</dd>
            <dt className="text-body3 text-ink-secondary">Total Deals</dt>
          </div>
        </dl>

        <Button href={agent.href} variant="outline" size="sm" className="mt-auto w-full">
          Schedule Meeting
        </Button>
      </div>
    </article>
  );
}

/** Grey silhouette matching the first (photo-less) card in the Figma grid. */
function PersonPlaceholder() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 120"
      className="absolute inset-0 m-auto h-[60%] w-auto text-stroke-bold"
      fill="currentColor"
    >
      <circle cx="60" cy="40" r="24" />
      <path d="M12 118c0-26 21-44 48-44s48 18 48 44H12z" />
    </svg>
  );
}
