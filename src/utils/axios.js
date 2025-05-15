import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetcher = async (url, options) => {
  const response = await instance.get(url, options);
  return response.data;
};
export const postFetcher = async (url, data, options) => {
  const response = await instance.post(url, data, options);
  return response.data;
};
export const putFetcher = async (url, data, options) => {
  const response = await instance.put(url, data, options);
  return response.data; 
};
export const deleteFetcher = async (url, options) => {
  const response = await instance.delete(url, options);
  return response.data; 
};
export default instance;
