"use client";
import { useState } from "react";
import type { ImageAsset } from "@/data/media";
import { GarmentImage } from "@/features/storefront/product-media";
import { GarmentResponse } from "@/features/storefront/garment-response";
import { RegistrationFrame } from "@/features/storefront/registration-frame";
import styles from "./lab.module.css";

export function ProductGallery({ images, name }: { images: ImageAsset[]; name: string }) {
  const [view, setView] = useState(0);
  const [detail, setDetail] = useState(false);
  return <div className={styles.gallery}>
    <div className={styles.galleryStage}><RegistrationFrame label={`${name.toUpperCase()} / INSPECTION`} /><div className={styles.lookEntrance} key={view}><GarmentResponse><div style={{ transform: detail ? "scale(1.65)" : "none", transformOrigin: "50% 45%", transition: "transform 420ms var(--ease-settle)" }}><GarmentImage image={images[view]} eager /></div></GarmentResponse></div></div>
    <div className={styles.galleryTools} role="group" aria-label="Inspect garment images">{images.map((image, index) => <button key={image.src} type="button" aria-label={`View ${index + 1}: ${image.alt}`} aria-pressed={index === view} onClick={() => { setView(index); setDetail(false); }}>VIEW {String(index + 1).padStart(2, "0")}</button>)}<button type="button" aria-pressed={detail} onClick={() => setDetail(value => !value)}>{detail ? "WHOLE GARMENT −" : "INSPECT DETAIL +"}</button></div>
    <p className={styles.galleryCaption} role="status">{images[view].alt}{detail ? " — enlarged detail" : ""}</p>
  </div>;
}
