import Image from "next/image";
import { cn } from "@/lib/cn";

type CheckListProps = {
  items: string[];
  className?: string;
};

/** Figma bullet rows: 20px `icon/success` + Body 2 text, 8px apart. */
export function CheckList({ items, className }: CheckListProps) {
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {items.map((text) => (
        <li key={text} className="flex items-start gap-2 text-body2 text-ink">
          <span className="flex size-5 shrink-0 items-center justify-center" aria-hidden>
            <Image src="/icons/check-circle.svg" alt="" width={17} height={17} />
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}
