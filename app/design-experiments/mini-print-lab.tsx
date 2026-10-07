"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import styles from "./interactive.module.css";
import base from "./experiment.module.css";

type Placement = { x: number; y: number; scale: number; angle: number };
const initial: Placement = { x: 50, y: 50, scale: 100, angle: 0 };

// Bound the rotated square to the visible sample print area, not the page.
function constrain(value: Placement, width: number, height: number): Placement {
  const radians = value.angle * Math.PI / 180;
  const half = width * 0.38 * value.scale / 100 * (Math.abs(Math.cos(radians)) + Math.abs(Math.sin(radians))) / 2;
  const dx = Math.min(50, half / width * 100);
  const dy = Math.min(50, half / height * 100);
  return { ...value, x: Math.max(dx, Math.min(100 - dx, value.x)), y: Math.max(dy, Math.min(100 - dy, value.y)) };
}

export function MiniPrintLab({ garment }: { garment: ReactNode }) {
  const [placement, setPlacement] = useState<Placement>(initial);
  const field = useRef<HTMLDivElement>(null);
  const drag = useRef<{ pointer: number; x: number; y: number; start: Placement; width: number; height: number } | null>(null);

  function update(patch: Partial<Placement>) {
    const rect = field.current?.getBoundingClientRect();
    if (!rect?.width || !rect.height) return;
    setPlacement(current => constrain({ ...current, ...patch }, rect.width, rect.height));
  }

  function startDrag(event: PointerEvent<HTMLButtonElement>) {
    // Touch visitors use the position buttons; dragging never steals page scrolling.
    if (event.pointerType === "touch" || event.button !== 0) return;
    const rect = field.current?.getBoundingClientRect();
    if (!rect?.width || !rect.height) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, start: placement, width: rect.width, height: rect.height };
  }

  function moveDrag(event: PointerEvent<HTMLButtonElement>) {
    const active = drag.current;
    if (!active || active.pointer !== event.pointerId) return;
    setPlacement(constrain({ ...active.start, x: active.start.x + (event.clientX - active.x) / active.width * 100, y: active.start.y + (event.clientY - active.y) / active.height * 100 }, active.width, active.height));
  }

  function endDrag(event: PointerEvent<HTMLButtonElement>) {
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function moveKeys(event: KeyboardEvent<HTMLButtonElement>) {
    const step = event.shiftKey ? 5 : 2;
    const shifts: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const delta = shifts[event.key];
    if (!delta) return;
    event.preventDefault();
    update({ x: placement.x + delta[0], y: placement.y + delta[1] });
  }

  return <section id="mini-lab" className={styles.miniLab} aria-labelledby="mini-lab-title">
    <div className={styles.labHeading}><p className={base.meta}>D/P / INTERACTIVE SAMPLE</p><h3 id="mini-lab-title">YOUR{" "}<br />PRINT.</h3><p className={styles.labHint}>DRAG TO PLACE</p><p className={styles.touchHint}>TAP TO PLACE</p></div>
    <div className={styles.labObject}>
      {garment}
      <div className={styles.printArea} ref={field}>
        <span className={styles.areaLabel}>PRINT AREA / SAMPLE</span>
        <button type="button" className={styles.sampleArtwork} style={{ left: `${placement.x}%`, top: `${placement.y}%`, transform: `translate(-50%, -50%) rotate(${placement.angle}deg) scale(${placement.scale / 100})` }} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={() => { drag.current = null; }} onKeyDown={moveKeys} aria-label="Move sample artwork with arrow keys" aria-describedby="artwork-help">
          <span>D/P</span><span>YOUR POINT<br />OF VIEW.</span><span>EXPERIMENT / 001</span>
        </button>
      </div>
    </div>
    <div className={styles.labControls}>
      <p className={base.meta}>MAKE IT YOURS / 01</p>
      <label htmlFor="print-scale">SCALE <output>{placement.scale}%</output></label>
      <input id="print-scale" type="range" min="60" max="150" step="5" value={placement.scale} onChange={event => update({ scale: Number(event.target.value) })} />
      <label htmlFor="print-angle">ROTATE <output>{placement.angle}°</output></label>
      <input id="print-angle" type="range" min="-45" max="45" value={placement.angle} onChange={event => update({ angle: Number(event.target.value) })} />
      <div className={styles.positionControls} role="group" aria-label="Artwork position"><span>POSITION</span>{([
        ["←", "Move artwork left", -5, 0], ["↑", "Move artwork up", 0, -5], ["↓", "Move artwork down", 0, 5], ["→", "Move artwork right", 5, 0],
      ] as const).map(([symbol, label, x, y]) => <button key={label} type="button" aria-label={label} onClick={() => update({ x: placement.x + x, y: placement.y + y })}>{symbol}</button>)}</div>
      <p className={styles.placementReadout}>X {Math.round(placement.x).toString().padStart(2, "0")} / Y {Math.round(placement.y).toString().padStart(2, "0")}</p>
      <button type="button" className={styles.resetPrint} onClick={() => { drag.current = null; setPlacement(initial); }}>RESET PRINT ↺</button>
      <p id="artwork-help" className={styles.controlNote}>Drag or use the arrow controls. Keyboard arrows also move the selected print.</p>
    </div>
    <p className={styles.labDisclaimer}>Sample artwork over an existing render. An interaction preview, not a production proof. Nothing is uploaded or saved.</p>
    <noscript><p className={styles.noScript}>Enable JavaScript to move, scale and rotate the sample print.</p></noscript>
  </section>;
}

