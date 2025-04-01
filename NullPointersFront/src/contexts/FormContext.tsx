// FormContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

export interface FormInput {
  batteryCapacity: string;
  batteryPercentage: string;
  carAmount: string;
  monthlyUsage: string;
  sourcePower: string;
  solarPower?: string;
  usageAmount: string;
}

interface FormContextType {
  input: FormInput;
  setInput: React.Dispatch<React.SetStateAction<FormInput>>;
  additional: boolean;
  setAdditional: React.Dispatch<React.SetStateAction<boolean>>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  result: any;
  setResult: React.Dispatch<React.SetStateAction<any>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [input, setInput] = useState<FormInput>({
    batteryCapacity: "",
    batteryPercentage: "",
    carAmount: "",
    monthlyUsage: "",
    sourcePower: "",
    solarPower: "",
    usageAmount: ""
  });
  const [additional, setAdditional] = useState<boolean>(false);
  const [result, setResult] = useState({})

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <FormContext.Provider value={{ input, setInput, additional, setAdditional, handleInput, result, setResult }}>
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