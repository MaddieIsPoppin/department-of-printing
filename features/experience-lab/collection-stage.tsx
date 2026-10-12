"use client";
import { useState } from "react";
import Link from "next/link";
import { priceLabel, type Product } from "@/data/products";
import { garmentLabel } from "@/data/garments";
import { genreLabel } from "@/data/genres";
import { ProductMedia } from "@/features/storefront/product-media";
import { PrintReveal } from "@/features/storefront/print-reveal";
import { GarmentResponse } from "@/features/storefront/garment-response";
import { RegistrationFrame } from "@/features/storefront/registration-frame";
import styles from "./lab.module.css";

export function CollectionStage({ products }: { products: Product[] }) {
  const [selection, setSelection] = useState({ index: 0, touched: false });
  if (!products.length) return null;
  const product = products[selection.index];
  const select = (index: number) => setSelection({ index, touched: true });
  return <section className={styles.collection} id="collection" data-lab-rule aria-labelledby="collection-title">
    <header className={styles.sectionHead}><p className={styles.meta}>02 / FROM MARK TO MEANING</p><h2 id="collection-title">AN IDEA.<br /><span>MADE REAL.</span></h2><p>A line becomes a print.<br />A print becomes a point of view.</p></header>
    <div className={styles.exhibition} data-tone={selection.index % 3}>
      <div className={styles.collectionMenu}><p className={styles.meta}>THE DEPARTMENT EDIT<br />SELECT A STUDY</p><div role="group" aria-label="Select featured garment">{products.map((piece, index) => <button type="button" key={piece.slug} aria-pressed={selection.index === index} onClick={() => select(index)}><small>{String(index + 1).padStart(2, "0")}</small><span>{piece.name}</span><span>↗</span></button>)}</div><Link className={styles.textLink} href="/experience-lab/catalogue">ALL PIECES <span>↗</span></Link></div>
      <div className={styles.collectionObject}><RegistrationFrame label="ARTWORK / OBJECT" /><span className={styles.bigIndex} aria-hidden="true">{String(selection.index + 1).padStart(2, "0")}</span><div className={styles.collectionRender}><PrintReveal focus={products[0].media.artworkFocus} active={!selection.touched}><div key={product.slug} className={styles.lookEntrance}><GarmentResponse><ProductMedia media={product.media} /></GarmentResponse></div></PrintReveal></div></div>
      <div className={styles.collectionInfo}><p className={styles.meta}>{garmentLabel(product.garmentType)} / {product.genres.map(genreLabel).join(" + ")}</p><h3>{product.name}</h3><p>{product.tagline}</p><p className={styles.price}>{priceLabel(product)}</p><Link className={styles.solidLink} href={`/experience-lab/product/${product.slug}`}>EXPLORE THE PIECE <span>↗</span></Link><div className={styles.stepper}><button type="button" aria-label="Previous study" onClick={() => select((selection.index - 1 + products.length) % products.length)}>←</button><span className={styles.meta} role="status">{selection.index + 1} / {products.length}<span className={styles.srOnly}> — {product.name}</span></span><button type="button" aria-label="Next study" onClick={() => select((selection.index + 1) % products.length)}>→</button></div></div>
    </div>
  </section>;
}
