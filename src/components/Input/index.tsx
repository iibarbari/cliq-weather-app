"use client";

import { JSX, PropsWithoutRef } from 'react';
import classNames from 'classnames';
import styles from "./Input.module.css";
import useFormGroup from '@/hooks/useFormGroup';

type InputProps = Omit<PropsWithoutRef<JSX.IntrinsicElements["input"]>, "id">;

export default function Input({ className, ...props }: InputProps) {
  const { id } = useFormGroup();

  return (
    <input {...props} className={classNames(styles.input, className)} id={id} />
  );
}
