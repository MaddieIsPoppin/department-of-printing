"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import styles from "./storefront.module.css";

// Adapted from V2 GarmentPlayground: frame-coalesced pointer movement and idle settle.
export function GarmentResponse({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const allowed = useRef(false);
  const frame = useRef<number | null>(null);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);
  function reset() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    if (settle.current) clearTimeout(settle.current);
    frame.current = null;
    root.current?.style.removeProperty("--turn-x");
    root.current?.style.removeProperty("--turn-y");
  }
  useEffect(() => {
    const query = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => { allowed.current = query.matches; if (!query.matches) reset(); };
    update(); query.addEventListener("change", update);
    return () => { reset(); query.removeEventListener("change", update); };
  }, []);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (!allowed.current || event.pointerType !== "mouse") return;
    const { clientX, clientY, currentTarget } = event;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = currentTarget.getBoundingClientRect();
      root.current?.style.setProperty("--turn-x", `${-(clientY - rect.top - rect.height / 2) / rect.height * 2}deg`);
      root.current?.style.setProperty("--turn-y", `${(clientX - rect.left - rect.width / 2) / rect.width * 4}deg`);
      if (settle.current) clearTimeout(settle.current);
      settle.current = setTimeout(reset, 650);
      frame.current = null;
    });
  }
  return <div className={styles.garmentResponse} ref={root} onPointerMove={move} onPointerLeave={reset}>{children}</div>;
}
