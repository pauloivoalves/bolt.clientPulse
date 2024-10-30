import { Edit2, Trash2, Activity } from 'lucide-react';
import type { Client } from '../services/clientService';

interface ClientCardsProps {
  clients: Client[];
  isLoading: boolean;
  onEdit: (client: Client) => void;
  onDelete: (clientId: string) => void;
}

function getHealthColor(health: number): string {
  if (health >= 80) return 'bg-green-500';
  if (health >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function ClientCards({ clients, isLoading, onEdit, onDelete }: ClientCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.map((client) => (
        <div key={client._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-full">
                  <div className={`w-2.5 h-2.5 rounded-full ${getHealthColor(Math.random() * 100)}`}></div>
                  <Activity className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <p className="text-gray-600">{client.company}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(client)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(client._id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span> {client.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Phone:</span> {client.phone}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Status:</span>{' '}
              <span className={`${
                client.status === 'Active' ? 'text-green-600' : 'text-gray-600'
              }`}>
                {client.status}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
