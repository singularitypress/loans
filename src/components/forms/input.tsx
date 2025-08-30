import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from "react"

interface Props {
  type?: HTMLInputTypeAttribute
  label: ReactNode
  value?: string | number
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const Input = ({ type, label, value, onChange }: Props) => {
  return (
    <div>
      <label className="block text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      />
    </div>
  )
}