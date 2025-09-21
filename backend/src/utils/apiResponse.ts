export function successResponse<T>(data: T, message = "Success") {
  return { success: true, message, data };
}

export function errorResponse(message = "Error", errors: any = null) {
  return { success: false, message, errors };
}
