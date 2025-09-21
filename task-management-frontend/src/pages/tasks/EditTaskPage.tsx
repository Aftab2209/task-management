"use client"

import type React from "react"
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Layout } from "../../components/layout/Layout"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card"
import { TaskForm } from "../../components/tasks/TaskForm"
import { LoadingSpinner } from "../../components/common/LoadingSpinner"
import { useTaskStore } from "../../store/taskStore"
import type { UpdateTaskData } from "../../types"

export const EditTaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentTask, isLoading, error, fetchTask, updateTask } = useTaskStore()

  useEffect(() => {
    if (id) {
      fetchTask(id)
    }
  }, [id, fetchTask])

  const handleSubmit = async (data: UpdateTaskData) => {
    if (currentTask) {
      try {
        await updateTask(currentTask.id, data)
        navigate(`/tasks/${currentTask.id}`)
      } catch (err) {
        // Error is handled by the store
      }
    }
  }

  const handleCancel = () => {
    if (currentTask) {
      navigate(`/tasks/${currentTask.id}`)
    } else {
      navigate("/tasks")
    }
  }

  if (isLoading && !currentTask) {
    return (
      <Layout title="Edit Task">
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    )
  }

  if (!currentTask) {
    return (
      <Layout title="Task Not Found">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Task not found</h2>
          <p className="text-gray-600">The task you're trying to edit doesn't exist or has been deleted.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`Edit: ${currentTask.title}`}>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Task</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">{error}</div>}
            <TaskForm task={currentTask} onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
