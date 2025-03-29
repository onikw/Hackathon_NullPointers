import { FormInput, useFormContext } from "../contexts/FormContext.tsx";

interface InputProps {
  disabled: boolean;
  title: string;
  name: keyof FormInput;
}

export default function InputComponent({ disabled, title, name }: InputProps) {
  const { input, handleInput } = useFormContext();

  return (
    <div className="mb-5">
      <label htmlFor={`input-${name}`} className="block mb-2 text-sm font-medium">{title}</label>
      <input
        type="text"
        id={`input-${name}`}
        name={name}
        value={input[name] || ""}
        disabled={disabled}
        className={`block w-full p-4 text-white border-2 border-gray-500 rounded-lg text-base focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 ${disabled ? 'bg-gray-600' : 'bg-gray-800'}`}
        onChange={handleInput}
        autoComplete="off"
      />
    </div>
  );
}