"use client";

import { useEffect, useRef, useState } from "react";
import base from "./experiment.module.css";
import styles from "./hero-film.module.css";

export function HeroFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = video.current;
    if (!media) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const sync = () => {
      if (paused || reduced.matches || !visible || document.hidden) media.pause();
      else void media.play().catch(() => { /* The supplied poster remains if autoplay is blocked. */ });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.05 });
    observer.observe(media);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); media.pause(); };
  }, [paused]);

  return <section className={styles.hero} aria-labelledby="hero-title">
    <header className={base.header}>
      <a href="#" className={base.brand} aria-label="Department of Printing, top">DEPARTMENT<br />OF PRINTING</a>
      <p className={base.meta}>SOUTH AFRICA / INDEPENDENT EXPRESSION</p>
      <nav aria-label="Exploration navigation"><a href="#specimens">PIECES</a><a href="#technical">GARMENTS</a><a href="#mini-lab">CREATE</a></nav>
    </header>
    <div className={styles.stage}>
      <div className={styles.film}>
        <video ref={video} autoPlay muted loop playsInline preload="metadata" poster="/garments/ratio-hero-poster.jpg" aria-label="Rotating black tee, a garment form study" width={2676} height={1588}>
          <source src="/garments/ratio-hoodie-hero.webm" type="video/webm" />
        </video>
      </div>
      <div className={styles.copy}>
        <p className={base.meta}>D/P / GARMENT STUDIES / 001</p>
        <h1 id="hero-title"><span>WEAR</span><span>WHAT YOU</span><span>CAN</span><span>IMAGINE.</span></h1>
        <p className={styles.caption}>An everyday shape.<br />An idea that is entirely yours.</p>
      </div>
      <div className={styles.filmNote}><span className={base.meta}>FORM IN MOTION / BLACK TEE</span><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "RESUME FILM ↗" : "PAUSE FILM Ⅱ"}</button></div>
    </div>
    <div className={styles.bottom}><p className={base.meta}>CHOOSE A GARMENT. MAKE IT YOURS.</p><a href="#specimens">EXPLORE THE PIECES ↓</a><a href="#mini-lab">TRY THE PRINT LAB ↗</a></div>
  </section>;
}
