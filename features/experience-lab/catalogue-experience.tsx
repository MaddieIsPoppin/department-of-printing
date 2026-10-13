import type { Product } from "@/data/products";
import Link from "next/link";
import type { DemoProduct } from "@/data/demo-products";
import { genres } from "@/data/genres";
import { garments } from "@/data/garments";
import { catalogueHref, catalogueSelection, filterProducts } from "@/features/storefront/catalogue-filters";
import { EditorialArchive } from "./editorial-archive";
import styles from "@/features/experience-lab/lab.module.css";

export type ArchiveQuery = { genre?: string | string[]; type?: string | string[] };
export function CatalogueExperience({ products, query, preview = false, routeRoot = "/experience-lab" }: { products: (Product | DemoProduct)[]; query: ArchiveQuery; preview?: boolean; routeRoot?: string }) {
  const selected = catalogueSelection(products, query);
  const visible = filterProducts(products, selected);
  const ideas = genres.filter(genre => products.some(p => p.genres.includes(genre.id)));
  const types = garments.filter(garment => products.some(p => p.garmentType === garment.id));
  const basePath = `${routeRoot}/${preview ? "catalogue-preview" : "catalogue"}`;
  const href = (selection: typeof selected) => catalogueHref(selection).replace("/catalogue", basePath);
  return <main id="content" className={styles.page}>
    <header className={styles.pageIntro}><p className={styles.meta}>THE DEPARTMENT / COLLECTED WORK / {String(products.length).padStart(2, "0")} PIECES</p><h1>FIND YOUR<br /><span>POINT OF VIEW.</span></h1><p>A collection of ideas, made wearable.<br />Browse by what moves you. Find the form that fits.</p></header>
    {preview && <p className={styles.previewNotice}>DEMO ARCHIVE / 40 layout studies using existing imagery. These are not additional products. Each card opens its original piece. <Link href="/experience-lab/catalogue">Return to the real collection ↗</Link></p>}
    <div className={styles.filterRows}>
      <nav aria-label="Filter by design genre"><p className={styles.meta}>01 / SHOP BY IDEA</p><div><Link scroll={false} href={href({ ...selected, genre: undefined })} aria-current={!selected.genre ? "page" : undefined}>ALL IDEAS</Link>{ideas.map(genre => <Link scroll={false} key={genre.id} href={href({ ...selected, genre: genre.id })} aria-current={selected.genre === genre.id ? "page" : undefined}>{genre.label.toUpperCase()}</Link>)}</div></nav>
      <nav aria-label="Filter by garment"><p className={styles.meta}>02 / CHOOSE A FORM</p><div><Link scroll={false} href={href({ ...selected, type: undefined })} aria-current={!selected.type ? "page" : undefined}>ALL GARMENTS</Link>{types.map(garment => <Link scroll={false} key={garment.id} href={href({ ...selected, type: garment.id })} aria-current={selected.type === garment.id ? "page" : undefined}>{garment.plural.toUpperCase()}</Link>)}</div></nav>
    </div>
    <div className={styles.resultBar}><p className={styles.meta} role="status">{String(visible.length).padStart(2, "0")} {visible.length === 1 ? "PIECE" : "PIECES"} / {selected.genre || selected.type ? "YOUR SELECTION" : "THE COMPLETE COLLECTION"}</p>{(selected.genre || selected.type) && <Link href={basePath} scroll={false}>CLEAR FILTERS ↗</Link>}</div>
    <div key={`${selected.genre}-${selected.type}`} className={styles.archiveResults}>{visible.length ? <EditorialArchive products={visible} basePath={routeRoot} /> : <div className={styles.empty}><p className={styles.meta}>NO PIECES IN THIS COMBINATION</p><h2>ANOTHER WAY TO LOOK.</h2><Link className={styles.textLink} href={basePath} scroll={false}>VIEW ALL PIECES <span>↗</span></Link></div>}</div>
    <Link className={styles.textLink} href={`${routeRoot}/custom`}>AN IDEA OF YOUR OWN? <span>↗</span></Link>
  </main>;
}
