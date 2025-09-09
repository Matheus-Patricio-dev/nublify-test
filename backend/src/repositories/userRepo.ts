import { PrismaClient } from '@prisma/client';
import { User } from '../models/User';

const prisma = new PrismaClient();

export class UserRepository {
  // Método para encontrar um usuário pelo email
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;
    
    return new User(user.id, user.name, user.email, user.password);
  }

  // Método para criar um novo usuário
  async create(userData: { name: string; email: string; password: string }): Promise<User> {
    const user = await prisma.user.create({
      data: userData,
    });

    return new User(user.id, user.name, user.email, user.password);
  }

  async getAll() {
    const users = await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        });
      return users
  }
}
