"use client";
import Link from "next/link";
import styles from "@/features/site/site.module.css";
export default function ErrorPage({ reset }: { reset: () => void }) { return <main id="content" className={styles.page}><h1>LET’S TRY THAT AGAIN.</h1><p>This page could not load. Your saved bag has not been cleared.</p><button className={styles.button} onClick={reset}>TRY AGAIN</button><Link className={styles.button} href="/catalogue">BACK TO THE COLLECTION</Link></main>; }
