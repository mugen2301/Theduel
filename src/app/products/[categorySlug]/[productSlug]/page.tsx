import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogHeader } from "@/components/catalog/catalog-header";
import { ProductDetail } from "@/components/catalog/product-detail";
import { Footer } from "@/components/sections/footer";
import { getCategory, getProduct, products } from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{
    categorySlug: string;
    productSlug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    categorySlug: product.categorySlug,
    productSlug: product.slug
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { categorySlug, productSlug } = await params;
  const product = getProduct(categorySlug, productSlug);
  const category = getCategory(categorySlug);

  if (!product || !category) {
    return {};
  }

  return {
    title: `${product.name} | ${category.name} | The Duel`,
    description: product.shortDescription,
    alternates: {
      canonical: `/products/${category.slug}/${product.slug}`
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { categorySlug, productSlug } = await params;
  const category = getCategory(categorySlug);
  const product = getProduct(categorySlug, productSlug);

  if (!category || !product) {
    notFound();
  }

  return (
    <main>
      <CatalogHeader
        eyebrow={category.name}
        title={product.name}
        description={product.shortDescription}
        backHref={`/products/${category.slug}`}
        backLabel={category.name}
      />
      <ProductDetail product={product} category={category} />
      <Footer />
    </main>
  );
}
