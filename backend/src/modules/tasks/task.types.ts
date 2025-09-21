import { Priority, Category, Status } from "@prisma/client";

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority?: Priority;
  category?: Category;
  dueDate?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  priority?: Priority;
  category?: Category;
  status?: Status;
  dueDate?: string | null;
}
