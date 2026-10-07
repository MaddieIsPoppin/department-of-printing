export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  framing?: "garment" | "scene";
};

export type VideoAsset = { src: string; poster: string; label: string; background?: string };
export type ProductMedia = {
  cover: ImageAsset;
  front?: ImageAsset;
  back?: ImageAsset;
  details?: ImageAsset[];
  video?: VideoAsset;
  model?: string; // Reserved for a future renderer; never required by the shop.
};

// Existing V2 files stay in place. New media can use /products/[slug]/.
export const media = {
  growth: { src: "/garments/growth-hoodie-white.png", alt: "White Growth hoodie with black botanical back artwork", width: 4096, height: 2739 },
  discipline: { src: "/garments/discipline-tee-white.png", alt: "White Discipline tee with illustrated back artwork", width: 4096, height: 2739 },
  faith: { src: "/garments/faith-hoodie-white.png", alt: "White Faith hoodie with fine blue artwork and mustard-seed lettering", width: 4096, height: 2622 },
  ratioBlack: { src: "/garments/ratio-hoodie-black .png", alt: "Black Ratio hoodie with geometric front artwork", width: 4096, height: 2739 },
  ratioWhite: { src: "/garments/ratio-hoodie-white.png", alt: "White Ratio hoodie with geometric back artwork", width: 4096, height: 2739 },
  study: { src: "/garments/study-sweatshirt-white.png", alt: "White Study sweatshirt with multicoloured back typography", width: 4096, height: 2739 },
  blankTee: { src: "/garments/tee-canvas-poster.jpg", alt: "Front view of a plain black tee, extracted from the supplied garment film", width: 2676, height: 1588, framing: "scene" },
} satisfies Record<string, ImageAsset>;

export const garmentFilm: VideoAsset = {
  src: "/garments/ratio-hoodie-hero.webm",
  poster: "/garments/ratio-hero-poster.jpg",
  label: "Rotating black tee — garment form study",
  background: "#353a3d",
};
