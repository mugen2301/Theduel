import type { Metadata } from "next";
import { CatalogHeader } from "@/components/catalog/catalog-header";
import { CategoryCard } from "@/components/catalog/category-card";
import { Footer } from "@/components/sections/footer";
import { categories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Custom Sportswear Products | The Duel",
  description:
    "Explore custom cricket jerseys, football jerseys, polo t-shirts, tracksuits, hoodies, corporate uniforms, cycling jerseys, and esports jerseys."
};

export default function ProductsPage() {
  return (
    <main>
      <CatalogHeader
        eyebrow="Product catalogue"
        title="Custom sportswear categories built for teams and bulk buyers."
        description="Browse SEO-friendly product categories, compare manufacturing options, and move from product discovery to quote-ready orders."
      />
      <section className="container-page grid gap-4 pb-20 sm:grid-cols-2 sm:pb-28 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </section>
      <Footer />
    </main>
  );
}
