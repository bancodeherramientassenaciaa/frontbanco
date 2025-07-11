// axiosConfig.js
import axios from 'axios';

// Detectar si estamos en desarrollo o producción
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname === '26.95.85.140' ||   // IP Radmin VPN
                      window.location.hostname === '172.30.5.184';     // IP Red Local

// Configurar la URL base según el entorno
const getBaseURL = () => {
    if (isDevelopment) {
        // Para acceso de red, usar la IP local del backend
        if (window.location.hostname === '26.95.85.140' || window.location.hostname === '172.30.5.184') {
            return 'http://26.95.85.140:3000/api';  // Backend en IP Radmin
        }
        return import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    } else {
        return import.meta.env.VITE_API_URL_PRODUCTION || 'https://backbanco-1.onrender.com/api';
    }
};

// Crear una instancia de axios
const axiosInstance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para agregar el token a los headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken'); 
            window.location.href = '/login';
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
