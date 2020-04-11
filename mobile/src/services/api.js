import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.50.240:31912'
});

export default api;