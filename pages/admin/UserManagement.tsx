
import React, { useState, useMemo } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { User, UserRole, DocumentStatus } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';

// Mock data including KYC status
const mockUsers: (User & { kycStatus: DocumentStatus })[] = [
    { id: 's1', name: 'Aluno Souza', email: 'aluno.souza@email.com', role: UserRole.STUDENT, kycStatus: DocumentStatus.APPROVED },
    { id: 'i1', name: 'Instrutor Silva', email: 'instrutor.silva@email.com', role: UserRole.INSTRUCTOR, kycStatus: DocumentStatus.APPROVED },
    { id: 's2', name: 'Maria Clara', email: 'maria.clara@email.com', role: UserRole.STUDENT, kycStatus: DocumentStatus.PENDING },
    { id: 's3', name: 'João Lima', email: 'joao.lima@email.com', role: UserRole.STUDENT, kycStatus: DocumentStatus.REJECTED },
    { id: 'i2', name: 'Ana Souza', email: 'ana.souza@email.com', role: UserRole.INSTRUCTOR, kycStatus: DocumentStatus.PENDING },
];

const ITEMS_PER_PAGE = 10;

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<(User & { kycStatus: DocumentStatus }) | null>(null);
    const { addNotification } = useNotification();

    const filteredUsers = useMemo(() => {
        return users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredUsers, currentPage]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const handleDeactivate = (user: User & { kycStatus: DocumentStatus }) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const confirmDeactivation = () => {
        if (!selectedUser) return;
        // Simulate API call
        setUsers(users.filter(u => u.id !== selectedUser.id));
        addNotification('success', `Usuário ${selectedUser.name} foi desativado.`);
        setIsModalOpen(false);
        setSelectedUser(null);
    };

  const StatusChip = ({ status }: { status: DocumentStatus }) => {
    const styles = {
      [DocumentStatus.APPROVED]: 'bg-green-100 text-accent-dark',
      [DocumentStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
      [DocumentStatus.REJECTED]: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
          {status.toUpperCase()}
      </span>
    );
  };

  return (
    <>
      <Card title="Gerenciamento de Usuários">
        <p className="mb-4 text-muted">Busque, visualize, edite ou desative usuários da plataforma.</p>
        <Input 
            id="search"
            label="Buscar por nome ou email"
            placeholder="Digite para buscar..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="mb-4"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perfil</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status KYC</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedUsers.map(user => (
                <tr key={user.id}>
                  <td className="py-4 px-6 whitespace-nowrap font-medium text-dark">{user.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-muted">{user.email}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === UserRole.INSTRUCTOR ? 'bg-blue-100 text-primary-dark' : 'bg-green-100 text-accent-dark'}`}>
                        {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                      <StatusChip status={user.kycStatus} />
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap space-x-2">
                    <Button size="sm" variant="secondary">Editar</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDeactivate(user)}>Desativar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
                <Button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} variant="secondary">Anterior</Button>
                <span className="text-sm text-muted">Página {currentPage} de {totalPages}</span>
                <Button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} variant="secondary">Próxima</Button>
            </div>
        )}

      </Card>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirmar Desativação">
          {selectedUser && (
            <div>
                <p>Tem certeza que deseja desativar o usuário <strong>{selectedUser.name}</strong>?</p>
                <p className="text-sm text-muted mt-2">Esta ação não poderá ser desfeita.</p>
                 <div className="flex justify-end gap-4 mt-6">
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={confirmDeactivation}>Confirmar</Button>
                </div>
            </div>
          )}
      </Modal>
    </>
  );
};

export default UserManagement;
