import { mkdir, writeFile, open } from "node:fs/promises";
import path from "node:path";
import { createHmac, randomUUID } from "node:crypto";
import type { Enquiry } from "./validation";

type DeliveryOptions = { directory: string; secret: string; identity: string; send: (id: string) => Promise<void>; now?: number };
export class RateLimitError extends Error {}
export async function recordAndDeliver(enquiry: Enquiry, options: DeliveryOptions) {
  const now = options.now ?? Date.now();
  await mkdir(options.directory, { recursive: true, mode: 0o700 });
  // Fixed-window exclusive files provide a shared-volume limit across workers.
  const bucket = Math.floor(now / 300000);
  for (const identity of [options.identity, enquiry.email.toLowerCase()]) {
    const hash = createHmac("sha256", options.secret).update(identity).digest("hex");
    let accepted = false;
    for (let slot = 0; slot < 3; slot++) {
      try { const handle = await open(path.join(options.directory, `limit-${hash}-${bucket}-${slot}`), "wx", 0o600); await handle.close(); accepted = true; break; }
      catch (error) { if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error; }
    }
    if (!accepted) throw new RateLimitError("Please wait five minutes before sending another enquiry.");
  }
  const id = randomUUID();
  const file = path.join(options.directory, `${id}.json`);
  // Flush the request before contacting the provider. Never expose this directory publicly.
  const handle = await open(file, "wx", 0o600);
  try { await handle.writeFile(JSON.stringify({ id, createdAt: new Date(now).toISOString(), status: "awaiting_confirmation", notification: "pending", enquiry })); await handle.sync(); } finally { await handle.close(); }
  let notification: "accepted" | "failed" = "accepted";
  try { await options.send(id); } catch { notification = "failed"; }
  // A separate receipt leaves the original enquiry intact even if this write fails.
  try { await writeFile(path.join(options.directory, `${id}.delivery.json`), JSON.stringify({ notification, updatedAt: new Date().toISOString() }), { mode: 0o600 }); }
  catch { notification = "failed"; }
  return { id, notification };
}
