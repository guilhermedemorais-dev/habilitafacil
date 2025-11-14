import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { Lesson, LessonType } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';

// Mock data for a single lesson
const mockLesson: Lesson & { instructorName: string, vehicleModel?: string } = {
  id: '1',
  studentId: 's1',
  instructorId: 'i1',
  instructorName: 'Carlos Silva',
  vehicleId: 'v1',
  vehicleModel: 'Fiat Mobi (ABC-1234)',
  type: LessonType.PRACTICAL_PRESENTIAL,
  date: '2024-08-15T10:00:00',
  duration: 50,
  status: 'scheduled',
  notes: 'Ponto de encontro: Em frente ao metrô.',
};

const LessonDetailPage: React.FC = () => {
  const { lessonId } = useParams();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const { addNotification } = useNotification();

  const handleCancel = () => {
    // Simulate API call
    addNotification('success', 'Aula cancelada com sucesso.');
    setIsCancelModalOpen(false);
    // In a real app, you would probably redirect or update the lesson status
    mockLesson.status = 'cancelled';
  };
  
  const getStatusChip = (status: Lesson['status']) => {
    const styles = {
      scheduled: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      pending_approval: 'bg-yellow-100 text-yellow-800'
    };
    return (
      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${styles[status]}`}>
        {status === 'pending_approval' ? 'Aguardando Aprovação' : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-2">Detalhes da Aula</h1>
      <p className="text-gray-500 mb-6">Aqui estão todas as informações sobre sua aula #{lessonId}.</p>
      
      <Card>
        <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-primary mb-4">
                {mockLesson.type === LessonType.PRACTICAL_PRESENTIAL ? 'Aula Prática Presencial' : 'Aula Online'}
            </h2>
            {getStatusChip(mockLesson.status)}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
                <h3 className="font-semibold text-lg mb-2">Informações Gerais</h3>
                <p><strong>Data:</strong> {new Date(mockLesson.date).toLocaleDateString('pt-BR')}</p>
                <p><strong>Horário:</strong> {new Date(mockLesson.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                <p><strong>Duração:</strong> {mockLesson.duration} minutos</p>
            </div>
             <div>
                <h3 className="font-semibold text-lg mb-2">Instrutor e Veículo</h3>
                <p><strong>Instrutor:</strong> {mockLesson.instructorName}</p>
                {mockLesson.vehicleModel && <p><strong>Veículo:</strong> {mockLesson.vehicleModel}</p>}
            </div>
        </div>
        
        {mockLesson.notes && (
             <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Observações do Instrutor</h3>
                <p className="p-4 bg-gray-50 rounded-md text-gray-700">{mockLesson.notes}</p>
            </div>
        )}

        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row gap-4">
            <Link to="/student/booking">
                <Button variant="primary">Agendar Outra Aula</Button>
            </Link>
             {mockLesson.status === 'scheduled' && (
                <Button variant="danger" onClick={() => setIsCancelModalOpen(true)}>Cancelar Aula</Button>
             )}
            <Link to="/student" className="md:ml-auto">
                <Button variant="secondary">Voltar ao Painel</Button>
            </Link>
        </div>
      </Card>

       <Modal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} title="Cancelar Aula">
            <div>
                <p>Tem certeza de que deseja cancelar esta aula?</p>
                <p className="text-sm text-gray-600 mt-2">Cancelamentos com menos de 24 horas de antecedência podem estar sujeitos a taxas.</p>
                 <div className="flex justify-end gap-4 mt-6">
                    <Button variant="secondary" onClick={() => setIsCancelModalOpen(false)}>Manter Aula</Button>
                    <Button variant="danger" onClick={handleCancel}>Sim, Cancelar</Button>
                </div>
            </div>
      </Modal>
    </div>
  );
};

export default LessonDetailPage;