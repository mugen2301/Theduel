import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Play, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/data";
import { MobileMenu } from "@/components/sections/mobile-menu";

export function Hero() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden border-b border-white/10">
      <header className="container-page relative z-20 flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-xl font-black uppercase tracking-[0.18em] text-bone">
          The Duel
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-steel md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-bone">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button href="#bulk" variant="secondary" className="min-h-10 px-4">
            Start order
          </Button>
        </div>
        <MobileMenu />
      </header>

      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&w=2200&q=90"
          alt="Athletes wearing premium training apparel"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-48 image-mask"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/72 to-ink" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,13,0.94)_0%,rgba(7,9,13,0.82)_35%,rgba(7,9,13,0.38)_100%)]" />
      </div>

      <div className="container-page relative z-10 grid min-h-[calc(92svh-80px)] items-center gap-12 pb-12 pt-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-bone backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-volt" />
            Factory-built custom sportswear
          </div>
          <h1 className="text-balance font-display text-5xl font-black leading-[0.9] text-bone sm:text-7xl lg:text-8xl">
            Custom teamwear made for the moment of arrival.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-steel sm:text-xl">
            Design sublimated jerseys, polos, tracksuits, hoodies, and uniforms with a premium factory workflow built for teams, dealers, and companies.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/customizer">Design Your T-Shirt</Button>
            <Button href="#products" variant="secondary">
              Explore products
            </Button>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 border-y border-white/10 py-5">
            {["MOQ ready", "Roster upload", "Artwork check"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-bold text-bone">
                <ChevronRight className="h-4 w-4 text-ember" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative ml-auto aspect-[4/5] max-w-[460px] overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 shadow-glow">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90"
              alt="Premium sportswear collection"
              fill
              sizes="460px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/12 bg-ink/76 p-4 backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-steel">Live factory slot</p>
                <p className="mt-1 text-xl font-black text-bone">Bulk kits opening</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ember text-white">
                <Play className="h-5 w-5 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
