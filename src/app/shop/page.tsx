import type { Metadata } from "next";
import { products } from "@/data/products";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse HairBloom shampoos, serums, oils, and botanicals.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  return <ShopClient products={products} initialCategory={params.category} initialSort={params.sort} />;
}
