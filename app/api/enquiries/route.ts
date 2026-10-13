import { products } from "@/data/products";
import { contactConfiguration } from "@/features/enquiries/config";
import { validateEnquiry, enquiryText } from "@/features/enquiries/validation";
import { recordAndDeliver, RateLimitError } from "@/features/enquiries/delivery";
import path from "node:path";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!contactConfiguration().emailReady) return Response.json({ error: "Email enquiries are not configured yet. Use a listed contact channel or copy your enquiry for later." }, { status: 503 });
  let site: URL;
  try { site = new URL(process.env.SITE_URL!); } catch { return Response.json({ error: "Enquiry service configuration is incomplete." }, { status: 503 }); }
  if (request.headers.get("origin") !== site.origin) return Response.json({ error: "Request origin not allowed." }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return Response.json({ error: "Expected JSON." }, { status: 415 });
  const directory = path.resolve(process.env.ENQUIRY_DATA_DIR!);
  const publicRoot = path.resolve("public");
  if (!path.isAbsolute(process.env.ENQUIRY_DATA_DIR!) || directory === publicRoot || directory.startsWith(publicRoot + path.sep)) return Response.json({ error: "Private enquiry storage is not configured correctly." }, { status: 503 });
  let enquiry;
  try {
    const reader = request.body?.getReader(); if (!reader) throw new Error("Missing request.");
    let length = 0; const chunks: Uint8Array[] = [];
    while (true) { const { done, value } = await reader.read(); if (done) break; length += value.length; if (length > 16000) { await reader.cancel(); return Response.json({ error: "Enquiry is too large. Artwork files cannot be attached here." }, { status: 413 }); } chunks.push(value); }
    enquiry = validateEnquiry(JSON.parse(Buffer.concat(chunks).toString("utf8")), products);
  } catch (error) { return Response.json({ error: error instanceof SyntaxError ? "Invalid request." : error instanceof Error ? error.message : "Invalid enquiry." }, { status: 400 }); }
  try {
    // Only trust a proxy-sanitised header explicitly configured by the operator.
    const identity = process.env.ENQUIRY_IP_HEADER ? request.headers.get(process.env.ENQUIRY_IP_HEADER) || "unknown" : "global";
    const result = await recordAndDeliver(enquiry, { directory, secret: process.env.ENQUIRY_HASH_SECRET!, identity, send: async id => {
      const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `enquiry/${id}` }, body: JSON.stringify({ from: process.env.ENQUIRY_FROM_EMAIL, to: [process.env.ENQUIRY_TO_EMAIL], reply_to: enquiry.email, subject: `Department of Printing: ${enquiry.kind} enquiry ${id}`, text: `Reference: ${id}\nAwaiting confirmation — no payment or reservation.\n\n${enquiryText(enquiry)}` }), signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error("Email provider did not accept notification.");
    } });
    return Response.json({ reference: result.id, message: result.notification === "accepted" ? "Enquiry submitted — awaiting confirmation. No payment has been taken and no stock reserved." : "Enquiry recorded — awaiting confirmation. Email notification is delayed; keep your reference and contact us through an available channel." }, { status: 202 });
  } catch (error) {
    if (error instanceof RateLimitError) return Response.json({ error: error.message }, { status: 429, headers: { "Retry-After": "300" } });
    return Response.json({ error: "We could not securely record your enquiry. Nothing has been submitted. Please try again or use another contact channel." }, { status: 503 });
  }
}
