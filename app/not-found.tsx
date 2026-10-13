import Link from "next/link";
import { SiteShell } from "@/features/site/shell";
import styles from "@/features/site/site.module.css";
export default function NotFound() { return <SiteShell><main id="content" className={styles.page}><p className={styles.meta}>404 / OUTSIDE THE COLLECTION</p><h1>ANOTHER<br />POINT OF VIEW.</h1><Link className={styles.button} href="/catalogue">EXPLORE THE COLLECTION ↗</Link></main></SiteShell>; }
