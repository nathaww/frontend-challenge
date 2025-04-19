import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://reqres.in/api',
});

// Add interceptor to include token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUsers = (page: number = 1) => 
  api.get(`/users?page=${page}`).then(res => res.data);

export const getUser = (id: number) =>
  api.get(`/users/${id}`).then(res => res.data);
