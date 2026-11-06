import type { ServiceBlock } from "@/lib/data/services";

/**
 * Grey service card from the Services design: 1px light stroke, 12px radius,
 * 32px padding, Bebas H4 title and a bulleted Body 2 list.
 */
export function ServiceCard({ block }: { block: ServiceBlock }) {
  return (
    <section
      id={block.id}
      aria-labelledby={`${block.id}-title`}
      className="rounded-sm border border-stroke-light bg-surface-a p-6 md:p-8"
    >
      <h2 id={`${block.id}-title`} className="text-h4 tracking-[0.24px] text-ink">
        {block.title}
      </h2>
      <ul className="mt-6 list-disc space-y-0 pl-6 text-body2 text-ink">
        {block.points.map((point, i) => (
          <li key={i} className="pl-1">
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
