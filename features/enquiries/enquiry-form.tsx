"use client";
import { useEffect, useRef, useState } from "react";
import { products } from "@/data/products";
import type { BagItem } from "@/features/commerce/bag";
import { validateEnquiry, enquiryText } from "./validation";
import styles from "@/features/site/site.module.css";
type Props = { kind: "general" | "custom" | "order"; emailReady: boolean; whatsapp: string | null; items?: BagItem[]; initialMessage?: string };
export function EnquiryForm({ kind, emailReady, whatsapp, items = [], initialMessage = "" }: Props) {
  const [status, setStatus] = useState(""), [busy, setBusy] = useState(false), [prepared, setPrepared] = useState("");
  const reference = useRef<HTMLTextAreaElement>(null);
  const [preparedItems, setPreparedItems] = useState("");
  useEffect(() => { if (kind === "custom" && reference.current && !reference.current.value) { try { reference.current.value = sessionStorage.getItem("dop-studio-summary") || ""; } catch { /* Manual reference remains available. */ } } }, [kind]);
  return <form className={styles.form} onChange={() => { setPrepared(""); }} onSubmit={async event => {
    event.preventDefault(); setStatus(""); const form = event.currentTarget; const data = Object.fromEntries(new FormData(form));
    try {
      const payload = { ...data, kind, items, quantity: Number(data.quantity), consent: data.consent === "on" };
      const enquiry = validateEnquiry(payload, products); const summary = enquiryText(enquiry); setPrepared(summary); setPreparedItems(JSON.stringify(items));
      const action = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value");
      if (action === "prepare" || !emailReady) { setStatus("Enquiry prepared below. It has not been sent."); return; }
      setBusy(true);
      const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      setStatus(response.ok ? `${result.message} Reference: ${result.reference}` : result.error || "Unable to submit. Please try again.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to submit. Your form has been retained."); } finally { setBusy(false); }
  }}>
    {!emailReady && <p className={styles.status}>Online email submission is not configured yet. You can prepare and copy your enquiry{whatsapp ? ", or open WhatsApp below" : " for use once a contact channel is available"}. Nothing is sent automatically.</p>}
    <label>YOUR NAME<input name="name" autoComplete="name" required maxLength={100} /></label><label>EMAIL<input name="email" type="email" autoComplete="email" required maxLength={254} /></label><label>PHONE (OPTIONAL)<input name="phone" type="tel" autoComplete="tel" maxLength={50} /></label>
    {kind === "custom" && <><label>GARMENT<select name="garment" required><option value="tee">T-shirt</option><option value="hoodie">Hoodie</option><option value="sweat">Sweatshirt</option><option value="other">Other — describe below</option></select></label><label>COLOUR REQUEST<input name="colour" required maxLength={80} /></label><label>SIZES AND QUANTITIES PER SIZE<input name="sizes" required maxLength={300} placeholder="Describe your requirements" /></label><label>TOTAL QUANTITY<input name="quantity" type="number" min="1" max="10000" defaultValue="1" required /></label><label>PRINT PLACEMENT<select name="placement"><option>Front</option><option>Back</option><option>Front and back</option><option>Other — describe below</option></select></label><label>ARTWORK / DESIGN REFERENCE<textarea name="reference" ref={reference} maxLength={2000} /></label><p>No artwork files are uploaded with this form. Describe your design or provide a reference you are comfortable sharing. We will arrange artwork transfer separately once a contact channel is configured. Studio summaries describe placement only; images stay in your browser.</p></>}
    <label>{kind === "general" ? "YOUR ENQUIRY" : "ADDITIONAL INSTRUCTIONS"}<textarea name="message" defaultValue={initialMessage} required={kind === "general"} maxLength={3000} /></label>
    <label className={styles.trap} aria-hidden="true">Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className={styles.consent}><input type="checkbox" name="consent" required />I understand these details will be used to respond to my enquiry. Submission is not payment, a reservation or an order confirmation.</label>
    {emailReady && <button className={styles.button} disabled={busy} value="send">{busy ? "SUBMITTING…" : "SUBMIT ENQUIRY ↗"}</button>}<button className={styles.button} value="prepare" disabled={busy}>PREPARE ENQUIRY / COPY OR WHATSAPP</button>
    <p role="status" className={styles.status}>{status}</p>
    {prepared && preparedItems === JSON.stringify(items) && <div className={styles.panel}><pre className={styles.summary}>{prepared}</pre><button type="button" className={styles.button} onClick={async () => { try { await navigator.clipboard.writeText(prepared); setStatus("Copied to your clipboard."); } catch { setStatus("Select and copy the enquiry text above."); } }}>COPY ENQUIRY</button>{whatsapp && (prepared.length < 3500 ? <a className={styles.button} target="_blank" rel="noopener noreferrer" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(prepared)}`}>OPEN WHATSAPP ↗</a> : <p>This enquiry is too long for a WhatsApp link. Copy it and paste it into your conversation.</p>)}<p>You must send the message yourself in WhatsApp. Opening it does not submit an order.</p></div>}
  </form>;
}
