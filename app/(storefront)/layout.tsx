import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/features/storefront/shell";
import { StoreMotion } from "@/features/storefront/store-motion";
import styles from "@/features/storefront/storefront.module.css";

const display = Oswald({ subsets: ["latin"], weight: "600", variable: "--store-display", display: "swap" });
export const metadata: Metadata = {
  title: { default: "Department of Printing", template: "%s — Department of Printing" },
  description: "Shop Department of Printing garment designs or make something with us. Independent expression, South Africa.",
  robots: { index: false, follow: false },
};

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== "development") notFound();
  return <div className={`${styles.store} ${display.variable}`}><a className={styles.skip} href="#content">Skip to content</a><StoreMotion><Header />{children}<Footer /></StoreMotion></div>;
}
