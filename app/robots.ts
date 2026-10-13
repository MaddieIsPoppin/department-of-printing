import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const url = process.env.SITE_URL;
  if (!url || process.env.SITE_INDEXABLE !== "true") return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/cart", "/custom/studio", "/experience-lab", "/design-system", "/design-experiments", "/storefront-v3"] }, sitemap: `${new URL(url).origin}/sitemap.xml` };
}
