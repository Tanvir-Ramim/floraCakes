import React from "react";

interface SelectorProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}
const Selector: React.FC<SelectorProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-1">
      <label className="font-medium block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 bg-gray-100 focus:outline-none text-sm  rounded-md "
      >
        <option value="">-- Select {label} --</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
