# Product Category System

The catalog is built for Next.js App Router with static generation, SEO-friendly URLs, reusable UI components, and typed data that can later be replaced by Laravel API responses.

## Routes

```text
/products
/products/[categorySlug]
/products/[categorySlug]/[productSlug]
```

Examples:

```text
/products/cricket-jerseys
/products/football-jerseys/club-football-match-jersey
/products/esports-jerseys/pro-esports-jersey
```

## File Structure

```text
src/
|-- app/
|   |-- products/
|   |   |-- page.tsx
|   |   |-- [categorySlug]/
|   |   |   |-- page.tsx
|   |   |   `-- [productSlug]/
|   |   |       `-- page.tsx
|   |-- layout.tsx
|   `-- page.tsx
|-- components/
|   |-- catalog/
|   |   |-- catalog-header.tsx
|   |   |-- category-card.tsx
|   |   |-- product-card.tsx
|   |   |-- product-detail.tsx
|   |   `-- product-filters.tsx
|   |-- sections/
|   `-- ui/
`-- lib/
    |-- catalog.ts
    |-- data.ts
    `-- utils.ts
```

## Data Shape

`src/lib/catalog.ts` defines:

```ts
type ProductCategory = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  sports: string[];
  seo: {
    title: string;
    description: string;
  };
};

type Product = {
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  priceLabel: string;
  minimumOrderQuantity: number;
  leadTime: string;
  sport: string;
  fabric: string;
  fit: "Regular" | "Athletic" | "Relaxed";
  tags: string[];
  features: string[];
};
```

## SEO And Performance

- Category and product pages use readable slugs.
- `generateStaticParams` prebuilds every category and product URL.
- `generateMetadata` creates page-specific titles, descriptions, and canonicals.
- Images use `next/image` for optimized loading.
- Filtering is client-side and local to the current category for immediate interaction.
