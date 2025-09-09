import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

// Controller para registro de usuário
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    const newUser = await userService.register(name, email, password);
    return res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

// Controller para login de usuário
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const { user, token } = await userService.login(email, password);
    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    return res.json(users); // retorna lista de usuários
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
