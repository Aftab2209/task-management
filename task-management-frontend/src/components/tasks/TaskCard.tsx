"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Calendar, MoreHorizontal } from "lucide-react"
import type { Task } from "../../types"
import { formatDate, isOverdue } from "../../utils/formatters"
import { PRIORITY_COLORS, STATUS_COLORS } from "../../utils/constants"
import { Badge } from "../ui/Badge"
import { useState } from "react"

interface TaskCardProps {
  task: Task
  index: number
  onMarkCompleted: (id: string) => void
  onDelete: (id: string) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index, onMarkCompleted, onDelete }) => {
  const isTaskOverdue = task.dueDate && isOverdue(task.dueDate)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="w-80 min-h-32 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative transition-shadow hover:shadow-md">

      <div className={`h-2 ${PRIORITY_COLORS[task.priority]}`} />

      <div className="p-4 flex flex-col h-full gap-2">

        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1">{task.title}</h3>

          <div className="flex items-center gap-2 relative">
            {task.status === "COMPLETED" && (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            )}


            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded hover:bg-gray-100 transition-colors"
              title="More actions"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </button>


            {menuOpen && (
              <div className="absolute top-6 right-0 bg-white border border-gray-200 rounded-md shadow-md text-sm z-10 w-28">
                <Link
                  to={`/tasks/${task.id}/edit`}
                  className="block px-3 py-2 hover:bg-gray-50"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(task.id)}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>


        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
          {task.description?.trim() ? task.description : "No description available."}
        </p>


        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <Badge className={PRIORITY_COLORS[task.priority]}>{task.priority}</Badge>
          <Badge className={STATUS_COLORS[task?.status]}>{task.status?.replace("_", " ")}</Badge>
          <Badge variant="outline">{task.category}</Badge>
        </div>

        <div className="flex items-center justify-between mt-auto text-xs text-gray-500">
          <div className="flex items-center gap-1">
            {task.dueDate && (
              <>
                <Calendar className="w-3 h-3" />
                <span className={isTaskOverdue ? "text-red-600 font-medium" : ""}>
                  Due: {formatDate(task.dueDate)}
                </span>
              </>
            )}
          </div>
          <div className="text-gray-400">Created: {formatDate(task.createdAt)}</div>
        </div>
      </div>
    </div>
  )
}
