import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically append authorization token to outbound requests
API.interceptors.request.use((config) => {
  const session = localStorage.getItem('campushub_session');
  if (session) {
    try {
      const { token } = JSON.parse(session);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('Failed to parse auth token:', e);
    }
  }
  return config;
});

export default API;