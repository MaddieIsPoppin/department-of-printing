import { SiteShell } from "@/features/site/shell";
export default function PublicLayout({ children }: { children: React.ReactNode }) { return <SiteShell>{children}</SiteShell>; }