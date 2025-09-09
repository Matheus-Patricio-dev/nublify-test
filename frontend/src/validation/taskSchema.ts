import * as yup from 'yup';

// Add Task
export const addTaskSchema = yup.object({
  title: yup.string().min(3, "O título deve conter pelo menos 3 caracteres"),
  description: yup.string().optional()
});