import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import { EADModule, EADModuleFormData } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';

// Mock data
const mockModules: EADModule[] = [
    { id: 'm1', title: 'Legislação de Trânsito', description: 'Módulo completo sobre leis.', instructorId: 'i1', content: [] },
    { id: 'm2', title: 'Direção Defensiva Avançada', description: 'Técnicas e práticas.', instructorId: 'i1', content: [] },
];

const EADManagement: React.FC = () => {
    const [modules, setModules] = useState(mockModules);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<EADModuleFormData>({ title: '', description: '' });
    const { addNotification } = useNotification();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const newModule: EADModule = {
                id: `m${Date.now()}`,
                ...formData,
                instructorId: 'i1', // Should come from logged-in user context
                content: [],
            };
            setModules(prev => [...prev, newModule]);
            setIsLoading(false);
            setIsModalOpen(false);
            addNotification('success', 'Módulo criado com sucesso!');
            setFormData({ title: '', description: '' }); // Reset form
        }, 1000);
    };

  return (
    <>
    <Card title="Gerenciamento de Conteúdo EAD">
      <p className="mb-4 text-gray-600">Crie e edite os módulos de ensino a distância para seus alunos.</p>
      <Button variant="primary" className="mb-4" onClick={() => setIsModalOpen(true)}>Criar Novo Módulo</Button>
      <div className="space-y-4">
        {modules.length > 0 ? modules.map(module => (
          <div key={module.id} className="p-4 border rounded-md hover:shadow-sm transition-shadow">
            <h3 className="font-semibold text-lg text-dark">{module.title}</h3>
            <p className="text-sm text-gray-600">{module.description}</p>
            <div className="mt-3 space-x-2">
                <Button size="sm" variant="secondary">Editar Conteúdo</Button>
                <Button size="sm" variant="danger">Excluir</Button>
            </div>
          </div>
        )) : (
            <p className="text-center text-gray-500 p-8 bg-gray-50 rounded-md">Nenhum módulo criado.</p>
        )}
      </div>
    </Card>

     <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Criar Novo Módulo EAD">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Título do Módulo" name="title" value={formData.title} onChange={handleInputChange} required />
            <Textarea
              label="Descrição"
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <div className="flex justify-end gap-4 mt-6">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button type="submit" variant="primary" isLoading={isLoading}>Salvar Módulo</Button>
            </div>
          </form>
      </Modal>
    </>
  );
};

export default EADManagement;