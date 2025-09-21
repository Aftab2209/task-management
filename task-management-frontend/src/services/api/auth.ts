import { apiClient } from "./client"
import type { LoginCredentials, RegisterCredentials, AuthResponse, User } from "../../types"

export const authService = {
  
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/api/auth/login", credentials)
    if (response.data) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response.data!
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/api/auth/register", credentials)
    if (response.data) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response.data!
  },

  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>("/api/auth/profile")
    return response.data!
  },

  logout(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  },

  getStoredToken(): string | null {
    return localStorage.getItem("token")
  },

  isAuthenticated(): boolean {
    return !!this.getStoredToken()
  },
}
