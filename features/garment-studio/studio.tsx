"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { emptyDesign, updateLayer, constrainLayer, type Side, type Layer } from "./design";
import { readArtwork } from "./artwork";
import { PrintEditor } from "./print-editor";
import { studioGarment } from "./garment-config";
import styles from "./studio.module.css";

const Scene = dynamic(() => import("./scene"), { ssr: false, loading: () => <p>Preparing the 3D preview…</p> });
export function GarmentStudio({ quoteHref }: { quoteHref?: string }) {
  const router = useRouter();
  const [design, setDesign] = useState(emptyDesign);
  const [side, setSide] = useState<Side>("front");
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [turn, setTurn] = useState(0), [zoom, setZoom] = useState(4.5);
  const [show3d, setShow3d] = useState(false);
  const uploadGeneration = useRef(0);
  useEffect(() => () => { uploadGeneration.current++; }, []);
  const layer = design[side].find(item => item.id === selected);
  const update = (id: string, patch: Partial<Layer>) => setDesign(current => updateLayer(current, side, id, patch));
  function add(item: Layer, target = side) {
    setDesign(current => current[target].length >= 12 ? current : { ...current, [target]: [...current[target], constrainLayer(item)] });
    if (target === side) setSelected(item.id);
  }
  function changeSide(value: Side) { setSide(value); setSelected(null); setTurn(current => (Math.floor(current / 8) + 1) * 8); }
  return <main id="content" className={styles.studio}>
    <header className={styles.intro}><div><p className={styles.meta}>DEPARTMENT OF PRINTING / STUDIO PREVIEW 001</p><h1>MAKE IT<br /><span>YOUR OWN.</span></h1></div><p>One idea. Both sides.<br />Place your artwork, refine the details, explore it in space. Everything stays in this browser tab.</p></header>
    <div className={styles.notice}><strong>{studioGarment.name} / {studioGarment.model ? "MODEL PREVIEW" : "GARMENT MODEL NOT YET AVAILABLE"}</strong><p>{studioGarment.model ? "Preview mapping requires production approval." : "The editor is working. The 3D panel shows a flat, two-sided print test surface—not a T-shirt. A licensed oversized garment model and verified print mapping are still required."} Colours and print bounds are illustrative, not supplier specifications. Refreshing clears your work.</p></div>
    {quoteHref && <p className={styles.help}>Requesting a quotation transfers a text-only summary and leaves the studio. Keep your original artwork files; images and editable layers are not saved.</p>}
    {quoteHref && <button onClick={() => {
      const summary = ["Studio preview: " + studioGarment.name, "Colour request: " + design.colour, ...(["front", "back"] as const).flatMap(face => design[face].map(item => `${face}: ${item.kind === "text" ? (item.text || "Text").slice(0, 60) : "Image artwork"}; x ${Math.round(item.x * 100)}%, y ${Math.round(item.y * 100)}%, width ${Math.round(item.width * 100)}%, height ${Math.round(item.height * 100)}%, rotation ${Math.round(item.rotation)}°`))].join("\n").slice(0, 1900);
      try { sessionStorage.setItem("dop-studio-summary", summary); router.push(quoteHref); } catch { setMessage("Your browser could not transfer the summary. Open Custom printing and describe your design; your artwork has not been uploaded."); }
    }}>REQUEST A QUOTATION / TRANSFER DESIGN SUMMARY ↗</button>}
    <div className={styles.topbar}><div role="group" aria-label="Print side">{(["front", "back"] as const).map(value => <button key={value} aria-pressed={side === value} onClick={() => changeSide(value)}>{value.toUpperCase()} / {design[value].length}</button>)}</div><label>GARMENT COLOUR <input type="color" value={design.colour} onChange={event => setDesign(current => ({ ...current, colour: event.target.value }))} /></label><button onClick={() => { uploadGeneration.current++; setUploading(false); setDesign(emptyDesign()); setSelected(null); setMessage("Both sides reset."); }}>RESET BOTH SIDES</button></div>
    <div className={styles.workspace}>
      <section className={styles.editor} aria-label="2D Print Lab"><h2>01 / THE PRINT LAB</h2><PrintEditor layers={design[side]} selected={selected} colour={design.colour} select={setSelected} update={update} /></section>
      <section className={styles.viewer} aria-label="3D preview"><h2>02 / {studioGarment.model ? "THE GARMENT" : "LIVE TEXTURE TEST"}</h2><div className={styles.scene}>{show3d ? <Scene design={design} side={side} turn={turn} zoom={zoom} /> : <div className={styles.start3d}><p>FROM THE PRINT PLAN<br />INTO THREE DIMENSIONS.</p><button onClick={() => setShow3d(true)}>START 3D PREVIEW ↗</button></div>}</div><div className={styles.camera}><button disabled={!show3d} onClick={() => setTurn(value => value - 1)} aria-label="Rotate preview left">↶ ROTATE</button><button disabled={!show3d} onClick={() => setTurn(value => value + 1)} aria-label="Rotate preview right">ROTATE ↷</button><label>ZOOM<input type="range" min="2.8" max="7" step=".1" value={zoom} disabled={!show3d} onChange={event => setZoom(Number(event.target.value))} /></label></div><p className={styles.help}>Drag to orbit 360°. Scroll or pinch to zoom. Front/back buttons reset the view. The 2D editor also works without WebGL.</p></section>
      <aside className={styles.controls} aria-label="Design controls"><h2>03 / YOUR MARKS</h2>
        <button disabled={uploading || design[side].length >= 12} onClick={() => add({ id: crypto.randomUUID(), kind: "text", name: "Text", text: "YOUR IDEA", colour: "#252622", x: .5, y: .5, width: .65, height: .14, rotation: 0 })}>ADD TEXT +</button>
        <label className={styles.upload}>ADD ARTWORK<input type="file" accept="image/png,image/jpeg,image/webp" disabled={uploading || design[side].length >= 12} onChange={async event => {
          const file = event.target.files?.[0]; event.target.value = ""; if (!file) return;
          const generation = ++uploadGeneration.current, target = side; setUploading(true); setMessage("Preparing artwork…");
          try { const artwork = await readArtwork(file); if (generation !== uploadGeneration.current) return; const width = Math.min(.6, .6 * artwork.ratio); add({ id: crypto.randomUUID(), kind: "image", name: file.name, src: artwork.src, x: .5, y: .5, width, height: width / artwork.ratio, rotation: 0 }, target); setMessage(`Added ${file.name} to ${target}.`); }
          catch (error) { if (generation === uploadGeneration.current) setMessage(error instanceof Error ? error.message : "Unable to read this image."); }
          finally { if (generation === uploadGeneration.current) setUploading(false); }
        }} /></label><p className={styles.help}>PNG, JPEG or WebP · up to 8 MB / 24 MP. Resized locally to 1600px. Up to 12 layers per side. No upload to a server.</p>
        <p className={styles.status} role="status">{message}</p>
        <div className={styles.layers} role="group" aria-label="Artwork layers">{design[side].map((item, index) => <button key={item.id} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{String(index + 1).padStart(2, "0")} / {item.kind === "text" ? item.text || "Empty text" : item.name}</button>)}</div>
        {layer ? <div className={styles.adjustments}>
          {layer.kind === "text" && <><label>TEXT<input maxLength={60} value={layer.text} onChange={event => update(layer.id, { text: event.target.value })} /></label><label>INK COLOUR<input type="color" value={layer.colour} onChange={event => update(layer.id, { colour: event.target.value })} /></label></>}
          <label>SIZE<input type="range" min="5" max="90" value={Math.round(Math.max(layer.width, layer.height) * 100)} onChange={event => { const factor = Number(event.target.value) / 100 / Math.max(layer.width, layer.height); update(layer.id, { width: layer.width * factor, height: layer.height * factor }); }} /></label>
          <label>ROTATION / {Math.round(layer.rotation)}°<input type="range" min="-180" max="180" value={layer.rotation} onChange={event => update(layer.id, { rotation: Number(event.target.value) })} /></label>
          <div className={styles.coordinates}>{(["x", "y"] as const).map(axis => <label key={axis}>{axis.toUpperCase()} / %<input type="number" min="0" max="100" step="1" value={Math.round(layer[axis] * 100)} onChange={event => update(layer.id, { [axis]: Number(event.target.value) / 100 })} /></label>)}</div>
          <button onClick={() => update(layer.id, { x: .5, y: .5, rotation: 0 })}>CENTRE & STRAIGHTEN</button><button onClick={() => setDesign(current => ({ ...current, [side]: [...current[side].filter(item => item.id !== layer.id), layer] }))}>BRING TO FRONT</button><button onClick={() => { setDesign(current => ({ ...current, [side]: current[side].filter(item => item.id !== layer.id) })); setSelected(null); }}>REMOVE LAYER</button>
        </div> : <p className={styles.help}>Select a layer to edit its size, rotation and position.</p>}
      </aside>
    </div><noscript>This editor needs JavaScript. The existing custom printing page remains available.</noscript>
  </main>;
}
