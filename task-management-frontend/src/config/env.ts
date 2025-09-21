export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000",
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
} as const;
