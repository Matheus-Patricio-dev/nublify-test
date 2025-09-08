import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes' 
import taskRoutes from './routes/taskRoutes'

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

//Rotas
app.use(userRoutes)
app.use(taskRoutes)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

