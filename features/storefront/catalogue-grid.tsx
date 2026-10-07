import Link from "next/link";
import { availabilityLabel, priceLabel, type Product } from "@/data/products";
import { garmentLabel } from "@/data/garments";
import { GarmentImage } from "./product-media";
import styles from "./storefront.module.css";

export function CatalogueGrid({ products }: { products: Product[] }) {
  return <div className={styles.catalogueGrid}>{products.map((product, index) => {
    const alternate = product.media.details?.[0] ?? (product.media.front?.src !== product.media.cover.src ? product.media.front : undefined);
    return <article key={product.slug} className={styles.catalogueItem}>
      <Link href={`/product/${product.slug}`} className={styles.catalogueImage} aria-label={`View ${product.name}`}>
        <span className={styles.itemNumber}>{String(index + 1).padStart(2, "0")} / {product.featured ? "FEATURED" : "DEPARTMENT STUDY"}</span>
        <div className={styles.cover}><GarmentImage image={product.media.cover} sizes="(max-width: 600px) 170vw, 85vw" /></div>
        {alternate && <div className={styles.alternate} aria-hidden="true"><GarmentImage image={alternate} sizes="(max-width: 600px) 170vw, 85vw" /></div>}
        <span className={styles.viewPiece}>VIEW PIECE ↗</span>
      </Link>
      <div className={styles.itemInfo}><p className={styles.micro}>{garmentLabel(product.garmentType)} / {product.collection}</p><h2><Link href={`/product/${product.slug}`}>{product.name}</Link></h2><p className={styles.price}>{priceLabel(product)}</p><p className={styles.availability}>{availabilityLabel(product.available)}</p></div>
    </article>;
  })}</div>;
}
