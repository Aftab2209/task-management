import type React from "react"

interface HeaderProps {
  title: string
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {children && <div className="flex items-center space-x-4">{children}</div>}
      </div>
    </div>
  )
}
