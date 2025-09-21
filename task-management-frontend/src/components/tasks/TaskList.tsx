"use client"

import type React from "react"
import { TaskCard } from "./TaskCard"
import { LoadingSpinner } from "../common/LoadingSpinner"
import type { Task } from "../../types"

interface TaskListProps {
  tasks: Task[]
  isLoading: boolean
  onMarkCompleted: (id: string) => void
  onDelete: (id: string) => void
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading, onMarkCompleted, onDelete }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-500">Try adjusting your filters or create a new task.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task, index) => (
        <TaskCard key={task.id} task={task} index={index} onMarkCompleted={onMarkCompleted} onDelete={onDelete} />
      ))}
    </div>
  )
}
