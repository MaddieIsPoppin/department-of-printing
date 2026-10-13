export type GarmentModel = {
  url: string;
  licence: string;
  source: string;
  // Model must be centred, Y-up, front facing +Z and roughly 2 world units tall.
  garmentMeshes: string[];
  // Separate print meshes with full 0..1 UVs viewed upright from outside.
  printMeshes: { front: string; back: string };
};
export const studioGarment: { id: string; name: string; model: GarmentModel | null } = {
  id: "oversized-tee", name: "Oversized T-shirt", model: null,
};
