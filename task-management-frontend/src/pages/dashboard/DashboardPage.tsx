"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Layout } from "../../components/layout/Layout"
import { StatsCards } from "../../components/dashboard/StatsCards"
import { QuickActions } from "../../components/dashboard/QuickActions"
import { RecentTasks } from "../../components/dashboard/RecentTasks"
import { useTaskStore } from "../../store/taskStore"

export const DashboardPage: React.FC = () => {
  const { tasks, stats, isLoading, fetchTasks, fetchTaskStats, markTaskCompleted, deleteTask } = useTaskStore()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchTasks({ limit: 10, sortBy: "createdAt", sortOrder: "desc" })
    fetchTaskStats()
  }, [fetchTasks, fetchTaskStats])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      fetchTasks({ search: query, limit: 10 })
    } else {
      ({ limit: 10, sortBy: "createdAt", sortOrder: "desc" })
    }
  }

  const handleMarkCompleted = async (id: string) => {
    await markTaskCompleted(id)
    fetchTaskStats()
    fetchTasks()
  }

    const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id)
    }
  }

  return (
    <Layout title="Dashboard" onSearch={handleSearch}>
      <div className="space-y-8">

        <StatsCards stats={stats} isLoading={isLoading} />

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <QuickActions />
        </div>

        <RecentTasks tasks={tasks} isLoading={isLoading} onMarkCompleted={handleMarkCompleted}  onDelete={handleDelete} />
      </div>
    </Layout>
  )
}
