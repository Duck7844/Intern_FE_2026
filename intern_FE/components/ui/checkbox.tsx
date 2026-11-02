import type { InputHTMLAttributes, ReactNode } from "react";
import { CheckIcon } from "@/components/icons/ui-icons";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className" | "children"> & {
  children: ReactNode;
  className?: string;
};

/**
 * 20px brand-red checkbox with a white tick (newsletter consent rows).
 * Native input kept for accessibility; the visual box is drawn beside it.
 */
export function Checkbox({ children, className, ...input }: CheckboxProps) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3 text-body3 text-ink", className)}>
      <span className="relative mt-0.5 flex size-5 shrink-0">
        <input
          type="checkbox"
          {...input}
          className="peer size-5 appearance-none rounded border border-stroke-bold bg-white transition-colors checked:border-brand checked:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        />
        <CheckIcon className="pointer-events-none absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100" />
      </span>
      <span>{children}</span>
    </label>
  );
}
