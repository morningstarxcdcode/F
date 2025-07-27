import axios from 'axios';
import Cookies from 'js-cookie';

// Configure axios defaults
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('token');
      Cookies.remove('user');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (userData: any) =>
    api.post('/auth/register', userData),
  updateProfile: (userData: any) =>
    api.put('/auth/profile', userData),
  changePassword: (passwordData: any) =>
    api.put('/auth/change-password', passwordData),
};

export const inventoryAPI = {
  getProducts: () => api.get('/inventory'),
  createProduct: (productData: any) => api.post('/inventory', productData),
  updateProduct: (id: string, productData: any) => api.put(`/inventory/${id}`, productData),
  deleteProduct: (id: string) => api.delete(`/inventory/${id}`),
};

export const ordersAPI = {
  getOrders: () => api.get('/orders'),
  createOrder: (orderData: any) => api.post('/orders', orderData),
  updateOrder: (id: string, orderData: any) => api.put(`/orders/${id}`, orderData),
  deleteOrder: (id: string) => api.delete(`/orders/${id}`),
};

export const suppliersAPI = {
  getSuppliers: () => api.get('/suppliers'),
  createSupplier: (supplierData: any) => api.post('/suppliers', supplierData),
  updateSupplier: (id: string, supplierData: any) => api.put(`/suppliers/${id}`, supplierData),
  deleteSupplier: (id: string) => api.delete(`/suppliers/${id}`),
};

export default api;
