import Image from "next/image";
import study from "@/public/garments/study-sweatshirt-white.png";
import ratioBlack from "@/public/garments/ratio-hoodie-black .png";
import ratioWhite from "@/public/garments/ratio-hoodie-white.png";
import discipline from "@/public/garments/discipline-tee-white.png";
import faith from "@/public/garments/faith-hoodie-white.png";
import growth from "@/public/garments/growth-hoodie-white.png";
import styles from "./experiment.module.css";

const renders = {
  study: { image: study, alt: "White Study sweatshirt, back view with multicoloured typographic artwork" },
  ratioBlack: { image: ratioBlack, alt: "Black Ratio hoodie, front view with geometric Department of Printing artwork" },
  ratioWhite: { image: ratioWhite, alt: "White Ratio hoodie, back view with geometric Department of Printing artwork" },
  discipline: { image: discipline, alt: "White Discipline tee, back view with illustrated artwork" },
  faith: { image: faith, alt: "White Faith hoodie, back view with fine blue artwork" },
  growth: { image: growth, alt: "White Growth hoodie, back view with black floral artwork" },
} as const;

export type GarmentName = keyof typeof renders;

export function Garment({ name = "ratioBlack", className = "", eager = false, sizes = "(max-width: 599px) 150vw, (max-width: 899px) 120vw, 150vw" }: { name?: GarmentName; className?: string; eager?: boolean; sizes?: string }) {
  const render = renders[name];
  return <div className={`${styles.garment} ${className}`} data-render={name}>
    <Image src={render.image} alt={render.alt} sizes={sizes} loading={eager ? "eager" : "lazy"} className={styles.garmentImage} />
  </div>;
}
