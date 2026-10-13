"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useBag } from "@/features/commerce/bag-provider";
import { navigation } from "./navigation";
import styles from "./site.module.css";
export function Header() {
  const pathname = usePathname(), bag = useBag();
  const [open, setOpen] = useState(false);
  return <header className={styles.header} onKeyDown={event => { if (event.key === "Escape") { setOpen(false); document.getElementById("menu-toggle")?.focus(); } }}>
    <Link className={styles.brand} href="/" onClick={() => setOpen(false)}>DEPARTMENT<br />OF PRINTING<span>INDEPENDENT EXPRESSION / ZA</span></Link>
    <button id="menu-toggle" className={styles.menuToggle} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(value => !value)}>MENU {open ? "−" : "+"}</button>
    <nav id="primary-navigation" className={styles.nav} data-open={open} aria-label="Main navigation">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href || pathname.startsWith(item.href + "/") ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}</nav>
    <Link className={styles.bagLink} href="/cart" onClick={() => setOpen(false)} aria-current={pathname === "/cart" ? "page" : undefined}>BAG <span aria-live="polite">{bag.ready ? bag.items.reduce((sum, item) => sum + item.quantity, 0) : 0}</span></Link>
  </header>;
}
