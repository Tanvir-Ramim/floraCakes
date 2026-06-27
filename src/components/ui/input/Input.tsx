import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
  value?: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  onValueChange?: (value: string) => void;
  error?: string | undefined;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  placeholder,
  required,
  register,
  onValueChange,
  type = "text",
  className = "",
  error,
  ...rest
}) => {
  const inputProps = register
    ? { ...register(name, { required }) } // When using react-hook-form
    : {
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          onValueChange?.(e.target.value),
      }; // When using onChange manually

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        aria-label={label}
        {...inputProps}
        {...rest}
        className={`w-full p-2 bg-gray-100 focus:outline-none text-sm rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
