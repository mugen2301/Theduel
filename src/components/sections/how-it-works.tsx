import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { customizationSteps } from "@/lib/data";

export function HowItWorks() {
  return (
    <section id="customize" className="border-y border-white/10 bg-bone py-20 text-ink sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading
            eyebrow="Customization"
            title="From idea to approved production file."
            text="The customer journey should feel as simple as ordering online, while the backend captures the production data the factory actually needs."
            tone="light"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {customizationSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={index * 0.05}>
                  <article className="min-h-48 rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_20px_70px_rgba(7,9,13,0.08)]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-volt">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-black">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-ink/68">{step.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
