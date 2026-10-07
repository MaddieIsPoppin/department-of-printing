"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoAsset } from "@/data/media";
import styles from "./storefront.module.css";

export function MotionFilm({ media, className = "", eager = false }: { media: VideoAsset; className?: string; eager?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const film = video.current;
    if (!film) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (paused || reduced.matches || !visible || document.hidden) film.pause();
      else void film.play().catch(() => { /* The poster remains usable when autoplay is blocked. */ });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.1 });
    observer.observe(film);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); film.pause(); };
  }, [paused, media.src]);

  return <div className={`${styles.film} ${className}`} style={{ backgroundColor: media.background }}>
    <video ref={video} autoPlay muted loop playsInline preload={eager ? "auto" : "none"} poster={media.poster} aria-label={media.label} src={media.src} />
    <button className={styles.filmControl} type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "PLAY FILM ↗" : "PAUSE FILM Ⅱ"}</button>
  </div>;
}
