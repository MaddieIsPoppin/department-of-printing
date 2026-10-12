import type { Product } from "../../data/products";

export type CatalogueSelection = { genre?: string; type?: string };
type QueryValue = string | string[] | undefined;

// Unknown/repeated query values resolve to All; the catalogue never becomes stranded.
export function catalogueSelection(products: Product[], query: { genre?: QueryValue; type?: QueryValue }): CatalogueSelection {
  return {
    genre: typeof query.genre === "string" && products.some(p => p.genres.some(g => g === query.genre)) ? query.genre : undefined,
    type: typeof query.type === "string" && products.some(p => p.garmentType === query.type) ? query.type : undefined,
  };
}
export function filterProducts(products: Product[], selection: CatalogueSelection) {
  return products.filter(p => (!selection.genre || p.genres.some(g => g === selection.genre)) && (!selection.type || p.garmentType === selection.type));
}
export function catalogueHref(selection: CatalogueSelection) {
  const query = new URLSearchParams();
  if (selection.genre) query.set("genre", selection.genre);
  if (selection.type) query.set("type", selection.type);
  return `/catalogue${query.size ? `?${query}` : ""}`;
}
