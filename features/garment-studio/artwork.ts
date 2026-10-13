import type { Layer } from "./design";

export async function readArtwork(file: File): Promise<{ src: string; ratio: number }> {
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) throw new Error("Choose a PNG, JPEG or WebP image.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Choose an image smaller than 8 MB.");
  const bitmap = await createImageBitmap(file);
  try {
    if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 24_000_000) throw new Error("Choose an image with at most 24 megapixels.");
    const factor = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * factor); canvas.height = Math.round(bitmap.height * factor);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return { src: canvas.toDataURL("image/png"), ratio: bitmap.width / bitmap.height };
  } finally { bitmap.close(); }
}

export async function paintLayers(canvas: HTMLCanvasElement, layers: Layer[]) {
  const context = canvas.getContext("2d")!;
  const images = await Promise.all(layers.map(layer => layer.kind === "image" && layer.src ? new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image(); image.onload = () => resolve(image); image.onerror = () => reject(new Error("Artwork could not be decoded.")); image.src = layer.src!;
  }) : Promise.resolve(null)));
  context.clearRect(0, 0, canvas.width, canvas.height);
  layers.forEach((layer, index) => {
    context.save(); context.translate(layer.x * canvas.width, layer.y * canvas.height); context.rotate(layer.rotation * Math.PI / 180);
    const width = layer.width * canvas.width, height = layer.height * canvas.height;
    if (images[index]) context.drawImage(images[index]!, -width / 2, -height / 2, width, height);
    else if (layer.kind === "text") {
      context.fillStyle = layer.colour || "#252622"; context.textAlign = "center"; context.textBaseline = "middle";
      context.font = `700 ${height * .72}px Arial`;
      const measured = context.measureText(layer.text || " ").width;
      context.scale(width * .95 / measured, 1);
      context.fillText(layer.text || "", 0, 0);
    }
    context.restore();
  });
}
