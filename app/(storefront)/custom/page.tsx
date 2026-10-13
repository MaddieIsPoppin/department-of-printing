import type { Metadata } from "next";
import Link from "next/link";
import { CustomTeaser } from "@/features/storefront/custom-teaser";
import { EnquiryForm } from "@/features/enquiries/enquiry-form";
import { contactConfiguration } from "@/features/enquiries/config";
import lab from "@/features/experience-lab/lab.module.css";
import styles from "@/features/site/site.module.css";
export const metadata: Metadata = { title: "Custom printing" };
export const dynamic = "force-dynamic";
export default function Custom() {
  const config = contactConfiguration();
  return <main id="content"><section className={lab.page}><header className={lab.pageIntro}><p className={lab.meta}>CUSTOM PRINTING / AN OPEN INVITATION</p><h1>YOUR IDEA.<br /><span>OUT IN THE WORLD.</span></h1><p>We print your artwork on supplier-sourced garments. Start with a shape, explore your design, then request a quotation.</p></header><Link className={styles.button} href="/custom/studio">OPEN THE INTERACTIVE PRINT LAB ↗</Link><a className={styles.button} href="#quotation">REQUEST A QUOTATION ↗</a></section><div className={lab.lab}><CustomTeaser showHeading={false} customHref="/custom/studio" actionLabel="OPEN THE PRINT LAB" /></div><section className={styles.page} id="quotation"><div className={styles.twoColumns}><div><p className={styles.meta}>YOUR NEXT STEP / CUSTOM QUOTATION</p><h2>LET’S MAKE<br />SOMETHING OF IT.</h2><p>Tell us about the garment, quantities, sizes and print locations. Custom pricing depends on your specifications; it is confirmed after reviewing your enquiry.</p><p>The studio is an exploratory preview. Its colour and print-area settings are not supplier-approved specifications. Artwork transfer will be arranged separately.</p></div><EnquiryForm kind="custom" emailReady={config.emailReady} whatsapp={config.whatsapp} /></div></section></main>;
}