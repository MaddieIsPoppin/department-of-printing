"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Link from "next/link";
import { garments } from "@/data/garments";
import { GarmentImage } from "./product-media";
import { constrainPlacement, initialPlacement, type Placement } from "./print-placement";
import styles from "./storefront.module.css";

export function CustomTeaser({ showHeading = true }: { showHeading?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [printed, setPrinted] = useState(false);
  const [position, setPosition] = useState(initialPlacement);
  const field = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; left: number; top: number } | null>(null);
  const garment = garments[selected];
  function update(patch: Partial<Placement>) {
    const area = field.current?.getBoundingClientRect();
    if (!area?.width || !area.height) return;
    setPosition(current => constrainPlacement({ ...current, ...patch }, area.width, area.height));
  }
  function start(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left: position.x, top: position.y };
  }
  function place(event: PointerEvent<HTMLButtonElement>) {
    const active = drag.current;
    const area = field.current?.getBoundingClientRect();
    if (!active || active.id !== event.pointerId || !area?.width || !area.height) return;
    update({ x: active.left + (event.clientX - active.x) / area.width * 100, y: active.top + (event.clientY - active.y) / area.height * 100 });
  }
  function end(event: PointerEvent<HTMLButtonElement>) {
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function keyboard(event: KeyboardEvent<HTMLButtonElement>) {
    const delta: Record<string, [number, number]> = { ArrowLeft: [-5, 0], ArrowRight: [5, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] };
    if (!delta[event.key]) return;
    event.preventDefault();
    update({ x: position.x + delta[event.key][0], y: position.y + delta[event.key][1] });
  }

  return <section className={styles.customTeaser} id="your-idea" aria-label="Try an idea on a garment">
    {showHeading && <div className={styles.sectionHeading}><div><p className={styles.micro}>03 / YOUR POINT OF VIEW</p><h2>OR MAKE SOMETHING<br />WE HAVEN’T.</h2></div><p className={styles.body}>You’re not limited to our designs.<br />Start with a shape. Bring your idea.</p></div>}
    <div className={styles.teaserStage}>
      <div className={styles.creationPreview}>
       <div className={styles.creationObject}>
        <GarmentImage image={garment.image} />
        <div className={styles.garmentTabs} role="group" aria-label="Choose your garment">{garments.map((option, index) => <button type="button" key={option.id} aria-pressed={selected === index} onClick={() => { setSelected(index); setPosition(initialPlacement); }}>{option.label}</button>)}</div>
        <div className={styles.printField} ref={field}>
          {printed && <button className={styles.samplePrint} type="button" style={{ left: `${position.x}%`, top: `${position.y}%`, transform: `translate(-50%, -50%) rotate(${position.angle}deg) scale(${position.scale / 100})` }} onPointerDown={start} onPointerMove={place} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={() => { drag.current = null; }} onKeyDown={keyboard} aria-label="Sample artwork. Drag or use arrow keys to position." aria-describedby="print-help"><span>YOUR</span><span>IDEA.</span><small>D/P — EXPERIMENT 001</small></button>}
        </div>
        <button className={styles.addPrint} type="button" aria-pressed={printed} onClick={() => { setPrinted(value => !value); setPosition(initialPlacement); }}>{printed ? "REMOVE SAMPLE −" : "ADD AN IDEA +"}</button>
        <span className={styles.canvasLabel}>{garment.isBlank ? "BLANK TEE / YOUR STARTING POINT" : "FINISHED STUDY / SAMPLE OVERLAY"}</span>
       </div>
       {printed && <div className={styles.labAdjustments} aria-label="Adjust sample artwork">
         <label>SIZE <output>{position.scale}%</output><input type="range" min="60" max="150" step="5" value={position.scale} onChange={event => update({ scale: Number(event.target.value) })} /></label>
         <label>ROTATION <output>{position.angle}°</output><input type="range" min="-45" max="45" step="5" value={position.angle} onChange={event => update({ angle: Number(event.target.value) })} /></label>
         <button type="button" onClick={() => { drag.current = null; setPosition(initialPlacement); }}>RESET</button>
       </div>}
      </div>
      <div className={styles.creationInfo}>
        <p className={styles.micro}>THE SHAPE IS JUST THE START.</p>
        <h3>{printed ? "NOW IT’S\nYOUR IDEA." : "A LITTLE\nPOSSIBILITY."}</h3>
        <p className={styles.body}>{garment.description}</p>
        <p className={styles.help} id="print-help">{printed ? "Drag the sample, or select it and use your keyboard arrows. Just a little play — nothing is saved." : "Tap to try our sample artwork. No upload. No design experience needed."}</p>
        <Link className={styles.action} href="/custom#start">START A CUSTOM ORDER <span>↗</span></Link>
        <noscript><p className={styles.help}>The sample needs JavaScript. You can still explore our custom printing service.</p></noscript>
      </div>
    </div>
  </section>;
}
