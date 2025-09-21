"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../../components/layout/Layout"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card"
import { TaskForm } from "../../components/tasks/TaskForm"
import { useTaskStore } from "../../store/taskStore"
import type { CreateTaskData } from "../../types"

export const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate()
  const { createTask, isLoading, error } = useTaskStore()

  const handleSubmit = async (data: CreateTaskData) => {
    try {
      await createTask(data)
      navigate("/tasks")
    } catch (err) {
      // Error is handled by the store
    }
  }

  const handleCancel = () => {
    navigate("/tasks")
  }

  return (
    <Layout title="Create New Task">
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0 rounded-xl bg-white">
            <CardHeader className="rounded-t-xl border-b border-gray-100">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gray-100 rounded-xl">
                  <svg 
                    className="w-6 h-6 text-gray-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold text-gray-800">Create New Task</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Fill in the details to create a new task</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center space-x-3">
                  <svg 
                    className="w-5 h-5 text-red-500 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              
              <TaskForm 
                onSubmit={handleSubmit} 
                onCancel={handleCancel} 
                isLoading={isLoading} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}