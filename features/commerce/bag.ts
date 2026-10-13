import type { Product } from "../../data/products";

export type BagItem = { slug: string; variantId: string; quantity: number };
export type Variant = { id: string; size: string; colour: string };
export function variants(product: Product): Variant[] {
  if ("sourceSlug" in product || product.available !== true || product.price === null || !Number.isFinite(product.price) || product.price < 0 || !Number.isSafeInteger(Math.round(product.price * 100) * 99 * 30) || product.currency !== "ZAR") return [];
  if (product.variants) return product.variants.filter(variant => variant.available && variant.id && variant.size && variant.colour).map(({ id, size, colour }) => ({ id, size, colour }));
  // Supplying these verified options declares every listed combination available.
  return product.sizes.flatMap(size => product.colours.map(colour => ({ id: `${encodeURIComponent(size)}:${encodeURIComponent(colour)}`, size, colour })));
}
export function resolveItem(item: BagItem, products: Product[]) {
  const product = products.find(product => product.slug === item.slug);
  const variant = product && variants(product).find(variant => variant.id === item.variantId);
  if (!product || !variant || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) throw new Error("A bag item is unavailable or has invalid options. Please review your bag.");
  return { ...item, product, variant, unitMinor: Math.round(product.price! * 100) };
}
export function validateBag(value: unknown, products: Product[]): BagItem[] {
  if (!Array.isArray(value) || value.length > 30) throw new Error("The bag must contain at most 30 distinct items.");
  const seen = new Set<string>();
  return value.map(raw => {
    if (!raw || typeof raw !== "object" || typeof raw.slug !== "string" || typeof raw.variantId !== "string") throw new Error("Invalid bag item.");
    const item = { slug: raw.slug, variantId: raw.variantId, quantity: raw.quantity };
    resolveItem(item, products);
    const key = `${item.slug}/${item.variantId}`;
    if (seen.has(key)) throw new Error("Duplicate bag item.");
    seen.add(key); return item;
  });
}
export function addBagItem(items: BagItem[], item: BagItem, products: Product[]) {
  const existing = items.find(entry => entry.slug === item.slug && entry.variantId === item.variantId);
  return validateBag(existing ? items.map(entry => entry === existing ? { ...entry, quantity: entry.quantity + item.quantity } : entry) : [...items, item], products);
}
export function subtotalMinor(items: BagItem[], products: Product[]) { return validateBag(items, products).reduce((total, item) => { const resolved = resolveItem(item, products); return total + resolved.unitMinor * item.quantity; }, 0); }
export const money = (minor: number) => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(minor / 100);
export function bagMessage(items: BagItem[], products: Product[]) {
  const lines = validateBag(items, products).map(item => { const { product, variant, unitMinor } = resolveItem(item, products); return `${product.name} | ${variant.size} | ${variant.colour} | Qty ${item.quantity} | ${money(unitMinor)} each`; });
  return `Department of Printing — order enquiry\n${lines.join("\n")}\nEstimated item subtotal: ${money(subtotalMinor(items, products))}\nDelivery and availability to be confirmed. No payment or stock reservation.`;
}
