import { PRE_APPROVAL } from "@/lib/data/home";
import { FeatureSplit } from "./feature-split";

/** Figma `re/pre approval/1440px` – pitch left, image right, grey background. */
export function PreApproval() {
  return <FeatureSplit content={PRE_APPROVAL} reverse tone="grey" />;
}
