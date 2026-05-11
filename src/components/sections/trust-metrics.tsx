import { Reveal } from "@/components/motion/reveal";
import { metrics } from "@/lib/data";

export function TrustMetrics() {
  return (
    <section className="border-y border-white/10 bg-white/[0.04] py-12">
      <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.04}>
            <div className="py-6">
              <p className="font-display text-5xl font-black text-bone">{metric.value}</p>
              <p className="mt-2 max-w-48 text-sm font-semibold uppercase tracking-[0.12em] text-steel">
                {metric.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
