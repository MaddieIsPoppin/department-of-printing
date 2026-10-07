import Link from "next/link";
import styles from "@/features/storefront/storefront.module.css";

export default function MissingPiece() {
  return <main id="content" className={styles.pageHeading}><p className={styles.micro}>PIECE NOT FOUND</p><h1>TRY ANOTHER<br />POINT OF VIEW.</h1><Link className={styles.action} href="/catalogue">BACK TO THE CATALOGUE ↗</Link></main>;
}
