"use client"

import type React from "react"
import { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Layout } from "../../components/layout/Layout"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { LoadingSpinner } from "../../components/common/LoadingSpinner"
import { useTaskStore } from "../../store/taskStore"
import { formatDate, formatDateTime, isOverdue } from "../../utils/formatters"
import { PRIORITY_COLORS, STATUS_COLORS } from "../../utils/constants"

export const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentTask, isLoading, fetchTask, markTaskCompleted, deleteTask } = useTaskStore()

  useEffect(() => {
    if (id) {
      fetchTask(id)
    }
  }, [id, fetchTask])

  const handleMarkCompleted = async () => {
    if (currentTask) {
      await markTaskCompleted(currentTask.id)
      fetchTask(currentTask.id) // Refresh task data
    }
  }

  const handleDelete = async () => {
    if (currentTask && window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(currentTask.id)
      navigate("/tasks")
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-50 text-red-700'
      case 'MEDIUM':
        return 'bg-yellow-50 text-yellow-700'
      case 'LOW':
        return 'bg-green-50 text-green-700'
      default:
        return 'bg-gray-50 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-50 text-green-700'
      case 'IN_PROGRESS':
        return 'bg-blue-50 text-blue-700'
      default:
        return 'bg-gray-50 text-gray-700'
    }
  }

  if (isLoading) {
    return (
      <Layout title="Task Details">
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600">Loading task details...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!currentTask) {
    return (
      <Layout title="Task Not Found">
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.488.901-6.077 2.378l-.07.071A7.96 7.96 0 014 12.015c0-4.4 3.6-8.015 8-8.015s8 3.615 8 8.015a7.96 7.96 0 01-1.853 5.364l-.07-.07z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Task not found</h2>
            <p className="text-gray-600 mb-6">The task you're looking for doesn't exist or has been deleted.</p>
            <Link to="/tasks">
              <Button className="rounded-xl px-6">← Back to Tasks</Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  const isTaskOverdue = currentTask.dueDate && isOverdue(currentTask.dueDate)

  const headerActions = (
    <div className="flex items-center space-x-2">
      {currentTask.status !== "COMPLETED" && (
        <Button 
          variant="outline" 
          onClick={handleMarkCompleted}
          size="sm"
          className="rounded-lg"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Complete
        </Button>
      )}
      <Link to={`/tasks/${currentTask.id}/edit`}>
        <Button 
          variant="outline"
          size="sm"
          className="rounded-lg"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </Button>
      </Link>
      <Button 
        variant="outline" 
        onClick={handleDelete}
        size="sm" 
        className="rounded-lg text-red-600 hover:text-red-700"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Delete
      </Button>
    </div>
  )

  return (
    <Layout title={currentTask.title} headerActions={headerActions}>
      <div className="max-w-3xl mx-auto py-6 px-4">
        <div className="space-y-6">
          {/* Main Task Card */}
          <Card className="rounded-xl border shadow-sm">
            <CardHeader className="pb-4">
              <div className="space-y-3">
                <CardTitle className="text-xl font-semibold">{currentTask.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(currentTask.priority)}`}>
                    {currentTask.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(currentTask.status)}`}>
                    {currentTask.status?.replace("_", " ")}
                  </span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                    {currentTask.category}
                  </span>
                  {isTaskOverdue && (
                    <span className="px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700">
                      Overdue
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 space-y-4">
              {currentTask.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{currentTask.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Details</h4>
                  <dl className="space-y-1">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Priority</dt>
                      <dd className="font-medium">{currentTask.priority}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Category</dt>
                      <dd className="font-medium">{currentTask.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Status</dt>
                      <dd className="font-medium">{currentTask.status?.replace("_", " ")}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Dates</h4>
                  <dl className="space-y-1">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Created</dt>
                      <dd className="font-medium">{formatDate(currentTask.createdAt)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Updated</dt>
                      <dd className="font-medium">{formatDate(currentTask.updatedAt)}</dd>
                    </div>
                    {currentTask.dueDate && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Due</dt>
                        <dd className={`font-medium ${isTaskOverdue ? "text-red-600" : ""}`}>
                          {formatDate(currentTask.dueDate)}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Link to="/tasks">
              <Button variant="outline" className="rounded-lg">
                ← Back to Tasks
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}