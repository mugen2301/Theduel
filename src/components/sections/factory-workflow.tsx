import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { workflow } from "@/lib/data";

export function FactoryWorkflow() {
  return (
    <section id="factory" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/12 bg-white/8">
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1400&q=90"
                alt="Factory apparel workflow"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/12 bg-ink/78 p-5 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-volt">ERP ready</p>
                <p className="mt-2 font-display text-3xl font-black text-bone">Every order becomes a trackable job card.</p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Factory workflow"
              title="Built like a manufacturing platform, not a form submission site."
              text="Orders move through artwork, print setup, sublimation, stitching, QC, packing, and dispatch with clear internal ownership."
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {workflow.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <Reveal key={stage.title} delay={index * 0.04}>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                      <Icon className="h-5 w-5 text-ember" />
                      <h3 className="mt-5 font-display text-xl font-black text-bone">{stage.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-steel">{stage.detail}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
