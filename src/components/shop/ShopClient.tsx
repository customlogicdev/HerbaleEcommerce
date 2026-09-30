"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/product/ProductCard";

type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

export function ShopClient({
  products,
  initialCategory,
  initialSort,
}: {
  products: Product[];
  initialCategory?: string;
  initialSort?: string;
}) {
  const [category, setCategory] = useState<string>(initialCategory ?? "all");
  const [sort, setSort] = useState<SortKey>((initialSort as SortKey) || "featured");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const pageSize = 8;

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (product.price > maxPrice) return false;
      if (product.rating < minRating) return false;
      if (inStockOnly && !product.inStock) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "newest") list = [...list].reverse();
    if (sort === "featured") list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [products, category, sort, minRating, maxPrice, inStockOnly]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  function changeCategory(next: string) {
    setCategory(next);
    setPage(1);
  }

  const filters = (
    <aside className="space-y-8">
      <div>
        <p className="text-xs tracking-[0.18em] text-forest uppercase">Category</p>
        <div className="mt-3 space-y-2">
          <FilterChip active={category === "all"} onClick={() => changeCategory("all")} label="All products" />
          {categories.map((item) => (
            <FilterChip
              key={item.slug}
              active={category === item.slug}
              onClick={() => changeCategory(item.slug)}
              label={item.name}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs tracking-[0.18em] text-forest uppercase">Price up to {maxPrice === 50 ? "$50+" : `$${maxPrice}`}</p>
        <input
          type="range"
          min={12}
          max={50}
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setPage(1);
          }}
          className="mt-3 w-full accent-forest"
        />
      </div>
      <div>
        <p className="text-xs tracking-[0.18em] text-forest uppercase">Rating</p>
        <div className="mt-3 space-y-2">
          {[0, 4, 4.5].map((value) => (
            <FilterChip
              key={value}
              active={minRating === value}
              onClick={() => {
                setMinRating(value);
                setPage(1);
              }}
              label={value === 0 ? "Any rating" : `${value}+ stars`}
            />
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => {
            setInStockOnly(e.target.checked);
            setPage(1);
          }}
          className="accent-forest"
        />
        In stock only
      </label>
    </aside>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs tracking-[0.22em] text-forest uppercase">The garden</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-serif text-4xl sm:text-5xl">Shop HairBloom</h1>
        <p className="text-sm text-muted">{filtered.length} products</p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-beige px-4 py-2 text-sm lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
        <div className="ml-auto flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-10 rounded-full border border-beige bg-white px-4 text-sm"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="newest">Newest</option>
          </select>
          <div className="flex rounded-full border border-beige p-1">
            <button type="button" aria-label="Grid view" onClick={() => setLayout("grid")} className={`grid h-8 w-8 place-items-center rounded-full ${layout === "grid" ? "bg-forest text-white" : ""}`}>
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button type="button" aria-label="List view" onClick={() => setLayout("list")} className={`grid h-8 w-8 place-items-center rounded-full ${layout === "list" ? "bg-forest text-white" : ""}`}>
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {filtersOpen && <div className="mt-4 rounded-3xl bg-white p-5 lg:hidden">{filters}</div>}

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
        <div className="hidden lg:block">{filters}</div>
        <div>
          {visible.length === 0 ? (
            <p className="py-20 text-center text-muted">No products match these filters.</p>
          ) : layout === "grid" ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} layout="list" />
              ))}
            </div>
          )}
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index + 1)}
                className={`h-10 w-10 rounded-full text-sm ${page === index + 1 ? "bg-forest text-white" : "bg-white"}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full rounded-full px-3 py-1.5 text-left text-sm ${active ? "bg-forest text-white" : "hover:bg-beige"}`}
    >
      {label}
    </button>
  );
}


