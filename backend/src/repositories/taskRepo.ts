// src/repositories/taskRepository.ts
import { PrismaClient } from '@prisma/client';
import { Task } from '../models/Task';

const prisma = new PrismaClient();

export class TaskRepository {
  async findAll(userId: number): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: { userId }
    });

    return tasks.map(task => new Task(task.id, task.title, task.description, task.status, task.userId));
  }
  
  async create(taskData: { title: string, description: string, status: string, userId: number }): Promise<Task> {
    const task = await prisma.task.create({
      data: taskData
    });

    return new Task(task.id, task.title, task.description, task.status, task.userId);
  }

  async update(id: number, taskData: { title?: string, description?: string, status?: string }): Promise<Task> {
    const task = await prisma.task.update({
      where: { id },
      data: taskData
    });

    return new Task(task.id, task.title, task.description, task.status, task.userId);
  }

  async delete(id: number): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }
}
