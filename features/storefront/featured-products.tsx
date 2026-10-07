"use client";

import { useState } from "react";
import Link from "next/link";
import { priceLabel, type Product } from "@/data/products";
import { garmentLabel } from "@/data/garments";
import { ProductMedia, GarmentImage } from "./product-media";
import styles from "./storefront.module.css";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const [view, setView] = useState({ index: 0, previous: null as number | null, direction: 1, revision: 0 });
  const { index } = view;
  if (!products.length) return null;
  const product = products[index];
  const select = (next: number, direction: number) => setView(current => next === current.index ? current : ({ index: next, previous: current.index, direction, revision: current.revision + 1 }));
  const change = (direction: number) => select((index + direction + products.length) % products.length, direction);

  return <section className={styles.featured} id="collection" aria-labelledby="featured-title">
    <div className={styles.sectionHeading}><div><p className={styles.micro}>02 / THE DEPARTMENT COLLECTION</p><h2 id="featured-title">SHOP WHAT<br />WE MADE.</h2></div><Link className={styles.action} href="/catalogue">VIEW FULL CATALOGUE <span>↗</span></Link></div>
    <div className={styles.featureStage}>
      <div className={styles.featureArt} data-direction={view.direction > 0 ? "next" : "previous"}>
        <span className={styles.edition} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div className={styles.productHandoff}>
          {view.previous !== null && <div key={`out-${view.revision}`} className={styles.departingPiece} aria-hidden="true" onAnimationEnd={event => {
            if (event.target === event.currentTarget) setView(current => current.revision === view.revision ? { ...current, previous: null } : current);
          }}><GarmentImage image={products[view.previous].media.cover} /></div>}
          <div key={product.slug} className={styles.arrivingPiece}><ProductMedia media={product.media} /></div>
        </div>
        <p className={styles.micro}>{product.tagline}</p>
      </div>
      <div className={styles.featureInfo}>
        <p className={styles.micro}>{product.collection} / {garmentLabel(product.garmentType)}</p>
        <h3>{product.name}</h3>
        <div className={styles.featureBuy}><p className={styles.price}>{priceLabel(product)}</p><Link className={styles.action} href={`/product/${product.slug}`}>VIEW PIECE <span>↗</span></Link></div>
        <div className={styles.productControls}><button type="button" aria-label="Previous featured piece" onClick={() => change(-1)}>←</button><p className={styles.micro} role="status">{String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}<span className={styles.srOnly}> — {product.name}</span></p><button type="button" aria-label="Next featured piece" onClick={() => change(1)}>→</button></div>
      </div>
    </div>
    <div className={styles.pieceIndex} role="group" aria-label="Featured pieces">{products.map((piece, position) => <button key={piece.slug} type="button" aria-pressed={position === index} onClick={() => select(position, position > index ? 1 : -1)}><span>{String(position + 1).padStart(2, "0")}</span>{piece.name}</button>)}</div>
    <noscript><p className={styles.body}>Browse every piece in the <Link href="/catalogue">catalogue</Link>.</p></noscript>
  </section>;
}
