import { AgentCard } from "@/components/cards/agent-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AGENTS } from "@/lib/data/home";

/**
 * Figma `re/agents/1440px`. Layout inferred from the screenshot
 * (quota-limited): heading, CTA, 3x2 grid of agent cards on grey.
 */
export function Agents() {
  return (
    <section className="bg-surface-a py-14 md:py-20 lg:py-[120px]">
      <Container className="flex flex-col items-center gap-10 md:gap-[60px]">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <SectionHeading
            title="Meet Your Local Experts in San Jose"
            description={
              <>
                Work with agents who live and specialize in your area.
                <br className="hidden lg:block" /> Get accurate pricing, local insights, and strong
                negotiation support to move with confidence.
              </>
            }
          />
          <Button href="#" size="sm">
            View all Agents
          </Button>
        </div>

        <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <li key={a.id}>
              <AgentCard agent={a} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
