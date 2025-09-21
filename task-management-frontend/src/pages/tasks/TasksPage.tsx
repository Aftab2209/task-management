"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Layout } from "../../components/layout/Layout"
import { TaskList } from "../../components/tasks/TaskList"
import { TaskFilters } from "../../components/tasks/TaskFilters"
import { Button } from "../../components/ui/Button"
import { useTaskStore } from "../../store/taskStore"
import type { Category, Priority, Status, TaskFilters as TaskFiltersType } from "../../types"

export const TasksPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { tasks, isLoading, fetchTasks, markTaskCompleted, deleteTask } = useTaskStore()
  const [filters, setFilters] = useState<TaskFiltersType>({
    status: searchParams.get("status") as Status || undefined,
    priority: searchParams.get("priority") as Priority || undefined,
    category: searchParams.get("category") as Category|| undefined,
    sortBy: (searchParams.get("sortBy") as any) || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as any) || "desc",
  })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const queryFilters = { ...filters }
    if (searchQuery.trim()) {
      queryFilters.search = searchQuery
    }
    fetchTasks(queryFilters)
  }, [filters, searchQuery, fetchTasks])

  const handleFiltersChange = (newFilters: TaskFiltersType) => {
    setFilters(newFilters)


    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString())
      }
    })
    setSearchParams(params)
  }

  const handleClearFilters = () => {
    const clearedFilters: TaskFiltersType = {
      sortBy: "createdAt",
      sortOrder: "desc",
    }
    setFilters(clearedFilters)
    setSearchParams({})
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleMarkCompleted = async (id: string) => {
    await markTaskCompleted(id)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id)
    }
  }

  const headerActions = (
    <Link to="/tasks/create">
      <Button>
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        New Task
      </Button>
    </Link>
  )

  return (
    <Layout title="Tasks" headerActions={headerActions} onSearch={handleSearch}>
      <div className="space-y-6">
        <TaskFilters filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={handleClearFilters} />
        <TaskList tasks={tasks} isLoading={isLoading} onMarkCompleted={handleMarkCompleted} onDelete={handleDelete} />
      </div>
    </Layout>
  )
}
