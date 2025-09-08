import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware de autenticação
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extrai o token Bearer

  // Caso não tenha token no cabeçalho
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido. Acesso não autorizado.' });
  }

  // Verifica o token
  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    // Caso o token seja inválido ou expirado
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.log('Token expirado', { time: new Date() });
        return res.status(401).json({ error: 'Token expirado. Faça login novamente.' });
      }
      console.log('Token inválido', { time: new Date(), error: err.message });
      return res.status(403).json({ error: 'Token inválido. Acesso proibido.' });
    }

    // Caso o token seja válido, passa a informação do usuário para a próxima rota
    req.user = user;
    next(); // Chama a próxima função ou middleware
  });
};