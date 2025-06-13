import { Sidebar, TopBar } from "./components";
import { DashboardLayoutProps } from "./DashboardLayout.types";
import styles from "./DashboardLayout.module.scss";

export function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.body}>
        <TopBar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
