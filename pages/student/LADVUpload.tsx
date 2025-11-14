import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { DocumentStatus } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';

const LADVUpload: React.FC = () => {
  const [ladvStatus, setLadvStatus] = useState<DocumentStatus>(DocumentStatus.APPROVED); // Mock status
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotification();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      addNotification('error', 'Por favor, selecione um arquivo para enviar.');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      addNotification('success', 'LADV enviado com sucesso! O status foi atualizado para pendente.');
      setLadvStatus(DocumentStatus.PENDING);
      setSelectedFile(null);
    }, 1500);
  };

  return (
    <Card title="Gerenciamento de LADV">
      <p className="mb-4 text-muted">Faça o upload e acompanhe o status de aprovação da sua Licença de Aprendizagem de Direção Veicular (LADV).</p>
      
      <div className="p-4 border rounded-md mb-6 bg-light">
        <h3 className="font-semibold text-dark">Status Atual: 
          <span className={
            ladvStatus === DocumentStatus.APPROVED ? 'text-accent' :
            ladvStatus === DocumentStatus.PENDING ? 'text-yellow-600' :
            'text-red-600'
          }>
            {' '}{ladvStatus.toUpperCase()}
          </span>
        </h3>
        {ladvStatus === DocumentStatus.APPROVED && <p className="text-sm text-muted mt-1">Seu LADV está válido. Você já pode agendar aulas com aluguel de veículo.</p>}
        {ladvStatus === DocumentStatus.PENDING && <p className="text-sm text-muted mt-1">Seu LADV está em análise pela nossa equipe. Aguarde a aprovação.</p>}
        {ladvStatus === DocumentStatus.REJECTED && <p className="text-sm text-muted mt-1">Seu LADV foi rejeitado. Por favor, verifique o motivo e envie o documento novamente.</p>}
      </div>

      <div>
        <label htmlFor="ladv-upload" className="block text-sm font-medium text-dark">Enviar novo documento (PDF, JPG, PNG)</label>
        <input 
          id="ladv-upload"
          type="file" 
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" 
        />
        {selectedFile && <p className="text-sm text-muted mt-2">Arquivo selecionado: {selectedFile.name}</p>}
      </div>
      <Button className="mt-4" variant="primary" onClick={handleUpload} isLoading={isLoading} disabled={!selectedFile}>
        Enviar LADV
      </Button>
    </Card>
  );
};

export default LADVUpload;