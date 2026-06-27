import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  error?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  error,
  className = "",
  ...rest
}) => (
  <div className={className}>
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label} <span className="text-red-500">*</span>
    </label>
    <textarea
      id={name}
      name={name}
      {...rest}
      className={`w-full p-2 bg-gray-100 focus:outline-none rounded-sm ${
        error ? "border border-red-500" : ""
      }`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export default Textarea;
