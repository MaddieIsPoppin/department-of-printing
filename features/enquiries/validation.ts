import type { Product } from "../../data/products";
import { bagMessage, validateBag, type BagItem } from "../commerce/bag";

export type Enquiry = { kind: "general" | "order" | "custom"; name: string; email: string; phone: string; message: string; items: BagItem[]; summary: string };
export function validateEnquiry(input: unknown, products: Product[]): Enquiry {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid enquiry.");
  const data = input as Record<string, unknown>;
  function text(key: string, max: number, required = false) {
    const value = data[key];
    if (value !== undefined && typeof value !== "string") throw new Error(`Invalid ${key}.`);
    const clean = (typeof value === "string" ? value : "").trim();
    if (clean.length > max || (required && !clean) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(clean)) throw new Error(`Check ${key}.`);
    return clean;
  }
  if (data.website) throw new Error("Unable to accept this request.");
  if (data.consent !== true) throw new Error("Please acknowledge how your enquiry details will be used.");
  const kind = data.kind;
  if (kind !== "general" && kind !== "order" && kind !== "custom") throw new Error("Invalid enquiry type.");
  const name = text("name", 100, true), email = text("email", 254, true), phone = text("phone", 50), message = text("message", 3000, kind === "general");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(name + email + phone)) throw new Error("Check your contact details.");
  let summary = "", items: BagItem[] = [];
  if (kind === "order") {
    items = validateBag(data.items, products);
    if (!items.length) throw new Error("Your bag is empty.");
    summary = bagMessage(items, products);
  } else if (kind === "custom") {
    const garment = text("garment", 50, true), colour = text("colour", 80, true), sizes = text("sizes", 300, true), placement = text("placement", 150, true), reference = text("reference", 2000);
    if (!["tee", "hoodie", "sweat", "other"].includes(garment)) throw new Error("Choose a garment type.");
    if (!Number.isInteger(data.quantity) || Number(data.quantity) < 1 || Number(data.quantity) > 10000) throw new Error("Quantity must be between 1 and 10,000.");
    if (/data:.*base64/i.test(reference)) throw new Error("Describe the artwork or provide a reference; do not paste image data.");
    summary = `Custom quotation\nGarment: ${garment}\nColour: ${colour}\nSizes: ${sizes}\nQuantity: ${data.quantity}\nPrint placement: ${placement}\nArtwork/reference: ${reference || "To be supplied separately"}\nPricing and print specifications require confirmation.`;
  }
  return { kind, name, email, phone, message, items, summary };
}
export function enquiryText(enquiry: Enquiry) { return `${enquiry.name}\n${enquiry.email}\n${enquiry.phone}\n\n${enquiry.summary}\n\n${enquiry.message}`; }
