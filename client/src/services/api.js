import axios from 'axios';

const Base_URL = import.meta.env.VITE_API_BASE_URL || 'https://lisa-unmodified-noble.ngrok-free.dev/api';

const api = axios.create({
  baseURL: Base_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;