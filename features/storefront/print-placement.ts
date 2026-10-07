export type Placement = { x: number; y: number; scale: number; angle: number };
export const initialPlacement: Placement = { x: 50, y: 50, scale: 100, angle: 0 };

// Adapted from V2 MiniPrintLab: keep the rotated artwork inside the print field.
export function constrainPlacement(value: Placement, width: number, height: number): Placement {
  if (!width || !height) return value;
  const radians = value.angle * Math.PI / 180;
  const half = width * .38 * value.scale / 100 * (Math.abs(Math.cos(radians)) + Math.abs(Math.sin(radians))) / 2;
  const dx = Math.min(50, half / width * 100);
  const dy = Math.min(50, half / height * 100);
  return { ...value, x: Math.max(dx, Math.min(100 - dx, value.x)), y: Math.max(dy, Math.min(100 - dy, value.y)) };
}
