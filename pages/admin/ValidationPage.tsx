
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Textarea from '../../components/common/Textarea';
import { useNotification } from '../../contexts/NotificationContext';
import { ValidationItem, ValidationType } from '../../types';

// Mock data
const initialPendingValidations: ValidationItem[] = [
    { id: 'doc1', type: ValidationType.LADV, user: 'João Pereira', date: '2024-08-14', documentUrl: 'https://via.placeholder.com/400x250.png?text=LADV+Frente+e+Verso' },
    { id: 'doc2', type: ValidationType.INSTRUCTOR_KYC, user: 'Maria Oliveira', date: '2024-08-13', documentUrl: 'https://via.placeholder.com/300x400.png?text=Certificado' },
    { id: 'doc3', type: ValidationType.VEHICLE_CRLV, user: 'Carlos Santos (Instrutor)', date: '2024-08-12', documentUrl: 'https://via.placeholder.com/400x250.png?text=CRLV+Veículo' },
    { id: 'doc4', type: ValidationType.STUDENT_KYC, user: 'Ana Beatriz', date: '2024-08-12', documentUrl: 'https://via.placeholder.com/400x250.png?text=Documento+Aluno' },
];

const ValidationPage: React.FC = () => {
    const [validations, setValidations] = useState(initialPendingValidations);
    const [selectedItem, setSelectedItem] = useState<ValidationItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const { addNotification } = useNotification();

    const openModal = (item: ValidationItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
        setRejectionReason('');
    };

    const handleAction = (action: 'approve' | 'reject') => {
        if (!selectedItem) return;

        if (action === 'reject' && !rejectionReason.trim()) {
            addNotification('error', 'Por favor, informe o motivo da rejeição.');
            return;
        }

        // Simulate API Call
        console.log(`Action: ${action} on item ${selectedItem.id}. Reason: ${rejectionReason}`);
        addNotification('success', `Documento de ${selectedItem.user} foi ${action === 'approve' ? 'aprovado' : 'rejeitado'}.`);
        
        setValidations(validations.filter(v => v.id !== selectedItem.id));
        setIsModalOpen(false);
        setSelectedItem(null);
    };

  return (
    <>
      <Card title="Validações Pendentes">
        <p className="mb-4 text-muted">Analise e aprove ou rejeite os documentos pendentes de usuários e veículos.</p>
        <div className="overflow-x-auto">
          {validations.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Documento</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Envio</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {validations.map(item => (
                  <tr key={item.id}>
                    <td className="py-4 px-6 whitespace-nowrap font-medium text-dark">{item.user}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-muted">{item.type}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-muted">{new Date(item.date).toLocaleDateString('pt-BR')}</td>
                    <td className="py-4 px-6 whitespace-nowrap space-x-2">
                      <Button size="sm" variant="primary" onClick={() => openModal(item)}>Analisar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
             <p className="text-center text-muted p-8 bg-light rounded-md">Nenhuma validação pendente no momento.</p>
          )}
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Analisar: ${selectedItem?.type}`}>
          {selectedItem && (
            <div>
                <p><strong>Usuário:</strong> {selectedItem.user}</p>
                <p className="mb-4"><strong>Enviado em:</strong> {new Date(selectedItem.date).toLocaleDateString('pt-BR')}</p>
                <div className="my-4 p-2 border rounded-md flex justify-center bg-gray-100">
                    <img src={selectedItem.documentUrl} alt="Document Preview" className="max-h-80" />
                </div>
                <Textarea
                  label="Motivo da Rejeição (se aplicável)"
                  id="rejectionReason"
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Ex: Imagem ilegível, documento inválido..."
                />
                <div className="flex justify-end gap-4 mt-6">
                    <Button variant="danger" onClick={() => handleAction('reject')}>Rejeitar</Button>
                    <Button variant="accent" onClick={() => handleAction('approve')}>Aprovar</Button>
                </div>
            </div>
          )}
      </Modal>
    </>
  );
};

export default ValidationPage;