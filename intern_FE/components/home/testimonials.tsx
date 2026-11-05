"use client";

import Image from "next/image";
import { useState } from "react";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PillTabs } from "@/components/ui/pill-tabs";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { REVIEW_SOURCES, REVIEW_SUMMARY, REVIEWS, type ReviewSource } from "@/lib/data/home";
import type { SectionCopy } from "./section-copy";

/**
 * Figma `re/testimonials/1440px`. Layout inferred from the screenshot
 * (quota-limited): heading, source pills, big score, 3x2 review grid, CTA.
 */
export function Testimonials({ copy }: { copy: SectionCopy }) {
  const [source, setSource] = useState<ReviewSource>("google");
  const reviews = REVIEWS.filter((r) => r.source === source);
  const activeLabel = REVIEW_SOURCES.find((s) => s.id === source)?.label ?? "";

  return (
    <section className="bg-white py-14 md:py-20 lg:py-[120px]">
      <Container className="flex flex-col items-center gap-8 md:gap-10">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <SectionHeading title={copy.title} description={copy.content} />
          <PillTabs tabs={REVIEW_SOURCES} value={source} onChange={setSource} label="Review source" />
          <div className="flex flex-col items-center gap-1">
            <p className="font-heading text-h1-sm leading-none text-ink md:text-h1">
              {REVIEW_SUMMARY.score}
            </p>
            <StarRating rating={REVIEW_SUMMARY.rating} size={18} />
            <p className="text-body3 text-ink-secondary">{REVIEW_SUMMARY.count}</p>
          </div>
        </div>

        {reviews.length > 0 ? (
          <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.id}>
                <TestimonialCard review={r} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-10 text-body2 text-ink-secondary">No {activeLabel} reviews yet.</p>
        )}

        <Button href="#" variant="outline" size="sm">
          View all reviews on {activeLabel}
          <Image src="/icons/arrow-up-right.svg" alt="" width={16} height={16} />
        </Button>
      </Container>
    </section>
  );
}
