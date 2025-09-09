import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from "lucide-react";
import NublifyIcon from "../../public/icone-nubli-color.png";
import { loginSchema, registerSchema } from "../validation/authSchema";
import * as yup from 'yup'


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const validateForm = async () => {
  const data = { name, email, password };
  const schema = isLogin ? loginSchema : registerSchema;

  try {
    await schema.validate(data, { abortEarly: false });
    setFieldErrors({});
    return true;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      err.inner.forEach((e) => {
        if (e.path) {
          errors[e.path] = e.message;
        }
      });
      setFieldErrors(errors);
    }
    return false;
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await validateForm())) return;

    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        const response = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", response.data.token);
        navigate("/tasks");
      } else {
        await api.post("/auth/register", { name, email, password });
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch {
      setError(isLogin ? "Credenciais inválidas!" : "Erro ao registrar!");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFieldErrors({});
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screenflex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mx-auto mb-4">
            <img src={NublifyIcon} alt="Nublify icon" className="w-20" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Login" : "Registro"}
          </h2>
        </div>

        {/* Erro geral */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} className="text-red-600" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Campo Nome (registro) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none ${
                    fieldErrors.name ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Digite seu nome"
                />
              </div>
              {fieldErrors.name && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
              )}
            </div>
          )}

          {/* Campo Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none ${
                  fieldErrors.email ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Digite seu email"
              />
            </div>
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          {/* Campo Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none ${
                  fieldErrors.password ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
            )}
          </div>

          {/* Botão Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isLogin ? "Entrando..." : "Registrando..."}
              </>
            ) : isLogin ? (
              "Login"
            ) : (
              "Registrar"
            )}
          </button>

          {/* Toggle */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            </p>
            <button
              type="button"
              onClick={toggleMode}
              className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
            >
              {isLogin ? "Registrar-se" : "Fazer login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
