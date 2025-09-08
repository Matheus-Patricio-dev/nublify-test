import express from 'express';
import { register, login } from '../controllers/userController';

const router = express.Router();

// Rota para registrar um novo usuário
router.post('/auth/register', register);

// Rota para fazer login do usuário
router.post('/auth/login', login);

export default router;
