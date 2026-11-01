import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckList } from "@/components/ui/check-list";
import { Container } from "@/components/ui/container";
import type { FeatureSplitContent } from "@/lib/data/home";
import { cn } from "@/lib/cn";

type FeatureSplitProps = {
  content: FeatureSplitContent;
  /** Image on the right instead of the left (Pre-approval layout). */
  reverse?: boolean;
  tone?: "white" | "grey";
};

/**
 * Two-column "image + pitch" block shared by Home Estimate and Pre-Approval.
 * Layout inferred from the Figma screenshot (quota-limited).
 */
export function FeatureSplit({ content, reverse = false, tone = "white" }: FeatureSplitProps) {
  return (
    <section className={cn("py-10 md:py-16 lg:py-20", tone === "grey" ? "bg-surface-a" : "bg-white")}>
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className={cn("relative aspect-[556/340] w-full overflow-hidden rounded-s bg-stroke-light", reverse && "lg:order-2")}>
          <Image
            src={content.image}
            alt={content.imageAlt}
            fill
            sizes="(min-width: 1024px) 556px, 100vw"
            className="object-cover"
          />
        </div>

        <div className={cn("flex flex-col items-start gap-6 md:gap-8", reverse && "lg:order-1")}>
          <div className="flex flex-col gap-5 md:gap-6">
            <div className="flex flex-col gap-1 text-ink">
              <h2 className="text-h2-sm md:text-h2">{content.title}</h2>
              <p className="text-body2 md:text-body1">
                {content.description.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br className="hidden md:block" />}
                    {i > 0 && " "}
                    {line}
                  </span>
                ))}
              </p>
            </div>
            <CheckList items={content.points} />
          </div>
          <Button href={content.href} size="sm">
            {content.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
