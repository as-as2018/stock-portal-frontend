import axios from 'axios';
import { base_Url } from './config';

const API = axios.create({
  baseURL: base_Url+'/api'
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;