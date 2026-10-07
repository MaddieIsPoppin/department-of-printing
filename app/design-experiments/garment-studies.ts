import type { GarmentName } from "./garment";

export type GarmentStudy = {
  id: string;
  category: string;
  name: string;
  render: GarmentName;
  description: string;
  details: readonly { label: string; value: string }[];
};

// Describes the supplied imagery only; supplier specifications are not yet verified.
export const garmentStudies: readonly GarmentStudy[] = [
  { id: "tee", category: "TEE", name: "Discipline tee", render: "discipline", description: "A short-sleeve shape. An illustration with room to breathe.", details: [
    { label: "GARMENT", value: "Short-sleeve tee" }, { label: "VIEW", value: "Back elevation" }, { label: "COLOUR SHOWN", value: "White" }, { label: "ARTWORK STUDY", value: "Illustrated back print" },
  ] },
  { id: "hoodie", category: "HOODIE", name: "Ratio hoodie", render: "ratioBlack", description: "A hooded form. Geometry becomes the focal point.", details: [
    { label: "GARMENT", value: "Hoodie" }, { label: "VIEW", value: "Front elevation" }, { label: "COLOUR SHOWN", value: "Black" }, { label: "ARTWORK STUDY", value: "Geometric front print" },
  ] },
  { id: "sweat", category: "SWEAT", name: "Study sweatshirt", render: "study", description: "A crew-neck shape. Type gives it a different voice.", details: [
    { label: "GARMENT", value: "Crew-neck sweatshirt" }, { label: "VIEW", value: "Back elevation" }, { label: "COLOUR SHOWN", value: "White" }, { label: "ARTWORK STUDY", value: "Typographic back print" },
  ] },
];
