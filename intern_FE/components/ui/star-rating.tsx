import { cn } from "@/lib/cn";

type StarRatingProps = {
  rating: number;
  max?: number;
  /** pixel size of one star */
  size?: number;
  className?: string;
};

/** Row of filled/empty stars in the Figma warning orange (#ff9500). */
export function StarRating({ rating, max = 5, size = 16, className }: StarRatingProps) {
  return (
    <span
      role="img"
      aria-label={`${rating} out of ${max} stars`}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} size={size} filled={i < rating} />
      ))}
    </span>
  );
}

function Star({ size, filled }: { size: number; filled: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden className="shrink-0">
      <path
        d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6z"
        fill={filled ? "var(--color-warning)" : "var(--color-stroke-light)"}
      />
    </svg>
  );
}
