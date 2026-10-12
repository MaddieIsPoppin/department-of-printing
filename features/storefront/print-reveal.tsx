"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { ProductMedia } from "@/data/media";
import styles from "./storefront.module.css";

// V2's artwork-detail enlargement, reversed into one continuous garment reveal.
// The exact same render stays on screen throughout; no invented artwork layer.
export function PrintReveal({ children, focus, active }: { children: ReactNode; focus?: ProductMedia["artworkFocus"]; active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active || !focus) return;
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
        const object = element.querySelector("[data-print-object]");
        const timeline = gsap.timeline({ scrollTrigger: { trigger: element, start: "top 85%", end: "top 12%", scrub: .18, invalidateOnRefresh: true }, onUpdate: () => { element.dataset.revealing = String(timeline.progress() < .99); } });
        timeline.fromTo(object, { scale: focus!.scale, transformOrigin: `${focus!.x}% ${focus!.y}%` }, { scale: 1, ease: "power2.inOut", duration: 1 }, 0);
        timeline.fromTo(element, { clipPath: "inset(18% 8% 18% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 1 }, 0);
        timeline.fromTo(element.querySelector("[data-print-label]"), { opacity: 1 }, { opacity: 0, duration: .2 }, .15);
        return () => { element.removeAttribute("data-revealing"); };
      }, element);
      await document.fonts.ready;
      if (!disposed) ScrollTrigger.refresh();
    }
    void enhance().catch(() => revert?.());
    return () => { disposed = true; revert?.(); };
  }, [active, focus]);
  return <div ref={root} className={styles.printReveal} data-print-reveal>
    <div data-print-object>{children}</div>
    {active && focus && <span className={styles.printRevealLabel} data-print-label aria-hidden="true">PRINT DETAIL → FINISHED PIECE</span>}
  </div>;
}
