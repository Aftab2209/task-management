import { create } from "zustand"
import type { Task, TaskStats, TaskFilters } from "../types"
import { taskService } from "../services/api/tasks"

interface TaskState {
  tasks: Task[]
  stats: TaskStats | null
  currentTask: Task | null
  isLoading: boolean
  error: string | null
  filters: TaskFilters
}

interface TaskActions {
  fetchTasks: (filters?: TaskFilters) => Promise<void>
  fetchTaskStats: () => Promise<void>
  fetchTask: (id: string) => Promise<void>
  createTask: (data: any) => Promise<Task>
  updateTask: (id: string, data: any) => Promise<Task>
  deleteTask: (id: string) => Promise<void>
  markTaskCompleted: (id: string) => Promise<void>
  setFilters: (filters: TaskFilters) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useTaskStore = create<TaskState & TaskActions>((set, get) => ({
  tasks: [],
  stats: null,
  currentTask: null,
  isLoading: false,
  error: null,
  filters: {},

  fetchTasks: async (filters?: TaskFilters) => {
    set({ isLoading: true, error: null })
    try {
      console.log('Fetching tasks with filters:', filters)

      const response = await taskService.getTasks(filters)
      console.log(response, 'from store')
      set({ tasks: response.tasks, isLoading: false })
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
    }
  },

  fetchTaskStats: async () => {
    try {
      const stats = await taskService.getTaskStats()
      set({ stats })
    } catch (error: any) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: String(error) });
      }
    }
  },

  fetchTask: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const task = await taskService.getTask(id)
      set({ currentTask: task, isLoading: false })
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
    }
  },

  createTask: async (data: any) => {
    set({ isLoading: true, error: null })
    try {
      const task = await taskService.createTask(data)
      const { tasks } = get()
      set({ tasks: [task, ...tasks], isLoading: false })
      return task
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  updateTask: async (id: string, data: any) => {
    set({ isLoading: true, error: null })
    try {
      const updatedTask = await taskService.updateTask(id, data)
      const { tasks } = get()
      const updatedTasks = tasks.map((task) => (task.id === id ? updatedTask : task))
      set({ tasks: updatedTasks, currentTask: updatedTask, isLoading: false })
      return updatedTask
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  deleteTask: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await taskService.deleteTask(id)
      const { tasks } = get()
      const filteredTasks = tasks.filter((task) => task.id !== id)
      set({ tasks: filteredTasks, isLoading: false })
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
    }
  },

  markTaskCompleted: async (id: string) => {
    try {
      const updatedTask = await taskService.markTaskCompleted(id)
      const { tasks } = get()
      const updatedTasks = tasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedTask, createdAt: task.createdAt }
          : task
      )
      set({ tasks: updatedTasks })
    } catch (error: any) {
      set({ error: error.message })
    }
  },

  setFilters: (filters: TaskFilters) => {
    set({ filters })
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading })
  },

  setError: (error: string | null) => {
    set({ error })
  },
}))
