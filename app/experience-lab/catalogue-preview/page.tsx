import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { createDemoProducts } from "@/data/demo-products";
import { CatalogueExperience, type ArchiveQuery } from "@/features/experience-lab/catalogue-experience";

export const metadata: Metadata = { title: "Demo Archive — Layout Preview", robots: { index: false, follow: false } };
export default async function CataloguePreview({ searchParams }: { searchParams: Promise<ArchiveQuery> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  return <CatalogueExperience products={createDemoProducts(products)} query={await searchParams} preview />;
}
