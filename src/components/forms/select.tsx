import { ChangeEventHandler, ReactNode } from "react";

interface Props {
  label: ReactNode;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  options: {
    label: string;
    value: string | number;
  }[];
}

export const Select = ({ label, value, onChange, options }: Props) => {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-background"
      >
        {options.map((option) => (
          <option key={`${label} ${value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
