import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Proof"
          title="Designed for buyers who need control at scale."
          text="Teamwear becomes complex fast. The Duel gives customers, dealers, and internal teams one clean operating model."
          align="center"
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.author} delay={index * 0.06}>
              <article className="flex min-h-72 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.045] p-6">
                <Quote className="h-8 w-8 text-ember" />
                <p className="mt-6 text-lg font-semibold leading-8 text-bone">"{testimonial.quote}"</p>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-display text-xl font-black text-bone">{testimonial.author}</p>
                  <p className="mt-1 text-sm text-steel">{testimonial.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
