"use client";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";
import { variants } from "./bag";
import { useBag } from "./bag-provider";
import styles from "@/features/site/site.module.css";

export function ProductOptions({ product }: { product: Product }) {
  const options = variants(product), bag = useBag();
  const [size, setSize] = useState(""), [colour, setColour] = useState(""), [quantity, setQuantity] = useState(1), [status, setStatus] = useState("");
  if (!options.length) return <div className={styles.panel}><p>{product.available === false ? "This piece is currently unavailable. Contact us to discuss alternatives." : "Pricing, availability or options are not yet confirmed for this piece."}</p><Link className={styles.button} href={`/contact?product=${encodeURIComponent(product.slug)}`}>ENQUIRE ABOUT THIS PIECE ↗</Link></div>;
  return <form className={styles.form} onSubmit={event => { event.preventDefault(); try { const variant = options.find(option => option.size === size && option.colour === colour); if (!variant) throw new Error("Choose an available size and colour."); bag.add({ slug: product.slug, variantId: variant.id, quantity }); setStatus("Added to your bag."); } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to add this piece."); } }}>
    <label>SIZE<select required value={size} onChange={event => { setSize(event.target.value); setColour(""); }}><option value="">Choose size</option>{[...new Set(options.map(option => option.size))].map(value => <option key={value}>{value}</option>)}</select></label>
    <label>COLOUR<select required value={colour} onChange={event => setColour(event.target.value)}><option value="">Choose colour</option>{[...new Set(options.filter(option => !size || option.size === size).map(option => option.colour))].map(value => <option key={value}>{value}</option>)}</select></label>
    <label>QUANTITY<input type="number" required min="1" max="99" value={quantity} onChange={event => setQuantity(Number(event.target.value))} /></label><button className={styles.button} disabled={!bag.ready}>ADD TO BAG +</button><p role="status">{status}</p><Link href="/cart">VIEW YOUR BAG ↗</Link>
  </form>;
}
