import Link from "next/link";
import styles from "@/features/experience-lab/lab.module.css";
export default function MissingPiece() { return <main id="content" className={styles.page}><div className={styles.pageIntro}><p className={styles.meta}>404 / PIECE NOT FOUND</p><h1>ANOTHER<br />DIRECTION.</h1><Link className={styles.textLink} href="/catalogue">EXPLORE THE COLLECTION ↗</Link></div></main>; }
