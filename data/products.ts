import type { GarmentType } from "./garments";
import { media, type ProductMedia } from "./media";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  garmentType: GarmentType;
  collection: string;
  price: number | null; // Major currency units, e.g. rand. Null means unverified.
  currency: string;
  featured: boolean;
  available: boolean | null; // Null is unknown, not in stock.
  colours: string[]; // Verified purchasable options only, not colours seen in renders.
  sizes: string[];
  media: ProductMedia;
  description: string;
};

export const products: Product[] = [
  {
    slug: "growth-is-a-process", name: "Growth Is A Process", tagline: "Give your idea room.", garmentType: "hoodie", collection: "Department Studies",
    price: null, currency: "ZAR", featured: true, available: null, colours: [], sizes: [],
    media: { cover: media.growth, back: media.growth },
    description: "Botanical lines spread across the back of a white hoodie. A study in taking up space, one mark at a time.",
  },
  {
    slug: "built-by-discipline", name: "Built By Discipline", tagline: "A mark made with intent.", garmentType: "tee", collection: "Department Studies",
    price: null, currency: "ZAR", featured: true, available: null, colours: [], sizes: [],
    media: { cover: media.discipline, back: media.discipline },
    description: "An illustrated back print on a white tee. Figurative linework and a simple statement: built by discipline.",
  },
  {
    slug: "faith-as-a-mustard-seed", name: "Faith As A Mustard Seed", tagline: "A little goes a long way.", garmentType: "hoodie", collection: "Department Studies",
    price: null, currency: "ZAR", featured: true, available: null, colours: [], sizes: [],
    media: { cover: media.faith, back: media.faith },
    description: "Fine blue linework, a small accent and a quiet statement on a white hoodie. A reminder that small beginnings matter.",
  },
  {
    slug: "ratio", name: "Ratio", tagline: "Order. Expression. Repeat.", garmentType: "hoodie", collection: "Department Studies",
    price: null, currency: "ZAR", featured: true, available: null, colours: [], sizes: [],
    media: { cover: media.ratioBlack, front: media.ratioBlack, details: [media.ratioWhite] },
    description: "Geometric Department of Printing artwork gives this hoodie its point of view. The supplied studies show a black front and a white back; these are different colour views, not a confirmed option range.",
  },
  {
    slug: "study", name: "Study", tagline: "Every mark starts somewhere.", garmentType: "sweat", collection: "Department Studies",
    price: null, currency: "ZAR", featured: false, available: null, colours: [], sizes: [],
    media: { cover: media.study, back: media.study },
    description: "Multicoloured typographic forms across the back of a white sweatshirt. An exploration of letters as artwork.",
  },
];

export function productBySlug(slug: string) { return products.find(product => product.slug === slug); }
export function priceLabel(product: Pick<Product, "price" | "currency">) {
  return product.price === null ? "Price to be confirmed" : new Intl.NumberFormat("en-ZA", { style: "currency", currency: product.currency, maximumFractionDigits: 2 }).format(product.price);
}
export function availabilityLabel(available: Product["available"]) {
  return available === null ? "Availability to be confirmed" : available ? "Available to order" : "Currently unavailable";
}
