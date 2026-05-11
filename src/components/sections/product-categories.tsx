import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories } from "@/lib/catalog";

export function ProductCategories() {
  return (
    <section id="products" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Product system"
          title="Everything your team wears, built under one standard."
          text="Launch a club kit, corporate uniform program, tournament drop, or dealer catalogue with consistent fabrics, trims, artwork control, and repeat-order records."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => (
            <Reveal key={category.name} delay={index * 0.05} className={index === 0 ? "lg:col-span-2" : ""}>
              <Link
                href={`/products/${category.slug}`}
                className="group relative block min-h-[330px] overflow-hidden rounded-2xl border border-white/10 bg-graphite"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover opacity-78 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-display text-2xl font-black text-bone">{category.name}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-bone/76">
                    {category.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
