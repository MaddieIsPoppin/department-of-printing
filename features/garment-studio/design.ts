export type Side = "front" | "back";
export type Layer = {
  id: string; kind: "text" | "image"; name: string;
  x: number; y: number; width: number; height: number; rotation: number;
  text?: string; colour?: string; src?: string;
};
export type StudioDesign = { colour: string; front: Layer[]; back: Layer[] };
export const emptyDesign = (): StudioDesign => ({ colour: "#e8e3d7", front: [], back: [] });

// Coordinates are fractions of a square preview print zone, not production units.
export function constrainLayer(layer: Layer): Layer {
  const finite = (value: number, fallback: number) => Number.isFinite(value) ? value : fallback;
  let width = Math.max(.001, finite(layer.width, .4));
  let height = Math.max(.001, finite(layer.height, .2));
  const rotation = Math.max(-180, Math.min(180, finite(layer.rotation, 0)));
  const angle = rotation * Math.PI / 180;
  const c = Math.abs(Math.cos(angle)), s = Math.abs(Math.sin(angle));
  const fit = Math.min(1, .9 / width, .9 / height, .98 / (width * c + height * s), .98 / (width * s + height * c));
  width *= fit; height *= fit;
  const rx = (width * c + height * s) / 2, ry = (width * s + height * c) / 2;
  return { ...layer, width, height, rotation, x: Math.max(rx, Math.min(1 - rx, finite(layer.x, .5))), y: Math.max(ry, Math.min(1 - ry, finite(layer.y, .5))) };
}
export function updateLayer(design: StudioDesign, side: Side, id: string, patch: Partial<Layer>): StudioDesign {
  return { ...design, [side]: design[side].map(layer => layer.id === id ? constrainLayer({ ...layer, ...patch, id: layer.id }) : layer) };
}
