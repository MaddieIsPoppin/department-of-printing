import Link from "next/link";
import { Oswald } from "next/font/google";
import { BagProvider } from "@/features/commerce/bag-provider";
import { LabMotion } from "@/features/experience-lab/lab-motion";
import { Header } from "./header";
import { navigation } from "./navigation";
import { site } from "@/data/site";
import base from "@/features/storefront/storefront.module.css";
import lab from "@/features/experience-lab/lab.module.css";
import styles from "./site.module.css";
const display = Oswald({ subsets: ["latin"], weight: "600", variable: "--store-display", display: "swap" });
export function SiteShell({ children }: { children: React.ReactNode }) {
  return <div className={`${base.store} ${display.variable} ${lab.world} ${styles.site}`}><a className={base.skip} href="#content">Skip to content</a><BagProvider><LabMotion><Header />{children}<footer className={styles.footer}><div><Link className={styles.brand} href="/">DEPARTMENT<br />OF PRINTING</Link><p>{site.about}</p></div><nav aria-label="Footer">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label} ↗</Link>)}<Link href="/policies">DELIVERY, RETURNS & PRIVACY ↗</Link></nav><p>DESIGN. PRINT. WEAR.<br />SOUTH AFRICA<br /><Link href="/custom/studio">OPEN THE PRINT LAB ↗</Link></p></footer></LabMotion></BagProvider></div>;
}
