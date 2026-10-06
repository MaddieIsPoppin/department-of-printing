// Explicit mock examples for design exploration, not catalogue or pricing data.
export const garments = [
  { number: "001", name: "ESSENTIAL TEE 01", price: "FROM R199", kind: "tee", tone: "light" },
  { number: "002", name: "HEAVYWEIGHT TEE 02", price: "FROM R249", kind: "tee", tone: "dark" },
  { number: "003", name: "CLASSIC HOODIE 01", price: "FROM R399", kind: "hoodie", tone: "grey" },
] as const;

export const palette = [
  { name: "Charcoal", token: "--ds-ink", role: "Primary text / inverse surface" },
  { name: "Warm grey", token: "--ds-warm", role: "Dark neutral" },
  { name: "Mid grey", token: "--ds-grey", role: "Image / decorative neutral" },
  { name: "Off-white", token: "--ds-page", role: "Page background" },
  { name: "Muted", token: "--ds-muted", role: "Secondary text" },
  { name: "Lichen", token: "--ds-accent", role: "Optional accent / experimental" },
] as const;
