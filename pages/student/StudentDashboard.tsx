import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { EADModule, Lesson, LessonType, DocumentStatus } from '../../types';

// Mock data
const mockUpcomingLessons: Lesson[] = [
  { id: '1', studentId: 's1', instructorId: 'i1', type: LessonType.PRACTICAL_PRESENTIAL, date: '2024-08-15T10:00:00', duration: 50, status: 'scheduled', instructorName: 'Carlos Silva', studentName: 'Aluno Souza' },
  { id: '2', studentId: 's1', instructorId: 'i2', type: LessonType.PRACTICAL_ONLINE, date: '2024-08-17T15:00:00', duration: 50, status: 'scheduled', instructorName: 'Ana Souza', studentName: 'Aluno Souza' },
];

const mockEADModules: EADModule[] = [
  { id: 'm1', title: 'Legislação de Trânsito', description: 'Conceitos fundamentais e leis.', instructorId: 'i1', content: [] },
  { id: 'm2', title: 'Direção Defensiva', description: 'Como evitar acidentes.', instructorId: 'i1', content: [] },
];

interface InstructorLocation {
  id: string;
  name: string;
  position: { top: string; left: string; }; // Percentage-based for mock map
  rating: number;
}

const mockInstructorsOnMap: InstructorLocation[] = [
  { id: 'i1', name: 'Carlos Silva', position: { top: '45%', left: '50%' }, rating: 4.8 },
  { id: 'i2', name: 'Ana Souza', position: { top: '60%', left: '30%' }, rating: 4.9 },
  { id: 'i3', name: 'João Pereira', position: { top: '25%', left: '65%' }, rating: 4.7 },
  { id: 'i4', name: 'Mariana Costa', position: { top: '75%', left: '75%' }, rating: 4.6 },
];

const StatCard = ({ icon, label, value, subValue }: { icon: React.ReactNode, label: string, value: string, subValue: string }) => (
  <Card className="flex items-center p-4">
    <div className="p-3 rounded-full bg-primary-light text-primary mr-4">
        {icon}
    </div>
    <div>
        <p className="text-sm text-muted">{label}</p>
        <p className="text-2xl font-bold text-dark">{value} <span className="text-base font-normal">{subValue}</span></p>
    </div>
  </Card>
);

const StudentDashboard: React.FC = () => {
  const [distance, setDistance] = useState(5);
  const [minRating, setMinRating] = useState(1);
  const mockLadvStatus: DocumentStatus = DocumentStatus.APPROVED; // Mock data

  const filteredInstructors = useMemo(() => {
    return mockInstructorsOnMap.filter(instructor => instructor.rating >= minRating);
  }, [minRating]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Meu Painel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} label="Aulas Práticas" value="5 / 20" subValue="concluídas"/>
        <StatCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} label="Aulas Teóricas" value="100%" subValue="concluídas"/>
        <Card className={`p-4 flex items-center ${mockLadvStatus === DocumentStatus.APPROVED ? 'bg-accent/10' : 'bg-yellow-100/50'}`}>
           <div className={`p-3 rounded-full mr-4 ${mockLadvStatus === DocumentStatus.APPROVED ? 'bg-accent/20 text-accent' : 'bg-yellow-100 text-yellow-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-6.5-1l-1.5 1.5" /></svg>
           </div>
           <div>
                <p className="text-sm text-muted">Status LADV</p>
                <p className={`text-xl font-bold ${mockLadvStatus === DocumentStatus.APPROVED ? 'text-accent' : 'text-yellow-700'}`}>{mockLadvStatus.charAt(0).toUpperCase() + mockLadvStatus.slice(1)}</p>
           </div>
           <Link to="/student/ladv" className="ml-auto">
             <Button size="sm" variant={mockLadvStatus === DocumentStatus.APPROVED ? 'accent' : 'secondary'}>Verificar</Button>
           </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Próximas Aulas">
          {mockUpcomingLessons.length > 0 ? (
            <ul className="space-y-4">
              {mockUpcomingLessons.map(lesson => (
                <li key={lesson.id} className="p-4 bg-light rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-dark">{lesson.type === LessonType.PRACTICAL_PRESENTIAL ? 'Aula Prática Presencial' : 'Aula Teórica Online'}</p>
                    <p className="text-sm text-muted">Instrutor: {lesson.instructorName || 'Não definido'}</p>
                    <p className="text-sm text-muted">{new Date(lesson.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</p>
                  </div>
                  <Link to={`/student/lesson/${lesson.id}`}>
                    <Button variant="primary" size="sm">Detalhes</Button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted text-center py-8">Nenhuma aula agendada.</p>
          )}
           <Link to="/student/booking">
                <Button className="mt-4 w-full" variant="accent">Agendar Nova Aula</Button>
           </Link>
        </Card>

        <Card title="Módulos EAD">
           <ul className="space-y-3">
              {mockEADModules.map(module => (
                <li key={module.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-dark">{module.title}</p>
                    <p className="text-sm text-muted">{module.description}</p>
                  </div>
                  <Link to={`/student/ead/${module.id}`}>
                    <Button variant="primary" size="sm">Acessar</Button>
                  </Link>
                </li>
              ))}
            </ul>
        </Card>
      </div>

      {/* Map Section */}
      <div className="mt-8">
        <Card title="Encontre Instrutores Próximos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-dark">Filtrar por proximidade</label>
              <div className="flex items-center gap-4 mt-1">
                <input 
                  type="range" 
                  id="distance" 
                  name="distance" 
                  min="1" 
                  max="25" 
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                />
                <span className="font-semibold text-dark w-16 text-center bg-gray-100 py-1 rounded-md">{distance} km</span>
              </div>
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-dark">Filtrar por avaliação mínima</label>
              <div className="flex items-center gap-4 mt-1">
                <input 
                  type="range" 
                  id="rating" 
                  name="rating" 
                  min="1" 
                  max="5" 
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                />
                <span className="font-semibold text-dark w-20 text-center bg-gray-100 py-1 rounded-md flex items-center justify-center">
                  {minRating.toFixed(1)} <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 ml-1" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </span>
              </div>
            </div>
          </div>
          <div
            className="h-96 w-full bg-gray-300 rounded-lg relative bg-cover bg-center shadow-inner"
            style={{ backgroundImage: "url('https://www.openstreetmap.org/assets/map-background-1525a1a5925a7228a47a0521a39b3699478644e391300f244190875e54c9c6a1.png')" }}
          >
              {/* Instructor Pins */}
              {filteredInstructors.map(instructor => (
                  <div
                      key={instructor.id}
                      className="absolute transform -translate-x-1/2 -translate-y-full group cursor-pointer"
                      style={{ top: instructor.position.top, left: instructor.position.left }}
                  >
                      {/* Pin SVG */}
                      <svg className="w-8 h-8 text-primary drop-shadow-lg transition-transform group-hover:scale-125" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-6.05a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                      </svg>
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-dark rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -translate-x-1/2 left-1/2">
                          {instructor.name} ({instructor.rating} ★)
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-dark"></div>
                      </div>
                  </div>
              ))}
          </div>
        </Card>
      </div>

    </div>
  );
};

export default StudentDashboard;