import { useState } from 'react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const result = isLogin
        ? await api.login(userData)
        : await api.register(userData);

      if (result.token) {
        localStorage.setItem('token', result.token);
        navigate('/home');
      } else {
        alert(result.error || 'Algo deu errado!');
      }
    } catch (error) {
      console.error('Error', error);
      alert('Erro ao autenticar usuário.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">{isLogin ? 'Login' : 'Cadastro'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
