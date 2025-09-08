import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Controla se está no modo Login ou Registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Para Login
    if (isLogin) {
      try {
        const response = await api.post('/auth/login', { email, password });
        console.log(response)
        console.log('Login successful', response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/tasks');
      } catch (error) {
        setError('Credenciais inválidas!');
      }
    }
    // Para Registro
    else {
      try {
        const response = await api.post('/auth/register', { name, email, password });
        console.log('Registro bem-sucedido', response.data);
        setIsLogin(true); // Redireciona para a tela de Login após sucesso
      } catch (error) {
        setError('Erro ao registrar!');
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        {isLogin ? 'Login' : 'Registro'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          {isLogin ? 'Login' : 'Registrar'}
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500"
        >
          {isLogin ? 'Não tem uma conta? Registre-se aqui' : 'Já tem uma conta? Faça login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
