import { garmentFilm } from "./media";

type CustomContact = { kind: "email"; address: string } | { kind: "link"; url: string };

export const site: {
  name: string; location: string; about: string;
  hero: { headline: string[]; caption: string; media: typeof garmentFilm };
  custom: { headline: string[]; description: string; contact: CustomContact | null };
} = {
  name: "Department of Printing",
  location: "South Africa",
  about: "Independent expression, printed on everyday garments. Shop our designs or work with us on an idea of your own. We print on supplier-sourced garments.",
  hero: { headline: ["LOOK WHAT’S", "POSSIBLE."], caption: "Clothing with a point of view. Ours. Yours.", media: garmentFilm },
  custom: {
    headline: ["WHATEVER YOU’RE THINKING.", "LET’S PUT IT ON SOMETHING."],
    description: "Bring your artwork, a rough idea, or a reason to bring people together. Personal pieces, brand merchandise and clothing for your next event — let’s work on it together.",
    contact: null,
  },
};

export function customContactHref() {
  const contact = site.custom.contact;
  if (!contact) return null;
  if (contact.kind === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.address) ? `mailto:${contact.address}` : null;
  try { const url = new URL(contact.url); return url.protocol === "https:" ? url.href : null; } catch { return null; }
}
