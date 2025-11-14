import React, { useState } from 'react';
import Card from '../../components/common/Card';

const faqs = [
  {
    question: 'Como faço para agendar minha primeira aula?',
    answer: 'Após ter seu cadastro e LADV aprovados, vá para a seção "Agendar Aula" no seu painel, filtre por instrutores ou veículos e escolha o melhor horário para você.'
  },
  {
    question: 'Quais documentos preciso para me cadastrar como instrutor?',
    answer: 'Você precisará de um documento de identidade válido, comprovante de residência e seu certificado de instrutor de trânsito emitido pelo órgão competente.'
  },
  {
    question: 'O pagamento é seguro?',
    answer: 'Sim, todos os pagamentos são processados através de um gateway seguro e confiável (integração futura). Seus dados financeiros não são armazenados em nossos servidores.'
  },
  {
    question: 'Posso cancelar uma aula agendada?',
    answer: 'Sim, você pode cancelar uma aula com até 24 horas de antecedência sem custos. Cancelamentos com menos de 24 horas podem estar sujeitos a taxas, conforme a política do instrutor.'
  }
];

const FAQItem: React.FC<{ faq: { question: string, answer: string } }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left"
      >
        <span className="font-medium text-gray-800">{faq.question}</span>
        <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 pr-4 text-gray-600">
          {faq.answer}
        </div>
      )}
    </div>
  );
};


const SupportPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-dark mb-2">Central de Ajuda</h1>
      <p className="text-gray-600 mb-8">Encontre respostas para suas dúvidas ou entre em contato conosco.</p>

      <Card title="Perguntas Frequentes (FAQ)" className="mb-8">
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>
      </Card>

      <Card title="Ainda precisa de ajuda?">
        <p className="text-gray-600 mb-4">Se não encontrou o que procurava, envie uma mensagem para nossa equipe de suporte.</p>
        <p><strong>Email:</strong> <a href="mailto:suporte@abilitafacil.com" className="text-primary hover:underline">suporte@abilitafacil.com</a></p>
        <p><strong>Telefone:</strong> (11) 99999-9999 (disponível em breve)</p>
      </Card>
    </div>
  );
};

export default SupportPage;