import { UserRepository } from '../repositories/userRepo';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const userRepository = new UserRepository();

export class UserService {
  // Método para registrar um novo usuário
  async register(name: string, email: string, password: string): Promise<User> {
    // Verifica se o usuário já existe
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    const newUser = await userRepository.create({ name, email, password: hashedPassword });

    return newUser;
  }

  // Método para fazer login de um usuário
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Encontra o usuário pelo email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }

    // Gera um token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    return { user, token };
  }
}
