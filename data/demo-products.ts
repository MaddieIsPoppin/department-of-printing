import type { Product } from "./products";

export type DemoProduct = Product & { sourceSlug: string; preview: true };

// Explicit input keeps demo generation independent of the real catalogue module.
// No random values, commercial claims or invented garment/media combinations.
export function createDemoProducts(source: Product[]): DemoProduct[] {
  if (!source.length) return [];
  return Array.from({ length: 40 }, (_, index) => {
    const edition = Math.floor(index / source.length) + 1;
    // Offset each edition so adjacent columns do not repeat the same garment.
    const product = source[(index + edition - 1) % source.length];
    const views = [product.media.cover, ...(product.media.details ?? [])];
    return {
      ...product,
      slug: `demo-${product.slug}-${edition}`,
      sourceSlug: product.slug,
      preview: true,
      name: `${product.name} / Study ${String(edition).padStart(2, "0")}`,
      collection: "Demo archive — existing artwork studies",
      price: null, available: null, colours: [], sizes: [],
      featured: index % 7 === 0,
      genres: [...product.genres],
      media: { ...product.media, cover: views[(edition - 1) % views.length], video: undefined },
    };
  });
}
