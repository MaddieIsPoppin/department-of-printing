import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import { GarmentCard, GarmentPlaceholder, SectionHeading, SpecimenButton } from "./specimens";
import { garments, palette } from "./specimens-data";
import tokens from "./tokens.module.css";
import styles from "./playground.module.css";

const display = Oswald({ subsets: ["latin"], weight: "600", variable: "--font-exploration-display", display: "swap" });

export const metadata: Metadata = {
  title: "Design Exploration V1 — Department of Printing",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return <main className={`${display.variable} ${tokens.tokens} ${styles.playground}`} id="top">
    <a className={styles.skipLink} href="#type">Skip to specimens</a>
    <div className={styles.container}>
      <header className={styles.masthead}>
        <p className={styles.wordmark}>DEPARTMENT<br />OF PRINTING</p>
        <p className={styles.label}>VISUAL RESEARCH<br />SOUTH AFRICA / V1</p>
        <span className={`${styles.label} ${styles.badge}`}>EXPLORATION / NOT FINAL</span>
      </header>
      <nav className={styles.navigation} aria-label="Specimen sections">
        {[['type', '01 Typography'], ['colour', '02 Colour'], ['buttons', '03 Interface'], ['garments', '04 Garments'], ['technical', '05 Technical'], ['pricing', '06 Pricing']].map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <section id="type" className={styles.section}>
        <SectionHeading number="01" title="TYPE & ATTITUDE" note="CONDENSED / SANS / MONO" />
        <div className={styles.typeHero}>
          <div><p className={styles.label}>DISPLAY XL</p><h1 className={styles.displayXL}>WEAR WHAT<br />YOU CAN<br /><span>IMAGINE.</span></h1></div>
          <aside className={styles.typeAside}><span className={styles.registration} aria-hidden="true">+</span><p className={styles.bodySample}>Custom garments.<br />Your artwork.<br />Printed by us.</p><p className={styles.caption}>An open study in type, form and everyday expression. Strong ideas. Room to breathe.</p><p className={styles.label}>DESIGN EXPLORATION V1<br />DEVELOPMENT PLAYGROUND</p></aside>
        </div>
        <div className={styles.typeDetails}>
          <div><p className={styles.label}>DISPLAY LARGE</p><p className={styles.displayLarge}>YOUR GARMENT.<br />YOUR DESIGN.</p></div>
          <div className={styles.typeStack}><div><p className={styles.label}>SECTION TITLE</p><p className={styles.sectionSample}>THE GARMENT LIBRARY</p></div><div><p className={styles.label}>PRODUCT TITLE</p><p className={styles.productSample}>HEAVYWEIGHT TEE 01</p></div><div><p className={styles.label}>TECHNICAL LABELS</p><p className={styles.label}>GARMENT / 001 &nbsp; · &nbsp; 240 GSM<br />100% COTTON &nbsp; · &nbsp; FROM R249 &nbsp; · &nbsp; 01 / 04</p></div></div>
        </div>
      </section>
      <section id="colour" className={styles.section}>
        <SectionHeading number="02" title="A QUIET FOUNDATION" note="COLOUR STUDY / ACCENT OPTIONAL" />
        <div className={styles.palette}>{palette.map(swatch => <figure key={swatch.token}><div className={styles.swatch} style={{ backgroundColor: `var(${swatch.token})` }} /><figcaption><strong>{swatch.name}</strong><span>{swatch.token}</span><span>{swatch.role}</span></figcaption></figure>)}</div>
        <p className={styles.caption}>The garment brings the colour. The interface gives it space.</p>
      </section>
      <section id="buttons" className={styles.section}>
        <SectionHeading number="03" title="CLEAR INTENT" note="INTERFACE / CSS INTERACTIONS" />
        <p id="button-note" className={styles.caption}>Style specimens only — these buttons do not start shopping or add items. Hover, press or use Tab to inspect feedback.</p>
        <div className={styles.buttons}><SpecimenButton>START CREATING <span aria-hidden="true">→</span></SpecimenButton><SpecimenButton variant="outline">SHOP GARMENTS</SpecimenButton><SpecimenButton variant="text">VIEW GARMENT <span aria-hidden="true">→</span></SpecimenButton><SpecimenButton>ADD TO CART</SpecimenButton></div>
      </section>
      <section id="garments" className={styles.section}>
        <SectionHeading number="04" title="THE GARMENT LIBRARY" note="CARD STUDY / 3 SPECIMENS" />
        <p className={styles.caption}>Illustrated placeholders and supplied mock prices. Not a live catalogue.</p>
        <div className={styles.productGrid}>{garments.map(garment => <GarmentCard key={garment.number} {...garment} />)}</div>
      </section>
      <section id="technical" className={`${styles.section} ${styles.technical}`}>
        <SectionHeading number="05" title="A CLOSER LOOK" note="FORM / FABRIC / PRINT" />
        <div className={styles.diagram}>
          <div className={styles.diagramTitle}><p className={styles.label}>SPECIMEN / 002</p><h3 className={styles.displayLarge}>BUILT FOR<br />YOUR IDEAS.</h3></div>
          <div className={styles.diagramGarment}><GarmentPlaceholder tone="grey" /></div>
          <dl className={styles.callouts}><div><dt>FABRIC WEIGHT</dt><dd>240 GSM</dd></div><div><dt>COMPOSITION</dt><dd>100% COTTON</dd></div><div><dt>SILHOUETTE</dt><dd>RELAXED FIT</dd></div><div><dt>PRINT SURFACE</dt><dd>DTF READY</dd></div></dl>
        </div>
        <p className={styles.label}>ILLUSTRATIVE SPECIFICATIONS ONLY / NOT VERIFIED PRODUCT CLAIMS</p>
      </section>
      <section id="pricing" className={styles.section}>
        <SectionHeading number="06" title="GOOD IDEAS. WITHIN REACH." note="PRICE COMMUNICATION STUDY" />
        <div className={styles.priceGrid}><div><h3 className={styles.label}>CUSTOM PRINTED TEES</h3><p className={styles.price}>FROM R___</p></div><div><h3 className={styles.label}>HOODIES</h3><p className={styles.price}>FROM R___</p></div><div><p className={styles.productSample}>NO MINIMUM<br />ORDER</p><p className={styles.caption}>Copy concept only.<br />Order policy to be confirmed.</p></div></div>
        <p className={styles.caption}>Pricing placeholders — final prices and business terms have not been supplied.</p>
      </section>
      <footer className={styles.footer}><p className={styles.label}>DEPARTMENT OF PRINTING / DESIGN EXPLORATION V1<br />EVERY CHOICE HERE IS OPEN TO REVISION.</p><a href="#top">BACK TO TOP ↑</a></footer>
    </div>
  </main>;
}
