// axiosConfig.js
import axios from 'axios';

// Detectar si estamos en desarrollo o producción
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

console.log('🌍 Hostname actual:', window.location.hostname);
console.log('🛠️ Modo desarrollo:', isDevelopment);

// Configurar la URL base según el entorno
const getBaseURL = () => {
    if (isDevelopment) {
        const url = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
        console.log('🔧 Modo desarrollo - Usando URL:', url);
        return url;
    } else {
        const url = import.meta.env.VITE_API_URL_PRODUCTION || 'https://backbanco-1.onrender.com/api';
        console.log('🚀 Modo producción - Usando URL:', url);
        return url;
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
