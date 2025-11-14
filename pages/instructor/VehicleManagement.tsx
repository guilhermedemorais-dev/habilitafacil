
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { Vehicle, DocumentStatus, VehicleFormData, Document } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';

// Mock data
const mockVehicles: Partial<Vehicle>[] = [
    { id: 'v1', model: 'Fiat Mobi', plate: 'ABC-1234', category: 'B', year: 2023, status: DocumentStatus.APPROVED, imageUrl: 'https://i.imgur.com/example.png' },
    { id: 'v2', model: 'Honda PCX', plate: 'DEF-5678', category: 'A', year: 2022, status: DocumentStatus.PENDING, imageUrl: 'https://i.imgur.com/example.png' },
];

const VehicleManagement: React.FC = () => {
    const [vehicles, setVehicles] = useState(mockVehicles);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<VehicleFormData>({ model: '', plate: '', year: '', category: 'B' });
    const { addNotification } = useNotification();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const newVehicle = {
                id: `v${Date.now()}`,
                ...formData,
                year: Number(formData.year),
                status: DocumentStatus.PENDING,
                imageUrl: 'https://i.imgur.com/example.png',
            };
            setVehicles(prev => [...prev, newVehicle]);
            setIsLoading(false);
            setIsModalOpen(false);
            addNotification('success', 'Veículo adicionado! Aguardando validação dos documentos.');
            setFormData({ model: '', plate: '', year: '', category: 'B' }); // Reset form
        }, 1500);
    };

  return (
    <>
      <Card 
        title="Gerenciamento de Veículos"
        actions={<Button variant="accent" onClick={() => setIsModalOpen(true)}>Adicionar Veículo</Button>}
      >
        <p className="mb-6 text-muted">Cadastre e gerencie os veículos que você disponibiliza para aulas e aluguel.</p>
        <div className="space-y-4">
          {vehicles.length > 0 ? vehicles.map(vehicle => (
            <div key={vehicle.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center transition-all hover:shadow-md">
              <div className="flex items-center">
                  {/* Veículo Icon */}
                  <div className="p-3 rounded-full bg-primary-light text-primary mr-4 hidden sm:block">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div>
                      <p className="font-semibold text-dark">{vehicle.model} - {vehicle.plate}</p>
                      <p className="text-sm text-muted">Categoria: {vehicle.category} | Ano: {vehicle.year}</p>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${vehicle.status === 'approved' ? 'bg-green-100 text-accent-dark' : 'bg-yellow-100 text-yellow-800'}`}>
                    {vehicle.status?.toUpperCase()}
                  </span>
                  <div className="hidden md:block">
                    <Button size="sm" variant="secondary">Editar</Button>
                  </div>
              </div>
            </div>
          )) : (
            <p className="text-center text-muted p-8 bg-light rounded-md">Nenhum veículo cadastrado.</p>
          )}
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar Novo Veículo">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Modelo" name="model" value={formData.model} onChange={handleInputChange} placeholder="Ex: Fiat Mobi" required />
            <Input label="Placa" name="plate" value={formData.plate} onChange={handleInputChange} placeholder="ABC-1234" required />
            <Input label="Ano" name="year" type="number" value={formData.year} onChange={handleInputChange} placeholder="2023" required />
            <Select
              label="Categoria"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="A">A (Moto)</option>
              <option value="B">B (Carro)</option>
              <option value="C">C (Caminhão)</option>
              <option value="D">D (Ônibus)</option>
              <option value="E">E (Carreta)</option>
            </Select>
             <div>
                <label className="block text-sm font-medium text-dark">CRLV</label>
                <input type="file" className="mt-1 block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-blue-200" required />
              </div>
               <div>
                <label className="block text-sm font-medium text-dark">Apólice de Seguro</label>
                <input type="file" className="mt-1 block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-blue-200" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark">Identificação de Veículo de Ensino</label>
                <input type="file" className="mt-1 block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-blue-200" required />
              </div>
            <div className="flex justify-end gap-4 mt-6">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button type="submit" variant="primary" isLoading={isLoading}>Salvar Veículo</Button>
            </div>
          </form>
      </Modal>
    </>
  );
};

export default VehicleManagement;