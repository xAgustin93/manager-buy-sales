import { SignIn } from "@clerk/nextjs";
import styles from "./Login.module.scss";

export function Login() {
  return (
    <div className={styles.container}>
      <SignIn
        routing="hash"
        appearance={{ elements: { footerAction: { display: "none" } } }}
      />
    </div>
  );
}
