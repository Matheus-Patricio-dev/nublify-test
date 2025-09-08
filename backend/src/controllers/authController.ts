import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const prisma = new PrismaClient();


// Controller de Registro no todoapp
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ error: 'Usuário já existe.' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return res.status(201).json({ id: user.id, name: user.name, email: user.email });
};

// Controller de Login no todoapp
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

  return res.json({ token });
};
