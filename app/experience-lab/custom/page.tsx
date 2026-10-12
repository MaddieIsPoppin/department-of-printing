import type { Metadata } from "next";
import { site } from "@/data/site";
import { CustomTeaser } from "@/features/storefront/custom-teaser";
import { ContactAction } from "@/features/storefront/contact-action";
import styles from "@/features/experience-lab/lab.module.css";

export const metadata: Metadata = { title: "Your idea — Experience Lab" };
export default function LabCustom() {
  return <main id="content"><section className={styles.page}><header className={styles.pageIntro}><p className={styles.meta}>CUSTOM PRINTING / AN OPEN INVITATION</p><h1>YOUR IDEA.<br /><span>OUT IN THE WORLD.</span></h1><p>{site.custom.description}</p></header></section><div className={styles.lab}><CustomTeaser showHeading={false} customHref="#start" /></div><section className={styles.contact} id="start"><div><p className={styles.meta}>THE NEXT STEP</p><h2>LET’S MAKE<br />SOMETHING OF IT.</h2></div><div><p>Tell us about your idea, the garments you have in mind and roughly how many pieces you need. We print on supplier-sourced garments and work through the details with you.</p><ContactAction /></div></section></main>;
}
