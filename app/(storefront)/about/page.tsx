import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import styles from "@/features/site/site.module.css";
export const metadata: Metadata = { title: "About" };
export default function About() { return <main id="content" className={styles.page}><p className={styles.meta}>INDEPENDENT EXPRESSION / SOUTH AFRICA</p><h1>WEAR WHAT<br />YOU CAN IMAGINE.</h1><div className={styles.twoColumns}><section><h2>OUR IDEAS.<br />YOUR POINT OF VIEW.</h2><p>{site.about}</p><p>Explore the Department’s graphic designs, or bring your own artwork for custom printing. We source blank garments and print on them; we do not manufacture custom garments.</p><Link className={styles.button} href="/catalogue">SHOP THE COLLECTION ↗</Link></section><section><h2>FROM A MARK<br />TO SOMETHING YOU WEAR.</h2><p>Try your idea in the Print Lab, then tell us about your garments, quantities and print placement. We confirm specifications and pricing before an order is agreed.</p><Link className={styles.button} href="/custom">CUSTOM PRINTING ↗</Link><Link className={styles.button} href="/contact">TALK TO THE DEPARTMENT ↗</Link></section></div></main>; }
