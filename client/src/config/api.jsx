import axios from 'axios';

// Create base URL API
export const API = axios.create({
  baseURL: 'https://waysbook.up.railway.app/',
});

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};