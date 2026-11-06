import Link from "next/link";
import { StarRating } from "@/components/ui/star-rating";
import type { Review } from "@/lib/data/home";
import { cn } from "@/lib/cn";

/**
 * Review card from the Testimonials grid. Spec inferred from the Figma
 * screenshot (quota-limited): grey card, 24px padding, initial avatar.
 */
export function TestimonialCard({ review, className }: { review: Review; className?: string }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between gap-6 rounded-sm border border-transparent bg-surface-a p-6 transition-colors hover:border-stroke-bold hover:bg-white",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <p className={cn("text-body3 text-ink", review.truncated && "line-clamp-7")}>{review.text}</p>
        {review.truncated && (
          <Link href="#" className="text-body3 text-ink underline underline-offset-2">
            View more
          </Link>
        )}
      </div>

      <footer className="flex items-center gap-3">
        <span
          aria-hidden
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full font-sans text-body2 font-bold text-white",
            review.avatarClass,
          )}
        >
          {review.initial}
        </span>
        <div className="flex min-w-0 flex-col">
          <p className="truncate text-body3 font-bold text-ink">{review.author}</p>
          <StarRating rating={review.rating} size={12} />
        </div>
      </footer>
    </article>
  );
}
