export const Priority = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
} as const;

export type Priority = typeof Priority[keyof typeof Priority];


export const Category = {
  WORK: "WORK",
  PERSONAL: "PERSONAL",
  SHOPPING: "SHOPPING",
  OTHER: "OTHER",
} as const;

export type Category = keyof typeof Category;


export const Status = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
} as const;

export type Status = typeof Status[keyof typeof Status];


export interface Task {
  id: string
  title: string
  description?: string
  priority: Priority
  category: Category
  status: Status
  dueDate?: string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface CreateTaskData {
  title: string
  description?: string
  priority: Priority
  category: Category
  dueDate?: string
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  status?: Status
}

export interface TaskFilters {
  status?: Status
  limit ?: number
  priority?: Priority
  category?: Category
  search?: string
  sortBy?: "createdAt" | "dueDate" | "priority" | "title"
  sortOrder?: "asc" | "desc"
}

export interface TaskStats {
  total: number
  completed: number
  pending: number
  inProgress: number
  overdue: number
  byPriority: {
    high: number
    medium: number
    low: number
  }
  byCategory: {
    work: number
    personal: number
    shopping: number
    other: number
  }
}
