import { JSX, PropsWithoutRef } from 'react';
import classNames from 'classnames';
import styles from "./Section.module.css";

type SectionProps = PropsWithoutRef<JSX.IntrinsicElements["section"]> & {
  dark?: boolean;
};

export default function Section({ className, children, dark, ...props }: SectionProps) {
  return (
    <section {...props} className={classNames(styles.section, dark && styles.dark, className)}>
      {children}
    </section>
  );
}
