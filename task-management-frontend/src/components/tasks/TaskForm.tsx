"use client"

import type React from "react"
import { useState } from "react"

import type { CreateTaskData, UpdateTaskData, Task, Priority, Category } from "../../types"
import { validateTaskTitle, validateTaskDescription } from "../../utils/validators"

interface TaskFormProps <T extends CreateTaskData | UpdateTaskData>  {
  task?: Task
  onSubmit: (data: T) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export const TaskForm = <T extends CreateTaskData | UpdateTaskData>({  task, onSubmit, onCancel, isLoading = false }: TaskFormProps<T>) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || ("MEDIUM" as Priority),
    category: task?.category || ("WORK" as Category),
    dueDate: task?.dueDate ? task.dueDate.split("T")[0] : "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

 
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    if (!validateTaskTitle(formData.title)) {
      newErrors.title = "Title is required and must be less than 100 characters"
    }

    if (formData.description && !validateTaskDescription(formData.description)) {
      newErrors.description = "Description must be less than 500 characters"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      priority: formData.priority,
      category: formData.category,
      dueDate: formData.dueDate || undefined,
    }as T;

    try {
      await onSubmit(submitData)
    } catch (error) {
 
    }
  }

  const priorityOptions = [
    { value: "HIGH", label: "High" },
    { value: "MEDIUM", label: "Medium" },
    { value: "LOW", label: "Low" },
  ]

  const categoryOptions = [
    { value: "WORK", label: "Work" },
    { value: "PERSONAL", label: "Personal" },
    { value: "SHOPPING", label: "Shopping" },
    { value: "OTHER", label: "Other" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          maxLength={100}
          required
          className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.title 
              ? 'border-red-300 bg-red-50 focus:ring-red-500' 
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
        />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description (optional)"
          maxLength={500}
          rows={4}
          className={`w-full px-4 py-3 rounded-xl border resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.description 
              ? 'border-red-300 bg-red-50 focus:ring-red-500' 
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
        />
        {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
        <p className="text-xs text-gray-500">{formData.description.length}/500 characters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
        <input
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.dueDate && <p className="text-sm text-red-600 mt-1">{errors.dueDate}</p>}
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center space-x-2"
        >
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          <span>{task ? "Update Task" : "Create Task"}</span>
        </button>
      </div>
    </form>
  )
}