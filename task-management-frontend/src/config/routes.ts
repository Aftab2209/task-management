export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  TASKS: "/tasks",
  TASK_DETAILS: "/tasks/:id",
  CREATE_TASK: "/tasks/create",
  EDIT_TASK: "/tasks/:id/edit",
  PROFILE: "/profile",
} as const

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    PROFILE: "/api/auth/profile",
  },
  TASKS: {
    BASE: "/api/tasks",
    BY_ID: (id: string) => `/api/tasks/${id}`,
    STATS: "/api/tasks/stats",
  },
} as const
