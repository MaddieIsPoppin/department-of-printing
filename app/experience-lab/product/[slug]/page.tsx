import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, productBySlug, priceLabel, availabilityLabel } from "@/data/products";
import type { ImageAsset } from "@/data/media";
import { garmentLabel } from "@/data/garments";
import { genreLabel } from "@/data/genres";
import { ProductGallery } from "@/features/experience-lab/product-gallery";
import { EditorialArchive } from "@/features/experience-lab/editorial-archive";
import { ContactAction } from "@/features/storefront/contact-action";
import styles from "@/features/experience-lab/lab.module.css";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { return { title: productBySlug((await params).slug)?.name ?? "Piece not found" }; }
export default async function LabProduct({ params }: Props) {
  const product = productBySlug((await params).slug);
  if (!product) notFound();
  const images = [product.media.cover, product.media.front, product.media.back, ...product.media.details ?? []].filter((image, index, all): image is ImageAsset => Boolean(image && all.findIndex(candidate => candidate?.src === image.src) === index));
  const related = products.filter(p => p.slug !== product.slug && p.genres.some(genre => product.genres.includes(genre))).slice(0, 2);
  return <main id="content" className={styles.page}><Link className={styles.textLink} href="/experience-lab/catalogue">← THE COLLECTION</Link>
    <div className={styles.detail}><ProductGallery images={images} name={product.name} /><div className={styles.productCopy}><p className={styles.meta}>{product.collection} / {garmentLabel(product.garmentType)}</p><h1>{product.name}</h1><p className={styles.price}>{priceLabel(product)}</p><p>{availabilityLabel(product.available)}</p><p>{product.description}</p>
      <nav className={styles.galleryTools} aria-label="Related genres">{product.genres.map(genre => <Link className={styles.textLink} key={genre} href={`/experience-lab/catalogue?genre=${genre}`}>{genreLabel(genre)} ↗</Link>)}</nav>
      <dl className={styles.specs}><div><dt>COLOURS</dt><dd>{product.colours.length ? product.colours.join(" / ") : "Range to be confirmed"}</dd></div><div><dt>SIZES</dt><dd>{product.sizes.length ? product.sizes.join(" / ") : "Sizing to be confirmed"}</dd></div></dl>
      {product.available !== false ? <ContactAction label="ASK ABOUT THIS PIECE" /> : <p>This piece is currently unavailable.</p>}<Link className={styles.textLink} href="/experience-lab/custom">MAKE SOMETHING OF YOUR OWN <span>↗</span></Link><p className={styles.meta}>DESIGN RENDER / FINAL SPECIFICATIONS CONFIRMED BEFORE PURCHASE</p>
    </div></div>
    {!!related.length && <section className={styles.related} aria-labelledby="related-title"><p className={styles.meta}>KEEP EXPLORING / RELATED IDEAS</p><h2 id="related-title">ANOTHER POINT OF VIEW.</h2><EditorialArchive products={related} /></section>}
  </main>;
}
