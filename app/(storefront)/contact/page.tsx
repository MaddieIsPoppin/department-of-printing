import type { Metadata } from "next";
import Link from "next/link";
import { productBySlug } from "@/data/products";
import { EnquiryForm } from "@/features/enquiries/enquiry-form";
import { contactConfiguration } from "@/features/enquiries/config";
import styles from "@/features/site/site.module.css";
export const metadata: Metadata = { title: "Contact" };
export const dynamic = "force-dynamic";
export default async function Contact({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const config = contactConfiguration(), query = await searchParams;
  const product = typeof query.product === "string" ? productBySlug(query.product) : undefined;
  return <main id="content" className={styles.page}><p className={styles.meta}>THE DEPARTMENT / LET’S TALK</p><h1>WHAT’S<br />ON YOUR MIND?</h1><div className={styles.twoColumns}><section><h2>{product ? product.name : "A PRINT. A PIECE. AN IDEA."}</h2><p>Ask about a garment or tell us what you would like to make. We’ll need to confirm pricing, specifications and availability before accepting an order.</p>{config.email && <p><a className={styles.button} href={`mailto:${config.email}`}>EMAIL {config.email} ↗</a></p>}{config.whatsapp && <p><a className={styles.button} href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noopener noreferrer">OPEN WHATSAPP ↗</a></p>}{!config.email && !config.whatsapp && <p className={styles.panel}>Business contact channels are awaiting configuration. You can prepare a copy of your enquiry below; it will not reach the business until a channel is available.</p>}<Link className={styles.button} href="/custom#quotation">REQUEST A CUSTOM QUOTATION ↗</Link></section><EnquiryForm kind="general" emailReady={config.emailReady} whatsapp={config.whatsapp} initialMessage={product ? `I’d like to enquire about ${product.name}. Please confirm pricing, sizes, colours and availability.` : ""} /></div></main>;
}
