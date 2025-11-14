import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { EADModule, EADContentType, QuizQuestion } from '../../types';

// Mock data for a single module
const mockModule: EADModule = {
  id: 'm1',
  title: 'Legislação de Trânsito - Placas de Sinalização',
  description: 'Aprenda a identificar e entender as principais placas de trânsito.',
  instructorId: 'i1',
  content: [
    {
      type: EADContentType.VIDEO,
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
    },
    {
      type: EADContentType.TEXT,
      text: `As placas de sinalização são cruciais para a segurança no trânsito. Elas são divididas em três categorias principais:
      - **Regulamentação:** Têm formato circular, fundo branco e borda vermelha. Indicam obrigações, limitações e proibições.
      - **Advertência:** Têm formato quadrado (apoiado em um dos vértices), fundo amarelo e símbolos em preto. Alertam sobre condições potencialmente perigosas na via.
      - **Indicação:** Têm formatos e cores variados. Identificam vias, destinos, locais de interesse e orientam sobre percursos, distâncias e serviços.
      Compreender cada uma delas é fundamental para uma condução segura e para a aprovação no exame teórico.`
    },
    {
      type: EADContentType.QUIZ,
      questions: [
        { id: 'q1', question: 'Qual a principal característica de uma placa de regulamentação?', options: ['Formato quadrado e fundo amarelo', 'Formato circular e borda vermelha', 'Cor azul e formato retangular'], correctAnswer: 1 },
        { id: 'q2', question: 'Uma placa amarela em formato de losango serve para:', options: ['Indicar um serviço', 'Advertir sobre um perigo', 'Proibir uma ação'], correctAnswer: 1 },
      ],
    }
  ]
};

const EADContent: React.FC = () => {
  const { moduleId } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const quizContent = mockModule.content.find(c => c.type === EADContentType.QUIZ);

  const handleAnswerChange = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowResults(false);
  };

  const calculateScore = () => {
    if (!quizContent || !quizContent.questions) return 0;
    const correct = quizContent.questions.reduce((acc, q) => {
        return acc + (selectedAnswers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);
    return (correct / quizContent.questions.length) * 100;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-4">{mockModule.title}</h1>
      <p className="text-gray-600 mb-6">{mockModule.description}</p>
      
      {mockModule.content.map((content, index) => {
        if (content.type === EADContentType.VIDEO && content.url) {
          return (
            <Card key={index} title="Vídeo Aula" className="mb-6">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={content.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-md"
                  style={{ height: '400px' }}
                ></iframe>
              </div>
            </Card>
          );
        }
        if (content.type === EADContentType.TEXT && content.text) {
          return (
            <Card key={index} title="Material de Apoio" className="mb-6">
              <div className="prose max-w-none text-gray-700 whitespace-pre-line">{content.text}</div>
            </Card>
          );
        }
        if (content.type === EADContentType.QUIZ && content.questions) {
          return (
            <Card key={index} title="Quiz de Verificação" className="mb-6">
              {content.questions.map(q => (
                <div key={q.id} className="mb-4 p-4 border rounded-md">
                  <p className="font-semibold mb-2">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, i) => (
                      <label key={i} className={`block p-2 rounded-md cursor-pointer ${showResults ? (i === q.correctAnswer ? 'bg-green-100' : (selectedAnswers[q.id] === i ? 'bg-red-100' : '')) : ''}`}>
                        <input
                          type="radio"
                          name={q.id}
                          checked={selectedAnswers[q.id] === i}
                          onChange={() => handleAnswerChange(q.id, i)}
                          className="mr-2"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <Button onClick={() => setShowResults(true)} variant="primary">Verificar Respostas</Button>
              {showResults && (
                 <div className="mt-4 p-4 rounded-md bg-blue-50">
                    <h3 className="text-lg font-bold text-primary">Resultado: Você acertou {calculateScore().toFixed(0)}%</h3>
                 </div>
              )}
            </Card>
          );
        }
        return null;
      })}
       <Link to="/student">
          <Button variant="secondary">Voltar para o Dashboard</Button>
       </Link>
    </div>
  );
};

export default EADContent;