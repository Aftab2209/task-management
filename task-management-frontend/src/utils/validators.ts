export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 6
}

export const validateTaskTitle = (title: string): boolean => {
  return title.trim().length > 0 && title.length <= 100
}

export const validateTaskDescription = (description: string): boolean => {
  return description.length <= 500
}
