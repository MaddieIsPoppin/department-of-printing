import Link from "next/link";
import { site } from "@/data/site";
import { MotionFilm } from "./motion-film";
import styles from "./storefront.module.css";

export function HeroCampaign() {
  return <section className={styles.hero} aria-labelledby="campaign-title">
    <MotionFilm media={site.hero.media} eager className={styles.heroFilm} />
    <div className={styles.heroCopy}><p className={styles.micro}>01 / LOOK WHAT’S POSSIBLE</p><h1 id="campaign-title">{site.hero.headline.map(line => <span key={line}>{line}</span>)}</h1><p className={styles.body}>{site.hero.caption}</p></div>
    <div className={styles.heroPaths}><Link className={styles.action} href="/catalogue">SHOP COLLECTION <span>↗</span></Link><Link className={styles.action} href="/custom">CUSTOM PRINTING <span>↗</span></Link><p className={styles.micro}>OUR DESIGNS.<br />YOUR POSSIBILITIES.</p></div>
  </section>;
}
