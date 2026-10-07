import { media, type ImageAsset } from "./media";

export const garments = [
  { id: "tee", label: "Tee", plural: "Tees", image: media.blankTee, isBlank: true, description: "An everyday starting point for your artwork." },
  { id: "hoodie", label: "Hoodie", plural: "Hoodies", image: media.ratioBlack, isBlank: false, description: "A hooded form with space for a bold idea." },
  { id: "sweat", label: "Sweatshirt", plural: "Sweats", image: media.study, isBlank: false, description: "A crew-neck shape for a different kind of expression." },
] as const satisfies readonly { id: string; label: string; plural: string; image: ImageAsset; isBlank: boolean; description: string }[];

export type GarmentType = (typeof garments)[number]["id"];
export function garmentLabel(type: GarmentType) { return garments.find(garment => garment.id === type)!.label; }
