import Image from "next/image";
import Link from "next/link";
import { priceLabel, type Product } from "@/data/products";
import type { DemoProduct } from "@/data/demo-products";
import { garmentLabel } from "@/data/garments";
import { genreLabel } from "@/data/genres";
import styles from "./archive.module.css";

export function EditorialArchive({ products, basePath = "/experience-lab" }: { products: (Product | DemoProduct)[]; basePath?: string }) {
  return <div className={styles.archive}>{products.map((product, index) => {
    const demo = "sourceSlug" in product;
    const href = `${basePath}/product/${demo ? product.sourceSlug : product.slug}`;
    const alternate = product.media.details?.find(image => image.src !== product.media.cover.src)
      ?? (product.media.front?.src !== product.media.cover.src ? product.media.front : undefined);
    const sizes = "(min-width: 1700px) 30vw, (min-width: 1200px) 40vw, (min-width: 850px) 55vw, (min-width: 560px) 80vw, 160vw";
    return <article className={styles.card} key={product.slug} data-demo={demo || undefined}>
      <Link href={href} className={styles.plate} aria-label={`${demo ? "Demo study — view original: " : "Explore: "}${product.name}`}>
        <span className={styles.index}>{String(index + 1).padStart(3, "0")} / {demo ? "DEMO STUDY" : "D/P ARCHIVE"}</span>
        <Image className={styles.image} src={product.media.cover.src} alt={product.media.cover.alt} width={product.media.cover.width} height={product.media.cover.height} sizes={sizes} loading="lazy" />
        {alternate && <Image className={`${styles.image} ${styles.alternate}`} src={alternate.src} alt="" width={alternate.width} height={alternate.height} sizes={sizes} loading="lazy" />}
        <span className={styles.view}>{demo ? "VIEW ORIGINAL" : "EXPLORE PIECE"} ↗</span>
      </Link>
      <div className={styles.info}><p>{garmentLabel(product.garmentType)} / {product.genres.map(genreLabel).join(" + ")}</p><h2><Link href={href}>{product.name}</Link></h2><p>{demo ? "Layout preview · not a separate product" : priceLabel(product)}</p></div>
    </article>;
  })}</div>;
}
