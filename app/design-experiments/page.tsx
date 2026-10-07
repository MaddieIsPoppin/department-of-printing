import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import { Garment } from "./garment";
import { garmentStudies } from "./garment-studies";
import { GarmentExplorer } from "./garment-explorer";
import { MotionStage } from "./motion-stage";
import { ScrollStory } from "./scroll-story";
import { CollectionStudies } from "./collection-studies";
import { HeroFilm } from "./hero-film";
import { MiniPrintLab } from "./mini-print-lab";
import styles from "./experiment.module.css";

const display = Oswald({ subsets: ["latin"], weight: "600", variable: "--v2-display", display: "swap" });
export const metadata: Metadata = { title: "An idea you can wear — D/P Exploration V2", robots: { index: false, follow: false } };

export default function DesignExperimentsPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return <MotionStage className={`${styles.experiment} ${display.variable}`}>
    <a className={styles.skip} href="#story">Skip to the process</a>
    <div className={styles.studioGrid} aria-hidden="true"><span>+</span><span>+</span><span>+</span><span>+</span></div>
    <main>
      <HeroFilm />

      <CollectionStudies />

      <ScrollStory />

      <GarmentExplorer studies={garmentStudies.map(study => ({ ...study, image: <Garment name={study.render} /> }))} />

      <section id="lab" className={styles.lab} data-lab aria-labelledby="lab-title">
        <p className={styles.meta}>03 / THE PRINT LAB</p><p className={styles.labPrelude}>From our point of view. To yours.</p>
        <div className={styles.labComposition}><h2 id="lab-title"><span>MAKE</span><span>SOMETHING</span><span className={styles.labFront}>THAT DOESN&apos;T</span><span className={styles.labFront}>EXIST YET.</span></h2><div className={styles.labGarment} data-lab-garment><Garment name="growth" /></div></div>
        <MiniPrintLab garment={<Garment name="ratioBlack" />} />
        <footer className={styles.footer} id="prototype-note"><p className={styles.meta}>DEPARTMENT OF PRINTING<br />WEAR WHAT YOU CAN IMAGINE.</p><p className={styles.meta}>EXPLORATION V2 / NOT A LIVE STORE<br />CART AND PRODUCT LINKS ARE CONCEPTS ONLY.</p><a href="#" className={styles.meta}>BACK TO TOP ↑</a></footer>
      </section>
    </main>
  </MotionStage>;
}
