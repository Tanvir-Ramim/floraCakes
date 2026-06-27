import React from "react";

interface SelectDropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: string[];
  error?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  name,
  options,
  error,
  ...rest
}) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        id={name}
        name={name}
        {...rest}
        className={`w-full p-2 text-sm border rounded-md focus:outline-none ${
          error ? "border-red-500" : "border-gray-100"
        }`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default SelectDropdown;
