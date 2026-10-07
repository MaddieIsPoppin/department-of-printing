import { Garment, type GarmentName } from "./garment";
import { story } from "./experiment-data";
import styles from "./experiment.module.css";

const frames: GarmentName[] = ["ratioBlack", "discipline", "discipline", "study"];

function CanvasOptions() {
  return <div className={styles.canvasOptions}>
    {([{ name: "discipline", label: "TEE" }, { name: "ratioBlack", label: "HOODIE" }, { name: "study", label: "SWEAT" }] as const).map(item => <figure key={item.name}><Garment name={item.name} /><figcaption className={styles.meta}>{item.label}</figcaption></figure>)}
  </div>;
}

export function ScrollStory() {
  return <section id="story" className={styles.story} aria-label="From canvas to finished garment" data-story>
    <div className={styles.storyStage}>
      <div className={styles.storyObjects} aria-hidden="true">
        <div className={styles.canvasTraveller} data-traveller="canvas"><CanvasOptions /></div>
        <div className={styles.traveller} data-traveller="design"><Garment name="discipline" eager /></div>
        <div className={styles.traveller} data-traveller="finished"><Garment name="study" eager /></div>
      </div>
      <div className={styles.storySteps}>
        {story.map((step, index) => <article className={`${styles.storyStep} ${styles[`frame${index}`]}`} data-frame={index} key={step.number}>
          <div className={styles.frameCopy}><p className={styles.meta}>{step.number} / THE PROCESS</p><h2>{step.lines.map(line => <span key={line}>{line}</span>)}</h2><p className={styles.body}>{step.body}</p></div>
          <div className={index === 0 ? styles.staticCanvases : styles.staticGarment}>{index === 0 ? <CanvasOptions /> : <Garment name={frames[index]} />}</div>
          <p className={`${styles.meta} ${styles.frameNote}`}>{["TEE / HOODIE / SWEAT / YOUR STARTING POINT", "DISCIPLINE / ARTWORK IN CONTEXT", "BACK PRINT / ILLUSTRATIVE PLACEMENT", "STUDY / AN IDEA, OUT IN THE WORLD"][index]}</p>
        </article>)}
      </div>
      <p className={`${styles.meta} ${styles.storyFootnote}`}>FORM → EXPRESSION → PRINT → EVERYDAY<br />DESIGN RENDERS / NOT PRODUCTION PROOFS</p>
    </div>
  </section>;
}
