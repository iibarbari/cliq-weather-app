"use client";

import { JSX, PropsWithoutRef } from 'react';
import classNames from 'classnames';
import styles from "./Label.module.css";
import useFormGroup from '@/hooks/useFormGroup';

type LabelProps = Omit<PropsWithoutRef<JSX.IntrinsicElements["label"]>, "htmlFor">;

export default function Label({ className, ...props }: LabelProps) {
  const { id } = useFormGroup();

  return (
    <label {...props} className={classNames(styles.label, className)} htmlFor={id} />
  );
}
