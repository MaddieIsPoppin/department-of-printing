import type { MetadataRoute } from "next";
import { products } from "@/data/products";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!process.env.SITE_URL || process.env.SITE_INDEXABLE !== "true") return [];
  const base = new URL(process.env.SITE_URL).origin;
  return ["", "/catalogue", "/custom", "/about", "/contact", ...products.map(product => `/product/${product.slug}`)].map(route => ({ url: `${base}${route}` }));
}
