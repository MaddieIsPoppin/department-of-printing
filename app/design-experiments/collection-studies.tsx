import { GarmentPlayground } from "./garment-playground";
import { Garment } from "./garment";
import styles from "./experiment.module.css";

export function CollectionStudies() {
  return <section id="specimens" className={styles.collection} data-collection-surface aria-label="Collection studies">
    <div className={styles.collectionIntro}><p className={styles.meta}>A COLLECTION OF POSSIBILITIES / 01—04</p><h2>ONE IDEA.<br />ANOTHER<br /><span>POINT OF VIEW.</span></h2><p className={styles.body}>Different forms. Different expressions.<br />The same starting point: an idea.</p></div>
    <GarmentPlayground black={<Garment name="ratioBlack" />} white={<Garment name="ratioWhite" />} />
    <article className={styles.faithStudy} data-study="faith">
      <p className={styles.meta}>STUDY 02 / FAITH</p><div className={styles.faithDetail}><div><Garment name="faith" /></div><span className={styles.meta}>THE SMALL DETAIL</span></div><h3>A LITTLE<br />GOES A<br /><span>LONG WAY.</span></h3>
      <a href="#technical" className={styles.faithObject} aria-label="Explore garment types, inspired by the Faith study"><Garment name="faith" sizes="(max-width: 599px) 140vw, (max-width: 899px) 120vw, 100vw" /><span className={styles.studyLink}>EXPLORE THE FORMS ↗</span></a>
      <p className={`${styles.meta} ${styles.faithNote}`}>WHITE HOODIE / BACK ARTWORK<br />ONE SMALL MARK. A DIFFERENT FEELING.</p>
    </article>
    <article className={styles.growthStudy} data-study="growth">
      <p className={styles.meta}>STUDY 03 / GROWTH</p><h3 data-growth-type>TAKE<br />UP SPACE.</h3>
      <div className={styles.growthObject} data-growth-garment><Garment name="growth" /></div>
      <a className={styles.textLink} href="#technical">EXPLORE PIECE <span aria-hidden="true">↗</span></a>
      <p className={`${styles.meta} ${styles.growthNote}`}>WHITE HOODIE / BOTANICAL ARTWORK<br />AN EXERCISE IN SCALE.</p>
    </article>
    <article className={styles.studyFinal} data-study="type">
      <div className={styles.finalCopy}><p className={styles.meta}>STUDY 04 / STUDY</p><h3>EVERY MARK<br />STARTS<br />SOMEWHERE.</h3><p className={styles.body}>You&apos;ve seen our studies.<br />Now imagine yours.</p><a className={styles.textLink} href="#lab">YOUR TURN ↓</a></div>
      <div className={styles.studyObject} data-study-garment><Garment name="study" /></div>
      <p className={`${styles.meta} ${styles.studyFooter}`}>SWEATSHIRT / TYPOGRAPHIC STUDY / NOT A LIVE CATALOGUE</p>
    </article>
  </section>;
}
