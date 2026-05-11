import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CatalogHeader } from "@/components/catalog/catalog-header";
import { ProductFilters } from "@/components/catalog/product-filters";
import { Footer } from "@/components/sections/footer";
import { categories, getCategory, getProductsByCategory } from "@/lib/catalog";

type CategoryPageProps = {
  params: Promise<{
    categorySlug: string;
  }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({
    categorySlug: category.slug
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) {
    return {};
  }

  return {
    title: category.seo.title,
    description: category.seo.description,
    alternates: {
      canonical: `/products/${category.slug}`
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category.slug);

  return (
    <main>
      <CatalogHeader
        eyebrow={category.eyebrow}
        title={category.name}
        description={category.description}
        backHref="/products"
        backLabel="All products"
      />
      <section className="container-page pb-10">
        <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-white/10 bg-graphite">
          <Image
            src={category.image}
            alt={category.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-72"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
          <div className="absolute bottom-0 left-0 max-w-2xl p-7 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-volt">
              {categoryProducts.length} product systems
            </p>
            <h2 className="mt-3 font-display text-4xl font-black text-bone">
              Filter by sport, fabric, and fit.
            </h2>
            <p className="mt-4 text-sm leading-6 text-bone/72">
              This category page is statically generated for speed and keeps filters on the client for a fast shopping experience.
            </p>
          </div>
        </div>
      </section>
      <ProductFilters products={categoryProducts} />
      <Footer />
    </main>
  );
}
