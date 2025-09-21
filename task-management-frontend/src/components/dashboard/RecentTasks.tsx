"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card"
import { Button } from "../ui/Button"
import type { Task } from "../../types"
import { useEffect } from "react"
import { TaskCard } from "../tasks/TaskCard"
interface RecentTasksProps {
  tasks: Task[]
  isLoading: boolean
  onMarkCompleted: (id: string) => void
  onDelete: (id: string) => void
}

export const RecentTasks: React.FC<RecentTasksProps> = ({
  tasks,
  isLoading,
  onMarkCompleted,
  onDelete,
}) => {
  useEffect(() => {
    console.log("RecentTasks mounted:", tasks)
  }, [tasks])

  const recentTasks = tasks?.slice(0, 3) || []

  if (isLoading) {
    return (
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-xl shadow-sm border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Tasks</CardTitle>
          <Link to="/tasks">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
            >
              View all →
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {recentTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first task</p>
            <Link to="/tasks/create">
              <Button className="rounded-xl px-6">Create your first task</Button>
            </Link>
          </div>
        ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {recentTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onMarkCompleted={onMarkCompleted}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
