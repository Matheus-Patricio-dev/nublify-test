// src/services/taskService.ts
import { TaskRepository } from '../repositories/taskRepo';
import { Task } from '../models/Task';

const taskRepository = new TaskRepository();

export class TaskService {
  async getTasks(userId: number): Promise<Task[]> {
    return await taskRepository.findAll(userId);
  }

  async createTask(taskData: { title: string, description: string, status: string, userId: number }): Promise<Task> {
    return await taskRepository.create(taskData);
  }

  async updateTask(id: number, taskData: { title?: string, description?: string, status?: string }): Promise<Task> {
    return await taskRepository.update(id, taskData);
  }

  async deleteTask(id: number): Promise<void> {
    await taskRepository.delete(id);
  }
}
