import { HOME_ESTIMATE } from "@/lib/data/home";
import { FeatureSplit } from "./feature-split";
import type { SectionCopy } from "./section-copy";

/** Figma `re/home estimate/1440px` – image left, pitch right. */
export function HomeEstimate({ copy }: { copy: SectionCopy }) {
  return <FeatureSplit content={HOME_ESTIMATE} copy={copy} />;
}
