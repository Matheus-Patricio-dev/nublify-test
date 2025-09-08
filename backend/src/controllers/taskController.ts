// src/controllers/taskController.ts
import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';

const taskService = new TaskService();

export const getTasks = async (req: Request, res: Response) => {
  const userId = req.user?.id; // Obtido via middleware de autenticação
  if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

  try {
    const tasks = await taskService.getTasks(userId);
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

  const { title, description, status } = req.body;

  try {
    const task = await taskService.createTask({ title, description, status, userId });
    console.log(task)
    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar tarefa' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const updatedTask = await taskService.updateTask(userId, { title, description, status });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    return res.json(updatedTask);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao atualizar tarefa' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

  // Certifique-se de que o 'id' está sendo passado como número
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido fornecido.' });
  }

  try {
    await taskService.deleteTask(id);
    return res.status(204).send();  // 204 significa sucesso sem retorno
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao excluir tarefa' });
  }
};
