"use client";

import { createContext } from 'react';

export type FormGroupContextType = {
  id: string;
}

const FormGroupContext = createContext<FormGroupContextType | undefined>(undefined);

export default FormGroupContext;
