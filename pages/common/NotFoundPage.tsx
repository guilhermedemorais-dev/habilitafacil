import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

interface NotFoundPageProps {
  message?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ message }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light text-center p-4">
      <h1 className="text-6xl font-bold text-primary">Oops!</h1>
      <h2 className="text-2xl font-semibold text-dark mt-4">
        {message || 'Página Não Encontrada'}
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        {message ? 'Você não tem permissão para acessar este recurso.' : 'A página que você está procurando não existe ou foi movida.'}
      </p>
      <Link to="/" className="mt-8">
        <Button variant="primary">
          Voltar para a Página Inicial
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;