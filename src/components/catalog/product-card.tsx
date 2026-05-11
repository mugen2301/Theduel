import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/catalog";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.categorySlug}/${product.slug}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] transition duration-300 hover:-translate-y-1 hover:border-volt/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-86 transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-steel"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="font-display text-2xl font-black text-bone">{product.name}</h2>
        <p className="mt-3 min-h-12 text-sm leading-6 text-steel">{product.shortDescription}</p>
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-steel">MOQ</p>
            <p className="mt-1 text-sm font-black text-bone">{product.minimumOrderQuantity}+ pcs</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-volt">
            View product
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
