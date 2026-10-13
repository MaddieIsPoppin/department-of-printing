"use client";
import { useRef, type PointerEvent } from "react";
import type { Layer } from "./design";
import styles from "./studio.module.css";

export function PrintEditor({ layers, selected, colour, select, update }: { layers: Layer[]; selected: string | null; colour: string; select: (id: string) => void; update: (id: string, patch: Partial<Layer>) => void }) {
  const field = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; pointer: number; startX: number; startY: number; x: number; y: number } | null>(null);
  function start(event: PointerEvent<SVGSVGElement>, layer: Layer) {
    if (event.button !== 0) return;
    event.preventDefault(); select(layer.id); event.currentTarget.focus(); event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { id: layer.id, pointer: event.pointerId, startX: event.clientX, startY: event.clientY, x: layer.x, y: layer.y };
  }
  return <div className={styles.editorStage}>
    <p className={styles.meta}>FLAT PRINT PLAN / PREVIEW BOUNDS</p>
    <div ref={field} className={styles.printArea} style={{ backgroundColor: colour }} aria-label="Printable area">
      {!layers.length && <p className={styles.empty}>YOUR IDEA<br />STARTS HERE.<small>Add text or artwork to begin.</small></p>}
      {layers.map(layer => <svg key={layer.id} className={styles.layer} data-selected={selected === layer.id} viewBox="0 0 1000 1000" preserveAspectRatio="none" role="button" tabIndex={0} aria-label={`${layer.name}. Drag or use arrow keys to move.`} aria-pressed={selected === layer.id} style={{ left: `${layer.x * 100}%`, top: `${layer.y * 100}%`, width: `${layer.width * 100}%`, height: `${layer.height * 100}%`, transform: `translate(-50%,-50%) rotate(${layer.rotation}deg)` }}
        onFocus={() => select(layer.id)} onPointerDown={event => start(event, layer)} onPointerMove={event => {
          const active = drag.current, rect = field.current?.getBoundingClientRect();
          if (active?.pointer !== event.pointerId || !rect) return;
          update(active.id, { x: active.x + (event.clientX - active.startX) / rect.width, y: active.y + (event.clientY - active.startY) / rect.height });
        }} onPointerUp={event => { drag.current = null; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }} onKeyDown={event => {
          const delta: Record<string, [number, number]> = { ArrowLeft: [-.01, 0], ArrowRight: [.01, 0], ArrowUp: [0, -.01], ArrowDown: [0, .01] };
          if (delta[event.key]) { event.preventDefault(); const [x, y] = delta[event.key]; update(layer.id, { x: layer.x + x * (event.shiftKey ? 5 : 1), y: layer.y + y * (event.shiftKey ? 5 : 1) }); }
        }}>
        {layer.kind === "image" ? <image href={layer.src} width="1000" height="1000" preserveAspectRatio="none" /> : <text x="500" y="500" dominantBaseline="central" textAnchor="middle" fill={layer.colour} fontFamily="Arial" fontWeight="700" fontSize="720" textLength="950" lengthAdjust="spacingAndGlyphs">{layer.text}</text>}
      </svg>)}
    </div><p className={styles.meta}>REGISTRATION / DRAG · ARROW KEYS · NUMERIC CONTROLS</p>
  </div>;
}
