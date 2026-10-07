"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "./storefront.module.css";

// Adapted from V2 MotionStage: scoped matchMedia, async disposal and full revert.
// No pins or garment scroll drift. The registration environment carries the handoff.
export function StoreMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;
    async function enhance() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const element = root.current;
      const media = gsap.matchMedia();
      revert = () => media.revert();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo("[data-route-rule]", { scaleX: 0 }, { scaleX: 1, duration: .28, ease: "power2.out", transformOrigin: "left center" });
        const grid = element.querySelector("[data-studio-grid]");
        element.querySelectorAll("main > section").forEach((scene, index) => {
          gsap.fromTo(grid, { y: (index % 2) * 12 }, {
            y: ((index + 1) % 2) * 12, ease: "none", immediateRender: false,
            scrollTrigger: { trigger: scene, start: "top bottom", end: "top 25%", scrub: .15 },
          });
          // V2 technical-rule entrance, applied consistently to scene boundaries.
          const heading = scene.querySelector<HTMLElement>("h2");
          if (heading) gsap.fromTo(heading, { "--rule-scale": 0 }, {
            "--rule-scale": 1, duration: .45, ease: "power2.out",
            scrollTrigger: { trigger: scene, start: "top 75%", once: true },
          });
        });
      }, element);
      await document.fonts.ready;
      if (!disposed) ScrollTrigger.refresh();
    }
    void enhance().catch(() => { revert?.(); });
    return () => { disposed = true; revert?.(); };
  }, [pathname]);

  return <div ref={root} className={styles.motionWorld}>
    <div className={styles.studioGrid} data-studio-grid aria-hidden="true"><span>+</span><span>+</span><span>+</span><span>+</span></div>
    <div className={styles.routeRule} data-route-rule aria-hidden="true" />
    {children}
  </div>;
}
