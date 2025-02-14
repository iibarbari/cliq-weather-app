"use client";

import { useContext } from 'react';
import FormGroupContext from '@/contexts/FormGroupContext';

export default function useFormGroup() {
  const values = useContext(FormGroupContext);

  if (!values) {
    throw new Error('useFormGroup must be used within a FormGroupContext.Provider');
  }

  return values;
}
