"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { VideoAsset } from "@/data/media";
import styles from "./storefront.module.css";

export function MotionFilm({ media, className = "", eager = false, interactive = false }: { media: VideoAsset; className?: string; eager?: boolean; interactive?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const gesture = useRef(false);
  const frame = useRef<number | null>(null);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncPlayback = useRef<() => void>(() => {});
  const origin = useRef<{ x: number; time: number } | null>(null);

  function settle() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    if (idle.current) clearTimeout(idle.current);
    frame.current = null; origin.current = null; gesture.current = false;
    syncPlayback.current();
  }
  function turn(amount: number) {
    const film = video.current;
    if (!film || !Number.isFinite(film.duration) || !film.duration) return;
    film.pause();
    film.currentTime = (film.currentTime + amount * film.duration + film.duration) % film.duration;
    setPaused(true);
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    const film = video.current;
    if (!interactive || event.pointerType !== "mouse" || !(event.target instanceof HTMLVideoElement) || !film || !Number.isFinite(film.duration) || !matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    if (!origin.current) origin.current = { x: event.clientX, time: film.currentTime };
    const target = Math.max(0, Math.min(film.duration - .04, origin.current.time + (event.clientX - origin.current.x) / event.currentTarget.clientWidth * film.duration * .65));
    gesture.current = true; film.pause();
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    // Seek actual turntable footage; never distort the opaque video plane.
    const ease = () => {
      const delta = target - film.currentTime;
      if (Math.abs(delta) <= .025) { frame.current = null; return; }
      if (!film.seeking) film.currentTime += delta * .24;
      frame.current = requestAnimationFrame(ease);
    };
    frame.current = requestAnimationFrame(ease);
    if (idle.current) clearTimeout(idle.current);
    idle.current = setTimeout(settle, 700);
  }

  useEffect(() => {
    const film = video.current;
    if (!film) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (paused || gesture.current || reduced.matches || !visible || document.hidden) film.pause();
      else void film.play().catch(() => { /* The poster remains usable when autoplay is blocked. */ });
    };
    syncPlayback.current = sync;
    const preference = () => { settle(); sync(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.1 });
    observer.observe(film);
    reduced.addEventListener("change", preference);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { syncPlayback.current = () => {}; settle(); observer.disconnect(); reduced.removeEventListener("change", preference); document.removeEventListener("visibilitychange", sync); film.pause(); };
  }, [paused, media.src]);

  return <div className={`${styles.film} ${className}`} style={{ backgroundColor: media.background }} onPointerMove={move} onPointerLeave={settle}>
    <video ref={video} autoPlay muted loop playsInline preload={eager ? "auto" : "none"} poster={media.poster} aria-label={media.label} src={media.src} />
    <button className={styles.filmControl} type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "PLAY FILM ↗" : "PAUSE FILM Ⅱ"}</button>
    {interactive && <div className={styles.filmTurn} role="group" aria-label="Explore garment views"><span>TURN THE FORM</span><button type="button" aria-label="Turn garment left" onClick={() => turn(-.08)}>↶</button><button type="button" aria-label="Turn garment right" onClick={() => turn(.08)}>↷</button></div>}
  </div>;
}
