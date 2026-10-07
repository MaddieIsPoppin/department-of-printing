"use client";

import { useState, type ReactNode } from "react";
import type { GarmentStudy } from "./garment-studies";
import base from "./experiment.module.css";
import styles from "./garment-explorer.module.css";

export function GarmentExplorer({ studies }: { studies: readonly (GarmentStudy & { image: ReactNode })[] }) {
  const [selected, setSelected] = useState(studies[0].id);
  const current = studies.find(study => study.id === selected) ?? studies[0];

  return <section id="technical" className={styles.explorer} data-technical aria-labelledby="technical-title">
    <div className={styles.heading}><p className={base.meta}>02 / FIND YOUR FORM</p><h2 id="technical-title">NOT JUST<br />A BLANK.</h2><p className={base.body}>Different shapes for different ideas.<br />Choose a form. Look a little closer.</p></div>
    <div className={styles.categories} role="group" aria-label="Explore garment categories">
      {studies.map(study => <button key={study.id} type="button" aria-pressed={selected === study.id} aria-controls="garment-inspection" onClick={() => setSelected(study.id)}>{study.category}<span aria-hidden="true">↗</span></button>)}
    </div>
    <div id="garment-inspection" className={styles.inspection}>
      <div className={styles.object} data-category={selected}>
        {studies.map(study => <div key={study.id} className={styles.render} data-active={study.id === selected} aria-hidden={study.id !== selected}>{study.image}</div>)}
        <span className={styles.registration} aria-hidden="true">+</span>
      </div>
      <div className={styles.information} aria-live="polite" aria-atomic="true">
        <p className={base.meta}>FORM / {current.category}</p><h3>{current.name}</h3><p className={base.body}>{current.description}</p>
        <dl>{current.details.map(detail => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl>
        <a href="#mini-lab" className={base.textLink}>TRY AN IDEA IN THE LAB ↗</a>
      </div>
    </div>
    <p className={styles.note}>Finished renders shown as form studies. Fabric, fit, print methods and available colour ranges will be confirmed with the supplier.</p>
  </section>;
}
