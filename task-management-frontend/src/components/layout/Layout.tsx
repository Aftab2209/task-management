import type React from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

interface LayoutProps {
  children: React.ReactNode
  title: string
  headerActions?: React.ReactNode
  onSearch?: (query: string) => void
}

export const Layout: React.FC<LayoutProps> = ({ children, title, headerActions, onSearch = () => {} }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onSearch={onSearch} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0 ml-0">
        <Header title={title}>{headerActions}</Header>
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 ">{children}</div>
        </main>
      </div>
    </div>
  )
}
