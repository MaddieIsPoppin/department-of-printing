import Link from "next/link";
import { site } from "@/data/site";
import { MotionFilm } from "./motion-film";
import styles from "./storefront.module.css";
import { RegistrationFrame } from "./registration-frame";
import { HeroHeadline } from "./hero-headline";

export function HeroCampaign() {
  return <section className={styles.hero} aria-labelledby="campaign-title">
    <MotionFilm media={site.hero.media} eager interactive className={styles.heroFilm} />
    <RegistrationFrame label="FORM STUDY / BLACK TEE" />
    <div className={styles.heroCopy}><p className={styles.micro}>01 / LOOK WHAT’S POSSIBLE</p><HeroHeadline lines={site.hero.headline} /><p className={styles.body}>{site.hero.caption}</p></div>
    <div className={styles.heroPaths}><Link className={styles.action} href="/catalogue">SHOP COLLECTION <span>↗</span></Link><Link className={styles.action} href="/custom">CUSTOM PRINTING <span>↗</span></Link><p className={styles.micro}>OUR DESIGNS.<br />YOUR POSSIBILITIES.</p></div>
  </section>;
}
