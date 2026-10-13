import "server-only";
export function contactConfiguration() {
  const isEmail = (value: string | undefined) => Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  const email = process.env.BUSINESS_EMAIL || "";
  const whatsapp = (process.env.BUSINESS_WHATSAPP || "").replace(/^\+/, "");
  return {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null,
    whatsapp: /^[1-9]\d{7,14}$/.test(whatsapp) ? whatsapp : null,
    emailReady: Boolean(process.env.RESEND_API_KEY && isEmail(process.env.ENQUIRY_FROM_EMAIL) && isEmail(process.env.ENQUIRY_TO_EMAIL) && process.env.ENQUIRY_DATA_DIR && (process.env.ENQUIRY_HASH_SECRET?.length ?? 0) >= 32 && process.env.SITE_URL),
  };
}
