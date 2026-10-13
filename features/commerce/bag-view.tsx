"use client";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";
import { useBag } from "./bag-provider";
import { resolveItem, subtotalMinor, money } from "./bag";
import { EnquiryForm } from "@/features/enquiries/enquiry-form";
import styles from "@/features/site/site.module.css";
export function BagView({ emailReady, whatsapp }: { emailReady: boolean; whatsapp: string | null }) {
  const bag = useBag(), [error, setError] = useState("");
  if (!bag.ready) return <p role="status">Restoring your bag…</p>;
  return <><p role="status">{bag.notice || error}</p>{bag.items.length ? <div className={styles.twoColumns}><section aria-label="Bag items">{bag.items.map((item, index) => {
    const { product, variant, unitMinor } = resolveItem(item, products);
    return <article className={styles.bagRow} key={`${item.slug}/${item.variantId}`}><div><Link href={`/product/${item.slug}`}>{product.name} ↗</Link><p>{variant.size} / {variant.colour}</p><p>{money(unitMinor)} each · {money(unitMinor * item.quantity)}</p></div><label>QUANTITY<input aria-label={`Quantity for ${product.name}, ${variant.size}, ${variant.colour}`} type="number" min="1" max="99" value={item.quantity} onChange={event => { try { bag.change(bag.items.map((entry, i) => i === index ? { ...entry, quantity: Number(event.target.value) } : entry)); setError(""); } catch { setError("Quantity must be a whole number from 1 to 99."); } }} /></label><button onClick={() => bag.change(bag.items.filter((_, i) => i !== index))}>REMOVE {product.name}</button></article>;
  })}<div className={styles.panel}><h2>{money(subtotalMinor(bag.items, products))}</h2><p>Estimated item subtotal. Delivery costs and availability are confirmed in response to your enquiry. No payment is taken here.</p></div><Link className={styles.button} href="/catalogue">CONTINUE SHOPPING ↗</Link></section><section aria-label="Order enquiry"><h2>LET’S CONFIRM<br />THE DETAILS.</h2><EnquiryForm kind="order" items={bag.items} emailReady={emailReady} whatsapp={whatsapp} /></section></div> : <div className={styles.panel}><h2>A LITTLE ROOM<br />FOR EXPRESSION.</h2><p>Your bag is empty. Pieces with unconfirmed pricing or options can be enquired about from their product page.</p><Link className={styles.button} href="/catalogue">EXPLORE THE COLLECTION ↗</Link><Link className={styles.button} href="/custom">MAKE SOMETHING OF YOUR OWN ↗</Link></div>}</>;
}
