import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { dealerBenefits } from "@/lib/data";

export function DealerProgram() {
  return (
    <section id="dealers" className="py-20 sm:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-8">
          <SectionHeading
            eyebrow="Dealer program"
            title="A wholesale engine for sportswear dealers."
            text="Give dealers a branded, trackable way to quote customers, place orders, monitor production, and protect margins."
          />
          <div className="mt-8">
            <Button href="/dealer" variant="secondary">
              Apply as dealer
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          {dealerBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={index * 0.05}>
                <article className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.045] p-6 sm:grid-cols-[auto_1fr]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-volt text-ink">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black text-bone">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-steel">{benefit.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
