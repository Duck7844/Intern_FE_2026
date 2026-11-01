import { HOME_ESTIMATE } from "@/lib/data/home";
import { FeatureSplit } from "./feature-split";

/** Figma `re/home estimate/1440px` – image left, pitch right. */
export function HomeEstimate() {
  return <FeatureSplit content={HOME_ESTIMATE} />;
}
