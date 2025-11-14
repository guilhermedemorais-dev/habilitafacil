
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { UserRole } from '../../types';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [error, setError] = useState('');
  
  const { login, isLoading } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password, role);
      addNotification('success', 'Login realizado com sucesso!');
      
      // Navigate to the correct dashboard based on role
      switch (role) {
        case UserRole.STUDENT:
          navigate('/student');
          break;
        case UserRole.INSTRUCTOR:
          navigate('/instructor');
          break;
        case UserRole.ADMIN:
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      setError(errorMessage);
      addNotification('error', `Falha no login: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light p-4">
      <Card className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-accent">HabilitaFácil</h1>
          <p className="text-muted mt-2">Bem-vindo(a) de volta!</p>
        </div>

        <div className="my-6">
          <div className="flex border border-gray-200 rounded-lg p-1 bg-gray-100">
            <button
              onClick={() => setRole(UserRole.STUDENT)}
              className={`w-1/3 py-2 text-sm font-medium rounded-md transition-colors ${role === UserRole.STUDENT ? 'bg-white text-primary shadow' : 'text-muted'}`}
            >
              Aluno
            </button>
            <button
              onClick={() => setRole(UserRole.INSTRUCTOR)}
              className={`w-1/3 py-2 text-sm font-medium rounded-md transition-colors ${role === UserRole.INSTRUCTOR ? 'bg-white text-primary shadow' : 'text-muted'}`}
            >
              Instrutor
            </button>
            <button
              onClick={() => setRole(UserRole.ADMIN)}
              className={`w-1/3 py-2 text-sm font-medium rounded-md transition-colors ${role === UserRole.ADMIN ? 'bg-white text-primary shadow' : 'text-muted'}`}
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <Button type="submit" className="w-full" isLoading={isLoading} variant="primary">
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Não tem uma conta?{' '}
          <Link to="/register" className="font-medium text-accent hover:underline">
            Cadastre-se
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
