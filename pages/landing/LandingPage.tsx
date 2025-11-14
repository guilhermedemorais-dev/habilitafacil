
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="relative pl-16">
    <dt className="text-base font-semibold leading-7 text-dark">
      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
        {icon}
      </div>
      {title}
    </dt>
    <dd className="mt-2 text-base leading-7 text-muted">{children}</dd>
  </div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-accent">HabilitaFácil</span>
            </a>
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login">
              <Button variant="primary">Entrar</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 bg-light">
        <div className="mx-auto max-w-7xl py-24 sm:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-dark sm:text-6xl">
                Sua jornada para a CNH começa aqui.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted">
                Conectamos alunos e instrutores de forma simples e eficiente. Agende aulas, estude online e alugue veículos com segurança.
              </p>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                <Link to="/register">
                  <Button variant="accent" size="lg">Quero ser aluno</Button>
                </Link>
                <Link to="/register" className="text-sm font-semibold leading-6 text-dark group">
                  Sou instrutor <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img src="https://i.imgur.com/2s32y5V.png" alt="Happy student with a phone" className="rounded-xl shadow-2xl w-full max-w-sm lg:max-w-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Tudo em um só lugar</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-dark sm:text-4xl">A plataforma completa para sua habilitação</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <FeatureCard title="Aulas Flexíveis" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}>
                Agende aulas presenciais, online ou alugue um veículo adaptado para praticar quando quiser.
              </FeatureCard>
              <FeatureCard title="Conteúdo EAD" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}>
                Acesse vídeos, simulados e quizzes para se preparar para a prova teórica com os melhores materiais.
              </FeatureCard>
              <FeatureCard title="Instrutores Verificados" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}>
                Encontre profissionais qualificados e avaliados pela comunidade, perto de você.
              </FeatureCard>
              <FeatureCard title="Segurança e Transparência" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}>
                Processo de KYC e validação de documentos para garantir a segurança de todos os usuários.
              </FeatureCard>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
