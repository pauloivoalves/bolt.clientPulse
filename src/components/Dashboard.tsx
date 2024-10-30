import { useState, useEffect } from 'react';
import { Plus, Search, RefreshCcw, LogOut, LayoutGrid, Table as TableIcon } from 'lucide-react';
import { clientService, type Client, type CreateClientData } from '../services/clientService';
import { ClientTable } from './ClientTable';
import { AddClientModal } from './AddClientModal';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/api';
import { getToken } from '../services/api'; // Add this import
import { EditClientModal } from './EditClientModal';
import { ClientCards } from './ClientCards';

export function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

// Add debug logging
console.log('Token in the dashboard:', {
    token: getToken(),
  });


  useEffect(() => {
    // Check authentication on component mount
    const token = getToken();
    if (!token) {
      navigate('/');
      return;
    }
    loadClients();
  }, [navigate]);

  const loadClients = async () => {
    try {
      const token = getToken();
      if (!token) {
        navigate('/');
        return;
      }
      
      setIsLoading(true);
      const data = await clientService.getClients();
      setClients(data);
      setError('');
    } catch (err: any) {
      if (err.response?.status === 401) {
        console.log('dados do cliente:', {
            data: err.response.data,
          });
      } else {
        setError('Failed to load clients');
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClient = async (clientData: CreateClientData) => {
    try {
      await clientService.createClient(clientData);
      setShowAddModal(false);
      loadClients();
    } catch (err: any) {
      setError('Failed to add client');
    }
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      setError('Failed to logout');
      console.error(error);
    }
  };

  const handleUpdateClient = async (clientId: string, updatedData: Partial<Client>) => {
    try {
      await clientService.updateClient(clientId, updatedData as CreateClientData);
      setSelectedClient(null);
      loadClients();
    } catch (err: any) {
      setError('Failed to update client');
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    try {
      await clientService.deleteClient(clientId);
      loadClients();
    } catch (err: any) {
      setError('Failed to delete client');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Your Product</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </nav>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add New Client
              </button>
            </div>

            <div className="mb-6 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TableIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'cards' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={loadClients}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <RefreshCcw className="h-5 w-5" />
                  Refresh
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {viewMode === 'table' ? (
              <ClientTable 
                clients={filteredClients} 
                isLoading={isLoading} 
                onRefresh={loadClients}
                onEdit={setSelectedClient}
                onDelete={handleDeleteClient}
              />
            ) : (
              <ClientCards
                clients={filteredClients}
                isLoading={isLoading}
                onEdit={setSelectedClient}
                onDelete={handleDeleteClient}
              />
            )}
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddClientModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddClient}
        />
      )}

      {selectedClient && (
        <EditClientModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onUpdate={handleUpdateClient}
        />
      )}
    </div>
  );
}
