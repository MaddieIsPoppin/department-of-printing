import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/data/site";
import { labNavigation } from "@/features/experience-lab/navigation";
import { LabMotion } from "@/features/experience-lab/lab-motion";
import base from "@/features/storefront/storefront.module.css";
import styles from "@/features/experience-lab/lab.module.css";

const display = Oswald({ subsets: ["latin"], weight: "600", variable: "--store-display", display: "swap" });
export const metadata: Metadata = { title: { default: "The Experience Lab — Department of Printing", template: "%s — Department of Printing" }, robots: { index: false, follow: false } };

export default function LabLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== "development") notFound();
  return <div className={`${base.store} ${display.variable} ${styles.world}`}>
    <a className={base.skip} href="#content">Skip to content</a>
    <LabMotion>
      <header className={styles.header}><Link className={styles.brand} href="/experience-lab">DEPARTMENT<br />OF PRINTING<span>INDEPENDENT EXPRESSION / ZA</span></Link><p className={styles.meta}>DESIGN. PRINT. WEAR.<br />THE EXPERIENCE LAB / 004</p><nav aria-label="Experience Lab navigation">{labNavigation.map((item, index) => <Link key={item.href} href={item.href}>{item.label} <sup>0{index + 1}</sup></Link>)}</nav></header>
      {children}
      <footer className={styles.footer}><div><Link className={styles.brand} href="/experience-lab">DEPARTMENT<br />OF PRINTING</Link><p>{site.about}</p></div><nav aria-label="Footer">{labNavigation.map(item => <Link key={item.href} href={item.href}>{item.label} ↗</Link>)}</nav><span className={styles.meta}>SOUTH AFRICA<br />EXPERIMENT / NOT YET TAKING ORDERS</span></footer>
    </LabMotion>
  </div>;
}
