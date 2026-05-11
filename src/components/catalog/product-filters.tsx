"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";
import { getFilterOptions } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/product-card";

type ProductFiltersProps = {
  products: Product[];
};

const allValue = "all";

export function ProductFilters({ products }: ProductFiltersProps) {
  const options = useMemo(() => getFilterOptions(products), [products]);
  const [sport, setSport] = useState(allValue);
  const [fabric, setFabric] = useState(allValue);
  const [fit, setFit] = useState(allValue);

  const filteredProducts = products.filter((product) => {
    return (
      (sport === allValue || product.sport === sport) &&
      (fabric === allValue || product.fabric === fabric) &&
      (fit === allValue || product.fit === fit)
    );
  });

  return (
    <div className="container-page pb-20 sm:pb-28">
      <div className="mb-8 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:grid-cols-3">
        <FilterSelect label="Sport" value={sport} options={options.sports} onChange={setSport} />
        <FilterSelect label="Fabric" value={fabric} options={options.fabrics} onChange={setFabric} />
        <FilterSelect label="Fit" value={fit} options={options.fits} onChange={setFit} />
      </div>

      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-steel">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        <button
          type="button"
          onClick={() => {
            setSport(allValue);
            setFabric(allValue);
            setFit(allValue);
          }}
          className="text-sm font-black text-volt transition hover:text-bone"
        >
          Reset filters
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-steel">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-white/10 bg-ink px-4 text-sm font-bold text-bone outline-none transition focus:border-volt"
      >
        <option value={allValue}>All {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
