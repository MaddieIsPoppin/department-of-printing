import type { Metadata } from "next";
import { GarmentStudio } from "@/features/garment-studio/studio";
export const metadata: Metadata = { title: "Garment Studio Preview", robots: { index: false, follow: false } };
export default function StudioPreview() { return <GarmentStudio />; }
