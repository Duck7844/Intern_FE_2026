import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const fieldClasses =
  "w-full rounded-xs border border-stroke-light bg-white px-3 text-body2 text-ink outline-none transition-colors placeholder:text-ink-tertiary focus:border-ink disabled:bg-surface-a";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  /** Accessible label (visually hidden); falls back to the placeholder. */
  label?: string;
  className?: string;
};

/** Figma `Item/Input Field/Medium`: 44px tall, 8px radius, 1px light stroke. */
export function Input({ label, className, ...input }: InputProps) {
  return (
    <label className={cn("block min-w-0", className)}>
      <span className="sr-only">{label ?? input.placeholder}</span>
      <input {...input} className={cn(fieldClasses, "h-11")} />
    </label>
  );
}

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
  label?: string;
  className?: string;
};

export function Textarea({ label, className, ...textarea }: TextareaProps) {
  return (
    <label className={cn("block min-w-0", className)}>
      <span className="sr-only">{label ?? textarea.placeholder}</span>
      <textarea {...textarea} className={cn(fieldClasses, "min-h-[190px] resize-y py-2.5")} />
    </label>
  );
}
