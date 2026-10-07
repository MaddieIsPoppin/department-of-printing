import type { Metadata } from "next";
import { site } from "@/data/site";
import { CustomTeaser } from "@/features/storefront/custom-teaser";
import { ContactAction } from "@/features/storefront/contact-action";
import styles from "@/features/storefront/storefront.module.css";

export const metadata: Metadata = { title: "Create with us" };

export default function CustomPage() {
  return <main id="content">
    <section className={styles.customIntro}><p className={styles.micro}>CUSTOM PRINTING / YOUR IDEA, OUR COLLABORATION</p><h1>{site.custom.headline.map(line => <span key={line}>{line}</span>)}</h1><div><p className={styles.body}>{site.custom.description}</p><a className={styles.action} href="#start">START A CUSTOM ORDER <span>↘</span></a></div></section>
    <CustomTeaser showHeading={false} />
    <section className={styles.customStart} id="start" aria-labelledby="start-title"><div><p className={styles.micro}>LET’S START WITH AN IDEA.</p><h2 id="start-title">A FINISHED DESIGN.<br />A ROUGH SKETCH.<br />A WHAT IF.</h2></div><div><p className={styles.body}>Tell us what you’re imagining, what you’d like to print on, and roughly how many pieces you have in mind. We’ll work through the details together.</p><ContactAction /></div></section>
  </main>;
}
