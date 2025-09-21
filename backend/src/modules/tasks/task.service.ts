import { prisma } from "../../config/db";
import { CreateTaskDto, UpdateTaskDto } from "./task.types";
import { Prisma, Task } from "@prisma/client";
import { Priority, Category, Status } from "@prisma/client";

export async function createTask(userId: string, dto: CreateTaskDto): Promise<Task> {
  return prisma.task.create({
    data: {
      ...dto,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      user: { connect: { id: userId } },
    },
  });
}

export async function getTasks(userId: string, filters: any) {
  const where: Prisma.TaskWhereInput = { userId };

  if (filters.status) where.status = filters.status;
  if (filters.priority) where.priority = filters.priority;
  if (filters.category) where.category = filters.category;
  if (filters.search) where.title = { contains: filters.search, mode: "insensitive" };
  if (filters.overdue === "true") {
    where.dueDate = { lt: new Date() };
    where.status = { not: "COMPLETED" };
  }

const orderBy: any = filters.sortBy
  ? filters.sortBy === 'priority'
    ? {
        priority: filters.sortOrder === 'desc' ? 'asc' : 'desc'  
      }
    : { [filters.sortBy]: (filters.sortOrder || "desc") as Prisma.SortOrder }
  : { createdAt: "desc" };
  const page = Math.max(Number(filters.page) || 1, 1);
  const perPage = Math.min(Number(filters.perPage) || 20, 100);

  const [total, tasks] = await Promise.all([
    prisma.task.count({ where }),
    prisma.task.findMany({
      where,
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    }),
  ]);

  return { total, page, perPage, tasks };
}


export async function getTaskById(userId: string, id: string): Promise<Task | null> {
  return prisma.task.findFirst({ where: { id, userId } });
}

export async function updateTask(userId: string, id: string, dto: UpdateTaskDto) {
  const data: {
    title?: string;
    description?: string;
    priority?: Priority;
    category?: Category;
    status?: Status;
    dueDate?: Date | null;
  } = {};

  if (dto.title !== undefined) data.title = dto.title;
  if (dto.description !== undefined) data.description = dto.description;
  if (dto.priority !== undefined) data.priority = dto.priority;
  if (dto.category !== undefined) data.category = dto.category;
  if (dto.status !== undefined) data.status = dto.status;


  if (dto.dueDate === null) data.dueDate = null;
  else if (dto.dueDate) data.dueDate = new Date(dto.dueDate);

  return prisma.task.updateMany({
    where: { id, userId },
    data,
  });
}





export async function deleteTask(userId: string, id: string) {
  return prisma.task.deleteMany({ where: { id, userId } });
}


export async function getStats(userId: string) {
  const total = await prisma.task.count({ where: { userId } });
  const completed = await prisma.task.count({ where: { userId, status: "COMPLETED" } });
  const pending = await prisma.task.count({ where: { userId, status: "PENDING" } });

  const byPriority = await prisma.task.groupBy({
    by: ["priority"],
    where: { userId },
    _count: { _all: true },
  });

  const byCategory = await prisma.task.groupBy({
    by: ["category"],
    where: { userId },
    _count: { _all: true },
  });

  return { total, completed, pending, byPriority, byCategory };
}
