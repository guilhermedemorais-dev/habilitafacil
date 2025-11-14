
import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Lesson, LessonType } from '../../types';

// Mock function to fetch lesson details
const getLessonDetails = (lessonId: string): Lesson | undefined => {
  const mockLessons: Lesson[] = [
    { id: '1', studentId: 's1', instructorId: 'i1', studentName: 'Aluno Souza', instructorName: 'Carlos Silva', type: LessonType.PRACTICAL_ONLINE, date: '2024-08-17T15:00:00', duration: 50, status: 'scheduled' },
  ];
  return mockLessons.find(l => l.id === lessonId);
};


const VideoCallPage: React.FC = () => {
  const { lessonId } = useParams();
  const lesson = lessonId ? getLessonDetails(lessonId) : undefined;

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Videoaula Online - Aula {lessonId}</h1>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Video Area */}
          <div className="md:col-span-2 bg-dark rounded-lg h-96 flex items-center justify-center text-white">
            <p>Integração com API de Videoconferência aqui.</p>
          </div>

          {/* Controls and Info */}
          <div className="flex flex-col space-y-4">
            <Card title="Informações">
              <p><strong>Instrutor:</strong> {lesson?.instructorName || 'Carregando...'}</p>
              <p><strong>Aluno:</strong> {lesson?.studentName || 'Carregando...'}</p>
              <p><strong>Duração:</strong> {lesson?.duration || '...'} minutos</p>
            </Card>
            <Card title="Controles">
                <div className="flex flex-col space-y-2">
                    <Button variant="primary">Microfone</Button>
                    <Button variant="primary">Câmera</Button>
                    <Button variant="danger">Encerrar Chamada</Button>
                </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VideoCallPage;
