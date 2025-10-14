import axios from 'axios';

// Use relative baseURL so CRA dev server proxy or the same origin will be used.
// If you want to call a real backend directly, set REACT_APP_BASE_URL in env.
const baseURL = process.env.REACT_APP_BASE_URL || '';

const axiosInstance = axios.create({ baseURL });

// Ensure Authorization header is attached per request (handles token changes)
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;