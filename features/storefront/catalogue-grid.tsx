import Link from "next/link";
import { availabilityLabel, priceLabel, products as collection, type Product } from "@/data/products";
import { genreLabel } from "@/data/genres";
import { garmentLabel } from "@/data/garments";
import { GarmentImage } from "./product-media";
import styles from "./storefront.module.css";
import archive from "./catalogue.module.css";
import { GarmentResponse } from "./garment-response";

export function CatalogueGrid({ products }: { products: Product[] }) {
  return <div className={archive.grid}>{products.map((product) => {
    const index = collection.findIndex(piece => piece.slug === product.slug);
    const alternate = [product.media.back, product.media.front, ...product.media.details ?? []].find(image => image && image.src !== product.media.cover.src);
    return <article key={product.slug} className={`${styles.catalogueItem} ${archive.item}`}>
      <Link href={`/product/${product.slug}`} className={styles.catalogueImage} aria-label={`View ${product.name}`}>
        <span className={styles.itemNumber}>D/P—{String(index + 1).padStart(3, "0")} / {garmentLabel(product.garmentType).toUpperCase()}</span>
        <span className={archive.plateNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <GarmentResponse>
          <div className={styles.cover}><GarmentImage image={product.media.cover} sizes="(max-width: 600px) 170vw, 85vw" /></div>
          {alternate && <div className={`${styles.alternate} ${archive.alternate}`} aria-hidden="true"><GarmentImage image={alternate} sizes="(max-width: 600px) 170vw, 85vw" /></div>}
        </GarmentResponse>
        <span className={styles.viewPiece}>VIEW PIECE ↗</span>
      </Link>
      <div className={styles.itemInfo}><p className={styles.micro}>{product.genres.map(genreLabel).join(" / ")}</p><h2><Link href={`/product/${product.slug}`}>{product.name}</Link></h2><p className={styles.price}>{priceLabel(product)}</p><p className={styles.availability}>{availabilityLabel(product.available)}</p></div>
    </article>;
  })}</div>;
}
