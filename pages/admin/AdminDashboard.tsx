
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { SystemKPIs } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data
const mockKPIs: SystemKPIs = {
  totalStudents: 1250,
  totalInstructors: 85,
  totalLessons: 5620,
  pendingValidations: 15,
};

const mockChartData = [
  { name: 'Jan', Alunos: 400, Aulas: 240 },
  { name: 'Fev', Alunos: 300, Aulas: 139 },
  { name: 'Mar', Alunos: 200, Aulas: 980 },
  { name: 'Abr', Alunos: 278, Aulas: 390 },
  { name: 'Mai', Alunos: 189, Aulas: 480 },
  { name: 'Jun', Alunos: 239, Aulas: 380 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Painel do Administrador</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
            <h3 className="font-bold text-lg text-muted">Alunos Ativos</h3>
            <p className="text-4xl font-bold mt-2 text-primary">{mockKPIs.totalStudents}</p>
        </Card>
        <Card className="text-center">
            <h3 className="font-bold text-lg text-muted">Instrutores Ativos</h3>
            <p className="text-4xl font-bold mt-2 text-primary">{mockKPIs.totalInstructors}</p>
        </Card>
        <Card className="text-center">
            <h3 className="font-bold text-lg text-muted">Aulas Realizadas</h3>
            <p className="text-4xl font-bold mt-2 text-primary">{mockKPIs.totalLessons}</p>
        </Card>
        <Card className="text-center bg-yellow-50 border-2 border-yellow-300">
            <h3 className="font-bold text-lg text-yellow-800">Validações Pendentes</h3>
            <p className="text-4xl font-bold mt-2 text-yellow-600">{mockKPIs.pendingValidations}</p>
            <Link to="/admin/validations" className="mt-2 text-sm text-yellow-700 hover:underline">Ver agora</Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Card title="Atividade Recente" className="lg:col-span-3">
          <p className="text-muted mb-4">Novos alunos e aulas agendadas nos últimos meses.</p>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Alunos" fill="#0047AB" />
                <Bar dataKey="Aulas" fill="#34A853" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="lg:col-span-2">
            <Card title="Ações Rápidas">
                <div className="flex flex-col space-y-3">
                    <Link to="/admin/validations">
                        <Button className="w-full" variant="accent">Verificar Documentos</Button>
                    </Link>
                    <Link to="/admin/users">
                        <Button className="w-full" variant="primary">Gerenciar Usuários</Button>
                    </Link>
                    <Link to="/admin/customize">
                        <Button className="w-full" variant="secondary">Personalizar Plataforma</Button>
                    </Link>
                    <Link to="/support">
                        <Button className="w-full" variant="secondary">Tickets de Suporte</Button>
                    </Link>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
