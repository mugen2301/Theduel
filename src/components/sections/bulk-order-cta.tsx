import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function BulkOrderCta() {
  return (
    <section id="bulk" className="py-8">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-bone text-ink">
            <Image
              src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1800&q=90"
              alt="Team sports bulk order"
              fill
              sizes="100vw"
              className="object-cover opacity-20"
            />
            <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-ember">Bulk ordering</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl font-black leading-none sm:text-6xl">
                  Build once. Order for an entire squad, company, or tournament.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-ink/70">
                  Upload rosters, collect size breaks, approve artwork, and send a production-ready order without endless spreadsheet chaos.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button href="/quote" className="bg-ink text-bone hover:bg-ember">
                  Request quote
                </Button>
                <Button href="/dashboard" variant="secondary" className="border-ink/15 bg-white/60 text-ink hover:bg-white">
                  View dashboard
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
