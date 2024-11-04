import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Client } from '../services/clientService';
import { MessageUploader } from '../components/MessageUploader';

interface EditClientModalProps {
  client: Client;
  onClose: () => void;
  onUpdate: (clientId: string, updatedData: Partial<Client>) => Promise<void>;
}

export function EditClientModal({ client, onClose, onUpdate }: EditClientModalProps) {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    role: '',
    context: '',
    email: '',
    phone: '',
  });
  const [showMessageUploader, setShowMessageUploader] = useState(false);

  useEffect(() => {
    if (client) {
      setFormData({
        company: client.company ?? '',
        name: client.name ?? '',
        role: client.role ?? '',
        context: client.context ?? '',
        email: client.email ?? '',
        phone: client.phone ?? '',
      });
    }
  }, [client]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(client._id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      {showMessageUploader && (
        <MessageUploader
          clientId={client._id}
          onClose={() => setShowMessageUploader(false)}
          onUploadComplete={() => {
            setShowMessageUploader(false);
            onUpdate(client._id, formData);
          }}
        />
      )}

      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Client</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Context</label>
              <textarea
                value={formData.context}
                onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setShowMessageUploader(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Upload Messages
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 