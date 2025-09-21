"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ErrorBoundary } from "./components/common/ErrorBoundary"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import { useAuth } from "./hooks/useAuth"

import { LoginPage } from "./pages/auth/LoginPage"
import { RegisterPage } from "./pages/auth/RegisterPage"
import { DashboardPage } from "./pages/dashboard/DashboardPage"
import { TasksPage } from "./pages/tasks/TasksPage"
import { TaskDetailsPage } from "./pages/tasks/TaskDetailsPage"
import { CreateTaskPage } from "./pages/tasks/CreateTaskPage"
import { EditTaskPage } from "./pages/tasks/EditTaskPage"
import { ProfilePage } from "./pages/profile/ProfilePage"
import { NotFoundPage } from "./pages/NotFoundPage"

function App() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Router>
        <Routes>

          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
          />

  
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
          <Route path="/tasks/create" element={<ProtectedRoute><CreateTaskPage /></ProtectedRoute>} />
          <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetailsPage /></ProtectedRoute>} />
          <Route path="/tasks/:id/edit" element={<ProtectedRoute><EditTaskPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
          />

      
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App