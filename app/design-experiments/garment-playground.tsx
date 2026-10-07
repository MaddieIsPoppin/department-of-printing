"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import styles from "./interactive.module.css";
import base from "./experiment.module.css";

export function GarmentPlayground({ black, white }: { black: ReactNode; white: ReactNode }) {
  const [colour, setColour] = useState<"black" | "white">("black");
  const object = useRef<HTMLDivElement>(null);
  const pendingFrame = useRef<number | null>(null);
  const canMove = useRef(false);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);

  function resetDepth() {
    if (settle.current) clearTimeout(settle.current);
    if (pendingFrame.current !== null) cancelAnimationFrame(pendingFrame.current);
    pendingFrame.current = null;
    object.current?.style.removeProperty("--pointer-x");
    object.current?.style.removeProperty("--pointer-y");
    object.current?.style.removeProperty("--pointer-turn");
  }

  useEffect(() => {
    const query = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => { canMove.current = query.matches; if (!query.matches) resetDepth(); };
    update();
    query.addEventListener("change", update);
    return () => { if (settle.current) clearTimeout(settle.current); query.removeEventListener("change", update); if (pendingFrame.current !== null) cancelAnimationFrame(pendingFrame.current); };
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!canMove.current || event.pointerType !== "mouse") return;
    const { clientX, clientY, currentTarget } = event;
    if (pendingFrame.current !== null) cancelAnimationFrame(pendingFrame.current);
    pendingFrame.current = requestAnimationFrame(() => {
      const rect = currentTarget.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      object.current?.style.setProperty("--pointer-x", `${-y * 2}deg`);
      object.current?.style.setProperty("--pointer-y", `${x * 4}deg`);
      if (settle.current) clearTimeout(settle.current);
      settle.current = setTimeout(resetDepth, 650);
      pendingFrame.current = null;
    });
  }

  return <section className={`${styles.poster} ${styles.ratioPlayground}`} data-colour={colour} aria-labelledby="ratio-title" data-playground>
    <div className={styles.inversePlane} aria-hidden="true" />
    <div className={styles.posterStage} onPointerMove={move} onPointerLeave={resetDepth}>
      <div className={styles.printFrame} aria-hidden="true"><span>+</span><span>+</span><span>+</span><span>+</span></div>
      <p className={`${base.meta} ${styles.posterEdition}`}>STUDY 01 / RATIO<br />COLOUR & VIEW</p>
      <h3 id="ratio-title" className={styles.posterTitle}><span>SAME IDEA.</span><span>OTHER SIDE.</span></h3>
      <div className={styles.pointerObject} ref={object}>
        <div className={styles.lookBlack} aria-hidden={colour !== "black"}>{black}</div>
        <div className={styles.lookWhite} aria-hidden={colour !== "white"}>{white}</div>
      </div>
      <p className={`${base.meta} ${styles.posterCoordinates}`}>PRINT / ALIGN / REPEAT<br />{colour === "black" ? "01.A — FRONT VIEW" : "01.B — BACK VIEW"}</p>
      <div className={styles.selector} role="group" aria-label="Ratio hoodie colour and view">
        <span className={base.meta}>SWITCH</span>
        <button type="button" aria-pressed={colour === "black"} onClick={() => setColour("black")}>BLACK <span aria-hidden="true">↗</span></button>
        <button type="button" aria-pressed={colour === "white"} onClick={() => setColour("white")}>WHITE <span aria-hidden="true">↗</span></button>
      </div>
      <span className={styles.srOnly} role="status">{colour === "black" ? "Black Ratio hoodie, front view" : "White Ratio hoodie, back view"}</span>
    </div>
    <div className={styles.posterBottom}><p className={base.meta}>BLACK / FRONT. WHITE / BACK.<br />TWO VIEWS, ONE STUDY.</p><a href="#technical" className={base.meta}>EXPLORE THE GARMENTS ↗</a><a href="#mini-lab" className={base.meta}>TRY THE LAB ↗</a></div>
    <noscript><p className={styles.noScript}>Colour switching needs JavaScript. You can still explore the collection below.</p></noscript>
  </section>;
}
