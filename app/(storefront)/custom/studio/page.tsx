import type { Metadata } from "next";
import { GarmentStudio } from "@/features/garment-studio/studio";
export const metadata: Metadata = { title: "Print Lab", robots: { index: false, follow: true } };
export default function Studio() { return <GarmentStudio quoteHref="/custom#quotation" />; }
