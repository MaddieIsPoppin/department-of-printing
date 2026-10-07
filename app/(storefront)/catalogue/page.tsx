import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/products";
import { garments } from "@/data/garments";
import { CatalogueGrid } from "@/features/storefront/catalogue-grid";
import styles from "@/features/storefront/storefront.module.css";

export const metadata: Metadata = { title: "The catalogue" };

export default async function CataloguePage({ searchParams }: { searchParams: Promise<{ type?: string | string[] }> }) {
  const { type } = await searchParams;
  const categories = garments.filter(garment => products.some(product => product.garmentType === garment.id));
  const category = categories.find(garment => garment.id === type);
  const visible = category ? products.filter(product => product.garmentType === category.id) : products;

  return <main id="content" className={styles.catalogue}>
    <div className={styles.pageHeading}><p className={styles.micro}>THE DEPARTMENT / PRODUCT INDEX</p><h1>THE COLLECTION.</h1><p className={styles.body}>Garments carrying ideas. Find one that feels like yours.</p></div>
    <div className={styles.catalogueBar}><nav aria-label="Filter by garment"><Link href="/catalogue" aria-current={!category ? "page" : undefined}>ALL</Link>{categories.map(garment => <Link key={garment.id} href={`/catalogue?type=${garment.id}`} aria-current={category?.id === garment.id ? "page" : undefined}>{garment.plural.toUpperCase()}</Link>)}</nav><p className={styles.micro}>{visible.length} PIECES / PREVIEW COLLECTION</p></div>
    <CatalogueGrid products={visible} />
    <div className={styles.catalogueEnd}><p>Something else in mind?</p><Link className={styles.action} href="/custom">MAKE IT YOURS <span>↗</span></Link></div>
  </main>;
}
