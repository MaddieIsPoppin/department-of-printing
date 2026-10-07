import Link from "next/link";
import styles from "./storefront.module.css";

export function FinalCTA() {
  return <section className={styles.finale} aria-labelledby="final-title"><p className={styles.micro}>04 / YOUR NEXT MOVE</p><h2 id="final-title">MAKE SOMETHING<br />THAT DOESN’T<br /><span>EXIST YET.</span></h2><div className={styles.finalPaths}><Link className={styles.action} href="/catalogue">SHOP THE COLLECTION <span>↗</span></Link><Link className={styles.action} href="/custom">MAKE YOUR OWN <span>↗</span></Link></div></section>;
}
