"use client";

import { JSX, PropsWithoutRef } from 'react';
import classNames from 'classnames';
import styles from "./FormGroup.module.css";
import FormGroupContext, { FormGroupContextType } from '@/contexts/FormGroupContext';

type FormGroupProps = PropsWithoutRef<JSX.IntrinsicElements["div"]> & FormGroupContextType;

export default function FormGroup({ className, children, id, ...props }: FormGroupProps) {
  return (
    <FormGroupContext.Provider value={{ id }}>
      <div {...props} className={classNames(styles["form-group"], className)}>
        {children}
      </div>
    </FormGroupContext.Provider>
  );
}
