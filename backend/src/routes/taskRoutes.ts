import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController'; 
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Rota para pegar todas as tarefas do usuário autenticado
router.get('/tasks', authenticateToken, getTasks);

// Rota para criar uma nova tarefa
router.post('/tasks', authenticateToken, createTask);

// Rota para atualizar uma tarefa existente
router.put('/tasks/:id', authenticateToken, updateTask);

// Rota para excluir uma tarefa existente
router.delete('/tasks/:id', authenticateToken, deleteTask);


export default router;
