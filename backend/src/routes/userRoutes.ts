import express from 'express';
import { register, login, getAll} from '../controllers/userController';

const router = express.Router();

// Rota para registrar um novo usuário
router.post('/auth/register', register);

// Rota para fazer login do usuário
router.post('/auth/login', login);

// Rota para buscar todos os usuários
router.get('/getAll', getAll);

export default router;
