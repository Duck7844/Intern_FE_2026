import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/lib/data/home";
import { cn } from "@/lib/cn";

type ListingCardProps = {
  listing: Listing;
  className?: string;
};

/**
 * Figma `card/blog` (Picked For You) and `card` (Homes You Can Afford).
 * Optional overlays (tag, company badge) and the "Presented by" footer are
 * driven by the data so one component covers both variants.
 */
export function ListingCard({ listing, className }: ListingCardProps) {
  const { price, address, beds, baths, sqft, image, photoCount, tag, companyLogo, presentedBy, href } =
    listing;

  return (
    <article className={cn("flex w-full flex-col gap-4", className)}>
      {/* Image */}
      <Link
        href={href}
        className="relative block aspect-[320/220] w-full overflow-hidden rounded-xs bg-stroke-light"
        aria-label={`${price}, ${address}`}
      >
        <Image src={image} alt="" fill sizes="320px" className="object-cover" />

        {tag && (
          <div className="absolute inset-x-2 top-2 flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span className="inline-flex items-center rounded-label bg-white px-2 py-1 text-body3 text-ink">
              {tag}
            </span>
          </div>
        )}

        {photoCount > 1 && (
          <div
            aria-hidden
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5"
          >
            {Array.from({ length: photoCount }).map((_, i) => (
              <span
                key={i}
                className={cn("size-1.5 rounded-full bg-white", i > 0 && "opacity-60")}
              />
            ))}
          </div>
        )}

        {companyLogo && (
          <span className="absolute bottom-2 right-2 flex rounded-label bg-white p-1">
            <Image src={companyLogo} alt="Listing company" width={34} height={20} className="h-5 w-[34px] object-cover" />
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-center justify-between">
          <p className="font-heading text-h5 tracking-[0.4px] text-ink">{price}</p>
          <div className="flex items-center gap-3">
            <IconButton label="Share listing" icon="/icons/share-arrow.svg" />
            <IconButton label="Save listing" icon="/icons/bookmark-off.svg" />
          </div>
        </div>

        <div className="flex flex-col text-body2 text-ink">
          <p className="truncate">{address}</p>
          <p className="flex items-center gap-2">
            <span>{beds} beds</span>
            <Dot />
            <span>{baths} baths</span>
            <Dot />
            <span>{sqft} sqft</span>
          </p>
        </div>

        {presentedBy && (
          <div className="flex items-center gap-2">
            <Image
              src="/images/home/mls-logo.png"
              alt="MLS"
              width={48}
              height={28}
              className="h-7 w-12 shrink-0 object-cover"
            />
            <p className="min-w-0 flex-1 text-caption text-ink-secondary">{presentedBy}</p>
          </div>
        )}
      </div>
    </article>
  );
}

function Dot() {
  return <span aria-hidden className="size-1 shrink-0 rounded-full bg-stroke-bold" />;
}

function IconButton({ label, icon }: { label: string; icon: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-5 items-center justify-center rounded-sm hover:opacity-70"
    >
      <Image src={icon} alt="" width={20} height={20} />
    </button>
  );
}
