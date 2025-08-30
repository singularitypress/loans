import { MouseEventHandler, ReactNode } from "react"

interface Props {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="w-full flex justify-center py-2 px-4 cursor-pointer transition-all ease-in-out border-2 border-indigo-600 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {children}
    </button>
  )
}