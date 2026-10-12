import styles from "./storefront.module.css";

// V2's four-corner print frame, shared by the V3 media stages.
export function RegistrationFrame({ label }: { label: string }) {
  return <div className={styles.registrationFrame} aria-hidden="true"><i /><i /><i /><i /><span>{label}</span><small>+ / D/P</small></div>;
}
