import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductCategory } from "@/lib/catalog";

type CategoryCardProps = {
  category: ProductCategory;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-graphite"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover opacity-76 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/38 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-volt">
          {category.eyebrow}
        </p>
        <div className="mt-3 flex items-end justify-between gap-5">
          <div>
            <h2 className="font-display text-3xl font-black text-bone">{category.name}</h2>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-bone/72">
              {category.description}
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bone text-ink transition group-hover:bg-volt">
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
