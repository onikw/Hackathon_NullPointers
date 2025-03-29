import * as React from "react";
interface FormInput {
  carAmount?: string;
  usageAmount?: string;
  sourcePower: string

}
interface InputProps {
  input: FormInput;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  title: string;
  name: string;
}

export default function InputComponent({input, handleInput, disabled, title, name}: InputProps) {
  return (
    <>
      <div className="mb-5">
        <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
        <input type="text" id="base-input" name={name} value={input[{name}]} disabled={disabled}
               className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               onChange={handleInput}
        />
      </div>
    </>
  )
}