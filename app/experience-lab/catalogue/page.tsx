import type { Metadata } from "next";
import { products } from "@/data/products";
import { CatalogueExperience, type ArchiveQuery } from "@/features/experience-lab/catalogue-experience";
export const metadata: Metadata = { title: "The Collection — Experience Lab" };
export default async function LabCatalogue({ searchParams }: { searchParams: Promise<ArchiveQuery> }) {
  return <CatalogueExperience products={products} query={await searchParams} />;
}