import * as React from "react";

interface FormInput {
  carAmount?: string;
  usageAmount?: string;
  sourcePower: string;
}

interface InputProps {
  input: FormInput;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  title: string;
  name: string;
}

export default function InputComponent({ input, handleInput, disabled, title, name }: InputProps) {
  return (
    <>
      <div className="mb-5">
        <label htmlFor="base-input" className="block mb-2 text-sm font-medium ">{title}</label>
        <input
          type="text"
          id="base-input"
          name={name}
          value={input[name]}
          disabled={disabled}
          className={`block w-full p-4 text-white border-2 border-gray-500 rounded-lg  text-base focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 ${disabled ? 'bg-gray-600' : 'bg-gray-800'}`}
          onChange={handleInput}
          autoComplete={"off"}
        />
      </div>
    </>
  );
}