import { apiClient } from "./client"
import type { Task, CreateTaskData, UpdateTaskData, TaskFilters, TaskStats, PaginatedResponse } from "../../types"

export const taskService = {
  async getTasks(filters?: TaskFilters): Promise<PaginatedResponse<Task>> {
    const response = await apiClient.get<PaginatedResponse<Task>>("/api/tasks", filters)
    console.log(response.data, 'dart')
    return response.data!
  },

  async getTask(id: string): Promise<Task> {
    const response = await apiClient.get<Task>(`/api/tasks/${id}`)
    return response.data!
  },

  async createTask(data: CreateTaskData): Promise<Task> {
    const response = await apiClient.post<Task>("/api/tasks", data)
    return response.data!
  },

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    const response = await apiClient.put<Task>(`/api/tasks/${id}`, data)
    return response.data!
  },

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/api/tasks/${id}`)
  },

  async getTaskStats(): Promise<TaskStats> {
    const response = await apiClient.get<TaskStats>("/api/tasks/stats")
    return response.data!
  },

  async markTaskCompleted(id: string): Promise<Task> {
    const response = await apiClient.put<Task>(`/api/tasks/${id}`, { status: "COMPLETED" })
    return response.data!
  },
}
