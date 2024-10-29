import api from './api';

export interface Client {
  _id: string;
  company: string;
  name: string;
  role: string;
  context: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientData {
  company: string;
  name: string;
  role: string;
  context: string;
}

export const clientService = {
  async createClient(data: CreateClientData) {
    const response = await api.post('/clients', data);
    return response.data;
  },

  async getClients() {
    const response = await api.get('/clients');
    return response.data;
  },

  async updateClient(id: string, data: CreateClientData) {
    const response = await api.put(`/clients/${id}`, data);
    return response.data;
  },

  async deleteClient(id: string) {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  }
}; 