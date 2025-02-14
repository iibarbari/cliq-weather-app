import { JSX, PropsWithoutRef } from 'react';
import classNames from 'classnames';
import styles from "./Container.module.css";

type ContainerProps = PropsWithoutRef<JSX.IntrinsicElements["div"]>;

export default function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={classNames(styles.container, className)}
    />
  );
}
