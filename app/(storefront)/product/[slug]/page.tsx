import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productBySlug, priceLabel, availabilityLabel } from "@/data/products";
import { garmentLabel } from "@/data/garments";
import { ProductMedia, GarmentImage } from "@/features/storefront/product-media";
import { ContactAction } from "@/features/storefront/contact-action";
import styles from "@/features/storefront/storefront.module.css";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = productBySlug((await params).slug);
  return { title: product?.name ?? "Piece not found" };
}

export default async function ProductPage({ params }: Props) {
  const product = productBySlug((await params).slug);
  if (!product) notFound();
  const extras = [product.media.front, product.media.back, ...(product.media.details ?? [])].filter((image, index, all) => image && image.src !== product.media.cover.src && all.findIndex(candidate => candidate?.src === image.src) === index);

  return <main id="content" className={styles.productPage}>
    <Link href="/catalogue" className={styles.backLink}>← BACK TO THE CATALOGUE</Link>
    <div className={styles.productDetail}>
      <div className={styles.detailMedia}><ProductMedia media={product.media} eager /></div>
      <div className={styles.detailInfo}><p className={styles.micro}>{product.collection} / {garmentLabel(product.garmentType)}</p><h1>{product.name}</h1><p className={styles.price}>{priceLabel(product)}</p><p className={styles.availability}>{availabilityLabel(product.available)}</p><p className={styles.body}>{product.description}</p>
        <dl className={styles.productOptions}><div><dt>COLOURS</dt><dd>{product.colours.length ? product.colours.join(" / ") : "Range to be confirmed"}</dd></div><div><dt>SIZES</dt><dd>{product.sizes.length ? product.sizes.join(" / ") : "Sizing to be confirmed"}</dd></div></dl>
        {product.available !== false ? <ContactAction label="ASK ABOUT THIS PIECE" /> : <p className={styles.help}>This piece is currently unavailable.</p>}
        <Link className={styles.action} href="/custom">MAKE SOMETHING OF YOUR OWN <span>↗</span></Link>
        <p className={styles.help}>Design render shown. Final garment specifications and ordering details will be confirmed before purchase.</p>
      </div>
    </div>
    {extras.length > 0 && <section className={styles.additionalViews} aria-label="Additional garment studies">{extras.map(image => image && <figure key={image.src}><GarmentImage image={image} /><figcaption className={styles.micro}>{image.alt}</figcaption></figure>)}</section>}
  </main>;
}
