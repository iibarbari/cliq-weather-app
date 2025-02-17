import styles from "./Loader.module.css";
import { JSX, PropsWithoutRef } from "react";
import classNames from "classnames";

export type LoaderProps = Overwrite<PropsWithoutRef<JSX.IntrinsicElements["div"]>, {
  color?: "default" | "primary";
}>;

export default function Loader({ className, color = "default", role = "status", ...props }: LoaderProps) {
  return (
    <div {...props} className={classNames(styles.loader, styles[color], className)} role={role}>
      <span className={styles.sr_only}>Loading...</span>
    </div>
  );
}
