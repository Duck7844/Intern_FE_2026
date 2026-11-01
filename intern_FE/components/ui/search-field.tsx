import Image from "next/image";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> & {
  label: string;
  className?: string;
};

/** Figma `Item/Input Field/Medium` – 44px field, 8px radius, trailing search icon. */
export function SearchField({ label, className, ...input }: SearchFieldProps) {
  return (
    <label
      className={cn(
        "flex h-11 min-w-0 items-center gap-2 rounded-xs border border-stroke-light bg-white py-2 pl-3 pr-2.5 focus-within:border-ink",
        className,
      )}
    >
      <span className="sr-only">{label}</span>
      <input
        type="search"
        {...input}
        className="min-w-0 flex-1 bg-transparent text-body2 text-ink outline-none placeholder:text-ink-tertiary"
      />
      <Image src="/icons/search.svg" alt="" width={20} height={20} className="shrink-0" />
    </label>
  );
}
