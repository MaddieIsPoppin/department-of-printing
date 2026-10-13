import type { Metadata } from "next";
import { BagView } from "@/features/commerce/bag-view";
import { contactConfiguration } from "@/features/enquiries/config";
import styles from "@/features/site/site.module.css";
export const metadata: Metadata = { title: "Your bag", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default function Cart() { const config = contactConfiguration(); return <main id="content" className={styles.page}><p className={styles.meta}>YOUR SELECTION / ENQUIRY-BASED ORDERING</p><h1>THE BAG.</h1><BagView emailReady={config.emailReady} whatsapp={config.whatsapp} /></main>; }
