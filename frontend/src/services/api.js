import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:31912'
});

export default api;