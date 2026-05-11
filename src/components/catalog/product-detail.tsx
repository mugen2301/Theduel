import Image from "next/image";
import type { ReactNode } from "react";
import { Check, Clock, PackageCheck } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/catalog";
import { Button } from "@/components/ui/button";

type ProductDetailProps = {
  product: Product;
  category: ProductCategory;
};

export function ProductDetail({ product, category }: ProductDetailProps) {
  return (
    <section className="container-page grid gap-10 pb-20 sm:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <div className="grid gap-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-graphite">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {product.gallery.slice(0, 2).map((image) => (
            <div
              key={image}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-graphite"
            >
              <Image
                src={image}
                alt={`${product.name} detail`}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <aside className="lg:sticky lg:top-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-volt">{category.name}</p>
        <h1 className="mt-4 font-display text-5xl font-black leading-[0.92] text-bone sm:text-6xl">
          {product.name}
        </h1>
        <p className="mt-6 text-lg leading-8 text-steel">{product.description}</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Spec icon={<PackageCheck className="h-5 w-5" />} label="MOQ" value={`${product.minimumOrderQuantity}+ pcs`} />
          <Spec icon={<Clock className="h-5 w-5" />} label="Lead time" value={product.leadTime} />
          <Spec icon={<Check className="h-5 w-5" />} label="Pricing" value={product.priceLabel} />
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.045] p-6">
          <h2 className="font-display text-2xl font-black text-bone">Built for production</h2>
          <div className="mt-5 grid gap-3">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-sm font-semibold text-steel">
                <Check className="h-4 w-4 text-volt" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/quote">Request quote</Button>
          <Button href={`/products/${category.slug}`} variant="secondary">
            Back to category
          </Button>
        </div>
      </aside>
    </section>
  );
}

type SpecProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function Spec({ icon, label, value }: SpecProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <div className="text-ember">{icon}</div>
      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-steel">{label}</p>
      <p className="mt-1 text-sm font-black text-bone">{value}</p>
    </div>
  );
}
