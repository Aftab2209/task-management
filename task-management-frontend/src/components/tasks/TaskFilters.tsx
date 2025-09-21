"use client"

import type React from "react"
import { Button } from "../ui/Button"
import type { TaskFilters as TaskFiltersType } from "../../types"

interface TaskFiltersProps {
  filters: TaskFiltersType
  onFiltersChange: (filters: TaskFiltersType) => void
  onClearFilters: () => void
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, onFiltersChange, onClearFilters }) => {
  const handleFilterChange = (key: keyof TaskFiltersType, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value || undefined,
    }
    onFiltersChange(newFilters)
  }

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "PENDING", label: "Pending" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "COMPLETED", label: "Completed" },
  ]

  const priorityOptions = [
    { value: "", label: "All Priorities" },
    { value: "HIGH", label: "High" },
    { value: "MEDIUM", label: "Medium" },
    { value: "LOW", label: "Low" },
  ]

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "WORK", label: "Work" },
    { value: "PERSONAL", label: "Personal" },
    { value: "SHOPPING", label: "Shopping" },
    { value: "OTHER", label: "Other" },
  ]

  const sortByOptions = [
    { value: "createdAt", label: "Created Date" },
    { value: "updatedAt", label: "Updated Date" },
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
    { value: "title", label: "Title" },
    { value: "status", label: "Status" },
  ]

const getSortOrderOptions = (sortBy: string) => {
  switch (sortBy) {
    case 'title':
      return [
        { value: "asc", label: "A to Z" },
        { value: "desc", label: "Z to A" },
      ]
    case 'priority':
      return [
        { value: "desc", label: "High to Low" },
        { value: "asc", label: "Low to High" },
      ]
    case 'createdAt':
    case 'updatedAt':
    case 'dueDate':
      return [
        { value: "desc", label: "Newest First" },
        { value: "asc", label: "Oldest First" },
      ]
    case 'status':
      return [
        { value: "asc", label: "Pending First" },
        { value: "desc", label: "Completed First" },
      ]
    default:
      return [
        { value: "desc", label: "Descending" },
        { value: "asc", label: "Ascending" },
      ]
  }
}

const sortOrderOptions = getSortOrderOptions(filters.sortBy || 'createdAt')

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'sortBy' && value === 'createdAt') return false  
    if (key === 'sortOrder' && value === 'desc') return false  
    return value && value !== ""
  })

  const getActiveFiltersCount = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (key === 'sortBy' && value === 'createdAt') return false
      if (key === 'sortOrder' && value === 'desc') return false
      return value && value !== ""
    }).length
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
 
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Filter & Sort Tasks</h3>
              <p className="text-sm text-gray-600">Customize your task view</p>
            </div>
          </div>
          {hasActiveFilters && (
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {getActiveFiltersCount()} active filter{getActiveFiltersCount() !== 1 ? 's' : ''}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClearFilters}
                className="rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All
              </Button>
            </div>
          )}
        </div>
      </div>

 
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
   
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status || ""}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
 
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={filters.priority || ""}
              onChange={(e) => handleFilterChange("priority", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
 
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category || ""}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

 
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
              <span className="ml-1 text-xs text-gray-500">(Required)</span>
            </label>
            <select
              value={filters.sortBy || "createdAt"}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
            >
              {sortByOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

           <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort Order
              <span className="ml-1 text-xs text-gray-500">(Required)</span>
            </label>
            <select
              value={filters.sortOrder || "desc"}
              onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
            >
              {sortOrderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

 
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Quick Filters:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange("status", "PENDING")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Pending Tasks
                </button>
                <button
                  onClick={() => handleFilterChange("priority", "HIGH")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.priority === "HIGH"
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  High Priority
                </button>
                <button
                  onClick={() => handleFilterChange("status", "COMPLETED")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.status === "COMPLETED"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => {
                    handleFilterChange("sortBy", "dueDate")
                    handleFilterChange("sortOrder", "asc")
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.sortBy === "dueDate" && filters.sortOrder === "asc"
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Due Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}