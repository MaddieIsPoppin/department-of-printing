"use client";
import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { GarmentImage } from "@/features/storefront/product-media";
import { GarmentResponse } from "@/features/storefront/garment-response";
import { RegistrationFrame } from "@/features/storefront/registration-frame";
import styles from "./lab.module.css";

export function LabHero({ product, basePath = "/experience-lab" }: { product: Product; basePath?: string }) {
  const views = [product.media.cover, ...(product.media.details ?? [])];
  const [view, setView] = useState(0);
  return <section className={styles.hero} data-look={view} aria-labelledby="lab-title">
    <div className={styles.heroGrid} aria-hidden="true" />
    <div className={styles.heroCopy}><p className={styles.meta}>01 / A DIFFERENT POINT OF VIEW</p><h1 id="lab-title">WEAR<br /><span>YOUR</span><br />IDEAS.</h1><p>Independent expression.<br />Printed on everyday garments.</p><Link className={styles.textLink} href={`${basePath}/catalogue`}>ENTER THE COLLECTION <span>↗</span></Link></div>
    <div className={styles.heroObject}>
      <RegistrationFrame label="RATIO / COLOUR & VIEW STUDY" />
      <div className={styles.heroRender}><GarmentResponse><div key={view} className={styles.lookEntrance}><GarmentImage image={views[view]} eager sizes="(max-width: 700px) 180vw, 100vw" /></div></GarmentResponse></div>
      <div className={styles.viewSelector} role="group" aria-label="Ratio image studies">{views.map((image, index) => <button type="button" key={image.src} aria-pressed={view === index} onClick={() => setView(index)}>{index === 0 ? "01 / BLACK — FRONT" : "02 / WHITE — BACK"}<span>↗</span></button>)}</div>
    </div>
    <div className={styles.heroBottom}><p className={styles.meta} role="status">{product.name.toUpperCase()} / {view === 0 ? "BLACK FRONT" : "WHITE BACK"}<br />DESIGN STUDIES, NOT CONFIRMED COLOUR OPTIONS</p><Link href={`${basePath}/product/${product.slug}`}>EXPLORE THIS PIECE ↗</Link><a href="#collection">SCROLL TO DISCOVER ↓</a></div>
  </section>;
}
