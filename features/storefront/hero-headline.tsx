"use client";

import { useRef } from "react";
import styles from "./storefront.module.css";

export function HeroHeadline({ lines }: { lines: readonly string[] }) {
  const button = useRef<HTMLButtonElement>(null);
  function align() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    button.current?.querySelectorAll<HTMLElement>("[data-ink]").forEach((layer, index) => {
      layer.getAnimations().forEach(animation => animation.cancel());
      layer.animate([
        { transform: `translate(${index % 2 ? 7 : -7}px, 2px)`, opacity: .5 },
        { transform: "translate(0, 0)", opacity: 0 },
      ], { duration: 650, easing: "cubic-bezier(.16,1,.3,1)" });
    });
  }
  return <h1 id="campaign-title"><button ref={button} className={styles.printHeadline} type="button" onPointerEnter={align} onFocus={align} onClick={align} aria-label={`${lines.join(" ")} — align the print`}>
    {lines.map(line => <span className={styles.inkLine} key={line}>{line}<i data-ink aria-hidden="true">{line}</i></span>)}
  </button></h1>;
}
