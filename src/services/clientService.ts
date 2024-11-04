import api from './api';

export interface ClientMessage {
  content: string;
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface Client {
  _id: string;
  company: string;
  name: string;
  role: string;
  context: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  status: 'Active' | 'Inactive';
  health: 'good' | 'neutral' | 'bad';
  messages: ClientMessage[];
}

export interface CreateClientData {
    company: string;
    name: string;
    role: string;
    context: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    status: 'Active' | 'Inactive';
}

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const clientService = {
  async createClient(data: CreateClientData) {
    const response = await api.post('/clients', data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async getClients() {
    const response = await api.get('/clients', {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async updateClient(id: string, data: CreateClientData) {
    const response = await api.put(`/clients/${id}`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async deleteClient(id: string) {
    const response = await api.delete(`/clients/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async uploadMessages(clientId: string, messages: ClientMessage[]) {
    const response = await api.post(`/clients/${clientId}/messages`, { messages }, {
      headers: getAuthHeader()
    });
    return response.data;
  }
}; 