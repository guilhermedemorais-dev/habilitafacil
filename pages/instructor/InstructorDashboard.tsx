import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Lesson, LessonType } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';

// Mock data
const mockSchedule: Lesson[] = [
  { id: '1', studentId: 's1', studentName: 'Aluno Souza', instructorId: 'i1', type: LessonType.PRACTICAL_PRESENTIAL, date: '2024-08-15T10:00:00', duration: 50, status: 'scheduled' },
  { id: '2', studentId: 's2', studentName: 'Maria Clara', instructorId: 'i1', type: LessonType.PRACTICAL_ONLINE, date: '2024-08-15T11:00:00', duration: 50, status: 'scheduled' },
];

const initialNewRequests: Lesson[] = [
    { id: '3', studentId: 's3', studentName: 'João Lima', instructorId: 'i1', type: LessonType.VEHICLE_RENTAL, date: '2024-08-16T09:00:00', duration: 120, status: 'pending_approval' }
];

const StatCard = ({ icon, label, value, isHighlighted = false }: { icon: React.ReactNode, label: string, value: string, isHighlighted?: boolean }) => (
  <Card className={`text-center ${isHighlighted ? 'bg-yellow-50 border-yellow-300' : ''}`}>
    <div className={`mx-auto ${isHighlighted ? 'bg-yellow-200 text-yellow-700' : 'bg-primary-light text-primary'} w-12 h-12 rounded-full flex items-center justify-center`}>
        {icon}
    </div>
    <p className={`text-sm mt-2 ${isHighlighted ? 'text-yellow-800' : 'text-muted'}`}>{label}</p>
    <p className={`text-3xl font-bold mt-1 ${isHighlighted ? 'text-yellow-700' : 'text-dark'}`}>{value}</p>
  </Card>
);

const InstructorDashboard: React.FC = () => {
  const [newRequests, setNewRequests] = useState<Lesson[]>(initialNewRequests);
  const { addNotification } = useNotification();

  const handleRequest = (requestId: string, action: 'approve' | 'reject') => {
    const request = newRequests.find(r => r.id === requestId);
    if (!request) return;
    
    setNewRequests(newRequests.filter(r => r.id !== requestId));
    
    if(action === 'approve') {
        addNotification('success', `Solicitação de ${request.studentName || 'Aluno'} foi aprovada.`);
        // Here you would add the lesson to the main schedule
    } else {
        addNotification('info', `Solicitação de ${request.studentName || 'Aluno'} foi rejeitada.`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Painel do Instrutor</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} label="Ganhos do Mês" value="R$ 3.450" />
        <StatCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>} label="Avaliação Média" value="4.8 / 5" />
        <StatCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>} label="Novas Solicitações" value={newRequests.length.toString()} isHighlighted={newRequests.length > 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Agenda de Hoje">
          {mockSchedule.length > 0 ? (
            <ul className="space-y-4">
              {mockSchedule.map(lesson => (
                <li key={lesson.id} className="p-4 bg-light rounded-lg">
                  <p className="font-semibold text-dark">Aula com {lesson.studentName}</p>
                  <p className="text-sm text-muted">{new Date(lesson.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - {lesson.duration} min</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted text-center py-8">Nenhuma aula para hoje.</p>
          )}
        </Card>

        <Card title="Novas Solicitações de Agendamento">
           {newRequests.length > 0 ? (
            <ul className="space-y-3">
              {newRequests.map(req => (
                <li key={req.id} className="p-4 border border-gray-200 rounded-lg">
                  <p className="font-semibold text-dark">{req.studentName} - {req.type.replace(/_/g, ' ')}</p>
                  <p className="text-sm text-muted">{new Date(req.date).toLocaleString('pt-BR')}</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="accent" size="sm" onClick={() => handleRequest(req.id, 'approve')}>Confirmar</Button>
                    <Button variant="danger" size="sm" onClick={() => handleRequest(req.id, 'reject')}>Rejeitar</Button>
                  </div>
                </li>
              ))}
            </ul>
            ) : (
            <p className="text-center text-muted p-8 bg-light rounded-md">Nenhuma nova solicitação.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default InstructorDashboard;