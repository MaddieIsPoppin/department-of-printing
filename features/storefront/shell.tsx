import Link from "next/link";
import { site } from "@/data/site";
import styles from "./storefront.module.css";

export function Header() {
  return <header className={styles.header}>
    <Link href="/storefront-v3" className={styles.brand} aria-label={`${site.name}, storefront`}>DEPARTMENT<br />OF PRINTING</Link>
    <p className={styles.micro}>{site.location.toUpperCase()}<br />INDEPENDENT EXPRESSION</p>
    <nav aria-label="Storefront navigation"><Link href="/catalogue">SHOP</Link><Link href="/custom">CUSTOM</Link><Link href="/storefront-v3#about">ABOUT</Link><span className={styles.cart} aria-label="Cart is unavailable in this preview">CART 00 <small>SOON</small></span></nav>
  </header>;
}

export function Footer() {
  return <footer className={styles.footer} id="about"><div><p className={styles.micro}>THE DEPARTMENT / {site.location.toUpperCase()}</p><p>{site.about}</p></div><div className={styles.micro}>STOREFRONT V3 / PREVIEW<br />PRICING & ORDERING NOT YET LIVE<nav aria-label="Footer navigation"><Link href="/storefront-v3">THE STOREFRONT ↗</Link><Link href="/catalogue">SHOP ↗</Link><Link href="/custom">CUSTOM ↗</Link></nav></div></footer>;
}
