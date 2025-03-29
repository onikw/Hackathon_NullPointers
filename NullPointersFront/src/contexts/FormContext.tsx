// FormContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

export interface FormInput {
  carAmount?: string;
  usageAmount?: string;
  sourcePower: string;
  energyUsage?: string;
}

interface FormContextType {
  input: FormInput;
  setInput: React.Dispatch<React.SetStateAction<FormInput>>;
  additional: boolean;
  setAdditional: React.Dispatch<React.SetStateAction<boolean>>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [input, setInput] = useState<FormInput>({
    carAmount: "",
    usageAmount: "",
    sourcePower: "",
    energyUsage: ""
  });
  const [additional, setAdditional] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <FormContext.Provider value={{ input, setInput, additional, setAdditional, handleInput }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};