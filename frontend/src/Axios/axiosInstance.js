import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://anb-portfolio.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
