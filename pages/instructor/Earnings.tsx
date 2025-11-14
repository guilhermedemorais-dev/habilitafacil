import React from 'react';
import Card from '../../components/common/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LessonType } from '../../types';

// Mock data
const mockEarningsData = [
  { name: 'Jan', Ganhos: 2200 },
  { name: 'Fev', Ganhos: 2800 },
  { name: 'Mar', Ganhos: 3100 },
  { name: 'Abr', Ganhos: 2900 },
  { name: 'Mai', Ganhos: 3450 },
  { name: 'Jun', Ganhos: 4100 },
];

const mockTransactions = [
    { id: 't1', date: '2024-06-15', student: 'Aluno Souza', type: LessonType.PRACTICAL_PRESENTIAL, value: 50.00 },
    { id: 't2', date: '2024-06-15', student: 'Maria Clara', type: LessonType.VEHICLE_RENTAL, value: 80.00 },
    { id: 't3', date: '2024-06-14', student: 'João Lima', type: LessonType.PRACTICAL_ONLINE, value: 40.00 },
    { id: 't4', date: '2024-06-13', student: 'Aluno Souza', type: LessonType.PRACTICAL_PRESENTIAL, value: 50.00 },
];

const Earnings: React.FC = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold text-dark mb-6">Meus Ganhos e Extratos</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card title="Evolução de Ganhos (Últimos 6 meses)">
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                        <BarChart data={mockEarningsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `R$${value}`} />
                            <Tooltip formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} />
                            <Legend />
                            <Bar dataKey="Ganhos" fill="#34A853" />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
            <div>
                <Card title="Resumo Financeiro">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Saldo a Receber</p>
                            <p className="text-2xl font-bold text-accent">R$ 1.250,75</p>
                        </div>
                         <div>
                            <p className="text-sm text-gray-500">Ganhos no Mês Atual</p>
                            <p className="text-2xl font-bold text-primary">R$ 4.100,00</p>
                        </div>
                         <div>
                            <p className="text-sm text-gray-500">Próximo Pagamento</p>
                            <p className="text-lg font-semibold">05/07/2024</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
        <div className="mt-6">
            <Card title="Extrato Detalhado">
                 <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aluno</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {mockTransactions.map(item => (
                        <tr key={item.id}>
                            <td className="py-4 px-6 whitespace-nowrap">{new Date(item.date).toLocaleDateString('pt-BR')}</td>
                            <td className="py-4 px-6 whitespace-nowrap">{item.student}</td>
                            <td className="py-4 px-6 whitespace-nowrap">{item.type}</td>
                            <td className="py-4 px-6 whitespace-nowrap font-semibold text-green-700">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </Card>
        </div>
    </div>
  );
};

export default Earnings;