export const genres = [
  { id: "gym", label: "Gym / Training" },
  { id: "faith", label: "Faith" },
  { id: "mindset", label: "Mindset" },
  { id: "graphic", label: "Graphic" },
  { id: "minimal", label: "Minimal" },
  { id: "typography", label: "Typography" },
] as const;
export type ProductGenre = (typeof genres)[number]["id"];
export function genreLabel(id: ProductGenre) { return genres.find(genre => genre.id === id)!.label; }
