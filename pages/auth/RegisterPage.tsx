import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';
import * as authService from '../../services/authService';
import { UserRole } from '../../types';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [documents, setDocuments] = useState<{ [key: string]: File | null }>({
    identity: null,
    proofOfAddress: null,
    instructorCertificate: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setDocuments(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addNotification('error', 'As senhas não coincidem.');
      return;
    }
    setIsLoading(true);
    try {
      // In a real app, you would first register the user, then get a token to upload files.
      // Here, we simulate the entire process.
      await authService.register({ ...formData, role });
      addNotification('success', 'Cadastro realizado com sucesso! Aguarde a validação dos seus documentos.');
      navigate('/login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      addNotification('error', `Falha no cadastro: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Role Selection
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div onClick={() => { setRole(UserRole.STUDENT); nextStep(); }} className="p-6 border-2 border-accent rounded-lg text-center cursor-pointer hover:bg-accent/10 transition-colors">
                <h3 className="text-lg font-bold text-dark">Sou Aluno</h3>
                <p className="text-sm text-muted mt-2">Quero aprender a dirigir e agendar aulas.</p>
              </div>
              <div onClick={() => { setRole(UserRole.INSTRUCTOR); nextStep(); }} className="p-6 border-2 border-primary rounded-lg text-center cursor-pointer hover:bg-primary/10 transition-colors">
                <h3 className="text-lg font-bold text-dark">Sou Instrutor</h3>
                <p className="text-sm text-muted mt-2">Quero dar aulas e gerenciar minha agenda.</p>
              </div>
            </div>
          </>
        );
      case 2: // Basic Info
        return (
          <>
            <h2 className="text-xl font-semibold text-center mb-6 text-dark">Crie sua conta de {role === 'student' ? 'Aluno' : 'Instrutor'}</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <Input id="name" label="Nome Completo" name="name" value={formData.name} onChange={handleInputChange} required />
              <Input id="email" label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              <Input id="phone" label="Celular" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(XX) XXXXX-XXXX" required />
              <Input id="password" label="Senha" type="password" name="password" value={formData.password} onChange={handleInputChange} required />
              <Input id="confirmPassword" label="Confirme a Senha" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
              <div className="flex justify-between items-center mt-6">
                <Button type="button" onClick={prevStep} variant="secondary">Voltar</Button>
                <Button type="submit" variant="primary">Continuar</Button>
              </div>
            </form>
          </>
        );
      case 3: // Document Upload (KYC)
        return (
          <>
            <h2 className="text-xl font-semibold text-center mb-6 text-dark">Verificação de Identidade (KYC)</h2>
            <p className="text-center text-sm text-muted mb-6">Para sua segurança, precisamos de alguns documentos.</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-dark">Documento de Identidade (frente e verso)</label>
                <input type="file" name="identity" onChange={handleFileChange} className="mt-1 block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark">Comprovante de Residência</label>
                <input type="file" name="proofOfAddress" onChange={handleFileChange} className="mt-1 block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" required />
              </div>
              {role === UserRole.INSTRUCTOR && (
                <div>
                  <label className="block text-sm font-medium text-dark">Certificado de Instrutor</label>
                  <input type="file" name="instructorCertificate" onChange={handleFileChange} className="mt-1 block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" required />
                </div>
              )}
              <div className="flex justify-between items-center mt-6">
                <Button type="button" onClick={prevStep} variant="secondary">Voltar</Button>
                <Button type="submit" isLoading={isLoading} variant="accent">Finalizar Cadastro</Button>
              </div>
            </form>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light p-4">
      <Card className="w-full max-w-lg">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-accent">HabilitaFácil</h1>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        
        {renderStep()}

        <p className="text-center text-sm text-muted mt-6">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Faça login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;