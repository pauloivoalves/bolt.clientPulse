import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const register = async (data: RegisterData) => {
  try {
    const response = await api.post('/register', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('Network error occurred');
  }
};

export async function login(credentials: { email: string; password: string }) {
  try {
    const response = await api.post('/login', credentials);
    
    const { token, user } = response.data;
    
    // Store the token (you might want to use a separate auth service for this)
    localStorage.setItem('authToken', token);
    
    // Set the token for future requests
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    return { token, user };
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Network error occurred');
  }
}

export default api;