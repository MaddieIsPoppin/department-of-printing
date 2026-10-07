import { customContactHref } from "@/data/site";
import styles from "./storefront.module.css";

export function ContactAction({ label = "START A CUSTOM ORDER" }: { label?: string }) {
  const href = customContactHref();
  return href ? <a className={styles.action} href={href}>{label} <span>↗</span></a> : <div className={styles.contactPending}><button type="button" disabled aria-describedby="contact-status">{label} ↗</button><p id="contact-status">Enquiries are not open in this preview. Our contact channel will appear here once confirmed.</p></div>;
}
