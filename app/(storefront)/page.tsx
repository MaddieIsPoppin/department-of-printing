import Link from "next/link";
import { products } from "@/data/products";
import { LabHero } from "@/features/experience-lab/hero";
import { CollectionStage } from "@/features/experience-lab/collection-stage";
import { CustomTeaser } from "@/features/storefront/custom-teaser";
import styles from "@/features/experience-lab/lab.module.css";

export default function ExperienceLab() {
  const ratio = products.find(p => p.slug === "ratio") ?? products[0];
  return <main id="content">
    {ratio && <LabHero product={ratio} basePath="" />}
    <CollectionStage products={products.filter(p => p.featured)} basePath="" />
    <section className={styles.lab} data-lab-rule aria-labelledby="create-title"><header className={styles.sectionHead}><p className={styles.meta}>03 / THE NEXT IDEA IS YOURS</p><h2 id="create-title">WHAT IF<br /><span>IT WAS YOURS?</span></h2><p>Move it. Turn it. Make your mark.<br />A small preview of what could be.</p></header><CustomTeaser showHeading={false} customHref="/custom/studio" actionLabel="OPEN THE PRINT LAB" /></section>
    <section className={styles.finale}><p className={styles.meta}>04 / WEAR WHAT YOU CAN IMAGINE</p><h2>NOTHING STARTS<br />AS <em>ORDINARY.</em></h2><div><Link href="/catalogue">FIND YOUR PIECE <span>↗</span></Link><Link href="/custom">CUSTOM PRINTING <span>↗</span></Link></div></section>
  </main>;
}
