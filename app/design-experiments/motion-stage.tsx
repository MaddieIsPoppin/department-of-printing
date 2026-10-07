"use client";

import { useEffect, useRef, type ReactNode } from "react";

// This boundary enhances server-rendered content; it never owns shopping state.
export function MotionStage({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;

    async function enhance() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"), import("gsap/ScrollTrigger"),
      ]);
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const element = root.current;
      const media = gsap.matchMedia();
      revert = () => media.revert();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo("[data-collection-surface]", { "--paper-progress": "0%" }, {
          "--paper-progress": "100%", ease: "none",
          scrollTrigger: { trigger: element.querySelector("[data-collection-surface]"), start: "top top", end: "+=450", scrub: 0.15 },
        });
        const technical = element.querySelector("[data-technical]");
        gsap.fromTo(technical, { backgroundColor: "#eeece5", color: "#252622" }, {
          backgroundColor: "#252622", color: "#eeece5", ease: "none",
          scrollTrigger: { trigger: technical, start: "top 90%", end: "top 20%", scrub: 0.15 },
        });
      }, element);

      media.add("(min-width: 900px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)", () => {
        const story = element.querySelector<HTMLElement>("[data-story]")!;

        story.dataset.motion = "true";

        const sequence = gsap.timeline({
          scrollTrigger: { trigger: element.querySelector("[data-story]"), start: "top top", end: "bottom bottom", scrub: 0.15 },
        });
        const canvas = '[data-traveller="canvas"]';
        const design = '[data-traveller="design"]';
        const finished = '[data-traveller="finished"]';
        gsap.set('[data-frame]:not([data-frame="0"])', { autoAlpha: 0 });
        gsap.set(canvas, { xPercent: 0 });
        gsap.set(design, { xPercent: -38, scale: 0.9, autoAlpha: 0 });
        gsap.set(finished, { xPercent: 38, scale: 0.9, autoAlpha: 0 });
        // Subjects hold their place. Only a change of process state moves them.
        sequence.to(canvas, { autoAlpha: 0, duration: 0.3 }, 0)
          .to('[data-frame="0"]', { autoAlpha: 0, duration: 0.2 }, 0)
          .fromTo(design, { xPercent: -46 }, { autoAlpha: 1, xPercent: -38, duration: 0.4, ease: "power2.out" }, 0.1)
          .to('[data-frame="1"]', { autoAlpha: 1, duration: 0.25 }, 0.15)
          .to(design, { scale: 1.3, duration: 0.45, ease: "power2.inOut" }, 0.8)
          .to('[data-frame="1"]', { autoAlpha: 0, duration: 0.2 }, 0.85)
          .to('[data-frame="2"]', { autoAlpha: 1, duration: 0.25 }, 1.05)
          .to(design, { autoAlpha: 0, duration: 0.3 }, 1.6)
          .to('[data-frame="2"]', { autoAlpha: 0, duration: 0.2 }, 1.6)
          .to(finished, { autoAlpha: 1, duration: 0.35 }, 1.75)
          .to('[data-frame="3"]', { autoAlpha: 1, duration: 0.25 }, 1.8);
        return () => { delete story.dataset.motion; };
      }, element);

      // Font metrics can change the scroll geometry after hydration.
      await document.fonts.ready;
      if (!disposed) ScrollTrigger.refresh();
    }

    // The complete static composition remains usable if enhancement fails.
    void enhance().catch((error: unknown) => {
      revert?.();
      console.error("Design exploration motion could not initialise", error);
    });
    return () => { disposed = true; revert?.(); };
  }, []);

  return <div ref={root} className={className}>{children}</div>;
}
