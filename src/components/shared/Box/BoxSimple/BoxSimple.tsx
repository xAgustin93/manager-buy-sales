import { BoxSimpleProps } from "./BoxSimple.types";
import styles from "./BoxSimple.module.scss";

export function BoxSimple(props: BoxSimpleProps) {
  const { title, children } = props;

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
