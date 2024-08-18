import axios from 'axios';

// Create axios instance with base URL and headers
const api = axios.create({
    baseURL: 'http://localhost:3000/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);



api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Trigger an error that can be handled by the caller
            return Promise.reject({ message: 'token_expired', originalError: error });
        }
        
        return Promise.reject(error);  // Reject the promise with the error
    }
);

export default api;
