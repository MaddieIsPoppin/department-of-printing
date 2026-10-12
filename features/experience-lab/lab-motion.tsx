"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "./lab.module.css";

// V2's scoped enhancement lifecycle. Native scrolling and route navigation stay intact.
export function LabMotion({ children }: { children: ReactNode }) {
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
        gsap.fromTo(element.querySelector("[data-route-line]"), { scaleX: 0 }, { scaleX: 1, duration: .35, ease: "power3.out" });
        element.querySelectorAll<HTMLElement>("[data-lab-rule]").forEach(section => {
          gsap.fromTo(section, { "--rule": 0 }, { "--rule": 1, duration: .5, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 80%", once: true } });
        });
      }, element);
      await document.fonts.ready;
      if (!disposed) ScrollTrigger.refresh();
    }
    void enhance().catch(() => revert?.());
    return () => { disposed = true; revert?.(); };
  }, [pathname]);
  return <div ref={root}><div className={styles.routeLine} data-route-line aria-hidden="true" />{children}</div>;
}
