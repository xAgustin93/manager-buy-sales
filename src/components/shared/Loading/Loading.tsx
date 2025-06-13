import { LoaderCircle } from "lucide-react";
import { LoadingProps } from "./Loading.types";
import { cn } from "@/lib";
import styles from "./Loading.module.scss";

export function Loading(props: LoadingProps) {
  const { full } = props;

  return (
    <div className={cn(styles.content, full && styles.fullContent)}>
      <LoaderCircle className={styles.spinner} />
      <p>Cargando</p>
    </div>
  );
}
