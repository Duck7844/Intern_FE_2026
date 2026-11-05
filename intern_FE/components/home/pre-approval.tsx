import { PRE_APPROVAL } from "@/lib/data/home";
import { FeatureSplit } from "./feature-split";
import type { SectionCopy } from "./section-copy";

/** Figma `re/pre approval/1440px` – pitch left, image right, grey background. */
export function PreApproval({ copy }: { copy: SectionCopy }) {
  return <FeatureSplit content={PRE_APPROVAL} copy={copy} reverse tone="grey" />;
}
