import Image from "next/image";
import type { ImageAsset, ProductMedia as Media } from "@/data/media";
import { MotionFilm } from "./motion-film";
import styles from "./storefront.module.css";

export function GarmentImage({ image, eager = false, sizes = "(max-width: 600px) 170vw, 100vw" }: { image: ImageAsset; eager?: boolean; sizes?: string }) {
  return <div className={styles.garmentImage} data-framing={image.framing ?? "garment"}>
    <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} loading={eager ? "eager" : "lazy"} />
  </div>;
}

export function ProductMedia({ media, eager = false, allowVideo = true }: { media: Media; eager?: boolean; allowVideo?: boolean }) {
  return media.video && allowVideo ? <MotionFilm media={media.video} eager={eager} className={styles.productFilm} /> : <GarmentImage image={media.cover} eager={eager} />;
}
