
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Select from '../../components/common/Select';
import { useNotification } from '../../contexts/NotificationContext';
import { DocumentStatus } from '../../types';

// Mock data
const availableSlots = ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'];
const instructors = [
  { id: 'i1', name: 'Carlos Silva', rating: 4.8 },
  { id: 'i2', name: 'Ana Souza', rating: 4.9 },
];

const BookingPage: React.FC = () => {
  const [filters, setFilters] = useState({ date: '', instructor: '', type: '' });
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addNotification } = useNotification();
  
  // RN-007, RF-008: Mock LADV status. In a real app, this would come from the user's context.
  // FIX: Using useState to prevent "unintentional comparison" warning since the value is known at compile time.
  const [ladvStatus] = useState<DocumentStatus>(DocumentStatus.REJECTED);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleBooking = () => {
    if (!selectedSlot || !filters.date) {
        addNotification('warning', 'Por favor, selecione uma data e um horário.');
        return;
    }
    setIsModalOpen(true);
  };

  const confirmBooking = () => {
    // Simulate API call
    console.log('Booking confirmed for:', { ...filters, time: selectedSlot });
    addNotification('success', 'Agendamento solicitado! Aguarde a confirmação do instrutor.');
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  const isVehicleRentalDisabled = ladvStatus !== DocumentStatus.APPROVED;

  return (
    <>
      <Card title="Agendar Aula">
        <p className="mb-6 text-muted">Use os filtros para encontrar o instrutor e horário ideal para você.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-light rounded-lg">
          <Input 
            label="Data"
            id="date"
            name="date"
            type="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
          <Select
            label="Instrutor"
            id="instructor"
            name="instructor"
            value={filters.instructor}
            onChange={handleFilterChange}
          >
            <option value="">Qualquer Instrutor</option>
            {instructors.map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
          </Select>
          <div>
            <Select
              label="Tipo de Aula"
              id="type"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">Todos os Tipos</option>
              <option value="practical_presential">Prática Presencial</option>
              <option value="practical_online">Teórica Online</option>
              <option value="vehicle_rental" disabled={isVehicleRentalDisabled}>
                Aluguel de Veículo {isVehicleRentalDisabled ? '(LADV pendente)' : ''}
              </option>
            </Select>
             {isVehicleRentalDisabled && (
                <p className="text-xs text-red-600 mt-1">Sua LADV precisa estar aprovada para alugar veículos.</p>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-dark mb-4">Horários Disponíveis</h3>
        {filters.date ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {availableSlots.map(slot => (
              <button 
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 border rounded-lg text-center font-semibold transition-colors ${selectedSlot === slot ? 'bg-accent text-white border-accent' : 'bg-white hover:bg-gray-100 border-gray-300'}`}
              >
                {slot}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center p-8 bg-light rounded-md">Por favor, selecione uma data para ver os horários.</p>
        )}

        <Button className="mt-6 w-full md:w-auto" variant="accent" onClick={handleBooking} disabled={!selectedSlot}>
          Solicitar Agendamento
        </Button>
      </Card>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirmar Agendamento">
        {selectedSlot && (
            <div>
                <p className="mb-2"><strong>Data:</strong> {new Date(filters.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
                <p className="mb-2"><strong>Horário:</strong> {selectedSlot}</p>
                <p className="mb-4"><strong>Instrutor:</strong> {filters.instructor ? instructors.find(i=>i.id === filters.instructor)?.name : 'Qualquer um'}</p>
                <p className="text-sm text-muted">Após a confirmação, o instrutor será notificado para aprovar sua solicitação.</p>
                <div className="flex justify-end gap-4 mt-6">
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                    <Button variant="accent" onClick={confirmBooking}>Confirmar</Button>
                </div>
            </div>
        )}
      </Modal>
    </>
  );
};

export default BookingPage;