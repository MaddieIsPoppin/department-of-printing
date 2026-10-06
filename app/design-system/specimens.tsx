import type { ReactNode } from "react";
import styles from "./playground.module.css";

export function SectionHeading({ number, title, note }: { number: string; title: string; note: string }) {
  return <header className={styles.sectionHeading}>
    <h2><span className={styles.label}>{number} / </span>{title}</h2>
    <p className={styles.label}>{note}</p>
  </header>;
}

export function GarmentPlaceholder({ kind = "tee", tone = "light" }: { kind?: "tee" | "hoodie"; tone?: "light" | "dark" | "grey" }) {
  return <svg className={`${styles.garment} ${styles[tone]}`} viewBox="0 0 400 440" role="img" aria-label={`Illustrated ${tone} ${kind === "tee" ? "T-shirt" : "hoodie"} placeholder`}>
    {kind === "hoodie" ? <>
      <path className={styles.fabric} d="M151 92 Q143 29 200 24 Q257 29 249 92 L284 109 L348 310 L304 330 L260 225 L267 407 L133 407 L140 225 L96 330 L52 310 L116 109 Z" />
      <path className={styles.seam} d="M151 92 Q200 135 249 92 M151 92 Q165 47 200 46 Q235 47 249 92 M200 46 L200 109 M180 112 L178 177 M220 112 L222 177 M155 313 L245 313 L255 368 L145 368 Z M135 389 L265 389" />
    </> : <>
      <path className={styles.fabric} d="M153 66 Q200 92 247 66 L291 84 L363 174 L307 218 L269 181 L276 394 Q200 405 124 394 L131 181 L93 218 L37 174 L109 84 Z" />
      <path className={styles.seam} d="M153 66 Q155 118 200 119 Q245 118 247 66 M163 72 Q169 105 200 106 Q231 105 237 72 M109 84 L131 181 M291 84 L269 181 M44 166 L99 207 M356 166 L301 207 M126 380 Q200 390 274 380" />
    </>}
  </svg>;
}

export function SpecimenButton({ children, variant = "solid" }: { children: ReactNode; variant?: "solid" | "outline" | "text" }) {
  return <button type="button" className={`${styles.button} ${styles[variant]}`} aria-describedby="button-note">{children}</button>;
}

export function GarmentCard({ number, name, price, kind, tone }: { number: string; name: string; price: string; kind: "tee" | "hoodie"; tone: "light" | "dark" | "grey" }) {
  return <article className={styles.card}>
    <div className={styles.cardImage}>
      <span className={`${styles.label} ${styles.imageLabel}`}>GARMENT / {number}</span>
      <GarmentPlaceholder kind={kind} tone={tone} />
      <span className={`${styles.label} ${styles.imageCaption}`}>FRONT VIEW / PLACEHOLDER</span>
    </div>
    <div className={styles.cardInfo}><h3>{name}</h3><p className={styles.label}>{price}</p></div>
  </article>;
}
