import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/products";
import { garments } from "@/data/garments";
import { genres } from "@/data/genres";
import { CatalogueGrid } from "@/features/storefront/catalogue-grid";
import { catalogueHref, catalogueSelection, filterProducts } from "@/features/storefront/catalogue-filters";
import styles from "@/features/storefront/storefront.module.css";
import archive from "@/features/storefront/catalogue.module.css";

export const metadata: Metadata = { title: "The design archive" };

export default async function CataloguePage({ searchParams }: { searchParams: Promise<{ type?: string | string[]; genre?: string | string[] }> }) {
  const selection = catalogueSelection(products, await searchParams);
  const categories = garments.filter(g => products.some(p => p.garmentType === g.id));
  const ideas = genres.filter(g => products.some(p => p.genres.includes(g.id)));
  const visible = filterProducts(products, selection);

  return <main id="content" className={`${styles.catalogue} ${archive.archive}`}>
    <header className={archive.heading}>
      <p className={styles.micro}>D/P — DESIGN ARCHIVE <span>INDEX / {String(products.length).padStart(2, "0")} PIECES</span></p>
      <h1>GOOD IDEAS.<br /><span>IN GOOD FORM.</span></h1>
      <div><p className={styles.body}>The Department collection. Original ideas, printed on everyday garments. Find your point of view.</p><span className={archive.archiveStamp} aria-hidden="true">D/P<br /><small>COLLECTED WORK</small></span></div>
    </header>
    <div className={archive.filters} id="filters">
      <nav aria-label="Filter by design genre"><p className={styles.micro}>01 / SHOP BY IDEA</p><div>
        <Link scroll={false} href={catalogueHref({ ...selection, genre: undefined })} aria-current={!selection.genre ? "page" : undefined}>ALL IDEAS</Link>
        {ideas.map(genre => <Link scroll={false} key={genre.id} href={catalogueHref({ ...selection, genre: genre.id })} aria-current={selection.genre === genre.id ? "page" : undefined}>{genre.label.toUpperCase()}</Link>)}
      </div></nav>
      <nav aria-label="Filter by garment"><p className={styles.micro}>02 / GARMENT</p><div>
        <Link scroll={false} href={catalogueHref({ ...selection, type: undefined })} aria-current={!selection.type ? "page" : undefined}>ALL GARMENTS</Link>
        {categories.map(garment => <Link scroll={false} key={garment.id} href={catalogueHref({ ...selection, type: garment.id })} aria-current={selection.type === garment.id ? "page" : undefined}>{garment.plural.toUpperCase()}</Link>)}
      </div></nav>
    </div>
    <div className={archive.results}><p className={styles.micro} role="status">{String(visible.length).padStart(2, "0")} {visible.length === 1 ? "PIECE" : "PIECES"} / {selection.genre || selection.type ? "YOUR SELECTION" : "THE COMPLETE INDEX"}</p>{(selection.genre || selection.type) && <Link scroll={false} href="/catalogue">CLEAR FILTERS ↗</Link>}<span className={styles.micro}>IDEA → GARMENT → YOU</span></div>
    {visible.length ? <CatalogueGrid products={visible} /> : <div className={archive.empty}><p className={styles.micro}>NO PIECES IN THIS COMBINATION — YET.</p><h2>MAKE ROOM FOR<br />ANOTHER IDEA.</h2><p>Try another garment or explore the complete collection.</p><Link className={styles.action} href="/catalogue" scroll={false}>VIEW ALL PIECES <span>↗</span></Link></div>}
    <div className={styles.catalogueEnd}><p>Something else in mind?</p><Link className={styles.action} href="/custom">MAKE IT YOURS <span>↗</span></Link></div>
  </main>;
}
